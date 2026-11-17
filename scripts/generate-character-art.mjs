// Paints the portraits of the Varoufakis book's OWN characters — the nine people
// of «أهل الكتاب» who can have no photograph — in the same hand-painted style as
// the game's board, with Nano Banana Pro on fal.
//
//   node scripts/generate-character-art.mjs                      → dry run: the plan and the cost
//   node scripts/generate-character-art.mjs --yes                → paint every one that has no master yet
//   node scripts/generate-character-art.mjs --yes --only paris   → re-roll these (comma-separated)
//   node scripts/generate-character-art.mjs --publish            → re-export the WebPs from the masters (free)
//
// Key: ../.keys/fal.txt (outside the repo) or env FAL_KEY. See fal-client.mjs.
//
// WHY PAINTINGS, AND WHY SOME HAVE NO FACE. Three of the nine are examples the
// author made up (Mr Nabuk, Miriam, Maria): they get a portrait. The other six
// are real, private people from his life — his daughter, his friends, a
// fisherman, a child, his father. Nobody gave us their likeness, and a painted
// face would claim one. So each of them is painted the way the book shows them:
// from behind, or through the scene they are remembered for (the anchor, the
// taverna joke, the house that will not sell, the shared cigarette). The
// photograph of the author with his daughter that the club once supplied stays
// unused (see prep-economy-images.mjs); nothing here was made from it.
//
// THE STYLE COMES FROM THE BOARD. The chosen board painting is sent as the
// reference image, so these sit in the same world as the game. Like every
// picture on the site that is generated, they contain no text.
//
// They are shown as 72-pixel circles (`.person-photo`), so each subject is told
// to be bold, simple and centred. Masters (1024²) stay OUTSIDE the repo, beside
// the club's other originals for this book; public/ gets 500² WebP.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { apiKey, upload, run, download, confirmSpend } from './fal-client.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BOOK = path.resolve(__dirname, '../../Talking to My Daughter About the Economy A Brief History of Capitalism')
const MASTERS = path.join(BOOK, 'painted-characters')
const BOARD = path.resolve(__dirname, '../../game-art-wip/masters/board.jpg')
const SHIP = path.resolve(__dirname, '../public/images/characters')

/* USD per image, deliberately high: the three Nano Banana Pro paintings for the
   board and cover cost about $0.15 each on this account. */
const PRICE = 0.16

const STYLE = [
  'Paint a new square illustration in exactly the same hand-painted gouache-and-ink storybook style, colour palette, warm light and line quality as the reference image — but not a map: one single subject.',
  'It will be shown as a small round avatar, so the subject must be bold, simple and centred, filling most of the square, with a soft, simple painted background and nothing important near the corners.',
  'Strictly no text, no letters, no numbers and no writing of any kind anywhere; no border and no frame.',
].join(' ')

/* `face: false` — a real, private person: never show a face. */
const PEOPLE = {
  xenia: {
    face: false,
    subject: 'A teenage girl seen from BEHIND — her face is not visible at all — sitting on the edge of an old stone quay in a small Greek island harbour, her long hair lifted by the wind, looking out over a turquoise sea dotted with little fishing boats, in warm late-afternoon light.',
  },
  'mr-nabuk': {
    face: true,
    subject: 'A head-and-shoulders portrait of an ancient Mesopotamian farmer about five thousand years ago: a weathered, kind face, a curly dark beard, a simple woven wool robe; he holds up beside his face a small clay shell token engraved with simple wedge marks (no real letters), and behind him are golden sheaves of wheat and the mud-brick wall of a granary.',
  },
  'captain-kostas': {
    face: false,
    subject: 'An old Greek fisherman seen from BEHIND and a little to the side — his face turned away and hidden under a dark fisherman\'s cap — standing in a small blue-and-white wooden fishing boat and hauling on a rope that runs down into clear turquoise water toward an anchor stuck on the sea floor.',
  },
  paris: {
    face: false,
    subject: 'In a Greek seaside taverna at night under strings of warm light bulbs, a small boy seen from BEHIND — his face not visible — stands on a wooden chair in the centre of the picture with his arms flung wide, telling a joke; around the table the grown-ups are laughing out loud; plates, bread and glasses on a checked tablecloth.',
  },
  miriam: {
    face: true,
    subject: 'A head-and-shoulders portrait of a cheerful, determined woman in her thirties who builds bicycles, in a canvas workshop apron with her sleeves rolled up, holding a sleek black carbon-fibre bicycle frame beside her; tools hang on the workshop wall behind her.',
  },
  maria: {
    face: true,
    subject: 'A head-and-shoulders portrait of a woman in her forties who owns a small refrigerator factory, awake late at night, her face lit by the cool glow of an open laptop, a thoughtful, worried expression, one hand at her chin; behind her in the dark stands a row of white refrigerators.',
  },
  wasily: {
    face: false,
    subject: 'A young man seen from BEHIND — his face not visible — sitting alone on a city park bench in autumn, a rolled doctorate diploma tied with a red ribbon beside him and a small stack of blank sealed envelopes in his hands, falling leaves around him.',
  },
  andreas: {
    face: false,
    subject: 'A small whitewashed summer house with a blue door and blue shutters on a sunny hillside of a Greek island, bougainvillea over the doorway and the sea below; at the gate a man seen from BEHIND — his face not visible — holds up a large old iron house key.',
  },
  'varoufakis-father': {
    face: false,
    // The first roll turned one man's head into profile: a face. Both heads
    // must face AWAY, toward the sea.
    subject: 'A bare, rocky Greek island prison camp in the late 1940s: two men in worn clothes seen strictly from BEHIND, sitting side by side on a rock and both looking out at the sea, so that neither face nor profile is visible at all — only the backs of their heads and shoulders; between them one hand passes a cigarette to the other, a gesture of sharing; a few canvas tents to one side; muted, warm colours.',
  },
}

const args = process.argv.slice(2)
const value = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : null }
const only = value('only')?.split(',').map((s) => s.trim()).filter(Boolean) || null
if (only) for (const name of only) if (!PEOPLE[name]) { console.error(`Unknown: ${name}. One of: ${Object.keys(PEOPLE).join(', ')}`); process.exit(1) }

const master = (name) => path.join(MASTERS, `${name}.jpg`)
/* The model often leaves a thin paper margin or a ragged painted edge around
   the picture; in a round frame that shows as white slivers at the edges. The
   central 88% has none, and every subject was asked to stay off the corners. */
async function publish(name) {
  const out = path.join(SHIP, `${name}.webp`)
  const { width, height } = await sharp(master(name)).metadata()
  const side = Math.round(Math.min(width, height) * 0.88)
  const region = { left: Math.round((width - side) / 2), top: Math.round((height - side) / 2), width: side, height: side }
  await sharp(master(name)).extract(region).resize(500, 500).webp({ quality: 80, effort: 6 }).toFile(out)
  console.log(`  published ${path.relative(process.cwd(), out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`)
}

if (args.includes('--publish')) {
  const have = Object.keys(PEOPLE).filter((n) => fs.existsSync(master(n)))
  for (const name of have) await publish(name)
  console.log(`\nRe-published ${have.length} portrait(s) from masters. Nothing spent.`)
  process.exit(0)
}

const todo = only || Object.keys(PEOPLE).filter((n) => !fs.existsSync(master(n)))
if (!todo.length) { console.log('Every portrait already has a master. Name one with --only to re-roll it.'); process.exit(0) }
if (!fs.existsSync(BOARD)) { console.error(`No style reference at ${BOARD}.`); process.exit(1) }

const key = apiKey()
await confirmSpend(key, { what: `Character portraits — ${todo.length} × Nano Banana Pro (edit), 1K, 1:1 on fal: ${todo.join(', ')}`, estimate: todo.length * PRICE })

fs.mkdirSync(MASTERS, { recursive: true })
const reference = path.join(MASTERS, '_board-reference.jpg')
await sharp(BOARD).resize(900, 1200).jpeg({ quality: 86 }).toFile(reference)
const url = await upload(key, reference)

let failed = 0
for (const name of todo) {
  console.log(`\n→ ${name}`)
  try {
    const prompt = `${STYLE} ${PEOPLE[name].subject}`
    const result = await run(key, 'fal-ai/nano-banana-pro/edit', { prompt, image_urls: [url], resolution: '1K', aspect_ratio: '1:1', output_format: 'jpeg', num_images: 1 }, { label: name })
    const image = result?.images?.[0]?.url
    if (!image) throw new Error(`no image in result: ${JSON.stringify(result).slice(0, 300)}`)
    await download(image, master(name))
    await publish(name)
  } catch (err) {
    failed += 1
    console.error(`  FAILED ${name}: ${err.message}`)
  }
}
console.log(failed ? `\nDone, with ${failed} failure(s) — re-run to fill the gaps.` : '\nDone. Look at every portrait before shipping it — and check no face shows on the private people.')
process.exit(failed ? 1 : 0)
