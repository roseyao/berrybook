// Pure helpers for read-aloud + per-word highlighting, shared by the chapter
// reader (ChapterBook.js). These mirror the logic proven in App.js's branching
// reader, factored out so the chapter reader can reuse it without touching the
// working picture-book reader.

// Tokenize displayed text into render tokens. Words get a globally-numbered
// `idx` (offset by `base`) so the playing audio's alignment can highlight them
// by absolute index across the whole section. Whitespace is emitted verbatim so
// layout is identical to the plain text.
export const tokenize = (text, base = 0) => {
  const tokens = [];
  let i = base;
  for (const part of (text || '').split(/(\s+)/)) {
    if (!part) continue;
    if (/^\s+$/.test(part)) tokens.push({ type: 'ws', text: part });
    else tokens.push({ type: 'word', text: part, idx: i++ });
  }
  return tokens;
};

export const countWords = (s) => ((s || '').match(/\S+/g) || []).length;

// Given an ElevenLabs alignment's `chars` array, map each character position to
// its word position within that alignment. Whitespace chars map to -1.
export const charToWordMap = (chars) => {
  const out = new Array(chars.length);
  let w = -1;
  let inWord = false;
  for (let i = 0; i < chars.length; i++) {
    if (/\s/.test(chars[i])) { inWord = false; out[i] = -1; }
    else { if (!inWord) { w++; inWord = true; } out[i] = w; }
  }
  return out;
};

// Binary search: highest index in `arr` whose value is <= `t` (or -1).
export const highestLE = (arr, t) => {
  let lo = 0, hi = arr.length - 1, best = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= t) { best = mid; lo = mid + 1; }
    else hi = mid - 1;
  }
  return best;
};

// The audio time (seconds) at which word `wordIndex` (0-based within this
// alignment) begins to be spoken. Lets a reader seek into a longer recording to
// start at an arbitrary word, or stop when the next word would begin. Returns 0
// for the start of the audio and Infinity when the index is past the last word
// (caller treats that as "play to the natural end").
export const wordStartTime = (alignment, wordIndex) => {
  if (!alignment || !alignment.chars || !alignment.starts) return 0;
  if (wordIndex <= 0) return 0;
  const c2w = charToWordMap(alignment.chars);
  for (let i = 0; i < c2w.length; i++) {
    if (c2w[i] === wordIndex) return alignment.starts[i];
  }
  return Infinity;
};

// Split spoken text into small speakable chunks (~sentence-sized) so the live
// TTS fallback can start playing the first words before the rest is fetched.
export const splitIntoChunks = (text) => {
  const sentences = ((text || '').match(/\S[^.!?]*[.!?]+["'”’)\]]*|\S[^.!?]*$/g) || [])
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length <= 1) return [(text || '').trim()].filter(Boolean);
  const chunks = [];
  for (const s of sentences) {
    const last = chunks[chunks.length - 1];
    const cap = chunks.length <= 1 ? 90 : 220;
    if (!last || (last + ' ' + s).length > cap) chunks.push(s);
    else chunks[chunks.length - 1] = last + ' ' + s;
  }
  return chunks;
};

// The exact text we speak for a section: its prose paragraphs only (spots and
// the title header are not spoken), joined by blank lines. This MUST match what
// scripts/record-audio.mjs records, so pre-recorded audio + alignment line up
// with the on-screen words. Takes the section's parsed blocks.
export const spokenTextFromBlocks = (blocks) =>
  blocks.filter((b) => b.type === 'p').map((b) => b.text).join('\n\n');
