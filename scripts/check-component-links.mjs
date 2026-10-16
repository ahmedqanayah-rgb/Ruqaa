/*
 * Validate `/book/<id>/<slug>?open=<id>` links HARDCODED IN COMPONENTS.
 *
 * check-links.mjs walks the book DATA — every `to` field, every connections
 * entry, every group. It cannot see a link written straight into JSX, and that
 * was a real hole rather than a theoretical one: `FocusLab.jsx` alone carries
 * nine of them, every one was rewritten during the section collapse, and two
 * pointed at deleted sections for a while with the checker still reporting
 * clean. CLAUDE.md compensated with "grep for /book/<id>/ after any slug
 * change" — a checklist item standing in for the check.
 *
 * Same idiom check-links already uses for figure ids: components are JSX, so
 * they cannot be imported here — match against their source.
 *
 * Template holes are skipped on purpose. `/book/${book.id}/${slug}` is built at
 * runtime and cannot be resolved from source; guessing at it would produce
 * false failures, which is worse than a gap this file is honest about.
 *
 * Run:  node scripts/check-component-links.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// The FULL books — data/books.js holds only skeletons now, and it uses Vite's
// import.meta.glob, which Node cannot run.
const { books } = await import('../src/data/allBooks.js')
const { openable } = await import('../src/data/bookHelpers.js')

const here = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(here, '../src')

const slugs = new Map(books.map((b) => [b.id, new Set(b.sections.map((s) => s.slug))]))
const headings = new Map()
for (const b of books) {
  for (const s of b.sections) {
    const ids = openable(s).map((h) => h.id).filter(Boolean)
    if (ids.length) headings.set(`${b.id}/${s.slug}`, new Set(ids))
  }
}

const files = []
;(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full)
    else if (/\.(jsx|js|mjs)$/.test(e.name)) files.push(full)
  }
})(srcDir)

let bad = 0
let checked = 0
const LINK = /['"`]\/book\/([a-z0-9-]+)\/([a-zA-Z0-9_-]+)(\?[^'"`]*)?['"`]/g

for (const file of files) {
  const rel = path.relative(srcDir, file).replace(/\\/g, '/')
  for (const m of fs.readFileSync(file, 'utf8').matchAll(LINK)) {
    const [, bookId, slug, query] = m
    checked++
    const where = `src/${rel}`
    if (!slugs.has(bookId)) { console.log(`  BAD BOOK  ${bookId}   ${where}`); bad++; continue }
    if (!slugs.get(bookId).has(slug)) { console.log(`  BAD SLUG  ${bookId}/${slug}   ${where}`); bad++; continue }
    const open = new URLSearchParams((query || '').replace(/^\?/, '')).get('open')
    if (!open) continue
    const ids = headings.get(`${bookId}/${slug}`)
    if (!ids) { console.log(`  NOTHING TO OPEN  ${bookId}/${slug}?open=${open}   ${where}`); bad++ }
    else if (!ids.has(open)) { console.log(`  BAD OPEN  ${bookId}/${slug}?open=${open}   ${where}`); bad++ }
  }
}

console.log(`${checked} hardcoded component link(s) checked across ${files.length} files; ${bad} bad`)
process.exit(bad ? 1 : 0)
