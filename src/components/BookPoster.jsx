import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { club } from '../data/club.js'
import { toneStyle } from '../lib/tone.js'

const L = (ar, en) => ({ ar, en })

/* Which of the club's seasons a book was, and whether that season is now —
   from club.seasons, the same source the About timeline and the hero read, so
   the three cannot disagree. */
function seasonOf(bookId) {
  const i = club.seasons.findIndex((s) => s.bookId === bookId)
  return i < 0 ? null : { n: i + 1, status: club.seasons[i].status }
}

/*
 * A BOOK AS A POSTER — the one card every shelf on the site is made of (Home's
 * row, the Books page's grid).
 *
 * The cover stands on a stage painted in the book's own tone (lib/tone.js), so
 * three books are three colours before a title has been read. That is the job
 * the old card could not do: a 128px thumbnail beside a paragraph, on the same
 * beige as every other card, made the books look like one book three times.
 *
 * The stage colours are the cover's, not the theme's — they are the same in
 * light and dark, the way a real cover is.
 *
 * `blurb={false}` drops the paragraph where the poster is one of several in a
 * narrow row and a second line of text per card would only make the row taller.
 */
export default function BookPoster({ book, blurb = true }) {
  const { t } = useApp()
  const season = seasonOf(book.id)
  const current = season?.status === 'current'
  return (
    <Link to={`/book/${book.id}`} className={`poster ${current ? 'is-current' : ''}`} style={toneStyle(book)}>
      <span className="poster-stage">
        {/* Decorative: the title is the text right below it. */}
        <img className="poster-cover" src={t(book.cover)} alt="" loading="lazy" width="200" height="300"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
        {season && (
          <span className="poster-season">
            {current && <i className="poster-live" aria-hidden />}
            {t(current
              ? L('نقرؤه الآن', 'Reading now')
              : L(`الموسم ${season.n}`, `Season ${season.n}`))}
          </span>
        )}
      </span>
      <span className="poster-body">
        <strong className="poster-title">{t(book.title)}</strong>
        <span className="poster-author">{t(book.author)}</span>
        {blurb && <span className="poster-blurb">{t(book.blurb)}</span>}
        <span className="poster-open">{t(ui.actions.openBook)} <span className="arrow" aria-hidden>→</span></span>
      </span>
    </Link>
  )
}
