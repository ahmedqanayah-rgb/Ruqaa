/*
 * Builds the flat search index over every book: sections, chapter headings,
 * activities, individual studies, and members' reviews.
 *
 * RUNS IN NODE, NOT IN THE BROWSER. scripts/gen-book-skeletons.mjs calls this
 * over the full books (data/allBooks.js) and writes the result to
 * data/searchData.js, which the search palette loads the first time it opens.
 * Building it in the browser would mean downloading every book to search any
 * of them — the index alone is a fraction of that.
 */
import { openable } from './bookHelpers.js'

const L = (ar, en) => ({ ar, en })

const KIND_LABEL = {
  section: L('قسم', 'Section'),
  study: L('دراسة', 'Study'),
  assessment: L('تقييم', 'Assessment'),
  quiz: L('لعبة', 'Game'),
  'focus-lab': L('مختبر', 'Lab'),
  review: L('مراجعة عضو', 'Member review'),
}

/* Both languages joined into one haystack so a query matches either. */
const hay = (...vals) =>
  vals
    .filter(Boolean)
    .map((v) => (typeof v === 'string' ? v : `${v.ar ?? ''} ${v.en ?? ''}`))
    .join(' ')
    .toLowerCase()

export function buildIndex(books) {
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

      /* Chapters and activities are HEADINGS, not routes — but they are still
         what a reader searches for by name. One entry each, against its own
         `?open=` address, or collapsing them into two sections would have cost
         the search most of its entries. `openable()` knows both shapes so this
         does not have to. */
      openable(section).forEach((head) => {
        if (!head.id) return
        out.push({
          id: `${book.id}/${section.slug}/${head.id}`,
          kind: head.kind && KIND_LABEL[head.kind] ? head.kind : 'section',
          kindLabel: KIND_LABEL[head.kind] || KIND_LABEL.section,
          icon: head.icon || section.icon || '📄',
          title: head.title,
          subtitle: head.lead || section.title,
          bookTitle: book.title,
          to: `/book/${book.id}/${section.slug}?open=${encodeURIComponent(head.id)}`,
          text: hay(head.title, head.lead, section.title, book.title),
        })
      })

      /* Index the studies themselves — the most-searched content, and they all
         live behind one route. They sit inside an activity part now, so the
         link has to open that heading AND jump the quiz: `?open=<part>&study=`.
         The part id comes from the part that owns the studies, never spelled
         out — a hardcoded `?open=studies&` dies silently if the part is
         renamed, and check-links cannot see a string built in this module. */
      const quizPart = (section.parts || []).find((pt) => pt.studies)
      ;[section, ...(section.parts || [])].flatMap((o) => o.studies || []).forEach((study) => {
        out.push({
          id: `${book.id}/${section.slug}/${study.id}`,
          kind: 'study',
          kindLabel: KIND_LABEL.study,
          icon: '🔬',
          title: study.title,
          subtitle: study.researcher,
          bookTitle: book.title,
          // ?study= lets the quiz jump straight to this one instead of study 1.
          to: `/book/${book.id}/${section.slug}?${quizPart ? `open=${encodeURIComponent(quizPart.id)}&` : ''}study=${encodeURIComponent(study.id)}`,
          text: hay(study.title, study.researcher, study.chapter, study.method),
        })
      })
    })

    /* Members' reviews live on the book's landing page, each a heading of its
       own, so a hit opens that one: `/book/<id>?open=<review id>`. */
    ;(book.reviews || []).forEach((r) => {
      out.push({
        id: `${book.id}/review/${r.id}`,
        kind: 'review',
        kindLabel: KIND_LABEL.review,
        icon: '✍️',
        title: r.title,
        subtitle: r.byline,
        bookTitle: book.title,
        to: `/book/${book.id}?open=${encodeURIComponent(r.id)}`,
        text: hay(r.title, r.byline, book.title),
      })
    })
  })
  return out
}
