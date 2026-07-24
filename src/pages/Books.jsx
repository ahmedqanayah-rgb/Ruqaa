import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'
import BookConnections from '../components/BookConnections.jsx'

export default function Books() {
  const { t } = useApp()
  return (
    <div className="prose-page books-page">
      <span className="pill">{t(ui.nav.books)}</span>
      <h1>{t({ ar: 'الكتب', en: 'Books' })}</h1>
      <p>{t({
        ar: 'كتب النادي — نبدأ بكتابٍ واحد، وتُضاف كتبٌ جديدة مع كلّ موسم. اختر كتاباً لتفتح موادّه التفاعلية.',
        en: 'The club’s books — we begin with one, and new books are added each season. Pick a book to open its interactive materials.',
      })}</p>

      <h2 className="sr-only">{t(ui.labels.ourBooks)}</h2>
      <div className="books-grid">
        {books.map((b) => (
          <Link key={b.id} to={`/book/${b.id}`} className="book-card card">
            <div className="book-cover">
              <img src={t(b.cover)} alt={t(b.title)} loading="lazy" onError={(e) => { e.currentTarget.style.opacity = 0 }} />
            </div>
            <div className="book-info">
              <h3>{t(b.title)}</h3>
              <span className="book-author">{t({ ar: 'تأليف', en: 'by' })} {t(b.author)}</span>
              <p>{t(b.blurb)}</p>
              <span className="book-open">{t(ui.actions.openBook)} →</span>
            </div>
          </Link>
        ))}
        <div className="book-card card ghost-card">
          <div className="soon">
            <span aria-hidden>➕</span>
            <p>{t({ ar: 'كتبٌ أخرى قريباً…', en: 'More books soon…' })}</p>
          </div>
        </div>
      </div>

      <BookConnections />
    </div>
  )
}
