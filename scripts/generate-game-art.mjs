// Generates the photographs the club's dice game wears, with FLUX.2 [pro] on fal.ai.
//
//   node scripts/generate-game-art.mjs                    → dry run (prints plan + cost)
//   node scripts/generate-game-art.mjs --yes              → every image that has no master yet
//   node scripts/generate-game-art.mjs --yes --only luck,dare   → just these (re-rolls them)
//   node scripts/generate-game-art.mjs --yes --only cover --seed 1234
//   node scripts/generate-game-art.mjs --publish-only     → re-emit the WebPs from the masters (free)
//
// Key: ../.keys/fal.txt (outside the repo) or env FAL_KEY. See fal-client.mjs.
//
// ONE TABLE. Every picture is the same thing the homepage hero is: an overhead
// flat-lay on a dark rustic wooden table in soft window light (the hero's own
// prompt is in generate-hero-frames.mjs; STYLE below is its scaffold). The game
// is played "on the club's table", and these are what is lying on it.
//
// NOTHING IN THEM IS TEXT. No letters, no numbers, no logos — so a picture can
// be mirrored for the right-to-left page and cropped to any shape without ever
// cutting a word in half, and nothing in it has to be translated.
//
// WHAT EACH ONE IS FOR (src/components/game/art.js maps them):
//   cover       the game's door on a WIDE screen: the card on Home and the top
//               of the setup screen. A wide strip, pieces in a row on the right
//               two thirds, bare wood on the left third for the words.
//   cover-tall  the same door on a PHONE: a poster, pieces in the upper part,
//               bare wood below them for the words.
//   table       the stage's ground — an empty table top, shipped dark and soft.
//   <book id>   the band across a question card from that book.
//   tf / luck / dare / win   the band across those cards and the result.
// The bands are cropped to a wide strip, so their objects sit in a row across
// the middle with bare wood above and below.
//
// A PICTURE IS COMPOSED FOR THE SHAPE IT IS SHOWN IN. The first cover was a
// handsome 3:2 with the pieces stacked in a tall cluster — and no crop of it
// worked: a wide banner cut through the book and the cup, a phone poster left
// half the frame as empty wood. Two pictures, each laid out for its frame, is
// the same decision the hero made with its landscape and portrait frames.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { apiKey, run, download, confirmSpend } from './fal-client.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/* Same split as the hero frames: full-resolution MASTERS stay outside the repo
   (they are inputs), and public/ gets only what members download — WebP, sized
   for where it is shown. */
const MASTERS = path.resolve(__dirname, '../../game-art-wip/masters')
const SHIP = path.resolve(__dirname, '../public/images/game')

const GEN = 'fal-ai/flux-2-pro'
/* USD per image, deliberately high. The list rate is ~$0.03–0.045 at these
   sizes, but real billing on this account has run about 50% over list (see
   generate-hero-frames.mjs), and an estimate that undercounts is worse than
   none. */
const PRICE = 0.06

const STYLE = 'A photorealistic overhead flat-lay photograph looking straight down from directly above a rustic dark wooden table with wide old planks. Soft diffuse window light, gentle shadows, warm tones, calm still-life photography, shallow natural contrast. Absolutely no text, no letters, no numbers, no writing, no logos and no people anywhere in the picture.'
const ROW = 'The objects are arranged in a loose horizontal row across the vertical centre of the frame, evenly spaced, with plain bare wood filling the top third and the bottom third of the picture.'

const WIDE = { width: 1536, height: 1024 }  // 3:2 — the table
const BAND = { width: 1568, height: 672 }   // 21:9 — the card bands and the wide cover
const TALL = { width: 1024, height: 1280 }  // 4:5 — the phone's cover

/* `ship` is the WebP that goes to public/: its width and quality. The table is
   the one shipped rough on purpose — it sits under a dark veil, where grain
   that would cost 200 kB at a normal quality cannot be seen at all.
   `band: 3` first crops the master to a 3:1 strip across its vertical centre:
   a card shows the picture as a strip about that shape, so the bare wood above
   and below the objects would be downloaded and never seen. */
const ART = {
  cover: {
    size: BAND, ship: { width: 1280, quality: 66 },
    /* No OPEN book here, and that is the lesson of the first roll: asked for
       "an open hardcover book with two clean blank cream pages", the model
       printed «Chapter One» across them and the word «Card» on the top card. A
       closed cloth cover and "unprinted" cards give it no page to write on.

       LOOK AT THE DICE AND THE PAWNS before shipping a new roll of this one. The
       same prompt has returned a die with a pawn's head growing out of it — the
       two small wooden things, fused. The roll that ships has three plain dice
       and four separate pawns; nothing in the prompt guarantees the next will. */
    prompt: `${STYLE} A board-game night laid out on the table: three wooden dice, a neat small stack of completely blank unprinted cream cards with one card slid loose from the stack, six small turned wooden game pawns in muted colours (amber yellow, sky blue, mint green, rose pink, lavender and ivory white) standing in a loose cluster, one closed hardcover book with a plain unmarked sand-coloured cloth cover, and a white ceramic cup of black coffee on a saucer. Every surface is plain and unprinted. These objects are arranged in a loose horizontal row across the vertical centre of the RIGHT two thirds of the frame, with plain bare wood above and below them. The LEFT third of the frame is completely empty bare dark wood with nothing on it.`,
  },
  'cover-tall': {
    size: TALL, ship: { width: 800, quality: 66 },
    prompt: `${STYLE} A vertical portrait photograph of a board-game night laid out on the table: three wooden dice, a neat small stack of completely blank unprinted cream cards with one card slid loose from the stack, six small turned wooden game pawns in muted colours (amber yellow, sky blue, mint green, rose pink, lavender and ivory white) standing in a loose cluster, one closed hardcover book with a plain unmarked sand-coloured cloth cover, and a white ceramic cup of black coffee on a saucer. Every surface is plain and unprinted. All of these objects are grouped together in the UPPER half of the frame. The entire LOWER third of the frame is completely empty bare dark wood with nothing on it.`,
  },
  table: {
    size: WIDE, ship: { width: 1100, quality: 42 },
    prompt: `${STYLE} The table top is completely empty: only the bare dark wooden planks, their grain, a few knots and the fine gaps between the boards, filling the entire frame evenly from edge to edge. No objects of any kind.`,
  },
  'why-we-sleep': {
    size: BAND, ship: { width: 960, quality: 68, band: 3 },
    prompt: `${STYLE} Objects about sleep: a vintage brass twin-bell alarm clock lying on its back with a plain blank cream dial and no numerals, a folded midnight-blue silk sleep mask, a small brass crescent-moon ornament, and a white ceramic cup of pale chamomile tea on a saucer. ${ROW}`,
  },
  'stolen-focus': {
    size: BAND, ship: { width: 960, quality: 68, band: 3 },
    /* No magnifying glass: the first roll gave it two handles, at right angles.
       (The myth-or-fact picture has the site's one magnifying glass.) */
    prompt: `${STYLE} Objects about attention: a black smartphone lying face down so that only its plain matte back is visible, a pair of white wired earphones in a loose coil, one single pair of round tortoiseshell reading glasses lying open with its two lenses side by side, and a small closed notebook with a plain unmarked kraft-brown cover with a plain yellow pencil lying beside it. ${ROW}`,
  },
  'talking-to-my-daughter': {
    size: BAND, ship: { width: 960, quality: 68, band: 3 },
    prompt: `${STYLE} Objects about money: four small neat stacks of old worn bronze and silver coins of different heights, a small antique brass balance scale with two empty pans, and a small undyed linen pouch lying open with a few coins spilling out of it. ${ROW}`,
  },
  tf: {
    size: BAND, ship: { width: 960, quality: 68, band: 3 },
    prompt: `${STYLE} A brass magnifying glass with a wooden handle lies between two plain blank playing cards placed side by side: one card is matte black and the other is cream white, both completely blank. A single white feather rests beside them. ${ROW}`,
  },
  luck: {
    size: BAND, ship: { width: 960, quality: 68, band: 3 },
    prompt: `${STYLE} Objects of chance: three ivory dice that have just come to rest at different angles, a small fan of four plain blank cream playing cards, and a scattering of small polished brass star-shaped tokens. ${ROW}`,
  },
  dare: {
    size: BAND, ship: { width: 960, quality: 68, band: 3 },
    prompt: `${STYLE} Objects of a performance: a vintage chrome stage microphone lying on its side with its black cable in a loose coil, a small brass handbell with a wooden handle, and a scattering of colourful paper confetti in amber, sky blue, mint, rose and lavender. ${ROW}`,
  },
  win: {
    size: BAND, ship: { width: 960, quality: 68, band: 3 },
    prompt: `${STYLE} A winner's table: a green laurel wreath lying flat, a plain polished gold medal with a completely blank smooth face on a folded dark red ribbon, and colourful paper confetti and thin curled paper streamers in amber, sky blue, mint, rose and lavender scattered around them. ${ROW}`,
  },
}

const args = process.argv.slice(2)
const flag = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null)
const only = flag('--only')?.split(',').map((s) => s.trim()).filter(Boolean) || null
const seed = flag('--seed') ? +flag('--seed') : null
const master = (name) => path.join(MASTERS, `${name}.jpg`)

for (const name of only || []) {
  if (!ART[name]) { console.error(`Unknown image "${name}". Known: ${Object.keys(ART).join(', ')}`); process.exit(1) }
}

/** Emit the shipped WebP from a full-resolution master. Free. */
async function publish(name) {
  const { ship, size } = ART[name]
  fs.mkdirSync(SHIP, { recursive: true })
  const out = path.join(SHIP, `${name}.webp`)
  let img = sharp(master(name))
  if (ship.band) {
    const height = Math.round(size.width / ship.band)
    img = img.extract({ left: 0, top: Math.round((size.height - height) / 2), width: size.width, height })
  }
  await img.resize({ width: ship.width, withoutEnlargement: true }).webp({ quality: ship.quality }).toFile(out)
  console.log(`  → ${path.relative(process.cwd(), out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`)
}

if (args.includes('--publish-only')) {
  const have = Object.keys(ART).filter((n) => fs.existsSync(master(n)))
  for (const n of have) await publish(n)
  console.log(`\nRe-published ${have.length} image(s) from masters. No API calls, nothing spent.`)
  process.exit(0)
}

// Named images are re-rolled; otherwise only the ones with no master yet are
// made, so a second run after a partial failure does not pay twice.
const todo = only || Object.keys(ART).filter((n) => !fs.existsSync(master(n)))
if (!todo.length) { console.log('Every image already has a master. Name one with --only to re-roll it.'); process.exit(0) }

const key = apiKey()
await confirmSpend(key, {
  what: `Game art — ${todo.length} × FLUX.2 [pro] on fal: ${todo.join(', ')}`,
  estimate: todo.length * PRICE,
})

fs.mkdirSync(MASTERS, { recursive: true })
let failed = 0
for (const name of todo) {
  const { prompt, size } = ART[name]
  console.log(`\n→ ${name} (${size.width}x${size.height})`)
  try {
    const body = { prompt, image_size: size, output_format: 'jpeg', safety_tolerance: '2' }
    if (seed != null) body.seed = seed
    const result = await run(key, GEN, body, { label: name })
    const url = result?.images?.[0]?.url
    if (!url) throw new Error(`no image in result: ${JSON.stringify(result).slice(0, 300)}`)
    await download(url, master(name))
    await publish(name)
  } catch (e) {
    failed++
    console.error(`  FAILED ${name}: ${e.message}`)
  }
}
console.log(failed ? `\nDone, with ${failed} failure(s) — re-run to fill the gaps.` : '\nDone. Look at every picture before shipping it.')
process.exit(failed ? 1 : 0)
