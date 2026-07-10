// One-off cleanups: crop watermark/title strips and remove white backgrounds
// (flood-fill from the edges so interior detail is preserved). Outputs PNGs to
// public/images/clean/. Run: node scripts/fix-images.mjs
import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const anat = path.resolve(__dirname, '../public/images/anatomical')
const outDir = path.resolve(__dirname, '../public/images/clean')
fs.mkdirSync(outDir, { recursive: true })
const WHITE = 232

// Detect a dark bottom strip (e.g. an Alamy watermark bar) and return the y at
// which it starts, so we can crop it off. Returns full height if none found.
function darkStripTop(data, w, h, ch) {
  let top = h
  for (let y = h - 1; y >= 0; y--) {
    let dark = 0
    for (let x = 0; x < w; x += 4) {
      const i = (y * w + x) * ch
      if (data[i] < 70 && data[i + 1] < 70 && data[i + 2] < 70) dark++
    }
    if (dark / (w / 4) > 0.5) top = y
    else if (top < h && h - y > 4) break // strip ended going up
  }
  return top
}

// Flood-fill near-white from the borders -> transparent. Mutates `data` alpha.
function floodWhite(data, w, h, ch) {
  const isWhite = (i) => data[i] >= WHITE && data[i + 1] >= WHITE && data[i + 2] >= WHITE
  const visited = new Uint8Array(w * h)
  const stack = []
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return
    const p = y * w + x
    if (visited[p] || !isWhite(p * ch)) return
    visited[p] = 1
    stack.push(p)
  }
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1) }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y) }
  while (stack.length) {
    const p = stack.pop()
    const x = p % w, y = (p / w) | 0
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1)
  }
  for (let p = 0; p < visited.length; p++) if (visited[p]) data[p * ch + 3] = 0
}

async function clean(src, out, { cropTopFrac = 0, dropDarkStrip = false } = {}) {
  let img = sharp(path.join(anat, src)).ensureAlpha()
  const meta = await img.metadata()
  if (cropTopFrac > 0) {
    const top = Math.round(meta.height * cropTopFrac)
    img = sharp(await img.png().toBuffer()).extract({ left: 0, top, width: meta.width, height: meta.height - top }).ensureAlpha()
  }
  let { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  let { width, height, channels } = info
  if (dropDarkStrip) {
    const top = darkStripTop(data, width, height, channels)
    if (top < height - 2) {
      const cropped = await sharp(data, { raw: { width, height, channels } })
        .extract({ left: 0, top: 0, width, height: top })
        .raw().toBuffer({ resolveWithObject: true })
      data = cropped.data; width = cropped.info.width; height = cropped.info.height; channels = cropped.info.channels
    }
  }
  floodWhite(data, width, height, channels)
  await sharp(data, { raw: { width, height, channels } }).png().trim({ threshold: 10 }).toFile(path.join(outDir, out))
  console.log('ok', out)
}

await clean('beta-amyloid.jpg', 'beta-amyloid.png', { dropDarkStrip: true })
await clean('alzheimers-disease-brain.jpg', 'alzheimers.png', {})
await clean('natural-killer-cells-1.jpg', 'nk-cells-1.png', {})
await clean('amygdala.webp', 'amygdala.png', { cropTopFrac: 0.37 })
await clean('prefrontal-cortex.webp', 'prefrontal.png', {})
console.log('done')
