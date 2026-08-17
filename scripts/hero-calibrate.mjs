// Calibration aid for the homepage hero overlays.
//
//   node scripts/hero-calibrate.mjs                 → both orientations
//   node scripts/hero-calibrate.mjs landscape
//
// The hero composites two things onto frame2 in IMAGE-SPACE PIXELS, set in
// src/data/heroScene.js: the featured book's cover, perspective-warped onto the
// blank leaning book (`coverQuad`, corners TL→TR→BR→BL), and the book title as
// ink text on the open page (`title`). Those numbers are read off the frame by
// eye, and they have to be redone every time the frames are regenerated.
//
// This writes an annotated copy of each frame next to it:
//   • a 100px grid with labelled axes, so corners can be read off directly;
//   • the CURRENT coverQuad drawn on top, corners numbered, so a wrong number
//     is obvious rather than something you discover in the browser;
//   • the CURRENT title box at its rotation, width and font size.
// Look at the output, adjust heroScene.js, run again. Nothing here ships — the
// annotated files go to hero-calibrate-out/ which is git-ignored.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { heroScene } from '../src/data/heroScene.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// The full-resolution masters outside the repo — the quads are pixel
// coordinates in that space, and public/ only has the smaller WebP.
const FRAMES = path.resolve(__dirname, '../../hero-video-wip/frames')
const OUT = path.resolve(__dirname, '../hero-calibrate-out')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

function annotate(orient) {
  const cal = heroScene[orient]
  const { imageW: W, imageH: H, coverQuad: q, title } = cal
  const step = 100
  const parts = []

  // grid + axis labels
  for (let x = 0; x <= W; x += step) {
    parts.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="rgba(0,150,255,.28)" stroke-width="2"/>`)
    parts.push(`<text x="${x + 4}" y="26" font-family="monospace" font-size="22" fill="#0af" stroke="#000" stroke-width="4" paint-order="stroke">${x}</text>`)
  }
  for (let y = 0; y <= H; y += step) {
    parts.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="rgba(0,150,255,.28)" stroke-width="2"/>`)
    parts.push(`<text x="4" y="${y - 4}" font-family="monospace" font-size="22" fill="#0af" stroke="#000" stroke-width="4" paint-order="stroke">${y}</text>`)
  }

  // the current cover quad, corners numbered TL(0) TR(1) BR(2) BL(3)
  parts.push(`<polygon points="${q.map((p) => p.join(',')).join(' ')}" fill="rgba(255,0,110,.20)" stroke="#ff006e" stroke-width="6"/>`)
  q.forEach(([x, y], i) => {
    parts.push(`<circle cx="${x}" cy="${y}" r="14" fill="#ff006e" stroke="#fff" stroke-width="3"/>`)
    parts.push(`<text x="${x + 22}" y="${y - 16}" font-family="monospace" font-size="34" fill="#fff" stroke="#000" stroke-width="6" paint-order="stroke">${['TL', 'TR', 'BR', 'BL'][i]} ${x},${y}</text>`)
  })

  // the current title box, at its own rotation
  const tw = title.maxWidth, th = title.fontSize * 1.3
  parts.push(`<g transform="translate(${title.x},${title.y}) rotate(${title.rotate})">
    <rect x="${-tw / 2}" y="${-th / 2}" width="${tw}" height="${th}" fill="rgba(60,220,130,.22)" stroke="#3cdc82" stroke-width="5"/>
    <text x="0" y="${th / 2 - 6}" text-anchor="middle" font-family="serif" font-size="${title.fontSize}" fill="#1a1a1a" stroke="#fff" stroke-width="3" paint-order="stroke">${esc(heroScene.pageTitle?.ar || 'عنوان الكتاب')}</text>
  </g>`)
  parts.push(`<circle cx="${title.x}" cy="${title.y}" r="10" fill="#3cdc82" stroke="#fff" stroke-width="3"/>`)
  parts.push(`<text x="${title.x + 18}" y="${title.y + 46}" font-family="monospace" font-size="30" fill="#fff" stroke="#000" stroke-width="6" paint-order="stroke">title ${title.x},${title.y} rot ${title.rotate} w${title.maxWidth} fs${title.fontSize}</text>`)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${parts.join('')}</svg>`
  return { svg, W, H }
}

/*
 * --zoom <orientation> <x0,y0,x1,y1> crops that region of the frame and blows it
 * up with a fine labelled grid. Corner-reading off the full-frame grid is only
 * good to ±30px, which is enough to put the cover quad visibly off the book's
 * edges; this is how to get it right.
 */
if (process.argv[2] === '--zoom') {
  const orient = process.argv[3]
  const [zx0, zy0, zx1, zy1] = process.argv[4].split(',').map(Number)
  const src = path.join(FRAMES, `frame2-${orient}.jpg`)
  const w = zx1 - zx0, h = zy1 - zy0
  const scale = Math.min(3, Math.max(1, Math.round(1600 / w)))
  const SW = w * scale, SH = h * scale
  const step = 25
  const g = []
  for (let x = Math.ceil(zx0 / step) * step; x <= zx1; x += step) {
    const px = (x - zx0) * scale
    const major = x % 100 === 0
    g.push(`<line x1="${px}" y1="0" x2="${px}" y2="${SH}" stroke="${major ? 'rgba(0,200,255,.75)' : 'rgba(0,200,255,.3)'}" stroke-width="${major ? 2 : 1}"/>`)
    if (major) g.push(`<text x="${px + 3}" y="18" font-family="monospace" font-size="16" fill="#0ff" stroke="#000" stroke-width="3" paint-order="stroke">${x}</text>`)
  }
  for (let y = Math.ceil(zy0 / step) * step; y <= zy1; y += step) {
    const py = (y - zy0) * scale
    const major = y % 100 === 0
    g.push(`<line x1="0" y1="${py}" x2="${SW}" y2="${py}" stroke="${major ? 'rgba(0,200,255,.75)' : 'rgba(0,200,255,.3)'}" stroke-width="${major ? 2 : 1}"/>`)
    if (major) g.push(`<text x="3" y="${py - 4}" font-family="monospace" font-size="16" fill="#0ff" stroke="#000" stroke-width="3" paint-order="stroke">${y}</text>`)
  }
  fs.mkdirSync(OUT, { recursive: true })
  const out = path.join(OUT, `zoom-${orient}.jpg`)
  await sharp(src).extract({ left: zx0, top: zy0, width: w, height: h }).resize(SW, SH)
    .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${SH}">${g.join('')}</svg>`), top: 0, left: 0 }])
    .jpeg({ quality: 92 }).toFile(out)
  console.log(`wrote ${path.relative(process.cwd(), out)} — region ${zx0},${zy0} → ${zx1},${zy1} at ${scale}x, 25px grid`)
  process.exit(0)
}

const only = process.argv[2]
fs.mkdirSync(OUT, { recursive: true })

for (const orient of ['landscape', 'portrait']) {
  if (only && only !== orient) continue
  const src = path.join(FRAMES, `frame2-${orient}.jpg`)
  if (!fs.existsSync(src)) { console.warn(`skip ${orient}: no ${path.basename(src)}`); continue }

  const { svg, W, H } = annotate(orient)
  const meta = await sharp(src).metadata()
  if (meta.width !== W || meta.height !== H) {
    console.warn(`  ⚠ ${orient}: heroScene says ${W}x${H} but the frame is ${meta.width}x${meta.height}.`)
    console.warn(`    Fix imageW/imageH first — every other number is read in that space.`)
  }
  const out = path.join(OUT, `calibrate-${orient}.jpg`)
  await sharp(src).resize(W, H, { fit: 'fill' })
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 88 }).toFile(out)
  console.log(`wrote ${path.relative(process.cwd(), out)}  (${W}x${H})`)
}
