// Extract each spider-web panel into its own trimmed PNG so the "Normal" and
// each "drug" panel can be shown at exactly the same size for comparison.
import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.resolve(__dirname, '../public/images/clean/spider-web.png')
const outDir = path.resolve(__dirname, '../public/images/clean/spider')
fs.mkdirSync(outDir, { recursive: true })

// Rectangles on the cleaned 1452x644 image [left, top, width, height].
const PANELS = {
  normal: [6, 8, 632, 526],
  lsd: [658, 10, 392, 242],
  speed: [1060, 10, 390, 242],
  marijuana: [658, 260, 392, 262],
  caffeine: [1060, 260, 390, 262],
}

const meta = await sharp(src).metadata()
for (const [name, [left, top, w, h]] of Object.entries(PANELS)) {
  const width = Math.min(w, meta.width - left)
  const height = Math.min(h, meta.height - top)
  await sharp(src)
    .extract({ left, top, width, height })
    .trim({ threshold: 8 })
    .png()
    .toFile(path.join(outDir, `${name}.png`))
  console.log('ok', name)
}
console.log('done')
