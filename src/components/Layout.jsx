import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import SiteNav from './SiteNav.jsx'
import SearchPalette from './SearchPalette.jsx'

/*
 * The app scrolls on <body> — `global.css` puts `overflow-y` there, so <html>
 * has viewport height and never moves. That matters more than it sounds: it
 * means `window.scrollTo()` (which drives `document.scrollingElement`, i.e.
 * <html>) is a **no-op** on this site. Measured: body.scrollHeight 5792 vs
 * clientHeight 812, while html is 812/812 and its scrollTop stays 0 however you
 * set it. The fallback is kept in case the layout ever moves the overflow back.
 */
function scroller() {
  return document.body.scrollHeight > document.body.clientHeight
    ? document.body
    : document.documentElement
}

export default function Layout({ children }) {
  const { t, presenting, setPresenting, togglePresenting } = useApp()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const loc = useLocation()
  const navType = useNavigationType()
  const mainRef = useRef(null)
  const positions = useRef(new Map())
  const pathRef = useRef(loc.pathname)

  /* ---- scroll restoration ----------------------------------------------
     Returning from a section to the book's list used to dump the reader at the
     top of a six-screen page, so picking the next section meant scrolling back
     down to where they already were. Positions are remembered per path, in
     memory only — no storage, per the project's hard rule — so they last for
     the sitting and reset on refresh, exactly like `visited`.

     The position is captured two ways, and both are needed:

     - **A capture-phase click on `document`**, which snapshots the position at
       the instant a navigation begins. Capture runs before React's own handler
       at the root, so the value is read while the outgoing page is still on
       screen. This is what actually makes back-to-the-list work.
     - **Scroll listeners on body and window**, which keep the value fresh for
       navigations that begin without a click (the back gesture, arrow keys).
       Listening on `document` — even in the capture phase — does *not* work:
       measured, it receives nothing while `document.body.scrollTop` changes.
       Body plus window is the pair `ReadingProgress` already relies on.

     NB: the in-app preview dispatches **no scroll events at all**, on any
     target — the same stalled-frame cause as rAF never firing. The click
     snapshot is therefore the only half of this that can be verified there;
     don't conclude from a silent scroll listener that it is broken. */
  useEffect(() => {
    // Stop the browser also trying to restore; we place the scroll ourselves.
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    const remember = () => { positions.current.set(pathRef.current, scroller().scrollTop) }
    document.body.addEventListener('scroll', remember, { passive: true })
    window.addEventListener('scroll', remember, { passive: true })
    document.addEventListener('click', remember, { capture: true })
    return () => {
      document.body.removeEventListener('scroll', remember)
      window.removeEventListener('scroll', remember)
      document.removeEventListener('click', remember, { capture: true })
    }
  }, [])

  /* Placed before paint so the reader never sees the top of the page flash by
     on the way to where they were. */
  useLayoutEffect(() => {
    setDrawerOpen(false)

    const from = pathRef.current
    pathRef.current = loc.pathname
    /* Back/forward restores, and so does going *up* from a section to its own
       book landing — tapping «الأقسام» or the breadcrumb is a PUSH, but the
       reader means the same thing by it as pressing Back. Everything else is a
       fresh arrival and starts at the top: Home → a book must not land you
       halfway down a list you have never seen. */
    const up = from !== loc.pathname && from.startsWith(`${loc.pathname}/`)
    const saved = positions.current.get(loc.pathname)
    scroller().scrollTop = (navType === 'POP' || up) && saved != null ? saved : 0

    /* Move focus into the content region. Without this the keyboard stays on
       the link that was just clicked — in the sidebar, several pages back in
       tab order — and a screen reader never announces the new page.
       `preventScroll` matters twice over: focusing a `tabIndex={-1}` element
       scrolls it into view, which would undo the restoration — and, since
       `window.scrollTo` never did anything here, that side effect was in fact
       the only thing resetting the scroll before this. */
    mainRef.current?.focus({ preventScroll: true })
  }, [loc.pathname, navType])

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
      {/* The navbar and the site map are one header block, not two bars. They
          can't share a *line*: measured at 375px the navbar is already 8px
          over-full (346 used against 338 available) and the chips need 562px.
          So they stack, but share a surface and a single bottom border, and
          only the top row is sticky — the chips scroll away rather than pin a
          second bar over every screen of reading. */}
      <Navbar onMenu={() => setDrawerOpen(true)} onSearch={() => setSearchOpen(true)} />
      <SiteNav />
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
