// Pre-record TTS audio + per-character alignment for every scene in every
// book, saving to `public/audio/<book-id>/<scene-id>.{mp3,json}`. At runtime
// the client tries those static files first (instant + no API cost) and only
// falls back to the live Netlify function if they're missing.
//
// Usage:
//   node scripts/record-audio.mjs                      # all books, skip cached
//   node scripts/record-audio.mjs --force              # rerun everything
//   node scripts/record-audio.mjs --book=little-light  # one book only
//   node scripts/record-audio.mjs --force --book=...   # combine
//
// Auth: ELEVENLABS_API_KEY env. If missing, falls back to
// `netlify env:get ELEVENLABS_API_KEY` (assumes `netlify link` ran in this dir).
//
// Voice / speed settings must MATCH netlify/functions/generate-audio.js so
// that pre-recorded audio sounds identical to the live fallback.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..');
const PUBLIC_AUDIO = path.join(REPO, 'public/audio');
const BOOKS_DIR = path.join(REPO, 'src/books');
// Shared secrets live alongside the games repo (same file generate-art.mjs reads).
const ENV_FILE = path.resolve(REPO, '../games/.env.local');

// Voice profiles. The "id" comes from ElevenLabs's voice library (the URL
// segment when you open a voice). "settings" stays per-voice so we can tune
// pace/expression independently. Default is whatever DEFAULT_VOICE points
// at; pre-recorded files live under public/audio/<voice>/<book>/<scene>.{mp3,json}.
const VOICES = {
  'Paige-british': {
    id: 'ZF6FPAbjXT4488VcRRnw',
    settings: { stability: 0.5, similarity_boost: 0.75, speed: 0.9 },
  },
  'Ivanna': {
    id: 'yM93hbw8Qtvdma2wCnJG',
    settings: { stability: 0.5, similarity_boost: 0.75, speed: 1.0 },
  },
};
const DEFAULT_VOICE = 'Ivanna';
const MODEL_ID = 'eleven_flash_v2_5';

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const onlyArg = args.find((a) => a.startsWith('--book='));
const ONLY_BOOK = onlyArg ? onlyArg.slice('--book='.length) : null;
const voiceArg = args.find((a) => a.startsWith('--voice='));
const VOICE_NAME = voiceArg ? voiceArg.slice('--voice='.length) : DEFAULT_VOICE;
const VOICE = VOICES[VOICE_NAME];
if (!VOICE) throw new Error(`Unknown voice "${VOICE_NAME}". Known: ${Object.keys(VOICES).join(', ')}`);
if (VOICE.id.startsWith('__')) throw new Error(`Voice "${VOICE_NAME}" has no id set yet.`);

async function loadApiKey() {
  // 1) Shell env (works for `export ELEVENLABS_API_KEY=... && node ...`).
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;
  // 1b) ../games/.env.local (same shared secrets file the art script reads).
  try {
    const m = (await fs.readFile(ENV_FILE, 'utf8'))
      .match(/^\s*ELEVENLABS_API_KEY\s*=\s*"?([^"\n\r]+)"?/mi);
    if (m) return m[1].trim();
  } catch { /* file missing — fall through */ }
  // 2) 1Password CLI (user's preferred secret store).
  try {
    const v = execSync(
      `op read 'op://Private/elevenlabs_api_key/credential'`,
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    if (v) return v;
  } catch { /* op not authed or item missing */ }
  // 3) Netlify env (only if a non-masked dev-context value is set).
  try {
    const out = execSync('netlify env:get ELEVENLABS_API_KEY --json', { encoding: 'utf8' });
    const v = JSON.parse(out).ELEVENLABS_API_KEY;
    if (v && !v.startsWith('*') && !v.startsWith('No value')) return v;
  } catch { /* fall through */ }
  throw new Error(
    'No ELEVENLABS_API_KEY available. Try one of:\n' +
    '  - export ELEVENLABS_API_KEY=... && node scripts/record-audio.mjs\n' +
    '  - op signin (if you keep the key in 1Password as elevenlabs_api_key)\n' +
    '  - set the key on the linked Netlify site dev context'
  );
}

async function callElevenLabs(text, apiKey) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE.id}/with-timestamps`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE.settings }),
  });
  if (!resp.ok) {
    const body = (await resp.text()).slice(0, 300);
    throw new Error(`ElevenLabs ${resp.status}: ${body}`);
  }
  const data = await resp.json();
  if (!data.audio_base64) throw new Error('ElevenLabs: missing audio_base64');
  const a = data.normalized_alignment || data.alignment;
  if (!a) throw new Error('ElevenLabs: missing alignment');
  return {
    audioBase64: data.audio_base64,
    alignment: {
      chars: a.characters,
      starts: a.character_start_times_seconds,
      ends: a.character_end_times_seconds,
    },
  };
}

// A chapter section's spoken text: prose paragraphs only, dropping [[SPOT n]]
// marker lines, joined by blank lines. Mirrors spokenTextFromBlocks() in
// src/readaloud.js so audio + on-screen word indices stay aligned.
function sectionSpokenText(text) {
  return (text || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^\[\[SPOT \d+\]\]$/.test(p))
    .join('\n\n');
}

async function loadBook(bookDir) {
  const file = path.join(BOOKS_DIR, bookDir, 'index.js');
  const mod = await import(pathToFileURL(file).href);
  return mod.default;
}

async function recordScene({ bookId, sceneId, text, apiKey }) {
  const dir = path.join(PUBLIC_AUDIO, VOICE_NAME, bookId);
  await fs.mkdir(dir, { recursive: true });
  const mp3 = path.join(dir, `${sceneId}.mp3`);
  const json = path.join(dir, `${sceneId}.json`);
  const meta = path.join(dir, `${sceneId}.meta.json`);

  // Cache invalidation by SHA-1 of (text + voice/model settings). If meta
  // matches, skip; otherwise re-record.
  const sig = await textSignature(text);
  if (!FORCE) {
    try {
      const prev = JSON.parse(await fs.readFile(meta, 'utf8'));
      if (prev.sig === sig) {
        await fs.access(mp3);
        await fs.access(json);
        process.stdout.write(`    skip  ${sceneId} (cached)\n`);
        return { skipped: true };
      }
    } catch { /* missing or stale, fall through */ }
  }

  process.stdout.write(`    fetch ${sceneId} ... `);
  const t0 = Date.now();
  const { audioBase64, alignment } = await callElevenLabs(text, apiKey);
  await fs.writeFile(mp3, Buffer.from(audioBase64, 'base64'));
  await fs.writeFile(json, JSON.stringify(alignment));
  await fs.writeFile(meta, JSON.stringify({ sig, model: MODEL_ID, voice: VOICE_NAME, voiceId: VOICE.id, settings: VOICE.settings, recordedAt: new Date().toISOString() }));
  process.stdout.write(`ok (${((Date.now() - t0) / 1000).toFixed(1)}s)\n`);
  return { recorded: true };
}

async function textSignature(text) {
  const crypto = await import('node:crypto');
  return crypto.createHash('sha1')
    .update(MODEL_ID + '|' + VOICE.id + '|' + JSON.stringify(VOICE.settings) + '|' + text)
    .digest('hex')
    .slice(0, 12);
}

async function main() {
  const apiKey = await loadApiKey();
  const all = (await fs.readdir(BOOKS_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const bookDirs = ONLY_BOOK ? all.filter((d) => d === ONLY_BOOK) : all;
  if (!bookDirs.length) {
    console.error(`No matching book dir under ${BOOKS_DIR}` + (ONLY_BOOK ? ` (looking for "${ONLY_BOOK}")` : ''));
    process.exit(1);
  }

  let recorded = 0, skipped = 0;
  for (const bd of bookDirs) {
    let book;
    try {
      book = await loadBook(bd);
    } catch (e) {
      console.error(`  skip ${bd}: ${e.message}`);
      continue;
    }
    console.log(`\n  ${book.id} — ${book.title}`);
    // Two book shapes: branching picture-books keyed by `scenes`, and chapter
    // books keyed by `sections`. For chapter books the spoken text is the
    // section's prose only — [[SPOT n]] markers and the title are not read —
    // which must match spokenTextFromBlocks() in src/readaloud.js.
    const units = book.kind === 'chapter'
      ? (book.sections || [])
          .filter((s) => (s.text || '').trim())
          .map((s) => ({ id: s.id, text: sectionSpokenText(s.text) }))
      : Object.entries(book.scenes).map(([id, scene]) => ({ id, text: scene.text }));
    for (const unit of units) {
      try {
        const r = await recordScene({ bookId: book.id, sceneId: unit.id, text: unit.text, apiKey });
        if (r.recorded) recorded++; else skipped++;
        // small delay to be polite to the API
        if (r.recorded) await new Promise((r) => setTimeout(r, 250));
      } catch (e) {
        console.error(`    FAIL  ${unit.id}: ${e.message}`);
      }
    }
  }
  console.log(`\nDone. ${recorded} recorded, ${skipped} cached.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
