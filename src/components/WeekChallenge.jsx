import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import RichText from './RichText.jsx'

/*
 * "A week with the book" — the seven days rendered as tickable cards.
 *
 * Progress lives in AppContext (in memory, like `visited`), so it survives
 * moving around the site during a sitting but resets on refresh — the project
 * forbids any persistence. Each day links to the section that explains it.
 */

const L = (ar, en) => ({ ar, en })

export default function WeekChallenge({ challenge, bookId }) {
  const { t, challengeDone, toggleChallengeDay } = useApp()
  if (!challenge?.days?.length) return null

  const days = challenge.days
  const done = days.filter((d) => challengeDone.has(`${bookId}/${d.n}`)).length
  const pct = Math.round((done / days.length) * 100)
  const allDone = done === days.length

  return (
    <div className="week">
      {challenge.intro && <p className="week-intro">{t(challenge.intro)}</p>}

      <div className="week-progress">
        <div className="week-bar" aria-hidden><span style={{ width: `${pct}%` }} /></div>
        <span className="week-count">
          {allDone
            ? `🎉 ${t(L('أنهيتَ الأسبوع كلّه', 'You finished the whole week'))}`
            : t(L(`${done} من ${days.length} أيام`, `${done} of ${days.length} days`))}
        </span>
      </div>

      <ol className="week-days">
        {days.map((d) => {
          const key = `${bookId}/${d.n}`
          const isDone = challengeDone.has(key)
          return (
            <li key={d.n} className={`week-day card ${isDone ? 'done' : ''}`}>
              <label className="week-check">
                <input type="checkbox" checked={isDone} onChange={() => toggleChallengeDay(bookId, d.n)} />
                <span className="week-num">{isDone ? '✓' : d.n}</span>
              </label>
              <div className="week-body">
                <strong className="week-title">{t(d.title)}</strong>
                <RichText as="p" className="week-task" value={d.task} />
                <RichText as="p" className="week-why" value={d.why} />
                {d.to && (
                  <Link className="week-link" to={`/book/${bookId}/${d.to}`}>
                    {t(L('لماذا يعمل هذا؟', 'Why does this work?'))} →
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {challenge.closing && (
        <div className="callout key week-closing">
          <span className="callout-icon" aria-hidden>🌱</span>
          <div><RichText as="p" value={challenge.closing} /></div>
        </div>
      )}
    </div>
  )
}
