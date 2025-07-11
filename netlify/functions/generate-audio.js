// netlify/functions/generate-audio.js

exports.handler = async function(event) {
  // We only accept POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { text } = JSON.parse(event.body);
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    return { statusCode: 500, body: 'API key not configured.' };
  }

  const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
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
      model_id: 'eleven_multilingual_v2',
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
