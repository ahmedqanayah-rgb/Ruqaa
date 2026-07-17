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
