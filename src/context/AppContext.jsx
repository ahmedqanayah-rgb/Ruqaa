import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

/*
 * Single provider for the two global concerns: language (which drives text
 * direction) and theme. State is kept in memory only — no localStorage per
 * project constraints. Defaults: Arabic (RTL) + light.
 */

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('ar')      // 'ar' | 'en'
  const [theme, setTheme] = useState('light') // 'light' | 'dark'

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  // Reflect language/direction/theme onto <html> so CSS + a11y follow.
  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
    html.setAttribute('data-theme', theme)
  }, [lang, dir, theme])

  const toggleLang = useCallback(() => setLang(l => (l === 'ar' ? 'en' : 'ar')), [])
  const toggleTheme = useCallback(() => setTheme(t => (t === 'light' ? 'dark' : 'light')), [])

  // t(): pick a field from a {ar, en} object, or return a bare string as-is.
  const t = useCallback(
    (obj) => {
      if (obj == null) return ''
      if (typeof obj === 'string') return obj
      return obj[lang] ?? obj.en ?? obj.ar ?? ''
    },
    [lang]
  )

  const value = useMemo(
    () => ({ lang, dir, theme, isAr: lang === 'ar', setLang, setTheme, toggleLang, toggleTheme, t }),
    [lang, dir, theme, toggleLang, toggleTheme, t]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
