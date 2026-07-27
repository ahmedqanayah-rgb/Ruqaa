/*
 * Convert a directory of images to WebP, in place.
 *
 * Writes foo.webp beside foo.png/.jpg and deletes the original, so callers must
 * be updated to point at .webp. The book data files do that with an extension
 * swap inside their path helpers (`clean()`, `port()`) rather than churning
 * every call site. Safe to re-run — files already WebP are left alone.
 *
 * Run:  node scripts/to-webp.mjs public/images/clean
 *       node scripts/to-webp.mjs public/images/characters
 *
 * Applied so far:
 *   clean/       5.1 MB → 2.3 MB   background-removed PNGs with alpha, which is
 *                                  where WebP wins most
 *   characters/  1.9 MB → 0.6 MB   57 portrait jpgs
 *
 * NOT for the og:image — several social scrapers won't fetch a WebP preview —
 * so the book covers used in link previews stay JPG.
 */
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const DIR = process.argv[2]
if (!DIR || !fs.existsSync(DIR)) {
  console.error('usage: node scripts/to-webp.mjs <directory>')
  process.exit(1)
}

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
