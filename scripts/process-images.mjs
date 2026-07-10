// Dev-only: removes clean white backgrounds (flood-fill from the borders so
// interior white detail is preserved) and trims edges. Outputs transparent PNGs
// to public/images/clean/. Run: node scripts/process-images.mjs
import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const anatDir = path.resolve(__dirname, '../public/images/anatomical')
const outDir = path.resolve(__dirname, '../public/images/clean')
fs.mkdirSync(outDir, { recursive: true })

// Diagrams / illustrations on a plain white background.
const TARGETS = [
  ['anatomical', 'brain-areas-during-rem-and-nrem-and-light-sleep.jpg', 'brain-areas.png'],
  ['anatomical', 'adenosine-caffeine-receptors-1.png', 'adenosine-1.png'],
  ['anatomical', 'adenosine-caffeine-receptors-2.png', 'adenosine-2.png'],
  ['anatomical', 'light-pathway-retina-scn.png', 'light-pathway.png'],
  ['anatomical', 'orexinhypocretin-neurons.png', 'orexin.png'],
  ['anatomical', 'glymphatic-system.png', 'glymphatic.png'],
  ['anatomical', 'prion-protein-ffi.png', 'prion.png'],
  ['anatomical', 'human-brain-regions-overview-thalamus.png', 'brain-regions.png'],
  ['anatomical', 'hippocampus-cortex.jpg', 'hippocampus-cortex.png'],
  ['anatomical', 'memory-consolodation.png', 'memory-consolidation.png'],
  ['anatomical', 'memory-brain-chart.png', 'memory-chart.png'],
  ['anatomical', 'pineal-gland.jpg', 'pineal-gland.png'],
  ['root', 'spider-web.png', 'spider-web.png'],
]

const WHITE = 232 // channel value at/above which a pixel counts as "white"

async function processOne(srcPath, outName) {
  const img = sharp(srcPath).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const isWhite = (i) =>
    data[i] >= WHITE && data[i + 1] >= WHITE && data[i + 2] >= WHITE
  const visited = new Uint8Array(width * height)
  const stack = []
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const p = y * width + x
    if (visited[p]) return
    const i = p * channels
    if (!isWhite(i)) return
    visited[p] = 1
    stack.push(p)
  }
  for (let x = 0; x < width; x++) { push(x, 0); push(x, height - 1) }
  for (let y = 0; y < height; y++) { push(0, y); push(width - 1, y) }
  while (stack.length) {
    const p = stack.pop()
    const x = p % width, y = (p / width) | 0
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1)
  }
  for (let p = 0; p < visited.length; p++) {
    if (visited[p]) data[p * channels + 3] = 0
  }
  await sharp(data, { raw: { width, height, channels } })
    .png()
    .trim({ threshold: 10 })
    .toFile(path.join(outDir, outName))
  return outName
}

for (const [where, src, out] of TARGETS) {
  const srcPath =
    where === 'root'
      ? path.resolve(__dirname, '../public/images', src)
      : path.join(anatDir, src)
  if (!fs.existsSync(srcPath)) { console.log('MISSING', src); continue }
  try {
    await processOne(srcPath, out)
    console.log('ok  ', out)
  } catch (e) {
    console.log('FAIL', out, e.message)
  }
}
console.log('done')
