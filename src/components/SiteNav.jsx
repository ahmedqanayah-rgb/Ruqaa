import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'
import Icon from './Icon.jsx'

const L = (ar, en) => ({ ar, en })

/*
 * The site map — the lower half of the header, on every page.
 *
 * Every top-level destination is a chip: home, each book, all books, the club.
 * Nothing is behind a menu, so a visitor never has to open the drawer to find
 * out the site has a second book. The chip for wherever they are is filled in
 * and carries `aria-current`, which is the "you are here" mark on the map.
 *
 * **One chip is the whole indicator, deliberately.** An earlier version added a
 * second line under the chips spelling out `book › section`. It was pure
 * duplication and cost 52px of every section page: its book half is the
 * highlighted chip directly above it, and its section half is repeated word for
 * word by the `<h1>` directly below. The old `.section-breadcrumb` in
 * `BookSection` is gone for the same reason — the chips replace it.
 *
 * Not sticky. It sits under the navbar as one block with it, and scrolls away:
 * pinning a second row would cost a phone 67px of *every* screen of reading on
 * top of the navbar's 62, and the navbar and in-book bar already hold both
 * edges. They can't share a single line either — measured at 375px the navbar
 * is 8px over-full before any chip is added, and the chips need 562px.
 */
export default function SiteNav() {
  const { t } = useApp()
  useLocation() // re-render on navigation so NavLink recomputes its active chip

  const chip = ({ isActive }) => `sitenav-chip ${isActive ? 'active' : ''}`

  return (
    <nav className="sitenav" aria-label={t(L('خريطة الموقع', 'Site map'))}>
      <div className="sitenav-row">
        <NavLink to="/" end className={chip}>
          <Icon name="🏠" /> {t(ui.nav.home)}
        </NavLink>
        {books.map((b) => (
          <NavLink key={b.id} to={`/book/${b.id}`} className={chip}>
            <Icon name="📖" /> {t(b.title)}
          </NavLink>
        ))}
        <NavLink to="/books" end className={chip}>
          <Icon name="📚" /> {t(ui.labels.allBooks)}
        </NavLink>
        <NavLink to="/about" className={chip}>
          <Icon name="ℹ️" /> {t(ui.nav.about)}
        </NavLink>
      </div>

    </nav>
  )
}
