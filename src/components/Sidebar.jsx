import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'

export default function Sidebar({ open, collapsed, onClose, onToggleCollapse }) {
  const { t } = useApp()
  const loc = useLocation()
  const book = books[0]
  const insideBook = loc.pathname.startsWith('/book/')

  const topLinks = [
    { to: '/', label: ui.nav.home, icon: '🏠', end: true },
    { to: '/books', label: ui.nav.books, icon: '📚' },
    { to: '/about', label: ui.nav.about, icon: 'ℹ️' },
  ]

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-inner">
          <button className="collapse-btn only-desktop" onClick={onToggleCollapse}
            aria-label="collapse">
            <span aria-hidden>{collapsed ? '»' : '«'}</span>
          </button>

          <nav className="side-nav">
            <span className="side-heading">{t(ui.labels.browse)}</span>
            {topLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={onClose}
                className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}>
                <span className="side-icon" aria-hidden>{l.icon}</span>
                <span className="side-text">{t(l.label)}</span>
              </NavLink>
            ))}

            <span className="side-heading">{t(ui.labels.currentBook)}</span>
            <NavLink to={`/book/${book.id}`} onClick={onClose}
              className={({ isActive }) => `side-link book-entry ${insideBook && loc.pathname === `/book/${book.id}` ? 'active' : ''}`}>
              <span className="side-icon" aria-hidden>📖</span>
              <span className="side-text">{t(book.title)}</span>
            </NavLink>

            {insideBook && (
              <div className="side-sections">
                <span className="side-heading">{t(ui.labels.sections)}</span>
                {book.sections.map((s, i) => (
                  <NavLink key={s.slug} to={`/book/${book.id}/${s.slug}`} onClick={onClose}
                    className={({ isActive }) => `side-link sub ${isActive ? 'active' : ''}`}>
                    <span className="side-num" aria-hidden>{i + 1}</span>
                    <span className="side-icon" aria-hidden>{s.icon}</span>
                    <span className="side-text">{t(s.title)}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </nav>
        </div>
      </aside>
    </>
  )
}
