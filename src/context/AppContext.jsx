import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

/*
 * Single provider for the two global concerns: language (which drives text
 * direction) and theme. State is kept in memory only — no localStorage per
 * project constraints. Defaults: Arabic (RTL) + light.
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
  const [theme, setTheme] = useState('light') // 'light' | 'dark'
  // Sections read this sitting, as "bookId/slug" keys. In-memory only (no
  // localStorage per project constraints), so it resets on refresh by design.
  const [visited, setVisited] = useState(() => new Set())

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

  const toggleLang = useCallback(() => setLang(l => (l === 'ar' ? 'en' : 'ar')), [])
  const toggleTheme = useCallback(() => setTheme(t => (t === 'light' ? 'dark' : 'light')), [])
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
    () => ({ lang, dir, theme, isAr: lang === 'ar', setLang, setTheme, toggleLang, toggleTheme, t, visited, markVisited }),
    [lang, dir, theme, toggleLang, toggleTheme, t, visited, markVisited]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
