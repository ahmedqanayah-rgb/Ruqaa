import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

/*
 * The page's scrollbar, drawn OVER the content instead of beside it.
 *
 * The native one is switched off on <body> in global.css. Fading only its thumb
 * (the first attempt) still reserved the 10px track for the whole life of the
 * page, so the hero video and every page next to it were narrowed by a
 * scrollbar that was invisible most of the time. Nothing here occupies layout:
 * the strip is position:fixed and the thumb is translucent on top of the page.
 *
 * Only the PAGE scrollbar is replaced. The inner scrollers — sidebar, search
 * results, the book carousel — keep their native ones, which fade via the
 * `is-scrolling` class Layout sets; they sit inside their own boxes and never
 * pushed the page around.
 *
 * Same scroller reasoning as Layout and BookSection, and duplicated the same
 * way they duplicate it: the app scrolls on <body>, so read `body.scrollTop`,
 * never `window.scrollY`, and listen on body AND window because neither alone
 * is dependable here.
 */
function scroller() {
  return document.body.scrollHeight > document.body.clientHeight
    ? document.body
    : document.documentElement
}

/* Below this the thumb stops meaning anything and just looks like grit. */
const MIN_THUMB = 32
/* How long it stays up after the last scroll. Long enough to see where you
   landed, short enough not to sit over the reading. */
const IDLE_MS = 900

export default function ScrollOverlay() {
  // null while the page is too short to scroll — then nothing renders at all.
  const [geom, setGeom] = useState(null)
  const [active, setActive] = useState(false)
  const idle = useRef(null)
  const drag = useRef(null)
  const loc = useLocation()

  const measure = useCallback(() => {
    const el = scroller()
    const { scrollTop, scrollHeight, clientHeight } = el
    const range = scrollHeight - clientHeight
    if (range < 2) { setGeom(null); return }
    const height = Math.max(MIN_THUMB, Math.round(clientHeight * (clientHeight / scrollHeight)))
    const top = Math.round((clientHeight - height) * (scrollTop / range))
    // Bail out of the state update when nothing moved: this runs on every
    // scroll event, and a fresh object each time would re-render the whole
    // overlay for no reason.
    setGeom((prev) => (prev && prev.top === top && prev.height === height ? prev : { top, height }))
  }, [])

  useEffect(() => {
    const hideSoon = () => {
      clearTimeout(idle.current)
      // A drag holds it open however long the reader takes.
      idle.current = setTimeout(() => { if (!drag.current) setActive(false) }, IDLE_MS)
    }
    const onScroll = () => { measure(); setActive(true); hideSoon() }

    measure()
    // The pane this is developed in throttles ResizeObserver and fires no
    // scroll events at all, and mobile viewports settle late as the URL bar
    // collapses — so re-measure on the next frame and once more after a beat,
    // the same belt-and-braces HeroCinema needs for its box.
    const raf = requestAnimationFrame(measure)
    const settle = setTimeout(measure, 300)

    document.body.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    // Content can change height without anyone scrolling (a figure loading, a
    // group unfolding), which changes the thumb's size but fires no scroll.
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(document.body)

    return () => {
      cancelAnimationFrame(raf); clearTimeout(settle); clearTimeout(idle.current)
      document.body.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      ro?.disconnect()
    }
  }, [measure])

  // A new route is new content of a new height. Layout sets scrollTop itself on
  // navigation, which usually fires a scroll — but not when it was already 0
  // and stays 0, which is exactly the common case of moving between two pages
  // that both start at the top.
  useEffect(() => { measure() }, [loc.pathname, measure])

  const onPointerDown = (e) => {
    if (!geom) return
    drag.current = { y: e.clientY, top: scroller().scrollTop }
    e.currentTarget.setPointerCapture(e.pointerId)
    setActive(true)
    e.preventDefault()
  }
  const onPointerMove = (e) => {
    if (!drag.current || !geom) return
    const el = scroller()
    const range = el.scrollHeight - el.clientHeight
    const usable = el.clientHeight - geom.height
    if (usable <= 0) return
    // Travel of the thumb → travel of the page, which is the inverse of the
    // ratio that sized the thumb in the first place.
    el.scrollTop = drag.current.top + (e.clientY - drag.current.y) * (range / usable)
  }
  const endDrag = (e) => {
    if (!drag.current) return
    drag.current = null
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    clearTimeout(idle.current)
    idle.current = setTimeout(() => setActive(false), IDLE_MS)
  }

  if (!geom) return null

  return (
    <div className={`scroll-overlay ${active ? 'is-active' : ''}`} aria-hidden>
      <div
        className="scroll-overlay-thumb"
        style={{ top: geom.top, height: geom.height }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      />
    </div>
  )
}
