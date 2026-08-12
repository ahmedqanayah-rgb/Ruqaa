/*
 * Renders what the frozen hero actually looks like: the rebuilt cover warped
 * onto the photographed book, plus the ink title on the open page.
 *
 *   node scripts/hero-preview.mjs            → both orientations
 *   node scripts/hero-preview.mjs landscape
 *
 * Output: app/hero-calibrate-out/preview-<orientation>.jpg (git-ignored).
 *
 * WHY A SCRIPT AND NOT A SCREENSHOT. The embedded browser pane only composites
 * frames while it is on screen, so screenshots time out during headless work —
 * and this change is entirely about whether the cover reads as printed on cloth
 * rather than stuck on. This reproduces the composite offline.
 *
 * It shares the RECIPES with the app (both import src/data/coverArt.js), but
 * the SVG markup is built separately here from the JSX in HeroCoverArt.jsx.
 * Keep the two in step, or trust the browser over this preview when they
 * disagree. Text also renders in whatever system fonts are installed, NOT the
 * site's self-hosted webfonts — so judge layout, colour and composition here,
 * and judge the typeface in the browser.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { heroScene } from '../src/data/heroScene.js'
import { coverArt } from '../src/data/coverArt.js'
import { books } from '../src/data/books.js'
import { club } from '../src/data/club.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FRAMES = path.resolve(__dirname, '../../hero-video-wip/frames')
const IMAGES = path.resolve(__dirname, '../public/images')
const OUT = path.resolve(__dirname, '../hero-calibrate-out')

/* ---- 3x3 homography helpers (same math as HeroCinema.jsx) ---- */
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

/** Build the cover SVG from a recipe — mirrors HeroCoverArt.jsx. */
async function coverSvg(recipe) {
  const [W, H] = recipe.view
  const lines = recipe.text
  const isAr = (s) => /[؀-ۿ]/.test(s)
  const txt = (l) => `<text x="${l.x}" y="${l.y}" text-anchor="middle" fill="${l.fill || '#fff'}"`
    + ` font-family="${l.font}" font-size="${l.size}" font-weight="${l.weight}"`
    + ` letter-spacing="${l.track || 0}" opacity="${l.behind ? 0.55 : 1}"`
    + ` direction="${isAr(l.s) ? 'rtl' : 'ltr'}">${l.s.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`

  const defs = [], body = []
  lines.filter((l) => l.behind).forEach((l) => body.push(txt(l)))

  for (const [i, a] of recipe.art.entries()) {
    if (a.type === 'orb') {
      defs.push(`<linearGradient id="orb${i}" gradientTransform="rotate(${a.angle || 0} .5 .5)">`
        + a.stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('') + `</linearGradient>`)
      body.push(`<circle cx="${a.cx}" cy="${a.cy}" r="${a.r}" fill="url(#orb${i})"/>`)
    } else if (a.type === 'moon') {
      defs.push(`<mask id="moon${i}"><rect width="${W}" height="${H}" fill="#fff"/>`
        + `<circle cx="${a.cx + a.r * 0.55}" cy="${a.cy - a.r * 0.35}" r="${a.r * 0.92}" fill="#000"/></mask>`)
      body.push(`<circle cx="${a.cx}" cy="${a.cy}" r="${a.r}" fill="${a.fill}" mask="url(#moon${i})"/>`)
    } else if (a.type === 'stars') {
      let s = a.seed * 9301 + 49297
      const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
      for (let j = 0; j < a.count; j++) {
        const x = rnd() * W, y = rnd() * H, r = 0.4 + rnd() * 1.2, o = 0.25 + rnd() * 0.7
        body.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${a.fill}" opacity="${o.toFixed(2)}"/>`)
      }
    } else if (a.type === 'cutout') {
      // Inline as a PNG data URI: the SVG renderer resolves neither relative
      // hrefs nor WebP here.
      const file = path.join(IMAGES, a.src.replace(/^\.\/images\//, ''))
      const png = await sharp(file).png().toBuffer()
      body.push(`<image x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" preserveAspectRatio="none"`
        + ` href="data:image/png;base64,${png.toString('base64')}"/>`)
    }
  }
  lines.filter((l) => !l.behind).forEach((l) => body.push(txt(l)))

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`
    + `<defs>${defs.join('')}</defs>${body.join('')}</svg>`
}

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]

async function render(orient, lang) {
  const cal = heroScene[orient]
  const src = path.join(FRAMES, `frame2-${orient}.jpg`)
  if (!fs.existsSync(src)) { console.warn(`skip ${orient}: no frame`); return }

  const bookId = heroScene.featuredBookId || club.seasons?.find((s) => s.status === 'current')?.bookId
  const book = books.find((b) => b.id === bookId) || books[0]
  const entry = coverArt[book.id]
  const recipe = entry && (entry[lang] || entry.en)
  if (!recipe) { console.warn(`skip: no cover recipe for ${book.id}`); return }

  const [CW, CH] = recipe.view
  const art = await sharp(Buffer.from(await coverSvg(recipe)))
    .resize(CW, CH).ensureAlpha().raw().toBuffer()

  const { data: photo, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info

  // Forward: unit square → quad, in the frame's own pixel space. Invert it so
  // each output pixel can ask "which point of the cover falls here?".
  const s = basisToPoints([0, 0], [1, 0], [0, 1], [1, 1])
  const [tl, tr, br, bl] = cal.coverQuad
  const d = basisToPoints(tl, tr, bl, br)
  const Hm = mul(d, adj(s))
  const Hi = adj(Hm)

  const [br_, bg_, bb_] = hex(entry.base)
  const tint = entry.tint

  const xs = cal.coverQuad.map((p) => p[0]), ys = cal.coverQuad.map((p) => p[1])
  const x0 = Math.max(0, Math.floor(Math.min(...xs))), x1 = Math.min(W, Math.ceil(Math.max(...xs)))
  const y0 = Math.max(0, Math.floor(Math.min(...ys))), y1 = Math.min(H, Math.ceil(Math.max(...ys)))

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const w = Hi[6] * x + Hi[7] * y + Hi[8]
      const u = (Hi[0] * x + Hi[1] * y + Hi[2]) / w
      const v = (Hi[3] * x + Hi[4] * y + Hi[5]) / w
      if (u < 0 || u >= 1 || v < 0 || v >= 1) continue

      const p = (y * W + x) * 4
      // 1. tint the cloth, keeping (1 - tint) of the photo so the weave shows
      photo[p]     = photo[p]     * (1 - tint) + br_ * tint
      photo[p + 1] = photo[p + 1] * (1 - tint) + bg_ * tint
      photo[p + 2] = photo[p + 2] * (1 - tint) + bb_ * tint

      // 2. print the artwork over it
      const cx = Math.min(CW - 1, (u * CW) | 0), cy = Math.min(CH - 1, (v * CH) | 0)
      const q = (cy * CW + cx) * 4
      const a = art[q + 3] / 255
      if (a > 0) {
        photo[p]     = photo[p]     * (1 - a) + art[q]     * a
        photo[p + 1] = photo[p + 1] * (1 - a) + art[q + 1] * a
        photo[p + 2] = photo[p + 2] * (1 - a) + art[q + 2] * a
      }
    }
  }

  // The ink title on the open page, so the preview shows the whole composite.
  const ttl = cal.title
  const label = lang === 'ar' ? book.title.ar : book.title.en
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`
    + `<g transform="translate(${ttl.x},${ttl.y}) rotate(${ttl.rotate})">`
    + `<text x="0" y="${ttl.fontSize * 0.35}" text-anchor="middle" fill="#3a3128"`
    + ` font-family="serif" font-size="${ttl.fontSize}" font-weight="700">${label}</text></g></svg>`

  fs.mkdirSync(OUT, { recursive: true })
  const out = path.join(OUT, `preview-${orient}-${lang}.jpg`)
  await sharp(photo, { raw: { width: W, height: H, channels: 4 } })
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .jpeg({ quality: 90 }).toFile(out)
  console.log(`wrote ${path.relative(process.cwd(), out)}`)
}

const only = process.argv[2]
for (const orient of ['landscape', 'portrait']) {
  if (only && only !== orient) continue
  for (const lang of ['ar', 'en']) await render(orient, lang)
}
