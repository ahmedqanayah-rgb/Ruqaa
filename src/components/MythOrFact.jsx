import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import RichText from './RichText.jsx'
import ResultCard from './ResultCard.jsx'
import { shuffle } from '../lib/shuffle.js'

/*
 * «خرافة أم حقيقة؟» — the merged myths + shocking-facts section, as a game.
 *
 * It replaced two read-only lists. The myths section was a stack of claim/reply
 * cards where the answer sat directly under the claim, and the facts section was
 * a bulleted list — so in both, the reader was told the answer before they had a
 * chance to be wrong about it. Being wrong first is the whole point: a myth you
 * have just confidently endorsed is one you remember.
 *
 * Content lives in data/books/<slug>/mythOrFact.js as
 * `{ statement, isMyth, explain, source? }`. There is no separate "fact list"
 * and "myth list" any more — mixing them is what makes the question a question.
 *
 * Order is shuffled once per mount, in memory (no storage, per the project
 * rule), so a reader who comes back gets a different run and a reader who
 * refreshes mid-game starts over rather than resuming a stale one.
 */

const L = (ar, en) => ({ ar, en })

const BANDS = [
  { min: 0.9, icon: '🥇', label: L('كاشف خرافات', 'Myth-buster'), col: 'var(--success)' },
  { min: 0.7, icon: '🥈', label: L('حسٌّ نقديّ جيّد', 'Good instincts'), col: 'var(--accent)' },
  { min: 0.5, icon: '🥉', label: L('في المنتصف', 'Middling'), col: 'var(--text-soft)' },
  { min: 0, icon: '📖', label: L('الكتاب يستحقّ قراءةً ثانية', 'Worth a second read'), col: 'var(--text-muted)' },
]

export default function MythOrFact({ items, sectionTitle, bookTitle }) {
  const { t } = useApp()
  const deck = useMemo(() => shuffle(items || []), [items])
  const [at, setAt] = useState(0)
  // null until answered; then the boolean the reader chose for `isMyth`.
  const [choice, setChoice] = useState(null)
  const [score, setScore] = useState(0)

  if (!deck.length) return null

  const done = at >= deck.length
  const item = deck[at]
  const answered = choice !== null
  const right = answered && choice === item.isMyth

  const answer = (saidMyth) => {
    if (answered) return
    setChoice(saidMyth)
    if (saidMyth === item.isMyth) setScore((s) => s + 1)
  }
  const next = () => { setChoice(null); setAt((i) => i + 1) }
  const restart = () => { setAt(0); setChoice(null); setScore(0) }

  if (done) {
    const pct = score / deck.length
    const band = BANDS.find((b) => pct >= b.min)
    const mythCount = deck.filter((d) => d.isMyth).length
    return (
      <div className="mof">
        <ResultCard
          icon={band.icon}
          title={sectionTitle}
          bookTitle={bookTitle}
          score={score}
          outOf={deck.length}
          bandLabel={band.label}
          bandColor={band.col}
          lines={[
            L(`${deck.length} عبارة: ${mythCount} خرافة و${deck.length - mythCount} حقيقة.`,
              `${deck.length} statements: ${mythCount} myths and ${deck.length - mythCount} facts.`),
          ]}
        >
          <button type="button" className="btn" onClick={restart}>
            {t(L('العب مرّةً أخرى', 'Play again'))}
          </button>
        </ResultCard>
      </div>
    )
  }

  return (
    <div className="mof">
      <div className="mof-head">
        <span className="mof-count">
          {t(L(`${at + 1} من ${deck.length}`, `${at + 1} of ${deck.length}`))}
        </span>
        <span className="mof-score">
          {t(L(`الإجابات الصحيحة: ${score}`, `Correct: ${score}`))}
        </span>
      </div>
      <div className="mof-bar" aria-hidden>
        <div className="mof-bar-fill" style={{ width: `${(at / deck.length) * 100}%` }} />
      </div>

      <div className={`mof-card ${answered ? (right ? 'is-right' : 'is-wrong') : ''}`}>
        <RichText as="p" className="mof-statement" value={item.statement} />

        {!answered ? (
          <div className="mof-actions">
            <button type="button" className="btn mof-btn" onClick={() => answer(true)}>
              {t(L('خرافة', 'Myth'))}
            </button>
            <button type="button" className="btn mof-btn" onClick={() => answer(false)}>
              {t(L('حقيقة', 'Fact'))}
            </button>
          </div>
        ) : (
          <div className="mof-reveal fade-in">
            <p className="mof-verdict">
              <span className="mof-mark" aria-hidden>{right ? '✓' : '✕'}</span>
              {t(right ? L('صحيح', 'Correct') : L('غير صحيح', 'Not quite'))}
              {' — '}
              <strong>{t(item.isMyth ? L('خرافة', 'a myth') : L('حقيقة', 'a fact'))}</strong>
            </p>
            <RichText as="p" value={item.explain} />
            {item.source && (
              <p className="mof-source">
                <a href={item.source.href} target="_blank" rel="noopener noreferrer">
                  {t(item.source.label)}
                </a>
              </p>
            )}
            <button type="button" className="btn primary" onClick={next}>
              {t(at + 1 === deck.length ? L('النتيجة', 'See result') : L('التالي', 'Next'))} →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
