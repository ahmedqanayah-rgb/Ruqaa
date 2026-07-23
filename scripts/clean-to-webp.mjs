/*
 * Convert the clean/ cut-out images to WebP.
 *
 * clean/ is ~half the total image weight and is all background-removed PNGs
 * with transparency — exactly where WebP wins most (alpha at a fraction of PNG
 * size). It's the safe target: these files are display-only and are referenced
 * solely through the `clean()`, `panel()` and `rowImg()` helpers, which this
 * change updates to emit .webp. No literal path anywhere points into clean/.
 *
 * (anatomical/ is deliberately left as-is: those double as the source images
 * for clean/ via process-images.mjs, so converting them is more entangled.)
 *
 * Writes foo.webp beside foo.png and deletes the original. Safe to re-run.
 * Run:  node scripts/clean-to-webp.mjs
 */
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const DIR = 'public/images/clean'
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))

const files = walk(DIR).filter((f) => /\.(png|jpe?g)$/i.test(f))
let before = 0, after = 0

for (const file of files) {
  const size = fs.statSync(file).size
  before += size
  const out = file.replace(/\.\w+$/, '.webp')
  try {
    // Buffer first: sharp holds the input path open, and on Windows writing a
    // sibling while it's held can fail. Reading up front sidesteps that.
    const input = fs.readFileSync(file)
    const buf = await sharp(input).webp({ quality: 82, effort: 6 }).toBuffer()
    fs.writeFileSync(out, buf)
    fs.unlinkSync(file)
    after += buf.length
    const pct = Math.round((1 - buf.length / size) * 100)
    console.log(`  ${String(Math.round(size / 1024)).padStart(5)} KB → ${String(Math.round(buf.length / 1024)).padStart(5)} KB  (-${pct}%)  ${path.relative(DIR, out).replace(/\\/g, '/')}`)
  } catch (err) {
    after += size
    console.warn(`  ! skipped ${file}: ${err.message}`)
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`\nconverted ${files.length} files: ${mb(before)} MB → ${mb(after)} MB (-${Math.round((1 - after / before) * 100)}%)`)
