import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { books } from '../../data/books.js'
import { GAME_ART, zoneBand } from '../../data/gameArt.js'
import Icon from '../Icon.jsx'
import { LAST, zoneOf } from '../../lib/game/board.js'
import { T, turnPlayer, answersNow, expected, slotOf } from '../../lib/game/engine.js'
import { sfx, setMuted } from '../../lib/game/sfx.js'
import Board from './Board.jsx'
import DieThrow from './DieThrow.jsx'
import Challenge from './Challenge.jsx'
import Result from './Result.jsx'
import GameOver from './GameOver.jsx'
import Rules from './Rules.jsx'
import { L, Die, Token, TOKEN_COLORS, tokenLabels, useNow, KIND, MINI, KindHead, prettyCode } from './parts.jsx'

/*
 * THE GAME, ON ONE PHONE. The same board on every phone; under it, whose turn
 * it is and the die; over it, when the square asks for it, the round everyone
 * plays at once — and then its result.
 *
 * TIME IS THE ROOM'S. Every "is it time yet?" here reads `useNow(room)`, the
 * mailbox's clock as estimated by net.js, never this phone's own — so six
 * phones with six wrong clocks still show the die land, the card turn and the
 * timer run out together. The engine records WHEN things happened (`rolledAt`,
 * a challenge's `t0`), and this file only decides what to draw at that moment:
 *
 *   rolledAt ──die thrown── (debt collected) ──token walks── landed ──card── t0 ──round── t1
 *
 * The overlays are portalled to <body> — the `position: fixed`-inside-a-
 * transform trap the site's in-book bar already avoids.
 */

/* Where each token should be DRAWN at `now` (Board walks them there a square
   at a time). */
function targetsAt(core, now) {
  const P = core.players
  const pos = P.map((p) => p.pos)
  if (core.phase === 'roll' || !core.rolledAt) return pos
  const i = core.turn
  const to = core.res?.pre ? core.res.pre[i] : core.players[i].pos
  const landed = core.rolledAt + T.dice + (core.repay ? T.repay : 0) + Math.max(0, to - core.from) * T.hop
  const res = core.res
  // Results move tokens after a beat, so the room sees the answer first.
  if (core.phase === 'reveal' && res?.pre) {
    const settle = res.k === 'luck' ? core.t + 1600 : core.t + 1200
    if (now < settle) res.pre.forEach((p, k) => { if (k < pos.length) pos[k] = p })
  }
  if (now < core.rolledAt + T.dice) pos[i] = core.was ?? pos[i]
  else if (core.repay && now < core.rolledAt + T.dice + T.repay) pos[i] = core.from
  else if (core.phase === 'reveal' && res?.k === 'luck' && now < landed) pos[i] = res.pre[i]
  return pos
}

/* Which overlay is up at `now`. */
function sheetAt(core, now) {
  const ch = core.ch
  if (core.phase === 'play') {
    const landed = ch.t0 - T.card
    if (now < landed) return null
    return now < ch.t0 ? 'landed' : 'challenge'
  }
  if (core.phase === 'reveal') return core.res.k === 'luck' && now < core.t ? null : 'result'
  if (core.phase === 'over') return now < core.t ? null : 'over'
  return null
}

/* Keep the screen awake while a game is on: a phone that dims in the middle of
   a forty-minute game on a call is the most likely way to lose a player. */
function useWakeLock() {
  useEffect(() => {
    let lock = null
    let gone = false
    const ask = async () => {
      try { if (document.visibilityState === 'visible' && navigator.wakeLock) lock = await navigator.wakeLock.request('screen') } catch { /* not offered: fine */ }
      if (gone && lock) lock.release().catch(() => {})
    }
    ask()
    document.addEventListener('visibilitychange', ask)
    return () => { gone = true; document.removeEventListener('visibilitychange', ask); lock?.release().catch(() => {}) }
  }, [])
}

/* A nudge when the game is waiting for YOU — for a laptop where the game is one
   tab among several (the call in another): the tab's title says so, and an
   Android phone gives one short buzz. */
function useNudge(text) {
  useEffect(() => {
    if (!text) return undefined
    const was = document.title
    document.title = `${text} — ${was}`
    try { navigator.vibrate?.(70) } catch { /* not offered: fine */ }
    return () => { document.title = was }
  }, [text])
}

function LandedCard({ core, decks }) {
  const { t } = useApp()
  const ch = core.ch
  const info = ch.k === 'mini' ? MINI[ch.id] : KIND[ch.k]
  const mover = turnPlayer(core)
  return (
    <div className={`gm-landed tone-${KIND[ch.k].tone}`}>
      <KindHead ch={ch} decks={decks} books={books} />
      <p className="gm-landed-who">{t(L(`${mover.name} وقف على هذه الخانة — والجولة للجميع:`, `${mover.name} landed here — and the round is for everyone:`))}</p>
      {info.how && <p className="gm-landed-how">{t(info.how)}</p>}
    </div>
  )
}

export default function Stage({ room, snap, me, decks, code }) {
  const { t } = useApp()
  const navigate = useNavigate()
  const now = useNow(room, 200)
  const { core, entries } = snap
  const [mute, setMute] = useState(false)
  const [dialog, setDialog] = useState(null)
  const [peek, setPeek] = useState(false)
  useWakeLock()
  useEffect(() => { setMuted(mute) }, [mute])

  const players = core.players
  const labels = useMemo(() => tokenLabels(players.map((p) => p.name)), [players])
  const active = turnPlayer(core)
  const myTurn = active?.id === me
  const targets = targetsAt(core, now)
  const sheet = sheetAt(core, now)
  const zoneIcons = decks.books.map((b) => decks.byBook[b].icon)

  /* ---- sounds, once per event (the die makes its own: DieThrow) ---- */
  const heard = useRef({})
  const once = (key, play) => { if (heard.current[key]) return; heard.current[key] = true; play() }
  useEffect(() => {
    const key = `${core.g}:${core.n}`
    if (sheet === 'challenge') once(`card${key}:${core.ch?.s}`, sfx.card)
    if (sheet === 'result') {
      once(`res${key}`, () => {
        if (core.res.k === 'luck') return sfx.luck()
        const gained = core.res.aw?.[me] || 0
        if (gained > 0) sfx.right()
        else if (core.res.a?.[me]) sfx.wrong()
      })
    }
    if (sheet === 'over') once(`over${core.g}`, sfx.win)
  })
  // A new result starts un-peeked.
  useEffect(() => { setPeek(false) }, [core.n, core.phase])

  const roll = () => { if (myTurn && core.phase === 'roll') room.setMine({ roll: core.n, rt: Math.round(room.now()) }) }
  const leave = () => { room.setMine({ left: true }); setTimeout(() => navigate('/game'), 250) }

  /* ---- the line under the board ---- */
  let status = null
  const rolling = core.rolledAt && core.phase !== 'roll' && now < core.rolledAt + T.dice
  if (core.phase === 'roll') {
    const left = Math.ceil((core.t + T.rollWait - now) / 1000)
    status = myTurn
      ? L('دورك! ارمِ النرد.', 'Your turn! Roll the die.')
      : L(`دور ${active.name}…${left <= 10 ? ` (يُرمى وحده بعد ${Math.max(0, left)} ث)` : ''}`, `${active.name}’s turn…${left <= 10 ? ` (rolls itself in ${Math.max(0, left)}s)` : ''}`)
  } else if (core.rolledAt && !sheet) {
    status = rolling ? L(`${active.name} يرمي النرد…`, `${active.name} is rolling…`)
      : L(`${active.name} رمى ${core.die}${core.repay ? ` — وسدّد دَينه أوّلاً` : ''}`, `${active.name} rolled ${core.die}${core.repay ? ' — and paid back the loan first' : ''}`)
  } else if (core.phase === 'play') {
    const want = expected(core)
    const got = Object.keys(answersNow(core, entries)).length
    status = L(`أجاب ${got} من ${want.length}`, `${got} of ${want.length} have answered`)
  }

  /* ---- who has answered this stage (a tick on their chip) ---- */
  const answered = core.phase === 'play' && now >= core.ch.t0 ? answersNow(core, entries) : {}
  const slot = core.phase === 'play' ? slotOf(core) : null
  const owed = sheet === 'challenge' && !answered[me] && expected(core).includes(me)
  useNudge(core.phase === 'roll' && myTurn ? t(L('دورك!', 'Your turn!')) : owed ? t(L('جولة!', 'A round!')) : null)

  const overlay = sheet && !(peek && sheet === 'result') && createPortal(
    <div className="gm-overlay" role="dialog" aria-modal="true">
      {sheet === 'over'
        ? <GameOver room={room} core={core} me={me} labels={labels} decks={decks} />
        : (
          <div className={`gm-sheet tone-${core.ch ? KIND[core.ch.k].tone : 'luck'}`}>
            <div className="gm-band" style={{ backgroundImage: `url(${GAME_ART.board})`, backgroundPosition: `50% ${zoneBand[zoneOf(players[core.turn]?.pos ?? 0)]}` }} aria-hidden />
            {sheet === 'landed' && <LandedCard core={core} decks={decks} />}
            {sheet === 'challenge' && <Challenge key={slot} core={core} entries={entries} decks={decks} room={room} me={me} now={now} labels={labels} />}
            {sheet === 'result' && <Result core={core} decks={decks} room={room} me={me} now={now} labels={labels} onPeek={() => setPeek(true)} />}
          </div>
        )}
    </div>,
    document.body,
  )

  return (
    <div className="gm-room gm-stage">
      <header className="gm-top">
        <button type="button" className="gm-icon-btn" onClick={() => setDialog('leave')} aria-label={t(L('اخرج', 'Leave'))}><Icon name="🚪" /></button>
        <span className="gm-top-title">
          <strong dir="ltr">{prettyCode(code)}</strong>
          <small>{t(L(`الدور ${core.n}`, `Turn ${core.n}`))}</small>
        </span>
        <button type="button" className="gm-icon-btn" onClick={() => setMute((m) => !m)} aria-pressed={mute} aria-label={t(mute ? L('شغّل الصوت', 'Sound on') : L('اكتم الصوت', 'Mute'))}><Icon name={mute ? '🔇' : '🔊'} /></button>
        <button type="button" className="gm-icon-btn" onClick={() => setDialog('rules')} aria-label={t(L('القواعد', 'Rules'))}><Icon name="❓" /></button>
      </header>

      <div className="gm-board-wrap">
        <Board players={players} targets={targets} activeId={active?.id} me={me} zoneIcons={zoneIcons}
          label={t(L('لوح اللعب', 'The game board'))}>
          {core.rolledAt && core.phase !== 'roll' && core.die ? (
            <DieThrow key={`${core.g}:${core.n}`} room={room} seed={core.seed} turn={core.n} value={core.die} rolledAt={core.rolledAt} />
          ) : null}
        </Board>
      </div>

      <aside className="gm-side">
        <ol className="gm-strip">
          {players.map((p, i) => (
            <li key={p.id} className={`${p.id === active?.id ? 'is-turn' : ''} ${p.gone ? 'is-gone' : ''} ${room.live(p.id) || p.gone ? '' : 'is-away'}`}>
              <Token color={TOKEN_COLORS[p.c]} label={labels[i]} />
              <span className="gm-strip-text">
                <bdi>{p.id === me ? t(L('أنت', 'You')) : p.name}</bdi>
                <small dir="ltr">{Math.min(LAST, p.pos)}/{LAST}</small>
              </span>
              {answered[p.id] && <span className="gm-strip-tick" aria-label={t(L('أجاب', 'answered'))}><Icon name="✓" /></span>}
            </li>
          ))}
        </ol>

        <div className="gm-dock">
          {core.phase === 'roll' && myTurn
            ? <button type="button" className="gm-roll" onClick={roll}><Die value={core.die || 6} spin={core.n} /> <span>{t(L('ارمِ النرد', 'Roll the die'))}</span></button>
            : <span className={`gm-dock-die ${rolling ? 'is-away' : ''}`}><Die value={core.die || 1} spin={core.rolledAt && core.phase !== 'roll' ? core.n : core.n - 1} /></span>}
          {status && <p className="gm-status" role="status">{t(status)}</p>}
          {sheet === 'result' && peek && (
            <button type="button" className="gm-btn" onClick={() => setPeek(false)}>{t(L('عُد إلى النتيجة', 'Back to the result'))}</button>
          )}
        </div>
      </aside>

      {overlay}

      {dialog && createPortal(
        <div className="gm-overlay" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setDialog(null) }}>
          <div className="gm-sheet gm-dialog">
            {dialog === 'rules'
              ? <><h2>{t(L('القواعد', 'The rules'))}</h2><Rules /></>
              : <><h2>{t(L('تخرج من اللعبة؟', 'Leave the game?'))}</h2>
                  <p>{t(L('سيتجاوز اللعبُ دورك، ويمكنك العودة بالرمز نفسه.', 'The game will skip your turns, and you can come back with the same code.'))}</p></>}
            <div className="gm-dialog-actions">
              {dialog === 'leave' && <button type="button" className="gm-btn is-danger" onClick={leave}>{t(L('اخرج', 'Leave'))}</button>}
              <button type="button" className="gm-btn is-main" onClick={() => setDialog(null)}>{t(dialog === 'leave' ? L('ابقَ', 'Stay') : L('حسناً', 'OK'))}</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
