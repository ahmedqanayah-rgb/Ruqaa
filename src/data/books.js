import { useEffect, useState } from 'react'
import { bookSkeletons, clubTotals } from './bookSkeletons.js'

/*
 * THE APP'S BOOKS REGISTRY — skeletons now, content on demand.
 *
 * `books` is every book's SKELETON (generated into data/bookSkeletons.js from
 * the full data; see data/skeleton.js for exactly what it keeps): titles,
 * covers, sections, chapter and activity headings, and counts. That is all the
 * Home carousel, the sidebar, the breadcrumb, the hero and the About page ever
 * needed, and it is ~9 kB gzipped for all three books.
 *
 * A book's CONTENT — every paragraph, figure, study and quiz — loads when the
 * book is opened: `loadBook(id)` / `useBook(id)`, one chunk per book. Until
 * 2026-10 every book was bundled into the entry chunk, so the first page of the
 * site downloaded all of them: 453.9 kB gzipped of JavaScript for a visitor who
 * might read none of it, and +140 kB with every new book. The club's members
 * join from places with very uneven connections.
 *
 * To add a book: create its folder under data/books/<slug>/ and add it to
 * data/allBooks.js. The skeleton regenerates on `npm run dev` / `npm run build`,
 * and the loader below finds the folder by glob — nothing else to register.
 */

export const books = bookSkeletons
export { clubTotals }

export {
  entrySlugs, openable, sectionUnits, sectionProgress, readingUnits, findByKind,
} from './bookHelpers.js'

/* The SKELETON for an id, synchronously — enough to know the book exists and to
   name it. For anything inside a section, use the full book from useBook(). */
export function getBook(id) {
  return books.find((b) => b.id === id)
}

/* ---------------- content on demand ---------------- */

// One lazy chunk per book. The glob is resolved by Vite at build time, so a
// new folder needs no entry here; the key is the folder, which is the book id.
const loaders = import.meta.glob('./books/*/index.js')
const loaded = new Map()   // id → full book
const pending = new Map()  // id → Promise<full book>

/* The full book if it has already arrived, else undefined. Synchronous, so a
   page revisited in the same sitting renders at once — no flash of a loading
   state, and scroll restoration finds the content where it left it. */
export function peekBook(id) {
  return loaded.get(id)
}

export function loadBook(id) {
  if (loaded.has(id)) return Promise.resolve(loaded.get(id))
  if (pending.has(id)) return pending.get(id)
  const load = loaders[`./books/${id}/index.js`]
  if (!load) return Promise.resolve(undefined)
  const p = load()
    .then((m) => {
      // Each book module exports its book as a named const; find it by id
      // rather than by export name, so a new book needs no change here.
      const book = Object.values(m).find((v) => v && typeof v === 'object' && v.id === id)
      loaded.set(id, book)
      pending.delete(id)
      if (import.meta.env.DEV) warnIfStale(book)
      return book
    })
    .catch((err) => {
      // Not cached here — but the BROWSER caches it: a failed import() of the
      // same URL fails again without refetching for the life of the page
      // (measured, Chrome 152). Recovery is a reload; see LoadBoundary.jsx.
      pending.delete(id)
      throw err
    })
  pending.set(id, p)
  return p
}

/* The full book for a page: `{ book, failed }`. `book` is undefined while the
   chunk is on its way; `failed` is set if it could not be fetched. */
export function useBook(id) {
  const [, rerender] = useState(0)
  const [failed, setFailed] = useState(false)
  const book = id ? loaded.get(id) : undefined

  useEffect(() => {
    if (!id || loaded.has(id)) return
    let live = true
    setFailed(false)
    loadBook(id).then(
      () => { if (live) rerender((n) => n + 1) },
      () => { if (live) setFailed(true) },
    )
    return () => { live = false }
  }, [id])

  return { book, failed: failed && !book }
}

/* Start fetching a book before it is needed — on the first sign of intent
   (a pointer over, or a finger on, a link to it). Safe to call any number of
   times; errors are left for useBook to surface when the page actually asks. */
export function prefetchBook(id) {
  if (id && loaders[`./books/${id}/index.js`]) loadBook(id).catch(() => {})
}

/* DEVELOPMENT ONLY: the skeletons are generated, so an edit to a book that
   changes what the skeleton holds (a heading added, a section retitled) leaves
   them stale until the generator runs again — which `npm run dev` does on start.
   Say so loudly instead of letting the sidebar and the page disagree. */
async function warnIfStale(book) {
  const { toSkeleton } = await import('./skeleton.js')
  const shipped = getBook(book.id)
  if (JSON.stringify(toSkeleton(book)) !== JSON.stringify(shipped)) {
    console.error(`[books] data/bookSkeletons.js is stale for “${book.id}”. Run: node scripts/gen-book-skeletons.mjs`)
  }
}
