import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { ui } from '../../data/ui.js'
import { ranking } from '../../lib/game/engine.js'
import Icon from '../Icon.jsx'
import { Token } from './parts.jsx'

const L = (ar, en) => ({ ar, en })

/* Forty paper scraps for the winner. Positions are rolled once per mount (so a
   re-render does not reshuffle them mid-fall) and everything else is CSS. The
   site's single reduced-motion rule in global.css cuts the animation to nothing
   for anyone who asked for less motion. */
function Confetti({ colors }) {
  const bits = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.6,
    time: 2.6 + Math.random() * 2.2,
    turn: Math.random() * 360,
    color: colors[i % colors.length],
  })), [colors])
  return (
    <div className="gm-confetti" aria-hidden>
      {bits.map((b, i) => (
        <i key={i} style={{
          left: `${b.left}%`, background: b.color,
          animationDelay: `${b.delay}s`, animationDuration: `${b.time}s`,
          transform: `rotate(${b.turn}deg)`,
        }} />
      ))}
    </div>
  )
}

/*
 * THE END: who won, and everyone's score, on one screen the host can leave up
 * while the room argues about it.
 *
 * A tie is a tie — two names under the crown — because the ranking does not
 * break one by the order people happened to be typed in (see `ranking`).
 *
 * «انسخ النتيجة» copies plain text for the club's chat. Same three-step
 * fallback as ResultCard, for the same reason: the clipboard API fails on more
 * devices than you would think, and a button that silently does nothing is the
 * worst outcome — the last step shows the text to be selected by hand.
 */
export default function GameOver({ state, dispatch, colors, labels }) {
  const { t } = useApp()
  const [copied, setCopied] = useState(false)
  const order = useMemo(() => ranking(state.players), [state.players])
  const winners = order.filter((p) => p.winner)
  const top = Math.max(1, order[0].score)

  const summary = [
    `${t(ui.game.title)} — ${t(ui.siteTitle)}`,
    `${t(winners.length > 1 ? L('تعادل', 'A tie') : L('الفائز', 'Winner'))}: ${winners.map((p) => p.name).join(t(L(' و', ' & ')))}`,
    ...order.map((p, i) => `${i + 1}. ${p.name} — ${p.score}`),
    `${window.location.origin}${window.location.pathname}#/game`,
  ].join('\n')

  const copy = async () => {
    const flash = (v) => { setCopied(v); if (v === 'ok') setTimeout(() => setCopied(false), 2400) }
    try { await navigator.clipboard.writeText(summary); flash('ok'); return } catch { /* fall through */ }
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
    flash('manual')
  }

  return (
    <div className="gm-overlay is-over" role="dialog" aria-modal="true" aria-label={t(L('النتيجة', 'The result'))}>
      <Confetti colors={colors} />
      <article className="gm-card kind-over">
        <div className="gm-crown"><Icon name="👑" /></div>
        <p className="gm-over-label">
          {t(winners.length > 1 ? L('تعادلٌ على القمّة', 'A tie at the top') : L('الفائز', 'The winner'))}
        </p>
        <h2 className="gm-over-name">
          {winners.map((p) => p.name).join(t(L(' و', ' & ')))}
        </h2>

        <ol className="gm-final">
          {order.map((p) => (
            <li key={p.index} className={p.winner ? 'is-winner' : ''}>
              <Token color={colors[p.index]} label={labels[p.index]} />
              <span className="gm-final-name">{p.name}</span>
              <span className="gm-final-bar" aria-hidden>
                <i style={{ width: `${(p.score / top) * 100}%`, background: colors[p.index] }} />
              </span>
              <strong className="gm-final-score">{p.score}</strong>
            </li>
          ))}
        </ol>

        {copied === 'manual' && (
          <textarea className="gm-manual" readOnly value={summary} rows={order.length + 3}
            aria-label={t(L('نصّ النتيجة — حدّده وانسخه', 'Result text — select and copy'))}
            onFocus={(e) => e.target.select()} />
        )}

        <div className="gm-over-actions">
          <button type="button" className="gm-btn is-main"
            onClick={() => dispatch({ type: 'again', seed: Math.floor(Math.random() * 0xffffffff) })}>
            <Icon name="↻" /> {t(L('جولةٌ أخرى', 'Play again'))}
          </button>
          <button type="button" className="gm-btn" onClick={copy}>
            <Icon name={copied === 'ok' ? '✓' : '📋'} /> {t(copied === 'ok' ? L('نُسخت', 'Copied') : L('انسخ النتيجة', 'Copy the result'))}
          </button>
          <button type="button" className="gm-btn" onClick={() => dispatch({ type: 'setup' })}>
            {t(L('لاعبون أو كتبٌ أخرى', 'Change players or books'))}
          </button>
        </div>
      </article>
    </div>
  )
}
