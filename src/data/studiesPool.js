/*
 * Every study from every book, flattened into one pool with its book attached.
 *
 * Built once at module load from the registry — the studies are already in
 * memory, so this is just a reshape. Used by the "ask me one" session opener,
 * which draws at random across the whole club library rather than one book.
 */
import { books } from './books.js'

export const studiesPool = books.flatMap((book) => {
  const sec = book.sections.find((s) => s.kind === 'quiz')
  if (!sec || !sec.studies) return []
  return sec.studies.map((study) => ({
    ...study,
    // Namespaced: study ids are only unique within a book (s1…, sf1…).
    poolId: `${book.id}/${study.id}`,
    bookId: book.id,
    bookTitle: book.title,
    sectionSlug: sec.slug,
  }))
})
