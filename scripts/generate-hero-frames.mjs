// Generates the homepage-hero frames with FLUX.2 [pro] on fal.ai.
//
//   node scripts/generate-hero-frames.mjs                  → dry run (prints cost)
//   node scripts/generate-hero-frames.mjs --yes            → all 4 frames
//   node scripts/generate-hero-frames.mjs --yes --only landscape
//   node scripts/generate-hero-frames.mjs --yes --only portrait
//   node scripts/generate-hero-frames.mjs --yes --seed 1234   → reproducible retry
//
// Key: ../.keys/fal.txt (outside the repo) or env FAL_KEY. See fal-client.mjs.
//
// Flow (consistency comes from chaining edits, never fresh generations):
//   1. frame1-landscape  — text-to-image: neat stack, plain covers
//   2. frame2-landscape  — EDIT of #1: same scene, stack toppled, top book open
//   3. frame1-portrait   — EDIT of #1: same scene recomposed vertically
//   4. frame2-portrait   — EDIT of #3: same topple edit
// Outputs overwrite public/images/hero/frame{1,2}-{landscape,portrait}.jpg.
//
// ⚠ After regenerating, RE-CALIBRATE the quads in src/data/heroScene.js — they
//   are pixel coordinates read off these exact images.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { apiKey, upload, run, download, confirmSpend } from './fal-client.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '../public/images/hero')

const GEN = 'fal-ai/flux-2-pro'
const EDIT = 'fal-ai/flux-2-pro/edit'
const PRICE = 0.046 // USD per image, fal's FLUX.2 [pro] rate at time of writing

// 1920x1088 rather than 1920x1080: FLUX wants multiples of 32. heroScene.js
// carries the same numbers as imageW/imageH, so the overlay maths matches.
const LAND = { width: 1920, height: 1088 }
const PORT = { width: 1088, height: 1920 }

const SCENE = 'A photorealistic still: a rustic wooden table in a warm, softly lit room with a plain warm-beige wall. On the table, a neat stack of five thick hardcover books with completely plain, unmarked cloth covers in muted colours (olive, terracotta, slate blue, sand, walnut brown). Absolutely no text, no titles, no logos anywhere. Soft diffuse window light from the left, gentle shadows, slightly elevated three-quarter camera angle, shallow warm tones, calm still-life photography.'

const TOPPLE = 'Edit this exact scene, keeping the same camera angle, table, wall and lighting: an instant later the stack has toppled over. The books lie scattered flat and askew on the table. One book leans against the fallen pile with its plain unmarked front cover facing the camera squarely. The topmost book has fallen open in the foreground, showing two blank cream paper pages with no text. Everything else identical. No text anywhere.'

const REFRAME = 'Recompose this exact scene as a vertical portrait photograph: same table, same neat stack of five plain unmarked hardcover books, same wall, same soft window light, camera slightly closer so the stack fills the lower half of the frame. No text anywhere.'

const args = process.argv.slice(2)
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
const seed = args.includes('--seed') ? +args[args.indexOf('--seed') + 1] : null

const f = (n) => path.join(OUT, n)

async function generate({ prompt, input, size, out }) {
  console.log(`\n→ ${path.basename(out)} (${size.width}x${size.height})${input ? ` [edit of ${path.basename(input)}]` : ''}`)
  const body = {
    prompt,
    image_size: size,
    output_format: 'jpeg',
    safety_tolerance: '2', // string enum on fal, not a number
  }
  if (seed != null) body.seed = seed
  // The edit endpoint takes an ARRAY of URLs, so the chained frame is uploaded
  // to fal's CDN first rather than sent as base64.
  if (input) body.image_urls = [await upload(key, input)]

  const result = await run(key, input ? EDIT : GEN, body, { label: path.basename(out) })
  const url = result?.images?.[0]?.url
  if (!url) throw new Error(`no image in result: ${JSON.stringify(result).slice(0, 400)}`)
  await download(url, out)
}

const key = apiKey()
const count = only ? 2 : 4
await confirmSpend(key, {
  what: `Hero frames — ${count} × FLUX.2 [pro] on fal${only ? ` (${only} only)` : ''}`,
  estimate: count * PRICE,
})

fs.mkdirSync(OUT, { recursive: true })
try {
  if (only !== 'portrait') {
    await generate({ prompt: SCENE, size: LAND, out: f('frame1-landscape.jpg') })
    await generate({ prompt: TOPPLE, input: f('frame1-landscape.jpg'), size: LAND, out: f('frame2-landscape.jpg') })
  }
  if (only !== 'landscape') {
    // Chained off the landscape frame1 so both orientations are the same room.
    await generate({ prompt: REFRAME, input: f('frame1-landscape.jpg'), size: PORT, out: f('frame1-portrait.jpg') })
    await generate({ prompt: TOPPLE, input: f('frame1-portrait.jpg'), size: PORT, out: f('frame2-portrait.jpg') })
  }
  console.log('\nDone. Review the frames, then RE-CALIBRATE the quads in src/data/heroScene.js.')
} catch (e) {
  console.error('\nFAILED:', e.message)
  process.exit(1)
}
