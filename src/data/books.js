import { whyWeSleep } from './books/why-we-sleep/index.js'
import { stolenFocus } from './books/stolen-focus/index.js'

/*
 * Books registry. Each book lives in its own folder under data/books/<slug>/ —
 * add a new folder and append it here; it appears on Home and in the sidebar
 * automatically.
 */
export const books = [whyWeSleep, stolenFocus]

export function getBook(id) {
  return books.find((b) => b.id === id)
}

export function getSection(book, slug) {
  return book.sections.find((s) => s.slug === slug)
}

/* A `groups` entry is either a titled list — `{ title, slugs }` — or a SOLO
   section, `{ slug }`, which renders as a top-level entry with no header of its
   own. Solo entries exist because a group of one is a lie: «داخل حالة التدفّق»
   sat alone inside a titled group, so reaching it meant opening a drawer to find
   a single item, and «المؤلّف والمترجم» needed a home once «ابدأ هنا» was gone.
   Everything that walks `groups` — the sidebar, the landing, check-links — goes
   through this. It lives here, beside the data it describes, rather than in a
   component: the sidebar and the book page both need it, and importing it from
   the page would pull that page's whole module graph into the entry chunk. */
export const entrySlugs = (g) => g.slugs || [g.slug]

/* A UNIT OF READING, as `bookId/slug` or `bookId/slug?tab=panel`.
   Chapters became panels of one `review` section, so counting sections stopped
   describing the book: opening one cause of ten ticked the whole review, the
   progress ring jumped from 4% to 14% for the same reading, and the «تابع
   القراءة» CTA — whose only job is to point at the next unread thing — skipped
   nine chapters. Progress and the CTA count these instead. */
export function readingUnits(book) {
  return book.sections.flatMap((s) => {
    const tabs = (s.blocks || []).find((b) => b.type === 'tabs')
    return tabs
      ? tabs.panels.map((p) => `${s.slug}?tab=${p.id}`)
      : [s.slug]
  })
}
