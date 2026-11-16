import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { destinations } from '../data/nav.js'
import Icon from './Icon.jsx'

/*
 * THE TOP BAR. Brand at the start, the four destinations in the middle, the
 * controls at the end.
 *
 * The destinations show here from 861px up. Below that the bar cannot hold them
 * — measured at 375px it was already over-full with the brand and three
 * controls — so a phone gets them in the dock at the bottom of the screen
 * instead (Dock.jsx), where a thumb reaches, and this bar keeps only the brand
 * and the controls.
 *
 * `inBook` adds the contents button on phones. Outside a book there is nothing
 * left for a drawer to hold (the dock has the destinations), so the hamburger
 * exists only where it means one thing: this book's sections.
 */
export default function Navbar({ onMenu, onSearch, inBook }) {
  const { t, theme, toggleLang, toggleTheme, togglePresenting } = useApp()
  const { pathname } = useLocation()
  // Show the platform's own modifier so the hint doesn't lie on Windows.
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '')
  return (
    <header className="navbar">
      {inBook && (
        <button className="icon-btn only-mobile" onClick={onMenu} aria-label={t(ui.actions.bookMenu)}>
          <Icon name="☰" className="hamburger" />
        </button>
      )}

      <Link to="/" className="brand">
        <img className="brand-logo" src="./images/logo.png" alt={t(ui.siteTitle)} />
        <span className="brand-text">
          <strong>{t(ui.siteTitle)}</strong>
          <small>{t(ui.siteTagline)}</small>
        </span>
      </Link>

      <nav className="topnav" aria-label={t({ ar: 'التنقّل الرئيسي', en: 'Main' })}>
        {destinations.map((d) => {
          const active = d.isActive(pathname)
          return (
            <Link key={d.to} to={d.to} className={`topnav-link ${active ? 'active' : ''}`}
              aria-current={active ? 'page' : undefined}>
              <Icon name={d.icon} /> {t(d.label)}
            </Link>
          )
        })}
      </nav>

      <div className="nav-actions">
        <button className="search-btn" onClick={onSearch} aria-label={t(ui.actions.search)}>
          <Icon name="🔍" />
          <span className="search-btn-label">{t(ui.actions.search)}</span>
          <kbd aria-hidden>{isMac ? '⌘' : 'Ctrl '}K</kbd>
        </button>
        <button className="pill-btn" onClick={toggleLang} aria-label={t(ui.actions.switchLangAria)}>
          <Icon name="🌐" /> {t(ui.actions.switchLang)}
        </button>
        <button className="icon-btn" onClick={toggleTheme}
          aria-label={t(theme === 'light' ? ui.actions.darkMode : ui.actions.lightMode)}>
          <Icon name={theme === 'light' ? '🌜' : '☀️'} />
        </button>
        <button className="icon-btn not-mobile" onClick={togglePresenting}
          aria-label={t(ui.actions.present)} title={t(ui.actions.present)}>
          <Icon name="📽️" />
        </button>
      </div>
    </header>
  )
}
