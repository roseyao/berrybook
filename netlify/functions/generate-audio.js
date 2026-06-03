// netlify/functions/generate-audio.js
//
// Text-to-speech for the read-aloud button.
// Primary: ElevenLabs (with per-character timing for word highlighting).
// Fallback: Google Gemini TTS (no timing — client renders without highlight).
// Returns { audio: <base64>, mimeType, alignment? }.
//
// Env vars: ELEVENLABS_API_KEY (primary), GEMINI_API_KEY (fallback),
// optional GEMINI_TTS_VOICE (default "Aoede").

// Ivanna — matches the default in scripts/record-audio.mjs so the rare
// live fallback sounds the same as the pre-recorded files.
const ELEVENLABS_VOICE_ID = 'yM93hbw8Qtvdma2wCnJG';
const GEMINI_TTS_MODEL = 'gemini-2.5-flash-preview-tts';

// Try ElevenLabs with character-level alignment. Returns
// { audio, mimeType, alignment: { chars, starts, ends } } or null on failure.
async function tryElevenLabs(text) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return null;
  try {
    const resp = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}/with-timestamps`,
      {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'xi-api-key': apiKey },
        body: JSON.stringify({
          text,
          model_id: 'eleven_flash_v2_5',
          // Settings match the Ivanna voice profile in scripts/record-audio.mjs
          // so live fallback sounds identical to the pre-recorded files.
          voice_settings: { stability: 0.5, similarity_boost: 0.75, speed: 1.0 },
        }),
      }
    );
    if (!resp.ok) {
      // Out of credits / quota / rate limit / etc. — let the caller fall back.
      console.warn(`ElevenLabs failed (${resp.status}): ${(await resp.text()).slice(0, 200)}`);
      return null;
    }
    const data = await resp.json();
    if (!data?.audio_base64) {
      console.warn('ElevenLabs: no audio_base64 in response');
      return null;
    }
    // Prefer normalized_alignment when present — it matches the model's own
    // textual output (apostrophes, ellipses normalized) better than the raw
    // alignment for highlighting.
    const a = data.normalized_alignment || data.alignment || null;
    const alignment = a
      ? { chars: a.characters, starts: a.character_start_times_seconds, ends: a.character_end_times_seconds }
      : undefined;
    return { audio: data.audio_base64, mimeType: 'audio/mpeg', alignment };
  } catch (err) {
    console.warn('ElevenLabs error:', err.message);
    return null;
  }
}

// Wrap raw little-endian 16-bit mono PCM in a WAV container so browsers can play it.
function pcmToWav(pcm, sampleRate) {
  const channels = 1, bitsPerSample = 16;
  const blockAlign = (channels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

// Try Gemini TTS. Returns { audio, mimeType } or null on failure.
async function tryGeminiTts(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const voice = process.env.GEMINI_TTS_VOICE || 'Aoede';
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TTS_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
          },
        }),
      }
    );
    if (!resp.ok) {
      console.warn(`Gemini TTS failed (${resp.status}): ${(await resp.text()).slice(0, 200)}`);
      return null;
    }
    const data = await resp.json();
    const part = (data?.candidates?.[0]?.content?.parts || []).find(p => p.inlineData);
    if (!part) {
      console.warn('Gemini TTS: no audio in response');
      return null;
    }
    const pcm = Buffer.from(part.inlineData.data, 'base64');
    const rate = parseInt((part.inlineData.mimeType || '').match(/rate=(\d+)/)?.[1] || '24000', 10);
    return { audio: pcmToWav(pcm, rate).toString('base64'), mimeType: 'audio/wav' };
  } catch (err) {
    console.warn('Gemini TTS error:', err.message);
    return null;
  }
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Origin gate. Accept:
  //  - The site's canonical URL (Netlify's URL env var, or any custom
  //    ALLOWED_ORIGINS the operator adds).
  //  - Any Netlify subdomain of THIS site — both the bare host (e.g.
  //    relaxed-begonia.netlify.app) and any deploy/branch variant
  //    ("<anything>--<host>.netlify.app"). This covers deploy previews,
  //    branch deploys, and the per-commit DEPLOY_URL without us having to
  //    track each env var.
  const trim = (u) => (u || '').replace(/\/$/, '');
  const explicit = new Set([
    process.env.URL,
    ...(process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
  ].filter(Boolean).map(trim));
  const origin = trim((event.headers && (event.headers.origin || event.headers.Origin)) || '');

  let originOK = explicit.has(origin);
  if (!originOK && origin) {
    try {
      const reqHost = new URL(origin).hostname;
      // Hosts to match against: (1) the canonical site URL host (custom
      // domain in production), and (2) the netlify-app slug host
      // ("<SITE_NAME>.netlify.app"), which is what deploy previews and
      // branch deploys actually use. For each, also accept
      // "<anything>--<host>" variants (deploy previews / per-commit hashes).
      const hosts = [];
      if (process.env.URL) {
        try { hosts.push(new URL(process.env.URL).hostname); } catch {}
      }
      if (process.env.SITE_NAME) hosts.push(`${process.env.SITE_NAME}.netlify.app`);
      originOK = hosts.some((h) => reqHost === h || reqHost.endsWith(`--${h}`));
    } catch { /* malformed URL → leave originOK false */ }
  }
  if (!originOK) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
  }
  if ((event.body || '').length > 4096) {
    return { statusCode: 413, body: JSON.stringify({ error: 'Payload too large' }) };
  }

  let text;
  try {
    ({ text } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }
  if (!text) return { statusCode: 400, body: JSON.stringify({ error: 'Missing text' }) };

  // Primary, then fallback.
  const result = (await tryElevenLabs(text)) || (await tryGeminiTts(text));

  if (!result) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: 'Text-to-speech unavailable (ElevenLabs and Gemini both failed or are not configured).' }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      audio: result.audio,
      mimeType: result.mimeType,
      ...(result.alignment ? { alignment: result.alignment } : {}),
    }),
    isBase64Encoded: false,
  };
};
