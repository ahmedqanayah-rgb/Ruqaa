import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'

/*
 * A club-branded result card, designed to be screenshotted into the club chat.
 *
 * Deliberately self-contained visually (logo + club name + book baked in) so a
 * cropped screenshot still says where it came from. Nothing is stored or sent:
 * "copy" writes plain text to the clipboard, "share" opens the OS share sheet
 * only where the browser provides one, and the user picks the target.
 */

const L = (ar, en) => ({ ar, en })

export default function ResultCard({
  icon = '🏅',
  title,          // {ar,en} — what was completed, e.g. "Sleep Assessment"
  bookTitle,      // {ar,en} — the book it belongs to
  score,          // number
  outOf,          // optional number → renders "87 / 122"
  suffix = '',    // optional unit, e.g. '%'
  bandLabel,      // {ar,en} — the qualitative band
  bandColor = 'var(--accent)',
  lines = [],     // optional {ar,en} highlights (kept to 3)
  children,       // optional extra actions rendered beside copy/share
}) {
  const { t, lang } = useApp()
  const [copied, setCopied] = useState(false)

  const scoreText = outOf != null ? `${score} / ${outOf}` : `${score}${suffix}`

  // Plain-text version for the clipboard / share sheet.
  const summary = [
    `${t(ui.siteTitle)} — ${t(ui.siteTagline)}`,
    `${t(title)} · ${t(bookTitle)}`,
    `${t(L('النتيجة', 'Score'))}: ${scoreText} — ${t(bandLabel)}`,
    ...lines.slice(0, 3).map((l) => `• ${t(l)}`),
    window.location.href,
  ].join('\n')

  /* Clipboard access fails in more cases than you'd expect (insecure origin,
     unfocused document, older mobile browsers). Try the modern API, fall back
     to the legacy textarea trick, and if both fail reveal the text so it can
     still be selected by hand — never leave the button doing nothing. */
  const copy = async () => {
    const flash = (state) => { setCopied(state); setTimeout(() => setCopied(false), 2600) }
    try {
      await navigator.clipboard.writeText(summary)
      flash('ok')
      return
    } catch { /* fall through */ }
    try {
      const ta = document.createElement('textarea')
      ta.value = summary
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      if (ok) { flash('ok'); return }
    } catch { /* fall through */ }
    setCopied('manual')
  }

  const share = async () => {
    try {
      await navigator.share({ title: `${t(ui.siteTitle)} — ${t(title)}`, text: summary })
    } catch {
      /* dismissed or unsupported — the copy button remains the fallback */
    }
  }

  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  return (
    <figure className="result-card" style={{ '--band': bandColor }} lang={lang}>
      <div className="result-card-head">
        <img className="result-card-logo" src="./images/logo.png" alt="" aria-hidden />
        <div className="result-card-brand">
          <strong>{t(ui.siteTitle)}</strong>
          <span>{t(ui.siteTagline)}</span>
        </div>
        <span className="result-card-icon" aria-hidden>{icon}</span>
      </div>

      <div className="result-card-body">
        <span className="result-card-title">{t(title)}</span>
        <span className="result-card-book">{t(bookTitle)}</span>
        <div className="result-card-score">
          <span className="result-card-num">{scoreText}</span>
          <span className="result-card-band">{t(bandLabel)}</span>
        </div>
        {lines.length > 0 && (
          <ul className="result-card-lines">
            {lines.slice(0, 3).map((l, i) => <li key={i}>{t(l)}</li>)}
          </ul>
        )}
      </div>

      {copied === 'manual' && (
        <textarea className="result-card-manual" readOnly value={summary} rows={4}
          aria-label={t(L('نصّ النتيجة — حدّده وانسخه', 'Result text — select and copy'))}
          onFocus={(e) => e.target.select()} />
      )}

      <figcaption className="result-card-foot">
        <button className="btn ghost result-card-btn" onClick={copy}>
          {copied === 'ok'
            ? `✓ ${t(L('نُسخت', 'Copied'))}`
            : copied === 'manual'
            ? `👆 ${t(L('حدّده وانسخه', 'Select and copy'))}`
            : `📋 ${t(L('انسخ النتيجة', 'Copy result'))}`}
        </button>
        {canShare && (
          <button className="btn ghost result-card-btn" onClick={share}>
            📤 {t(L('شارك', 'Share'))}
          </button>
        )}
        {children}
        <span className="result-card-hint">
          {t(L('أو التقط صورةً للبطاقة وشاركها في مجموعة النادي 📸',
               'Or screenshot this card and drop it in the club group 📸'))}
        </span>
      </figcaption>
    </figure>
  )
}
