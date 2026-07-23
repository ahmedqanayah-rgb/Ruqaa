import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { getBook } from '../data/books.js'
import { connections } from '../data/connections.js'
import RichText from './RichText.jsx'

/*
 * "Where our books meet" — the club's own synthesis across seasons, rendered on
 * the Books page. Each theme shows what each book says side by side, then what
 * the club takes from both.
 *
 * Book titles and links resolve through the registry, so a theme naming a book
 * that isn't registered simply drops out rather than rendering a dead link.
 */

const L = (ar, en) => ({ ar, en })

function Side({ side }) {
  const { t } = useApp()
  const book = getBook(side.bookId)
  if (!book) return null
  return (
    <div className="xbook-side">
      <span className="xbook-book">{t(book.title)}</span>
      <RichText as="p" value={side.says} />
      <Link className="xbook-link" to={`/book/${side.bookId}/${side.slug}`}>
        {t(L('اقرأ القسم', 'Read the section'))} →
      </Link>
    </div>
  )
}

export default function BookConnections() {
  const { t } = useApp()
  // Only show themes whose books are both actually registered.
  const items = connections.items.filter((it) => getBook(it.a.bookId) && getBook(it.b.bookId))
  if (!items.length) return null

  return (
    <section className="xbook">
      <h2>{t(connections.title)}</h2>
      <p className="xbook-lead">{t(connections.lead)}</p>

      {items.map((it, i) => (
        <article key={i} className={`xbook-card card ${it.caution ? 'caution' : ''}`}>
          <h3 className="xbook-theme">
            <span aria-hidden>{it.icon}</span> {t(it.theme)}
          </h3>
          <div className="xbook-sides">
            <Side side={it.a} />
            <span className="xbook-join" aria-hidden>↔</span>
            <Side side={it.b} />
          </div>
          <div className="xbook-synthesis">
            <strong>{t(L('ما نأخذه من الاثنين', 'What we take from both'))}</strong>
            <RichText as="p" value={it.synthesis} />
          </div>
        </article>
      ))}
    </section>
  )
}
