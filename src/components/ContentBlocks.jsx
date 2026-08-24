import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { imageDims } from '../data/imageDims.js'
import { scroller } from '../lib/scroll.js'
import RichText from './RichText.jsx'

const L = (ar, en) => ({ ar, en })

/* The figure registry pulls in every chart component and, through them, all of
   recharts — the heaviest dependency in the app. Loading it lazily keeps it off
   Home, Books, About and every text-only section; it arrives only when a
   section actually renders a figure. */
const Figure = lazy(() =>
  import('./figures/registry.jsx').then((m) => ({ default: m.Figure }))
)

/* Internal navigation cards — used e.g. to cross-link between books. */
function LinkCards({ block }) {
  return (
    <nav className="link-cards">
      {block.title && <strong className="link-cards-title"><RichText value={block.title} /></strong>}
      <div className="section-cards">
        {block.links.map((l, i) => (
          <Link key={i} to={l.to} className="section-card card">
            <span className="section-card-icon" aria-hidden>{l.icon || '↗'}</span>
            <span className="section-card-title"><RichText value={l.label} /></span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

/* Claim → critique → response, for the "book under scrutiny" sections. Laid out
   as three tinted rows so a reader can see both sides without clicking. */
function DebateCard({ block }) {
  const { t } = useApp()
  return (
    <article className="debate card">
      {block.topic && <RichText as="h2" className="debate-topic" value={block.topic} />}
      <div className="debate-row claim">
        <span className="debate-tag">{t({ ar: 'ما يقوله الكتاب', en: 'What the book says' })}</span>
        <RichText as="p" value={block.claim} />
      </div>
      <div className="debate-row critique">
        <span className="debate-tag">{t({ ar: 'ما يقوله النقّاد', en: 'What critics say' })}</span>
        <RichText as="p" value={block.critique} />
        {block.critic && <cite className="debate-critic"><RichText value={block.critic} /></cite>}
      </div>
      {block.response && (
        <div className="debate-row response">
          <span className="debate-tag">{t({ ar: 'وفي المقابل', en: 'In response' })}</span>
          <RichText as="p" value={block.response} />
        </div>
      )}
    </article>
  )
}

/* External reference list. The only place the site links off-site, so links are
   explicit about it (new tab + ↗) rather than looking like internal nav. */
function SourceList({ block }) {
  const { t } = useApp()
  return (
    <aside className="sources">
      <strong className="sources-title">
        {t(block.title || { ar: 'المصادر', en: 'Sources' })}
      </strong>
      <ul>
        {block.items.map((s, i) => (
          <li key={i}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {t(s.label)} <span aria-hidden>↗</span>
            </a>
            {s.publisher && <span className="sources-pub">{t(s.publisher)}</span>}
          </li>
        ))}
      </ul>
    </aside>
  )
}

function Callout({ block }) {
  const variant = block.variant || 'note'
  const icons = { note: 'ℹ️', key: '🔑', warn: '⚠️', fact: '💡', quote: '❝' }
  return (
    <div className={`callout ${variant}`}>
      <span className="callout-icon" aria-hidden>{icons[variant] || icons.note}</span>
      <div>
        {block.title && <strong className="callout-title"><RichText value={block.title} /></strong>}
        <RichText as="p" value={block.text} />
      </div>
    </div>
  )
}

function ImageBlock({ block }) {
  const { t } = useApp()
  const cls = ['img-block', block.wide ? 'wide' : '', block.transparent ? 'transparent' : ''].filter(Boolean).join(' ')
  // Intrinsic size from the generated manifest, so the browser reserves the box
  // before the image lands instead of reflowing the article around it. The CSS
  // keeps width/height auto, so these only supply the aspect ratio — the
  // max-width/max-height clamps still decide the rendered size.
  const [w, h] = imageDims[block.src] || []
  return (
    <figure className={cls}>
      <img src={block.src} alt={t(block.alt)} loading="lazy" width={w} height={h}
        onError={(e) => { e.currentTarget.style.display = 'none' }} />
      {block.caption && <figcaption className="fig-caption"><RichText value={block.caption} /></figcaption>}
      {block.legend && (
        <ul className="img-legend" aria-label={t({ ar: 'مفتاح الصورة', en: 'Image key' })}>
          {block.legend.map((lg, i) => (
            <li key={i}><span className="img-legend-term">{t(lg)}</span></li>
          ))}
        </ul>
      )}
    </figure>
  )
}

function PeopleGrid({ people }) {
  const { t } = useApp()
  return (
    <div className="people-grid">
      {people.map((p, i) => (
        <article key={i} className="person-card card">
          <div className="person-photo">
            <img src={p.img} alt={t(p.name)} loading="lazy"
              onError={(e) => { e.currentTarget.parentElement.classList.add('noimg') }} />
            <span className="person-fallback" aria-hidden>{t(p.name).charAt(0)}</span>
          </div>
          <div className="person-body">
            <strong className="person-name">{t(p.name)}</strong>
            {p.tag && <span className="person-tag">{t(p.tag)}</span>}
            <RichText as="p" value={p.story} />
          </div>
        </article>
      ))}
    </div>
  )
}

/* People organised in titled groups, with filter chips ("all" + one per group).
   Used by character galleries large enough to need filtering. */
function PeopleGroups({ block }) {
  const { t } = useApp()
  const [sel, setSel] = useState(-1) // -1 = all
  const groups = sel < 0 ? block.groups : [block.groups[sel]]
  return (
    <div className="people-groups">
      <div className="people-filter" role="tablist" aria-label={t({ ar: 'تصفية الشخصيات', en: 'Filter people' })}>
        <button className={`people-chip ${sel < 0 ? 'active' : ''}`} onClick={() => setSel(-1)}>
          {t({ ar: 'الكلّ', en: 'All' })} ({block.groups.reduce((n, g) => n + g.people.length, 0)})
        </button>
        {block.groups.map((g, i) => (
          <button key={i} className={`people-chip ${sel === i ? 'active' : ''}`} onClick={() => setSel(i)}>
            {t(g.title)} ({g.people.length})
          </button>
        ))}
      </div>
      {groups.map((g, i) => (
        <section key={t(g.title)} className="people-group fade-in">
          <RichText as="h3" value={g.title} />
          <PeopleGrid people={g.people} />
        </section>
      ))}
    </div>
  )
}

/* Two (or more) whole sub-documents inside one section, switched by a segmented
   bar — used to put «عن المؤلّف» and «عن المترجم» in a single tab instead of two.
   It renders ContentBlocks again for the active panel, so a panel can hold
   anything a section can. Only the active panel is mounted: these panels carry
   portraits and source lists, and mounting both would fetch two sets of images
   for one visible one. */
/* End-of-article check. Lives here rather than in BookSection because a
   chapter folded into a `tabs` panel has to carry its own — see the `quick`
   block type below. */
function QuickCheck({ quick }) {
  const { t } = useApp()
  const [picked, setPicked] = useState(null)
  const done = picked != null
  const right = done && picked === quick.correct
  return (
    <aside className={`quick-check card ${done ? (right ? 'right' : 'wrong') : ''}`}>
      <strong className="quick-check-title">
        {t(L('سؤالٌ سريع قبل أن تغادر', 'A quick question before you go'))}
      </strong>
      <RichText as="p" className="quick-check-q" value={quick.q} />
      <div className="quick-check-opts">
        {quick.opts.map((o, i) => {
          const cls = !done ? '' : i === quick.correct ? 'correct' : i === picked ? 'picked-wrong' : 'dim'
          return (
            <button key={i} className={`quick-check-opt ${cls}`} disabled={done} onClick={() => setPicked(i)}>
              {t(o)}
            </button>
          )
        })}
      </div>
      {done && (
        <p className="quick-check-note fade-in">
          {right ? '✅ ' : '💡 '}<RichText value={quick.note} />
        </p>
      )}
    </aside>
  )
}

function TabbedBlocks({ block }) {
  const { t, markVisited } = useApp()
  const [params, setParams] = useSearchParams()
  const panels = block.panels || []

  /* WHICH PANEL IS OPEN LIVES IN THE URL, not in state.
     Chapters that used to be their own routes are panels now, so without this
     every link to one — the cross-book connections, the in-content cards, a
     search hit — would land on the parent and leave the reader to find it. Same
     idiom the studies quiz already uses for `?study=`. `replace` so clicking
     through tabs does not bury the previous page under history entries. */
  const found = panels.findIndex((p) => p.id === params.get('tab'))
  const active = found >= 0 ? found : 0
  const select = (i) => {
    const next = new URLSearchParams(params)
    next.set('tab', panels[i].id)
    setParams(next, { replace: true })
  }

  /* A panel is the unit of reading now (readingUnits in data/books.js), so it
     marks ITSELF read. Leaving this to BookSection meant opening one chapter of
     ten ticked the whole book off. */
  const { bookId, slug } = useParams()
  const activeId = panels[active]?.id
  useEffect(() => {
    if (!bookId || !slug || !activeId) return
    const id = setTimeout(() => markVisited(bookId, `${slug}?tab=${activeId}`), 1200)
    return () => clearTimeout(id)
  }, [bookId, slug, activeId, markVisited])

  /* Switching chapter should start that chapter, not drop you at the scroll
     depth of the last one. The page-level reset is keyed on the section, which
     no longer changes when the reader moves between chapters. */
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    scroller().scrollTop = 0
  }, [activeId])

  if (!panels.length) return null
  return (
    <div className="block-tabs">
      <div className="block-tabs-bar" role="tablist">
        {panels.map((p, i) => (
          <button key={p.id || i} type="button" role="tab" aria-selected={i === active}
            className={`block-tab ${i === active ? 'active' : ''}`}
            onClick={() => select(i)}>
            {t(p.title)}
          </button>
        ))}
      </div>
      <div className="block-tabs-panel" role="tabpanel">
        <ContentBlocks blocks={panels[active]?.blocks || []} />
      </div>
    </div>
  )
}

export default function ContentBlocks({ blocks }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          // A section's title is the page h1, so its in-content headings are h2
          // (major) and h3 (minor) — never h3/h4, which skips a level. The block
          // type name 'h4' is kept for content compatibility; only the tag moved.
          case 'h': return <RichText key={i} as="h2" value={b.text} />
          case 'h4': return <RichText key={i} as="h3" value={b.text} />
          case 'p': return <RichText key={i} as="p" value={b.text} />
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it, j) => <li key={j}><RichText value={it} /></li>)}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it, j) => <li key={j}><RichText value={it} /></li>)}
              </ol>
            )
          case 'callout': return <Callout key={i} block={b} />
          case 'quote':
            return (
              <blockquote key={i} className="pull-quote">
                <RichText value={b.text} />
              </blockquote>
            )
          case 'figure':
            return (
              <Suspense key={i} fallback={<div className="figure-loading" aria-hidden />}>
                <Figure id={b.id} />
              </Suspense>
            )
          case 'image': return <ImageBlock key={i} block={b} />
          case 'imggrid':
            return (
              <div key={i} className="img-grid">
                {b.images.map((im, j) => <ImageBlock key={j} block={im} />)}
              </div>
            )
          case 'people': return <PeopleGrid key={i} people={b.people} />
          case 'peoplegroups': return <PeopleGroups key={i} block={b} />
          case 'linkcards': return <LinkCards key={i} block={b} />
          case 'tabs': return <TabbedBlocks key={i} block={b} />
          // A chapter folded into a panel brings its end-of-article check with it.
          case 'quick': return <QuickCheck key={i} quick={b.quick} />
          case 'debate': return <DebateCard key={i} block={b} />
          case 'sources': return <SourceList key={i} block={b} />
          default: return null
        }
      })}
    </>
  )
}
