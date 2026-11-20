import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { ui } from '../../data/ui.js'
import Icon from '../Icon.jsx'
import { standings, actingHost } from '../../lib/game/engine.js'
import { questionList, restOf, restSearch } from '../../lib/game/questions.js'
import { L, Token, TOKEN_COLORS, copyText } from './parts.jsx'

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
        <i key={i} style={{ left: `${b.left}%`, background: b.color, animationDelay: `${b.delay}s`, animationDuration: `${b.time}s`, transform: `rotate(${b.turn}deg)` }} />
      ))}
    </div>
  )
}

/* The evening's titles, from the four tallies the engine keeps per player
   (`st`: right answers, fastest answers, players fooled, lab wins). A title
   goes to the clear leader of its tally, and only if they earned it at all. */
const TITLES = [
  { k: 0, icon: '📖', name: L('دودة الكتب', 'Bookworm'), why: L('أكثر الإجابات الصحيحة', 'most right answers') },
  { k: 1, icon: '⚡', name: L('الأسرع', 'Quickest draw'), why: L('أكثر من أجاب أوّلاً وأصاب', 'most first right answers') },
  { k: 2, icon: '🎭', name: L('سيّد الكذب الأبيض', 'Master of the white lie'), why: L('خدع أكثر اللاعبين', 'fooled the most players') },
  { k: 3, icon: '🧪', name: L('بطل المختبر', 'Lab champion'), why: L('فاز بأكثر جولات المختبر', 'won the most Lab rounds') },
]

export default function GameOver({ room, core, me, labels, decks }) {
  const { t } = useApp()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(null)
  /* The questions this game did not get to (the club, 2026-11-20: "after the
     game ends … an option to answer the rest of the questions that we didn't
     get in the game") — the same list on every phone at the table, since the
     game is (lib/game/questions.js). Going there leaves the room. */
  const rest = useMemo(() => questionList(decks, restOf(core, decks)).length, [core, decks])
  const answerRest = () => {
    room.setMine({ left: true })
    setTimeout(() => navigate(`/game/questions?${restSearch(core, decks)}`), 250)
  }
  const rows = useMemo(() => standings(core.players.filter((p) => !p.gone)), [core.players])
  // Token letters are indexed by the room's player list, not by the ranking.
  const labelOf = (id) => labels[core.players.findIndex((p) => p.id === id)] ?? ''
  const winners = rows.filter((r) => r.rank === 0)
  const isHost = actingHost(core, room.env()) === me
  const asked = room.snapshot().entries[me]?.d?.again === core.g
  const LAST = core.last

  const titles = TITLES.map((title) => {
    const best = Math.max(0, ...rows.map((r) => r.st[title.k]))
    const holders = rows.filter((r) => r.st[title.k] === best)
    return best > 0 && holders.length === 1 ? { ...title, who: holders[0], n: best } : null
  }).filter(Boolean)

  const summary = [
    `${t(ui.game.title)} — ${t(ui.siteTitle)}`,
    `${t(winners.length > 1 ? L('تعادل', 'A tie') : L('الفائز', 'Winner'))}: ${winners.map((p) => p.name).join(t(L(' و', ' & ')))}`,
    ...rows.map((r) => `${r.rank + 1}. ${r.name} — ${t(L('الخانة', 'square'))} ${Math.min(LAST, r.pos)}/${LAST}`),
    ...titles.map((title) => `${t(title.name)}: ${title.who.name}`),
  ].join('\n')

  return (
    <div className="gm-over">
      <Confetti colors={winners.map((w) => TOKEN_COLORS[w.c]).concat(['#f2c45a', '#fbf8f2'])} />
      <div className="gm-over-card">
        <Icon name="🏆" />
        <p className="gm-over-label">{t(winners.length > 1 ? L('تعادل!', 'A tie!') : L('الفائز', 'The winner'))}</p>
        <h1 className="gm-over-name"><bdi>{winners.map((w) => w.name).join(t(L(' و', ' & ')))}</bdi></h1>

        <ol className="gm-final">
          {rows.map((r) => (
            <li key={r.id} className={r.rank === 0 ? 'is-winner' : ''}>
              <span className="gm-final-rank" dir="ltr">{r.rank + 1}</span>
              <Token color={TOKEN_COLORS[r.c]} label={labelOf(r.id)} />
              <bdi className="gm-final-name">{r.id === me ? t(L('أنت', 'You')) : r.name}</bdi>
              <span className="gm-final-bar"><i style={{ width: `${(Math.min(LAST, r.pos) / LAST) * 100}%`, background: TOKEN_COLORS[r.c] }} /></span>
              <span className="gm-final-score" dir="ltr">{Math.min(LAST, r.pos)}</span>
            </li>
          ))}
        </ol>

        {titles.length > 0 && (
          <ul className="gm-titles">
            {titles.map((title) => (
              <li key={title.k}>
                <Icon name={title.icon} />
                <span><strong>{t(title.name)}</strong> <bdi>{title.who.name}</bdi><small> — {t(title.why)} (<span dir="ltr">{title.n}</span>)</small></span>
              </li>
            ))}
          </ul>
        )}

        <div className="gm-over-actions">
          {isHost
            ? <button type="button" className="gm-btn is-main" disabled={asked} onClick={() => room.setMine({ again: core.g })}><Icon name="↻" /> {t(L('جولةٌ أخرى', 'Play again'))}</button>
            : <p className="gm-muted-dark">{t(L('المضيف يقرّر إن كانت هناك جولةٌ أخرى.', 'The host decides whether there is another game.'))}</p>}
          {rest > 0 && (
            <button type="button" className="gm-btn" onClick={answerRest}>
              <Icon name="📚" /> {t(L(`أجيبوا عن بقية الأسئلة (${rest})`, `Answer the rest of the questions (${rest})`))}
            </button>
          )}
          <button type="button" className="gm-btn" onClick={async () => setCopied((await copyText(summary)) ? 'ok' : 'manual')}>
            <Icon name="📋" /> {t(copied === 'ok' ? L('نُسخت', 'Copied') : L('انسخ النتيجة', 'Copy the result'))}
          </button>
          <button type="button" className="gm-btn" onClick={() => { room.setMine({ left: true }); setTimeout(() => navigate('/game'), 250) }}>
            <Icon name="🚪" /> {t(L('اخرج', 'Leave'))}
          </button>
        </div>
        {copied === 'manual' && <textarea className="gm-manual" readOnly rows={6} value={summary} onFocus={(e) => e.target.select()} />}
      </div>
    </div>
  )
}
