/*
 * Give every background-removed cut-out its own paper backing.
 *
 * THE PROBLEM. The clean/ images are diagrams scanned from a printed page:
 * black labels, thin black leader lines, fine engraving hatching, and pale
 * fills. Flood-filling the white background out left them transparent, which
 * looks great on a light page and is unreadable on a dark one — black text on
 * a #17140f background is black on black. The same thing happens in the light
 * theme when a phone browser force-darkens the page.
 *
 * WHY NOT CSS. A `background` on the <img> fixes our own dark theme, but not
 * the force-dark case: those engines darken background colours and deliberately
 * leave image pixels alone, so a CSS plate gets darkened right back out from
 * under the artwork. tokens.css already notes that `color-scheme: only light`
 * does not reliably stop them. Pixels are the only surface a force-dark browser
 * will not touch — so the paper has to be part of the image.
 *
 * WHY THIS COLOUR. PAPER is exactly the light theme's page background, so in
 * the light theme the backing is invisible and the cut-outs still "blend into
 * the page" as originally designed. In the dark theme, and under force-dark,
 * the same pixels read as a printed figure laid on the page. One value, two
 * correct results, no theme coupling.
 *
 * Idempotent: images that already lost their alpha channel are skipped, so this
 * is safe to re-run and safe to leave at the end of the pipeline.
 *
 * PIPELINE ORDER (each step feeds the next):
 *   1. node scripts/process-images.mjs   assets-src/ -> clean/*.png
 *   2. node scripts/fix-images.mjs       the five that need cropping first
 *   3. node scripts/brain-rows.mjs       clean/brain-areas.png -> clean/brain/
 *      node scripts/spider-panels.mjs    clean/spider-web.png  -> clean/spider/
 *   4. node scripts/to-webp.mjs public/images/clean
 *   5. node scripts/paper-backing.mjs    <- this file
 * Steps 3's inputs are intermediates: they are not shipped, and check-image-refs
 * reports them as unreferenced once the rows and panels exist. That is expected.
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const DIR = 'public/images/clean'
const PAPER = { r: 0xf7, g: 0xf4, b: 0xee } // = --bg in the light theme
const WHITE = 236 // at/above this in every channel counts as the print's paper

/* Diagrams that were never cut out — they still have their original white
   background, so their labels are readable on dark already. They only need the
   white toned down to match, or they read as a brighter, cooler slab beside the
   backed cut-outs. No margin is added: these keep their own. */
const HARMONIZE = ['public/images/anatomical/rem-vs-nrem.webp']

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))

/* Repaint every near-white pixel as paper. Idempotent: PAPER is itself above
   WHITE, so a second pass maps it to itself. */
const toPaper = (d, channels) => {
  for (let i = 0; i < d.length; i += channels) {
    if (d[i] >= WHITE && d[i + 1] >= WHITE && d[i + 2] >= WHITE) {
      d[i] = PAPER.r; d[i + 1] = PAPER.g; d[i + 2] = PAPER.b
    }
  }
  return d
}

const report = (file, size, len) => {
  const pct = Math.round((len / size - 1) * 100)
  console.log(`  ${String(Math.round(size / 1024)).padStart(4)} KB → ${String(Math.round(len / 1024)).padStart(4)} KB  (${pct >= 0 ? '+' : ''}${pct}%)  ${file.replace(/\\/g, '/').replace('public/images/', '')}`)
}

let done = 0, skipped = 0, before = 0, after = 0

for (const file of walk(DIR).filter((f) => /\.webp$/i.test(f))) {
  const size = fs.statSync(file).size
  const input = fs.readFileSync(file)
  const meta = await sharp(input).metadata()
  if (!meta.hasAlpha) { skipped++; continue }

  // Flatten first: everything the flood-fill reached becomes paper.
  const flat = await sharp(input).flatten({ background: PAPER })
    .raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = flat.info

  // The flood-fill only reaches the background from the outside, so white areas
  // it couldn't get into — the cells inside a spider web's frame, the interior
  // of an engraved brain — stay pure white and would sit as a bright patch on
  // the paper. These are prints on white paper, so remap what is still near-white
  // to the same paper tone. WHITE is low enough to catch off-white scans and high
  // enough to leave the pale blue/pink/orange fills in the diagrams alone.
  const d = toPaper(flat.data, channels)

  // A margin of paper around the artwork, so a label at the very edge of a
  // trimmed cut-out isn't flush against the plate. Proportional, because these
  // range from 364px wide to 1600px.
  const pad = Math.max(16, Math.round(Math.max(width, height) * 0.04))
  const buf = await sharp(d, { raw: { width, height, channels } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { ...PAPER, alpha: 1 } })
    .webp({ quality: 82, effort: 6 })
    .toBuffer()
  fs.writeFileSync(file, buf)

  before += size; after += buf.length; done++
  report(file, size, buf.length)
}

for (const file of HARMONIZE) {
  const size = fs.statSync(file).size
  const { data, info } = await sharp(fs.readFileSync(file)).raw().toBuffer({ resolveWithObject: true })
  const buf = await sharp(toPaper(data, info.channels), { raw: info })
    .webp({ quality: 82, effort: 6 }).toBuffer()
  fs.writeFileSync(file, buf)
  before += size; after += buf.length; done++
  report(file, size, buf.length)
}

const kb = (n) => Math.round(n / 1024)
console.log(`\n${done} papered, ${skipped} already opaque — ${kb(before)} KB → ${kb(after)} KB`)
