// netlify/functions/generate-audio.js

exports.handler = async function(event) {
  // We only accept POST requests
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

  const { text } = JSON.parse(event.body);
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    return { statusCode: 500, body: 'API key not configured.' };
  }

  const VOICE_ID = 'ZF6FPAbjXT4488VcRRnw';
  const API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_flash_v2_5',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  };

  try {
    const response = await fetch(API_URL, options);

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        statusCode: response.status,
        body: `ElevenLabs API error: ${errorBody}`,
      };
    }

    // Get the audio data as a buffer and encode it to Base64
    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    // Return the Base64 audio data to the front-end
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audio: audioBase64 }),
      isBase64Encoded: false // Body is a JSON string, not the raw base64
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
