/*
 * Pure helpers over a book object — FULL or SKELETON, they work on either.
 *
 * They live apart from data/books.js since books stopped being loaded all at
 * once: the app holds a light skeleton of every book (data/bookSkeletons.js)
 * and fetches a book's content only when it is opened, while the Node scripts
 * and the skeleton generator work on the full data (data/allBooks.js). All of
 * them need these, and none may import the others' registries to get them.
 *
 * A skeleton keeps exactly what these read: `groups`, every section's `slug`,
 * and every heading's `id` (panels of a `tabs` block, or `parts`) — so a
 * progress ring computed from the skeleton and one computed from the full book
 * are the same number. data/skeleton.js is where that is guaranteed.
 */

/* A `groups` entry is either a titled list — `{ title, slugs }` — or a SOLO
   section, `{ slug }`, which renders as a top-level entry with no header of its
   own. Solo entries exist because a group of one is a lie: «داخل حالة التدفّق»
   sat alone inside a titled group, so reaching it meant opening a drawer to find
   a single item, and «المؤلّف والمترجم» needed a home once «ابدأ هنا» was gone.
   Everything that walks `groups` — the sidebar, the landing, check-links — goes
   through this. */
export const entrySlugs = (g) => g.slugs || [g.slug]

/* THE OPENABLE HEADINGS OF A SECTION, whichever shape holds them.
   A section keeps them in one of two places and both render identically through
   components/Collapsible.jsx: the book's chapters are panels of a `tabs` BLOCK,
   the activities are a `parts` FIELD. Everything that needs to enumerate them —
   reading units, the search index, check-links — goes through here.

   It exists because that walk was written three times and had already diverged:
   `readingUnits` knew only about `tabs`, so it emitted `activities` while
   Collapsible marked `activities?open=<part>`. Every activity's visited key was
   a dead write, and the tab counted as a unit nothing could ever tick. */
export function openable(section) {
  const tabs = (section.blocks || []).find((b) => b.type === 'tabs')
  return tabs?.panels || section.parts || []
}

/* THE UNITS OF READING A SECTION CONTAINS, fully qualified as `bookId/…`.
   A section with headings is its headings; a plain one is itself. This is the
   ONE definition of "read" — the card's ✓, the sidebar's ✓, the progress ring
   and the «تابع القراءة» CTA all count these keys.

   They used to disagree. Arriving at a section marked the bare slug, which the
   ticks read; the ring counted heading keys, which arrival never wrote. So the
   card showed ✓ «مراجعة الكتاب» while the hero said «قرأت 0 من 7» — on the same
   screen, about the same section. Two meanings of "read" over one Set. */
export function sectionUnits(book, section) {
  const heads = openable(section)
  return heads.length
    ? heads.map((h) => `${book.id}/${section.slug}?open=${h.id}`)
    : [`${book.id}/${section.slug}`]
}

/* How much of a section the reader has opened: `{ seen, total, done }`. */
export function sectionProgress(book, section, visited) {
  const units = sectionUnits(book, section)
  const seen = units.filter((u) => visited.has(u)).length
  return { seen, total: units.length, done: seen === units.length }
}

export function readingUnits(book) {
  return book.sections.flatMap((s) => sectionUnits(book, s))
}

/* Find an activity by its kind, wherever it lives. FULL books only — a
   skeleton's parts carry no data.
   The quiz, the game, the lab and the assessment stopped being sections when
   they moved into the one «أنشطة إضافية» tab — they are `parts` of it now. The
   landing's stat chips, the fact rotator and anything else that used to do
   `sections.find(s => s.kind === 'quiz')` goes through this instead, and gets
   back both the part (for its data) and the section (for its URL). */
export function findByKind(book, kind) {
  for (const section of book.sections) {
    if (section.kind === kind) return { section, part: section }
    for (const part of section.parts || []) {
      if (part.kind === kind) return { section, part }
    }
  }
  return null
}
