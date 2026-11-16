import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'
import BookPoster from '../components/BookPoster.jsx'
import BookConnections from '../components/BookConnections.jsx'

export default function Books() {
  const { t } = useApp()
  return (
    <div className="wide-page books-page">
      <header className="page-head">
        {/* No eyebrow here: on the other pages it labels the page with
            something the h1 doesn't already say (the book landing's «كتاب»
            above a title), but here it would read «الكتب» directly above
            «الكتب». */}
        <h1>{t({ ar: 'الكتب', en: 'Books' })}</h1>
        <p className="page-lead">{t({
          ar: 'كتب النادي — كتابٌ في كلّ موسم. اختر كتاباً لتفتح موادّه التفاعلية.',
          en: 'The club’s books — one each season. Pick a book to open its interactive materials.',
        })}</p>
      </header>

      <h2 className="sr-only">{t(ui.labels.ourBooks)}</h2>
      <div className="poster-grid">
        {books.map((b) => <BookPoster key={b.id} book={b} />)}
        <div className="poster poster-ghost" aria-hidden={false}>
          <span className="poster-ghost-plus" aria-hidden>+</span>
          <p>{t({ ar: 'كتاب الموسم القادم…', en: 'Next season’s book…' })}</p>
        </div>
      </div>

      <BookConnections />
    </div>
  )
}
