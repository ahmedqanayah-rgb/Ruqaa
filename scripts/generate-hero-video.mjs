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
const WIP = path.resolve(__dirname, '../../hero-video-wip')

const MODEL = 'fal-ai/veo3.1/fast/first-last-frame-to-video'
const PRICE_PER_SEC = 0.10 // USD, Veo 3.1 Fast at time of writing, audio off

/*
 * THE MOTION PROMPT MUST DESCRIBE THE END STATE THE LAST FRAME ACTUALLY SHOWS.
 *
 * The first version said the stack "topples over… books sliding and falling
 * FLAT across the table". But frame2 ends with the pale book standing upright,
 * propped against the pile, cover to camera — that is the flat surface the hero
 * composites the real cover onto, so it cannot change. Given a motion that ends
 * flat and a target frame that ends upright, the model did both in sequence:
 * the books fell flat, and then one rose back up off the table to meet the
 * final frame. Books do not stand up after they fall, and it read as exactly
 * that mistake.
 *
 * A book sliding off a stack and coming to rest leaning against it is perfectly
 * natural. The prompt just has to say so — describe the settle, not a collapse.
 */
const TOPPLING_MOTION = 'The stack of books tips and slides apart on the table. The pale book on top slides off to the right and comes to rest leaning upright against the side of the remaining pile, its front cover facing the camera. A book slides forward out of the stack and flops open face up on the table in front. The books settle and stop moving. Locked-off static camera, no camera movement, no zoom, no pan. Natural physics and weight, soft indoor light. No text, no captions, no people, no hands.'

/* The overhead ("Übersicht") treatment: one closed book falls open beside a cup
 * of coffee, seen straight down. Two things are called out explicitly because
 * they are the obvious ways this goes wrong — a book does not open itself, so
 * the model is inclined to add a hand; and the cup is the one object that must
 * not drift, since it is in both frames and the eye locks onto it. */
const OVERHEAD_MOTION = 'Seen from directly above, the closed book\'s front cover lifts and swings open to the left, the pages fanning over and settling flat, until the book lies fully open showing two blank cream pages. The book comes to rest and stops moving. The cup of coffee stays completely still and does not move at any point. Locked-off overhead camera looking straight down, no camera movement, no zoom, no pan. Natural physics and weight, soft indoor light. No hands, no people, no text, no captions.'

const SCENES = {
  toppling: { motion: TOPPLING_MOTION },
  overhead: { motion: OVERHEAD_MOTION },
}

// The tail exists because of a real failure: take 1 of the toppling scene let a
// book rise back off the table to reach the target frame.
const NEGATIVE = 'camera movement, zoom, pan, people, hands, fingers, arms, text, captions, watermark, subtitles, books rising off the table, objects floating upward, reversed motion'

const args = process.argv.slice(2)
const arg = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback)
const only = arg('--only', null)
const duration = arg('--duration', '6s')      // enum: 4s | 6s | 8s — NOT free-form
const resolution = arg('--resolution', '1080p') // 720p | 1080p | 4k
const seed = args.includes('--seed') ? +args[args.indexOf('--seed') + 1] : null
const scene = arg('--scene', 'toppling')
if (!SCENES[scene]) {
  console.error(`Unknown --scene "${scene}". Known: ${Object.keys(SCENES).join(', ')}`)
  process.exit(1)
}
// The full-resolution JPEG masters, not the WebP that public/ ships — feed the
// video model the best pixels available, and it wants a plain jpeg URL.
const FRAMES = path.join(WIP, 'frames', scene)
const OUT = path.join(WIP, 'renders', scene)

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
    prompt: SCENES[scene].motion,
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
  what: `Hero video [${scene}] — ${takes.map((t) => t.name).join(' + ')} @ ${duration} ${resolution}, audio off`,
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
