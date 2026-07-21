import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import RichText from './RichText.jsx'
import ResultCard from './ResultCard.jsx'

/* One-line summary of how many distinct tips were triggered, for the result
   card. Arabic needs the dual/plural split, so it isn't a plain interpolation. */
function tipCountLine(n) {
  if (n === 0) return { ar: 'لا نقاط ضعفٍ لافتة — عاداتٌ متينة.', en: 'No notable weak spots — solid habits.' }
  if (n === 1) return { ar: 'نقطةٌ واحدة تستحقّ الانتباه.', en: '1 point worth attention.' }
  if (n === 2) return { ar: 'نقطتان تستحقّان الانتباه.', en: '2 points worth attention.' }
  return { ar: `${n} نقاط تستحقّ الانتباه.`, en: `${n} points worth attention.` }
}

/*
 * Generic sleep-assessment form. Question/tip data is passed in (from the book
 * module) so the component stays book-agnostic. Runs fully in memory.
 */
export default function AssessmentForm({ questions, tips, goodTip, bookTitle, sectionTitle }) {
  const { t } = useApp()
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = questions.every((q) => answers[q.id] != null)

  const result = useMemo(() => {
    if (!submitted) return null
    let total = 0
    const flagged = []
    questions.forEach((q) => {
      const opt = q.options[answers[q.id]]
      total += opt.score
      if (opt.tip) flagged.push(opt.tip)
    })
    return { score: Math.round((total / questions.length) * 100), tips: flagged }
  }, [submitted, answers, questions])

  const pick = (qid, idx) => setAnswers((a) => ({ ...a, [qid]: idx }))
  const reset = () => { setAnswers({}); setSubmitted(false); window.scrollTo({ top: 0 }) }

  const band = (s) =>
    s >= 80 ? { ar: 'ممتاز', en: 'Excellent', col: 'var(--success)' } :
    s >= 60 ? { ar: 'جيّد', en: 'Good', col: 'var(--blue)' } :
    s >= 40 ? { ar: 'متوسّط', en: 'Fair', col: 'var(--warm)' } :
              { ar: 'يحتاج تحسيناً', en: 'Needs work', col: 'var(--danger)' }

  return (
    <div className="assessment">
      {!submitted && (
        <form className="assess-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0 }) }}>
          {questions.map((q, qi) => (
            <fieldset key={q.id} className="assess-q card">
              <legend><span className="assess-qnum">{qi + 1}</span> <span aria-hidden>{q.icon}</span> {t(q.q)}</legend>
              <div className="assess-options">
                {q.options.map((opt, idx) => (
                  <label key={idx} className={`assess-opt ${answers[q.id] === idx ? 'selected' : ''}`}>
                    <input type="radio" name={q.id} checked={answers[q.id] === idx} onChange={() => pick(q.id, idx)} />
                    <span>{t(opt.label)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <button className="btn primary big" type="submit" disabled={!allAnswered}>{t(ui.actions.submit)}</button>
          {!allAnswered && <p className="muted center">{t({ ar: 'أجب عن كلّ الأسئلة لعرض النتيجة.', en: 'Answer all questions to see your score.' })}</p>}
        </form>
      )}

      {submitted && result && (
        <div className="assess-result fade-in">
          <div className="score-ring card" style={{ '--ring': `${result.score}%`, '--ring-col': band(result.score).col }}>
            <div className="score-inner">
              <span className="score-num">{result.score}</span>
              <span className="score-cap">{t(ui.labels.score)}</span>
            </div>
          </div>
          <div className="score-band" style={{ color: band(result.score).col }}>{t(band(result.score))}</div>

          <h3>{t({ ar: 'نصائح مخصّصة لك', en: 'Your personalized tips' })}</h3>
          <div className="tips-list">
            {result.tips.length === 0 ? (
              <div className="callout key"><span className="callout-icon" aria-hidden>🎉</span><div><RichText as="p" value={goodTip} /></div></div>
            ) : (
              [...new Set(result.tips)].map((k) => (
                <div key={k} className="callout note tip-item">
                  <span className="callout-icon" aria-hidden>💡</span>
                  <div><RichText as="p" value={tips[k]} /></div>
                </div>
              ))
            )}
          </div>
          {bookTitle && (
            <ResultCard
              icon="📝"
              title={sectionTitle}
              bookTitle={bookTitle}
              score={result.score}
              suffix="%"
              bandLabel={band(result.score)}
              bandColor={band(result.score).col}
              lines={[tipCountLine(new Set(result.tips).size)]}
            />
          )}
          <button className="btn big" onClick={reset}>↺ {t(ui.actions.retake)}</button>
          <p className="muted center">{t(ui.footer.note)}</p>
        </div>
      )}
    </div>
  )
}
