import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import RichText from './RichText.jsx'

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

function MythCard({ block }) {
  const { t } = useApp()
  const [open, setOpen] = useState(false)
  return (
    <div className={`myth-card card ${open ? 'open' : ''}`}>
      <div className="myth-claim">
        <span className="pill warm">{t({ ar: 'مغالطة', en: 'Myth' })}</span>
        <RichText as="strong" value={block.claim} />
      </div>
      {open ? (
        <div className="myth-reply fade-in">
          <span className="pill" style={{ background: 'var(--accent-soft)', color: 'var(--success)' }}>
            {t({ ar: 'الردّ العلمي', en: 'The science' })}
          </span>
          <RichText as="p" value={block.reply} />
        </div>
      ) : (
        <button className="btn primary" onClick={() => setOpen(true)}>
          {t({ ar: 'صح أم خطأ؟ اكشف', en: 'True or false? Reveal' })}
        </button>
      )}
    </div>
  )
}

/* Claim → critique → response, for the "book under scrutiny" sections. Laid out
   as three tinted rows so a reader can see both sides without clicking. */
function DebateCard({ block }) {
  const { t } = useApp()
  return (
    <article className="debate card">
      {block.topic && <RichText as="h4" className="debate-topic" value={block.topic} />}
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
  return (
    <figure className={cls}>
      <img src={block.src} alt={t(block.alt)} loading="lazy"
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

export default function ContentBlocks({ blocks }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h': return <RichText key={i} as="h3" value={b.text} />
          case 'h4': return <RichText key={i} as="h4" value={b.text} />
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
          case 'myth': return <MythCard key={i} block={b} />
          case 'debate': return <DebateCard key={i} block={b} />
          case 'sources': return <SourceList key={i} block={b} />
          default: return null
        }
      })}
    </>
  )
}
