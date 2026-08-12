// Generates the homepage-hero video from the frames, with Veo 3.1 Fast
// (first-last-frame-to-video) on fal.ai.
//
//   node scripts/generate-hero-video.mjs                   → dry run (prints cost)
//   node scripts/generate-hero-video.mjs --yes             → both orientations
//   node scripts/generate-hero-video.mjs --yes --only landscape
//   node scripts/generate-hero-video.mjs --yes --duration 4s --resolution 720p
//
// It feeds frame1 (neat stack) as the first frame and frame2 (toppled, top book
// fallen open) as the last, so the motion lands exactly on the still the hero
// then freezes on — that alignment is the whole point of a first+last-frame
// model, and why plain image-to-video was rejected.
//
// Raw output goes to ../../hero-video-wip/renders/ (OUTSIDE the repo — the hero
// is a surprise, and these are 20-40 MB each). Encode the chosen take into
// public/videos/ with encode-hero-video.mjs.
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { apiKey, upload, run, download, confirmSpend } from './fal-client.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FRAMES = path.resolve(__dirname, '../public/images/hero')
const OUT = path.resolve(__dirname, '../../hero-video-wip/renders')

const MODEL = 'fal-ai/veo3.1/fast/first-last-frame-to-video'
const PRICE_PER_SEC = 0.10 // USD, Veo 3.1 Fast at time of writing, audio off

const MOTION = 'The stack of books topples over naturally under its own weight, books sliding and falling flat across the table, and the topmost book lands face up and falls open. Static locked-off camera, no camera movement, no zoom. Natural physics, soft indoor light. No text, no captions, no people.'

const NEGATIVE = 'camera movement, zoom, pan, people, hands, text, captions, watermark, subtitles'

const args = process.argv.slice(2)
const arg = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback)
const only = arg('--only', null)
const duration = arg('--duration', '6s')      // enum: 4s | 6s | 8s — NOT free-form
const resolution = arg('--resolution', '1080p') // 720p | 1080p | 4k
const seed = args.includes('--seed') ? +args[args.indexOf('--seed') + 1] : null

const takes = [
  { name: 'landscape', aspect: '16:9' },
  { name: 'portrait', aspect: '9:16' },
].filter((t) => !only || t.name === only)

async function render({ name, aspect }) {
  console.log(`\n→ hero-${name} (${aspect}, ${duration}, ${resolution})`)
  const [first, last] = await Promise.all([
    upload(key, path.join(FRAMES, `frame1-${name}.jpg`)),
    upload(key, path.join(FRAMES, `frame2-${name}.jpg`)),
  ])
  const body = {
    prompt: MOTION,
    negative_prompt: NEGATIVE,
    first_frame_url: first,
    last_frame_url: last,
    aspect_ratio: aspect,
    duration,
    resolution,
    // Both of these default the expensive way: duration defaults to 8s and
    // generate_audio to true. The hero is a muted background video, so audio is
    // pure cost — keep it off.
    generate_audio: false,
    safety_tolerance: '4',
  }
  if (seed != null) body.seed = seed

  const result = await run(key, MODEL, body, { label: `hero-${name}`, timeoutMs: 20 * 60_000 })
  const url = result?.video?.url
  if (!url) throw new Error(`no video in result: ${JSON.stringify(result).slice(0, 400)}`)
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  await download(url, path.join(OUT, `hero-${name}-${stamp}.mp4`))
}

const key = apiKey()
const secs = parseInt(duration, 10) * takes.length
await confirmSpend(key, {
  what: `Hero video — ${takes.map((t) => t.name).join(' + ')} @ ${duration} ${resolution}, audio off`,
  estimate: secs * PRICE_PER_SEC,
})

try {
  for (const take of takes) await render(take)
  console.log(`\nDone. Raw takes in hero-video-wip/renders/ — review, pick one per`)
  console.log(`orientation, then: node scripts/encode-hero-video.mjs <landscape.mp4> <portrait.mp4>`)
} catch (e) {
  console.error('\nFAILED:', e.message)
  process.exit(1)
}
