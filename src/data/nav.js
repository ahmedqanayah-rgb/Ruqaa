import { ui } from './ui.js'

/*
 * THE SITE'S FOUR DESTINATIONS — one list, read by the top bar (wide screens)
 * and the dock at the bottom of a phone (components/Navbar.jsx, Dock.jsx).
 *
 * Four, and they stay four. The bar used to carry a chip per book, which read
 * well with two books and stopped fitting at three; a club that adds a book
 * every season cannot navigate by a row that grows with it. Books are one
 * destination now, and the shelf behind it is where they are told apart.
 *
 * `isActive` is given the router's pathname. It is spelled out rather than left
 * to NavLink because «الكتب» has to stay lit inside any book (`/book/…`), which
 * is not a prefix of `/books`.
 */
export const destinations = [
  { to: '/', label: ui.nav.home, icon: '🏠', isActive: (p) => p === '/' },
  { to: '/books', label: ui.nav.books, icon: '📚', isActive: (p) => p === '/books' || p.startsWith('/book/') },
  { to: '/game', label: ui.nav.game, icon: '🎲', isActive: (p) => p.startsWith('/game') },
  { to: '/about', label: ui.nav.club, icon: '👥', isActive: (p) => p.startsWith('/about') },
]
