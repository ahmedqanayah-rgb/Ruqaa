import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import RichText from './RichText.jsx'
import { Figure } from './figures/registry.jsx'

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
          case 'figure': return <Figure key={i} id={b.id} />
          case 'image': return <ImageBlock key={i} block={b} />
          case 'imggrid':
            return (
              <div key={i} className="img-grid">
                {b.images.map((im, j) => <ImageBlock key={j} block={im} />)}
              </div>
            )
          case 'people': return <PeopleGrid key={i} people={b.people} />
          case 'myth': return <MythCard key={i} block={b} />
          default: return null
        }
      })}
    </>
  )
}
