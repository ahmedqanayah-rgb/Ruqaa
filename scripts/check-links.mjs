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
const { books } = await import('../src/data/books.js')
const { connections } = await import('../src/data/connections.js')

const slugs = new Map(books.map((b) => [b.id, new Set(b.sections.map((s) => s.slug))]))
let bad = 0
const check = (bookId, slug, where) => {
  if (!slugs.has(bookId)) { console.log(`  BAD BOOK  "${bookId}"           ${where}`); bad++; return }
  if (!slugs.get(bookId).has(slug)) { console.log(`  BAD SLUG  ${bookId}/${slug}   ${where}`); bad++ }
}

for (const item of connections.items ?? []) {
  const theme = item.theme?.en ?? ''
  for (const key of ['a', 'b']) {
    const side = item[key]
    if (side?.slug) check(side.bookId, side.slug, `connections · ${theme} · ${key}`)
  }
}

for (const b of books) {
  for (const g of b.groups ?? [])
    for (const s of g.slugs ?? []) check(b.id, s, `${b.id} · group "${g.title?.en ?? ''}"`)

  const challenge = b.sections.find((s) => s.kind === 'challenge')
  for (const d of challenge?.days ?? [])
    if (d.to) check(b.id, d.to, `${b.id} · challenge day ${d.n ?? '?'}`)

  // Internal links inside section content: `to: '/book/<id>/<slug>'` or a bare slug.
  const walk = (v, where) => {
    if (!v || typeof v !== 'object') return
    if (Array.isArray(v)) return v.forEach((x) => walk(x, where))
    if (typeof v.to === 'string') {
      const m = v.to.match(/^\/book\/([^/]+)\/([^/?#]+)/)
      if (m) check(m[1], m[2], where)
    }
    Object.values(v).forEach((x) => walk(x, where))
  }
  for (const s of b.sections) walk(s.blocks, `${b.id}/${s.slug} · content link`)
}

const total = [...slugs.values()].reduce((n, s) => n + s.size, 0)
console.log(`${total} sections across ${books.length} books; ${bad} bad reference(s)`)
process.exit(bad ? 1 : 0)
