import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../../context/AppContext.jsx'
import { ui } from '../../data/ui.js'
import { books } from '../../data/books.js'
import { buildBoard } from '../../lib/game/engine.js'
import { sfx, setMuted } from '../../lib/game/sfx.js'
import Icon from '../Icon.jsx'
import Board, { SQUARE } from './Board.jsx'
import GameCard from './GameCard.jsx'
import GameOver from './GameOver.jsx'
import { Token, Die, GameRules, TOKEN_COLORS, tokenLabels } from './parts.jsx'

const L = (ar, en) => ({ ar, en })

// How long the die tumbles, and how long a token takes over each square. The
// CSS transitions in game.css are tuned to these; change them together.
const ROLL_MS = 950
const HOP_MS = 240

/* What just happened to somebody, said in a line under the turn. */
function noticeText(n, players) {
  const name = players[n.player]?.name
  switch (n.kind) {
    case 'skip': return L(`${name} يفوّت هذه الجولة`, `${name} misses this turn`)
    case 'debt': return L(`سداد القرض: ${name} −${n.n}`, `Loan repaid: ${name} −${n.n}`)
    case 'again': return L(`${name} يرمي مرّةً أخرى`, `${name} rolls again`)
    case 'stolen': return L(`سُلبت نقطةٌ من ${name}`, `A point was taken from ${name}`)
    case 'gift': return L(`نقطةٌ هديّة إلى ${name}`, `A point given to ${name}`)
    case 'dare': return n.n
      ? L(`نجح ${name} في التحدّي +${n.n}`, `${name} passed the dare +${n.n}`)
      : L(`لم ينجح ${name} في التحدّي`, `${name} did not pass the dare`)
    case 'finished': return L(`وصل ${name} إلى النهاية +${n.n}`, `${name} reached the finish +${n.n}`)
    default: return L('', '')
  }
}

/*
 * THE STAGE — the game in play, on the whole window.
 *
 * Built to be SHARED ON A CALL: one dark table whatever the site's theme (video
 * compression is kindest to large light shapes on a dark ground, and a game
 * night should not look like a chapter), the board as large as the window
 * allows, and every control a host needs within one tap.
 *
 * The engine (lib/game/engine.js) knows the rules; this component knows TIME —
 * how long the die tumbles, how a token walks square by square — and tells the
 * engine only when something has finished. That split is what lets a refresh
 * land mid-turn without the game getting confused: `shown` (where the tokens
 * are DRAWN) starts equal to where they ARE, and an interrupted move simply
 * arrives.
 */
export default function GameStage({ state, dispatch, decks }) {
  const { t, lang, toggleLang } = useApp()
  const { players, turn, step, phase } = state
  const board = useMemo(
    () => buildBoard(state.seed, state.settings.length, state.settings.books),
    [state.seed, state.settings.length, state.settings.books],
  )
  const labels = useMemo(() => tokenLabels(players.map((p) => p.name)), [players])
  const colors = TOKEN_COLORS

  const [shown, setShown] = useState(() => players.map((p) => p.pos))
  const [rolling, setRolling] = useState(false)
  const [face, setFace] = useState(state.die || 1)
  const [spin, setSpin] = useState(0)
  const [quiet, setQuiet] = useState(false)
  const [dialog, setDialog] = useState(null) // 'rules' | 'exit' | null
  const [full, setFull] = useState(() => !!document.fullscreenElement)
  const rollTimer = useRef(null)

  /* ---- tokens walk; they do not teleport ----
     One square per tick toward wherever the engine says each token now is —
     forward after a roll, backward after a bad card, several tokens at once
     when a card moves everybody. When they have all arrived and the engine is
     waiting on a move, tell it so. */
  useEffect(() => {
    const target = players.map((p) => p.pos)
    if (shown.length !== target.length) { setShown(target); return undefined }
    if (shown.every((v, i) => v === target[i])) {
      if (step !== 'moving') return undefined
      const landed = setTimeout(() => dispatch({ type: 'arrive' }), HOP_MS + 120)
      return () => clearTimeout(landed)
    }
    const hop = setTimeout(() => {
      sfx.step()
      setShown((cur) => cur.map((v, i) => v + Math.sign(target[i] - v)))
    }, HOP_MS)
    return () => clearTimeout(hop)
  }, [shown, players, step, dispatch])

  /* A new board (play again) puts everyone back on the first square at once —
     walking forty squares backward would be a long, silly thing to watch. */
  useEffect(() => { setShown(players.map((p) => p.pos)) }, [state.seed]) // eslint-disable-line react-hooks/exhaustive-deps

  const roll = useCallback(() => {
    if (phase !== 'play' || step !== 'roll' || rolling || dialog) return
    const value = 1 + Math.floor(Math.random() * 6)
    setRolling(true)
    setFace(value)
    setSpin((n) => n + 1)
    sfx.roll()
    rollTimer.current = setTimeout(() => {
      setRolling(false)
      dispatch({ type: 'roll', value })
    }, ROLL_MS)
  }, [phase, step, rolling, dialog, dispatch])
  useEffect(() => () => clearTimeout(rollTimer.current), [])

  /* ---- sound follows the state, not the buttons ----
     So a card that arrives by itself (the timer running out) sounds the same as
     one that was tapped. */
  const cardId = state.card ? `${state.card.kind}|${state.card.id || ''}|${turn}|${state.round}` : ''
  useEffect(() => {
    if (!state.card) return
    if (step === 'card') (state.card.kind === 'luck' || state.card.kind === 'finish' ? sfx.luck : sfx.card)()
    else if (step === 'reveal') (state.card.right ? sfx.right : sfx.wrong)()
  }, [cardId, step]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (phase === 'over') sfx.win() }, [phase])

  const toggleQuiet = () => setQuiet((q) => { setMuted(!q); return !q })
  useEffect(() => () => setMuted(false), [])

  /* ---- the host's keyboard ----
     Space/Enter rolls or moves on; 1–4 pick an option. Never while a control
     has the focus — a focused button already answers Space itself, and doing
     both would roll twice. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || dialog) return
      if (e.target.closest?.('button, a, input, textarea, select')) return
      const card = state.card
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (phase !== 'play') return
        if (step === 'roll') roll()
        else if (step === 'reveal' || card?.kind === 'finish') dispatch({ type: 'next' })
        else if (step === 'card' && card?.kind === 'luck') dispatch({ type: 'apply' })
      } else if (/^[1-4]$/.test(e.key) && step === 'card' && card) {
        const n = Number(e.key) - 1
        if (card.kind === 'mcq' && n < card.order.length) dispatch({ type: 'answer', pick: n })
        else if (card.kind === 'tf' && n < 2) dispatch({ type: 'answer', pick: n === 0 })
        else if (card.kind === 'dare' && n < 2) dispatch({ type: 'judge', passed: n === 0 })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.card, step, phase, dialog, roll, dispatch])

  /* Keep the screen awake: a host running the game from a phone would otherwise
     have it dim and lock between turns. Best-effort — the API is missing in
     some browsers and refused in others, and the lock has to be asked for again
     whenever the tab comes back to the front. */
  useEffect(() => {
    let lock = null
    let gone = false
    const hold = async () => {
      try { lock = await navigator.wakeLock?.request('screen') } catch { lock = null }
      if (gone) lock?.release?.().catch(() => {})
    }
    const onShow = () => { if (document.visibilityState === 'visible') hold() }
    hold()
    document.addEventListener('visibilitychange', onShow)
    return () => {
      gone = true
      document.removeEventListener('visibilitychange', onShow)
      lock?.release?.().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const onChange = () => setFull(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])
  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else document.documentElement.requestFullscreen?.().catch(() => {})
  }

  const me = players[turn]
  const bookById = useMemo(() => new Map(books.map((b) => [b.id, b])), [])
  // The legend: only the kinds of square this board actually has.
  const legend = useMemo(() => {
    const seen = new Set(board.map((s) => (s.type === 'book' ? `book:${s.book}` : s.type)))
    return [
      ...state.settings.books.filter((b) => seen.has(`book:${b}`))
        .map((b) => ({ key: b, cls: 'is-book', book: bookById.get(b), icon: decks.icon[b], label: bookById.get(b).title })),
      ...['tf', 'luck', 'dare'].filter((k) => seen.has(k))
        .map((k) => ({ key: k, cls: `is-${k}`, icon: SQUARE[k].icon, label: SQUARE[k].label })),
    ]
  }, [board, state.settings.books, bookById, decks.icon])

  const showCard = phase === 'play' && state.card && (step === 'card' || step === 'reveal')

  return (
    <div className="gm-stage" lang={lang}>
      <header className="gm-top">
        <button type="button" className="gm-icon" onClick={() => setDialog('exit')}
          aria-label={t(L('إنهاء اللعبة', 'End the game'))}>
          <Icon name="✕" />
        </button>
        <div className="gm-top-title">
          <strong>{t(ui.game.title)}</strong>
          <span>{t(L(`الجولة ${state.round}`, `Round ${state.round}`))}{state.finisher != null && ` · ${t(L('الأخيرة', 'the last'))}`}</span>
        </div>
        <div className="gm-top-actions">
          <button type="button" className="gm-icon" onClick={toggleQuiet} aria-pressed={quiet}
            aria-label={t(quiet ? L('تشغيل الصوت', 'Turn sound on') : L('كتم الصوت', 'Mute'))}>
            <Icon name={quiet ? '🔇' : '🔊'} />
          </button>
          <button type="button" className="gm-icon is-text" onClick={toggleLang} aria-label={t(ui.actions.switchLangAria)}>
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
          {document.fullscreenEnabled && (
            <button type="button" className="gm-icon" onClick={toggleFull} aria-pressed={full}
              aria-label={t(L('ملء الشاشة', 'Full screen'))}>
              <Icon name="⛶" />
            </button>
          )}
          <button type="button" className="gm-icon" onClick={() => setDialog('rules')}
            aria-label={t(L('القواعد', 'Rules'))}>
            <Icon name="❓" />
          </button>
        </div>
      </header>

      <div className="gm-main">
        <ol className={`gm-scores n${players.length}`} aria-label={t(L('النتيجة', 'Scores'))}>
          {players.map((p, i) => (
            <li key={i} className={`gm-score ${i === turn && phase === 'play' ? 'is-turn' : ''} ${p.done ? 'is-done' : ''}`}
              aria-current={i === turn ? 'true' : undefined}>
              <Token color={colors[i]} label={labels[i]} />
              <span className="gm-score-name">{p.name}</span>
              {p.skip && <span className="gm-badge">{t(L('يفوّت', 'skips'))}</span>}
              {p.debt > 0 && <span className="gm-badge is-debt">{t(L(`دَين ${p.debt}`, `owes ${p.debt}`))}</span>}
              {p.done && <span className="gm-badge is-done"><Icon name="🏁" /></span>}
              <strong className="gm-score-n" key={p.score}>{p.score}</strong>
            </li>
          ))}
        </ol>

        <div className="gm-table">
          <Board board={board} players={players} shown={shown} turn={turn}
            labels={labels} colors={colors} decks={decks} />
          <ul className="gm-legend">
            {legend.map((k) => (
              <li key={k.key} className={k.cls} style={k.book ? { '--tone': k.book.tone?.from, '--tone-2': k.book.tone?.to } : undefined}>
                <span className="gm-legend-dot"><Icon name={k.icon} /></span> {t(k.label)}
              </li>
            ))}
          </ul>
        </div>

        <section className="gm-turn" aria-live="polite">
          <div className="gm-turn-who">
            <Token color={colors[turn]} label={labels[turn]} />
            <span>
              <small>{t(L('الدور على', 'Now playing'))}</small>
              <strong>{me?.name}</strong>
            </span>
          </div>
          {state.notices.length > 0 && (
            <ul className="gm-notices">
              {state.notices.map((n, i) => <li key={i}>{t(noticeText(n, players))}</li>)}
            </ul>
          )}
          <button type="button" className="gm-roll" onClick={roll}
            disabled={phase !== 'play' || step !== 'roll' || rolling}>
            <Die value={face} spin={spin} rolling={rolling} />
            <span className="gm-roll-label">
              {step === 'roll' && !rolling
                ? t(L('ارمِ النرد', 'Roll the die'))
                : rolling ? '…' : t(L(`${state.die ?? face}`, `${state.die ?? face}`))}
            </span>
          </button>
        </section>
      </div>

      {/* Everything that sits OVER the stage is portalled to <body>: the page
          wrapper animates a transform on arrival, and `position: fixed` inside a
          transformed ancestor is positioned against it, not the screen. */}
      {showCard && createPortal(
        <GameCard key={cardId} state={state} decks={decks} dispatch={dispatch}
          player={me} color={colors[turn]} label={labels[turn]} />,
        document.body,
      )}
      {phase === 'over' && !dialog && createPortal(
        <GameOver state={state} dispatch={dispatch} colors={colors} labels={labels} />,
        document.body,
      )}
      {dialog === 'rules' && createPortal(
        <div className="gm-overlay" role="dialog" aria-modal="true" aria-label={t(L('القواعد', 'Rules'))}
          onClick={(e) => { if (e.target === e.currentTarget) setDialog(null) }}>
          <article className="gm-card kind-rules">
            <h2>{t(L('قواعد اللعبة', 'How to play'))}</h2>
            <GameRules />
            <p className="gm-link-note">
              {t(L('اللعبة كلّها محفوظة في رابط هذه الصفحة: إن أُغلقت أو انقطع الاتّصال، افتح الرابط نفسه وأكمل من حيث توقّفت.',
                   'The whole game is kept in this page’s link: if it closes or the connection drops, open the same link and carry on where you stopped.'))}
            </p>
            <button type="button" className="gm-btn is-main" onClick={() => setDialog(null)} autoFocus>
              {t(L('نعود للّعب', 'Back to the game'))}
            </button>
          </article>
        </div>,
        document.body,
      )}
      {dialog === 'exit' && createPortal(
        <div className="gm-overlay" role="alertdialog" aria-modal="true" aria-label={t(L('إنهاء اللعبة', 'End the game'))}
          onClick={(e) => { if (e.target === e.currentTarget) setDialog(null) }}>
          <article className="gm-card kind-rules">
            <h2>{t(L('ننهي اللعبة؟', 'End the game?'))}</h2>
            <p className="gm-link-note">{t(L('تُمحى النتيجة وتعود إلى شاشة الإعداد بالأسماء نفسها.',
              'The score is cleared and you go back to the setup screen, with the same names.'))}</p>
            <div className="gm-over-actions">
              <button type="button" className="gm-btn is-main" onClick={() => setDialog(null)} autoFocus>
                {t(L('نكمل اللعب', 'Keep playing'))}
              </button>
              <button type="button" className="gm-btn is-danger" onClick={() => dispatch({ type: 'setup' })}>
                {t(L('إنهاء', 'End it'))}
              </button>
            </div>
          </article>
        </div>,
        document.body,
      )}
    </div>
  )
}
