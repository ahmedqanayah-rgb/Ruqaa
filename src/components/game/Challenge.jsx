import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { books } from '../../data/books.js'
import Icon from '../Icon.jsx'
import RichText from '../RichText.jsx'
import { T, LIE_MAX, turnPlayer, expected, answersNow, slotOf, optionOrder, whoChoices, faceChoices, parseNumber, actingHost, maxHints, fiftyFifty, numRange, bluffHint, maySkip } from '../../lib/game/engine.js'
import MiniChart from './MiniChart.jsx'
import MiniPlay, { NumPad } from './Minis.jsx'
import { PicPlay } from './PicRound.jsx'
import { L, KindHead, TimeBar } from './parts.jsx'

/*
 * A ROUND, WHILE IT IS PLAYED — on every phone at once.
 *
 * Every answer goes into this player's own entry as { s, v, at, h }: `s`
 * names the stage it answers (game, turn and stage), so a late answer to the
 * last round can never be counted in this one; `v` is the answer; `at` the
 * room's time, which is what "fastest" is decided by; `h` the hints bought.
 * One answer per stage — there is no taking it back, which is part of the game.
 *
 * EVERY QUESTION HAS A HINT TO BUY (engine.js → `maxHints` says what each kind
 * offers): a right answer is worth 2 steps and each hint costs one. A hint is
 * shown only when its player taps for it — never by the clock — and is written
 * into the player's entry the moment it is bought (`rv`), so a refresh cannot
 * undo it.
 *
 * Options are reported by their index in the DECK (where the right one is
 * always 0) and shown in the order `optionOrder` deals for this round — the
 * same order on every phone, so "the second one!" means the same thing to
 * everyone on the call.
 *
 * SKIP: the player whose turn it is, or the host, can swap the round for a new
 * one — a new question card, or the same square's next round — for everyone
 * (engine.js → `maySkip`). The new round
 * has a slot of its own, and this component is keyed by the slot (Stage.jsx),
 * so what was typed or bought for the old one does not follow it.
 */
export const LETTERS = [L('أ', 'A'), L('ب', 'B'), L('ج', 'C'), L('د', 'D')]

/* `gone`: options a hint has struck out (50:50). */
export function Options({ order, render, onPick, picked, chart = false, gone = [] }) {
  const { t } = useApp()
  return (
    <div className={`gm-opts ${chart ? 'is-charts' : ''}`}>
      {order.map((index, k) => (
        <button key={index} type="button" className={`gm-opt ${picked === index ? 'is-picked' : ''} ${gone.includes(index) ? 'is-gone' : ''}`}
          disabled={picked != null || gone.includes(index)} onClick={() => onPick(index)}>
          <span className="gm-opt-letter">{t(LETTERS[k])}</span>
          <span className="gm-opt-text">{render(index)}</span>
        </button>
      ))}
    </div>
  )
}

/* A person's picture, big — «من هذا؟»'s face, and «من هو؟»'s from the start
   (the club: "i want the foto in the questions to appear from the start … and
   make it big, not just a thumbnail"). Square, and cropped high, where faces are. */
export function FaceImage({ item }) {
  if (!item.img) return null
  return (
    <div className="gm-face">
      <img src={item.img} alt="" decoding="async" draggable={false} />
    </div>
  )
}

/* A question's photo (data/game/questionPhotos.js, 2026-11-20): its subject,
   never its answer. Whole, as big as the sheet allows; its width and height are
   known, so nothing jumps while it arrives (Stage starts loading it early). */
export function QuestionPhoto({ photo }) {
  if (!photo) return null
  return (
    <div className="gm-qphoto">
      <img src={photo.src} width={photo.w} height={photo.h} alt="" decoding="async" draggable={false} />
    </div>
  )
}

const COST = L('−١', '−1')
const stepsWord = (n) => L(n === 1 ? 'خطوةٌ واحدة' : n === 2 ? 'خطوتان' : `${n} خطوات`, `${n} step${n > 1 ? 's' : ''}`)

/* A question's hint: what a right answer is worth now, the button that buys
   the hint, and — once bought — what it gave. */
function HintBar({ label, h, most, onBuy, worth, worthLabel, children }) {
  const { t } = useApp()
  return (
    <div className="gm-hintbar">
      {worth != null && (
        <p className="gm-prize">{t(L(`${worthLabel?.ar || 'إن أصبت'}: ${stepsWord(worth).ar}`, `${worthLabel?.en || 'If you’re right'}: ${stepsWord(worth).en}`))}</p>
      )}
      {h < most && (
        <button type="button" className="gm-btn gm-hint-btn" onClick={onBuy}>
          <Icon name="💡" /> {t(label)} <b dir="ltr">{t(COST)}</b>
        </button>
      )}
      {children}
    </div>
  )
}
const HintCard = ({ children }) => <p className="gm-hint-card"><Icon name="💡" /><span>{children}</span></p>

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

  /* Hints bought this stage: this tab's own count, or what the entry recorded. */
  const most = maxHints(ch)
  const rv = entries[me]?.d?.rv
  const recorded = rv && rv.s === slot && Number.isInteger(rv.h) ? rv.h : 0
  const [bought, setBought] = useState(0)
  const h = Math.min(most, Math.max(bought, recorded))
  const buy = () => {
    if (mine || h >= most) return
    setBought(h + 1)
    room.setMine({ rv: { s: slot, h: h + 1 } })
  }
  const worth = Math.max(1, 2 - h)

  const submit = (v) => {
    if (mine) return
    room.setMine({ a: { s: slot, v, at: Math.round(room.now()), ...(h ? { h } : {}) } })
  }
  const timer = <TimeBar now={now} t0={ch.t0} t1={ch.t1} />
  // The turn's question card is everyone's to answer — and its player's roll rides on it.
  const whose = ch.card && <p className="gm-card-who">{t(active.id === me ? L('سؤالك', 'Your question') : L(`سؤال ${active.name}`, `${active.name}’s question`))}</p>
  const head = <div className="gm-sheet-head"><KindHead ch={ch} decks={decks} books={books} />{whose}{ch.k !== 'mini' && timer}</div>
  const iAnswer = expected(core).includes(me)

  let body = null
  switch (ch.k) {
    case 'mcq': {
      const order = optionOrder(ch, item.opts.length)
      body = (
        <>
          <QuestionPhoto photo={item.photo} />
          <p className="gm-q"><RichText value={item.q} /></p>
          {!mine && <HintBar label={L('احذف إجابتين', 'Remove two answers')} h={h} most={most} onBuy={buy} worth={worth} />}
          <Options order={order} picked={mine?.v} onPick={submit} gone={h ? fiftyFifty(ch) : []} render={(i) => t(item.opts[i])} />
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
          {!mine && <HintBar label={L('احذف إجابتين', 'Remove two answers')} h={h} most={most} onBuy={buy} worth={worth} />}
          <Options order={order} picked={mine?.v} onPick={submit} chart={charts} gone={h ? fiftyFifty(ch) : []}
            render={(i) => (item.opts[i].chart ? <MiniChart spec={item.opts[i].chart} small /> : t(item.opts[i]))} />
        </>
      )
      break
    }
    case 'tf': {
      body = (
        <>
          <QuestionPhoto photo={item.photo} />
          <p className="gm-q is-statement"><RichText value={item.statement} /></p>
          {!mine && item.hint && (
            <HintBar label={L('تلميح', 'Hint')} h={h} most={most} onBuy={buy} worth={worth}>
              {h > 0 && <HintCard><RichText value={item.hint} /></HintCard>}
            </HintBar>
          )}
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
      const [lo, hi] = numRange(item, ch)
      body = mine ? null : (
        <>
          <QuestionPhoto photo={item.photo} />
          <p className="gm-q"><RichText value={item.q} /></p>
          <HintBar label={L('أعطني نطاقاً', 'Give me a range')} h={h} most={most} onBuy={buy}
            worth={worth} worthLabel={L('إن كنتَ الأقرب', 'If you’re the closest')}>
            {h > 0 && <HintCard>{t(L(`الجواب بين ${lo.toLocaleString('en')} و${hi.toLocaleString('en')}`, `The answer is between ${lo.toLocaleString('en')} and ${hi.toLocaleString('en')}`))}{item.unit && <> {t(item.unit)}</>}</HintCard>}
          </HintBar>
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
      // One clue to start; the second and third only when asked for, a step each.
      const shown = Math.min(3, 1 + h)
      body = (
        <>
          <FaceImage item={item} />
          <ol className="gm-clues">
            {item.clues.slice(0, shown).map((clue, i) => <li key={i} className={i === shown - 1 ? 'is-new' : ''}><RichText value={clue} /></li>)}
          </ol>
          {!mine && <HintBar label={L('التلميح التالي', 'Next clue')} h={h} most={most} onBuy={buy} worth={3 - h} />}
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
          {!mine && (
            <HintBar label={L('تلميح', 'Hint')} h={h} most={most} onBuy={buy} worth={worth}>
              {h > 0 && <HintCard>{t(item.tag)}</HintCard>}
            </HintBar>
          )}
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
              <QuestionPhoto photo={item.photo} />
              <p className="gm-q">{before}<span className="gm-blank">؟</span>{after}</p>
              <p className="gm-hint-dark">{t(L('اكتب ما يملأ الفراغ — كذبةً مقنعة، لا الحقيقة. سيرى الجميع كذبتك بين الإجابات.', 'Fill the blank with a convincing LIE, not the truth. Everyone will see it among the answers.'))}</p>
              <input className="gm-input" value={text} maxLength={LIE_MAX} onChange={(e) => setText(e.target.value)} autoFocus enterKeyHint="send" />
              <button type="submit" className="gm-btn is-main is-wide" disabled={!text.trim()}>{t(L('أرسل الكذبة', 'Send my lie'))}</button>
            </form>
          )
      } else {
        const label = (o) => (o.t ? t(item.truth) : o.p ? o.x : t(item.decoys[o.d]))
        const struck = bluffHint(ch, me)
        body = (
          <>
            <QuestionPhoto photo={item.photo} />
            <p className="gm-q">{before}<span className="gm-blank">؟</span>{after}</p>
            <p className="gm-hint-dark">{t(L('واحدةٌ فقط هي الحقيقة. اخترها.', 'Only one is the truth. Pick it.'))}</p>
            {!mine && iAnswer && struck != null && <HintBar label={L('احذف كذبة', 'Strike out a lie')} h={h} most={most} onBuy={buy} worth={worth} />}
            <div className="gm-opts">
              {ch.o.map((o, i) => {
                const own = o.p?.includes(me)
                const gone = h > 0 && i === struck
                return (
                  <button key={i} type="button" className={`gm-opt ${mine?.v === i ? 'is-picked' : ''} ${own ? 'is-own' : ''} ${gone ? 'is-gone' : ''}`}
                    disabled={!!mine || own || gone || !iAnswer} onClick={() => submit(i)}>
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
  /* Skip — for the player whose turn it is and the host, until they answer. */
  const canSkip = !mine && maySkip(core, room.env(), me)
  const askedSkip = entries[me]?.d?.swap === slot
  const skip = () => room.setMine({ swap: slot, swt: Math.round(room.now()) })
  return (
    <div className="gm-challenge">
      {head}
      <div className="gm-sheet-body">
        {body}
        {inPlace && mine && <Waiting core={core} entries={entries} />}
      </div>
      {(canSkip || canEnd) && (
        <div className="gm-sheet-foot">
          {canSkip && (askedSkip
            ? <p className="gm-muted-dark">{t(L('لحظة — جولةٌ جديدة في الطريق…', 'One moment — a new round is on its way…'))}</p>
            : (
              <button type="button" className="gm-btn gm-btn-quiet" onClick={skip}>
                <Icon name="🔀" /> {t(ch.k === 'dare'
                  ? L('تخطَّ — تحدٍّ آخر للجميع', 'Skip — another dare for everyone')
                  : L('تخطَّ السؤال — سؤالٌ جديد للجميع', 'Skip — a new question for everyone'))}
              </button>
            ))}
          {canEnd && (
            <button type="button" className="gm-btn gm-btn-quiet" onClick={() => room.setMine({ end: slot, et: Math.round(room.now()) })}>
              {t(L(`أنهِ الجولة دون انتظار ${missing.join('، ')}`, `End the round without waiting for ${missing.join(', ')}`))}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
