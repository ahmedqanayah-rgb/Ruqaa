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
