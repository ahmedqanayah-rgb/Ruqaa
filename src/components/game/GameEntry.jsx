import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { ui } from '../../data/ui.js'
import GameCover from '../GameCover.jsx'
import Icon from '../Icon.jsx'
import { newRoom, cleanName, NAME_MAX } from '../../lib/game/engine.js'
import { makeRoomCode, makeId, cleanRoomCode, ROOM_RE } from '../../lib/game/net.js'
import { L, prettyCode } from './parts.jsx'
import { pending } from './GameRoom.jsx'
import Rules from './Rules.jsx'

/*
 * The game's front door: start a room, or join one. An ordinary page of the
 * site (it follows the theme); the room itself is the dark stage.
 *
 * Arriving by an invite link (`#/game?room=123456`) skips straight to "join",
 * with the code filled in: all that is left is a name.
 */
export default function GameEntry({ invite = '' }) {
  const { t } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [code, setCode] = useState(invite)
  const [tried, setTried] = useState(false)
  const clean = cleanName(name)
  const codeOk = ROOM_RE.test(code)

  const enter = (roomCode, create) => {
    const me = makeId(8)
    pending.set(roomCode, { create, name: clean })
    navigate(`/game?room=${roomCode}&me=${me}`)
  }
  const start = (e) => {
    e.preventDefault()
    setTried(true)
    if (!clean) return
    const roomCode = makeRoomCode()
    const host = makeId(8)
    const core = newRoom({ code: roomCode, id: makeId(8), host, ds: Math.floor(Math.random() * 1e9) })
    pending.set(roomCode, { create: core, name: clean })
    navigate(`/game?room=${roomCode}&me=${host}`)
  }
  const join = (e) => {
    e.preventDefault()
    setTried(true)
    if (!clean || !codeOk) return
    enter(code, null)
  }

  const nameField = (
    <label className="gm-field-row">
      <span>{t(L('اسمك في اللعبة', 'Your name in the game'))}</span>
      <input className="gm-input" value={name} maxLength={NAME_MAX * 2} autoComplete="nickname" enterKeyHint="go"
        onChange={(e) => setName(e.target.value)} placeholder={t(L('مثلاً: سارة', 'e.g. Sara'))}
        aria-invalid={tried && !clean} />
    </label>
  )

  return (
    <div className="wide-page gm-entry">
      <header className="gm-hero">
        <GameCover poster />
        <div className="gm-hero-body">
          <span className="eyebrow">{t(L('لعبة النادي', 'The club game'))}</span>
          <h1>{t(ui.game.title)}</h1>
          <p>{t(ui.game.tagline)}</p>
        </div>
      </header>

      {invite ? (
        <form className="card gm-panel gm-join-only" onSubmit={join}>
          <h2>{t(L('دُعيتَ إلى غرفة', 'You’re invited to a room'))} <bdi dir="ltr" className="gm-code-inline">{prettyCode(invite)}</bdi></h2>
          {nameField}
          <button type="submit" className="btn primary gm-go">{t(L('ادخل الغرفة', 'Join the room'))} <span className="arrow" aria-hidden>→</span></button>
          {tried && !clean && <p className="gm-error" role="alert">{t(L('اكتب اسماً يعرفك به الآخرون.', 'Type a name the others will know you by.'))}</p>}
        </form>
      ) : (
        <div className="gm-entry-grid">
          <form className="card gm-panel" onSubmit={start}>
            <h2><Icon name="➕" /> {t(L('افتح غرفة', 'Open a room'))}</h2>
            <p className="gm-hint">{t(L('لمن يبدأ الجلسة: تحصل على رمزٍ من ستة أرقام تقرؤه على الجميع في المكالمة.', 'For whoever starts the session: you get a six-digit code to read out on the call.'))}</p>
            {nameField}
            <button type="submit" className="btn primary gm-go">{t(L('افتح غرفة جديدة', 'Open a new room'))}</button>
          </form>
          <form className="card gm-panel" onSubmit={join}>
            <h2><Icon name="🔑" /> {t(L('ادخل غرفة', 'Join a room'))}</h2>
            <p className="gm-hint">{t(L('معك الرمز؟ اكتبه هنا.', 'Got the code? Type it here.'))}</p>
            <label className="gm-field-row">
              <span>{t(L('رمز الغرفة', 'Room code'))}</span>
              <input className="gm-input gm-code-input" dir="ltr" inputMode="numeric" autoComplete="off" placeholder="123 456"
                value={code.length > 3 ? `${code.slice(0, 3)} ${code.slice(3)}` : code}
                onChange={(e) => setCode(cleanRoomCode(e.target.value))} aria-invalid={tried && !codeOk} />
            </label>
            {nameField}
            <button type="submit" className="btn gm-go">{t(L('ادخل', 'Join'))} <span className="arrow" aria-hidden>→</span></button>
            {tried && (!clean || !codeOk) && (
              <p className="gm-error" role="alert">
                {t(!codeOk ? L('الرمز ستة أرقام.', 'The code is six digits.') : L('اكتب اسماً يعرفك به الآخرون.', 'Type a name the others will know you by.'))}
              </p>
            )}
          </form>
        </div>
      )}

      <section className="card gm-panel">
        <h2>{t(L('كيف نلعب', 'How to play'))}</h2>
        <Rules />
        <p className="gm-fine">
          {t(L('لا شيء يُحفظ على هاتفك. الغرفة وأسماء اللاعبين على خادم الموقع نفسه، وتُنسى بعد ثلاث ساعاتٍ من آخر حركة.',
            'Nothing is saved on your phone. The room and the players’ names are kept on this site’s own server, and forgotten three hours after the last move.'))}
        </p>
      </section>
    </div>
  )
}
