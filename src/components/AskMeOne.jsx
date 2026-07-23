import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { studiesPool } from '../data/studiesPool.js'
import RichText from './RichText.jsx'

/*
 * "Ask me one" — a session opener. Draws a random study from any book, lets the
 * room guess, then reveals the result and the discussion.
 *
 * Deliberately collapsed until asked: Home's job is the hero and the books, and
 * an unopened question is also the better prompt ("shall we?"). Reuses the
 * quiz's own classes so a drawn study looks identical to the real quiz, and
 * inherits presentation mode for free (everything is rem-based).
 */

const L = (ar, en) => ({ ar, en })

export default function AskMeOne() {
  const { t } = useApp()
  const [item, setItem] = useState(null)
  const [picked, setPicked] = useState(null)
  const [revealed, setRevealed] = useState(false)

  if (!studiesPool.length) return null

  const draw = () => {
    let next = studiesPool[Math.floor(Math.random() * studiesPool.length)]
    // Don't serve the same study twice in a row.
    for (let guard = 0; studiesPool.length > 1 && item && next.poolId === item.poolId && guard < 12; guard++) {
      next = studiesPool[Math.floor(Math.random() * studiesPool.length)]
    }
    setItem(next)
    setPicked(null)
    setRevealed(false)
  }

  return (
    <section className="ask">
      <div className="ask-head">
        <div>
          <h2>🎲 {t(L('اسألني واحدة', 'Ask me one'))}</h2>
          <p className="ask-sub">
            {t(L(
              `سؤالٌ عشوائي من ${studiesPool.length} دراسةً في كتب النادي — افتتاحيةٌ جاهزة لجلستكم الأسبوعية.`,
              `A random question from the ${studiesPool.length} studies across the club's books — a ready-made opener for your weekly session.`
            ))}
          </p>
        </div>
        <button className="btn primary ask-cta" onClick={draw}>
          {item ? `🎲 ${t(L('واحدة أخرى', 'Another one'))}` : `🎲 ${t(L('اسأل', 'Ask'))}`}
        </button>
      </div>

      {item && (
        <div className="ask-card card fade-in" key={item.poolId}>
          <div className="ask-tags">
            <span className="pill violet">{t(item.chapter)}</span>
            <span className="ask-book">{t(item.bookTitle)}</span>
          </div>
          <h3 className="quiz-title">{t(item.title)}</h3>
          <p className="quiz-researcher"><b>{t(ui.labels.researcher)}:</b> {t(item.researcher)}</p>

          <div className="quiz-method">
            <span className="quiz-h">🧪 {t(ui.labels.methodology)}</span>
            <RichText as="p" value={item.method} />
          </div>

          <div className="quiz-question">❓ {t(ui.labels.yourGuess)}</div>
          <div className="quiz-options">
            {item.options.map((opt, idx) => {
              const isPicked = picked === idx
              const isCorrect = idx === item.correct
              let cls = 'quiz-opt'
              if (revealed) {
                if (isCorrect) cls += ' correct'
                else if (isPicked) cls += ' wrong'
              } else if (isPicked) cls += ' picked'
              return (
                <button key={idx} className={cls} disabled={revealed}
                  onClick={() => !revealed && setPicked(idx)}>
                  <span className="quiz-opt-letter">{String.fromCharCode(65 + idx)}</span>
                  <RichText value={opt} />
                  {revealed && isCorrect && <span className="quiz-opt-mark">✓</span>}
                  {revealed && isPicked && !isCorrect && <span className="quiz-opt-mark">✕</span>}
                </button>
              )
            })}
          </div>

          {!revealed ? (
            <button className="btn primary quiz-reveal" disabled={picked == null}
              onClick={() => setRevealed(true)}>
              {t(ui.actions.showAnswer)}
            </button>
          ) : (
            <div className="quiz-result fade-in">
              <div className={`quiz-verdict ${picked === item.correct ? 'ok' : 'no'}`}>
                {picked === item.correct ? `✓ ${t(ui.labels.correct)}` : `✕ ${t(ui.labels.incorrect)}`}
              </div>
              <div className="quiz-actual">
                <span className="quiz-h">📊 {t(ui.labels.actualResult)}</span>
                <RichText as="p" value={item.result} />
              </div>
              <div className="quiz-discussion">
                <span className="quiz-h">💬 {t(ui.labels.discussion)}</span>
                <RichText as="p" value={item.discussion} />
              </div>
              <Link className="ask-more" to={`/book/${item.bookId}/${item.sectionSlug}?study=${encodeURIComponent(item.id)}`}>
                {t(L('افتح هذه الدراسة في الكتاب', 'Open this study in the book'))} →
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
