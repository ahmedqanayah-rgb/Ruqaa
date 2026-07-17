import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { getBook } from '../data/books.js'
import ContentBlocks from '../components/ContentBlocks.jsx'
import StudiesQuiz from '../components/StudiesQuiz.jsx'
import AssessmentForm from '../components/AssessmentForm.jsx'
import FocusLab from '../components/FocusLab.jsx'
import RichText from '../components/RichText.jsx'

const L = (ar, en) => ({ ar, en })

/* Family colour accents for cause-section cards (matches the causes-map figure). */
const FAM_COLORS = {
  mind: 'var(--violet)', tech: 'var(--blue)', body: 'var(--cool)', society: 'var(--warm)',
}

/* ---- reading-time estimate from a section's blocks (per language) ---- */
function blockWords(b, lang) {
  const pick = (v) => (v == null ? '' : typeof v === 'string' ? v : (v[lang] ?? v.en ?? v.ar ?? ''))
  let s = ''
  switch (b.type) {
    case 'h': case 'h4': case 'p': case 'quote': s = pick(b.text); break
    case 'callout': s = `${pick(b.title)} ${pick(b.text)}`; break
    case 'ul': case 'ol': s = (b.items || []).map(pick).join(' '); break
    case 'myth': s = `${pick(b.claim)} ${pick(b.reply)}`; break
    case 'people': s = (b.people || []).map((p) => pick(p.story)).join(' '); break
    case 'peoplegroups': s = (b.groups || []).flatMap((g) => g.people).map((p) => pick(p.story)).join(' '); break
    default: return 0
  }
  return s.split(/\s+/).filter(Boolean).length
}
function readMinutes(section, lang) {
  if (!section.blocks) return null // quiz / assessment / lab
  const words = section.blocks.reduce((sum, b) => sum + blockWords(b, lang), 0)
  return Math.max(1, Math.round(words / 180))
}

/* ---- top-of-page reading progress bar ---- */
function ReadingProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    // The app scrolls on <body> (overflow-y: auto), not on the window — so
    // listen there, with a window fallback in case the layout ever changes.
    const onScroll = () => {
      const scroller = document.body.scrollHeight > document.body.clientHeight
        ? document.body : document.documentElement
      const max = scroller.scrollHeight - scroller.clientHeight
      const pct = max > 0 ? Math.min(100, (scroller.scrollTop / max) * 100) : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    onScroll()
    document.body.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.body.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return <div className="read-progress" aria-hidden><div ref={barRef} className="read-progress-fill" /></div>
}

/* ---- one-question comprehension check at the end of an article ---- */
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

/* ---- rotating shocking-fact teaser on the landing hero ---- */
function FactRotator({ book }) {
  const { t } = useApp()
  const facts = useMemo(() => {
    const sec = book.sections.find((s) => s.slug === 'shocking')
    return sec ? sec.blocks.filter((b) => b.type === 'callout') : []
  }, [book])
  const [i, setI] = useState(() => Math.floor(Math.random() * Math.max(1, facts.length)))
  if (!facts.length) return null
  const reroll = () => setI((cur) => {
    if (facts.length < 2) return cur
    let n = cur
    while (n === cur) n = Math.floor(Math.random() * facts.length)
    return n
  })
  const f = facts[i]
  return (
    <div className="fact-teaser">
      <div className="fact-teaser-body">
        <strong>{t(f.title)}</strong>
        <RichText as="p" value={f.text} />
      </div>
      <div className="fact-teaser-foot">
        <button className="btn ghost fact-teaser-btn" onClick={reroll}>
          🎲 {t(L('حقيقة أخرى', 'Another fact'))}
        </button>
        <Link to={`/book/${book.id}/shocking`}>{t(L('كلّ الحقائق ←', 'All the facts →'))}</Link>
      </div>
    </div>
  )
}

/* ---- landing: hero + stats + grouped section cards ---- */
function countExperts(book) {
  const sec = book.sections.find((s) => s.slug === 'characters')
  if (!sec) return 0
  return sec.blocks.reduce((n, b) => {
    if (b.type === 'people') return n + b.people.length
    if (b.type === 'peoplegroups') return n + b.groups.reduce((m, g) => m + g.people.length, 0)
    return n
  }, 0)
}
function SectionCard({ book, section, index, minutes }) {
  const { t, visited } = useApp()
  const seen = visited.has(`${book.id}/${section.slug}`)
  const accent = FAM_COLORS[section.fam]
  return (
    <Link to={`/book/${book.id}/${section.slug}`}
      className={`section-card card rich ${seen ? 'seen' : ''}`}
      style={accent ? { '--card-accent': accent } : undefined}>
      <div className="section-card-top">
        <span className="section-card-num">{seen ? '✓' : index + 1}</span>
        <span className="section-card-icon" aria-hidden>{section.icon}</span>
        <span className="section-card-title">{t(section.title)}</span>
      </div>
      {section.lead && <span className="section-card-lead">{t(section.lead)}</span>}
      <span className="section-card-meta">
        {minutes
          ? t({ ar: `⏱ ~${minutes} د قراءة`, en: `⏱ ~${minutes} min read` })
          : t(L('🎮 تفاعلي', '🎮 Interactive'))}
      </span>
    </Link>
  )
}
function BookLanding({ book }) {
  const { t, lang, visited } = useApp()
  const bySlug = useMemo(() => new Map(book.sections.map((s, i) => [s.slug, { s, i }])), [book])
  const studiesSec = book.sections.find((s) => s.kind === 'quiz')
  const experts = countExperts(book)
  const hasLab = book.sections.some((s) => s.kind === 'focus-lab')
  const seenCount = book.sections.filter((s) => visited.has(`${book.id}/${s.slug}`)).length
  const total = book.sections.length
  const ring = Math.round((seenCount / total) * 100)

  const renderCard = (slug) => {
    const hit = bySlug.get(slug)
    if (!hit) return null
    return <SectionCard key={slug} book={book} section={hit.s} index={hit.i}
      minutes={readMinutes(hit.s, lang)} />
  }

  return (
    <div className="book-landing">
      <header className="book-hero">
        <div className="book-hero-cover">
          <img src={t(book.cover)} alt={t(book.title)}
            onError={(e) => { e.currentTarget.style.opacity = 0 }} />
        </div>
        <div className="book-hero-body">
          <span className="pill">{t({ ar: 'كتاب', en: 'Book' })}</span>
          <h1>{t(book.title)}</h1>
          {book.subtitle && <p className="book-subtitle">{t(book.subtitle)}</p>}
          <p className="book-author">{t({ ar: 'تأليف', en: 'by' })} {t(book.author)}</p>
          <p>{t(book.blurb)}</p>
          <div className="book-stats" role="list">
            <span role="listitem">📚 {t({ ar: `${total} قسماً`, en: `${total} sections` })}</span>
            {studiesSec && <span role="listitem">🔬 {t({ ar: `${studiesSec.studies.length} دراسة`, en: `${studiesSec.studies.length} studies` })}</span>}
            {hasLab && <span role="listitem">🧪 {t({ ar: '٧ ألعاب', en: '7 games' })}</span>}
            {experts > 0 && <span role="listitem">👥 {t({ ar: `${experts}+ شخصية`, en: `${experts}+ people` })}</span>}
          </div>
          {seenCount > 0 && (
            <div className="book-progress" aria-label={t({ ar: `قرأت ${seenCount} من ${total}`, en: `Read ${seenCount} of ${total}` })}>
              <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--border)" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--success)" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={`${ring} 100`} pathLength="100"
                  transform="rotate(-90 18 18)" />
              </svg>
              <span>{t({ ar: `قرأت ${seenCount} من ${total} في هذه الجلسة`, en: `Read ${seenCount} of ${total} this sitting` })}</span>
            </div>
          )}
        </div>
      </header>

      <FactRotator book={book} />

      {book.groups ? (
        book.groups.map((g, gi) => (
          <section key={gi} className="landing-group">
            <h2 className="landing-group-title">{t(g.title)}</h2>
            <div className="section-cards">{g.slugs.map(renderCard)}</div>
          </section>
        ))
      ) : (
        <>
          <h2>{t(ui.labels.sections)}</h2>
          <div className="section-cards">
            {book.sections.map((s) => renderCard(s.slug))}
          </div>
        </>
      )}
    </div>
  )
}

/* ---- section page ---- */
export default function BookSection() {
  const { bookId, slug } = useParams()
  const { t, dir, lang, markVisited } = useApp()
  const navigate = useNavigate()
  const book = getBook(bookId)
  const touch = useRef(null)

  const idx = book && slug ? book.sections.findIndex((s) => s.slug === slug) : -1
  const section = idx >= 0 ? book.sections[idx] : null

  // Session read-tracking + scroll reset on section change.
  useEffect(() => {
    if (book && section) {
      markVisited(book.id, section.slug)
      document.body.scrollTop = 0; window.scrollTo({ top: 0 })
    }
  }, [book, section, markVisited])

  const prev = idx >= 0 ? book.sections[idx - 1] : null
  const next = idx >= 0 ? book.sections[idx + 1] : null

  // Keyboard navigation: back/forward follows the reading direction.
  useEffect(() => {
    if (!section) return
    const onKey = (e) => {
      const el = e.target
      if (el.closest?.('input, textarea, select, [contenteditable="true"]')) return
      const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
      const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
      if (e.key === forward && next) navigate(`/book/${book.id}/${next.slug}`)
      else if (e.key === backward && prev) navigate(`/book/${book.id}/${prev.slug}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [section, dir, next, prev, book, navigate])

  if (!book) return <div className="prose-page"><h1>404</h1></div>
  if (!section) return <BookLanding book={book} />

  // Swipe navigation (mobile). Ignore swipes that start on interactive pieces
  // — figures, sliders, feeds, lab games — so their own gestures keep working.
  const onTouchStart = (e) => {
    const el = e.target
    if (el.closest?.('input, button, a, svg, .figure, .fl-card, .sf-reading, .recharts-wrapper')) { touch.current = null; return }
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) < 70 || Math.abs(dy) > 50) return
    const forward = dir === 'rtl' ? dx > 0 : dx < 0
    const target = forward ? next : prev
    if (target) navigate(`/book/${book.id}/${target.slug}`)
  }

  const minutes = readMinutes(section, lang)

  return (
    <article key={section.slug} className="section-page route-fade"
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <ReadingProgress />
      <div className="section-breadcrumb">
        <Link to={`/book/${book.id}`}>{t(book.title)}</Link>
        <span aria-hidden>›</span>
        <span>{t(section.title)}</span>
      </div>

      <header className="section-head">
        <span className="section-index">
          {idx + 1} / {book.sections.length}
          {minutes && <span className="section-readtime"> · ⏱ {t({ ar: `~${minutes} د قراءة`, en: `~${minutes} min read` })}</span>}
        </span>
        <h1><span className="section-emoji" aria-hidden>{section.icon}</span> {t(section.title)}</h1>
        {section.lead && <p className="section-lead">{t(section.lead)}</p>}
      </header>

      {section.kind === 'quiz' ? (
        <StudiesQuiz studies={section.studies} interestOrder={section.interestOrder} />
      ) : section.kind === 'assessment' ? (
        <AssessmentForm questions={section.assessment.questions}
          tips={section.assessment.tips} goodTip={section.assessment.goodTip} />
      ) : section.kind === 'focus-lab' ? (
        <FocusLab />
      ) : (
        <div className="section-content">
          <ContentBlocks blocks={section.blocks} />
        </div>
      )}

      {section.quick && <QuickCheck key={`${section.slug}-quick`} quick={section.quick} />}

      <nav className="section-nav-v2">
        {next ? (
          <Link className="nextup card" to={`/book/${book.id}/${next.slug}`}>
            <span className="nextup-label">{t(ui.actions.next)} <span aria-hidden>›</span></span>
            <span className="nextup-title"><span aria-hidden>{next.icon}</span> {t(next.title)}</span>
            {next.lead && <span className="nextup-lead">{t(next.lead)}</span>}
          </Link>
        ) : (
          <Link className="nextup card done" to={`/book/${book.id}`}>
            <span className="nextup-label">🎉 {t(L('أنهيت أقسام الكتاب', 'You’ve reached the end'))}</span>
            <span className="nextup-title">{t(L('عُد إلى فهرس الكتاب', 'Back to the book’s index'))}</span>
          </Link>
        )}
        <div className="section-nav-row">
          {prev ? (
            <Link className="prevlink" to={`/book/${book.id}/${prev.slug}`}>
              <span aria-hidden>‹</span> {t(ui.actions.prev)}: {t(prev.title)}
            </Link>
          ) : <span />}
          <span className="nav-hint">{t(L('تنقّل بالأسهم ← → أو بالسحب', 'Navigate with ← → or by swiping'))}</span>
        </div>
      </nav>
    </article>
  )
}
