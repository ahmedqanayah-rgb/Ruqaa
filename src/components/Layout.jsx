import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import Navbar from './Navbar.jsx'
import Dock from './Dock.jsx'
import Sidebar from './Sidebar.jsx'
import Breadcrumb from './Breadcrumb.jsx'
import SearchPalette from './SearchPalette.jsx'
import ScrollOverlay from './ScrollOverlay.jsx'
import { scroller, onPageScroll, onAnyScroll, SCROLL_IDLE_MS } from '../lib/scroll.js'
import { prefetchBook } from '../data/books.js'

export default function Layout({ children }) {
  const { t, presenting, setPresenting, togglePresenting } = useApp()
  const [drawerOpen, setDrawerOpen] = useState(false)
  /* The sidebar starts COLLAPSED to a 64px rail of book covers. What the rail
     hides is the active book's section tree — one click away on the rail's own
     toggle, and listed in full on the book landing. This state lives in Layout
     and Layout never unmounts, so a reader who opens it keeps it open for the
     sitting; on phones the sidebar is a drawer and ignores this entirely. */
  const [collapsed, setCollapsed] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const loc = useLocation()
  /* THE SIDEBAR BELONGS TO THE BOOKS. It used to stand beside every page, where
     all it held was a second copy of the destinations in the bar above it. The
     destinations live in the top bar and the phone's dock now, so the sidebar
     is what is left: the books and their section trees — and it shows only
     where that is the question, inside a book. Home, the shelf, the club page
     and the game get the full width. */
  const inBook = loc.pathname.startsWith('/book/')
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
    const offScroll = onPageScroll(remember)
    document.addEventListener('click', remember, { capture: true })
    return () => {
      offScroll()
      document.removeEventListener('click', remember, { capture: true })
    }
  }, [])

  /* ---- fetch a book on the first sign of intent ----------------------------
     Each book's content is its own chunk, fetched when the book is opened
     (data/books.js). Starting that fetch when a pointer arrives on a link to
     it — or a finger lands on one — wins back most of the wait before the
     click completes. Delegated from the document because book links are
     everywhere: the carousel, the sidebar, the navbar chips, the hero, search
     results, and in-content cards between books. */
  useEffect(() => {
    const onIntent = (e) => {
      const a = e.target.closest?.('a[href*="#/book/"]')
      const m = a && /#\/book\/([^/?#]+)/.exec(a.getAttribute('href'))
      if (m) prefetchBook(m[1])
    }
    const opts = { passive: true, capture: true }
    for (const type of ['pointerover', 'touchstart', 'focusin']) document.addEventListener(type, onIntent, opts)
    return () => { for (const type of ['pointerover', 'touchstart', 'focusin']) document.removeEventListener(type, onIntent, opts) }
  }, [])

  /* ---- "the reader is scrolling", for every scrollbar on the page ----------
     THE SINGLE OWNER OF THAT SIGNAL. `html.is-scrolling` drives both the inner
     scrollers' native thumbs (global.css) and the page's overlay thumb
     (ScrollOverlay), so one gesture fades everything on one timer. They were
     briefly two implementations on 700ms and 900ms — the same flick fading two
     scrollbars at visibly different rates, which nobody chose.

     One capture-phase listener is the whole subscription: it is on the path of
     the inner scrollers, whose events do not bubble, AND of the page's own.

     NB: the in-app preview pane dispatches NO scroll events on any target, so
     this cannot be exercised there; add the class by hand to check the CSS. */
  useEffect(() => {
    let timer
    const root = document.documentElement
    const off = onAnyScroll(() => {
      root.classList.add('is-scrolling')
      clearTimeout(timer)
      timer = setTimeout(() => root.classList.remove('is-scrolling'), SCROLL_IDLE_MS)
    })
    return () => { clearTimeout(timer); off(); root.classList.remove('is-scrolling') }
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
      {/* ONE bar at the top, and on a phone one dock at the bottom. The four
          destinations (data/nav.js) ride in the bar from 861px up and in the
          dock below that — a phone's bar cannot hold them, and the bottom of
          the screen is where a thumb is anyway. */}
      <Navbar onMenu={() => setDrawerOpen(true)} onSearch={() => setSearchOpen(true)} inBook={inBook} />
      <div className="app-body">
        {inBook && (
          <Sidebar
            open={drawerOpen}
            collapsed={collapsed}
            onClose={() => setDrawerOpen(false)}
            onToggleCollapse={() => setCollapsed((c) => !c)}
          />
        )}
        <main className="app-main" id="main" ref={mainRef} tabIndex={-1}>
          {/* The breadcrumb rides INSIDE the page so it shares the article's
              measure; it renders only on a book's section (see Breadcrumb). */}
          <div className="page fade-in" key={loc.pathname}>
            <Breadcrumb />
            {children}
          </div>
          <footer className="site-footer">
            <p>{t(ui.footer.built)}</p>
            <p className="muted">{t(ui.footer.note)}</p>
          </footer>
        </main>
      </div>
      <Dock />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ScrollOverlay />
      {presenting && (
        <button className="present-exit" onClick={() => setPresenting(false)}>
          ✕ {t(ui.actions.exitPresent)} <kbd>esc</kbd>
        </button>
      )}
    </div>
  )
}
