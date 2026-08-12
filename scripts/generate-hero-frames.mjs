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
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { apiKey, upload, run, download, confirmSpend } from './fal-client.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/*
 * Two homes, following the same split as assets-src/ → public/images/clean/:
 *
 *   MASTERS  full-resolution JPEGs, OUTSIDE the repo. These are pipeline
 *            inputs — the video model uploads them, and the quads in
 *            heroScene.js are read off them — not things members download.
 *   SHIP     what public/ actually serves: the same frames as WebP.
 *
 * That split is not tidiness. The four JPEGs are 3.1 MB; as WebP they are
 * 0.76 MB. public/ is copied verbatim into dist, and the site's entire image
 * budget was cut to 3.9 MB on purpose — shipping the masters would have put
 * most of that back for four pictures.
 */
const MASTERS = path.resolve(__dirname, '../../hero-video-wip/frames')
const SHIP = path.resolve(__dirname, '../public/images/hero')
const WEBP_QUALITY = 72
const OUT = MASTERS

const GEN = 'fal-ai/flux-2-pro'
const EDIT = 'fal-ai/flux-2-pro/edit'
const PRICE = 0.046 // USD per image, fal's FLUX.2 [pro] rate at time of writing

// 1920x1088 rather than 1920x1080: FLUX wants multiples of 32. heroScene.js
// carries the same numbers as imageW/imageH, so the overlay maths matches.
const LAND = { width: 1920, height: 1088 }
const PORT = { width: 1088, height: 1920 }

const SCENE = 'A photorealistic still: a rustic wooden table in a warm, softly lit room with a plain warm-beige wall. On the table, a neat stack of five thick hardcover books with completely plain, unmarked cloth covers in muted colours (olive, terracotta, slate blue, sand, walnut brown). Absolutely no text, no titles, no logos anywhere. Soft diffuse window light from the left, gentle shadows, slightly elevated three-quarter camera angle, shallow warm tones, calm still-life photography.'

const TOPPLE = 'Edit this exact scene, keeping the same camera angle, table, wall and lighting: an instant later the stack has toppled over. The books lie scattered flat and askew on the table. One book leans against the fallen pile with its plain unmarked front cover facing the camera squarely. The topmost book has fallen open in the foreground, showing two blank cream paper pages with no text. Everything else identical. No text anywhere.'

/*
 * The portrait pair deliberately keeps the books HIGH in the frame.
 *
 * The hero overlays its own logo, tagline pill, headline and three CTAs across
 * the bottom of the box. Measured on a 375x812 phone, that block is the bottom
 * 236px of a 633px hero — so a stack composed into the lower half puts the
 * ink title directly underneath the tagline pill. Leaving the lower third as
 * bare table is what keeps "the open book IS the hero" readable on a phone.
 * Landscape does not need this: the box is far wider than the text block.
 */
const REFRAME = 'Recompose this exact scene as a vertical portrait photograph: same table, same neat stack of five plain unmarked hardcover books, same wall, same soft window light. Compose it so the stack of books sits in the UPPER half of the picture, with the bottom third of the frame left as empty, uncluttered table surface falling into soft shadow. No text anywhere.'

const TOPPLE_PORTRAIT = `${TOPPLE} Keep every book within the upper two thirds of the vertical frame, leaving the bottom third as empty table surface.`

/*
 * --restack regenerates frame1 as an edit OF frame2, i.e. backwards.
 *
 * The forward chain drifts. Asked to topple the stack, FLUX also pulled the
 * camera back (frame1 landscape was a tight close-up, frame2 a much wider
 * shot) and in portrait it rearranged the scene outright. A first+last-frame
 * video model handed that pair does not animate a topple — it morphs between
 * two different photographs.
 *
 * Frame2 is the one that matters most: it is the still the hero freezes on,
 * and the cover quad and title spot are calibrated against it. So rather than
 * re-rolling frame2 until it happens to match frame1, rewind frame2 into a
 * neat stack and use that as frame1. The pair then shares one camera by
 * construction.
 */
const RESTACK = 'Edit this exact scene, keeping the same camera angle, framing, distance, table, wall and lighting absolutely unchanged: rewind time so the books are gathered back into one neat, tidy stack. Every book is closed and squarely stacked on top of the next, plain unmarked covers, nothing leaning, nothing lying open. Same books, same colours, same room, same soft window light, same composition. No text anywhere.'

const args = process.argv.slice(2)
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
const seed = args.includes('--seed') ? +args[args.indexOf('--seed') + 1] : null
const restack = args.includes('--restack')

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
  await publish(out)
}

/** Emit the shipped WebP next to public/, from a full-res master. */
async function publish(master) {
  fs.mkdirSync(SHIP, { recursive: true })
  const out = path.join(SHIP, path.basename(master).replace(/\.jpg$/, '.webp'))
  await sharp(master).webp({ quality: WEBP_QUALITY }).toFile(out)
  const kb = Math.round(fs.statSync(out).size / 1024)
  console.log(`  → ${path.relative(process.cwd(), out)} (${kb} KB)`)
}

// Re-emit the shipped WebP from existing masters. Free — no API call, so it
// runs before the spend gate.
if (args.includes('--publish-only')) {
  for (const f of fs.readdirSync(MASTERS).filter((n) => n.endsWith('.jpg'))) await publish(path.join(MASTERS, f))
  console.log('\nRe-published from masters. No API calls, nothing spent.')
  process.exit(0)
}

const key = apiKey()
const count = (restack ? 1 : 2) * (only ? 1 : 2)
await confirmSpend(key, {
  what: restack
    ? `Hero frames — re-deriving frame1 from frame2 (${count} × FLUX.2 [pro] edit)${only ? ` (${only} only)` : ''}`
    : `Hero frames — ${count} × FLUX.2 [pro] on fal${only ? ` (${only} only)` : ''}`,
  estimate: count * PRICE,
})

fs.mkdirSync(OUT, { recursive: true })
try {
  if (restack) {
    for (const orient of ['landscape', 'portrait']) {
      if (only && only !== orient) continue
      const size = orient === 'landscape' ? LAND : PORT
      await generate({ prompt: RESTACK, input: f(`frame2-${orient}.jpg`), size, out: f(`frame1-${orient}.jpg`) })
    }
    console.log('\nDone. frame1 now shares frame2\'s camera — check the pair reads as one topple.')
    process.exit(0)
  }
  if (only !== 'portrait') {
    await generate({ prompt: SCENE, size: LAND, out: f('frame1-landscape.jpg') })
    await generate({ prompt: TOPPLE, input: f('frame1-landscape.jpg'), size: LAND, out: f('frame2-landscape.jpg') })
  }
  if (only !== 'landscape') {
    // Chained off the landscape frame1 so both orientations are the same room.
    await generate({ prompt: REFRAME, input: f('frame1-landscape.jpg'), size: PORT, out: f('frame1-portrait.jpg') })
    await generate({ prompt: TOPPLE_PORTRAIT, input: f('frame1-portrait.jpg'), size: PORT, out: f('frame2-portrait.jpg') })
  }
  console.log('\nDone. Review the frames, then RE-CALIBRATE the quads in src/data/heroScene.js.')
} catch (e) {
  console.error('\nFAILED:', e.message)
  process.exit(1)
}
