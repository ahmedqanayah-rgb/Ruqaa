import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import Icon from '../Icon.jsx'
import { sfx } from '../../lib/game/sfx.js'
import {
  miniById, sheepPlan, SHEEP_SHOW, reflexPlan, REFLEX, memoryDigits, MEMORY,
  stroopTrials, STROOP_COLORS, searchRounds, SEARCH, AUCTION, STAG,
} from '../../lib/game/minis.js'
import { L, MINI, TimeBar } from './parts.jsx'

/*
 * THE LAB, ON SCREEN — how each mini-game looks and is played. What it IS (its
 * length, the sheep that cross, the digits, how a result is marked) is
 * lib/game/minis.js, shared with the engine.
 *
 * Every phone plays the same game at the same moment, alone. So each of these
 * runs on the room's clock from `start` to `end`, draws what the challenge's
 * seed dictates, and reports ONE thing through `submit` — a guess, a time, a
 * score. A game that has not reported by `end` reports whatever it has: nobody
 * should score nothing because they were one tap short.
 */

/* ---- a number pad of our own ----
   Not the phone's keyboard: a keyboard sliding up covers half of a timed game,
   takes its time doing it, and types ٣ or 3 depending on the phone. */
export function NumPad({ value, onChange, max = 3, dot = false, disabled = false }) {
  const press = (key) => {
    if (disabled) return
    if (key === 'del') return onChange(value.slice(0, -1))
    if (key === '.') { if (dot && value && !value.includes('.')) onChange(`${value}.`); return }
    if (value.replace(/\D/g, '').length >= max) return
    onChange(value + key)
  }
  // A desk keyboard works too.
  const latest = useRef(press)
  latest.current = press
  useEffect(() => {
    const onKey = (e) => {
      if (/^[0-9]$/.test(e.key)) latest.current(e.key)
      else if (e.key === 'Backspace') latest.current('del')
      else if (e.key === '.' || e.key === ',') latest.current('.')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <div className="gm-pad" dir="ltr">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', dot ? '.' : '', '0', 'del'].map((key) => (key === '' ? <span key="blank" /> : (
        <button key={key} type="button" disabled={disabled} onPointerDown={(e) => { e.preventDefault(); press(key) }}
          className={key === 'del' ? 'is-del' : ''} aria-label={key === 'del' ? 'delete' : key}>
          {key === 'del'
            ? <svg viewBox="0 0 24 24" aria-hidden><path d="M9 5h10a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 19 19H9l-6-7ZM12 9.5l5 5M17 9.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
            : key}
        </button>
      )))}
    </div>
  )
}

/* Run `fn` when the room's clock reaches `at`. */
function useAt(room, at, fn) {
  const latest = useRef(fn)
  latest.current = fn
  useEffect(() => {
    const id = setTimeout(() => latest.current(), Math.max(0, at - room.now()))
    return () => clearTimeout(id)
  }, [room, at])
}

/* ------------------------------ count the sheep ------------------------------ */
function Animal({ wolf }) {
  // Facing right — the way it runs. A wolf wears the same fleece: what gives it
  // away is the grey head, the pointed ears and the long tail.
  return (
    <svg viewBox="0 0 64 44" aria-hidden>
      {wolf && <path d="M10 22C4 20 1 15 3 9c3 3 6 5 10 6Z" fill="#6f7480" />}
      <g stroke="#3b3a44" strokeWidth="2" strokeLinecap="round"><path d="M20 32v9M27 33v8M38 33v8M45 32v9" /></g>
      <g fill="#fbfaf6" stroke="#d9d4c8" strokeWidth="1">
        <circle cx="17" cy="22" r="9" /><circle cx="27" cy="16" r="10" /><circle cx="39" cy="16" r="10" /><circle cx="46" cy="24" r="9" /><circle cx="31" cy="27" r="10" />
      </g>
      {wolf ? (
        <g>
          <path d="M46 6l3 9h-6ZM55 5l1 9h-6Z" fill="#6f7480" />
          <path d="M44 14h12l7 8-7 5H46a7 7 0 0 1-2-13Z" fill="#6f7480" />
          <circle cx="53" cy="18" r="1.6" fill="#ffd54a" />
        </g>
      ) : (
        <g>
          <ellipse cx="53" cy="19" rx="7" ry="8" fill="#3b3a44" />
          <path d="M47 13l-5-2M58 12l4-3" stroke="#3b3a44" strokeWidth="3" strokeLinecap="round" />
          <circle cx="55" cy="17" r="1.3" fill="#fff" />
        </g>
      )}
    </svg>
  )
}

function Sheep({ ch, room, start, end, submit }) {
  const { t } = useApp()
  const plan = useMemo(() => sheepPlan(ch.seed), [ch.seed])
  // Where in the show this phone joined it (a reload lands mid-flock).
  const [joined] = useState(() => room.now() - start)
  const [asking, setAsking] = useState(joined >= SHEEP_SHOW)
  const [guess, setGuess] = useState('')
  useAt(room, start + SHEEP_SHOW, () => setAsking(true))
  useAt(room, end - 350, () => { if (guess) submit(Number(guess)) })

  if (!asking) {
    return (
      <div className="gm-field" dir="ltr">
        <span className="gm-field-fence" />
        {plan.animals.map((a, i) => (
          <span key={i} className={`gm-animal lane-${a.lane}`} style={{ animationDuration: `${a.ms}ms`, animationDelay: `${a.at - joined}ms` }}>
            <span className="gm-animal-hop" style={{ animationDuration: `${a.ms}ms`, animationDelay: `${a.at - joined}ms` }}><Animal wolf={a.wolf} /></span>
          </span>
        ))}
      </div>
    )
  }
  return (
    <div className="gm-ask">
      <p className="gm-q">{t(L('كم خروفًا عبر الحقل؟', 'How many sheep crossed the field?'))}</p>
      <output className="gm-readout" dir="ltr">{guess || '–'}</output>
      <NumPad value={guess} onChange={setGuess} max={2} />
      <button type="button" className="gm-btn is-main" disabled={!guess} onClick={() => submit(Number(guess))}>{t(L('هذا عددي', 'That’s my count'))}</button>
    </div>
  )
}

/* ------------------------------ the vigilance test ------------------------------ */
function Reflex({ ch, room, end, submit }) {
  const { t } = useApp()
  const waits = useMemo(() => reflexPlan(ch.seed), [ch.seed])
  const [trial, setTrial] = useState(0)
  const [state, setState] = useState('wait') // wait → go → hit | early | slow
  const [shownMs, setShownMs] = useState(0)
  const times = useRef([])
  const goAt = useRef(0)
  const timer = useRef(null)
  const sent = useRef(false)

  const finish = () => {
    if (sent.current) return
    sent.current = true
    // Rounds never reached count as the slowest allowed.
    const all = [...times.current]
    while (all.length < REFLEX.trials) all.push(REFLEX.limit)
    submit(all.reduce((a, b) => a + b, 0) / all.length)
  }
  useAt(room, end - 350, finish)

  useEffect(() => {
    if (trial >= REFLEX.trials) { finish(); return undefined }
    setState('wait')
    timer.current = setTimeout(() => {
      setState('go')
      // Timed from the frame that shows the signal, not from the timer.
      requestAnimationFrame(() => { goAt.current = performance.now() })
      goAt.current = performance.now()
      timer.current = setTimeout(() => record(REFLEX.limit, 'slow'), REFLEX.limit)
    }, waits[trial])
    return () => clearTimeout(timer.current)
    // One run per round.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trial])

  function record(ms, as) {
    clearTimeout(timer.current)
    times.current.push(ms)
    setShownMs(Math.round(ms))
    setState(as)
    if (as === 'hit') sfx.right(); else sfx.wrong()
    timer.current = setTimeout(() => setTrial((n) => n + 1), REFLEX.pause)
  }

  const tap = (e) => {
    e.preventDefault()
    if (state === 'wait') record(REFLEX.early, 'early')
    else if (state === 'go') record(Math.max(60, performance.now() - goAt.current), 'hit')
  }

  const text = {
    wait: L('انتظر…', 'Wait…'),
    go: L('انقر!', 'Tap!'),
    early: L('قبل الإشارة!', 'Too soon!'),
    slow: L('فاتتك', 'Missed it'),
    hit: null,
  }[state]
  return (
    <button type="button" className={`gm-reflex is-${state}`} onPointerDown={tap}>
      <small dir="ltr">{Math.min(trial + 1, REFLEX.trials)} / {REFLEX.trials}</small>
      <strong>{state === 'hit' ? <span dir="ltr">{shownMs} ms</span> : t(text)}</strong>
    </button>
  )
}

/* ------------------------------ the digits ------------------------------ */
function Memory({ ch, room, start, end, submit }) {
  const { t } = useApp()
  const digits = useMemo(() => memoryDigits(ch.seed), [ch.seed])
  const showEnd = start + MEMORY.lead + MEMORY.digits * MEMORY.each
  const [tick, setTick] = useState(() => room.now())
  const [typed, setTyped] = useState('')
  const showing = tick < showEnd
  useEffect(() => {
    if (!showing) return undefined
    const id = setInterval(() => setTick(room.now()), 60)
    return () => clearInterval(id)
  }, [room, showing])
  useAt(room, end - 350, () => { if (typed) submit(typed) })

  if (showing) {
    const since = tick - start - MEMORY.lead
    const index = Math.floor(since / MEMORY.each)
    // Each digit is up for most of its slot and then gone: two of the same
    // shape in a row must still read as two.
    const visible = since >= 0 && since % MEMORY.each < MEMORY.each * 0.78
    return (
      <div className="gm-digits">
        <small dir="ltr">{Math.max(0, Math.min(MEMORY.digits, index + 1))} / {MEMORY.digits}</small>
        <strong dir="ltr" key={index}>{visible && index >= 0 ? digits[index] : ' '}</strong>
      </div>
    )
  }
  return (
    <div className="gm-ask">
      <p className="gm-q">{t(L('اكتبها بالترتيب', 'Type them back, in order'))}</p>
      <output className="gm-readout is-wide" dir="ltr">{typed.padEnd(MEMORY.digits, '·')}</output>
      <NumPad value={typed} onChange={setTyped} max={MEMORY.digits} />
      <button type="button" className="gm-btn is-main" disabled={!typed} onClick={() => submit(typed)}>{t(L('تمّ', 'Done'))}</button>
    </div>
  )
}

/* ------------------------------ Stroop ------------------------------ */
const INK = { red: '#d93b40', blue: '#2f5bd8', green: '#1f9460', yellow: '#c99700' }
const COLOR_NAME = { red: L('أحمر', 'RED'), blue: L('أزرق', 'BLUE'), green: L('أخضر', 'GREEN'), yellow: L('أصفر', 'YELLOW') }

function Stroop({ ch, room, end, submit }) {
  const { t } = useApp()
  const trials = useMemo(() => stroopTrials(ch.seed), [ch.seed])
  const [at, setAt] = useState(0)
  const [score, setScore] = useState(0)
  const [flash, setFlash] = useState('')
  const total = useRef(0)
  useAt(room, end - 350, () => submit(total.current))

  const pick = (ink) => {
    const right = trials[at % trials.length].ink === ink
    total.current += right ? 1 : -1
    setScore(total.current)
    setFlash(right ? 'ok' : 'no')
    if (!right) sfx.wrong()
    setAt((n) => n + 1)
  }
  const trial = trials[at % trials.length]
  return (
    <div className="gm-stroop">
      <small className="gm-run">{t(L('الرصيد', 'Score'))} <b dir="ltr">{score}</b></small>
      <strong key={at} className={`gm-stroop-word is-${flash}`} style={{ color: INK[STROOP_COLORS[trial.ink]] }}>
        {t(COLOR_NAME[STROOP_COLORS[trial.word]])}
      </strong>
      <div className="gm-stroop-keys">
        {STROOP_COLORS.map((name, ink) => (
          <button key={name} type="button" style={{ '--ink': INK[name] }} onPointerDown={(e) => { e.preventDefault(); pick(ink) }}>
            <span />{t(COLOR_NAME[name])}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------ the one arrow ------------------------------ */
function Search({ ch, room, end, submit }) {
  const { t } = useApp()
  const rounds = useMemo(() => searchRounds(ch.seed), [ch.seed])
  const [at, setAt] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [miss, setMiss] = useState(-1)
  const sent = useRef(false)
  const tally = useRef({ found: 0, wrong: 0 })

  const finish = () => {
    if (sent.current) return
    sent.current = true
    const { found, wrong: bad } = tally.current
    // Ten a find, three off for a wrong tap, and the seconds left over if all
    // eight were found.
    const spare = found >= SEARCH.rounds ? Math.max(0, Math.floor((end - room.now()) / 1000)) : 0
    submit(Math.max(0, found * 10 - bad * 3 + spare))
  }
  useAt(room, end - 350, finish)

  const tap = (cell) => {
    if (sent.current) return
    if (cell === rounds[at].target) {
      tally.current.found += 1
      sfx.step()
      if (at + 1 >= SEARCH.rounds) finish()
      else { setAt(at + 1); setMiss(-1) }
    } else {
      tally.current.wrong += 1
      setWrong(tally.current.wrong)
      setMiss(cell)
      sfx.wrong()
    }
  }
  const round = rounds[Math.min(at, SEARCH.rounds - 1)]
  return (
    <div className="gm-search">
      <small className="gm-run"><b dir="ltr">{at} / {SEARCH.rounds}</b>{wrong > 0 && <span dir="ltr"> · −{wrong * 3}</span>}</small>
      <div className="gm-search-grid" dir="ltr" key={at} style={{ '--cols': SEARCH.cols }}>
        {round.dirs.map((dir, cell) => (
          <button key={cell} type="button" className={cell === miss ? 'is-miss' : ''} onPointerDown={(e) => { e.preventDefault(); tap(cell) }}
            aria-label={t(L('سهم', 'arrow'))}>
            <span style={{ transform: `rotate(${dir * 90}deg)` }}><Icon name="⬆" /></span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------ the stag hunt ------------------------------ */
function Stag({ submit }) {
  const { t } = useApp()
  return (
    <div className="gm-pair">
      <button type="button" className="gm-choice is-big" onClick={() => submit(1)}>
        <Icon name="🦌" />
        <strong>{t(L('الأيّل', 'The stag'))}</strong>
        <small>{t(L(`+${STAG.together} لكلٍّ منّا… إن ذهبنا كلّنا`, `+${STAG.together} each… if we ALL go`))}</small>
      </button>
      <button type="button" className="gm-choice is-big" onClick={() => submit(0)}>
        <Icon name="🐑" />
        <strong>{t(L('الأرنب', 'The hare'))}</strong>
        <small>{t(L(`+${STAG.hare} لي، مضمونة`, `+${STAG.hare} for me, guaranteed`))}</small>
      </button>
    </div>
  )
}

/* ------------------------------ the auction ------------------------------ */
function Auction({ submit }) {
  const { t } = useApp()
  return (
    <div className="gm-bids">
      {Array.from({ length: AUCTION.max + 1 }, (_, bid) => (
        <button key={bid} type="button" className="gm-choice" onClick={() => submit(bid)}>
          <strong dir="ltr">{bid}</strong>
          <small>{bid === 0 ? t(L('لا أشارك', 'I’m out')) : t(L(`إن فزتُ: +${AUCTION.prize - bid}`, `if I win: +${AUCTION.prize - bid}`))}</small>
        </button>
      ))}
    </div>
  )
}

const GAMES = { sheep: Sheep, reflex: Reflex, memory: Memory, stroop: Stroop, search: Search, stag: Stag, auction: Auction }

/* One mini-game, from its briefing to "sent". `mine` is this player's answer if
   they have already given one. */
export default function MiniPlay({ ch, room, mine, submit, now }) {
  const { t } = useApp()
  const mini = miniById(ch.id)
  const start = ch.t0 + mini.brief
  const [left, setLeft] = useState(() => start - room.now())
  useEffect(() => {
    if (left <= 0) return undefined
    const id = setInterval(() => setLeft(start - room.now()), 100)
    return () => clearInterval(id)
  }, [room, start, left > 0]) // eslint-disable-line react-hooks/exhaustive-deps

  if (mine) {
    return (
      <div className="gm-wait">
        <Icon name="✓" />
        <p>{t(L('وصلت نتيجتك. ننتظر البقيّة…', 'Your result is in. Waiting for the others…'))}</p>
      </div>
    )
  }
  const Game = GAMES[ch.id]
  if (left > 0) {
    return (
      <div className="gm-brief">
        <p>{t(MINI[ch.id].how)}</p>
        <strong dir="ltr">{Math.ceil(left / 1000)}</strong>
      </div>
    )
  }
  return (
    <>
      {mini.brief ? <TimeBar now={now ?? room.now()} t0={start} t1={ch.t1} /> : <p className="gm-q">{t(MINI[ch.id].how)}</p>}
      <Game ch={ch} room={room} start={start} end={ch.t1} submit={submit} />
    </>
  )
}
