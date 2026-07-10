// Extract each sleep-phase row from the cleaned brain-areas illustration into
// its own trimmed transparent PNG, so the crops are exact (no CSS guesswork).
import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.resolve(__dirname, '../public/images/clean/brain-areas.png')
const outDir = path.resolve(__dirname, '../public/images/clean/brain')
fs.mkdirSync(outDir, { recursive: true })

// Generous row bands [left, top, width, height] on the 2122x1341 cleaned image;
// each band contains one full row of brains and no neighbouring row. trim()
// tightens to the actual content afterwards.
const ROWS = {
  light: [100, 50, 2022, 411],
  nrem: [100, 462, 2022, 423],
  rem: [100, 886, 2022, 455],
}

for (const [name, [left, top, w, h]] of Object.entries(ROWS)) {
  await sharp(src)
    .extract({ left, top, width: w, height: h })
    .trim({ threshold: 10 })
    .png()
    .toFile(path.join(outDir, `${name}.png`))
  console.log('ok', name)
}
console.log('done')
