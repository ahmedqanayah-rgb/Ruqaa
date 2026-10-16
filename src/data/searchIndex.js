/*
 * Search over every book: sections, chapter headings, activities, studies and
 * members' reviews.
 *
 * LOADED ON DEMAND. The search palette imports this module the first time it
 * opens, so its data — data/searchData.js, generated from the full books by
 * scripts/gen-book-skeletons.mjs (see data/searchBuild.js) — never sits in the
 * entry chunk, and searching does not require downloading the books themselves.
 */
import { searchIndex } from './searchData.js'

export { searchIndex }

/*
 * Scoring: prefix match on the title beats a word-boundary match, which beats
 * a bare substring. Sections outrank studies at equal score so the structural
 * result surfaces first. Multi-word queries must match every term.
 */
export function searchAll(query, lang, limit = 12) {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const terms = q.split(/\s+/).filter(Boolean)

  const scored = []
  for (const item of searchIndex) {
    if (!terms.every((term) => item.text.includes(term))) continue
    const title = (item.title[lang] ?? item.title.en ?? '').toLowerCase()
    let score = 0
    if (title.startsWith(q)) score += 100
    else if (new RegExp(`(^|\\s)${escapeRe(q)}`).test(title)) score += 60
    else if (title.includes(q)) score += 35
    if (item.kind !== 'study') score += 12
    score -= Math.min(20, title.length / 12)   // gently favour tighter titles
    scored.push({ item, score })
  }
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((s) => s.item)
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
