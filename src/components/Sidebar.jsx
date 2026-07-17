import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'

export default function Sidebar({ open, collapsed, onClose, onToggleCollapse }) {
  const { t, visited } = useApp()
  const loc = useLocation()
  // Active book/section derived from the URL (/book/:bookId/:slug?), so the
  // sidebar works for any number of books — only the active one expands.
  const match = loc.pathname.match(/^\/book\/([^/]+)(?:\/([^/]+))?/)
  const activeBookId = match ? match[1] : null
  const activeSlug = match ? match[2] : null

  // Which books and groups are unfolded. Nothing is forced open: navigation
  // unfolds the book/group you land in, but any of them — including the active
  // one — can be collapsed again.
  const [openBooks, setOpenBooks] = useState(() => new Set(activeBookId ? [activeBookId] : []))
  const [openGroups, setOpenGroups] = useState(() => new Set())
  useEffect(() => {
    if (!activeBookId) return
    setOpenBooks((prev) => {
      if (prev.has(activeBookId)) return prev
      const next = new Set(prev); next.add(activeBookId); return next
    })
    if (!activeSlug) return
    const book = books.find((b) => b.id === activeBookId)
    if (!book?.groups) return
    const gi = book.groups.findIndex((g) => g.slugs.includes(activeSlug))
    if (gi < 0) return
    setOpenGroups((prev) => {
      const key = `${activeBookId}:${gi}`
      if (prev.has(key)) return prev
      const next = new Set(prev); next.add(key); return next
    })
  }, [activeBookId, activeSlug])

  const toggleIn = (setter) => (key) => setter((prev) => {
    const next = new Set(prev)
    if (next.has(key)) next.delete(key); else next.add(key)
    return next
  })
  const toggleBook = toggleIn(setOpenBooks)
  const toggleGroup = toggleIn(setOpenGroups)

  const topLinks = [
    { to: '/', label: ui.nav.home, icon: '🏠', end: true },
    { to: '/books', label: ui.nav.books, icon: '📚' },
    { to: '/about', label: ui.nav.about, icon: 'ℹ️' },
  ]

  const sectionLink = (book, s) => {
    const seen = visited.has(`${book.id}/${s.slug}`)
    return (
      <NavLink key={s.slug} to={`/book/${book.id}/${s.slug}`} onClick={onClose}
        className={({ isActive }) => `side-link sub ${isActive ? 'active' : ''}`}>
        <span className="side-icon" aria-hidden>{s.icon}</span>
        <span className="side-text">{t(s.title)}</span>
        {seen && <span className="side-seen" aria-label={t({ ar: 'مقروء', en: 'read' })}>✓</span>}
      </NavLink>
    )
  }

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-inner">
          <button className="collapse-btn only-desktop" onClick={onToggleCollapse}
            aria-label="collapse">
            <span aria-hidden>{collapsed ? '»' : '«'}</span>
          </button>
          <button className="drawer-close only-mobile" onClick={onClose} aria-label={t(ui.actions.closeMenu)}>
            <span aria-hidden>✕</span>
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

            <span className="side-heading">{t(ui.labels.booksList)}</span>
            {books.map((book) => {
              const isActiveBook = book.id === activeBookId
              const isOpenBook = openBooks.has(book.id)
              const bySlug = new Map(book.sections.map((s) => [s.slug, s]))
              return (
                <div key={book.id}>
                  <div className="side-book-row">
                    <NavLink to={`/book/${book.id}`} onClick={onClose}
                      className={`side-link book-entry ${isActiveBook && !activeSlug ? 'active' : ''}`}>
                      <span className="side-icon" aria-hidden>📖</span>
                      <span className="side-text">{t(book.title)}</span>
                    </NavLink>
                    <button className="side-book-toggle" onClick={() => toggleBook(book.id)}
                      aria-expanded={isOpenBook}
                      aria-label={t(isOpenBook ? { ar: 'طيّ أقسام الكتاب', en: 'Collapse book sections' }
                                              : { ar: 'عرض أقسام الكتاب', en: 'Expand book sections' })}>
                      <span className={`side-chev ${isOpenBook ? 'open' : ''}`} aria-hidden>›</span>
                    </button>
                  </div>

                  {isOpenBook && book.groups && (
                    <div className="side-sections">
                      {book.groups.map((g, gi) => {
                        const key = `${book.id}:${gi}`
                        const isOpen = openGroups.has(key)
                        const sections = g.slugs.map((sl) => bySlug.get(sl)).filter(Boolean)
                        const seenCount = sections.filter((s) => visited.has(`${book.id}/${s.slug}`)).length
                        const holdsActive = activeSlug && g.slugs.includes(activeSlug)
                        return (
                          <div key={key} className="side-group">
                            <button className={`side-group-head ${holdsActive ? 'holds-active' : ''}`}
                              onClick={() => toggleGroup(key)} aria-expanded={isOpen}>
                              <span className={`side-chev ${isOpen ? 'open' : ''}`} aria-hidden>›</span>
                              <span className="side-text">{t(g.title)}</span>
                              <span className="side-group-count">
                                {seenCount > 0
                                  ? t({ ar: `${seenCount}/${sections.length}`, en: `${seenCount}/${sections.length}` })
                                  : t({ ar: String(sections.length), en: String(sections.length) })}
                              </span>
                            </button>
                            {isOpen && <div className="side-group-items">{sections.map((s) => sectionLink(book, s))}</div>}
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {isOpenBook && !book.groups && (
                    <div className="side-sections">
                      {book.sections.map((s) => sectionLink(book, s))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
