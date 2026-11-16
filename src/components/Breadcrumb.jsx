import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'

const L = (ar, en) => ({ ar, en })

/*
 * The path — «أين نحن الآن» — one line above a section's title.
 *
 * IT SHOWS ONLY INSIDE A BOOK'S SECTION, where there is a level to go back up
 * to: `الكتب › the book › this section`. Everywhere else it would repeat what
 * the page already says twice — the lit destination in the top bar or the dock,
 * and the <h1> — which is the same duplication that got an earlier trail removed
 * (it cost 52px of every page to restate the heading under it).
 *
 * It had come back for a real reason: the site-map chips were hidden on phones,
 * so a phone had no "you are here" at all. The dock is that mark now, on every
 * page, which leaves this line the one job the dock cannot do — naming the book
 * a section belongs to, and linking back to it.
 *
 * IT IS NOT STICKY, ON PURPOSE. Pinning a second row costs a phone a line of
 * every screen of reading, and a section page already carries the floating bar
 * at the bottom. Scrolling away, this costs one line per page instead.
 *
 * It renders inside the page's own measure (Layout puts it at the top of
 * `.page`), so it lines up with the article whether the sidebar is a rail or
 * open.
 */
export default function Breadcrumb() {
  const { t } = useApp()
  const { pathname } = useLocation()

  const parts = pathname.split('/').filter(Boolean)
  if (parts[0] !== 'book' || !parts[1] || !parts[2]) return null

  const book = books.find((b) => b.id === parts[1])
  // An unknown slug shows a "not found" page, so a crumb for it would name a
  // page the reader never reached.
  const section = book?.sections.find((s) => s.slug === parts[2])
  if (!section) return null

  return (
    <nav className="crumbs" aria-label={t(L('مسار التنقّل', 'Breadcrumb'))}>
      <ol className="crumbs-row">
        <li><Link to="/books">{t(ui.nav.books)}</Link></li>
        <li>
          {/* The chevron is a glyph, so it is mirrored in RTL (see .crumb-sep)
              or it would point back the way you came. */}
          <span className="crumb-sep" aria-hidden>›</span>
          <Link to={`/book/${book.id}`}>{t(book.title)}</Link>
        </li>
        <li>
          <span className="crumb-sep" aria-hidden>›</span>
          <span className="crumb-current" aria-current="page">{t(section.title)}</span>
        </li>
      </ol>
    </nav>
  )
}
