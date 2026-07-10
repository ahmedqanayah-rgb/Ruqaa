import { whyWeSleep } from './books/why-we-sleep/index.js'

/*
 * Books registry. The site is architected to hold many books; today there is
 * one. Each book lives in its own folder under data/books/<slug>/ — add a new
 * folder and append it here.
 */
export const books = [whyWeSleep]

export function getBook(id) {
  return books.find((b) => b.id === id)
}

export function getSection(book, slug) {
  return book.sections.find((s) => s.slug === slug)
}
