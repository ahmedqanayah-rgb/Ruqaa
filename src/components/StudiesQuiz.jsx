import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import RichText from './RichText.jsx'

export default function StudiesQuiz({ studies, interestOrder = [] }) {
  const { t } = useApp()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)   // index chosen for current study
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState({})   // id -> correct?
  const [sort, setSort] = useState('book')     // 'book' | 'interest'

  // Two orderings: the book's order, or "most interesting/important first".
  const ordered = useMemo(() => {
    if (sort === 'book' || !interestOrder.length) return studies
    const rank = new Map(interestOrder.map((id, k) => [id, k]))
    return [...studies].sort(
      (a, b) => (rank.has(a.id) ? rank.get(a.id) : 1e6) - (rank.has(b.id) ? rank.get(b.id) : 1e6)
    )
  }, [sort, studies, interestOrder])

  const study = ordered[i]
  const score = useMemo(() => Object.values(answers).filter(Boolean).length, [answers])
  const answeredCount = Object.keys(answers).length

  const choose = (idx) => {
    if (revealed) return
    setPicked(idx)
  }
  const reveal = () => {
    if (picked == null) return
    setRevealed(true)
    setAnswers((a) => ({ ...a, [study.id]: picked === study.correct }))
  }
  const go = (delta) => {
    const ni = Math.min(ordered.length - 1, Math.max(0, i + delta))
    setI(ni)
    setPicked(null)
    setRevealed(answers[ordered[ni].id] != null)
  }
  const changeSort = (mode) => {
    if (mode === sort) return
    setSort(mode)
    setI(0)
    setPicked(null)
    setRevealed(answers[(mode === 'book' ? studies : [...studies].sort((a, b) => {
      const rank = new Map(interestOrder.map((id, k) => [id, k]))
      return (rank.has(a.id) ? rank.get(a.id) : 1e6) - (rank.has(b.id) ? rank.get(b.id) : 1e6)
    }))[0]?.id] != null)
  }

  return (
    <div className="quiz">
      <div className="quiz-sort" role="tablist" aria-label={t({ ar: 'ترتيب الدراسات', en: 'Sort studies' })}>
        <span className="quiz-sort-label">{t({ ar: 'الترتيب:', en: 'Sort:' })}</span>
        <button className={`quiz-sort-btn ${sort === 'book' ? 'active' : ''}`} onClick={() => changeSort('book')}>
          {t({ ar: 'ترتيب الكتاب', en: 'Book order' })}
        </button>
        <button className={`quiz-sort-btn ${sort === 'interest' ? 'active' : ''}`} onClick={() => changeSort('interest')}>
          {t({ ar: 'الأكثر إثارةً وأهمّية', en: 'Most interesting' })}
        </button>
      </div>

      <div className="quiz-topbar">
        <span className="quiz-progress">
          {t({ ar: 'دراسة', en: 'Study' })} <b>{i + 1}</b> {t(ui.labels.studyOf)} {ordered.length}
        </span>
        <span className="quiz-score">
          {t(ui.labels.score)}: <b>{score}</b> / {answeredCount}
        </span>
      </div>

      <div className="quiz-dots">
        {ordered.map((s, k) => (
          <button key={s.id} className={`quiz-dot ${k === i ? 'current' : ''} ${answers[s.id] === true ? 'ok' : answers[s.id] === false ? 'no' : ''}`}
            onClick={() => { setI(k); setPicked(null); setRevealed(answers[s.id] != null) }}
            aria-label={`${k + 1}`} />
        ))}
      </div>

      <div className="quiz-card card" key={study.id}>
        <span className="pill violet">{t(study.chapter)}</span>
        <h3 className="quiz-title">{t(study.title)}</h3>
        <p className="quiz-researcher"><b>{t(ui.labels.researcher)}:</b> {t(study.researcher)}</p>

        <div className="quiz-method">
          <span className="quiz-h">🧪 {t(ui.labels.methodology)}</span>
          <RichText as="p" value={study.method} />
        </div>

        <div className="quiz-question">❓ {t(ui.labels.yourGuess)}</div>
        <div className="quiz-options">
          {study.options.map((opt, idx) => {
            const isPicked = picked === idx
            const isCorrect = idx === study.correct
            let cls = 'quiz-opt'
            if (revealed) {
              if (isCorrect) cls += ' correct'
              else if (isPicked) cls += ' wrong'
            } else if (isPicked) cls += ' picked'
            return (
              <button key={idx} className={cls} onClick={() => choose(idx)} disabled={revealed}>
                <span className="quiz-opt-letter">{String.fromCharCode(65 + idx)}</span>
                <RichText value={opt} />
                {revealed && isCorrect && <span className="quiz-opt-mark">✓</span>}
                {revealed && isPicked && !isCorrect && <span className="quiz-opt-mark">✕</span>}
              </button>
            )
          })}
        </div>

        {!revealed ? (
          <button className="btn primary quiz-reveal" onClick={reveal} disabled={picked == null}>
            {t(ui.actions.showAnswer)}
          </button>
        ) : (
          <div className="quiz-result fade-in">
            <div className={`quiz-verdict ${picked === study.correct ? 'ok' : 'no'}`}>
              {picked === study.correct ? `✓ ${t(ui.labels.correct)}` : `✕ ${t(ui.labels.incorrect)}`}
            </div>
            <div className="quiz-actual">
              <span className="quiz-h">📊 {t(ui.labels.actualResult)}</span>
              <RichText as="p" value={study.result} />
            </div>
            <div className="quiz-discussion">
              <span className="quiz-h">💬 {t(ui.labels.discussion)}</span>
              <RichText as="p" value={study.discussion} />
            </div>
          </div>
        )}
      </div>

      <nav className="quiz-nav">
        <button className="btn" onClick={() => go(-1)} disabled={i === 0}>‹ {t(ui.actions.prev)}</button>
        <button className="btn primary" onClick={() => go(1)} disabled={i === ordered.length - 1}>{t(ui.actions.next)} ›</button>
      </nav>
    </div>
  )
}
