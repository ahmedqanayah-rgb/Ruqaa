// One-off: import the club's staged "Stolen Focus" photos into the app.
// Converts webp/avif/png → jpg, auto-rotates, resizes to max 800px on the long
// edge (quality 80), and writes kebab-case filenames. Character portraits go to
// public/images/characters/; covers + scenic shots go to public/images/.
// Originals in the staging folder are never touched. Run: node scripts/import-stolen-focus-photos.mjs
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = 'C:/Users/aq/Desktop/Ruqaa/Stolen focus/Photos'
const PUB = path.resolve(__dirname, '../public/images')
const CHARS = path.join(PUB, 'characters')
fs.mkdirSync(CHARS, { recursive: true })

// Target-name overrides where a plain kebab-case of the source would be wrong.
const RENAME = {
  'B.F. Skinner': 'bf-skinner',
  'Dan Gilbert & Matthew Killingsworth': 'gilbert-killingsworth',
  "Graceland's Jungle Room": 'graceland-jungle-room',
}
// Written to public/images/ (page images), not characters/.
const TO_IMAGES = new Set([
  'stolen-focus-cover-en', 'stolen-focus-cover-ar', 'provincetown', 'graceland-jungle-room',
])
// Already present in the app from the Why We Sleep book — don't duplicate.
const SKIP = new Set(['Charles Czeisler'])

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

if (!fs.existsSync(SRC)) {
  console.error('staging folder not found:', SRC)
  process.exit(1)
}

const files = fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
let ok = 0, skipped = 0
for (const f of files) {
  const base = f.replace(/\.[^.]+$/, '')
  if (SKIP.has(base)) { console.log('skip ', f); skipped++; continue }
  const target = RENAME[base] || kebab(base)
  const dir = TO_IMAGES.has(target) ? PUB : CHARS
  const outPath = path.join(dir, target + '.jpg')
  try {
    await sharp(path.join(SRC, f))
      .rotate()
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(outPath)
    ok++
    console.log('ok   ', f, '->', path.relative(PUB, outPath).replace(/\\/g, '/'))
  } catch (e) {
    console.log('FAIL ', f, e.message)
  }
}
console.log(`done: ${ok} written, ${skipped} skipped`)
