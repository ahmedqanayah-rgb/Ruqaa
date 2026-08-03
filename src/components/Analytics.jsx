import { useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

/*
 * Vercel Web Analytics — aggregate page counts for the club, visible only in the
 * Vercel dashboard. Nothing renders on the site (the component returns null) and
 * no number is ever shown to a visitor.
 *
 * Why this one and not Google Analytics: in production the script is served from
 * `/_vercel/insights/script.js` — our own origin — so the site still makes zero
 * third-party requests, which is the whole reason the fonts were self-hosted. It
 * sets no cookies and writes nothing to localStorage/sessionStorage, so it does
 * not breach the project's hard no-storage rule. It counts; it cannot identify an
 * individual, and there is no setting that makes it able to.
 *
 * (In dev only, `@vercel/analytics` loads a debug script from va.vercel-scripts.com
 * that logs events to the console instead of sending them. That URL never ships.)
 */

/*
 * ── Why this is not just a bare `<Analytics />` ──
 *
 * The site is a HashRouter, so every route lives after the `#` and the real
 * pathname is always `/`. The script's automatic tracking patches `pushState`
 * — which react-router does call — but then decides whether anything happened by
 * comparing `location.pathname`. Under a hash router that string never changes,
 * so **no pageview fires on in-app navigation at all**: measured in the browser,
 * clicking through to another section logged nothing. Only full page loads were
 * counted, and every one of them as "/".
 *
 * Passing `route` flips the component to `disableAutoTrack` and makes it fire the
 * pageview itself whenever `route`/`path` change — the same hook the Next.js
 * integration uses. Feeding it react-router's location (which under HashRouter is
 * the part after the `#`) gives real per-section counts, on first load and on
 * every navigation after it.
 *
 * Two things not to "improve":
 *
 * - `route` is the concrete path, not a pattern like `/book/:bookId/:slug`. The
 *   pattern is what Vercel groups rows by, and grouping would fold all 36
 *   sections into one row — the one number we already know, and the one thing we
 *   don't want to learn.
 * - `beforeSend` **strips** the fragment, it does not fold it into the path. The
 *   script builds the event URL as origin + the `path` we passed + whatever is
 *   currently in `location.hash`, so it arrives as `/about#/about`: the path is
 *   already correct and the fragment is a duplicate. An earlier pass folded the
 *   hash into the path instead — the right fix for a hash-routed site relying on
 *   automatic tracking, and wrong here, because it double-applied and sent
 *   `/book/why-we-sleep/book/why-we-sleep`.
 */
export default function SiteAnalytics() {
  const { pathname, search } = useLocation()
  const path = pathname + search

  return <Analytics route={path} path={path} beforeSend={beforeSend} />
}

function beforeSend(event) {
  return { ...event, url: stripFragment(event.url) }
}

function stripFragment(url) {
  try {
    const u = new URL(url)
    u.hash = ''
    return u.toString()
  } catch {
    return url
  }
}
