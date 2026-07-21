/*
 * Flat search index over every book: sections and individual studies.
 *
 * Built once at module load from the books registry — it is a few hundred
 * entries of already-in-memory strings, so there is nothing to fetch, persist
 * or invalidate. Adding a book to the registry indexes it automatically.
 */
import { books } from './books.js'

const L = (ar, en) => ({ ar, en })

const KIND_LABEL = {
  section: L('قسم', 'Section'),
  study: L('دراسة', 'Study'),
  assessment: L('تقييم', 'Assessment'),
  quiz: L('لعبة', 'Game'),
  'focus-lab': L('مختبر', 'Lab'),
}

/* Both languages joined into one haystack so a query matches either. */
const hay = (...vals) =>
  vals
    .filter(Boolean)
    .map((v) => (typeof v === 'string' ? v : `${v.ar ?? ''} ${v.en ?? ''}`))
    .join(' ')
    .toLowerCase()

function buildIndex() {
  const out = []
  books.forEach((book) => {
    book.sections.forEach((section) => {
      const kind = section.kind && KIND_LABEL[section.kind] ? section.kind : 'section'
      out.push({
        id: `${book.id}/${section.slug}`,
        kind,
        kindLabel: KIND_LABEL[kind],
        icon: section.icon || '📄',
        title: section.title,
        subtitle: section.lead || book.title,
        bookTitle: book.title,
        to: `/book/${book.id}/${section.slug}`,
        text: hay(section.title, section.lead, book.title),
      })

      // Index the studies themselves — they're the most-searched content and
      // they all live behind a single quiz route.
      ;(section.studies || []).forEach((study) => {
        out.push({
          id: `${book.id}/${section.slug}/${study.id}`,
          kind: 'study',
          kindLabel: KIND_LABEL.study,
          icon: '🔬',
          title: study.title,
          subtitle: study.researcher,
          bookTitle: book.title,
          // ?study= lets the quiz jump straight to this one instead of study 1.
          to: `/book/${book.id}/${section.slug}?study=${encodeURIComponent(study.id)}`,
          text: hay(study.title, study.researcher, study.chapter, study.method),
        })
      })
    })
  })
  return out
}

export const searchIndex = buildIndex()

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
