import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { destinations } from '../data/nav.js'
import Icon from './Icon.jsx'

/*
 * THE DOCK — the four destinations at the bottom of a phone, where a thumb is.
 *
 * Until this, a phone reached everything through a hamburger at the top of the
 * screen: one unlabelled glyph, in the corner furthest from the hand, hiding
 * the fact that the site had more than one book. Every app the members use all
 * day keeps its destinations in a bar at the bottom, so this one does too.
 *
 * It is the SAME floating pill as the in-book bar (`.section-bar`, the
 * previous / sections / next strip on a section page), and the two never show
 * together: reading a section, the pill is about the section; anywhere else it
 * is the site. The swap is CSS (`body:has(.section-bar) .dock`), so neither
 * component has to know about the other.
 *
 * Rendered by Layout at the root, never inside a page: `position: fixed` is not
 * viewport-relative inside a transformed ancestor, and every page wrapper
 * animates a translateY on arrival — the trap the in-book bar is portalled to
 * <body> to avoid.
 *
 * Hidden from 861px up, where the top bar carries the same four links.
 */
export default function Dock() {
  const { t } = useApp()
  const { pathname } = useLocation()
  return (
    <nav className="dock" aria-label={t({ ar: 'التنقّل الرئيسي', en: 'Main' })}>
      {destinations.map((d) => {
        const active = d.isActive(pathname)
        return (
          <Link key={d.to} to={d.to} className={`dock-link ${active ? 'active' : ''}`}
            aria-current={active ? 'page' : undefined}>
            <span className="dock-icon"><Icon name={d.icon} /></span>
            <span className="dock-label">{t(d.label)}</span>
          </Link>
        )
      })}
    </nav>
  )
}
