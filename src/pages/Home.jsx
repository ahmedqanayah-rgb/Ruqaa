import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'
import { club } from '../data/club.js'

/*
 * The bilingual feature, shown rather than described.
 *
 * The hero already claims the site is «ثنائية اللغة», which a visitor has no
 * reason to believe and no way to picture. This puts the *same real sentence*
 * — the featured book's blurb, straight out of the book data — side by side in
 * both languages, each pane carrying its own `dir` and `lang` so it renders in
 * its true script, direction and typeface. The pane matching the current view
 * is lit; the other is the one you'd get by pressing the button, and the button
 * under it is the real site-wide toggle, not a demo of one.
 *
 * Known cost, accepted deliberately: an Arabic reader's Home now pulls the
 * Inter webfont (~48 kB) that `unicode-range` had been sparing them, because
 * the page finally contains Latin text. That is the price of the feature being
 * real rather than a claim — see CLAUDE.md § Fonts.
 */
function BilingualPreview({ book }) {
  const { t, lang, toggleLang } = useApp()
  if (!book?.blurb?.ar || !book?.blurb?.en) return null

  const panes = [
    { code: 'ar', dir: 'rtl', label: 'العربية', text: book.blurb.ar },
    { code: 'en', dir: 'ltr', label: 'English', text: book.blurb.en },
  ]

  return (
    <section className="bilingual">
      <h2>{t({ ar: 'كلّ حرفٍ هنا بلغتين', en: 'Every word here, in two languages' })}</h2>
      <p className="bilingual-lead">
        {t({
          ar: 'ليست ترجمةً آلية — كلّ قسمٍ ودراسةٍ وشكلٍ تفاعلي مكتوبٌ بالعربية والإنجليزية معاً. هذه فقرةٌ واحدة من الموقع، كما تظهر في كلٍّ منهما:',
          en: 'Not machine translation — every section, study and interactive figure is written in both Arabic and English. Here is one real paragraph from the site, as it appears in each:',
        })}
      </p>

      <div className="bi-panes">
        {panes.map((p) => (
          <div key={p.code} className="bi-pane" dir={p.dir} lang={p.code}
            data-current={p.code === lang ? '' : undefined}>
            <span className="bi-lang">{p.label}</span>
            <p className="bi-text">{p.text}</p>
          </div>
        ))}
      </div>

      <button className="btn bi-switch" onClick={toggleLang}>
        <span aria-hidden>🌐</span>{' '}
        {t({ ar: 'اقرأ الموقع كلّه بالإنجليزية', en: 'Read the whole site in Arabic' })}
      </button>
    </section>
  )
}

export default function Home() {
  const { t } = useApp()
  // Feature the season the club is actually reading — not whichever book
  // happens to sit first in the registry. club.seasons is the single source of
  // truth for that, so the front page can't drift from the About page.
  const currentId = club.seasons?.find((s) => s.status === 'current')?.bookId
  const featured = books.find((b) => b.id === currentId) || books[0]
  // Show up to three books in the sliding list, current one first; a "see all"
  // card follows so the rest are one tap away. The row scroll-snaps and is
  // RTL-aware (flex + dir).
  const ordered = featured ? [featured, ...books.filter((b) => b.id !== featured.id)] : books
  const shown = ordered.slice(0, 3)
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
          <Link className="btn primary" to={`/book/${featured.id}`}>
            📖 {t(featured.title)} →
          </Link>
          <Link className="btn" to="/books">{t(ui.nav.books)}</Link>
          <Link className="btn ghost" to="/about">{t(ui.nav.about)}</Link>
        </div>
      </section>

      <BilingualPreview book={featured} />

      <section className="books-section">
        <div className="section-head-row">
          <h2>{t(ui.labels.ourBooks)}</h2>
          <Link to="/books" className="see-all">{t(ui.labels.allBooks)} →</Link>
        </div>
        <div className="book-carousel" role="list">
          {shown.map((b) => (
            <Link key={b.id} to={`/book/${b.id}`} className="book-card card carousel-card" role="listitem">
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
    </div>
  )
}
