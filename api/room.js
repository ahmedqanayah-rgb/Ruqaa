import { handleRoom } from './_mailbox.js'

/*
 * POST /api/room — the game's one endpoint, as a Vercel Function.
 *
 * All the logic is in ./_mailbox.js (the underscore keeps Vercel from turning
 * that file into a route of its own); this is only the adapter. The same
 * `handleRoom` is mounted on the dev and preview servers by vite.config.js, so
 * `npm run dev` and production run identical code.
 *
 * Same-origin only: no CORS headers are sent, so a page on another site cannot
 * read a reply. Nothing is cached anywhere.
 */
const MAX_BODY = 64_000

function readBody(req) {
  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > MAX_BODY) { raw = ''; req.destroy() }
    })
    req.on('end', () => resolve(raw))
    req.on('error', () => resolve(''))
  })
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    return res.end()
  }

  /* Vercel parses a JSON body into `req.body` — and its getter THROWS on bad
     JSON, hence the try. Where nothing parsed it (another host, a different
     content type), read the stream ourselves. */
  let body
  try { body = req.body } catch { body = null }
  if (body === undefined) body = await readBody(req)
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(body)) body = body.toString('utf8')
  if (typeof body === 'string') {
    if (body.length > MAX_BODY) body = null
    else { try { body = JSON.parse(body) } catch { body = null } }
  }

  const out = handleRoom(body)
  res.statusCode = out.status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(out.json))
}
