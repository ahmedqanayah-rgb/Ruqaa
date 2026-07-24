import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

/*
 * Single provider for the two global concerns: language (which drives text
 * direction) and theme. State is kept in memory only — no localStorage per
 * project constraints. Defaults: Arabic (RTL); theme follows the device's
 * prefers-color-scheme (see the theme init below for why).
 */

const AppContext = createContext(null)

// The Arabic version should show Western digits (0-9) — what users call "Arabic
// numbers" — instead of the Eastern Arabic-Indic digits (٠-٩) used in the source
// content. Also normalise the Arabic percent/decimal/thousands separators.
function toWesternDigits(s) {
  return s
    .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48))
    .replace(/٪/g, '%')
    .replace(/٫/g, '.')
    .replace(/٬/g, ',')
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState('ar')      // 'ar' | 'en'
  // Default the theme to the device's preferred scheme. This is the fix for
  // phones whose browser force-darkens light web content: by opening in our own
  // dark theme (which declares color-scheme:dark), the browser sees an
  // already-dark page and leaves it alone — so members get the clean designed
  // dark theme instead of a mangled force-inverted light one. A light-mode
  // device / PC still opens light, and the toggle still works either way. No
  // website can render *white* on a device that force-darks web content, so
  // matching that device is the best achievable result there.
  const prefersDark = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light') // 'light' | 'dark'
  // Presentation mode: chrome hidden and type scaled up, for projecting the
  // site during club sessions. In-memory like everything else.
  const [presenting, setPresenting] = useState(false)
  // Sections read this sitting, as "bookId/slug" keys. In-memory only (no
  // localStorage per project constraints), so it resets on refresh by design.
  const [visited, setVisited] = useState(() => new Set())
  // Ticked days of a book's 7-day challenge, as "bookId/n". Same deal: in
  // memory, so it survives navigation within a sitting but not a refresh.
  const [challengeDone, setChallengeDone] = useState(() => new Set())

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  // Reflect language/direction/theme onto <html> so CSS + a11y follow.
  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
    html.setAttribute('data-theme', theme)
    // Keep the mobile browser chrome (address bar) in sync with the page bg.
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = getComputedStyle(html).getPropertyValue('--bg').trim()
  }, [lang, dir, theme])

  // Reflect presentation mode onto <html> so CSS alone can restyle the shell.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-presenting', presenting)
  }, [presenting])

  const toggleLang = useCallback(() => setLang(l => (l === 'ar' ? 'en' : 'ar')), [])
  const toggleTheme = useCallback(() => setTheme(t => (t === 'light' ? 'dark' : 'light')), [])
  const togglePresenting = useCallback(() => setPresenting(p => !p), [])
  const toggleChallengeDay = useCallback((bookId, n) => {
    setChallengeDone(d => {
      const key = `${bookId}/${n}`
      const next = new Set(d)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }, [])
  const markVisited = useCallback((bookId, slug) => {
    setVisited(v => {
      const key = `${bookId}/${slug}`
      if (v.has(key)) return v
      const next = new Set(v); next.add(key); return next
    })
  }, [])

  // t(): pick a field from a {ar, en} object, or return a bare string as-is.
  const t = useCallback(
    (obj) => {
      if (obj == null) return ''
      const val = typeof obj === 'string' ? obj : (obj[lang] ?? obj.en ?? obj.ar ?? '')
      return lang === 'ar' ? toWesternDigits(val) : val
    },
    [lang]
  )

  const value = useMemo(
    () => ({
      lang, dir, theme, isAr: lang === 'ar', setLang, setTheme, toggleLang, toggleTheme,
      presenting, setPresenting, togglePresenting, t, visited, markVisited,
      challengeDone, toggleChallengeDay,
    }),
    [lang, dir, theme, toggleLang, toggleTheme, presenting, togglePresenting, t, visited, markVisited,
     challengeDone, toggleChallengeDay]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
