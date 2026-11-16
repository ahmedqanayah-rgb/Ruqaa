import { useApp } from '../../context/AppContext.jsx'
import { ui } from '../../data/ui.js'
import { books } from '../../data/books.js'
import { LENGTHS, TIMERS, MIN_PLAYERS, MAX_PLAYERS, NAME_MAX } from '../../lib/game/engine.js'
import { toneStyle } from '../../lib/tone.js'
import Icon from '../Icon.jsx'
import GameCover from '../GameCover.jsx'
import { Token, TOKEN_COLORS, tokenLabels, GameRules } from './parts.jsx'

const L = (ar, en) => ({ ar, en })

const LENGTH_LABEL = {
  short: L('قصيرة', 'Short'),
  medium: L('متوسّطة', 'Medium'),
  long: L('طويلة', 'Long'),
}
/* Roughly how long a game runs with four players — a turn is about a minute
   once the room starts arguing about the answer. Said as a range, because it is
   a guess. */
const LENGTH_TIME = {
  short: L('نحو ١٥–٢٠ دقيقة', 'about 15–20 min'),
  medium: L('نحو ٢٥–٣٥ دقيقة', 'about 25–35 min'),
  long: L('نحو ٤٠–٥٠ دقيقة', 'about 40–50 min'),
}

/*
 * BEFORE THE GAME: who is playing, which books, how long.
 *
 * This screen sits inside the site's ordinary page — navigation and all —
 * because nothing is at stake yet. The stage (GameStage) takes the whole window
 * only once «ابدأ اللعبة» is pressed.
 *
 * A player is a name, and a name can be a team: «فريق دمشق» works exactly as
 * «سارة» does. Nothing here asks which, because nothing in the game differs.
 */
export default function GameSetup({ state, dispatch, decks }) {
  const { t } = useApp()
  const { names, settings } = state
  const fallback = (i) => t(L(`اللاعب ${i + 1}`, `Player ${i + 1}`))
  const labels = tokenLabels(names.map((n, i) => n.trim() || fallback(i)))

  const setNames = (next) => dispatch({ type: 'names', names: next })
  const setName = (i, value) => setNames(names.map((n, k) => (k === i ? value : n)))
  const patch = (p) => dispatch({ type: 'settings', patch: p })

  const toggleBook = (id) => {
    const on = settings.books.includes(id)
    const next = decks.books.filter((b) => (b === id ? !on : settings.books.includes(b)))
    // At least one book: a game with none has no questions to ask.
    if (next.length) patch({ books: next })
  }

  const start = (e) => {
    e.preventDefault()
    dispatch({ type: 'start', seed: Math.floor(Math.random() * 0xffffffff), fallback })
  }

  const questions = settings.books.reduce((n, b) => n + (decks.mcq[b]?.length || 0) + (decks.tf[b]?.length || 0), 0)

  return (
    <form className="wide-page gm-setup" onSubmit={start}>
      <header className="gm-hero">
        <GameCover />
        <div className="gm-hero-body">
          <span className="eyebrow">{t(L('لعبة النادي', 'The club game'))}</span>
          <h1>{t(ui.game.title)}</h1>
          <p>{t(ui.game.tagline)}</p>
        </div>
      </header>

      <div className="gm-setup-grid">
        <section className="card gm-panel">
          <h2>{t(L('من يلعب؟', 'Who is playing?'))}</h2>
          <p className="gm-hint">{t(L('اسمٌ لكلّ لاعب — أو لكلّ فريق.', 'A name for each player — or each team.'))}</p>
          <ul className="gm-players">
            {names.map((name, i) => (
              <li key={i}>
                <Token color={TOKEN_COLORS[i]} label={labels[i]} />
                <input className="gm-input" type="text" value={name} maxLength={NAME_MAX}
                  placeholder={fallback(i)} autoComplete="off" enterKeyHint="next"
                  aria-label={t(L(`اسم اللاعب ${i + 1}`, `Name of player ${i + 1}`))}
                  onChange={(e) => setName(i, e.target.value)} />
                <button type="button" className="gm-remove" disabled={names.length <= MIN_PLAYERS}
                  onClick={() => setNames(names.filter((_, k) => k !== i))}
                  aria-label={t(L(`احذف اللاعب ${i + 1}`, `Remove player ${i + 1}`))}>
                  <Icon name="✕" />
                </button>
              </li>
            ))}
          </ul>
          {names.length < MAX_PLAYERS && (
            <button type="button" className="btn gm-add" onClick={() => setNames([...names, ''])}>
              <Icon name="➕" /> {t(L('أضف لاعباً', 'Add a player'))}
            </button>
          )}
        </section>

        <section className="card gm-panel">
          <h2>{t(L('من أيّ الكتب؟', 'Which books?'))}</h2>
          <p className="gm-hint">{t(L('أسئلة الكتب التي قرأها الحاضرون فقط.', 'Only the books the people here have read.'))}</p>
          <div className="gm-books">
            {decks.books.map((id) => {
              const book = books.find((b) => b.id === id)
              const on = settings.books.includes(id)
              return (
                <button key={id} type="button" className={`gm-book ${on ? 'is-on' : ''}`} style={toneStyle(book)}
                  aria-pressed={on} onClick={() => toggleBook(id)}>
                  <img src={t(book.cover)} alt="" width="44" height="66" loading="lazy" />
                  <span className="gm-book-title">{t(book.title)}</span>
                  <span className="gm-book-check" aria-hidden><Icon name="✓" /></span>
                </button>
              )
            })}
          </div>

          <h2>{t(L('كم تطول؟', 'How long?'))}</h2>
          <div className="gm-seg" role="group" aria-label={t(L('طول اللعبة', 'Game length'))}>
            {Object.keys(LENGTHS).map((key) => (
              <button key={key} type="button" className={settings.length === key ? 'is-on' : ''}
                aria-pressed={settings.length === key} onClick={() => patch({ length: key })}>
                <strong>{t(LENGTH_LABEL[key])}</strong>
                <small>{t(LENGTH_TIME[key])}</small>
              </button>
            ))}
          </div>

          <h2>{t(L('مؤقّتٌ للإجابة؟', 'A timer for answers?'))}</h2>
          <div className="gm-seg" role="group" aria-label={t(L('مؤقّت الإجابة', 'Answer timer'))}>
            {TIMERS.map((sec) => (
              <button key={sec} type="button" className={settings.timer === sec ? 'is-on' : ''}
                aria-pressed={settings.timer === sec} onClick={() => patch({ timer: sec })}>
                <strong>{sec ? t(L(`${sec} ثانية`, `${sec} seconds`)) : t(L('بلا مؤقّت', 'No timer'))}</strong>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="gm-setup-foot">
        <button type="submit" className="btn primary gm-start">
          <Icon name="🎲" /> {t(L('ابدأ اللعبة', 'Start the game'))}
        </button>
        <span className="gm-hint">
          {t(L(`${questions} سؤالاً وعبارة في هذه اللعبة`, `${questions} questions and statements in this game`))}
        </span>
      </div>

      <section className="gm-how">
        <h2>{t(L('كيف نلعبها في الجلسة؟', 'How do we play it on the call?'))}</h2>
        <GameRules />
      </section>
    </form>
  )
}
