/*
 * Brings the club's question photos into the site.
 *   node scripts/import-question-photos.mjs [photoDir]      (default: ../question-photos)
 *
 * The club collects the photos into Ruqaa/question-photos — outside the repo,
 * like the other masters — under the names scripts/question-photos.mjs plans.
 * For each planned name this takes the NEWEST file (an old one left beside a
 * replacement is ignored), cleans what must not show (`FIXES`: a crop, or
 * writing painted over in a colour taken from the photo itself), sizes it for a
 * phone — long side 960–1200 px; a small photo is enlarged with Lanczos and
 * lightly sharpened (no AI, nothing paid) — and writes
 * public/images/game/q/<name>.webp. Then src/data/game/questionPhotos.js:
 * question id → [path, width, height], for the photos that exist, plus the
 * site's own pictures in REUSE. Run it again after any photo changes.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { PHOTOS, REUSE, SKIP, PICTURE_ROUNDS } from './question-photos.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const app = path.resolve(here, '..')
const photoDir = path.resolve(process.argv[2] || path.join(app, '..', 'question-photos'))
const outDir = path.join(app, 'public/images/game/q')
const dataFile = path.join(app, 'src/data/game/questionPhotos.js')
const LONG_MIN = 960
const LONG_MAX = 1200
const BUDGET = 200 * 1024

/* What must not show. Fractions of the photo: a crop trims each side; a patch
   covers a rectangle in the colour found at `from` (or `fill`); a smear fills a
   rectangle by stretching the strip of photo just above it down over it — which
   keeps an object's own shading and edges, where a flat patch would show. */
const FIXES = {
  'td-pow-camp': { crop: { bottom: 0.07 } }, // a handwritten "Copr." caption
  'sf-flow': { crop: { bottom: 0.12 } }, // text across the jersey
  'ws-nightcap': { crop: { bottom: 0.07 } }, // a shop's web address
  'ws-portrait-studio': { crop: { bottom: 0.05 } }, // the photographer's name
  'ws-pills': { patch: [{ x: 0.37, y: 0.436, w: 0.243, h: 0.284, fill: '#fbfbfa', r: 0.012 }] }, // an advert printed on the label
  'sf-ksafe': { // its brand name — the very answer to "what is this?" — on the label band and the button
    smear: [ // copied from the clean face above the button; the middle starts below the button, which keeps its edge
      { x: 0.08, y: 0.588, w: 0.355, h: 0.172, fromY: 0.485 },
      { x: 0.435, y: 0.593, w: 0.12, h: 0.167, fromY: 0.485 },
      { x: 0.555, y: 0.588, w: 0.365, h: 0.172, fromY: 0.485 },
    ],
    patch: [{ x: 0.452, y: 0.532, w: 0.09, h: 0.028, from: [0.449, 0.519], r: 0.006 }],
  },
}

const IMG = /\.(jpe?g|png|webp|avif|gif|tiff?)$/i
const files = fs.readdirSync(photoDir).filter((f) => IMG.test(f))
const newest = (name) => files
  .filter((f) => f.replace(/\.[^.]+$/, '') === name)
  .map((f) => ({ f, t: fs.statSync(path.join(photoDir, f)).mtimeMs }))
  .sort((a, b) => b.t - a.t)[0]?.f

async function clean(file, fix) {
  let img = sharp(file, { animated: false }).rotate()
  let { width: w, height: h } = await img.metadata().then((m) => (m.autoOrient || m))
  let buffer = await img.toBuffer()
  if (fix?.crop) {
    const c = { top: 0, bottom: 0, left: 0, right: 0, ...fix.crop }
    const box = { left: Math.round(w * c.left), top: Math.round(h * c.top), width: Math.round(w * (1 - c.left - c.right)), height: Math.round(h * (1 - c.top - c.bottom)) }
    buffer = await sharp(buffer).extract(box).toBuffer()
    ;({ width: w, height: h } = box)
  }
  if (fix?.smear) {
    const layers = []
    for (const s of fix.smear) {
      const box = { left: Math.round(s.x * w), top: Math.round(s.y * h), width: Math.round(s.w * w), height: Math.round(s.h * h) }
      const top = s.fromY != null ? Math.round(s.fromY * h) : box.top - 3
      const strip = await sharp(buffer).extract({ left: box.left, top, width: box.width, height: 2 }).toBuffer()
      layers.push({ input: await sharp(strip).resize(box.width, box.height, { fit: 'fill', kernel: 'nearest' }).toBuffer(), left: box.left, top: box.top })
    }
    buffer = await sharp(buffer).composite(layers).toBuffer()
  }
  if (fix?.patch) {
    const raw = await sharp(buffer).removeAlpha().raw().toBuffer()
    const colourAt = ([fx, fy]) => {
      const x = Math.round(fx * (w - 1)), y = Math.round(fy * (h - 1))
      const i = (y * w + x) * 3
      return `rgb(${raw[i]},${raw[i + 1]},${raw[i + 2]})`
    }
    const rects = fix.patch.map((p) => `<rect x="${p.x * w}" y="${p.y * h}" width="${p.w * w}" height="${p.h * h}" rx="${(p.r || 0) * w}" fill="${p.fill || colourAt(p.from)}" filter="url(#soft)"/>`)
    const svg = `<svg width="${w}" height="${h}"><defs><filter id="soft"><feGaussianBlur stdDeviation="${Math.max(1, w / 900)}"/></filter></defs>${rects.join('')}</svg>`
    buffer = await sharp(buffer).composite([{ input: Buffer.from(svg) }]).toBuffer()
  }
  return { buffer, w, h }
}

async function write(name, file) {
  const { buffer, w, h } = await clean(file, FIXES[name])
  const long = Math.max(w, h)
  const scale = long < LONG_MIN ? LONG_MIN / long : long > LONG_MAX ? LONG_MAX / long : 1
  const W = Math.round(w * scale)
  const H = Math.round(h * scale)
  const out = path.join(outDir, `${name}.webp`)
  /* Members join from slow connections: a photo past BUDGET is encoded again
     more lightly, then smaller — fine engravings and starry skies are the heavy ones. */
  let size = [W, H]
  for (const [quality, long] of [[78, null], [66, null], [66, 1000], [60, 900]]) {
    size = long && Math.max(W, H) > long ? [Math.round(W * long / Math.max(W, H)), Math.round(H * long / Math.max(W, H))] : [W, H]
    let img = sharp(buffer).resize(size[0], size[1], { kernel: 'lanczos3' })
    if (scale >= 1.25) img = img.sharpen({ sigma: 0.6 })
    await img.webp({ quality, effort: 5 }).toFile(out)
    if (fs.statSync(out).size <= BUDGET) break
  }
  return { W: size[0], H: size[1], kb: Math.round(fs.statSync(out).size / 1024), scale }
}

fs.mkdirSync(outDir, { recursive: true })
const map = {}
const missing = []
const report = []
for (const [name, plan] of Object.entries(PHOTOS)) {
  if (SKIP.includes(name)) continue
  const file = newest(name)
  if (!file) { missing.push(name); continue }
  const r = await write(name, path.join(photoDir, file))
  report.push(`${name.padEnd(24)} ${file.padEnd(30)} → ${r.W}×${r.H} ${String(r.kb).padStart(4)} kB${r.scale > 1 ? `  (enlarged ×${r.scale.toFixed(2)})` : ''}${FIXES[name] ? '  (cleaned)' : ''}`)
  for (const id of plan.q) map[id] = [`./images/game/q/${name}.webp`, r.W, r.H]
}
// Picture rounds: the photo is the question itself; their decks carry the path.
for (const name of Object.keys(PICTURE_ROUNDS)) {
  const file = newest(name)
  if (!file) { missing.push(name); continue }
  const r = await write(name, path.join(photoDir, file))
  report.push(`${name.padEnd(24)} ${file.padEnd(30)} → ${r.W}×${r.H} ${String(r.kb).padStart(4)} kB${r.scale > 1 ? `  (enlarged ×${r.scale.toFixed(2)})` : ''}${FIXES[name] ? '  (cleaned)' : ''}  [picture round]`)
}
for (const [id, src] of Object.entries(REUSE)) {
  const m = await sharp(path.join(app, 'public', src.replace(/^\.\//, ''))).metadata()
  map[id] = [src, m.width, m.height]
}

const body = Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).map(([id, [src, w, h]]) => `  ${JSON.stringify(id)}: [${JSON.stringify(src)}, ${w}, ${h}],`).join('\n')
fs.writeFileSync(dataFile, `/* GENERATED by scripts/import-question-photos.mjs — don't hand-edit: change a photo
   in Ruqaa/question-photos (or the plan, scripts/question-photos.mjs) and run it again.
   A question's photo shows its subject, never its answer: question id → [path, width, height]. */
export const questionPhotos = {
${body}
}
`)
console.log(report.join('\n'))
console.log(`\n${report.length} photos written to public/images/game/q, ${Object.keys(map).length} questions with a photo → src/data/game/questionPhotos.js`)
if (missing.length) console.log(`missing (no file yet): ${missing.join(', ')}`)
