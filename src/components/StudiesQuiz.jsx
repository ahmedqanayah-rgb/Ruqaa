import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import RichText from './RichText.jsx'
import ResultCard from './ResultCard.jsx'

const L = (ar, en) => ({ ar, en })

/* Bands for the shareable card, by percentage of answered studies correct. */
function quizBand(pct) {
  if (pct >= 85) return { ar: 'خبيرٌ في الكتاب', en: 'Book expert', col: 'var(--success)', icon: '🏆' }
  if (pct >= 65) return { ar: 'قارئٌ متمكّن', en: 'Strong reader', col: 'var(--blue)', icon: '🎯' }
  if (pct >= 45) return { ar: 'في الطريق', en: 'Getting there', col: 'var(--warm)', icon: '📚' }
  return { ar: 'المفاجآت كثيرة!', en: 'Full of surprises!', col: 'var(--violet)', icon: '🔬' }
}

// Two orderings: the book's order, or "most interesting/important first".
function orderStudies(studies, interestOrder, mode) {
  if (mode === 'book' || !interestOrder.length) return studies
  const rank = new Map(interestOrder.map((id, k) => [id, k]))
  return [...studies].sort((a, b) => (rank.get(a.id) ?? 1e6) - (rank.get(b.id) ?? 1e6))
}

export default function StudiesQuiz({ studies, interestOrder = [], bookTitle, sectionTitle }) {
  const { t } = useApp()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)   // index chosen for current study
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState({})   // id -> picked option index
  const [sort, setSort] = useState('book')     // 'book' | 'interest'
  const [showCard, setShowCard] = useState(false)  // manual peek at the result card

  const ordered = useMemo(
    () => orderStudies(studies, interestOrder, sort),
    [sort, studies, interestOrder]
  )

  const study = ordered[i]
  const isCorrectAnswer = (s) => answers[s.id] === s.correct
  const score = useMemo(
    () => ordered.filter((s) => answers[s.id] != null && isCorrectAnswer(s)).length,
    [answers, ordered]
  )
  const answeredCount = Object.keys(answers).length
  const allDone = answeredCount === ordered.length
  const pct = answeredCount ? Math.round((score / answeredCount) * 100) : 0
  const band = quizBand(pct)

  const restart = () => {
    setAnswers({}); setI(0); setPicked(null); setRevealed(false); setShowCard(false)
    window.scrollTo({ top: 0 })
  }

  const choose = (idx) => {
    if (revealed) return
    setPicked(idx)
  }
  const reveal = () => {
    if (picked == null) return
    setRevealed(true)
    setAnswers((a) => ({ ...a, [study.id]: picked }))
  }
  // Restore the stored answer when landing on an already-answered study.
  const showStudy = (ni) => {
    setI(ni)
    setPicked(answers[ordered[ni].id] ?? null)
    setRevealed(answers[ordered[ni].id] != null)
  }
  const go = (delta) => showStudy(Math.min(ordered.length - 1, Math.max(0, i + delta)))

  /* Deep link from search: /…/studies?study=s42 opens that study directly.
     The ref means answering a question can't yank the reader back to it. */
  const [params] = useSearchParams()
  const wanted = params.get('study')
  const jumpedTo = useRef(null)
  useEffect(() => {
    if (!wanted || jumpedTo.current === wanted) return
    const idx = ordered.findIndex((s) => String(s.id) === wanted)
    if (idx < 0) return
    jumpedTo.current = wanted
    showStudy(idx)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- showStudy is re-created each render
  }, [wanted, ordered])
  const changeSort = (mode) => {
    if (mode === sort) return
    const first = orderStudies(studies, interestOrder, mode)[0]
    setSort(mode)
    setI(0)
    setPicked(answers[first?.id] ?? null)
    setRevealed(answers[first?.id] != null)
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
          {answeredCount >= 3 && (
            <button className="quiz-card-toggle" onClick={() => setShowCard((s) => !s)}>
              {showCard ? t(L('إخفاء البطاقة', 'Hide card')) : `🏅 ${t(L('بطاقتي', 'My card'))}`}
            </button>
          )}
        </span>
      </div>

      <div className="quiz-dots">
        {ordered.map((s, k) => (
          <button key={s.id} className={`quiz-dot ${k === i ? 'current' : ''} ${answers[s.id] == null ? '' : isCorrectAnswer(s) ? 'ok' : 'no'}`}
            onClick={() => showStudy(k)}
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

      {/* The card appears on request, and automatically once every study is done. */}
      {bookTitle && (showCard || allDone) && (
        <div className="fade-in">
          {allDone && (
            <div className="quiz-done">
              🎉 {t(L('أنهيت كلّ الدراسات!', 'You finished every study!'))}
            </div>
          )}
          <ResultCard
            icon={band.icon}
            title={sectionTitle}
            bookTitle={bookTitle}
            score={score}
            outOf={answeredCount}
            bandLabel={band}
            bandColor={band.col}
            lines={[
              allDone
                ? L(`أجبتُ عن كلّ الدراسات الـ${ordered.length}.`, `Answered all ${ordered.length} studies.`)
                : L(`${answeredCount} من ${ordered.length} دراسة حتى الآن.`, `${answeredCount} of ${ordered.length} studies so far.`),
              L(`نسبة الإصابة ${pct}%.`, `${pct}% hit rate.`),
            ]}
          >
            {allDone && (
              <button className="btn ghost result-card-btn" onClick={restart}>
                ↺ {t(L('من البداية', 'Start over'))}
              </button>
            )}
          </ResultCard>
        </div>
      )}
    </div>
  )
}
