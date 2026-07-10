import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'

export default function Home() {
  const { t } = useApp()
  const featured = books[0]
  return (
    <div className="home">
      <section className="hero">
        <img className="hero-logo" src="./images/logo.png" alt={t(ui.siteTitle)} />
        <span className="pill">{t(ui.siteTagline)}</span>
        <h1>{t({ ar: 'نقرأ الكتاب… ثم نعيشه', en: 'We read the book… then we live it' })}</h1>
        <p className="hero-lead">
          {t({
            ar: 'نادي «رُقعة» للقراءة — نلتقي لنقرأ كتاباً مهمّاً ونناقشه معاً، ونصنع له ملخّصاتٍ تفاعلية ثنائية اللغة (عربي/إنجليزي). كتابنا الحالي: «لماذا ننام» لماثيو ووكر — بأشكاله التفاعلية، ودراساته على هيئة لعبة تخمين، وتقييمٍ شخصيّ لنومك.',
            en: 'The Ruqʿa reading club — we meet to read and discuss an important book together, and build interactive, bilingual (Arabic/English) materials for it. Our current book: Matthew Walker’s “Why We Sleep” — with its interactive figures, its studies as a guessing game, and a personal assessment of your sleep.',
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
          <h2>{t(ui.labels.currentBook)}</h2>
          <Link to="/books" className="see-all">{t({ ar: 'كلّ الكتب', en: 'All books' })} →</Link>
        </div>
        <Link to={`/book/${featured.id}`} className="book-card feature-card card">
          <div className="book-cover">
            <img src={t(featured.cover)} alt={t(featured.title)} onError={(e) => { e.currentTarget.style.opacity = 0 }} />
          </div>
          <div className="book-info">
            <h3>{t(featured.title)}</h3>
            <span className="book-author">{t({ ar: 'تأليف', en: 'by' })} {t(featured.author)}</span>
            <p>{t(featured.blurb)}</p>
            <span className="book-open">{t(ui.actions.openBook)} →</span>
          </div>
        </Link>
      </section>
    </div>
  )
}
