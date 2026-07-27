/*
 * Guard against broken image paths after a rename/format conversion.
 *
 * Most image paths are built by helpers (`clean()`, `port()`, `anat()`, and the
 * template-built figure paths), so a plain filename grep over src/ cannot see
 * them — POLISH-PLAN §1a records this biting once already. So instead of
 * grepping, this imports the real book data, walks every block, and checks each
 * resolved path against public/.
 *
 * Run:  node scripts/check-image-refs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pub = path.resolve(__dirname, '../public')
const { books } = await import('../src/data/books.js')

const refs = new Set()
const collect = (v) => {
  if (!v) return
  if (typeof v === 'string') { if (v.startsWith('./images/')) refs.add(v); return }
  if (Array.isArray(v)) { v.forEach(collect); return }
  if (typeof v === 'object') Object.values(v).forEach(collect)
}
collect(books)

// Figure components build their paths from a list of ids rather than data, so
// they are checked here explicitly.
for (const f of ['normal', 'caffeine', 'lsd', 'marijuana', 'speed']) refs.add(`./images/clean/spider/${f}.webp`)
for (const p of ['light', 'nrem', 'rem']) refs.add(`./images/clean/brain/${p}.webp`)

let missing = 0
for (const ref of [...refs].sort()) {
  const file = path.join(pub, ref.replace('./', ''))
  if (!fs.existsSync(file)) { console.log('MISSING  ' + ref); missing++ }
}
console.log(`${refs.size} image refs checked, ${missing} missing`)

// The other direction: files shipped in public/images that nothing asks for.
// Every byte here is copied into dist and downloaded by nobody. Reported, not
// failed — some are referenced from index.html or reached only by basename.
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))
// index.html and the components hold a handful of literal paths (og:image, the
// logo) that never pass through the book data, so scan their text too.
const literals = [path.resolve(__dirname, '../index.html'), ...walk(path.resolve(__dirname, '../src'))]
  .filter((f) => /\.(html|jsx?|css)$/.test(f))
  .map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n')
const orphans = walk(path.join(pub, 'images'))
  .map((f) => './' + path.relative(pub, f).replace(/\\/g, '/'))
  .filter((rel) => !refs.has(rel) && !literals.includes(path.basename(rel)))
if (orphans.length) {
  const kb = (f) => Math.round(fs.statSync(path.join(pub, f.slice(2))).size / 1024)
  console.log(`\n${orphans.length} unreferenced file(s) in public/images:`)
  for (const o of orphans.sort()) console.log(`  ${String(kb(o)).padStart(5)} KB  ${o}`)
}
// Content images without an entry in the generated manifest still cause layout
// shift (POLISH-PLAN §1d) — the fix is to re-run gen-image-dims.mjs.
const { imageDims } = await import('../src/data/imageDims.js')
const contentImgs = new Set()
const walkBlocks = (v) => {
  if (!v || typeof v !== 'object') return
  if (Array.isArray(v)) return v.forEach(walkBlocks)
  if (v.type === 'image' && v.src) contentImgs.add(v.src)
  if (v.type === 'imggrid' && Array.isArray(v.images)) v.images.forEach((i) => i.src && contentImgs.add(i.src))
  Object.values(v).forEach(walkBlocks)
}
walkBlocks(books)
const undimensioned = [...contentImgs].filter((s) => !imageDims[s])
if (undimensioned.length) {
  console.log(`\n${undimensioned.length} content image(s) missing from imageDims.js — run gen-image-dims.mjs:`)
  for (const s of undimensioned.sort()) console.log('  ' + s)
}
process.exit(missing || undimensioned.length ? 1 : 0)
