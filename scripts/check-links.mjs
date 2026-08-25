/*
 * Validate every internal reference in the book data.
 *
 * These fail *silently* at runtime — a bad section slug renders as a link that
 * quietly falls back to the book landing rather than erroring, so a typo can sit
 * live for weeks. CLAUDE.md flags this for connections.js and the challenge's
 * `to` targets; this checks those plus the sidebar groups and every internal
 * link inside section content.
 *
 * Run:  node scripts/check-links.mjs
 */
const { books, entrySlugs } = await import('../src/data/books.js')
const { connections } = await import('../src/data/connections.js')

const slugs = new Map(books.map((b) => [b.id, new Set(b.sections.map((s) => s.slug))]))

/* Chapters folded into a `tabs` block are reached as `…/<slug>?open=<panel>`.
   A wrong id fails EXACTLY like a wrong slug — nothing errors, the heading just
   never unfolds and the reader is left on a page of shut titles — so it gets
   checked the same way. bookId/slug -> Set(panel ids). */
const panels = new Map()
for (const b of books)
  for (const s of b.sections)
    for (const blk of s.blocks ?? [])
      if (blk.type === 'tabs')
        panels.set(`${b.id}/${s.slug}`, new Set((blk.panels ?? []).map((p) => p.id).filter(Boolean)))

/* Same for the «أنشطة إضافية» tab's activities. bookId/slug -> Set(part ids). */
const activityParts = new Map()
for (const b of books)
  for (const s of b.sections)
    if (s.parts) activityParts.set(`${b.id}/${s.slug}`, new Set(s.parts.map((p) => p.id).filter(Boolean)))
let bad = 0
const check = (bookId, slug, where, open) => {
  if (!slugs.has(bookId)) { console.log(`  BAD BOOK  "${bookId}"           ${where}`); bad++; return }
  if (!slugs.get(bookId).has(slug)) { console.log(`  BAD SLUG  ${bookId}/${slug}   ${where}`); bad++; return }
  if (!open) return
  /* One param for both: a `tabs` block's panels and an activities section's
     parts are the same thing to a reader — a heading that unfolds. Either way a
     wrong id fails silently, with the reader left on a page of shut headings. */
  const ids = panels.get(`${bookId}/${slug}`) ?? activityParts.get(`${bookId}/${slug}`)
  if (!ids) { console.log(`  NOTHING TO OPEN  ${bookId}/${slug}?open=${open}   ${where}`); bad++; return }
  if (!ids.has(open)) { console.log(`  BAD OPEN  ${bookId}/${slug}?open=${open}   ${where}`); bad++ }
}

for (const item of connections.items ?? []) {
  const theme = item.theme?.en ?? ''
  for (const key of ['a', 'b']) {
    const side = item[key]
    if (!side?.slug) continue
    // a connections slug may carry its heading: "review?open=big-tech"
    const [sl, q] = side.slug.split('?')
    const qs = new URLSearchParams(q || '')
    check(side.bookId, sl, `connections · ${theme} · ${key}`, qs.get('open'))
  }
}

for (const b of books) {
  // A groups entry is a titled list or a solo `{ slug }` — see entrySlugs in
  // data/books.js. Walking only `g.slugs` would silently skip every solo tab,
  // which is exactly the class of dead link this script exists to catch.
  for (const g of b.groups ?? [])
    for (const s of entrySlugs(g)) check(b.id, s, `${b.id} · ${g.slug ? 'solo entry' : `group "${g.title?.en ?? ''}"`}`)

  // Internal links inside section content: `to: '/book/<id>/<slug>'` or a bare slug.
  const walk = (v, where) => {
    if (!v || typeof v !== 'object') return
    if (Array.isArray(v)) return v.forEach((x) => walk(x, where))
    if (typeof v.to === 'string') {
      const m = v.to.match(/^\/book\/([^/]+)\/([^/?#]+)(\?[^#]*)?/)
      if (m) {
        const q = new URLSearchParams(m[3] || '')
        check(m[1], m[2], where, q.get('open'))
      }
    }
    Object.values(v).forEach((x) => walk(x, where))
  }
  /* Walk the WHOLE book, not just section blocks. `verdict.reception` was a
     bare slug on a top-level field and pointed at a deleted section on both
     landings while this script reported clean — the walk simply never went
     there. Anything with a `to` is now checked wherever it lives. */
  walk(b, `${b.id} · book data`)
  for (const s of b.sections) walk(s.blocks, `${b.id}/${s.slug} · content link`)
}

/*
 * Figure ids fail silently too: `{ type:'figure', id }` with an id the registry
 * doesn't know renders nothing at all, leaving a hole in the article. The
 * registry is JSX so it can't be imported here — match against its source.
 */
const fs = await import('node:fs')
const path = await import('node:path')
const { fileURLToPath } = await import('node:url')
const here = path.dirname(fileURLToPath(import.meta.url))
const registry = fs.readFileSync(path.resolve(here, '../src/components/figures/registry.jsx'), 'utf8')
const figureIds = new Set()
const walkFigures = (v) => {
  if (!v || typeof v !== 'object') return
  if (Array.isArray(v)) return v.forEach(walkFigures)
  if (v.type === 'figure' && v.id) figureIds.add(v.id)
  Object.values(v).forEach(walkFigures)
}
walkFigures(books)
for (const id of [...figureIds].sort()) {
  if (!new RegExp(`^\\s*${id}:`, 'm').test(registry)) {
    console.log(`  NO FIGURE  "${id}" is used in a section but not in registry.jsx`)
    bad++
  }
}

const total = [...slugs.values()].reduce((n, s) => n + s.size, 0)
console.log(`${total} sections and ${figureIds.size} figures across ${books.length} books; ${bad} bad reference(s)`)
process.exit(bad ? 1 : 0)
