import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { getBook } from '../data/books.js'
import ContentBlocks from '../components/ContentBlocks.jsx'
import StudiesQuiz from '../components/StudiesQuiz.jsx'
import AssessmentForm from '../components/AssessmentForm.jsx'

function BookLanding({ book }) {
  const { t } = useApp()
  return (
    <div className="book-landing">
      <header className="book-hero">
        <div className="book-hero-cover">
          <img src={t(book.cover)} alt={t(book.title)}
            onError={(e) => { e.currentTarget.style.opacity = 0 }} />
        </div>
        <div>
          <span className="pill">{t({ ar: 'كتاب', en: 'Book' })}</span>
          <h1>{t(book.title)}</h1>
          {book.subtitle && <p className="book-subtitle">{t(book.subtitle)}</p>}
          <p className="book-author">{t({ ar: 'تأليف', en: 'by' })} {t(book.author)}</p>
          <p>{t(book.blurb)}</p>
        </div>
      </header>
      <h2>{t(ui.labels.sections)}</h2>
      <div className="section-cards">
        {book.sections.map((s, i) => (
          <Link key={s.slug} to={`/book/${book.id}/${s.slug}`} className="section-card card">
            <span className="section-card-num">{i + 1}</span>
            <span className="section-card-icon" aria-hidden>{s.icon}</span>
            <span className="section-card-title">{t(s.title)}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function BookSection() {
  const { bookId, slug } = useParams()
  const { t } = useApp()
  const navigate = useNavigate()
  const book = getBook(bookId)

  if (!book) return <div className="prose-page"><h1>404</h1></div>
  if (!slug) return <BookLanding book={book} />

  const idx = book.sections.findIndex((s) => s.slug === slug)
  const section = book.sections[idx]
  if (!section) return <BookLanding book={book} />

  const prev = book.sections[idx - 1]
  const next = book.sections[idx + 1]

  return (
    <article className="section-page">
      <div className="section-breadcrumb">
        <Link to={`/book/${book.id}`}>{t(book.title)}</Link>
        <span aria-hidden>›</span>
        <span>{t(section.title)}</span>
      </div>

      <header className="section-head">
        <span className="section-index">{idx + 1} / {book.sections.length}</span>
        <h1><span className="section-emoji" aria-hidden>{section.icon}</span> {t(section.title)}</h1>
        {section.lead && <p className="section-lead">{t(section.lead)}</p>}
      </header>

      {section.kind === 'quiz' ? (
        <StudiesQuiz studies={section.studies} interestOrder={section.interestOrder} />
      ) : section.kind === 'assessment' ? (
        <AssessmentForm questions={section.assessment.questions}
          tips={section.assessment.tips} goodTip={section.assessment.goodTip} />
      ) : (
        <div className="section-content">
          <ContentBlocks blocks={section.blocks} />
        </div>
      )}

      <nav className="section-nav">
        {prev ? (
          <button className="btn nav-prev" onClick={() => navigate(`/book/${book.id}/${prev.slug}`)}>
            <span aria-hidden>‹</span>
            <span className="nav-lbl"><small>{t(ui.actions.prev)}</small>{t(prev.title)}</span>
          </button>
        ) : <span />}
        {next ? (
          <button className="btn nav-next" onClick={() => navigate(`/book/${book.id}/${next.slug}`)}>
            <span className="nav-lbl"><small>{t(ui.actions.next)}</small>{t(next.title)}</span>
            <span aria-hidden>›</span>
          </button>
        ) : <span />}
      </nav>
    </article>
  )
}
