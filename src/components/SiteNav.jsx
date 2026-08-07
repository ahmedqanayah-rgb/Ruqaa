import { NavLink, Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'

const L = (ar, en) => ({ ar, en })

/*
 * The site map, on every page, with the reader's own position marked.
 *
 * Two jobs in one strip, which is why it is one component and not two:
 *
 *  - **Where can I go.** Every top-level destination is a chip: home, each
 *    book, all books, the club. Nothing is behind a menu, so a visitor never
 *    has to open the drawer to discover that the site has a second book.
 *  - **Where am I.** The chip for the current place is marked (`aria-current`
 *    plus a filled style), and inside a book a second line spells the position
 *    out in full — book › section.
 *
 * That second line **replaces** the old `.section-breadcrumb` rather than
 * joining it. Two trails saying the same thing a few pixels apart would be
 * worse than either alone, so the breadcrumb was deleted from `BookSection`
 * when this arrived.
 *
 * Deliberately not sticky. It sits under the navbar and scrolls away with the
 * page: pinning a second bar to the top would cost a phone ~50px of reading
 * height on every screen, and the navbar and the in-book bar already hold the
 * two edges.
 */
export default function SiteNav() {
  const { t } = useApp()
  const loc = useLocation()

  const match = loc.pathname.match(/^\/book\/([^/]+)(?:\/([^/]+))?/)
  const activeBook = match ? books.find((b) => b.id === match[1]) : null
  const activeSection = activeBook && match[2]
    ? activeBook.sections.find((s) => s.slug === match[2])
    : null

  const chip = ({ isActive }) => `sitenav-chip ${isActive ? 'active' : ''}`

  return (
    <nav className="sitenav" aria-label={t(L('خريطة الموقع', 'Site map'))}>
      <div className="sitenav-row">
        <NavLink to="/" end className={chip}>
          <span aria-hidden>🏠</span> {t(ui.nav.home)}
        </NavLink>
        {books.map((b) => (
          <NavLink key={b.id} to={`/book/${b.id}`} className={chip}>
            <span aria-hidden>📖</span> {t(b.title)}
          </NavLink>
        ))}
        <NavLink to="/books" end className={chip}>
          <span aria-hidden>📚</span> {t(ui.labels.allBooks)}
        </NavLink>
        <NavLink to="/about" className={chip}>
          <span aria-hidden>ℹ️</span> {t(ui.nav.about)}
        </NavLink>
      </div>

      {/* Only inside a book, and only when it adds something the chips above
          don't already show. On a book landing the chip is already marked, so
          the trail would just repeat the title. */}
      {activeSection && (
        <p className="sitenav-trail">
          <Link to={`/book/${activeBook.id}`}>{t(activeBook.title)}</Link>
          <span aria-hidden>›</span>
          <span className="sitenav-here" aria-current="page">
            <span aria-hidden>{activeSection.icon}</span> {t(activeSection.title)}
          </span>
        </p>
      )}
    </nav>
  )
}
