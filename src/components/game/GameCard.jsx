import { useEffect, useRef, useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { books } from '../../data/books.js'
import { POINTS, cardContent } from '../../lib/game/engine.js'
import { effectLine, effectMood } from '../../lib/game/effects.js'
import { sfx } from '../../lib/game/sfx.js'
import { toneStyle } from '../../lib/tone.js'
import RichText from '../RichText.jsx'
import Icon from '../Icon.jsx'
import { SQUARE } from './Board.jsx'
import { Token } from './parts.jsx'

const L = (ar, en) => ({ ar, en })
// What a player calls out: «ب!» is quicker over a call than reading an option.
const LETTERS = { ar: ['أ', 'ب', 'ج', 'د'], en: ['A', 'B', 'C', 'D'] }

/* The countdown for a question, when the game was set up with one. It only
   counts and reports; what running out MEANS is the caller's business. Restarts
   whenever `id` changes — i.e. for every new card. */
function useCountdown(seconds, id, running, onEnd) {
  const [left, setLeft] = useState(seconds)
  const end = useRef(onEnd)
  end.current = onEnd
  useEffect(() => { setLeft(seconds) }, [seconds, id])
  useEffect(() => {
    if (!seconds || !running) return undefined
    if (left <= 0) { end.current(); return undefined }
    const timer = setTimeout(() => {
      if (left <= 6) sfx.tick()
      setLeft((n) => n - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [seconds, running, left])
  return left
}

/*
 * THE CARD — whatever the square turned up, large enough to read on a shared
 * screen. One component for the five kinds, because they are one moment in the
 * turn: the room looks up from the board, reads, argues, and the host taps.
 *
 *   mcq     a question from a book: tap the option the player said
 *   tf      «خرافة أم حقيقة؟»: a statement from the book's own myth deck
 *   luck    a card that simply happens
 *   dare    done out loud; the group judges, the host taps the verdict
 *   finish  the last square
 *
 * It is portalled to <body> by the stage: `position: fixed` is not
 * viewport-relative inside the page wrapper, which animates a transform.
 */
export default function GameCard({ state, decks, dispatch, player, color, label }) {
  const { t, lang } = useApp()
  const { card, step } = state
  const content = cardContent(card, decks)
  const book = card.book ? books.find((b) => b.id === card.book) : null
  const revealed = step === 'reveal'
  const timed = (card.kind === 'mcq' || card.kind === 'tf') && state.settings.timer > 0
  const left = useCountdown(timed ? state.settings.timer : 0, card.id, timed && !revealed,
    () => dispatch({ type: 'answer', pick: null }))

  const next = () => dispatch({ type: 'next' })
  const nextBtn = (
    <button type="button" className="gm-btn is-main" onClick={next} autoFocus>
      {t(L('التالي', 'Next'))} <span className="arrow" aria-hidden>→</span>
    </button>
  )

  const kindLabel = card.kind === 'mcq' ? book?.title
    : card.kind === 'finish' ? SQUARE.finish.label
    : SQUARE[card.kind]?.label
  const kindIcon = card.kind === 'mcq' ? decks.icon[card.book]
    : card.kind === 'finish' ? SQUARE.finish.icon
    : SQUARE[card.kind]?.icon
  const stake = card.kind === 'mcq' || card.kind === 'tf' || card.kind === 'dare' ? POINTS[card.kind] : null

  return (
    <div className="gm-overlay" role="dialog" aria-modal="true" aria-label={t(kindLabel)}>
      <article className={`gm-card kind-${card.kind} ${revealed ? (card.right ? 'is-right' : 'is-wrong') : ''}`}
        style={toneStyle(book)}>
        <header className="gm-card-head">
          <span className="gm-card-kind"><Icon name={kindIcon} /> {t(kindLabel)}</span>
          {/* A myth-or-fact statement names its book too: half the fun is the
              room guessing which of the three would say such a thing. */}
          {card.kind !== 'mcq' && book && <span className="gm-card-book">{t(book.title)}</span>}
          <span className="gm-card-who"><Token color={color} label={label} /> {player.name}</span>
          {stake != null && !revealed && (
            <span className="gm-card-stake">+{stake}</span>
          )}
        </header>

        {timed && !revealed && (
          <div className="gm-timer" role="timer" aria-label={t(L(`${left} ثانية`, `${left} seconds`))}>
            <i style={{ width: `${(left / state.settings.timer) * 100}%` }} className={left <= 5 ? 'is-low' : ''} />
          </div>
        )}

        {/* ---------------- a question from a book ---------------- */}
        {card.kind === 'mcq' && content && (
          <div className="gm-card-body">
            <p className="gm-q">{t(content.q)}</p>
            <div className="gm-opts">
              {card.order.map((optIndex, pos) => {
                const isRight = optIndex === 0
                const cls = !revealed ? ''
                  : isRight ? 'is-right'
                  : card.picked === pos ? 'is-wrong' : 'is-dim'
                return (
                  <button key={pos} type="button" className={`gm-opt ${cls}`} disabled={revealed}
                    onClick={() => dispatch({ type: 'answer', pick: pos })}>
                    <span className="gm-opt-letter">{LETTERS[lang]?.[pos] ?? pos + 1}</span>
                    <span className="gm-opt-text">{t(content.opts[optIndex])}</span>
                  </button>
                )
              })}
            </div>
            {revealed && (
              <div className="gm-reveal">
                <p className="gm-verdict">
                  {card.picked == null
                    ? t(L('انتهى الوقت', 'Time’s up'))
                    : card.right
                      ? t(L(`صحيح! +${POINTS.mcq}`, `Correct! +${POINTS.mcq}`))
                      : t(L('ليست هذه', 'Not that one'))}
                </p>
                <RichText as="p" className="gm-why" value={content.why} />
                {nextBtn}
              </div>
            )}
          </div>
        )}

        {/* ---------------- myth or fact ---------------- */}
        {card.kind === 'tf' && content && (
          <div className="gm-card-body">
            <RichText as="p" className="gm-q" value={content.statement} />
            {!revealed ? (
              /* Equal and identical on purpose, like the book's own game: a
                 difference in weight between the two buttons is a hint. */
              <div className="gm-opts is-pair">
                <button type="button" className="gm-opt" onClick={() => dispatch({ type: 'answer', pick: true })}>
                  <span className="gm-opt-letter">{LETTERS[lang][0]}</span>
                  <span className="gm-opt-text">{t(L('خرافة', 'Myth'))}</span>
                </button>
                <button type="button" className="gm-opt" onClick={() => dispatch({ type: 'answer', pick: false })}>
                  <span className="gm-opt-letter">{LETTERS[lang][1]}</span>
                  <span className="gm-opt-text">{t(L('حقيقة', 'Fact'))}</span>
                </button>
              </div>
            ) : (
              <div className="gm-reveal">
                <p className="gm-verdict">
                  {card.picked == null
                    ? t(L('انتهى الوقت', 'Time’s up'))
                    : card.right
                      ? t(L(`صحيح! +${POINTS.tf}`, `Correct! +${POINTS.tf}`))
                      : t(L('ليس صحيحاً', 'Not quite'))}
                  {' — '}
                  <strong>{t(content.isMyth ? L('خرافة', 'a myth') : L('حقيقة', 'a fact'))}</strong>
                </p>
                <RichText as="p" className="gm-why" value={content.explain} />
                {nextBtn}
              </div>
            )}
          </div>
        )}

        {/* ---------------- luck ---------------- */}
        {card.kind === 'luck' && content && (
          <div className={`gm-card-body mood-${effectMood(content.effect)}`}>
            <p className="gm-q">{t(content.text)}</p>
            <p className="gm-effect">{t(effectLine(content.effect))}</p>
            <button type="button" className="gm-btn is-main" onClick={() => dispatch({ type: 'apply' })} autoFocus>
              {t(L('تمام', 'Okay'))}
            </button>
          </div>
        )}

        {/* ---------------- a dare ---------------- */}
        {card.kind === 'dare' && content && (
          <div className="gm-card-body">
            <p className="gm-q">{t(content.text)}</p>
            <p className="gm-judge-note">{t(L('الحكم للمجموعة:', 'The group decides:'))}</p>
            <div className="gm-opts is-pair">
              <button type="button" className="gm-opt is-pass" onClick={() => dispatch({ type: 'judge', passed: true })}>
                <Icon name="✓" />
                <span className="gm-opt-text">{t(L(`نجح  +${POINTS.dare}`, `Passed  +${POINTS.dare}`))}</span>
              </button>
              <button type="button" className="gm-opt is-fail" onClick={() => dispatch({ type: 'judge', passed: false })}>
                <Icon name="✕" />
                <span className="gm-opt-text">{t(L('لم ينجح', 'Not this time'))}</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------------- the last square ---------------- */}
        {card.kind === 'finish' && (
          <div className="gm-card-body is-finish">
            <p className="gm-q">
              {t(L(`وصل ${player.name} إلى الخانة الأخيرة!`, `${player.name} has reached the last square!`))}
            </p>
            <p className="gm-effect">+{card.bonus}</p>
            <p className="gm-judge-note">
              {t(state.finisher === state.turn
                ? L('تُكمَل هذه الجولة ليتساوى عدد الأدوار، ثم يفوز صاحب أعلى رصيد.',
                    'This round is played out so everyone has had the same number of turns — then the highest score wins.')
                : L('والجولة الأخيرة مستمرّة.', 'The last round carries on.'))}
            </p>
            {nextBtn}
          </div>
        )}
      </article>
    </div>
  )
}
