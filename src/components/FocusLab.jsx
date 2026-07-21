import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import RichText from './RichText.jsx'
import ResultCard from './ResultCard.jsx'
import { SfDistractedReading } from './figures/stolen-focus/DistractedReading.jsx'

const L = (ar, en) => ({ ar, en })

/* ---- small stats helpers (ints, ms) ---- */
const median = (a) => {
  if (!a.length) return 0
  const s = [...a].sort((x, y) => x - y)
  const m = s.length >> 1
  return Math.round(s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2)
}
const mean = (a) => (a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : 0)
const stdev = (a) => {
  if (a.length < 2) return 0
  const m = a.reduce((s, x) => s + x, 0) / a.length
  return Math.round(Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / a.length))
}
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x))
const shuffle = (a) => {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

/* ============================================================
   Test 1 — Stroop (selective attention / interference)
   6 practice trials, then 28 timed trials with a 2s deadline.
   ============================================================ */
const STROOP_COLORS = [
  { key: 'red', hex: '#e5484d', label: L('أحمر', 'Red') },
  { key: 'blue', hex: '#3b82f6', label: L('أزرق', 'Blue') },
  { key: 'green', hex: '#30a46c', label: L('أخضر', 'Green') },
  { key: 'yellow', hex: '#e0a500', label: L('أصفر', 'Yellow') },
]
const colorOf = (k) => STROOP_COLORS.find((c) => c.key === k)
const STROOP_PRACTICE = 6
const STROOP_MAIN = 28
const STROOP_DEADLINE = 2000
function genStroop() {
  const make = (n) => {
    const out = []
    for (let i = 0; i < n; i++) {
      const cong = i % 2 === 0
      const word = STROOP_COLORS[Math.floor(Math.random() * 4)]
      let ink = word
      if (!cong) {
        const others = STROOP_COLORS.filter((c) => c.key !== word.key)
        ink = others[Math.floor(Math.random() * others.length)]
      }
      out.push({ word: word.key, ink: ink.key, cong })
    }
    return shuffle(out)
  }
  return [
    ...make(STROOP_PRACTICE).map((x) => ({ ...x, practice: true })),
    ...make(STROOP_MAIN).map((x) => ({ ...x, practice: false })),
  ]
}
function StroopTest({ onDone }) {
  const { t } = useApp()
  const [phase, setPhase] = useState('idle') // idle | show | blank | late | done
  const [idx, setIdx] = useState(0)
  const trials = useRef([]); const recs = useRef([]); const tStart = useRef(0)
  const timer = useRef(null); const deadline = useRef(null)
  useEffect(() => () => { clearTimeout(timer.current); clearTimeout(deadline.current) }, [])

  const finish = () => {
    setPhase('done')
    const r = recs.current.filter((x) => !x.practice)
    const cong = r.filter((x) => x.cong && x.correct).map((x) => x.rt)
    const incong = r.filter((x) => !x.cong && x.correct).map((x) => x.rt)
    const acc = Math.round((100 * r.filter((x) => x.correct).length) / r.length)
    const timeouts = r.filter((x) => x.timeout).length
    onDone({ congRT: median(cong), incongRT: median(incong), interference: Math.max(0, median(incong) - median(cong)), acc, timeouts })
  }
  // NB: timeout chains re-enter these closures from stale renders, so the
  // current index is always passed as a parameter — never read from state.
  const advance = (i, afterMs) => {
    timer.current = setTimeout(() => {
      const ni = i + 1
      if (ni >= trials.current.length) return finish()
      setIdx(ni); setPhase('show'); arm(ni)
    }, afterMs)
  }
  const arm = (i) => {
    tStart.current = performance.now()
    clearTimeout(deadline.current)
    deadline.current = setTimeout(() => {
      const trial = trials.current[i]
      recs.current.push({ rt: null, correct: false, timeout: true, cong: trial.cong, practice: trial.practice })
      setPhase('late'); advance(i, 600)
    }, STROOP_DEADLINE)
  }
  const start = () => { trials.current = genStroop(); recs.current = []; setIdx(0); setPhase('show'); arm(0) }
  const answer = (key) => {
    if (phase !== 'show') return
    clearTimeout(deadline.current)
    const trial = trials.current[idx]
    recs.current.push({ rt: performance.now() - tStart.current, correct: key === trial.ink, timeout: false, cong: trial.cong, practice: trial.practice })
    setPhase('blank'); advance(idx, 350)
  }

  if (phase === 'idle') return <StartBtn onClick={start} label={L('ابدأ اختبار ستروب', 'Start the Stroop test')} />
  if (phase === 'done') return null
  const trial = trials.current[idx]
  const isPractice = trial.practice
  const shown = isPractice ? idx + 1 : idx + 1 - STROOP_PRACTICE
  const total = isPractice ? STROOP_PRACTICE : STROOP_MAIN
  return (
    <div className="fl-stage">
      <div className="fl-progress">
        {isPractice ? t(L(`تمرين ${shown} / ${total}`, `Practice ${shown} / ${total}`)) : t({ ar: `${shown} / ${total}`, en: `${shown} / ${total}` })}
      </div>
      <div className="fl-stim" aria-live="off">
        {phase === 'show' && <span className="fl-stroop-word" style={{ color: colorOf(trial.ink).hex }}>{t(colorOf(trial.word).label)}</span>}
        {phase === 'blank' && <span className="fl-fix">+</span>}
        {phase === 'late' && <span className="fl-timeout">⏱ {t(L('فات الوقت!', 'Too slow!'))}</span>}
      </div>
      <p className="fl-hint">{t(L('اضغط على لون الحبر (لا الكلمة) — أمامك ثانيتان فقط', 'Tap the ink colour (not the word) — you have only 2 seconds'))}</p>
      <div className="fl-btn-row">
        {STROOP_COLORS.map((c) => (
          <button key={c.key} className="fl-color-btn" onClick={() => answer(c.key)} disabled={phase !== 'show'}>
            <span className="fl-swatch" style={{ background: c.hex }} aria-hidden />
            {t(c.label)}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   Test 2 — Task-switching with pure blocks (switch + mixing cost)
   Block 1: shape only. Block 2: colour only. Block 3: mixed cues.
   ============================================================ */
const SW_SHAPES = ['circle', 'square']
const SW_COLORS = [{ key: 'blue', hex: '#3b82f6' }, { key: 'orange', hex: '#e8843c' }]
const SW_DEADLINE = 2500
const SW_BLOCKS = [
  { kind: 'shape', n: 10, intro: L('الجولة ١ من ٣ — احكم على **الشكل** فقط. جولةٌ نقيّة: قاعدةٌ واحدة لا تتغيّر.', 'Round 1 of 3 — judge the **shape** only. A pure round: one rule that never changes.') },
  { kind: 'color', n: 10, intro: L('الجولة ٢ من ٣ — احكم على **اللون** فقط. ما زالت قاعدةً واحدة.', 'Round 2 of 3 — judge the **colour** only. Still a single rule.') },
  { kind: 'mixed', n: 28, intro: L('الجولة ٣ من ٣ — الآن تتبدّل القاعدة عشوائياً قبل كلّ محاولة، وكلّ الأزرار الأربعة أمامك. هنا يظهر ثمن التبديل.', 'Round 3 of 3 — now the rule switches randomly before every trial, and all four buttons face you. This is where the switch tax shows.') },
]
function genSwitchBlock(kind, n) {
  const trials = []
  let prev = null
  for (let i = 0; i < n; i++) {
    const rule = kind === 'mixed' ? (Math.random() < 0.5 ? 'shape' : 'color') : kind
    trials.push({
      shape: SW_SHAPES[Math.floor(Math.random() * 2)],
      color: SW_COLORS[Math.floor(Math.random() * 2)].key,
      rule, mixed: kind === 'mixed', isSwitch: kind === 'mixed' && prev != null && rule !== prev,
    })
    prev = rule
  }
  return trials
}
function SwitchTest({ onDone }) {
  const { t } = useApp()
  const [phase, setPhase] = useState('idle') // idle | intro | show | blank | late | done
  const [block, setBlock] = useState(0)
  const [idx, setIdx] = useState(0)
  const trials = useRef([]); const recs = useRef([]); const tStart = useRef(0)
  const timer = useRef(null); const deadline = useRef(null)
  useEffect(() => () => { clearTimeout(timer.current); clearTimeout(deadline.current) }, [])

  const finish = () => {
    setPhase('done')
    const r = recs.current
    const pure = r.filter((x) => !x.mixed && x.correct).map((x) => x.rt)
    const rep = r.filter((x) => x.mixed && !x.isSwitch && x.correct).map((x) => x.rt)
    const sw = r.filter((x) => x.mixed && x.isSwitch && x.correct).map((x) => x.rt)
    const acc = Math.round((100 * r.filter((x) => x.correct).length) / r.length)
    onDone({
      pureRT: mean(pure), repeatRT: mean(rep), switchRT: mean(sw),
      switchCost: Math.max(0, mean(sw) - mean(rep)),
      mixingCost: Math.max(0, mean(rep) - mean(pure)),
      acc,
    })
  }
  const arm = (i) => {
    tStart.current = performance.now()
    clearTimeout(deadline.current)
    deadline.current = setTimeout(() => {
      const trial = trials.current[i]
      recs.current.push({ rt: null, correct: false, mixed: trial.mixed, isSwitch: trial.isSwitch })
      setPhase('late')
      timer.current = setTimeout(() => next(i), 600)
    }, SW_DEADLINE)
  }
  const next = (i) => {
    const ni = i + 1
    if (ni >= trials.current.length) {
      if (block >= SW_BLOCKS.length - 1) return finish()
      setBlock(block + 1); setPhase('intro'); return
    }
    setIdx(ni); setPhase('show'); arm(ni)
  }
  const beginBlock = () => {
    const b = SW_BLOCKS[block]
    trials.current = genSwitchBlock(b.kind, b.n)
    setIdx(0); setPhase('show'); arm(0)
  }
  const answer = (dim, val) => {
    if (phase !== 'show') return
    clearTimeout(deadline.current)
    const trial = trials.current[idx]
    const correct = dim === trial.rule && val === trial[trial.rule]
    recs.current.push({ rt: performance.now() - tStart.current, correct, mixed: trial.mixed, isSwitch: trial.isSwitch })
    setPhase('blank')
    timer.current = setTimeout(() => next(idx), 300)
  }

  if (phase === 'idle') return <StartBtn onClick={() => setPhase('intro')} label={L('ابدأ اختبار التبديل', 'Start the switching test')} />
  if (phase === 'done') return null
  if (phase === 'intro') {
    return (
      <div className="fl-stage">
        <RichText as="p" className="fl-hint" value={SW_BLOCKS[block].intro} />
        <button className="btn primary" onClick={beginBlock}>{t(L('ابدأ الجولة', 'Start the round'))}</button>
      </div>
    )
  }
  const b = SW_BLOCKS[block]
  const trial = trials.current[idx]
  const ink = SW_COLORS.find((c) => c.key === trial.color).hex
  const shapeBtns = (
    <>
      <button className="fl-resp-btn" onClick={() => answer('shape', 'circle')} disabled={phase !== 'show'}>⬤ {t(L('دائرة', 'Circle'))}</button>
      <button className="fl-resp-btn" onClick={() => answer('shape', 'square')} disabled={phase !== 'show'}>⬛ {t(L('مربّع', 'Square'))}</button>
    </>
  )
  const colorBtns = (
    <>
      <button className="fl-resp-btn" onClick={() => answer('color', 'blue')} disabled={phase !== 'show'}>
        <span className="fl-swatch" style={{ background: '#3b82f6' }} aria-hidden /> {t(L('أزرق', 'Blue'))}
      </button>
      <button className="fl-resp-btn" onClick={() => answer('color', 'orange')} disabled={phase !== 'show'}>
        <span className="fl-swatch" style={{ background: '#e8843c' }} aria-hidden /> {t(L('برتقالي', 'Orange'))}
      </button>
    </>
  )
  return (
    <div className="fl-stage">
      <div className="fl-progress">{t({ ar: `${idx + 1} / ${b.n}`, en: `${idx + 1} / ${b.n}` })}</div>
      <div className={`fl-cue ${trial.mixed && trial.isSwitch ? 'switch' : ''}`}>
        {trial.rule === 'shape' ? t(L('🔷 احكم على الشكل', '🔷 Judge the SHAPE')) : t(L('🎨 احكم على اللون', '🎨 Judge the COLOUR'))}
      </div>
      <div className="fl-stim">
        {phase === 'show' && (
          <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden>
            {trial.shape === 'circle'
              ? <circle cx="40" cy="40" r="30" fill={ink} />
              : <rect x="12" y="12" width="56" height="56" rx="6" fill={ink} />}
          </svg>
        )}
        {phase === 'late' && <span className="fl-timeout">⏱ {t(L('فات الوقت!', 'Too slow!'))}</span>}
      </div>
      <div className="fl-btn-row">
        {b.kind === 'shape' && shapeBtns}
        {b.kind === 'color' && colorBtns}
        {b.kind === 'mixed' && <>{shapeBtns}{colorBtns}</>}
      </div>
    </div>
  )
}

/* ============================================================
   Test 3 — SART (sustained attention): tap every digit except 3
   Faster pace, varying digit sizes, and a vigilance-drift metric.
   ============================================================ */
const SART_N = 54
const SART_TARGETS = 7
function genSart() {
  // Place the no-go 3s at spaced positions (never in the first 3 trials).
  const pos = new Set()
  while (pos.size < SART_TARGETS) {
    const p = 3 + Math.floor(Math.random() * (SART_N - 3))
    if ([...pos].every((q) => Math.abs(q - p) >= 3)) pos.add(p)
  }
  const digits = []
  for (let i = 0; i < SART_N; i++) {
    if (pos.has(i)) digits.push(3)
    else { let d = 3; while (d === 3) d = 1 + Math.floor(Math.random() * 9); digits.push(d) }
  }
  const sizes = ['s1', 's2', 's3']
  return digits.map((d) => ({ d, size: sizes[Math.floor(Math.random() * 3)] }))
}
function SartTest({ onDone }) {
  const { t } = useApp()
  const [idx, setIdx] = useState(-1) // -1 idle
  const [showing, setShowing] = useState(true)
  const [done, setDone] = useState(false)
  const trials = useRef([]); const recs = useRef([])
  const tapped = useRef(false); const tStart = useRef(0); const tapRt = useRef(0)

  const finish = useCallback(() => {
    setDone(true)
    const r = recs.current
    const commission = r.filter((x) => x.digit === 3 && x.tapped).length
    const omission = r.filter((x) => x.digit !== 3 && !x.tapped).length
    const go = r.filter((x) => x.digit !== 3 && x.tapped)
    const goRTs = go.map((x) => x.rt)
    const half = Math.floor(r.length / 2)
    const v1 = stdev(go.filter((x) => x.i < half).map((x) => x.rt))
    const v2 = stdev(go.filter((x) => x.i >= half).map((x) => x.rt))
    onDone({ commission, omission, meanRT: mean(goRTs), rtVar: stdev(goRTs), drift: v2 - v1, noGo: r.filter((x) => x.digit === 3).length })
  }, [onDone])

  useEffect(() => {
    if (idx < 0) return
    if (idx >= trials.current.length) { finish(); return }
    tapped.current = false; tStart.current = performance.now(); setShowing(true)
    const t1 = setTimeout(() => setShowing(false), 700)
    const t2 = setTimeout(() => {
      recs.current.push({ i: idx, digit: trials.current[idx].d, tapped: tapped.current, rt: tapped.current ? tapRt.current : null })
      setIdx((i) => i + 1)
    }, 950)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [idx, finish])

  const tap = useCallback(() => {
    if (idx < 0 || done || tapped.current) return
    tapped.current = true; tapRt.current = performance.now() - tStart.current
  }, [idx, done])

  useEffect(() => {
    const onKey = (e) => { if (e.code === 'Space' && idx >= 0 && !done) { e.preventDefault(); tap() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tap, idx, done])

  if (done) return null
  if (idx < 0) {
    return <StartBtn onClick={() => { trials.current = genSart(); recs.current = []; setDone(false); setIdx(0) }}
      label={L('ابدأ اختبار الانتباه المستمرّ', 'Start the sustained-attention test')} />
  }
  const trial = trials.current[idx]
  return (
    <div className="fl-stage">
      <div className="fl-progress">{t({ ar: `${idx + 1} / ${SART_N}`, en: `${idx + 1} / ${SART_N}` })}</div>
      <p className="fl-hint">{t(L('اضغط عند كلّ رقم — إلّا الرقم ٣ فامتنع! (الحجم المتغيّر مقصود)', 'Tap on every digit — except 3, hold back! (The changing size is deliberate)'))}</p>
      <button className="fl-sart-stage" onClick={tap} aria-label={t(L('اضغط', 'Tap'))}>
        {showing ? <span className={`fl-digit ${trial.size} ${trial.d === 3 ? 'nogo' : ''}`}>{t({ ar: String(trial.d), en: String(trial.d) })}</span> : <span className="fl-fix">+</span>}
      </button>
      <p className="fl-hint fl-hint--sm">{t(L('اضغط المساحة أو انقر الصندوق', 'Press Space or tap the box'))}</p>
    </div>
  )
}

/* ============================================================
   Test 4 — Visual search (filtering): find the red circle
   Set size grows 6 → 12 → 20; measures the cost of extra noise.
   ============================================================ */
const SEARCH_SIZES = [6, 6, 12, 12, 20, 20]
function genSearchItems(n) {
  const items = [{ target: true, shape: 'circle', color: '#e5484d' }]
  for (let i = 1; i < n; i++) {
    items.push(i % 2 === 0
      ? { target: false, shape: 'square', color: '#e5484d' }
      : { target: false, shape: 'circle', color: '#3b82f6' })
  }
  return shuffle(items)
}
function SearchTest({ onDone }) {
  const { t } = useApp()
  const [phase, setPhase] = useState('idle') // idle | show | done
  const [trial, setTrial] = useState(0)
  const [items, setItems] = useState([])
  const [miss, setMiss] = useState(false)
  const times = useRef({}); const errors = useRef(0); const tStart = useRef(0); const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const launch = (i) => {
    setItems(genSearchItems(SEARCH_SIZES[i])); setTrial(i); setMiss(false)
    tStart.current = performance.now()
  }
  const start = () => { times.current = {}; errors.current = 0; setPhase('show'); launch(0) }
  const finish = () => {
    setPhase('done')
    const m = times.current
    const rt6 = mean(m[6] || []), rt12 = mean(m[12] || []), rt20 = mean(m[20] || [])
    onDone({ rt6, rt12, rt20, slope: Math.max(0, Math.round((rt20 - rt6) / 14)), errors: errors.current })
  }
  const clickItem = (it) => {
    if (phase !== 'show') return
    if (!it.target) {
      errors.current += 1; setMiss(true)
      clearTimeout(timer.current); timer.current = setTimeout(() => setMiss(false), 700)
      return
    }
    const size = SEARCH_SIZES[trial]
    times.current[size] = [...(times.current[size] || []), performance.now() - tStart.current]
    if (trial + 1 >= SEARCH_SIZES.length) return finish()
    launch(trial + 1)
  }

  if (phase === 'idle') return <StartBtn onClick={start} label={L('ابدأ لعبة التصفية', 'Start the filtering game')} />
  if (phase === 'done') return null
  const size = SEARCH_SIZES[trial]
  return (
    <div className="fl-stage">
      <div className="fl-progress">{t({ ar: `${trial + 1} / ${SEARCH_SIZES.length}`, en: `${trial + 1} / ${SEARCH_SIZES.length}` })}</div>
      <p className="fl-hint">
        {t(L(`اعثر على الدائرة الحمراء وانقرها — وسط ${size - 1} مشتِّتاً`, `Find and tap the red circle — among ${size - 1} distractors`))}
        {miss && <strong className="fl-timeout"> {t(L('ليس هذا!', 'Not that one!'))}</strong>}
      </p>
      <div className="fl-search-grid">
        {items.map((it, i) => (
          <button key={i} className="fl-search-item" onClick={() => clickItem(it)} aria-label={it.target ? t(L('الهدف', 'Target')) : t(L('مشتِّت', 'Distractor'))}>
            <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden>
              {it.shape === 'circle'
                ? <circle cx="20" cy="20" r="15" fill={it.color} />
                : <rect x="6" y="6" width="28" height="28" rx="4" fill={it.color} />}
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   Test 5 — 2-back (working memory): does the symbol match the
   one shown two steps earlier?
   ============================================================ */
const NBACK_POOL = ['🍎', '🔔', '🌙', '⭐', '🍀', '🎲', '🎈', '🔑']
const NBACK_N = 26
const NBACK_TARGETS = 7
function genNback() {
  const targets = new Set()
  while (targets.size < NBACK_TARGETS) {
    const p = 2 + Math.floor(Math.random() * (NBACK_N - 2))
    if (![...targets].some((q) => Math.abs(q - p) < 2)) targets.add(p)
  }
  const seq = []
  for (let i = 0; i < NBACK_N; i++) {
    if (targets.has(i)) { seq.push(seq[i - 2]); continue }
    let s = null
    do { s = NBACK_POOL[Math.floor(Math.random() * NBACK_POOL.length)] } while (i >= 2 && s === seq[i - 2])
    seq.push(s)
  }
  return seq.map((s, i) => ({ s, isTarget: targets.has(i) }))
}
function NbackTest({ onDone }) {
  const { t } = useApp()
  const [idx, setIdx] = useState(-1)
  const [showing, setShowing] = useState(true)
  const [done, setDone] = useState(false)
  const [flash, setFlash] = useState(false)
  const trials = useRef([]); const recs = useRef([])
  const pressed = useRef(false); const tStart = useRef(0); const pressRt = useRef(0)

  const finish = useCallback(() => {
    setDone(true)
    const r = recs.current
    const hits = r.filter((x) => x.isTarget && x.pressed).length
    const fa = r.filter((x) => !x.isTarget && x.pressed).length
    const hitRTs = r.filter((x) => x.isTarget && x.pressed).map((x) => x.rt)
    onDone({ hits, misses: NBACK_TARGETS - hits, fa, hitRT: mean(hitRTs), targets: NBACK_TARGETS })
  }, [onDone])

  useEffect(() => {
    if (idx < 0) return
    if (idx >= trials.current.length) { finish(); return }
    pressed.current = false; tStart.current = performance.now(); setShowing(true)
    const t1 = setTimeout(() => setShowing(false), 1100)
    const t2 = setTimeout(() => {
      recs.current.push({ isTarget: trials.current[idx].isTarget, pressed: pressed.current, rt: pressed.current ? pressRt.current : null })
      setIdx((i) => i + 1)
    }, 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [idx, finish])

  const press = useCallback(() => {
    if (idx < 2 || done || pressed.current) return
    pressed.current = true; pressRt.current = performance.now() - tStart.current
    setFlash(true); setTimeout(() => setFlash(false), 200)
  }, [idx, done])

  useEffect(() => {
    const onKey = (e) => { if (e.code === 'Space' && idx >= 0 && !done) { e.preventDefault(); press() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [press, idx, done])

  if (done) return null
  if (idx < 0) {
    return <StartBtn onClick={() => { trials.current = genNback(); recs.current = []; setDone(false); setIdx(0) }}
      label={L('ابدأ اختبار الذاكرة العاملة', 'Start the working-memory test')} />
  }
  return (
    <div className="fl-stage">
      <div className="fl-progress">{t({ ar: `${idx + 1} / ${NBACK_N}`, en: `${idx + 1} / ${NBACK_N}` })}</div>
      <p className="fl-hint">{t(L('اضغط «تطابق» إذا كان الرمز هو نفسه الذي ظهر قبل خطوتين', 'Press “match” if the symbol is the same as the one two steps back'))}</p>
      <div className="fl-stim">
        {showing ? <span className="fl-nback-sym" aria-hidden>{trials.current[idx].s}</span> : <span className="fl-fix">·</span>}
      </div>
      <button className={`fl-resp-btn fl-nback-btn ${flash ? 'flash' : ''}`} onClick={press} disabled={idx < 2}>
        ✓ {t(L('تطابق! (أو المسافة)', 'Match! (or Space)'))}
      </button>
    </div>
  )
}

/* ============================================================
   Test 6 — Digit span (mental bandwidth): adaptive length
   Starts at 4 digits; grows on success; two misses end the run.
   ============================================================ */
const SPAN_START = 4
const SPAN_MAX = 10
function genSpanSeq(len) {
  const seq = []
  for (let i = 0; i < len; i++) {
    let d = null
    do { d = Math.floor(Math.random() * 10) } while (d === seq[i - 1])
    seq.push(d)
  }
  return seq
}
function SpanTest({ onDone }) {
  const { t } = useApp()
  const [phase, setPhase] = useState('idle') // idle | show | input | retry | done
  const [len, setLen] = useState(SPAN_START)
  const [showIdx, setShowIdx] = useState(0)
  const [entry, setEntry] = useState('')
  const seq = useRef([]); const best = useRef(SPAN_START - 1); const failedOnce = useRef(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const beginRound = (n) => { seq.current = genSpanSeq(n); setLen(n); setEntry(''); setShowIdx(0); setPhase('show') }
  useEffect(() => {
    if (phase !== 'show') return
    if (showIdx >= seq.current.length) { setPhase('input'); return }
    timer.current = setTimeout(() => setShowIdx((i) => i + 1), 750)
    return () => clearTimeout(timer.current)
  }, [phase, showIdx])

  const finish = () => { setPhase('done'); onDone({ span: best.current }) }
  const submit = () => {
    if (entry.length !== len) return
    if (entry === seq.current.join('')) {
      best.current = len; failedOnce.current = false
      if (len >= SPAN_MAX) return finish()
      beginRound(len + 1)
    } else if (!failedOnce.current) {
      failedOnce.current = true; setPhase('retry')
    } else finish()
  }
  const key = (d) => setEntry((e) => (e.length < len ? e + d : e))
  const back = () => setEntry((e) => e.slice(0, -1))

  useEffect(() => {
    if (phase !== 'input') return
    const onKey = (e) => {
      if (/^[0-9]$/.test(e.key)) key(e.key)
      else if (e.key === 'Backspace') back()
      else if (e.key === 'Enter') submit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (phase === 'idle') return <StartBtn onClick={() => { best.current = SPAN_START - 1; failedOnce.current = false; beginRound(SPAN_START) }}
    label={L('ابدأ اختبار سعة الذاكرة', 'Start the memory-span test')} />
  if (phase === 'done') return null
  if (phase === 'retry') {
    return (
      <div className="fl-stage">
        <p className="fl-hint">{t(L(`ليست هي — محاولةٌ أخيرة على ${len} أرقام بسلسلةٍ جديدة.`, `Not quite — one last try at ${len} digits with a fresh sequence.`))}</p>
        <button className="btn primary" onClick={() => beginRound(len)}>{t(L('حاول مجدّداً', 'Try again'))}</button>
      </div>
    )
  }
  return (
    <div className="fl-stage">
      <div className="fl-progress">{t(L(`السلسلة الحالية: ${len} أرقام`, `Current run: ${len} digits`))}</div>
      {phase === 'show' && (
        <>
          <p className="fl-hint">{t(L('احفظ الأرقام بالترتيب…', 'Memorise the digits in order…'))}</p>
          <div className="fl-stim">
            {showIdx < seq.current.length
              ? <span className="fl-span-digit">{t({ ar: String(seq.current[showIdx]), en: String(seq.current[showIdx]) })}</span>
              : <span className="fl-fix">+</span>}
          </div>
        </>
      )}
      {phase === 'input' && (
        <>
          <p className="fl-hint">{t(L('اكتبها بالترتيب نفسه', 'Type them back in the same order'))}</p>
          <div className="fl-span-entry" aria-live="polite">{entry.padEnd(len, '·')}</div>
          <div className="fl-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d) => (
              <button key={d} className="fl-key" onClick={() => key(String(d))}>{t({ ar: String(d), en: String(d) })}</button>
            ))}
          </div>
          <div className="fl-btn-row">
            <button className="fl-resp-btn" onClick={back}>⌫ {t(L('حذف', 'Delete'))}</button>
            <button className="btn primary" onClick={submit} disabled={entry.length !== len}>{t(L('تأكيد', 'Confirm'))}</button>
          </div>
        </>
      )}
    </div>
  )
}

/* ============================================================
   Shared bits
   ============================================================ */
function StartBtn({ onClick, label }) {
  const { t } = useApp()
  return <button className="btn primary" onClick={onClick}>{t(label)}</button>
}

function TestCard({ n, icon, title, desc, tie, done, children }) {
  const { t } = useApp()
  return (
    <section className={`fl-card card ${done ? 'done' : ''}`}>
      <div className="fl-card-head">
        <span className="fl-card-n">{done ? '✓' : n}</span>
        <div className="fl-card-titles">
          <strong className="fl-card-title"><span aria-hidden>{icon}</span> {t(title)}</strong>
          <span className="fl-card-desc">{t(desc)}</span>
        </div>
      </div>
      <div className="fl-card-body">{children}</div>
      {tie && <p className="fl-tie">🔗 <Link to={tie.to}>{t(tie.label)}</Link></p>}
    </section>
  )
}

/* ---- normalised 0–100 sub-scores for the overall snapshot ---- */
const SCORERS = {
  stroop: (r) => clamp(100 - r.interference / 4, 0, 100) * (r.acc / 100),
  switch: (r) => clamp(100 - (r.switchCost + r.mixingCost) / 6, 0, 100) * (r.acc / 100),
  sart: (r) => clamp(100 - r.commission * 12 - r.omission * 4 - Math.max(0, r.drift) / 8, 0, 100),
  search: (r) => clamp(100 - Math.max(0, r.slope - 8) * 2.2 - r.errors * 5, 0, 100),
  nback: (r) => clamp((r.hits / r.targets) * 70 + Math.max(0, 1 - r.fa / 6) * 30, 0, 100),
  span: (r) => clamp(((r.span - 3) * 100) / 6, 0, 100),
  reading: (r) => clamp((r.focus / 3) * 70 + (r.focus > r.distract ? 30 : r.focus === r.distract ? 15 : 0), 0, 100),
}
const GRADES = [
  { min: 85, icon: '🌸', label: L('أوركيد مزدهرة — انتباهٌ يُحسد عليه اليوم', 'A thriving orchid — enviable attention today') },
  { min: 65, icon: '🌿', label: L('تركيزٌ صلب — مع مواضع تستحقّ الرعاية', 'Solid focus — with spots worth tending') },
  { min: 45, icon: '🍂', label: L('انتباهٌ تحت الضغط — الأسباب الاثنا عشر تعمل فيك', 'Attention under pressure — the twelve causes are at work on you') },
  { min: 0, icon: '🚨', label: L('تركيزٌ مسروق — هذا الكتاب كُتب لك تحديداً', 'Stolen focus — this book was written precisely for you') },
]
/* Card accent per grade band, keyed by the band's `min` threshold. */
const GRADE_COLORS = { 85: 'var(--success)', 65: 'var(--cool)', 45: 'var(--warm)', 0: 'var(--danger)' }

/* ============================================================
   Focus Lab — orchestrates the seven tests
   ============================================================ */
export default function FocusLab({ bookTitle, sectionTitle }) {
  const { t } = useApp()
  const [res, setRes] = useState({})
  // Stable per-test handlers: a changing onDone identity would re-run the
  // timing effects (SART/n-back) mid-trial (e.g. on a theme/language toggle).
  const setters = useMemo(() => Object.fromEntries(
    ['stroop', 'switch', 'sart', 'search', 'nback', 'span', 'reading'].map((k) => [k, (v) => setRes((r) => ({ ...r, [k]: v }))])
  ), [])
  const reset = () => { setRes({}); window.scrollTo({ top: 0 }) }
  const doneCount = Object.keys(res).length

  const band = (ar, en) => ({ ar, en })
  const stroopMsg = res.stroop && (res.stroop.acc < 60
    ? band('أخطاءٌ أو مهلاتٌ فائتة كثيرة — المهلة القصيرة قاسية، جرّب جولةً أخرى بعد راحة.', 'Many errors or missed deadlines — the short deadline is harsh; try another round after a rest.')
    : res.stroop.interference > 250
    ? band('كلفة تداخلٍ عالية — الكلمات المشتِّتة أبطأتك كثيراً.', 'High interference cost — the distracting words slowed you a lot.')
    : band('كلفة تداخلٍ منخفضة — كبحتَ التشتيت جيّداً.', 'Low interference cost — you suppressed the distraction well.'))
  const switchMsg = res.switch && (res.switch.switchCost > 200
    ? band('كلفة تبديلٍ عالية — تبديل القاعدة أبطأك بوضوح. هذا ما يفعله «تعدّد المهامّ» بيومك كلّه.', 'High switch cost — changing the rule clearly slowed you. This is what “multitasking” does to your whole day.')
    : band('كلفة تبديلٍ منخفضة نسبياً — لكن لاحظ كلفة الخلط: حتى مجرّد توقّع التبديل يبطئك.', 'A relatively low switch cost — but note the mixing cost: merely expecting a switch slows you down.'))
  const sartMsg = res.sart && (res.sart.commission > 2
    ? band('انزلق انتباهك أحياناً (ضغطتَ على ٣). التشتّت التلقائي شائعٌ تماماً.', 'Your attention slipped at times (you tapped on 3). Automatic lapses are completely common.')
    : res.sart.omission > 5
    ? band('فاتتك أرقامٌ كثيرة — ربما كان الإيقاع أسرع ممّا توقّعت؛ جرّب جولةً أخرى.', 'You missed many digits — the pace may have been faster than you expected; try another round.')
    : band('حافظتَ على يقظتك جيّداً طوال المهمّة.', 'You held your vigilance well throughout the task.'))
  const searchMsg = res.search && (res.search.slope > 30
    ? band('كلّ عنصر ضجيجٍ إضافيّ كلّفك وقتاً ملموساً — هكذا يعمل «فيض المعلومات» على انتباهك.', 'Every extra piece of noise cost you real time — this is information overload acting on your attention.')
    : band('تصفيةٌ سريعة — عثرت على الهدف بكفاءة حتى وسط الزحام.', 'Fast filtering — you found the target efficiently even in the crowd.'))
  const nbackMsg = res.nback && (res.nback.hits >= 5 && res.nback.fa <= 2
    ? band('ذاكرة عاملة يقظة — أمسكت بمعظم التطابقات دون إنذارات كاذبة كثيرة.', 'An alert working memory — you caught most matches without many false alarms.')
    : band('حِمل «قبل خطوتين» ثقيلٌ فعلاً — هذا هو الحدّ الضيّق الذي يتنافس عليه كلّ إشعار.', 'Holding “two steps back” is genuinely heavy — this is the narrow capacity every notification competes for.'))
  const spanMsg = res.span && (res.span.span >= 7
    ? band(`سعة ${res.span.span} أرقام — فوق المعتاد (٥–٧). نطاقك الذهنيّ واسعٌ اليوم.`, `A span of ${res.span.span} digits — above the usual 5–7. Your mental bandwidth is wide today.`)
    : band(`سعة ${res.span.span} أرقام — ضمن المعتاد أو دونه قليلاً. تذكّر: القلق والإرهاق يستأجران هذه الخانات نفسها.`, `A span of ${res.span.span} digits — within or a little under the usual range. Remember: worry and fatigue rent these same slots.`))

  const scored = Object.entries(res).map(([k, v]) => SCORERS[k] ? SCORERS[k](v) : null).filter((x) => x != null)
  const overall = scored.length ? Math.round(scored.reduce((s, x) => s + x, 0) / scored.length) : 0
  const grade = GRADES.find((g) => overall >= g.min)

  return (
    <div className="focus-lab">
      <div className="callout warn">
        <span className="callout-icon" aria-hidden>🧪</span>
        <div>
          <strong className="callout-title">{t(L('تجربةٌ للتوعية، لا أداة تشخيص', 'A demo for awareness, not a diagnostic tool'))}</strong>
          <RichText as="p" value={L(
            'سبع ألعابٍ قصيرة مستوحاة من اختبارات الانتباه الكلاسيكية، تعمل كلّها في متصفّحك ولا تُحفظ نتائجها. لا تُشخّص شيئاً — بل تُشعرك بفكرة الكتاب: الانتباه مهارةٌ محدودة تتنافس عليها بيئتك كلّها.',
            'Seven short games inspired by classic attention tests. They all run in your browser and nothing is saved. They diagnose nothing — they let you feel the book’s idea: attention is a limited skill your whole environment competes for.'
          )} />
        </div>
      </div>

      <TestCard n="1" icon="🎨" done={!!res.stroop}
        title={L('اختبار ستروب', 'The Stroop test')}
        desc={L('اضغط لون الحبر لا الكلمة، خلال ثانيتين — يقيس كبح التشتيت.', 'Tap the ink colour, not the word, within 2 seconds — measures suppressing distraction.')}
        tie={{ to: '/book/stolen-focus/speed-flow', label: L('لماذا يهمّ؟ السرعة والتبديل', 'Why it matters: speed & switching') }}>
        {res.stroop ? (
          <div className="fl-result">
            <div className="fl-metrics">
              <Metric v={`${res.stroop.congRT}ms`} l={L('متوافق', 'Congruent')} />
              <Metric v={`${res.stroop.incongRT}ms`} l={L('متعارض', 'Incongruent')} />
              <Metric v={`+${res.stroop.interference}ms`} l={L('كلفة التداخل', 'Interference')} hi />
              <Metric v={`${res.stroop.acc}%`} l={L('الدقّة', 'Accuracy')} />
            </div>
            <p className="fl-msg">{t(stroopMsg)}</p>
          </div>
        ) : <StroopTest onDone={setters.stroop} />}
      </TestCard>

      <TestCard n="2" icon="🔀" done={!!res.switch}
        title={L('اختبار التبديل', 'The task-switching test')}
        desc={L('جولتان بقاعدةٍ ثابتة ثم جولةٌ تتقلّب — يقيس كلفتَي التبديل والخلط.', 'Two single-rule rounds, then a flip-flopping one — measures switch and mixing costs.')}
        tie={{ to: '/book/stolen-focus/speed-flow', label: L('لماذا يهمّ؟ خرافة تعدّد المهامّ', 'Why it matters: the multitasking myth') }}>
        {res.switch ? (
          <div className="fl-result">
            <div className="fl-metrics">
              <Metric v={`${res.switch.pureRT}ms`} l={L('قاعدة ثابتة', 'Pure rule')} />
              <Metric v={`${res.switch.repeatRT}ms`} l={L('تكرار', 'Repeat')} />
              <Metric v={`${res.switch.switchRT}ms`} l={L('تبديل', 'Switch')} />
              <Metric v={`+${res.switch.switchCost}ms`} l={L('كلفة التبديل', 'Switch cost')} hi />
              <Metric v={`+${res.switch.mixingCost}ms`} l={L('كلفة الخلط', 'Mixing cost')} hi />
              <Metric v={`${res.switch.acc}%`} l={L('الدقّة', 'Accuracy')} />
            </div>
            <p className="fl-msg">{t(switchMsg)}</p>
          </div>
        ) : <SwitchTest onDone={setters.switch} />}
      </TestCard>

      <TestCard n="3" icon="⏱️" done={!!res.sart}
        title={L('اختبار الانتباه المستمرّ', 'The sustained-attention test')}
        desc={L('اضغط عند كلّ رقم إلّا ٣ — يقيس ثبات اليقظة وانجرافها مع الوقت.', 'Tap every digit except 3 — measures steady vigilance and its drift over time.')}
        tie={{ to: '/book/stolen-focus/reading-mindwandering', label: L('لماذا يهمّ؟ شرود الذهن', 'Why it matters: mind-wandering') }}>
        {res.sart ? (
          <div className="fl-result">
            <div className="fl-metrics">
              <Metric v={res.sart.commission} l={L('ضغطات على ٣', 'Taps on 3')} hi />
              <Metric v={res.sart.omission} l={L('أرقام فائتة', 'Missed digits')} />
              <Metric v={`${res.sart.meanRT}ms`} l={L('متوسّط الزمن', 'Mean time')} />
              <Metric v={`±${res.sart.rtVar}ms`} l={L('تذبذب الزمن', 'RT variability')} />
              <Metric v={`${res.sart.drift >= 0 ? '+' : '−'}${Math.abs(res.sart.drift)}ms`} l={L('انجراف اليقظة', 'Vigilance drift')} hi />
            </div>
            <p className="fl-msg">{t(sartMsg)}{' '}
              {t(res.sart.drift > 40
                ? L('ولاحظ: صار إيقاعك أكثر تذبذباً في النصف الثاني — اليقظة تتعب.', 'And note: your rhythm grew shakier in the second half — vigilance tires.')
                : L('وبقي إيقاعك مستقرّاً حتى النهاية.', 'And your rhythm stayed steady to the end.'))}</p>
          </div>
        ) : <SartTest onDone={setters.sart} />}
      </TestCard>

      <TestCard n="4" icon="🔎" done={!!res.search}
        title={L('لعبة التصفية', 'The filtering game')}
        desc={L('اعثر على الهدف وسط ضجيجٍ يتضاعف — يقيس كلفة فيض المعلومات.', 'Find the target amid doubling noise — measures the cost of information overload.')}
        tie={{ to: '/book/stolen-focus/speed-flow', label: L('لماذا يهمّ؟ التصفية وفيض المعلومات', 'Why it matters: filtering & overload') }}>
        {res.search ? (
          <div className="fl-result">
            <div className="fl-metrics">
              <Metric v={`${res.search.rt6}ms`} l={L('٦ عناصر', '6 items')} />
              <Metric v={`${res.search.rt12}ms`} l={L('١٢ عنصراً', '12 items')} />
              <Metric v={`${res.search.rt20}ms`} l={L('٢٠ عنصراً', '20 items')} />
              <Metric v={`${res.search.slope}ms`} l={L('كلفة كلّ مشتِّت', 'Cost per distractor')} hi />
              <Metric v={res.search.errors} l={L('نقرات خاطئة', 'Wrong clicks')} />
            </div>
            <p className="fl-msg">{t(searchMsg)}</p>
          </div>
        ) : <SearchTest onDone={setters.search} />}
      </TestCard>

      <TestCard n="5" icon="🧠" done={!!res.nback}
        title={L('اختبار الذاكرة العاملة (2-back)', 'The working-memory test (2-back)')}
        desc={L('هل الرمز الحالي هو نفسه قبل خطوتين؟ — يقيس كم فكرةً تُمسك معاً.', 'Is this symbol the same as two steps back? — measures how much you hold at once.')}
        tie={{ to: '/book/stolen-focus/speed-flow', label: L('لماذا يهمّ؟ الدماغ يحمل فكرةً أو فكرتين فقط', 'Why it matters: the brain holds one or two thoughts') }}>
        {res.nback ? (
          <div className="fl-result">
            <div className="fl-metrics">
              <Metric v={`${res.nback.hits}/${res.nback.targets}`} l={L('تطابقات مُمسكة', 'Matches caught')} hi />
              <Metric v={res.nback.misses} l={L('تطابقات فائتة', 'Matches missed')} />
              <Metric v={res.nback.fa} l={L('إنذارات كاذبة', 'False alarms')} />
              <Metric v={`${res.nback.hitRT}ms`} l={L('زمن الالتقاط', 'Catch time')} />
            </div>
            <p className="fl-msg">{t(nbackMsg)}</p>
          </div>
        ) : <NbackTest onDone={setters.nback} />}
      </TestCard>

      <TestCard n="6" icon="🔢" done={!!res.span}
        title={L('سعة الذاكرة الرقمية', 'Digit span')}
        desc={L('سلاسل أرقامٍ تطول ما دمت تصيب — يقيس عرض نطاقك الذهني.', 'Digit runs that grow as long as you succeed — measures your mental bandwidth.')}
        tie={{ to: '/book/stolen-focus/stress-vigilance', label: L('لماذا يهمّ؟ عرض النطاق الذهني وضريبة القلق', 'Why it matters: mental bandwidth & the worry tax') }}>
        {res.span ? (
          <div className="fl-result">
            <div className="fl-metrics">
              <Metric v={res.span.span} l={L('أقصى سلسلة صحيحة', 'Longest correct run')} hi />
              <Metric v="5–7" l={L('المدى الشائع للبالغين', 'Typical adult range')} />
            </div>
            <p className="fl-msg">{t(spanMsg)}</p>
          </div>
        ) : <SpanTest onDone={setters.span} />}
      </TestCard>

      <TestCard n="7" icon="📖" done={!!res.reading}
        title={L('القراءة وسط التشتيت', 'Reading amid distraction')}
        desc={L('اقرأ مع إشعاراتٍ تُغريك بالنقر ثم بدونها، وقارن فهمك وزمنك.', 'Read with clickable, tempting notifications then without, and compare comprehension and time.')}
        tie={{ to: '/book/stolen-focus/reading-mindwandering', label: L('لماذا يهمّ؟ القراءة العميقة', 'Why it matters: deep reading') }}>
        <SfDistractedReading embedded onDone={setters.reading} />
      </TestCard>

      {doneCount >= 2 && (
        <div className="fl-summary card">
          <h3>{t(L('لمحةٌ عن انتباهك اليوم', 'A snapshot of your attention today'))}</h3>
          <div className="fl-summary-score">
            <span className="fl-score-n">{overall}</span>
            <span className="fl-score-lbl">
              <strong>{grade.icon} {t(grade.label)}</strong>
              <span className="muted">{t(L(`مؤشّر تقريبي من ${doneCount} من ٧ تجارب — أكمل البقية لصورةٍ أدقّ.`, `A rough index from ${doneCount} of 7 games — finish the rest for a sharper picture.`))}</span>
            </span>
          </div>
          <p className="muted">{t(L('نتائجُ لحظية في تجربةٍ قصيرة — تتأثّر بالتعب والمِران والجهاز. خذها كإشارةٍ لا حكماً.', 'Momentary results in a short demo — affected by tiredness, practice and your device. Take them as a hint, not a verdict.'))}</p>
          <ul>
            {res.stroop && <li>{t(stroopMsg)}</li>}
            {res.switch && <li>{t(switchMsg)}</li>}
            {res.sart && <li>{t(sartMsg)}</li>}
            {res.search && <li>{t(searchMsg)}</li>}
            {res.nback && <li>{t(nbackMsg)}</li>}
            {res.span && <li>{t(spanMsg)}</li>}
            {res.reading && <li>{t(res.reading.focus >= res.reading.distract
              ? L('فهمتَ القراءة أفضل بلا تشتيت — دليلٌ حيّ على حجّة الكتاب.', 'You read better without distraction — living proof of the book’s argument.')
              : L('تقارَبت نتيجتا القراءة هذه المرّة؛ جرّبها ثانيةً في وقتٍ آخر.', 'Your two reading scores were close this time; try again another time.'))}</li>}
          </ul>
          <div className="fl-summary-actions">
            <Link className="btn primary" to="/book/stolen-focus/focus-assessment">{t(L('قيّم عاداتك الآن', 'Now assess your habits'))}</Link>
            <Link className="btn" to="/book/stolen-focus/rebellion">{t(L('كيف أستعيد تركيزي؟', 'How do I reclaim my focus?'))}</Link>
            <button className="btn ghost" onClick={reset}>↺ {t(L('أعِد كلّ الاختبارات', 'Redo all tests'))}</button>
          </div>

          {bookTitle && (
            <ResultCard
              icon={grade.icon}
              title={sectionTitle}
              bookTitle={bookTitle}
              score={overall}
              suffix="/100"
              bandLabel={grade.label}
              bandColor={GRADE_COLORS[grade.min]}
              lines={[
                L(`أكملتُ ${doneCount} من ٧ تجارب.`, `Completed ${doneCount} of 7 games.`),
                ...(res.stroop ? [L(`كلفة التداخل: +${res.stroop.interference} مللي ثانية.`, `Interference cost: +${res.stroop.interference}ms.`)] : []),
                ...(res.span ? [L(`سعة الذاكرة: ${res.span.span} أرقام.`, `Digit span: ${res.span.span}.`)] : []),
              ]}
            />
          )}
        </div>
      )}
    </div>
  )
}

function Metric({ v, l, hi }) {
  const { t } = useApp()
  return (
    <div className={`fl-metric ${hi ? 'hi' : ''}`}>
      <span className="fl-metric-v">{v}</span>
      <span className="fl-metric-l">{t(l)}</span>
    </div>
  )
}
