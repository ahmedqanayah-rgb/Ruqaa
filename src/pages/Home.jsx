import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'
import AskMeOne from '../components/AskMeOne.jsx'

export default function Home() {
  const { t } = useApp()
  const featured = books[0]
  // Show up to three books in the sliding list; a "see all" card follows so the
  // rest are one tap away. The row scroll-snaps and is RTL-aware (flex + dir).
  const shown = books.slice(0, 3)
  const hasMore = books.length > shown.length

  return (
    <div className="home">
      <section className="hero">
        <img className="hero-logo" src="./images/logo.png" alt={t(ui.siteTitle)} />
        <span className="pill">{t(ui.siteTagline)}</span>
        <h1>{t({ ar: 'نقرأ الكتاب… ثم نعيشه', en: 'We read the book… then we live it' })}</h1>
        <p className="hero-lead">
          {t({
            ar: 'نادي «رُقعة» للقراءة — نلتقي لنقرأ كتاباً مهمّاً ونناقشه معاً، ونصنع له ملخّصاتٍ تفاعلية ثنائية اللغة (عربي/إنجليزي).',
            en: 'The Ruqʿa reading club — we meet to read and discuss an important book together, and build interactive, bilingual (Arabic/English) materials for it.',
          })}
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to={`/book/${featured.id}`}>{t(ui.actions.openBook)} →</Link>
          <Link className="btn" to="/books">{t(ui.nav.books)}</Link>
          <Link className="btn ghost" to="/about">{t(ui.nav.about)}</Link>
        </div>
      </section>

      <section className="books-section">
        <div className="section-head-row">
          <h2>{t(ui.labels.ourBooks)}</h2>
          <Link to="/books" className="see-all">{t(ui.labels.allBooks)} →</Link>
        </div>
        <div className="book-carousel" role="list">
          {shown.map((b) => (
            <Link key={b.id} to={`/book/${b.id}`} className="book-card card carousel-card" role="listitem">
              <div className="book-cover">
                <img src={t(b.cover)} alt={t(b.title)} onError={(e) => { e.currentTarget.style.opacity = 0 }} />
              </div>
              <div className="book-info">
                <h3>{t(b.title)}</h3>
                <span className="book-author">{t({ ar: 'تأليف', en: 'by' })} {t(b.author)}</span>
                <p>{t(b.blurb)}</p>
                <span className="book-open">{t(ui.actions.openBook)} →</span>
              </div>
            </Link>
          ))}
          {hasMore && (
            <Link to="/books" className="book-card card carousel-card ghost-card" role="listitem">
              <div className="soon">
                <span aria-hidden>→</span>
                <p>{t(ui.labels.allBooks)}</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <AskMeOne />
    </div>
  )
}
