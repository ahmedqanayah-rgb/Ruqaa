/*
 * Prepare the photos for the flow-state section from the originals the club
 * supplied. Run:
 *
 *   node scripts/prep-flow-images.mjs "C:/Users/aq/Desktop/Ruqaa/Stolen focus/Flow photos"
 *
 * WHY THE ORIGINALS ARE NOT IN THE REPO. They live with the club's own book
 * reference material outside `app/`, which CLAUDE.md says must never be
 * committed — and they are ~4 MB of stock photos whose processed versions are
 * the only thing the site needs. That differs from `assets-src/`, which holds
 * originals that *must* be regenerable because a script derives cut-outs from
 * them. Here the derivation is a one-time crop and convert, so this file is the
 * record of what was done rather than the inputs being kept.
 *
 * So: if the source folder is gone, the shipped WebPs in public/images/flow/ are
 * the originals now. Don't re-run this expecting to reproduce them from nothing.
 *
 * THE BRAIN IS THE ONE THAT MATTERS. Two candidates were supplied; the engraving
 * was chosen over a 3D render because figure 15 overlays camel-coloured activity
 * regions on it, and those go muddy on a salmon-pink render but read cleanly on
 * greyscale linework — and because the engraving matches the brain drawings
 * already used in BrainNetworks. It gets the same paper backing as the clean/
 * cut-outs (see paper-backing.mjs) because black linework on transparency
 * disappears in the dark theme.
 *
 * If the brain image is ever replaced, the region overlays in components.css
 * (.brain-hot.dlpfc / .brain-hot.mpfc) are tuned to THIS engraving and must be
 * re-checked. The way to do it is to composite the candidate boxes onto the
 * image and look at the result — the first attempt here put both regions off
 * the frontal lobe entirely, and only rendering it revealed that.
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../public/images/flow')
const srcDir = process.argv[2]

if (!srcDir || !fs.existsSync(srcDir)) {
  console.error('usage: node scripts/prep-flow-images.mjs <source-folder>')
  console.error('the folder holding the club\'s original Flow photos (outside the repo)')
  process.exit(1)
}
fs.mkdirSync(outDir, { recursive: true })

const PAPER = { r: 0xf7, g: 0xf4, b: 0xee }   // = --bg in the light theme
const WHITE = 236                              // at/above this counts as paper

/* Plain photographs. Widths are per-file, not a uniform cap: each was set to
   what its own crop actually needs at the size it renders, and a blanket cap
   inflated the set by about 30% for no visible gain. Keep them as they are
   unless you are replacing the source image too. */
const PHOTOS = [
  ['A 1980s pagerbeeper.jpg', 'pager.webp', 900],
  ['A factory assembly line.jpg', 'assembly-line.webp', 1100],
  ['An elderly alpine farmer in a mountain farm.jpg', 'alpine-farm.webp', 1100],
  ['A jazz pianist at a piano.webp', 'jazz-piano.webp', 1200],
  ['The Flow book cover english.webp', 'flow-cover-en.webp', 560],
]

for (const [from, to, width] of PHOTOS) {
  const src = path.join(srcDir, from)
  if (!fs.existsSync(src)) { console.log(`  skip (missing)  ${from}`); continue }
  const buf = await sharp(fs.readFileSync(src))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer()
  fs.writeFileSync(path.join(outDir, to), buf)
  console.log(`  ${String(Math.round(buf.length / 1024)).padStart(4)} KB  ${to}`)
}

/* The Arabic cover is a photograph of the physical book on a desk. Cropped to
   the book itself and matched to the English cover's 0.66 ratio so the two sit
   as a pair in the imggrid rather than as a flat cover beside a desk snapshot.
   Numbers are for the supplied 755×1000 photo — re-derive them if it changes. */
const arSrc = path.join(srcDir, 'The Flow book cover arabic.jpg')
if (fs.existsSync(arSrc)) {
  const m = await sharp(arSrc).metadata()
  if (m.width !== 755 || m.height !== 1000) {
    console.log(`  ! arabic cover is ${m.width}x${m.height}, not the 755x1000 these crop numbers assume — check the result`)
  }
  const buf = await sharp(fs.readFileSync(arSrc))
    .extract({ left: 72, top: 30, width: 620, height: 935 })
    .resize({ width: 560 })
    .webp({ quality: 84, effort: 6 })
    .toBuffer()
  fs.writeFileSync(path.join(outDir, 'flow-cover-ar.webp'), buf)
  console.log(`  ${String(Math.round(buf.length / 1024)).padStart(4)} KB  flow-cover-ar.webp`)
}

/* The brain: trim the transparent margin, composite onto paper, remap whatever
   is still near-white so enclosed white areas don't sit as bright patches on the
   plate, then add a proportional paper margin. Same treatment and rationale as
   paper-backing.mjs — see that file for why this is pixels and not CSS. */
const brainSrc = path.join(srcDir, 'brain-lateral 2.png')
if (fs.existsSync(brainSrc)) {
  const trimmed = await sharp(fs.readFileSync(brainSrc))
    .trim({ threshold: 8 })
    .resize({ width: 1100, withoutEnlargement: true })
    .toBuffer()
  const { data, info } = await sharp(trimmed).flatten({ background: PAPER })
    .raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  for (let i = 0; i < data.length; i += channels) {
    if (data[i] >= WHITE && data[i + 1] >= WHITE && data[i + 2] >= WHITE) {
      data[i] = PAPER.r; data[i + 1] = PAPER.g; data[i + 2] = PAPER.b
    }
  }
  const pad = Math.round(Math.max(width, height) * 0.05)
  const buf = await sharp(data, { raw: { width, height, channels } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { ...PAPER, alpha: 1 } })
    .webp({ quality: 86, effort: 6 })
    .toBuffer()
  fs.writeFileSync(path.join(outDir, 'brain-lateral.webp'), buf)
  const bm = await sharp(buf).metadata()
  console.log(`  ${String(Math.round(buf.length / 1024)).padStart(4)} KB  brain-lateral.webp  ${bm.width}x${bm.height}`)
  console.log(`         ratio ${(bm.width / bm.height).toFixed(3)} — .brain-stage in components.css must match this`)
}

console.log('\nnow run:  node scripts/gen-image-dims.mjs')
