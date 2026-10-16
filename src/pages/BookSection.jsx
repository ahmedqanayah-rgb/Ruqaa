import { useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { getBook, useBook, entrySlugs, readingUnits, sectionProgress, openable, findByKind } from '../data/books.js'
import ContentBlocks from '../components/ContentBlocks.jsx'
import StudiesQuiz from '../components/StudiesQuiz.jsx'
import AssessmentForm from '../components/AssessmentForm.jsx'
import MythOrFact from '../components/MythOrFact.jsx'
import Collapsible from '../components/Collapsible.jsx'
import LoadBoundary, { LoadFailed } from '../components/LoadBoundary.jsx'

/* Seven games' worth of logic. Lazy, and it stays off the wire until the
   reader opens «مختبر التركيز» — that boundary is the point, not an accident. */
const FocusLab = lazy(() => import('../components/FocusLab.jsx'))
import RichText from '../components/RichText.jsx'
import Icon from '../components/Icon.jsx'
import { scroller, onPageScroll } from '../lib/scroll.js'

const L = (ar, en) => ({ ar, en })

/* ---- reading-time estimate from a section's blocks (per language) ---- */
function blockWords(b, lang) {
  const pick = (v) => (v == null ? '' : typeof v === 'string' ? v : (v[lang] ?? v.en ?? v.ar ?? ''))
  let s = ''
  switch (b.type) {
    case 'h': case 'h4': case 'p': case 'quote': s = pick(b.text); break
    case 'callout': s = `${pick(b.title)} ${pick(b.text)}`; break
    case 'ul': case 'ol': s = (b.items || []).map(pick).join(' '); break
    // `sources` is a link list, not prose — deliberately left at 0.
    case 'debate': s = `${pick(b.topic)} ${pick(b.claim)} ${pick(b.critique)} ${pick(b.response)}`; break
    case 'people': s = (b.people || []).map((p) => pick(p.story)).join(' '); break
    case 'peoplegroups': s = (b.groups || []).flatMap((g) => g.people).map((p) => pick(p.story)).join(' '); break
    /* Panels are prose too, and most of the book's prose is inside them now.
       Without this the whole review section counted zero words and every card
       advertised «~1 min read» for an entire book. */
    case 'tabs': return (b.panels || []).flatMap((p) => p.blocks || [])
      .reduce((n, x) => n + blockWords(x, lang), 0)
    default: return 0
  }
  return s.split(/\s+/).filter(Boolean).length
}
function readMinutes(section, lang) {
  if (!section.blocks) return null // «أنشطة إضافية» — its parts, not prose
  const words = section.blocks.reduce((sum, b) => sum + blockWords(b, lang), 0)
  return Math.max(1, Math.round(words / 180))
}

/* ---- top-of-page reading progress bar ---- */
function ReadingProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const el = scroller()
      const max = el.scrollHeight - el.clientHeight
      const pct = max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    onScroll()
    return onPageScroll(onScroll)
  }, [])
  return <div className="read-progress" aria-hidden><div ref={barRef} className="read-progress-fill" /></div>
}


/* ONE activity — the quiz, the assessment, the lab, the game, or a plain
   blocks section like «الشخصيات». Split out of the page's own dispatch so the
   stacked «أنشطة إضافية» tab renders each of its parts exactly as that part
   would have rendered when it was still a page of its own. */
function Activity({ book, part }) {
  switch (part.kind) {
    case 'quiz':
      return <StudiesQuiz studies={part.studies} interestOrder={part.interestOrder}
        bookTitle={book.title} sectionTitle={part.title} />
    case 'assessment':
      return <AssessmentForm questions={part.assessment.questions}
        tips={part.assessment.tips} goodTip={part.assessment.goodTip}
        bookTitle={book.title} sectionTitle={part.title} />
    case 'focus-lab':
      return (
        <LoadBoundary message={L('تعذّر تحميل مختبر التركيز.', 'The focus lab could not be loaded.')}>
          <Suspense fallback={<div className="figure-loading" aria-hidden />}>
            <FocusLab bookTitle={book.title} sectionTitle={part.title} />
          </Suspense>
        </LoadBoundary>
      )
    case 'myth-game':
      return <MythOrFact items={part.items} bookTitle={book.title} sectionTitle={part.title} />
    default:
      return <div className="section-content"><ContentBlocks blocks={part.blocks} /></div>
  }
}

/* «أنشطة إضافية» — the activities as collapsible headings, through the same
   shared component the chapters use. Collapsible marks its own visits. */
function Activities({ book, section }) {
  return (
    <Collapsible
      items={section.parts || []}
      keepMounted
      renderBody={(part) => <Activity book={book} part={part} />}
    />
  )
}

/* ---- rotating shocking-fact teaser on the landing hero ---- */
function FactRotator({ book }) {
  const { t } = useApp()
  /* The facts come from the myth-or-fact deck now — «الحقائق الصادمة» stopped
     being a section, and this quietly rendered nothing until it was repointed.
     Only the FACT half: teasing the landing page with a myth would be telling
     the reader something untrue in the book's own voice. */
  const facts = useMemo(() => {
    const found = findByKind(book, 'myth-game')
    return (found?.part.items || []).filter((it) => !it.isMyth).map((it) => it.statement)
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
        <RichText as="p" value={f} />
      </div>
      <div className="fact-teaser-foot">
        <button className="btn ghost fact-teaser-btn" onClick={reroll}>
          🎲 {t(L('حقيقة أخرى', 'Another fact'))}
        </button>
        {/* «الحقائق الصادمة» is not a section any more — the facts live in the
            game, which is also where this teaser's text comes from. */}
        <Link to={`/book/${book.id}/activities?open=myth-or-fact`}>{t(L('العب بها كلّها ←', 'Play them all →'))}</Link>
      </div>
    </div>
  )
}

/* ---- landing: hero + stats + grouped section cards ---- */
function countExperts(book) {
  // «الشخصيات» is an activity PART now, not a section of its own — look in both
  // places, or the landing quietly loses its «X+ شخصية» chip.
  const all = book.sections.flatMap((s) => [s, ...(s.parts || [])])
  const sec = all.find((s) => s.slug === 'characters' || s.id === 'characters')
  if (!sec?.blocks) return 0
  return sec.blocks.reduce((n, b) => {
    if (b.type === 'people') return n + b.people.length
    if (b.type === 'peoplegroups') return n + b.groups.reduce((m, g) => m + g.people.length, 0)
    return n
  }, 0)
}
/* What a section card advertises under its title. Prose sections get a read
   time; the interactive ones say what they actually contain, which is more use
   than a blanket "interactive". */
function sectionMeta(section, minutes) {
  if (minutes) return { ar: `⏱ ~${minutes} د قراءة`, en: `⏱ ~${minutes} min read` }
  if (section.kind === 'quiz' && section.studies)
    return { ar: `🔬 ${section.studies.length} دراسة`, en: `🔬 ${section.studies.length} studies` }
  if (section.kind === 'myth-game' && section.items)
    return { ar: `🎲 ${section.items.length} عبارة`, en: `🎲 ${section.items.length} statements` }
  if (section.kind === 'activities' && section.parts)
    return { ar: `🎯 ${section.parts.length} أنشطة`, en: `🎯 ${section.parts.length} activities` }
  return { ar: '🎮 تفاعلي', en: '🎮 Interactive' }
}

function SectionCard({ book, section, index, minutes }) {
  const { t, visited } = useApp()
  const { seen: seenUnits, total: totalUnits, done: seen } = sectionProgress(book, section, visited)
  return (
    <Link to={`/book/${book.id}/${section.slug}`}
      className={`section-card card rich ${seen ? 'seen' : ''}`}>
      <div className="section-card-top">
        {/* A partial count rather than a number nobody can act on: with ten
            headings inside, «3/10» says more than «2.». */}
        <span className="section-card-num">
          {seen ? '✓' : totalUnits > 1 && seenUnits > 0 ? `${seenUnits}/${totalUnits}` : index + 1}
        </span>
        <Icon name={section.icon} className="section-card-icon" />
        <span className="section-card-title">{t(section.title)}</span>
      </div>
      {/* No lead here. The user's call: on the index, the title and the read
          time are enough to choose by, and a two-line summary on each of 23
          cards turned the list into something to read rather than scan. The
          lead still opens the section itself and still previews the next one. */}
      <span className="section-card-meta">{t(sectionMeta(section, minutes))}</span>
    </Link>
  )
}
/* The club's own opinion of the book — the one thing a summary can't give you.
   Renders only for books that define a `verdict`. */
function VerdictCard({ book }) {
  const { t } = useApp()
  const v = book.verdict
  if (!v) return null
  const full = Math.floor(v.rating)
  const half = v.rating - full >= 0.5
  return (
    <section className="verdict card">
      <div className="verdict-head">
        <span className="pill">{t(L('رأي النادي', 'The club’s verdict'))}</span>
        <span className="verdict-stars" aria-label={t(L(`${v.rating} من ٥`, `${v.rating} out of 5`))}>
          <span aria-hidden>{'★'.repeat(full)}{half ? '½' : ''}</span>
          <b className="verdict-num">{v.rating}/5</b>
        </span>
      </div>
      <RichText as="p" className="verdict-text" value={v.text} />
      <div className="verdict-grid">
        <div className="verdict-cell good">
          <strong>{t(L('اقرأه إن…', 'Read it if…'))}</strong>
          <RichText as="p" value={v.readIf} />
        </div>
        <div className="verdict-cell warn">
          <strong>{t(L('انتبه إلى…', 'Watch out for…'))}</strong>
          <RichText as="p" value={v.caveat} />
        </div>
      </div>
    </section>
  )
}

/* Members' own reviews of the book, in their words and under their names
   (`book.reviews`, e.g. data/books/stolen-focus/reviews.js). Right after the
   club's verdict: the club's opinion, then the members'. One heading each,
   through the site's one disclosure idiom, so a long review costs the page a
   single line until someone opens it — and `?open=<id>` links straight to one.
   `items` is memoised: Collapsible re-runs its `?open=` seeding whenever the
   array changes, which on every landing re-render would scroll back to it. */
function MemberReviews({ book }) {
  const { t } = useApp()
  const items = useMemo(() => (book.reviews || []).map((r) => ({
    id: r.id,
    icon: '✍️',
    title: L(`«${r.title.ar}» — ${r.author.ar}`, `“${r.title.en}” — ${r.author.en}`),
    lead: r.byline,
    review: r,
  })), [book])
  if (!items.length) return null
  return (
    <section className="member-reviews">
      <h2>{t(L('بأقلام الأعضاء', 'From our members'))}</h2>
      <Collapsible items={items} level={3} renderBody={(it) => (
        <>
          {t(it.review.translationNote) && <p className="review-note">{t(it.review.translationNote)}</p>}
          <ContentBlocks blocks={it.review.blocks} />
        </>
      )} />
    </section>
  )
}

/*
 * Which landing groups are unfolded, per book. Module scope rather than
 * component state because `BookLanding` unmounts every time the reader opens a
 * section — without this, a group they expanded had folded itself shut by the
 * time they came back, while their scroll position was faithfully restored to
 * a page that no longer looked the same. In memory only, so it dies with the
 * tab, exactly like `visited`.
 *
 * `touched` is what keeps both behaviours: until the reader touches a header we
 * re-seed on every mount, so the open group follows their progress through the
 * book; once they have an opinion, it is theirs and we stop moving it.
 */
const landingGroups = new Map() // bookId → { open: Set<number>, touched: boolean }

function BookLanding({ book }) {
  const { t, lang, visited } = useApp()
  const bySlug = useMemo(() => new Map(book.sections.map((s, i) => [s.slug, { s, i }])), [book])
  const minutesBySlug = useMemo(
    () => new Map(book.sections.map((s) => [s.slug, readMinutes(s, lang)])),
    [book, lang]
  )
  const studiesSec = findByKind(book, 'quiz')
  /* Memoised together: `readMinutes` walks every heading's blocks now, so one
     `review` card alone is ~120 block visits, and this ran on every landing
     render — a group toggle, a theme flip, and every `visited` change, which
     the collapsibles now produce mid-page. None of it can change unless the
     book or the language does. */
  const experts = useMemo(() => countExperts(book), [book])
  const labSec = findByKind(book, 'focus-lab')
  // Panels, not sections — see readingUnits. Counting sections made one panel
  // of ten read like a whole chapter of the book.
  const units = useMemo(() => readingUnits(book), [book])
  const seenCount = units.filter((u) => visited.has(u)).length
  const total = units.length
  const ring = Math.round((seenCount / total) * 100)

  const renderCard = (slug) => {
    const hit = bySlug.get(slug)
    if (!hit) return null
    return <SectionCard key={slug} book={book} section={hit.s} index={hit.i}
      minutes={minutesBySlug.get(slug)} />
  }

  /* The landing's one primary action. A newcomer needs a first step more than
     anything else on this page, so it sits in the hero rather than below the
     verdict — see PLAN-onboarding.md §2, where the first section card measured
     two full screens down on a phone.

     Reading order, not registry order: `groups` is what the page actually shows,
     so its first slug is what "the beginning" means to a reader. Once they've
     read something the button follows them to the first section they haven't
     seen, which makes it useful on the second visit instead of redundant. */
  const ordered = book.groups ? book.groups.flatMap(entrySlugs) : book.sections.map((s) => s.slug)
  const startSlug = ordered.find((sl) => bySlug.has(sl))
  /* In reading order, but at HEADING granularity, so «تابع القراءة» lands on
     the chapter you stopped at rather than the next section along. Units are
     fully qualified (`bookId/slug?open=id`); the CTA needs the path part, so
     the book prefix comes off here — it is the only place that difference
     matters, and building the link from a half-key was how this last broke. */
  const path = (unit) => unit.slice(`${book.id}/`.length)
  const nextSlug = ordered
    .flatMap((sl) => units.filter((u) => path(u) === sl || path(u).startsWith(`${sl}?`)))
    .filter((u) => !visited.has(u))
    .map(path)[0]
  const ctaSlug = seenCount > 0 ? (nextSlug || startSlug) : startSlug
  const ctaLabel = seenCount > 0 && nextSlug
    ? L('تابع القراءة', 'Continue reading')
    : L('ابدأ من البداية', 'Start from the beginning')

  /* Collapsible groups. This landing is 7.1 screens on a phone for Stolen Focus
     and the card list alone is 4.6 of them, so choosing the next section means
     thumbing past everything already read. Folding the groups turns that into
     five headers you can scan, which is the same job the sidebar drawer does —
     and the same rule for what opens: exactly the group you are up to.

     Seeding from `ctaSlug` keeps the header button and the hero's CTA agreeing
     with each other; a newcomer therefore still lands with «ابدأ هنا» open and
     its cards on screen, so this doesn't undo the reordering win. State is in
     memory like `visited` — no storage — and re-seeds on remount, which is what
     makes it follow the reader's progress instead of going stale. */
  const ctaGroup = book.groups ? book.groups.findIndex((g) => entrySlugs(g).includes(String(ctaSlug).split('?')[0])) : -1
  const [openGroups, setOpenGroups] = useState(() => {
    const saved = landingGroups.get(book.id)
    return saved?.touched ? saved.open : new Set([ctaGroup >= 0 ? ctaGroup : 0])
  })
  const toggleGroup = (gi) => setOpenGroups((prev) => {
    const next = new Set(prev)
    if (next.has(gi)) next.delete(gi); else next.add(gi)
    landingGroups.set(book.id, { open: next, touched: true })
    return next
  })

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
          {/* t(), not the object: a subtitle may exist in one language only (the
              Varoufakis edition in Arabic carries none), and `{ar:''}` is truthy. */}
          {t(book.subtitle) && <p className="book-subtitle">{t(book.subtitle)}</p>}
          <p className="book-author">{t({ ar: 'تأليف', en: 'by' })} {t(book.author)}</p>
          <p>{t(book.blurb)}</p>
          {/* The chips that describe a thing now go to it. They were plain
              spans styled as pills, so «🔬 61 دراسة» and «🧪 7 ألعاب» — exactly
              what a curious newcomer prods first — looked tappable and weren't.
              Linking them turns the summary into a second way in. The section
              count stays inert: it describes the page you're already on. */}
          <div className="book-stats" role="list">
            {/* `total` is reading UNITS (panels), not sections — 7 for a book
                with 3 tabs. Calling them «أقسام» read as a section count and
                matched neither. It is the same number the progress ring counts
                against, so the two now describe the same thing. */}
            <span role="listitem">📚 {t({ ar: `${total} جزءاً للقراءة`, en: `${total} parts to read` })}</span>
            {/* findByKind returns the PART (for its data) and the SECTION it
                lives in (for the URL) — these are activities inside one tab now,
                not sections of their own. */}
            {studiesSec && (
              <Link role="listitem" to={`/book/${book.id}/${studiesSec.section.slug}?open=${studiesSec.part.id || ''}`}>
                {/* `countLabel` lets a quiz say what it holds — the Varoufakis
                    book's are experiments and episodes, not studies. */}
                🔬 {studiesSec.part.studies.length} {t(studiesSec.part.countLabel || L('دراسة', 'studies'))}
              </Link>
            )}
            {labSec && (
              <Link role="listitem" to={`/book/${book.id}/${labSec.section.slug}?open=${labSec.part.id || ''}`}>
                🧪 {t({ ar: '٧ ألعاب', en: '7 games' })}
              </Link>
            )}
            {experts > 0 && <span role="listitem">👥 {t({ ar: `${experts}+ شخصية`, en: `${experts}+ people` })}</span>}
          </div>
          {ctaSlug && (
            <Link className="btn primary book-start" to={`/book/${book.id}/${ctaSlug}`}>
              {t(ctaLabel)} <span aria-hidden>→</span>
            </Link>
          )}
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

      {/* Sections first, then the club's opinion of them. The reverse order put
          a ★★★½ verdict and a link to the critical reception in front of someone
          who hadn't yet been shown where to start — two screens of it on a phone.
          Reordered in the JSX rather than with CSS `order` so the reading order
          a screen reader gets stays the same as the one everyone else sees. */}
      {book.groups ? (
        book.groups.map((g, gi) => {
          // Solo entry: just the card. No header, no fold — there is nothing to
          // unfold, and a one-item accordion only hides it.
          if (g.slug) {
            return bySlug.has(g.slug)
              ? <section key={gi} className="landing-group">
                  <div className="section-cards">{renderCard(g.slug)}</div>
                </section>
              : null
          }
          const open = openGroups.has(gi)
          const items = g.slugs.map((sl) => bySlug.get(sl)).filter(Boolean)
          const groupSeen = items.filter((h) => visited.has(`${book.id}/${h.s.slug}`)).length
          return (
          <section key={gi} className="landing-group">
            {/* The button goes *inside* the h2 rather than wrapping it: a
                <button> may only contain phrasing content, and swallowing the
                heading would drop it out of the document outline that was
                audited in POLISH-PLAN §5. This is the standard accordion shape. */}
            <h2 className="landing-group-title">
              <button className="landing-group-toggle" aria-expanded={open}
                onClick={() => toggleGroup(gi)}>
                <span className={`side-chev ${open ? 'open' : ''}`} aria-hidden>›</span>
                <span className="landing-group-text">{t(g.title)}</span>
                {/* With the cards hidden this count is the only clue to what is
                    inside, so it carries the read tally too — same signal, and
                    same wording, as the drawer's group headers. */}
                <span className="landing-group-count">
                  {groupSeen > 0 ? `${groupSeen}/${items.length}` : items.length}
                </span>
              </button>
            </h2>
            <div className="section-cards" hidden={!open}>{g.slugs.map(renderCard)}</div>
          </section>
          )
        })
      ) : (
        <>
          <h2>{t(ui.labels.sections)}</h2>
          <div className="section-cards">
            {book.sections.map((s) => renderCard(s.slug))}
          </div>
        </>
      )}

      <VerdictCard book={book} />

      <MemberReviews book={book} />

      <FactRotator book={book} />
    </div>
  )
}

/* Shown when the book exists but the section slug doesn't — a stale bookmark,
   a typo, or a section that has been renamed. */
function SectionNotFound({ book }) {
  const { t } = useApp()
  return (
    <div className="prose-page">
      <span className="pill">{t(book.title)}</span>
      <h1>{t(L('لم نجد هذا القسم', 'We couldn’t find that section'))}</h1>
      <p>
        {t(L(
          'ربّما تغيّر الرابط أو حُذف القسم. كلّ أقسام الكتاب موجودة في صفحته — أو ابحث عمّا تريد مباشرةً.',
          'The link may have changed, or the section may have been removed. Every section is listed on the book’s page — or search for what you want directly.'
        ))}
      </p>
      <div className="hero-actions">
        <Link className="btn primary" to={`/book/${book.id}`}>{t(book.title)} →</Link>
        <Link className="btn" to="/books">{t(ui.labels.allBooks)}</Link>
      </div>
    </div>
  )
}

/* ---- section page ---- */
/* While a book's content is on its way: the section's own heading from the
   skeleton (so the page already says where you are) over a quiet placeholder,
   or — if the chunk could not be fetched — a plain message and a reload (see
   LoadBoundary for why not a retry). Members join from places with uneven
   connections; a dropped request must not leave a page that spins for ever. */
function BookLoading({ skeleton, slug, failed }) {
  const { t } = useApp()
  const section = slug ? skeleton.sections.find((s) => s.slug === slug) : null
  return (
    <div className={section ? 'section-page' : 'book-page'} aria-busy={!failed}>
      <header className="section-head">
        <h1>{section && <Icon name={section.icon} className="section-emoji" />} {t(section ? section.title : skeleton.title)}</h1>
        {section?.lead && <p className="section-lead">{t(section.lead)}</p>}
      </header>
      {failed ? (
        <LoadFailed className="book-load-failed" message={L(
          'تعذّر تحميل الكتاب — ربما انقطع الاتصال، أو حُدِّث الموقع بعد أن فتحت هذه الصفحة.',
          'The book could not be loaded — the connection may have dropped, or the site was updated after this page was opened.')} />
      ) : <div className="figure-loading book-loading" aria-hidden />}
    </div>
  )
}

/* The route. Knows from the SKELETON (data/books.js) whether the book exists,
   and renders it once its content has arrived — at once if it already has. */
export default function BookSection() {
  const { bookId, slug } = useParams()
  const skeleton = getBook(bookId)
  const { book, failed } = useBook(skeleton ? bookId : null)
  if (!skeleton) return <div className="prose-page"><h1>404</h1></div>
  if (!book) return <BookLoading skeleton={skeleton} slug={slug} failed={failed} />
  return <BookPage book={book} slug={slug} />
}

function BookPage({ book, slug }) {
  const { t, dir, lang, markVisited } = useApp()
  const navigate = useNavigate()
  const touch = useRef(null)

  const idx = book && slug ? book.sections.findIndex((s) => s.slug === slug) : -1
  const section = idx >= 0 ? book.sections[idx] : null

  // Session read-tracking + scroll reset on section change.
  useEffect(() => {
    if (book && section) {
      /* Only a section that has no headings is "read" by arriving. One with
         headings is read by opening them (Collapsible marks each), and marking
         the bare slug here too put a ✓ on the card while the ring — which counts
         heading keys — still said 0. */
      if (!openable(section).length) markVisited(book.id, section.slug)
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

  // Before the early returns below — a hook must run on every render or on
  // none. (It used to sit after them, a rules-of-hooks violation in waiting.)
  const minutes = useMemo(() => (section ? readMinutes(section, lang) : null), [section, lang])

  if (!slug) return <BookLanding book={book} />
  // A slug that matches nothing used to fall through to the landing, so a stale
  // or mistyped link looked like it had worked. Say so instead.
  if (!section) return <SectionNotFound book={book} />

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

  return (
    <article key={section.slug} className="section-page route-fade"
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <ReadingProgress />
      {/* The breadcrumb that used to sit here moved into `SiteNav`, which now
          shows the same trail on every page beside the rest of the site map.
          Two trails a few pixels apart would be worse than either alone. */}
      <header className="section-head">
        <span className="section-index">
          {idx + 1} / {book.sections.length}
          {minutes && <span className="section-readtime"> · ⏱ {t({ ar: `~${minutes} د قراءة`, en: `~${minutes} min read` })}</span>}
        </span>
        <h1><Icon name={section.icon} className="section-emoji" /> {t(section.title)}</h1>
        {section.lead && <p className="section-lead">{t(section.lead)}</p>}
      </header>

      {section.kind === 'activities'
        ? <Activities book={book} section={section} />
        : <Activity book={book} part={section} />}


      <nav className="section-nav-v2">
        {next ? (
          <Link className="nextup card" to={`/book/${book.id}/${next.slug}`}>
            <span className="nextup-label">{t(ui.actions.next)} <span aria-hidden>›</span></span>
            <span className="nextup-title"><Icon name={next.icon} /> {t(next.title)}</span>
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
          {/* One hint per input device. This used to be a single string naming
              the arrow keys, shown to phones that have none — and it buried the
              swipe gesture, the one affordance a phone reader can actually use,
              in the second half of a sentence whose first half was noise. Both
              are rendered and CSS shows the one that applies; the choice is made
              on `pointer`, not width, so a touch tablet gets the touch copy. */}
          <span className="nav-hint for-keys">{t(L('تنقّل بالأسهم ← →', 'Navigate with ← →'))}</span>
          <span className="nav-hint for-touch">{t(L('اسحب يميناً أو يساراً للتنقّل بين الأقسام', 'Swipe left or right to move between sections'))}</span>
        </div>
      </nav>

      {/* Sticky in-book navigation, phones and tablets only (PLAN-onboarding §6a).
          A section runs to seven and a half screens, and until now the only ways
          out were an unlabelled 44px hamburger at the top or the next-up card at
          the very bottom. This is the one surface with room for a *labelled*
          route to the section list — the navbar measured 406px of need in a
          338px box, so the label could never go there.

          «الأقسام» goes to the book landing rather than opening the drawer: the
          landing is the real contents page, it now leads with the section list
          (§2), and routing to it keeps this component free of Layout's drawer
          state.

          Portalled to <body> because `position: fixed` is not viewport-relative
          inside a transformed ancestor, and this article has two of them — the
          `route-fade` article and Layout's `page fade-in` wrapper both animate a
          translateY. Rendered in place, the bar measured 338px wide sitting at
          y=6023, i.e. parked at the foot of the document instead of the screen.
          The portal also puts it last in tab order, which is where a fixed
          bottom bar belongs. */}
      {createPortal(
        <nav className="section-bar" aria-label={t(L('تنقّل داخل الكتاب', 'Within this book'))}>
        {prev ? (
          <Link className="section-bar-btn" to={`/book/${book.id}/${prev.slug}`}>
            <span aria-hidden>‹</span> {t(ui.actions.prev)}
          </Link>
        ) : <span className="section-bar-btn is-empty" aria-hidden />}
        <Link className="section-bar-btn mid" to={`/book/${book.id}`}>
          <span aria-hidden>☰</span> {t(ui.labels.sections)}
        </Link>
        {next ? (
          <Link className="section-bar-btn" to={`/book/${book.id}/${next.slug}`}>
            {t(ui.actions.next)} <span aria-hidden>›</span>
          </Link>
        ) : <span className="section-bar-btn is-empty" aria-hidden />}
        </nav>,
        document.body,
      )}
    </article>
  )
}
