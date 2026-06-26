// netlify/functions/report-bug.js
//
// Receives a diagnostic payload from the chapter reader when it lands on an
// unexpected page (a blank / cover / end page during read-along — the "blank
// white page" bug) and emails it via Resend so we get the data off a device we
// can't open a console on.
//
// Env vars:
//   RESEND_API_KEY  (required)  — Resend API key.
//   BUG_REPORT_TO   (optional)  — recipient; defaults to rose.yao@gmail.com.
//   BUG_REPORT_FROM (optional)  — sender; defaults to Resend's shared sender,
//                                 which can email the account owner without a
//                                 verified domain.

const DEFAULT_TO = 'rose.yao@gmail.com';
const DEFAULT_FROM = 'Berrybook Diagnostics <onboarding@resend.dev>';

// Same origin gate as generate-audio.js: accept the canonical site URL, any
// explicit ALLOWED_ORIGINS, and any netlify subdomain of this site (deploy
// previews / branch deploys / per-commit hashes).
function originAllowed(event) {
  const trim = (u) => (u || '').replace(/\/$/, '');
  const explicit = new Set([
    process.env.URL,
    ...(process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
  ].filter(Boolean).map(trim));
  const origin = trim((event.headers && (event.headers.origin || event.headers.Origin)) || '');
  if (explicit.has(origin)) return true;
  if (!origin) return false;
  try {
    const reqHost = new URL(origin).hostname;
    const hosts = [];
    if (process.env.URL) { try { hosts.push(new URL(process.env.URL).hostname); } catch {} }
    if (process.env.SITE_NAME) hosts.push(`${process.env.SITE_NAME}.netlify.app`);
    return hosts.some((h) => reqHost === h || reqHost.endsWith(`--${h}`));
  } catch {
    return false;
  }
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  if (!originAllowed(event)) return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
  if ((event.body || '').length > 32768) return { statusCode: 413, body: JSON.stringify({ error: 'Payload too large' }) };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { statusCode: 501, body: JSON.stringify({ error: 'Reporting not configured' }) };

  let payload;
  try { payload = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const reason = String(payload.reason || 'unknown').slice(0, 200);
  const pretty = JSON.stringify(payload, null, 2).slice(0, 28000);

  // Always log to the function console so the diagnostic is retrievable from
  // Netlify's function logs even if Resend isn't configured / the send fails.
  console.log('[chapter-reader-bug]', reason, pretty);

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.BUG_REPORT_FROM || DEFAULT_FROM,
        to: process.env.BUG_REPORT_TO || DEFAULT_TO,
        subject: `📕 Berrybook chapter-reader bug: ${reason}`,
        text: `The chapter reader hit an unexpected state.\n\nReason: ${reason}\n\nFull diagnostic:\n\n${pretty}`,
      }),
    });
    if (!resp.ok) {
      const detail = (await resp.text()).slice(0, 300);
      console.warn(`Resend failed (${resp.status}): ${detail}`);
      return { statusCode: 502, body: JSON.stringify({ error: 'Send failed', detail }) };
    }
  } catch (err) {
    console.warn('report-bug error:', err.message);
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
