/*
 * THE ONE PLACE THAT KNOWS HOW THIS APP SCROLLS.
 *
 * `global.css` gives <html> and <body> `height: 100%` and `overflow-x: hidden`,
 * which makes the other axis `auto` — so **the page scrolls on <body>**, and
 * <html> never moves. That matters more than it sounds: `window.scrollTo()`
 * drives `document.scrollingElement`, i.e. <html>, so it is a **no-op** on this
 * site, and `window.scrollY` is always 0. Measured: body.scrollHeight 5792 vs
 * clientHeight 812, while html is 812/812 and its scrollTop stays 0 however you
 * set it. `scroller()` keeps a documentElement fallback in case the layout ever
 * moves the overflow back.
 *
 * This lived in three places before — Layout, ScrollOverlay and an inlined copy
 * inside BookSection's ReadingProgress — each with its own restatement of the
 * paragraph above, and the inline one invisible to a grep for `scroller`. One
 * copy means the day the overflow owner changes, it changes here.
 *
 * NB: the in-app preview pane dispatches NO scroll events at all, on any
 * target — the same stalled-frame cause as rAF never firing. A silent listener
 * there is not evidence of a bug.
 */

export function scroller() {
  return document.body.scrollHeight > document.body.clientHeight
    ? document.body
    : document.documentElement
}

/*
 * Subscribe to PAGE scrolling. Returns its own cleanup, so a caller cannot pair
 * an add with a mismatched remove — which is the mistake this shape exists to
 * prevent, `{ capture: true }` having to be repeated on removal being the near
 * miss that prompted it.
 *
 * Body AND window because neither alone is dependable here.
 */
export function onPageScroll(fn) {
  document.body.addEventListener('scroll', fn, { passive: true })
  window.addEventListener('scroll', fn, { passive: true })
  return () => {
    document.body.removeEventListener('scroll', fn)
    window.removeEventListener('scroll', fn)
  }
}

/*
 * Subscribe to ANY scrolling in the document, the page and every inner scroller
 * alike — the sidebar, the search results, the book carousel.
 *
 * One capture-phase listener does it. Scroll events do not bubble up from an
 * element, so a normal listener on `document` hears nothing from them; but
 * capture runs top-down, so `document` is on the path of every one. It is also
 * on the path of the page's own scroll, which is why this needs no body/window
 * pair — adding them would just run the same handler two extra times per frame.
 */
export function onAnyScroll(fn) {
  document.addEventListener('scroll', fn, { capture: true, passive: true })
  return () => document.removeEventListener('scroll', fn, { capture: true })
}

/* How long the scrollbars stay up after the last movement. Long enough to see
   where you landed, short enough not to sit over the reading. ONE constant: the
   page's overlay thumb and the inner scrollers' native ones are the same
   gesture, and briefly faded at two different rates. */
export const SCROLL_IDLE_MS = 900
