/*
 * Extracts the *drawings* off a book cover as standalone transparent objects.
 *
 *   node scripts/extract-cover-art.mjs
 *
 * WHY THIS EXISTS. The hero composites the featured book onto a photographed
 * cloth book. Warping a flat photo of the cover onto it never looked real: the
 * cover carries its own lighting and its own paper, so it reads as a sticker.
 * The fix is to rebuild the cover out of parts — the cloth gets recoloured, the
 * type is set in real fonts, the geometric shapes are drawn as vectors, and the
 * illustrations are cut out and printed on top. This script does the last part.
 *
 * The Arabic Stolen Focus cover is a flat near-black field with vector people
 * arranged around the edges, so the background comes away with an edge
 * flood-fill (same technique as process-images.mjs). Interior dark pixels — hair,
 * dark trousers — survive, because the fill only reaches what connects to the
 * border. The centre of the cover, which holds the gradient orb and all the
 * type, is then erased: those are rebuilt as vectors and text in coverArt.js,
 * not reused as pixels.
 *
 * Output: app/public/images/hero/cover-art/<id>.webp, alpha preserved.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES = path.resolve(__dirname, '../public/images')
const OUT = path.join(IMAGES, 'hero/cover-art')

const JOBS = [
  {
    id: 'stolen-focus-people',
    src: 'stolen-focus-cover-ar.jpg',
    // Background is the near-black field. Generous threshold: the figures are
    // saturated or light enough that none of them read as background.
    bgMax: 62,
    /* Erase what gets rebuilt as vectors and text, in fractions of width/height.
     * The orb needs an ELLIPSE, not a rectangle: a rect tight enough to spare
     * the figures either side left two crescent slivers of the orb's edges
     * behind. The text bands are rectangles, and both are deliberately narrow
     * enough to clear the figures — the first attempt's author band reached far
     * enough left to erase most of the woman in the white dress. */
    eraseEllipse: [{ cx: 0.505, cy: 0.455, rx: 0.335, ry: 0.25 }],
    erase: [
      [0.29, 0.07, 0.74, 0.23],  // author line
      [0.34, 0.75, 0.68, 1.0],   // translator line + publisher mark
    ],
  },
]

/** Luminance-ish test for "this is the flat dark background". */
const isBg = (r, g, b, max) => r <= max && g <= max && b <= max

/*
 * Flood fill inward from every border pixel, clearing alpha as it goes. Only
 * background-coloured pixels that CONNECT to the border are removed, which is
 * what protects the dark insides of the drawings.
 */
function clearBackground(data, w, h, bgMax) {
  const seen = new Uint8Array(w * h)
  const stack = []
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return
    const i = y * w + x
    if (seen[i]) return
    const p = i * 4
    if (!isBg(data[p], data[p + 1], data[p + 2], bgMax)) return
    seen[i] = 1
    stack.push(i)
  }
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1) }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y) }

  while (stack.length) {
    const i = stack.pop()
    data[i * 4 + 3] = 0
    const x = i % w, y = (i / w) | 0
    push(x - 1, y); push(x + 1, y); push(x, y - 1); push(x, y + 1)
  }
}

function eraseEllipse(data, w, h, { cx, cy, rx, ry }) {
  const CX = cx * w, CY = cy * h, RX = rx * w, RY = ry * h
  const x0 = Math.max(0, Math.floor(CX - RX)), x1 = Math.min(w, Math.ceil(CX + RX))
  const y0 = Math.max(0, Math.floor(CY - RY)), y1 = Math.min(h, Math.ceil(CY + RY))
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const dx = (x - CX) / RX, dy = (y - CY) / RY
      if (dx * dx + dy * dy <= 1) data[(y * w + x) * 4 + 3] = 0
    }
  }
}

function eraseRect(data, w, h, [x0, y0, x1, y1]) {
  const a = Math.round(x0 * w), b = Math.round(y0 * h)
  const c = Math.round(x1 * w), d = Math.round(y1 * h)
  for (let y = b; y < d; y++) {
    for (let x = a; x < c; x++) data[(y * w + x) * 4 + 3] = 0
  }
}

fs.mkdirSync(OUT, { recursive: true })

for (const job of JOBS) {
  const src = path.join(IMAGES, job.src)
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info

  clearBackground(data, w, h, job.bgMax)
  for (const e of job.eraseEllipse || []) eraseEllipse(data, w, h, e)
  for (const r of job.erase || []) eraseRect(data, w, h, r)

  // How much survived? A near-empty layer means the thresholds are wrong, and
  // silently shipping an invisible object would be worse than failing loudly.
  let kept = 0
  for (let i = 3; i < data.length; i += 4) if (data[i] > 8) kept++
  const pct = ((kept / (w * h)) * 100).toFixed(1)

  const out = path.join(OUT, `${job.id}.webp`)
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(out)
  const kb = Math.round(fs.statSync(out).size / 1024)
  console.log(`${job.id}: ${pct}% of pixels kept → ${path.relative(process.cwd(), out)} (${kb} KB)`)
  if (kept === 0) console.error(`  ⚠ nothing survived — raise bgMax or shrink the erase rects`)
}
