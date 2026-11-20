import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { books } from '../../data/books.js'
import Icon from '../Icon.jsx'
import RichText from '../RichText.jsx'
import { optionOrder, whoChoices, faceChoices, parseNumber } from '../../lib/game/engine.js'
import { hash32, range } from '../../lib/game/rand.js'
import { questionList, readRest } from '../../lib/game/questions.js'
import MiniChart from './MiniChart.jsx'
import { NumPad } from './Minis.jsx'
import { PicImage } from './PicRound.jsx'
import { LETTERS, FaceImage, QuestionPhoto } from './Challenge.jsx'
import { L, KIND, KindHead } from './parts.jsx'

/*
 * «أجيبوا عن أسئلة اللعبة — دون لعب»: THE GAME'S OWN QUESTIONS, WITHOUT THE
 * GAME (the club, 2026-11-20). Everyone opens it on their own phone during the
 * call; the questions come in ONE FIXED ORDER (lib/game/questions.js), so
 * "question 12" said aloud is the same question on every phone. Answer, and the
 * card shows the right answer and its `why` — the same cards, words and
 * pictures as in a game, without dice, steps or a room.
 *
 * THREE LISTS, one page:
 *   #/game/questions                 every question of every book
 *   #/game/questions?book=<id>       one book's
 *   #/game/questions?books=…&asked=… what a finished game did not get to (its
 *                                    «أجيبوا عن بقية الأسئلة» button, GameOver)
 * and `n=12` for the question on screen.
 *
 * NO STORAGE, as everywhere on this site: the address holds the list and the
 * question, so a refresh stays put; what you answered lives in this tab and is
 * forgotten with it. Nothing is sent anywhere.
 *
 * Each question is played as its game round would be, minus what only a
 * game needs: no hints to buy (a «من هو؟» still gives its clues one at a time,
 * free), a picture round shows its four options straight away, and a white lie
 * — which needs a table of liars — becomes "find the truth" among the house's
 * own lies. Its options are shuffled by the question alone (`practice|<id>`),
 * so they too stand in the same order on every phone.
 */
const bookTitle = (id) => books.find((b) => b.id === id)?.title || L(id, id)
const MYTH = L('خرافة', 'Myth')
const FACT = L('حقيقة', 'Fact')

function Why({ value }) {
  if (!value) return null
  return <div className="gm-why"><Icon name="💡" /><RichText value={value} /></div>
}

/* Options to tap — and, once one is tapped, the answer: the right one green,
   a wrong pick red. */
function Choices({ order, right, picked, onPick, render, chart = false }) {
  const { t } = useApp()
  const done = picked != null
  return (
    <div className={`gm-opts ${chart ? 'is-charts' : ''} ${done ? 'is-result' : ''}`}>
      {order.map((index, k) => {
        const mark = !done ? '' : index === right ? 'is-right' : index === picked ? 'is-wrong' : ''
        return (
          <button key={index} type="button" className={`gm-opt ${mark}`} disabled={done} onClick={() => onPick(index)}>
            <span className="gm-opt-letter">{done && index === right ? <Icon name="✓" /> : t(LETTERS[k])}</span>
            <span className="gm-opt-text">{render(index)}</span>
          </button>
        )
      })}
    </div>
  )
}

/* One question, as its round. `answer` is what this tab answered (null: not yet). */
function Question({ q, decks, answer, onAnswer }) {
  const { t } = useApp()
  const item = decks.byId[q.id]
  const ch = useMemo(() => ({ k: q.k, id: q.id, book: q.book, seed: hash32(`practice|${q.id}`) }), [q])
  const [num, setNum] = useState('')
  const [clues, setClues] = useState(1)
  const done = answer != null

  switch (q.k) {
    case 'mcq':
      return (
        <>
          <QuestionPhoto photo={item.photo} />
          <p className="gm-q"><RichText value={item.q} /></p>
          <Choices order={optionOrder(ch, item.opts.length)} right={0} picked={answer} onPick={onAnswer} render={(i) => t(item.opts[i])} />
          {done && <Why value={item.why} />}
        </>
      )
    case 'graph': {
      const charts = item.opts.every((o) => o.chart)
      return (
        <>
          {item.chart && <MiniChart spec={done ? item.answerChart || item.chart : item.chart} />}
          <p className="gm-q"><RichText value={item.q} /></p>
          <Choices order={optionOrder(ch, item.opts.length)} right={0} picked={answer} onPick={onAnswer} chart={charts}
            render={(i) => (item.opts[i].chart ? <MiniChart spec={item.opts[i].chart} small /> : t(item.opts[i]))} />
          {done && <Why value={item.why} />}
        </>
      )
    }
    case 'tf':
      return (
        <>
          <QuestionPhoto photo={item.photo} />
          <p className="gm-q is-statement"><RichText value={item.statement} /></p>
          {done
            ? <Choices order={[0, 1]} right={item.isMyth ? 0 : 1} picked={answer} render={(i) => t(i === 0 ? MYTH : FACT)} />
            : (
              <div className="gm-pair">
                <button type="button" className="gm-choice" onClick={() => onAnswer(0)}><strong>{t(MYTH)}</strong></button>
                <button type="button" className="gm-choice" onClick={() => onAnswer(1)}><strong>{t(FACT)}</strong></button>
              </div>
            )}
          {done && <Why value={item.explain} />}
        </>
      )
    case 'num': {
      const value = parseNumber(num)
      const truth = item.show ? t(item.show) : item.a.toLocaleString('en')
      return (
        <>
          <QuestionPhoto photo={item.photo} />
          <p className="gm-q"><RichText value={item.q} /></p>
          {done ? (
            <>
              <p className="gm-truth"><b dir="ltr">{truth}</b>{item.unit && <> {t(item.unit)}</>}</p>
              <p className="gm-said gm-practice-guess">{t(answer === item.a ? L('أصبتَه بالضبط!', 'Spot on!') : L('تخمينك:', 'Your guess:'))} {answer !== item.a && <b dir="ltr">{answer.toLocaleString('en')}</b>}</p>
              <Why value={item.why} />
            </>
          ) : (
            <>
              <output className="gm-readout" dir="ltr">{num || '–'}{item.unit && <small> {t(item.unit)}</small>}</output>
              <NumPad value={num} onChange={setNum} max={7} dot={!!item.dot} />
              <button type="button" className="gm-btn is-main is-wide" disabled={value == null} onClick={() => onAnswer(value)}>
                {t(L('هذا تخميني', 'That’s my guess'))}
              </button>
            </>
          )}
        </>
      )
    }
    case 'who': {
      const people = whoChoices(ch, decks)
      const shown = done ? item.clues.length : clues
      return (
        <>
          <FaceImage item={item} />
          <ol className="gm-clues">
            {item.clues.slice(0, shown).map((clue, i) => <li key={i} className={!done && i === shown - 1 && i > 0 ? 'is-new' : ''}><RichText value={clue} /></li>)}
          </ol>
          {!done && clues < item.clues.length && (
            <button type="button" className="gm-btn gm-hint-btn gm-practice-clue" onClick={() => setClues(clues + 1)}>
              <Icon name="💡" /> {t(L('التلميح التالي', 'Next clue'))}
            </button>
          )}
          <Choices order={optionOrder(ch, people.length)} right={0} picked={answer} onPick={onAnswer} render={(i) => t(people[i].name)} />
          {done && <Why value={item.why} />}
        </>
      )
    }
    case 'face': {
      const people = faceChoices(ch, decks)
      return (
        <>
          <FaceImage item={item} />
          {done
            ? <p className="gm-truth">{t(item.name)}<small>{t(item.tag)}</small></p>
            : <p className="gm-q">{t(L('من هذا؟', 'Who is this?'))}</p>}
          <Choices order={optionOrder(ch, people.length)} right={0} picked={answer} onPick={onAnswer} render={(i) => t(people[i].name)} />
          {done && <Why value={item.about} />}
        </>
      )
    }
    case 'pic': {
      const isBook = item.kind === 'book'
      return (
        <>
          <PicImage item={item} />
          <p className="gm-q">{t(item.q || (isBook
            ? L('من أيّ كتابٍ من كتبنا هذه الصورة؟', 'Which of our books is this picture from?')
            : L('من هذا — أو ما هذا؟', 'Who — or what — is this?')))}</p>
          {isBook
            ? <Choices order={range(decks.books.length)} right={decks.books.indexOf(item.book)} picked={answer} onPick={onAnswer} render={(i) => t(bookTitle(decks.books[i]))} />
            : <Choices order={optionOrder(ch, item.opts.length)} right={0} picked={answer} onPick={onAnswer} render={(i) => t(item.opts[i])} />}
          {done && <Why value={item.why} />}
        </>
      )
    }
    case 'bluff': {
      const [before, after] = (t(item.q) || '').split('____')
      const opts = [item.truth, ...(item.decoys || []).slice(0, 3)]
      return (
        <>
          <QuestionPhoto photo={item.photo} />
          <p className="gm-q">{before}{done ? <b className="gm-fill">{t(item.truth)}</b> : <span className="gm-blank">{t(L('؟', '?'))}</span>}{after}</p>
          {!done && <p className="gm-hint-dark">{t(L('واحدةٌ فقط هي الحقيقة. اخترها.', 'Only one is the truth. Pick it.'))}</p>}
          <Choices order={optionOrder(ch, opts.length)} right={0} picked={answer} onPick={onAnswer} render={(i) => <bdi>{t(opts[i])}</bdi>} />
          {done && <Why value={item.why} />}
        </>
      )
    }
    default:
      return null
  }
}

export default function Practice({ decks }) {
  const { t } = useApp()
  const { search } = useLocation()
  const navigate = useNavigate()
  const params = useMemo(() => new URLSearchParams(search), [search])
  const rest = useMemo(() => readRest(params, decks), [params, decks])
  const book = !rest && decks.books.includes(params.get('book')) ? params.get('book') : null
  const list = useMemo(() => questionList(decks, rest || { books: book ? [book] : decks.books }), [decks, rest, book])
  const n = Math.min(Math.max(1, parseInt(params.get('n'), 10) || 1), Math.max(1, list.length))
  const q = list[n - 1]
  const [answers, setAnswers] = useState({})
  const [draft, setDraft] = useState(null)
  const top = useRef(null)

  /* The list and the question are the address: a refresh stays put. */
  const go = (patch) => {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(patch)) {
      if (value == null) next.delete(key)
      else next.set(key, value)
    }
    const s = next.toString()
    navigate({ pathname: '/game/questions', search: s ? `?${s}` : '' }, { replace: true })
  }
  const goTo = (m) => {
    setDraft(null)
    const to = Math.min(list.length, Math.max(1, m))
    if (to !== n) go({ n: to > 1 ? to : null })
  }
  const jump = () => {
    const m = parseNumber(draft)
    if (m != null) goTo(Math.round(m))
    else setDraft(null)
  }

  // A new question opens at its number and the top of its card (the page itself opens at its top).
  const shown = useRef(`${book}|${n}`)
  useEffect(() => {
    if (shown.current === `${book}|${n}`) return
    shown.current = `${book}|${n}`
    top.current?.scrollIntoView({ block: 'start' })
  }, [n, book])
  // …and the next one's picture is on its way while this one is answered.
  useEffect(() => {
    const next = list[n]
    const nextItem = next && decks.byId[next.id]
    const src = nextItem?.photo?.src || (['pic', 'who', 'face'].includes(next?.k) ? nextItem?.img : null)
    if (!src) return
    const img = new Image()
    img.decoding = 'async'
    img.src = src
  }, [list, n, decks])

  return (
    <div className="wide-page gm-entry gm-practice">
      <header className="page-head">
        <span className="eyebrow">{t(L('لعبة النادي', 'The club game'))}</span>
        <h1>{t(rest ? L('بقية أسئلة لعبتكم', 'The rest of your game’s questions') : L('أجيبوا عن أسئلة اللعبة — دون لعب', 'Answer the game’s questions — without playing'))}</h1>
        <p className="page-lead">{t(rest
          ? L('الأسئلة التي لم تأتِ في لعبتكم، بالترتيب نفسه على كلّ هاتف: قولوا رقم السؤال في المكالمة لتبقوا معاً.',
            'The questions your game didn’t get to, in the same order on every phone: say the question’s number on the call to stay together.')
          : L('الأسئلة نفسها التي في «رُقعة النرد»، بالترتيب نفسه على كلّ هاتف: افتحوها معاً، وقولوا رقم السؤال في المكالمة لتبقوا معاً.',
            'The very questions of Ruqʿa Dice, in the same order on every phone: open them together, and say the question’s number on the call to stay together.'))}</p>
      </header>

      {rest ? (
        <p className="gm-hint">
          <Link to="/game/questions">{t(L('كلّ أسئلة اللعبة', 'All the game’s questions'))}</Link>
        </p>
      ) : (
        <div className="gm-practice-books" role="group" aria-label={t(L('أسئلة أيّ الكتب', 'Which books’ questions'))}>
          {[null, ...decks.books].map((id) => (
            <button key={id || 'all'} type="button" className={`pill-btn ${book === id ? 'is-on' : ''}`} aria-pressed={book === id}
              onClick={() => { setDraft(null); go({ book: id, n: null }) }}>
              {id ? <><Icon name={decks.byBook[id].icon} /> {t(bookTitle(id))}</> : t(L('كلّ الكتب', 'All books'))}
            </button>
          ))}
        </div>
      )}

      {!q ? (
        <p className="card gm-panel">{t(L('لم يبقَ سؤال: جاءت كلّها في لعبتكم!', 'Nothing left: your game asked them all!'))}</p>
      ) : (
        <>
          <form ref={top} className="gm-jump" onSubmit={(e) => { e.preventDefault(); jump() }}>
            <label>
              <span>{t(L('السؤال', 'Question'))}</span>
              <input className="gm-input" dir="ltr" inputMode="numeric" enterKeyHint="go" autoComplete="off"
                aria-label={t(L('رقم السؤال', 'Question number'))} value={draft ?? String(n)}
                onFocus={(e) => e.target.select()} onBlur={jump}
                onChange={(e) => setDraft(e.target.value.replace(/[^\d٠-٩]/g, '').slice(0, 4))} />
              <span>{t(L(`من ${list.length}`, `of ${list.length}`))}</span>
            </label>
          </form>

          <article className={`gm-sheet gm-paper is-page tone-${KIND[q.k].tone}`}>
            <div className="gm-sheet-head">
              <KindHead ch={{ k: q.k, id: q.id, book: q.k === 'pic' ? null : q.book }} decks={decks} books={books} />
            </div>
            <div className="gm-sheet-body">
              <Question key={q.id} q={q} decks={decks} answer={answers[q.id] ?? null}
                onAnswer={(v) => setAnswers((all) => ({ ...all, [q.id]: v }))} />
            </div>
          </article>

          <div className="gm-practice-steps">
            <button type="button" className="btn" disabled={n <= 1} onClick={() => goTo(n - 1)}>
              <span className="arrow" aria-hidden>←</span> {t(L('السابق', 'Previous'))}
            </button>
            <button type="button" className={`btn ${answers[q.id] != null ? 'primary' : ''}`} disabled={n >= list.length} onClick={() => goTo(n + 1)}>
              {t(L('التالي', 'Next'))} <span className="arrow" aria-hidden>→</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
