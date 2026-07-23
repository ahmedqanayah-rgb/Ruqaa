/*
 * Shrink public/images in place — same filenames, same formats, so no source
 * references change.
 *
 * Why: the images were 43 MB against a 346 kB JS bundle, and several were
 * absurdly oversized for a 900px content column (one diagram was 4060px wide).
 * Members join from places with uneven connections, so this is the single
 * biggest thing we can do for them.
 *
 * What it does:
 *   - caps width (character portraits render tiny, so they get a smaller cap)
 *   - re-encodes with proper compression, preserving transparency
 *   - only writes when the result is actually smaller, so it's safe to re-run
 *
 * Run:  node scripts/optimize-images.mjs        (add --dry to preview)
 */
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const ROOT = 'public/images'
const DRY = process.argv.includes('--dry')

// Content column is 900px, so 1600 still leaves headroom on retina screens.
// Portraits render at ~72–120px; 500 is already generous.
const capFor = (rel) => (rel.startsWith('characters/') ? 500 : 1600)

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))

const files = walk(ROOT).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
let before = 0, after = 0, rewritten = 0

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/')
  const size = fs.statSync(file).size
  before += size

  try {
    // Read to a buffer first. Handing sharp the *path* keeps the file open, and
    // writing back to it in the same tick fails on Windows with UNKNOWN/EBUSY.
    const input = fs.readFileSync(file)
    const img = sharp(input)
    const meta = await img.metadata()
    const cap = capFor(rel)

    let pipeline = img
    if (meta.width > cap) pipeline = pipeline.resize({ width: cap, withoutEnlargement: true })

    // Keep the format so nothing that references these files has to change.
    if (meta.format === 'png') {
      // Transparency matters here: the clean/ set are background-removed cut-outs.
      pipeline = pipeline.png({ compressionLevel: 9, effort: 10 })
    } else if (meta.format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true })
    } else if (meta.format === 'webp') {
      pipeline = pipeline.webp({ quality: 82 })
    }

    const buf = await pipeline.toBuffer()

    if (buf.length < size) {
      if (!DRY) fs.writeFileSync(file, buf)
      after += buf.length
      rewritten++
      const pct = Math.round((1 - buf.length / size) * 100)
      if (size > 200 * 1024) {
        console.log(
          `  ${String(Math.round(size / 1024)).padStart(5)} KB → ${String(Math.round(buf.length / 1024)).padStart(5)} KB  (-${pct}%)  ${rel}`
        )
      }
    } else {
      after += size // already optimal; leave it alone
    }
  } catch (err) {
    after += size
    console.warn(`  ! skipped ${rel}: ${err.message}`)
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`\n${DRY ? '[dry run] ' : ''}rewrote ${rewritten} of ${files.length} files`)
console.log(`total: ${mb(before)} MB → ${mb(after)} MB  (-${Math.round((1 - after / before) * 100)}%)`)
