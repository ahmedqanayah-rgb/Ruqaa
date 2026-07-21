import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { searchAll } from '../data/searchIndex.js'

/*
 * ⌘K / Ctrl-K search over every section and study in every book.
 *
 * Open/close state lives in Layout so the navbar button and the shortcut drive
 * the same instance. Results are computed synchronously — the index is small
 * and already in memory, so there is no debounce or async state to manage.
 */

const L = (ar, en) => ({ ar, en })

export default function SearchPalette({ open, onClose }) {
  const { t, lang, dir } = useApp()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(() => searchAll(q, lang), [q, lang])

  // Reset and focus each time it opens.
  useEffect(() => {
    if (!open) return
    setQ('')
    setActive(0)
    // Focus after paint so the autoFocus/transition doesn't fight it.
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [open])

  useEffect(() => { setActive(0) }, [q])

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    if (!open) return
    listRef.current?.querySelector('.sp-hit.active')?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  /* Escape at the window level, not just on the input — otherwise clicking into
     the results list (which blurs the input) would strand the palette open. */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      // Both this and Layout's shortcut handler sit on window, so plain
      // stopPropagation wouldn't reach it — Esc must close only the palette.
      e.stopImmediatePropagation()
      onClose()
    }
    window.addEventListener('keydown', onKey, true)   // capture: run before the global shortcuts
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open, onClose])

  if (!open) return null

  const go = (item) => {
    if (!item) return
    navigate(item.to)
    onClose()
  }

  const onKeyDown = (e) => {
    // Escape is handled at the window level above, so it works unfocused too.
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); return }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); return }
    if (e.key === 'Enter') { e.preventDefault(); go(results[active]) }
  }

  return (
    <div className="sp-backdrop" onMouseDown={onClose} role="presentation">
      <div
        className="sp-panel"
        dir={dir}
        role="dialog"
        aria-modal="true"
        aria-label={t(L('البحث في الموقع', 'Search the site'))}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="sp-inputrow">
          <span className="sp-icon" aria-hidden>🔍</span>
          <input
            ref={inputRef}
            className="sp-input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t(L('ابحث عن قسمٍ أو دراسة…', 'Search sections and studies…'))}
            aria-label={t(L('البحث', 'Search'))}
            aria-controls="sp-results"
            autoComplete="off"
          />
          <kbd className="sp-esc">esc</kbd>
        </div>

        <div className="sp-results" id="sp-results" ref={listRef} role="listbox">
          {q.trim().length < 2 ? (
            <p className="sp-empty">
              {t(L('اكتب حرفين على الأقل — ابحث في كلّ الأقسام والدراسات.',
                   'Type at least two characters — searches every section and study.'))}
            </p>
          ) : results.length === 0 ? (
            <p className="sp-empty">
              {t(L('لا نتائج. جرّب كلمةً أخرى، أو باللغة الأخرى.',
                   'No results. Try another word, or the other language.'))}
            </p>
          ) : (
            results.map((r, i) => (
              <button
                key={r.id}
                className={`sp-hit ${i === active ? 'active' : ''}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => go(r)}
              >
                <span className="sp-hit-icon" aria-hidden>{r.icon}</span>
                <span className="sp-hit-text">
                  <span className="sp-hit-title">{t(r.title)}</span>
                  <span className="sp-hit-sub">{t(r.subtitle)}</span>
                </span>
                <span className="sp-hit-meta">
                  <span className="sp-hit-kind">{t(r.kindLabel)}</span>
                  <span className="sp-hit-book">{t(r.bookTitle)}</span>
                </span>
              </button>
            ))
          )}
        </div>

        <div className="sp-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> {t(L('تنقّل', 'navigate'))}</span>
          <span><kbd>↵</kbd> {t(L('افتح', 'open'))}</span>
          <span className="sp-foot-count">
            {results.length > 0 && `${results.length} ${t(L('نتيجة', 'results'))}`}
          </span>
        </div>
      </div>
    </div>
  )
}
