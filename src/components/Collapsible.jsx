import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Icon from './Icon.jsx'

/*
 * THE SITE'S ONE DISCLOSURE IDIOM — collapsible headings, Wikipedia-style.
 *
 * Used by «مراجعة الكتاب» (the book's chapters) and «أنشطة إضافية» (the
 * activities). Those were two different things a week apart — a segmented tab
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
export default function Collapsible({ items = [], renderBody, onOpen, className = '' }) {
  const { t } = useApp()
  const [params] = useSearchParams()
  const [open, setOpen] = useState(() => new Set())
  const want = params.get('open')
  const wantRef = useRef(null)

  const toggle = (id) => setOpen((prev) => {
    const next = new Set(prev)
    if (next.has(id)) next.delete(id); else next.add(id)
    return next
  })

  useEffect(() => {
    if (!want || !items.some((i) => i.id === want)) return
    setOpen((prev) => (prev.has(want) ? prev : new Set([...prev, want])))
    // …and put it on screen. Unfolding something below the fold, on a page whose
    // whole point is that it starts short, is indistinguishable from nothing.
    const el = wantRef.current
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start', behavior: 'smooth' }))
  }, [want, items])

  /* Opening a heading is what "reading it" means now — these are the units the
     progress ring counts (readingUnits in data/books.js). Left to the page, one
     chapter of ten would tick the whole book off. */
  const opened = [...open].join(',')
  useEffect(() => {
    if (!onOpen) return
    const id = setTimeout(() => open.forEach(onOpen), 1200)
    return () => clearTimeout(id)
    // `opened` rather than `open`: a Set is a new object each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, onOpen])

  if (!items.length) return null

  return (
    <div className={`collapsibles ${className}`}>
      {items.map((item) => {
        const isOpen = open.has(item.id)
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
            {isOpen && (
              <div className="collapsible-body">
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
