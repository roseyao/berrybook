// netlify/functions/generate-audio.js
//
// Text-to-speech for the read-aloud button.
// Primary: ElevenLabs. Fallback (e.g. when ElevenLabs runs out of credits):
// Google Gemini TTS. Returns { audio: <base64>, mimeType }.
//
// Env vars: ELEVENLABS_API_KEY (primary), GEMINI_API_KEY (fallback),
// optional GEMINI_TTS_VOICE (default "Aoede").

const ELEVENLABS_VOICE_ID = 'ZF6FPAbjXT4488VcRRnw';
const GEMINI_TTS_MODEL = 'gemini-2.5-flash-preview-tts';

// Try ElevenLabs. Returns { audio, mimeType } or null on any failure.
async function tryElevenLabs(text) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return null;
  try {
    const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
      method: 'POST',
      headers: { Accept: 'audio/mpeg', 'Content-Type': 'application/json', 'xi-api-key': apiKey },
      body: JSON.stringify({
        text,
        model_id: 'eleven_flash_v2_5',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });
    if (!resp.ok) {
      // Out of credits / quota / rate limit / etc. — let the caller fall back.
      console.warn(`ElevenLabs failed (${resp.status}): ${(await resp.text()).slice(0, 200)}`);
      return null;
    }
    const buf = Buffer.from(await resp.arrayBuffer());
    return { audio: buf.toString('base64'), mimeType: 'audio/mpeg' };
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

  const allowed = new Set([
    process.env.URL,
    process.env.DEPLOY_PRIME_URL,
    ...(process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
  ].filter(Boolean));
  const origin = (event.headers && (event.headers.origin || event.headers.Origin)) || '';
  if (!allowed.has(origin)) {
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
    body: JSON.stringify({ audio: result.audio, mimeType: result.mimeType }),
    isBase64Encoded: false,
  };
};
