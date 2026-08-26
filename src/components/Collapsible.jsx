import { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Icon from './Icon.jsx'

/*
 * THE SITE'S ONE DISCLOSURE IDIOM — collapsible headings, Wikipedia-style.
 *
 * Used by «مراجعة الكتاب» (the chapters), «المؤلّف والمترجم» (author and
 * translator) and «أنشطة إضافية» (the activities) — every disclosure on the
 * site. Those were two different things a week apart — a segmented tab
 * bar and a stack — and a third implementation was the alternative to this one.
 * A reader should meet one way of opening things on this site, not three.
 *
 * ALL CLOSED ON ARRIVAL, several may be open at once. A body is mounted only
 * while its heading is open, which is what keeps a ten-chapter page from
 * instantiating ten chapters' worth of charts — each `ResponsiveContainer`
 * carries a live ResizeObserver — and keeps the focus lab's lazy chunk off the
 * wire for a reader who came for something else.
 *
 * `?open=<id>` unfolds one on arrival. That is not decoration: cross-book
 * links, in-content cards, search hits and the landing's stat chips all point
 * at a specific chapter or activity, and without it every one of them would
 * drop the reader on a page of shut headings and leave them to guess which.
 *
 * THE SEEDING IS AN EFFECT, NOT A useState INITIALISER. Only the query changes
 * when a link points at a sibling from the same page, so the component never
 * remounts and an initialiser would run once and never again — measured, an
 * `?open=` arrival left the previously-opened one showing instead. It only ever
 * ADDS: opening one is no reason to shut one the reader opened themselves.
 */
export default function Collapsible({ items = [], renderBody, keepMounted = false, className = '' }) {
  const { t, markVisited } = useApp()
  const [params, setParams] = useSearchParams()
  const { bookId, slug } = useParams()
  const [open, setOpen] = useState(() => new Set())
  /* `keepMounted` callers keep a body alive once it has been opened, hidden
     rather than unmounted. Nothing mounts before its first click either way, so
     the lazy chunks and ResizeObservers stay off the wire exactly as before —
     only CLOSING changes. It matters where a body holds the reader's work:
     shutting «الدراسات والتجارب» unmounts StudiesQuiz, and forty answers into a
     122-study quiz go with it. For the chapters the default is right — twelve of
     them, seven figures each, and nothing to lose but a chart slider. */
  const everOpened = useRef(new Set())
  const want = params.get('open')
  const wantRef = useRef(null)

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
    /* OPENING writes itself into the URL. Two things depended on that and both
       were silently broken while it was local-only: a reader who opened a
       chapter and copied the address shared a page of shut headings, and
       Analytics (which passes `pathname + search`) only ever saw a chapter that
       was arrived at by link — a click-opened one produced no location change
       and so no event, collapsing the book's chapters back into three rows.
       Spread the existing params or `?study=` is dropped on the way. `replace`
       so a fold is not a history entry. */
    if (!open.has(id)) {
      const next = new URLSearchParams(params)
      next.set('open', id)
      setParams(next, { replace: true })
    }
  }

  useEffect(() => {
    if (!want || !items.some((i) => i.id === want)) return
    setOpen((prev) => (prev.has(want) ? prev : new Set([...prev, want])))
    // …and put it on screen. Unfolding something below the fold, on a page whose
    // whole point is that it starts short, is indistinguishable from nothing.
    const el = wantRef.current
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start', behavior: 'smooth' }))
  }, [want, items])

  /* Opening a heading is what "reading it" means now — these are the units the
     progress ring counts (`readingUnits` in data/books.js, which keys them
     exactly like this). Left to the page, one chapter of ten would tick the
     whole book off.

     Marks each heading ONCE, on its own dwell. Marking the whole open set on
     every change re-marked everything already counted and restarted the timer,
     so the dwell it looked like it enforced was not per-heading at all. */
  const marked = useRef(new Set())
  useEffect(() => {
    if (!bookId || !slug) return
    const fresh = [...open].filter((id) => !marked.current.has(id))
    if (!fresh.length) return
    const timer = setTimeout(() => fresh.forEach((id) => {
      marked.current.add(id)
      markVisited(bookId, `${slug}?open=${id}`)
    }), 1200)
    return () => clearTimeout(timer)
  }, [open, bookId, slug, markVisited])

  if (!items.length) return null

  return (
    <div className={`collapsibles ${className}`}>
      {items.map((item) => {
        const isOpen = open.has(item.id)
        if (isOpen) everOpened.current.add(item.id)
        const mounted = isOpen || (keepMounted && everOpened.current.has(item.id))
        return (
          <section key={item.id} className={`collapsible ${isOpen ? 'is-open' : ''}`}
            ref={item.id === want ? wantRef : undefined}>
            {/* The button sits INSIDE the h2, not around it: a <button> may only
                contain phrasing content, and wrapping the heading would drop it
                out of the document outline. Same shape as the landing groups. */}
            <h2 className="collapsible-title">
              <button type="button" className="collapsible-toggle" aria-expanded={isOpen}
                onClick={() => toggle(item.id)}>
                <span className={`side-chev ${isOpen ? 'open' : ''}`} aria-hidden>›</span>
                {item.icon && <Icon name={item.icon} className="section-emoji" />}
                <span className="collapsible-title-text">{t(item.title)}</span>
              </button>
            </h2>
            {mounted && (
              <div className="collapsible-body" hidden={!isOpen}>
                {item.lead && <p className="collapsible-lead">{t(item.lead)}</p>}
                {renderBody(item)}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
