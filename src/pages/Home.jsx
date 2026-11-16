import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'
import { club } from '../data/club.js'
import { heroScene } from '../data/heroScene.js'
import HeroCinema from '../components/HeroCinema.jsx'
import BookPoster from '../components/BookPoster.jsx'
import DiceArt from '../components/DiceArt.jsx'

const L = (ar, en) => ({ ar, en })

/*
 * HOME IS A FRONT DOOR: the hero, the shelf, and the way into game night.
 *
 * It was cut down to the hero and the book row on 2026-08-03 at the club's
 * request ("simpler, not more explained"), and that rule still holds — nothing
 * here explains the site. The one addition since is the game's card, because a
 * thing the club plays together on a call needs a door on the page everyone
 * opens first. If something else ever wants to live here, something has to
 * leave.
 */
export default function Home() {
  const { t } = useApp()
  // Feature the season the club is actually reading — not whichever book
  // happens to sit first in the registry. club.seasons is the single source of
  // truth for that, so the front page can't drift from the About page.
  const currentId = club.seasons?.find((s) => s.status === 'current')?.bookId
  const featured = books.find((b) => b.id === currentId) || books[0]
  // Up to three posters, the current book first; «كلّ الكتب» in the heading
  // carries the rest. The row scroll-snaps on a phone and is RTL-aware.
  const ordered = featured ? [featured, ...books.filter((b) => b.id !== featured.id)] : books
  const shown = ordered.slice(0, 3)

  return (
    <div className="home">
      {/* The cinematic hero replaces the text hero when heroScene.enabled is
          true; `enabled: false` is the kill switch back to this one. */}
      {heroScene.enabled ? <HeroCinema /> : (
      <section className="hero">
        <span className="eyebrow">{t(ui.siteTagline)}</span>
        <h1>{t({ ar: 'نقرأ الكتاب… ثم نعيشه', en: 'We read the book… then we live it' })}</h1>
        <p className="hero-lead">
          {t({
            ar: 'نادي «رُقعة» للقراءة — نلتقي لنقرأ كتاباً مهمّاً ونناقشه معاً، ونصنع له ملخّصاتٍ تفاعلية ثنائية اللغة (عربي/إنجليزي).',
            en: 'The Ruqʿa reading club — we meet to read and discuss an important book together, and build interactive, bilingual (Arabic/English) materials for it.',
          })}
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to={`/book/${featured.id}`}>
            {t(featured.title)} <span className="arrow" aria-hidden>→</span>
          </Link>
          <Link className="btn" to="/books">{t(ui.nav.books)}</Link>
        </div>
      </section>
      )}

      <section className="shelf">
        <div className="section-head-row">
          <h2>{t(ui.labels.ourBooks)}</h2>
          <Link to="/books" className="see-all">
            {t(ui.labels.allBooks)} <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
        <div className="shelf-row" role="list">
          {shown.map((b) => (
            <div key={b.id} className="shelf-item" role="listitem">
              <BookPoster book={b} />
            </div>
          ))}
        </div>
      </section>

      <section className="game-promo-wrap">
        <Link to="/game" className="game-promo">
          <DiceArt className="game-promo-art" />
          <span className="game-promo-body">
            <span className="eyebrow">{t(L('لعبة النادي', 'The club game'))}</span>
            <strong className="game-promo-title">{t(ui.game.title)}</strong>
            <span className="game-promo-text">{t(ui.game.tagline)}</span>
            <span className="btn game-promo-cta">
              {t(ui.game.play)} <span className="arrow" aria-hidden>→</span>
            </span>
          </span>
        </Link>
      </section>
    </div>
  )
}
