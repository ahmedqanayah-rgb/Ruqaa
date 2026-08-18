import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'

const L = (ar, en) => ({ ar, en })

/*
 * The path — «أين نحن الآن» — one line under the header.
 *
 * A breadcrumb was tried here before and deliberately removed: with the site-map
 * chips visible it was pure duplication (its book half was the highlighted chip
 * directly above, its section half the <h1> directly below) and it cost 52px of
 * every section page. That reasoning was right at the time. Two things have
 * changed since:
 *
 *   1. The chips now hide below 1024px, because the site map was merged into the
 *      navbar and a phone cannot fit both. So on a phone there was no longer
 *      ANY indicator of where you are.
 *   2. The sidebar — which carried the book's section tree — now starts
 *      collapsed.
 *
 * So the duplication argument no longer holds where it matters, and the level
 * this adds (the section) was never in the chips anyway.
 *
 * IT IS NOT STICKY, ON PURPOSE. The club asked for a fixed line. Everything else
 * on this site refuses to pin a second row for the same measured reason: the
 * site map was left unpinned because doing so would cost a phone 67px of every
 * screen of reading, and on section pages a phone already carries a fixed bar at
 * the BOTTOM. A fixed crumb would sandwich the article between three bars to
 * answer a question the reader asks on arrival, not continuously. Scrolling
 * away, it costs one line per page instead of one line per screen. Making it
 * fixed is `position: sticky; top: 62px` on `.crumbs` if the club prefers it.
 *
 * Home renders nothing: a path with one entry is not a path.
 */
export default function Breadcrumb() {
  const { t } = useApp()
  const { pathname } = useLocation()

  const parts = pathname.split('/').filter(Boolean)
  const trail = []

  if (parts[0] === 'books') {
    trail.push({ label: ui.labels.allBooks })
  } else if (parts[0] === 'about') {
    trail.push({ label: ui.nav.about })
  } else if (parts[0] === 'book' && parts[1]) {
    const book = books.find((b) => b.id === parts[1])
    if (!book) return null
    // The book is a link only when it isn't where we already are.
    trail.push({ label: book.title, to: parts[2] ? `/book/${book.id}` : undefined })
    if (parts[2]) {
      const section = book.sections.find((s) => s.slug === parts[2])
      // An unknown slug falls back to the book landing at the router level, so
      // showing a crumb for it would name a page the reader never reaches.
      if (section) trail.push({ label: section.title })
    }
  }

  if (!trail.length) return null

  return (
    <nav className="crumbs" aria-label={t(L('مسار التنقّل', 'Breadcrumb'))}>
      <ol className="crumbs-row">
        <li>
          <Link to="/">{t(ui.nav.home)}</Link>
        </li>
        {trail.map((c, i) => (
          <li key={i}>
            {/* The chevron is a glyph, so it must be mirrored in RTL or it
                points back the way you came. */}
            <span className="crumb-sep" aria-hidden>›</span>
            {c.to
              ? <Link to={c.to}>{t(c.label)}</Link>
              : <span className="crumb-current" aria-current="page">{t(c.label)}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
