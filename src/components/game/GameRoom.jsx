import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import Icon from '../Icon.jsx'
import { advance, cleanName, NAME_MAX, MAX_PLAYERS } from '../../lib/game/engine.js'
import { Room, httpSend } from '../../lib/game/net.js'
import { L, prettyCode } from './parts.jsx'
import Lobby from './Lobby.jsx'
import Stage from './Stage.jsx'

/*
 * ONE ROOM, FROM THIS PHONE: the Room client (lib/game/net.js) for this tab,
 * and which screen the room is on.
 *
 * `pending` carries what the entry screen decided — a brand-new room's first
 * state, and the name typed — across the navigation into the room. Memory
 * only, like everything else here; a refresh does not need it, because by then
 * the mailbox and the other phones hold both.
 */
export const pending = new Map()

const EMPTY = { core: null, entries: {}, seen: {}, status: 'connecting', misses: 0 }

function useRoom(code, me, decks) {
  const [room, setRoom] = useState(null)
  useEffect(() => {
    const handoff = pending.get(code)
    const next = new Room({
      code, me, send: httpSend, create: handoff?.create || null,
      advance: (core, entries, env) => advance(core, entries, { ...env, decks }),
      // Twice as often while a roll is awaited: the die's shake (lib/game/throw.js)
      // covers about half a second, and the others should catch the throw from its start.
      pace: (r) => (r.core?.phase === 'roll' ? 450 : 1000),
    })
    next.start()
    if (handoff?.name) next.setMine({ name: handoff.name, j: Math.round(next.now()), left: null })
    setRoom(next)
    /* Back from the call app: a hidden tab's timers are slowed to a crawl, so
       catch up at once rather than on the next (late) tick. */
    const wake = () => { if (document.visibilityState === 'visible') { next.step(); next.flush() } }
    document.addEventListener('visibilitychange', wake)
    return () => { document.removeEventListener('visibilitychange', wake); next.close() }
  }, [code, me, decks])
  const subscribe = useCallback((fn) => (room ? room.subscribe(fn) : () => {}), [room])
  const snap = useSyncExternalStore(subscribe, () => (room ? room.snapshot() : EMPTY))
  return { room, snap }
}

/* The whole window belongs to the room — lobby and game alike — so the site's
   chrome steps aside (components.css, `html[data-stage]`). */
function useStageChrome() {
  useEffect(() => {
    document.documentElement.setAttribute('data-stage', '')
    return () => document.documentElement.removeAttribute('data-stage')
  }, [])
}

function Notice({ icon, title, text, children }) {
  return (
    <div className="gm-room gm-notice">
      <div className="gm-notice-card">
        {icon && <Icon name={icon} />}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children}
      </div>
    </div>
  )
}

export default function GameRoom({ code, me, decks }) {
  const { t } = useApp()
  const navigate = useNavigate()
  const { room, snap } = useRoom(code, me, decks)
  const [name, setName] = useState('')
  useStageChrome()

  const back = () => navigate('/game')
  const { core, entries, status, misses } = snap
  const mine = entries[me]?.d

  if (!room || !core) {
    if (status === 'clash') {
      return <Notice icon="⚠️" title={t(L('رمزٌ مستعمل', 'That code is taken'))}
        text={t(L('غرفةٌ أخرى تستعمل هذا الرمز الآن. افتح غرفةً جديدة.', 'Another room is using this code right now. Open a new one.'))}>
        <button type="button" className="gm-btn is-main" onClick={back}>{t(L('رجوع', 'Back'))}</button>
      </Notice>
    }
    if (misses >= 3) {
      return <Notice icon="🔍" title={t(L('لا غرفة بهذا الرمز', 'No room with this code'))}
        text={t(L(`تأكّد من الأرقام الستّة مع صاحب الغرفة: ${prettyCode(code)}`, `Check the six digits with whoever opened the room: ${prettyCode(code)}`))}>
        <button type="button" className="gm-btn is-main" onClick={back}>{t(L('رجوع', 'Back'))}</button>
      </Notice>
    }
    return <Notice title={t(L('ندخل الغرفة…', 'Joining the room…'))} text={status === 'offline' ? t(L('الاتصال متقطّع، نحاول من جديد…', 'The connection is patchy — trying again…')) : null}>
      <span className="gm-spinner" aria-hidden />
    </Notice>
  }

  const seated = core.players.some((p) => p.id === me && !p.gone)
  const synced = status === 'ok' || status === 'offline'

  /* Walked out earlier (in this tab, or before a refresh). */
  if (mine?.left && !seated) {
    return <Notice icon="🚪" title={t(L('خرجتَ من هذه الغرفة', 'You left this room'))}>
      <div className="gm-notice-actions">
        <button type="button" className="gm-btn is-main" onClick={() => room.setMine({ left: null })}>{t(L('عُد إلى اللعب', 'Rejoin'))}</button>
        <button type="button" className="gm-btn" onClick={back}>{t(L('غرفة أخرى', 'Another room'))}</button>
      </div>
    </Notice>
  }

  /* No seat yet: ask for a name (a seat is given as soon as one arrives). */
  if (!seated && synced && !cleanName(mine?.name)) {
    const full = core.players.filter((p) => !p.gone).length >= MAX_PLAYERS
    if (full) {
      return <Notice icon="👥" title={t(L('الغرفة ممتلئة', 'The room is full'))}
        text={t(L(`في الغرفة ${MAX_PLAYERS} لاعبين، وهذا أقصى ما تتّسع له.`, `The room has ${MAX_PLAYERS} players, which is as many as it holds.`))}>
        <button type="button" className="gm-btn is-main" onClick={back}>{t(L('رجوع', 'Back'))}</button>
      </Notice>
    }
    const submit = (e) => {
      e.preventDefault()
      const clean = cleanName(name)
      if (clean) room.setMine({ name: clean, j: Math.round(room.now()), left: null })
    }
    return <Notice icon="👤" title={t(L(`غرفة ${prettyCode(code)}`, `Room ${prettyCode(code)}`))}>
      <form className="gm-name-form" onSubmit={submit}>
        <label>
          <span>{t(L('اسمك في اللعبة', 'Your name in the game'))}</span>
          <input className="gm-input" value={name} maxLength={NAME_MAX * 2} autoFocus onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit" className="gm-btn is-main" disabled={!cleanName(name)}>{t(L('ادخل', 'Join'))}</button>
      </form>
    </Notice>
  }

  if (!seated) {
    return <Notice title={t(L('نُجلسك على الطاولة…', 'Finding you a seat…'))}><span className="gm-spinner" aria-hidden /></Notice>
  }

  return core.phase === 'lobby'
    ? <Lobby room={room} snap={snap} me={me} decks={decks} code={code} />
    : <Stage room={room} snap={snap} me={me} decks={decks} code={code} />
}
