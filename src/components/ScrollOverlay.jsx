import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { scroller, onPageScroll } from '../lib/scroll.js'

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
 * results, the book carousel — keep their native ones; they sit inside their
 * own boxes and never pushed the page around.
 *
 * WHETHER IT IS VISIBLE IS NOT DECIDED HERE. Layout owns `html.is-scrolling`
 * and the CSS keys the thumb's opacity to it, so the page thumb and the inner
 * scrollbars fade on one timer, at one duration (lib/scroll.js). This component
 * owns only the thumb's GEOMETRY, plus `.is-dragging` to hold it open while the
 * reader keeps hold of it without moving.
 */

/* Below this the thumb stops meaning anything and just looks like grit. */
const MIN_THUMB = 32

export default function ScrollOverlay() {
  // The only thing that needs a render: whether the page scrolls at all.
  const [scrollable, setScrollable] = useState(false)
  const wrapRef = useRef(null)
  const thumbRef = useRef(null)
  const frame = useRef(0)
  const drag = useRef(null)
  // Last measurement, kept out of state so scrolling never re-renders. The drag
  // maths needs `height` and `range`, and reading them back off the DOM would
  // be a layout read per pointermove.
  const dims = useRef({ height: 0, range: 0 })

  /* Write the thumb straight to the DOM rather than through state.
   *
   * `top` changes on nearly every frame of a real scroll, so a state-driven
   * thumb is a React render + reconcile per frame, and an inline `top` is a
   * layout property — writing it and then reading scrollTop next frame forces a
   * synchronous reflow. A `transform` is a compositor property and skips both. */
  const apply = useCallback(() => {
    frame.current = 0
    const el = scroller()
    const { scrollTop, scrollHeight, clientHeight } = el
    const range = scrollHeight - clientHeight
    if (range < 2) { dims.current = { height: 0, range: 0 }; setScrollable(false); return }
    const height = Math.max(MIN_THUMB, Math.round(clientHeight * (clientHeight / scrollHeight)))
    const top = Math.round((clientHeight - height) * (scrollTop / range))
    dims.current = { height, range }
    setScrollable(true)
    const t = thumbRef.current
    if (t) { t.style.height = `${height}px`; t.style.transform = `translateY(${top}px)` }
  }, [])

  /* Coalesce to one measurement per frame. `onPageScroll` listens on body AND
     window, so without this every scroll event measures twice — six geometry
     reads a frame for one thumb.
     Cancel-and-reschedule rather than "skip if one is pending": the pending id
     is only cleared by `apply`, so a scheduled frame that never runs would latch
     the guard on and freeze the thumb for good. Rescheduling cannot get stuck,
     and still collapses to one `apply` per frame because each cancels the last.
     (Seen for real in the embedded preview, where rAF never fires at all.) */
  const measure = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(apply)
  }, [apply])

  // The thumb only exists once `scrollable` is true, so its first geometry has
  // to be written after that render, not during the measure that discovered it.
  useLayoutEffect(() => { if (scrollable) apply() }, [scrollable, apply])

  useEffect(() => {
    apply()
    // Mobile viewports settle late as the URL bar collapses, and the preview
    // pane throttles ResizeObserver — one late re-measure covers both.
    const settle = setTimeout(apply, 300)
    const offScroll = onPageScroll(measure)
    /* Content changes height without anyone scrolling — a figure loading, a
       group unfolding, a route swap. Because <body> IS the viewport-height
       scroller, this also fires on window resize, so no separate resize
       listener is needed. */
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(document.body)

    return () => {
      clearTimeout(settle)
      if (frame.current) cancelAnimationFrame(frame.current)
      offScroll()
      ro?.disconnect()
    }
  }, [apply, measure])

  // The thumb is only in the DOM when the page scrolls, so these can take
  // `dims.current` as populated.
  const onPointerDown = (e) => {
    drag.current = { y: e.clientY, top: scroller().scrollTop }
    wrapRef.current?.classList.add('is-dragging')
    e.preventDefault()
    // Last, and guarded: setPointerCapture throws if the pointer is already
    // gone, and it must not take the drag down with it — capture only decides
    // whether the pointer keeps tracking once it leaves the 8px thumb.
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* pointer already released */ }
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const { height, range } = dims.current
    const usable = scroller().clientHeight - height
    if (usable <= 0) return
    // Travel of the thumb → travel of the page, the inverse of the ratio that
    // sized the thumb in the first place.
    scroller().scrollTop = drag.current.top + (e.clientY - drag.current.y) * (range / usable)
  }
  const endDrag = (e) => {
    if (!drag.current) return
    drag.current = null
    wrapRef.current?.classList.remove('is-dragging')
    try { e.currentTarget.releasePointerCapture?.(e.pointerId) } catch { /* never captured */ }
  }

  if (!scrollable) return null

  return (
    <div className="scroll-overlay" ref={wrapRef} aria-hidden>
      <div
        className="scroll-overlay-thumb"
        ref={thumbRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      />
    </div>
  )
}
