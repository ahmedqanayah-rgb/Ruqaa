import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { books } from '../../data/books.js'
import Icon from '../Icon.jsx'
import RichText from '../RichText.jsx'
import { T, LIE_MAX, turnPlayer, expected, answersNow, slotOf, optionOrder, whoChoices, faceChoices, parseNumber, actingHost } from '../../lib/game/engine.js'
import MiniChart from './MiniChart.jsx'
import MiniPlay, { NumPad } from './Minis.jsx'
import { PicPlay } from './PicRound.jsx'
import { L, KindHead, TimeBar } from './parts.jsx'

/*
 * A ROUND, WHILE IT IS PLAYED — on every phone at once.
 *
 * Every answer goes into this player's own entry as { s, v, at }: `s` names
 * the stage it answers (turn and stage), so a late answer to the last round can
 * never be counted in this one; `v` is the answer; `at` the room's time, which
 * is what "fastest" is decided by. One answer per stage — there is no taking
 * it back, which is part of the game.
 *
 * Options are reported by their index in the DECK (where the right one is
 * always 0) and shown in the order `optionOrder` deals for this round — the
 * same order on every phone, so "the second one!" means the same thing to
 * everyone on the call.
 */
export const LETTERS = [L('أ', 'A'), L('ب', 'B'), L('ج', 'C'), L('د', 'D')]

export function Options({ order, render, onPick, picked, chart = false }) {
  const { t } = useApp()
  return (
    <div className={`gm-opts ${chart ? 'is-charts' : ''}`}>
      {order.map((index, k) => (
        <button key={index} type="button" className={`gm-opt ${picked === index ? 'is-picked' : ''}`}
          disabled={picked != null} onClick={() => onPick(index)}>
          <span className="gm-opt-letter">{t(LETTERS[k])}</span>
          <span className="gm-opt-text">{render(index)}</span>
        </button>
      ))}
    </div>
  )
}

/* «من هذا؟» — the face: square, and cropped high, where faces are. */
export function FaceImage({ item, small = false }) {
  return (
    <div className={`gm-face ${small ? 'is-small' : ''}`}>
      <img src={item.img} alt="" decoding="async" draggable={false} />
    </div>
  )
}

/* After answering: what you said, and how many are still thinking. */
function Waiting({ core, entries, children }) {
  const { t } = useApp()
  const want = expected(core)
  const got = Object.keys(answersNow(core, entries)).length
  return (
    <div className="gm-wait">
      <Icon name="✓" />
      {children}
      <p>{t(got >= want.length ? L('أجاب الجميع.', 'Everyone has answered.') : L(`أجاب ${got} من ${want.length}. ننتظر البقيّة…`, `${got} of ${want.length} have answered. Waiting for the rest…`))}</p>
    </div>
  )
}

export default function Challenge({ core, entries, decks, room, me, now }) {
  const { t } = useApp()
  const ch = core.ch
  const item = decks.byId[ch.id]
  const slot = slotOf(core)
  const raw = entries[me]?.d?.a
  const mine = raw && raw.s === slot ? raw : null
  const active = turnPlayer(core)
  const [text, setText] = useState('')
  const [num, setNum] = useState('')

  const submit = (v) => {
    if (mine) return
    room.setMine({ a: { s: slot, v, at: Math.round(room.now()) } })
  }
  const timer = <TimeBar now={now} t0={ch.t0} t1={ch.t1} />
  const head = <div className="gm-sheet-head"><KindHead ch={ch} decks={decks} books={books} />{ch.k !== 'mini' && timer}</div>
  const iAnswer = expected(core).includes(me)

  let body = null
  switch (ch.k) {
    case 'mcq': {
      const order = optionOrder(ch, item.opts.length)
      body = (
        <>
          <p className="gm-q"><RichText value={item.q} /></p>
          <Options order={order} picked={mine?.v} onPick={submit} render={(i) => t(item.opts[i])} />
        </>
      )
      break
    }
    case 'graph': {
      const order = optionOrder(ch, item.opts.length)
      const charts = item.opts.every((o) => o.chart)
      body = (
        <>
          {item.chart && <MiniChart spec={item.chart} />}
          <p className="gm-q"><RichText value={item.q} /></p>
          <Options order={order} picked={mine?.v} onPick={submit} chart={charts}
            render={(i) => (item.opts[i].chart ? <MiniChart spec={item.opts[i].chart} small /> : t(item.opts[i]))} />
        </>
      )
      break
    }
    case 'tf': {
      body = (
        <>
          <p className="gm-q is-statement"><RichText value={item.statement} /></p>
          <div className="gm-pair">
            <button type="button" className={`gm-choice ${mine?.v === 0 ? 'is-picked' : ''}`} disabled={!!mine} onClick={() => submit(0)}>
              <strong>{t(L('خرافة', 'Myth'))}</strong>
            </button>
            <button type="button" className={`gm-choice ${mine?.v === 1 ? 'is-picked' : ''}`} disabled={!!mine} onClick={() => submit(1)}>
              <strong>{t(L('حقيقة', 'Fact'))}</strong>
            </button>
          </div>
        </>
      )
      break
    }
    case 'num': {
      const value = parseNumber(num)
      body = mine ? null : (
        <>
          <p className="gm-q"><RichText value={item.q} /></p>
          <output className="gm-readout" dir="ltr">{num || '–'}{item.unit && <small> {t(item.unit)}</small>}</output>
          <NumPad value={num} onChange={setNum} max={7} dot={!!item.dot} />
          <button type="button" className="gm-btn is-main is-wide" disabled={value == null} onClick={() => submit(value)}>{t(L('هذا تخميني', 'That’s my guess'))}</button>
        </>
      )
      if (mine) body = <Waiting core={core} entries={entries}><p className="gm-said">{t(L('تخمينك:', 'Your guess:'))} <b dir="ltr">{mine.v}</b></p></Waiting>
      break
    }
    case 'who': {
      const people = whoChoices(ch, decks)
      const order = optionOrder(ch, people.length)
      const shown = Math.min(3, 1 + Math.floor(Math.max(0, now - ch.t0) / T.clue))
      const worth = 3 - (shown - 1)
      body = (
        <>
          <ol className="gm-clues">
            {item.clues.slice(0, shown).map((clue, i) => <li key={i} className={i === shown - 1 ? 'is-new' : ''}><RichText value={clue} /></li>)}
            {shown < 3 && <li className="gm-clue-next">{t(L(`التلميح التالي بعد ${Math.max(0, Math.ceil((ch.t0 + shown * T.clue - now) / 1000))} ث`, `Next clue in ${Math.max(0, Math.ceil((ch.t0 + shown * T.clue - now) / 1000))}s`))}</li>}
          </ol>
          {!mine && <p className="gm-worth">{t(L(`أجِب الآن: ${worth === 1 ? 'خطوةٌ واحدة' : worth === 2 ? 'خطوتان' : '٣ خطوات'} إن أصبت`, `Answer now: ${worth} step${worth > 1 ? 's' : ''} if you’re right`))}</p>}
          <Options order={order} picked={mine?.v} onPick={submit} render={(i) => t(people[i].name)} />
        </>
      )
      break
    }
    case 'face': {
      const people = faceChoices(ch, decks)
      body = (
        <>
          <FaceImage item={item} />
          <p className="gm-q">{t(L('من هذا؟', 'Who is this?'))}</p>
          <Options order={optionOrder(ch, people.length)} picked={mine?.v} onPick={submit} render={(i) => t(people[i].name)} />
        </>
      )
      break
    }
    case 'bluff': {
      const [before, after] = (t(item.q) || '').split('____')
      if (ch.s === 0) {
        body = mine
          ? <Waiting core={core} entries={entries}><p className="gm-said">{t(L('كذبتك:', 'Your lie:'))} «<bdi>{mine.v}</bdi>»</p></Waiting>
          : (
            <form onSubmit={(e) => { e.preventDefault(); if (text.trim()) submit(text.trim()) }}>
              <p className="gm-q">{before}<span className="gm-blank">؟</span>{after}</p>
              <p className="gm-hint-dark">{t(L('اكتب ما يملأ الفراغ — كذبةً مقنعة، لا الحقيقة. سيرى الجميع كذبتك بين الإجابات.', 'Fill the blank with a convincing LIE, not the truth. Everyone will see it among the answers.'))}</p>
              <input className="gm-input" value={text} maxLength={LIE_MAX} onChange={(e) => setText(e.target.value)} autoFocus enterKeyHint="send" />
              <button type="submit" className="gm-btn is-main is-wide" disabled={!text.trim()}>{t(L('أرسل الكذبة', 'Send my lie'))}</button>
            </form>
          )
      } else {
        const label = (o) => (o.t ? t(item.truth) : o.p ? o.x : t(item.decoys[o.d]))
        body = (
          <>
            <p className="gm-q">{before}<span className="gm-blank">؟</span>{after}</p>
            <p className="gm-hint-dark">{t(L('واحدةٌ فقط هي الحقيقة. اخترها — خطوتان إن أصبت.', 'Only one is the truth. Pick it — two steps if you’re right.'))}</p>
            <div className="gm-opts">
              {ch.o.map((o, i) => {
                const own = o.p?.includes(me)
                return (
                  <button key={i} type="button" className={`gm-opt ${mine?.v === i ? 'is-picked' : ''} ${own ? 'is-own' : ''}`}
                    disabled={!!mine || own || !iAnswer} onClick={() => submit(i)}>
                    <span className="gm-opt-letter">{t(LETTERS[i] || L(String(i + 1), String(i + 1)))}</span>
                    <span className="gm-opt-text"><bdi>{label(o)}</bdi>{own && <small> — {t(L('كذبتك', 'your lie'))}</small>}</span>
                  </button>
                )
              })}
            </div>
          </>
        )
      }
      break
    }
    case 'dare': {
      const performer = active.id === me
      if (ch.s === 0) {
        body = (
          <>
            <p className="gm-q">{performer ? t(L('تحدّيك، بصوتك في المكالمة:', 'Your dare, out loud on the call:')) : t(L(`${active.name} يؤدّي هذا التحدّي الآن:`, `${active.name} is doing this dare now:`))}</p>
            <blockquote className="gm-dare"><RichText value={item.text} /></blockquote>
            {performer
              ? (mine ? <p className="gm-said">{t(L('بانتظار حكم الآخرين…', 'Waiting for the others’ verdict…'))}</p>
                : <button type="button" className="gm-btn is-main is-wide" onClick={() => submit(1)}>{t(L('أدّيتُه — احكموا!', 'Done — judge me!'))}</button>)
              : <p className="gm-hint-dark">{t(L('استمع… وحين ينتهي ستحكم من هاتفك.', 'Listen… when they finish, you’ll judge from your phone.'))}</p>}
          </>
        )
      } else {
        body = (
          <>
            <blockquote className="gm-dare"><RichText value={item.text} /></blockquote>
            {performer
              ? <p className="gm-said">{t(L('الجميع يصوّتون الآن…', 'Everyone is voting now…'))}</p>
              : mine
                ? <Waiting core={core} entries={entries} />
                : (
                  <div className="gm-pair">
                    <button type="button" className="gm-choice is-yes" onClick={() => submit(1)}><Icon name="✓" /><strong>{t(L('نجح', 'Pass'))}</strong></button>
                    <button type="button" className="gm-choice is-no" onClick={() => submit(0)}><Icon name="✕" /><strong>{t(L('لم ينجح', 'Fail'))}</strong></button>
                  </div>
                )}
          </>
        )
      }
      break
    }
    case 'pic':
      body = <>
        <PicPlay core={core} entries={entries} room={room} me={me} decks={decks} mine={mine} submit={submit} Options={Options} />
        {mine && <Waiting core={core} entries={entries} />}
      </>
      break
    case 'mini':
      body = <MiniPlay ch={ch} room={room} mine={mine} submit={submit} now={now} />
      if (['stag', 'auction'].includes(ch.id)) body = <>{timer}{mine ? <Waiting core={core} entries={entries} /> : body}</>
      break
    default:
  }

  // The choice kinds show "waiting" in place, under the options they answered.
  const inPlace = ['mcq', 'graph', 'who', 'tf', 'face'].includes(ch.k)

  /* An untimed round waits for everyone — so it can be closed for a friend who
     has wandered off from their phone: by the host after a little while, by
     anyone else after a minute (the engine's `override`). */
  const got = answersNow(core, entries)
  const missingIds = expected(core).filter((pid) => !got[pid] && room.present(pid))
  const missing = missingIds.map((pid) => core.players.find((p) => p.id === pid)?.name).filter(Boolean)
  const isHost = actingHost(core, room.env()) === me
  const canEnd = ch.t1 == null && missing.length > 0 && !missingIds.includes(me) && entries[me]?.d?.end !== slot
    && now - ch.t0 > (isHost ? 12000 : T.anyone)
  return (
    <div className="gm-challenge">
      {head}
      <div className="gm-sheet-body">
        {body}
        {inPlace && mine && <Waiting core={core} entries={entries} />}
      </div>
      {canEnd && (
        <div className="gm-sheet-foot">
          <button type="button" className="gm-btn gm-btn-quiet" onClick={() => room.setMine({ end: slot, et: Math.round(room.now()) })}>
            {t(L(`أنهِ الجولة دون انتظار ${missing.join('، ')}`, `End the round without waiting for ${missing.join(', ')}`))}
          </button>
        </div>
      )}
    </div>
  )
}
