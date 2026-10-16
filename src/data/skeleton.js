/*
 * A book's SKELETON: everything the app needs about a book before anyone opens
 * it — the Home carousel, the sidebar and its progress ticks, the breadcrumb,
 * the hero, the About page's totals — and nothing it needs only after.
 *
 * Every book used to be bundled into the entry chunk, so the first page of the
 * site downloaded all three books' text (453.9 kB gzipped of JavaScript, for a
 * visitor who might read none of it). Now the app imports only the skeletons,
 * generated from this function into data/bookSkeletons.js, and fetches a book's
 * content when it is opened (data/books.js → loadBook).
 *
 * THE RULE THAT KEEPS IT HONEST: a skeleton must answer every question the
 * pages above ask of a book with the SAME answer the full book gives. Above all
 * `readingUnits` — the progress ring on the landing (full book) and the ticks
 * in the sidebar (skeleton) count the same keys, so a skeleton keeps every
 * section's heads (panel and part ids). bookStats() is precomputed here for the
 * same reason: the About page's totals must not need every book loaded.
 *
 * Used by scripts/gen-book-skeletons.mjs (Node) and, in development only, by
 * data/books.js to warn when the generated file has gone stale.
 */
import { readingUnits } from './bookHelpers.js'

const pick = (o, keys) => Object.fromEntries(keys.filter((k) => o[k] !== undefined).map((k) => [k, o[k]]))

// What a heading (a chapter panel or an activity part) keeps.
const HEAD = ['id', 'kind', 'icon', 'title', 'lead']

/* Counts the About page shows, per book. Walks the whole object rather than
   known paths, because where content sits has moved twice already (sections →
   panels, sections → parts) and a path-based count silently dropped to zero
   each time — the About page said «0 دراسة» for two months.
   Figures count DISTINCT ids: two are deliberately shown twice (`fig9` in two
   Why We Sleep chapters, `sfFlowChannel` in a chapter and the flow tab), and a
   figure met twice is still one figure — 46, not 48, which is also what
   scripts/check-links.mjs reports. */
export function bookStats(book) {
  let studies = 0, people = 0
  const figures = new Set()
  const walk = (v) => {
    if (!v || typeof v !== 'object') return
    if (Array.isArray(v)) { v.forEach(walk); return }
    if (v.type === 'figure') figures.add(v.id)
    if (v.type === 'people') people += v.people.length
    if (v.type === 'peoplegroups') people += v.groups.reduce((n, g) => n + g.people.length, 0)
    if (Array.isArray(v.studies)) studies += v.studies.length
    Object.values(v).forEach(walk)
  }
  walk(book.sections)
  return { units: readingUnits(book).length, studies, figures: figures.size, people }
}

export function toSkeleton(book) {
  return {
    ...pick(book, ['id', 'title', 'subtitle', 'author', 'authorPhoto', 'cover', 'blurb', 'accent', 'groups']),
    sections: book.sections.map((s) => {
      const tabs = (s.blocks || []).find((b) => b.type === 'tabs')
      return {
        ...pick(s, ['slug', 'kind', 'icon', 'title', 'lead', 'fam']),
        ...(tabs && { blocks: [{ type: 'tabs', panels: tabs.panels.map((p) => pick(p, HEAD)) }] }),
        ...(s.parts && { parts: s.parts.map((p) => pick(p, HEAD)) }),
      }
    }),
    stats: bookStats(book),
  }
}

/* Club-wide totals for the About page, from the skeletons' own stats. */
export function clubTotals(skeletons) {
  const sum = (k) => skeletons.reduce((n, b) => n + b.stats[k], 0)
  return { books: skeletons.length, units: sum('units'), studies: sum('studies'), figures: sum('figures') }
}
