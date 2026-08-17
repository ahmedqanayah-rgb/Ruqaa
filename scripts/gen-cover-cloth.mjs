/*
 * Bakes the recoloured book cloth that the hero prints its cover artwork onto.
 *
 *   node scripts/gen-cover-cloth.mjs
 *
 * Output: app/public/images/hero/cloth/<bookId>-<orientation>.webp
 *
 * WHY BAKE IT INSTEAD OF TINTING IN CSS. The first attempt laid a flat colour
 * over the photographed book at 0.93 opacity. That cannot work: the cloth is
 * light beige, around (215,200,175), and its weave and lighting vary by maybe
 * ±25. Composite near-black over it at any high opacity and that ±25 collapses
 * to ±2 — mathematically invisible. The result is a flat black rectangle, which
 * is exactly what it looked like. Lowering the opacity keeps the texture but
 * then the book is grey, not black.
 *
 * Getting a black book WITH visible weave needs the photo's contrast EXPANDED,
 * not compressed — a curve, not a blend. So this reads the photo's luminance
 * across the cover quad, normalises it against its own 2nd/98th percentiles,
 * and maps that through a ramp from `shadow` to `highlight`. Every bit of
 * weave, every gradient of the light falling across the board, survives at full
 * strength; only the colour changes.
 *
 * It is baked rather than done live because the browser pane cannot be
 * screenshotted during headless work, so a CSS filter chain would be tuned
 * blind and could drift from the offline preview. A baked patch is identical in
 * both, and it is what scripts/hero-preview.mjs composites too.
 *
 * ⚠ REGENERATE THIS after changing the frames or the coverQuad in heroScene.js.
 *   The patch is the quad's contents, so a moved quad makes it stale.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { heroScene } from '../src/data/heroScene.js'
import { coverArt } from '../src/data/coverArt.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FRAMES = path.resolve(__dirname, '../../hero-video-wip/frames')
const OUT = path.resolve(__dirname, '../public/images/hero/cloth')

// Patch resolution. The book never renders wider than ~390px on screen (the
// hero box caps at 900px and the board occupies a fraction of it), so this is
// already comfortably above 1× even on a dense display. It is mostly fabric
// noise, which is the expensive thing to encode — going larger buys nothing
// visible and costs real kilobytes on a page every member loads.
const PW = 500, PH = 720

const adj = (m) => [
  m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
  m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
  m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3],
]
function mul(a, b) {
  const r = []
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++)
    r[3 * i + j] = a[3 * i] * b[j] + a[3 * i + 1] * b[3 + j] + a[3 * i + 2] * b[6 + j]
  return r
}
function basisToPoints(p1, p2, p3, p4) {
  const m = [p1[0], p2[0], p3[0], p1[1], p2[1], p3[1], 1, 1, 1]
  const a = adj(m)
  const v = [a[0] * p4[0] + a[1] * p4[1] + a[2], a[3] * p4[0] + a[4] * p4[1] + a[5], a[6] * p4[0] + a[7] * p4[1] + a[8]]
  return mul(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]])
}
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]

/** Ray-crossing point-in-polygon, for the visible-board outline. */
function inPolygon(x, y, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

/* Default ramp endpoints, derived from the cover's base colour: shadows drop
 * most of the way to black, highlights lift a bit over a quarter of the way to
 * white. Cloth is matte, so the highlight stays well short of a specular white.
 * A book can override either in coverArt.js. */
const defaultShadow = (b) => b.map((c) => Math.round(c * 0.40))
const defaultHighlight = (b) => b.map((c) => Math.round(c + (255 - c) * 0.30))

async function bake(bookId, orient) {
  const cal = heroScene[orient]
  const entry = coverArt[bookId]
  const src = path.join(FRAMES, `frame2-${orient}.jpg`)
  if (!fs.existsSync(src)) { console.warn(`skip ${bookId}/${orient}: no frame`); return }

  const base = hex(entry.base)
  const ramp = entry.clothRamp || {}
  const shadow = ramp.shadow ? hex(ramp.shadow) : defaultShadow(base)
  const highlight = ramp.highlight ? hex(ramp.highlight) : defaultHighlight(base)
  const gamma = ramp.gamma ?? 1.25

  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info

  // unit square → the quad, so a patch pixel can ask which photo pixel it is
  const s = basisToPoints([0, 0], [1, 0], [0, 1], [1, 1])
  const [tl, tr, br, bl] = cal.coverQuad
  const Hm = mul(basisToPoints(tl, tr, bl, br), adj(s))

  // Pass 1: sample luminance for every patch pixel, and mark the ones that are
  // not visible board (see coverClip in heroScene.js).
  const clip = cal.coverClip
  const lum = new Float32Array(PW * PH)
  const vis = new Uint8Array(PW * PH)
  for (let py = 0; py < PH; py++) {
    const v = (py + 0.5) / PH
    for (let px = 0; px < PW; px++) {
      const u = (px + 0.5) / PW
      const w = Hm[6] * u + Hm[7] * v + Hm[8]
      const x = Math.round((Hm[0] * u + Hm[1] * v + Hm[2]) / w)
      const y = Math.round((Hm[3] * u + Hm[4] * v + Hm[5]) / w)
      const k = py * PW + px
      vis[k] = clip ? (inPolygon(x, y, clip) ? 1 : 0) : 1
      const i = (Math.min(H - 1, Math.max(0, y)) * W + Math.min(W - 1, Math.max(0, x))) * 4
      lum[k] = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
    }
  }

  // Normalise against the patch's OWN 2nd/98th percentiles rather than 0..255.
  // The cloth only occupies a narrow slice of the range, so stretching against
  // the full scale is what would flatten the weave back out again.
  // Percentiles over VISIBLE pixels only — an occluding page is far brighter
  // than the board, so letting it into the statistics drags the highlight end
  // up and washes the whole cloth out.
  const sorted = Float32Array.from(lum.filter((_, i) => vis[i])).sort()
  const lo = sorted[Math.floor(sorted.length * 0.02)]
  const hi = sorted[Math.floor(sorted.length * 0.98)]
  const span = Math.max(1, hi - lo)

  const out = Buffer.alloc(PW * PH * 4)
  for (let i = 0; i < lum.length; i++) {
    let n = (lum[i] - lo) / span
    n = Math.pow(Math.min(1, Math.max(0, n)), gamma)
    out[i * 4]     = shadow[0] + (highlight[0] - shadow[0]) * n
    out[i * 4 + 1] = shadow[1] + (highlight[1] - shadow[1]) * n
    out[i * 4 + 2] = shadow[2] + (highlight[2] - shadow[2]) * n
    out[i * 4 + 3] = vis[i] ? 255 : 0
  }

  // Write exactly where the data says the app will look for it, so the two
  // cannot drift apart.
  const rel = entry.cloth?.[orient]
  if (!rel) { console.warn(`skip ${bookId}/${orient}: no cloth path in coverArt.js`); return }
  const file = path.resolve(__dirname, '../public', rel.replace(/^\.\//, ''))
  fs.mkdirSync(path.dirname(file), { recursive: true })
  await sharp(out, { raw: { width: PW, height: PH, channels: 4 } })
    .webp({ quality: 76, alphaQuality: 100 }).toFile(file)
  const kb = Math.round(fs.statSync(file).size / 1024)
  const clipped = clip ? ` clipped ${(100 - (vis.reduce((a, b) => a + b, 0) / vis.length) * 100).toFixed(1)}%` : ''
  console.log(`${bookId}/${orient}: luminance ${lo.toFixed(0)}–${hi.toFixed(0)} → `
    + `rgb(${shadow}) … rgb(${highlight})${clipped}  ${path.relative(process.cwd(), file)} (${kb} KB)`)
}

for (const bookId of Object.keys(coverArt)) {
  for (const orient of ['landscape', 'portrait']) await bake(bookId, orient)
}
