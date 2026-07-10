import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'

export default function Navbar({ onMenu }) {
  const { t, lang, theme, toggleLang, toggleTheme } = useApp()
  return (
    <header className="navbar">
      <button className="icon-btn only-mobile" onClick={onMenu} aria-label={t(ui.actions.openMenu)}>
        <span className="hamburger" aria-hidden>☰</span>
      </button>

      <Link to="/" className="brand">
        <img className="brand-logo" src="./images/logo.png" alt={t(ui.siteTitle)} />
        <span className="brand-text">
          <strong>{t(ui.siteTitle)}</strong>
          <small>{t(ui.siteTagline)}</small>
        </span>
      </Link>

      <div className="navbar-spacer" />

      <button className="pill-btn" onClick={toggleLang} aria-label={t(ui.actions.switchLangAria)}>
        <span aria-hidden>🌐</span> {t(ui.actions.switchLang)}
      </button>
      <button className="icon-btn" onClick={toggleTheme}
        aria-label={t(theme === 'light' ? ui.actions.darkMode : ui.actions.lightMode)}>
        {theme === 'light' ? '🌜' : '☀️'}
      </button>
    </header>
  )
}
