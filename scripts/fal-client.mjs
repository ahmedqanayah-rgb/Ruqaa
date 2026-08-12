/*
 * Minimal fal.ai queue client, shared by generate-hero-frames.mjs and
 * generate-hero-video.mjs. See RESUME.md in ../../hero-video-wip for what the
 * hero is and why it exists.
 *
 * WHY FAL AND NOT BFL. The frames were originally generated straight from
 * api.bfl.ai (see git history of generate-hero-frames.mjs). fal hosts the same
 * FLUX.2 [pro] model *and* its /edit endpoint, and has no minimum top-up —
 * BFL's was $10 for what is ~$0.20 of frames. fal also hosts the video model,
 * which BFL credits could never have paid for, so one key covers the whole
 * pipeline.
 *
 * THESE SCRIPTS SPEND REAL MONEY. Every entry point requires an explicit
 * `--yes`; without it they print the estimated cost and exit. Keep that.
 *
 * The key lives at ../../.keys/fal.txt — OUTSIDE the git repo, deliberately.
 * Never move it in, never log it.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const KEY_FILE = path.resolve(__dirname, '../../.keys/fal.txt')

export function apiKey() {
  const k = process.env.FAL_KEY
    || (fs.existsSync(KEY_FILE) ? fs.readFileSync(KEY_FILE, 'utf8').trim() : '')
  if (!k || k.includes('PASTE')) {
    console.error(`No fal API key. Put it in ${KEY_FILE} (or set FAL_KEY).`)
    process.exit(1)
  }
  return k
}

const auth = (key) => ({ Authorization: `Key ${key}` })

/** Remaining account balance in USD. Cheap, and the honest pre-flight check. */
export async function balance(key) {
  const res = await fetch('https://rest.alpha.fal.ai/billing/user_balance', { headers: auth(key) })
  if (!res.ok) throw new Error(`balance ${res.status}: ${await res.text()}`)
  return parseFloat(await res.text())
}

/*
 * Upload bytes to fal's CDN and return a public URL.
 *
 * The models take image URLs, not base64. Data URIs do work for the FLUX edit
 * endpoint, but the video model rejects oversized ones, so everything goes
 * through here for consistency — a 1080p JPEG is ~150 KB either way.
 */
export async function upload(key, file) {
  const name = path.basename(file)
  const initRes = await fetch('https://rest.alpha.fal.ai/storage/upload/initiate?storage_type=fal-cdn-v3', {
    method: 'POST',
    headers: { ...auth(key), 'Content-Type': 'application/json' },
    body: JSON.stringify({ content_type: 'image/jpeg', file_name: name }),
  })
  if (!initRes.ok) throw new Error(`upload initiate ${initRes.status}: ${await initRes.text()}`)
  const { upload_url, file_url } = await initRes.json()

  const put = await fetch(upload_url, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/jpeg' },
    body: fs.readFileSync(file),
  })
  if (!put.ok) throw new Error(`upload put ${put.status}: ${await put.text()}`)
  return file_url
}

/*
 * Submit to the queue and poll to completion. Returns the parsed result.
 *
 * fal replies with { request_id, status_url, response_url }; status_url reports
 * IN_QUEUE / IN_PROGRESS / COMPLETED, and the payload only appears at
 * response_url once COMPLETED. Poll every 3s — video jobs take minutes, and a
 * tighter loop only earns rate limiting.
 */
export async function run(key, endpoint, input, { label = endpoint, timeoutMs = 15 * 60_000 } = {}) {
  const res = await fetch(`https://queue.fal.run/${endpoint}`, {
    method: 'POST',
    headers: { ...auth(key), 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`submit ${label} ${res.status}: ${await res.text()}`)
  const job = await res.json()

  process.stdout.write(`  queued ${job.request_id} `)
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 3000))
    const s = await fetch(job.status_url, { headers: auth(key) })
    if (!s.ok) throw new Error(`status ${s.status}: ${await s.text()}`)
    const st = await s.json()
    if (st.status === 'COMPLETED') {
      const out = await fetch(job.response_url, { headers: auth(key) })
      if (!out.ok) throw new Error(`result ${out.status}: ${await out.text()}`)
      process.stdout.write(' done\n')
      return out.json()
    }
    // fal surfaces moderation/validation refusals as a terminal non-COMPLETED
    // status; treat anything that isn't queued/running as fatal rather than
    // spinning until the timeout.
    if (st.status && !['IN_QUEUE', 'IN_PROGRESS'].includes(st.status)) {
      throw new Error(`${label} ended as ${st.status}: ${JSON.stringify(st)}`)
    }
    process.stdout.write('.')
  }
  throw new Error(`${label} timed out after ${Math.round(timeoutMs / 60000)}m`)
}

export async function download(url, file) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`download ${res.status} ${url}`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()))
  const kb = Math.round(fs.statSync(file).size / 1024)
  console.log(`  saved ${path.relative(process.cwd(), file)} (${kb} KB)`)
}

/*
 * Spend gate. Every entry point calls this before its first paid request:
 * prints the plan and the balance, and refuses to continue without --yes.
 */
export async function confirmSpend(key, { what, estimate }) {
  const bal = await balance(key)
  console.log(`\n${what}`)
  console.log(`  estimated cost : ~$${estimate.toFixed(2)}`)
  console.log(`  fal balance    : $${bal.toFixed(2)}`)
  if (bal < estimate) {
    console.error(`\nBalance is below the estimate. Top up at https://fal.ai/dashboard/billing`)
    process.exit(1)
  }
  if (!process.argv.includes('--yes')) {
    console.log(`\nDry run. Re-run with --yes to actually spend.`)
    process.exit(0)
  }
}
