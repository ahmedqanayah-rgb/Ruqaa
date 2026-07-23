import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import SearchPalette from './SearchPalette.jsx'

export default function Layout({ children }) {
  const { t, presenting, setPresenting, togglePresenting } = useApp()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const loc = useLocation()
  const mainRef = useRef(null)

  // Close mobile drawer + scroll to top on navigation.
  useEffect(() => {
    setDrawerOpen(false)
    window.scrollTo({ top: 0 })
    // Move focus into the content region. Without this the keyboard stays on
    // the link that was just clicked — in the sidebar, several pages back in
    // tab order — and a screen reader never announces the new page.
    mainRef.current?.focus()
  }, [loc.pathname])

  /* Global shortcuts. "/" and "p" are bare keys, so they must never fire while
     the reader is typing — and "p" must not steal Ctrl/⌘-P (print). */
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable
      const plain = !e.metaKey && !e.ctrlKey && !e.altKey

      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((s) => !s)
        return
      }
      if (typing) return
      if (e.key === '/' && plain) {
        e.preventDefault()
        setSearchOpen(true)
        return
      }
      if (e.key.toLowerCase() === 'p' && plain) {
        e.preventDefault()
        togglePresenting()
        return
      }
      // Esc closes the palette first; it shouldn't also drop the projector.
      if (e.key === 'Escape' && !searchOpen) setPresenting(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [togglePresenting, setPresenting, searchOpen])

  return (
    <div className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
      {/* First focusable thing on the page: the sidebar's whole section tree
          sits between the navbar and the article in tab order. */}
      <a className="skip-link" href="#main">
        {t(ui.actions.skipToContent)}
      </a>
      <Navbar onMenu={() => setDrawerOpen(true)} onSearch={() => setSearchOpen(true)} />
      <div className="app-body">
        <Sidebar
          open={drawerOpen}
          collapsed={collapsed}
          onClose={() => setDrawerOpen(false)}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
        <main className="app-main" id="main" ref={mainRef} tabIndex={-1}>
          <div className="page fade-in" key={loc.pathname}>{children}</div>
          <footer className="site-footer">
            <p>{t(ui.footer.built)}</p>
            <p className="muted">{t(ui.footer.note)}</p>
          </footer>
        </main>
      </div>
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      {presenting && (
        <button className="present-exit" onClick={() => setPresenting(false)}>
          ✕ {t(ui.actions.exitPresent)} <kbd>esc</kbd>
        </button>
      )}
    </div>
  )
}
