// Paints the game's BOARDS — illustrated maps — over a layout sketch drawn
// from the game's own road (src/lib/game/board.js).
//
// THE BOOK BOARDS (2026-11-17, the game's three-board road). One board per book,
// painted over that book's road (every other book's is mirrored, see
// `mirrored` in board.js) with the first map as the STYLE reference:
//   node scripts/generate-game-board.mjs --book why-we-sleep               → dry run: sketch, plan, cost
//   node scripts/generate-game-board.mjs --book why-we-sleep --yes         → one take, saved as a master
//   node scripts/generate-game-board.mjs --book why-we-sleep --overlay <master>   → the squares over it (free)
//   node scripts/generate-game-board.mjs --book why-we-sleep --publish <master>   → ship it (free)
//
// THE FIRST MAP (one board with all three books; now the game's poster):
//   node scripts/generate-game-board.mjs                       → dry run: writes the sketch, prints the plan + cost
//   node scripts/generate-game-board.mjs --yes --model banana  → one painting (a "take"), saved as a master
//   node scripts/generate-game-board.mjs --yes --model seedream --seed 7
//   node scripts/generate-game-board.mjs --overlay <master>    → the squares drawn over a take, to check the fit (free)
//   node scripts/generate-game-board.mjs --publish <master>    → ship that take as public/images/game/board.webp (free)
//   node scripts/generate-game-board.mjs --yes --cover         → the wide cover, painted in the chosen board's style
//   node scripts/generate-game-board.mjs --publish-cover <master>   → ship it as public/images/game/cover.webp (free)
//
// Key: ../.keys/fal.txt (outside the repo) or env FAL_KEY. See fal-client.mjs.
//
// WHY A SKETCH FIRST. The squares and tokens are drawn by the page, on top of
// the picture, at points along the road in board.js. A picture painted from
// words alone puts its road wherever it likes, and thirty-six squares then
// float over rooftops. So the road is drawn first — the exact curve the page
// uses, as a pale band on three bands of colour — and the model is asked to
// paint a finished map AROUND it, keeping the road where it is. The fit is
// then checked with --overlay before anything ships; if board.js ever changes,
// the picture has to be painted again.
//
// NOTHING IN IT IS TEXT, like every other picture the game wears: no word to
// translate, and nothing that reads backwards in either direction.
//
// Masters (full size) stay OUTSIDE the repo in ../game-art-wip/masters/, the
// same split as the hero frames and the game's photographs.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { apiKey, upload, run, download, confirmSpend } from './fal-client.mjs'
import { pathLine, pathPoints, stepSize, TYPES, mirrored } from '../src/lib/game/board.js'

/* Where the first map's three regions met: the last square of each zone. */
const ZONE_ENDS = [13, 23, 34]

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WIP = path.resolve(__dirname, '../../game-art-wip')
const MASTERS = path.join(WIP, 'masters')
const shipFor = (file) => path.resolve(__dirname, `../public/images/game/${file}.webp`)

const args = process.argv.slice(2)
const flag = (name) => args.includes(`--${name}`)
const value = (name, fallback = null) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : fallback }

/* The sketch: 3 wide by 4 tall, the same proportions as the board. */
const W = 1536
const H = 2048

const PROMPT = [
  'Turn this rough layout sketch into a finished, richly detailed illustrated board-game map, painted from a high bird\'s-eye view, like the board of a classic adventure board game or a page from an illustrated children\'s atlas.',
  'KEEP THE ROAD EXACTLY WHERE IT IS IN THE SKETCH: one single continuous winding road with the same position, the same curves and the same width, starting at the bottom left and ending at the top right. Paint it as a smooth pale sandstone road with a clean, even, empty surface — no stones, no tiles, no steps, no markings, nothing standing on it — clearly readable against the scenery along its whole length.',
  'The map is one continuous landscape whose three regions blend into one another, from bottom to top.',
  'BOTTOM THIRD — the Valley of Sleep, at night: deep indigo and violet, a huge glowing crescent moon and many stars, sleeping cottages with dim warm windows, rolling hills with flocks of fluffy white sheep asleep, an owl in a tree, a hill shaped like a bed under a patchwork quilt, drifting dream clouds, a still pond reflecting the moon, fields of lavender.',
  'MIDDLE THIRD — the City of Distraction, at dusk: hot magenta, orange and electric blue, tall crooked towers shaped like smartphones and glowing blank screens, floating bell-shaped and speech-bubble balloons with nothing written on them, tangled cables, a giant hourglass, a carousel, and one small quiet garden with a reading bench hidden among the towers.',
  'TOP THIRD — the Island Market, in bright midday sun: a turquoise sea with small sailing boats, whitewashed houses with blue domes, olive trees, an open-air market with stalls, clay amphoras, brass scales and heaps of gold coins, a small columned temple, sheep behind a wooden fence, and at the very end of the road in the top right corner a tall lighthouse built of stacked books with a small flag on top.',
  'Style: hand-painted gouache and ink illustration, storybook board-game art, rich jewel-like saturated colours, crisp fine detail, soft painterly shading, a gentle paper grain, a thin decorative border around the whole map. Warm, cheerful and slightly whimsical. Landmarks sit in the spaces between the bends of the road, never on it, and nothing overlaps the road anywhere: no roof, tree, balloon or object covers any part of its surface or its edges.',
  'Strictly no text, no letters, no numbers and no writing of any kind anywhere in the picture; no game pieces, no dice, no cards, no people shown close up.',
].join(' ')

/* Three ways to paint it. Prices are deliberately high: real billing on this
   account has run about 50% over fal's list (see generate-hero-frames.mjs). */
const MODELS = {
  banana: {
    label: 'Nano Banana Pro (edit), 2K',
    endpoint: 'fal-ai/nano-banana-pro/edit',
    price: 0.22,
    input: (url, seed) => ({ prompt: PROMPT, image_urls: [url], resolution: '2K', aspect_ratio: '3:4', output_format: 'jpeg', num_images: 1, ...(seed != null ? { seed } : {}) }),
  },
  banana4k: {
    label: 'Nano Banana Pro (edit), 4K',
    endpoint: 'fal-ai/nano-banana-pro/edit',
    price: 0.45,
    input: (url, seed) => ({ prompt: PROMPT, image_urls: [url], resolution: '4K', aspect_ratio: '3:4', output_format: 'jpeg', num_images: 1, ...(seed != null ? { seed } : {}) }),
  },
  seedream: {
    label: 'Seedream 4.5 (edit), 3072×4096',
    endpoint: 'fal-ai/bytedance/seedream/v4.5/edit',
    price: 0.08,
    input: (url, seed) => ({ prompt: PROMPT, image_urls: [url], image_size: { width: 3072, height: 4096 }, num_images: 1, ...(seed != null ? { seed } : {}) }),
  },
  flux: {
    label: 'FLUX.2 [pro] (edit), 1536×2048',
    endpoint: 'fal-ai/flux-2-pro/edit',
    price: 0.15,
    input: (url, seed) => ({ prompt: PROMPT, image_urls: [url], image_size: { width: W, height: H }, output_format: 'jpeg', safety_tolerance: '2', ...(seed != null ? { seed } : {}) }),
  },
}

/* ---------------------------- the book boards ----------------------------
   `art` is the book's place in the registry: what decides whether its road is
   mirrored, and so it must match the order in src/data/allBooks.js. */
const BOOKS = {
  'why-we-sleep': {
    file: 'board-sleep', art: 0, sky: ['#141640', '#2f2672', '#5a3f8f'],
    scene: 'THE WHOLE MAP is the Valley of Sleep, at night: deep indigo and violet, a huge glowing crescent moon and many stars, sleeping cottages with dim warm windows, rolling hills with flocks of fluffy white sheep asleep in the grass, an owl awake in a tree and a lark asleep on a branch, a hill shaped like a bed under a patchwork quilt, drifting dream clouds with soft glowing shapes inside them, a still pond reflecting the moon, fields of lavender, a quiet clock tower whose clock face is blank, fireflies over the meadows, and along the top edge the first faint pink light of dawn over the hills.',
  },
  'stolen-focus': {
    file: 'board-focus', art: 1, sky: ['#7a1f63', '#d0573c', '#2f9fae'],
    scene: 'THE WHOLE MAP is the City of Distraction, at dusk: hot magenta, orange and electric blue. Tall crooked towers shaped like smartphones and tablets with glowing blank screens, floating bell-shaped and speech-bubble balloons with nothing written on them, tangled cables strung between rooftops, glowing signs that are pure colour and shape with no letters, a giant hourglass, a carousel, a big wheel, and crowds of tiny distant figures bent over glowing rectangles. Higher up the noise thins out: a small quiet garden with a reading bench under a tree, and across the top a calm seaside town with sand dunes, a little striped lighthouse and a still blue bay at sunset, where the screens are left behind.',
  },
  'talking-to-my-daughter': {
    file: 'board-market', art: 2, sky: ['#e2cf98', '#3fb3b8', '#8fd6e0'],
    scene: 'THE WHOLE MAP is the Island Market, in bright midday sun: a turquoise sea with small sailing boats and a little fishing boat with its anchor, whitewashed houses with blue domes, olive trees and terraced fields of golden wheat, a stone granary with sacks of grain, an open-air market with striped stalls, clay amphoras, brass scales and heaps of gold coins, a small columned temple on a hill, sheep behind a wooden fence, a small brick factory with a smoking chimney on the edge of town, and at the very end of the road in the top right corner a tall lighthouse built of stacked books with a small flag on top.',
  },
}
const bookId = value('book')
const BOOK = bookId ? BOOKS[bookId] : null
if (bookId && !BOOK) { console.error(`Unknown --book. One of: ${Object.keys(BOOKS).join(', ')}`); process.exit(1) }
const FLIP = BOOK ? mirrored(BOOK.art) : false

/* What belongs to the OTHER boards. The style reference holds all three books'
   worlds, and without this list the model borrows them (the first focus take
   had the sleep board's quilted bed and the market's temple). */
const AVOID = {
  'why-we-sleep': 'no screens, no phone-shaped towers, no balloons, no carousel, no temple, no market stalls, no coins, no domed houses',
  'stolen-focus': 'no bed, no quilt, no moon, no sheep, no temple, no columns, no market stalls, no amphoras, no scales, no coins, no domed white houses',
  'talking-to-my-daughter': 'no bed, no quilt, no moon, no screens, no phone-shaped towers, no balloons, no carousel, no big wheel',
}

const bookPrompt = (b) => [
  'The FIRST image is a rough layout sketch. The SECOND image is ONLY a style reference.',
  'Turn the sketch into a finished, richly detailed illustrated board-game map, painted from a high bird\'s-eye view, in exactly the same hand-painted gouache-and-ink storybook style, rich jewel-like colours, crisp fine detail, line quality and level of detail as the style reference — but a completely NEW scene: do not copy the reference\'s layout, regions or landmarks.',
  `KEEP THE ROAD EXACTLY WHERE IT IS IN THE SKETCH: one single continuous winding road with the same position, the same curves and the same width, starting at the bottom ${mirrored(b.art) ? 'right' : 'left'} and ending at the top ${mirrored(b.art) ? 'left' : 'right'}. Paint it as a smooth pale sandstone road with a clean, even, empty surface — no stones, no tiles, no steps, no markings, nothing standing on it — clearly readable against the scenery along its whole length.`,
  b.scene,
  `Everything in the map belongs to that one place only — ${AVOID[Object.keys(BOOKS).find((k) => BOOKS[k] === b)]}: those belong to other maps.`,
  'Landmarks sit in the spaces between the bends of the road, never on it, and nothing overlaps the road anywhere: no roof, tree, balloon or object covers any part of its surface or its edges. A thin decorative border around the whole map, as in the reference. Warm, cheerful and slightly whimsical.',
  'Strictly no text, no letters, no numbers and no writing of any kind anywhere in the picture; no game pieces, no dice, no cards, no people shown close up.',
].join(' ')

/* ------------------------------ the sketch ------------------------------ */
const roadPath = (w, h) => pathLine(FLIP).map(([x, y], i) => `${i ? 'L' : 'M'}${(x * w).toFixed(1)} ${(y * h).toFixed(1)}`).join(' ')

/* A book board's sketch: its road on its own colours. */
function bookSketchSvg(b) {
  const road = stepSize() * W * 0.78
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs><linearGradient id="sky" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${b.sky[0]}"/><stop offset="0.55" stop-color="${b.sky[1]}"/><stop offset="1" stop-color="${b.sky[2]}"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    <path d="${roadPath(W, H)}" fill="none" stroke="#f1e2bd" stroke-width="${road.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}

function sketchSvg() {
  const pts = pathPoints()
  // Where one region hands over to the next: the y of the last square of each.
  const y1 = pts[ZONE_ENDS[0]].y
  const y2 = pts[ZONE_ENDS[1]].y
  const road = stepSize() * W * 0.78
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="sky" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#1c1f5c"/>
        <stop offset="${(1 - y1 - 0.05).toFixed(3)}" stop-color="#3a2b7a"/>
        <stop offset="${(1 - y1 + 0.06).toFixed(3)}" stop-color="#b8327f"/>
        <stop offset="${(1 - y2 - 0.05).toFixed(3)}" stop-color="#e8703a"/>
        <stop offset="${(1 - y2 + 0.07).toFixed(3)}" stop-color="#37b3b5"/>
        <stop offset="1" stop-color="#8fd6e0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    <path d="${roadPath(W, H)}" fill="none" stroke="#f1e2bd" stroke-width="${road.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}

/* The squares as the page will draw them, for --overlay. */
function overlaySvg(w, h) {
  const pts = pathPoints(FLIP)
  const r = stepSize() * w * 0.36
  const fill = { S: '#ffffff', F: '#ffd54a', K: '#3e63dd', L: '#12a594', B: '#8e4ec6', C: '#f5b800', D: '#e5484d' }
  const dots = pts.map((p, i) => `<circle cx="${(p.x * w).toFixed(1)}" cy="${(p.y * h).toFixed(1)}" r="${r.toFixed(1)}" fill="${fill[TYPES[i]]}" stroke="#fff" stroke-width="${(r * 0.16).toFixed(1)}" fill-opacity="0.92"/>
    <text x="${(p.x * w).toFixed(1)}" y="${(p.y * h + r * 0.36).toFixed(1)}" font-size="${(r * 0.95).toFixed(1)}" font-family="Arial" font-weight="700" text-anchor="middle" fill="#111">${i}</text>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <path d="${roadPath(w, h)}" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="${(r * 0.25).toFixed(1)}" stroke-dasharray="${(r * 0.5).toFixed(0)} ${(r * 0.5).toFixed(0)}"/>${dots}</svg>`
}

fs.mkdirSync(MASTERS, { recursive: true })

if (flag('overlay')) {
  const file = path.resolve(value('overlay'))
  const out = file.replace(/\.(jpe?g|png|webp)$/i, '') + '-overlay.jpg'
  const w = 1200
  const h = 1600
  await sharp(file).resize(w, h, { fit: 'fill' }).composite([{ input: Buffer.from(overlaySvg(w, h)) }]).jpeg({ quality: 84 }).toFile(out)
  console.log(`overlay → ${out}`)
  process.exit(0)
}

if (flag('publish')) {
  const file = path.resolve(value('publish'))
  /* 1200×1600: a phone shows the board about 390 CSS px wide, so this is the
     full 3× of the densest screens, and enough for a desktop window. */
  const ship = shipFor(BOOK ? BOOK.file : 'board')
  await sharp(file).resize(1200, 1600, { fit: 'cover' }).webp({ quality: 80, effort: 6 }).toFile(ship)
  console.log(`published → ${path.relative(process.cwd(), ship)} (${Math.round(fs.statSync(ship).size / 1024)} KB)`)
  process.exit(0)
}

/* ------------------------------ the cover ------------------------------
   The game's door on Home and on its own first screen: a wide banner painted in
   the BOARD's style, with the board itself handed to the model as the
   reference. One picture, wide; on a phone the door is the board (it is a
   poster already). Like the board it holds no text, so the page may mirror it
   for the right-to-left layout. */
const COVER_PROMPT = [
  'Paint a new wide cinematic banner illustration set in exactly the same world and in exactly the same hand-painted gouache-and-ink storybook style, colours and line quality as the reference map.',
  'Composition, in a very wide frame: the pale sandstone road sweeps in from the lower right and winds away toward a tall lighthouse built of stacked books with a small flag, standing on the right side of the picture. On the road in the foreground stand four chunky wooden game pawns — golden yellow, sky blue, mint green and coral pink — and one large ivory die with black pips, tumbling. Behind them: a few crooked towers shaped like glowing blank smartphones, whitewashed houses with blue domes, olive trees, a few fluffy sheep.',
  'The LEFT THIRD of the picture is calm and almost empty: a deep indigo night sky with a glowing crescent moon high up, a scatter of small stars and one or two soft clouds, fading gently into the scene — nothing else there.',
  'Strictly no text, no letters, no numbers and no writing of any kind anywhere; no thin decorative border.',
].join(' ')

if (flag('cover')) {
  const reference = path.join(MASTERS, 'board.jpg')
  if (!fs.existsSync(reference)) { console.error(`No ${reference} — choose a board take first (copy it to masters/board.jpg).`); process.exit(1) }
  const key = apiKey()
  await confirmSpend(key, { what: 'Game cover — 1 × Nano Banana Pro (edit), 2K, 21:9 on fal', estimate: 0.22 })
  // The reference is sent at a modest size: it carries a style, not detail.
  const small = path.join(WIP, 'board-reference.jpg')
  await sharp(reference).resize(1200, 1600).jpeg({ quality: 88 }).toFile(small)
  const url = await upload(key, small)
  const result = await run(key, 'fal-ai/nano-banana-pro/edit', { prompt: COVER_PROMPT, image_urls: [url], resolution: '2K', aspect_ratio: '21:9', output_format: 'jpeg', num_images: 1 }, { label: 'cover' })
  const image = result?.images?.[0]?.url
  if (!image) { console.error(`no image in result: ${JSON.stringify(result).slice(0, 400)}`); process.exit(1) }
  const name = `cover-${Date.now().toString(36)}.jpg`
  await download(image, path.join(MASTERS, name))
  console.log(`
Look at it, then:  node scripts/generate-game-board.mjs --publish-cover "${path.join(MASTERS, name)}"`)
  process.exit(0)
}

if (flag('publish-cover')) {
  const file = path.resolve(value('publish-cover'))
  const out = path.resolve(__dirname, '../public/images/game/cover.webp')
  await sharp(file).resize(1680, 720, { fit: 'cover' }).webp({ quality: 80, effort: 6 }).toFile(out)
  console.log(`published → ${path.relative(process.cwd(), out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`)
  process.exit(0)
}

if (BOOK) {
  // A book's board: its sketch, plus the first map as the style reference.
  const sketch = path.join(WIP, `${BOOK.file}-sketch.jpg`)
  await sharp(Buffer.from(bookSketchSvg(BOOK))).jpeg({ quality: 92 }).toFile(sketch)
  console.log(`sketch → ${sketch}`)
  const reference = path.join(MASTERS, 'board.jpg')
  if (!fs.existsSync(reference)) { console.error(`No ${reference} — the style reference.`); process.exit(1) }
  const key = apiKey()
  await confirmSpend(key, { what: `Board for ${bookId} — 1 × ${MODELS.banana.label} on fal`, estimate: MODELS.banana.price })
  const small = path.join(WIP, 'board-reference.jpg')
  await sharp(reference).resize(1200, 1600).jpeg({ quality: 88 }).toFile(small)
  const [sketchUrl, refUrl] = [await upload(key, sketch), await upload(key, small)]
  const result = await run(key, MODELS.banana.endpoint, { prompt: bookPrompt(BOOK), image_urls: [sketchUrl, refUrl], resolution: '2K', aspect_ratio: '3:4', output_format: 'jpeg', num_images: 1 }, { label: BOOK.file })
  const image = result?.images?.[0]?.url
  if (!image) { console.error(`no image in result: ${JSON.stringify(result).slice(0, 400)}`); process.exit(1) }
  const name = `${BOOK.file}-${Date.now().toString(36)}.jpg`
  await download(image, path.join(MASTERS, name))
  console.log(`\nLook at it, then:  node scripts/generate-game-board.mjs --book ${bookId} --overlay "${path.join(MASTERS, name)}"`)
  process.exit(0)
}

const sketch = path.join(WIP, 'board-sketch.jpg')
await sharp(Buffer.from(sketchSvg())).jpeg({ quality: 92 }).toFile(sketch)
console.log(`sketch → ${sketch}`)

const model = MODELS[value('model', 'banana')]
if (!model) { console.error(`Unknown --model. One of: ${Object.keys(MODELS).join(', ')}`); process.exit(1) }
const seed = value('seed') != null ? Number(value('seed')) : null

const key = apiKey()
await confirmSpend(key, { what: `Game board — 1 × ${model.label} on fal`, estimate: model.price })

const url = await upload(key, sketch)
const result = await run(key, model.endpoint, model.input(url, seed), { label: 'board' })
const image = result?.images?.[0]?.url
if (!image) { console.error(`no image in result: ${JSON.stringify(result).slice(0, 400)}`); process.exit(1) }
const name = `board-${value('model', 'banana')}-${Date.now().toString(36)}.jpg`
await download(image, path.join(MASTERS, name))
const meta = await sharp(path.join(MASTERS, name)).metadata()
console.log(`  ${meta.width}×${meta.height} · seed ${result.seed ?? seed ?? 'n/a'}`)
console.log(`\nLook at it, then:  node scripts/generate-game-board.mjs --overlay "${path.join(MASTERS, name)}"`)
