import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { books } from '../../data/books.js'
import { ui } from '../../data/ui.js'
import Icon from '../Icon.jsx'
import { actingHost, playBooks } from '../../lib/game/engine.js'
import { L, Token, TOKEN_COLORS, tokenLabels, prettyCode, copyText } from './parts.jsx'
import Rules from './Rules.jsx'

/*
 * THE LOBBY: the room's code, big enough to read out on the call; who has
 * joined; and — for whoever opened the room — which books are in tonight's game
 * and the button that starts it.
 *
 * The host is whoever opened the room, while they are here; if they drop off,
 * the next player who is here takes over (`actingHost`), so a room never waits
 * on one phone.
 */
export default function Lobby({ room, snap, me, decks, code }) {
  const { t } = useApp()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(null)
  const [rules, setRules] = useState(false)
  const { core } = snap
  const env = room.env()
  const host = actingHost(core, env)
  const isHost = host === me
  const labels = tokenLabels(core.players.map((p) => p.name))
  const chosen = playBooks(core, decks)
  const mine = snap.entries[me]?.d || {}

  /* The invite is the page's own address with only the room in it — never this
     tab's `me`, which would seat the guest in this player's chair. */
  const invite = `${window.location.origin}${window.location.pathname}#/game?room=${code}`
  const share = async () => {
    const text = t(L(`تعال نلعب «رُقعة النرد» — رمز الغرفة ${prettyCode(code)}`, `Come and play Ruqʿa Dice — room ${prettyCode(code)}`))
    if (navigator.share) {
      try { await navigator.share({ title: t(ui.game.title), text, url: invite }); return } catch { /* cancelled: fall through to copying */ }
    }
    setCopied((await copyText(`${text}\n${invite}`)) ? 'ok' : 'manual')
  }

  const toggleBook = (id) => {
    const next = chosen.includes(id) ? chosen.filter((b) => b !== id) : [...chosen, id]
    if (next.length) room.setMine({ books: decks.books.filter((b) => next.includes(b)) })
  }
  const kick = (pid) => room.setMine({ kick: [...(Array.isArray(mine.kick) ? mine.kick : []), pid].slice(-16) })
  const start = () => room.setMine({ start: core.g, st: Math.round(room.now()) })
  const leave = () => { room.setMine({ left: true }); setTimeout(() => navigate('/game'), 250) }

  const players = core.players
  return (
    <div className="gm-room gm-lobby">
      <header className="gm-top">
        <button type="button" className="gm-icon-btn" onClick={leave} aria-label={t(L('اخرج من الغرفة', 'Leave the room'))}><Icon name="🚪" /></button>
        <strong className="gm-top-title">{t(ui.game.title)}</strong>
        <button type="button" className="gm-icon-btn" onClick={() => setRules((r) => !r)} aria-expanded={rules} aria-label={t(L('القواعد', 'Rules'))}><Icon name="❓" /></button>
      </header>

      <main className="gm-lobby-body">
        <section className="gm-code-card">
          <span className="gm-code-label">{t(L('رمز الغرفة', 'Room code'))}</span>
          <strong className="gm-code" dir="ltr">{prettyCode(code)}</strong>
          <span className="gm-code-hint">{t(L('اقرأه على الجميع في المكالمة، أو أرسل الرابط.', 'Read it out on the call, or send the link.'))}</span>
          <button type="button" className="gm-btn" onClick={share}><Icon name="📤" /> {t(L('ادعُ الآخرين', 'Invite the others'))}</button>
          {copied === 'ok' && <span className="gm-code-hint" role="status">{t(L('نُسخ الرابط.', 'Link copied.'))}</span>}
          {copied === 'manual' && <input className="gm-input" dir="ltr" readOnly value={invite} onFocus={(e) => e.target.select()} />}
        </section>

        {rules && <section className="gm-panel-dark"><Rules /></section>}

        <section className="gm-panel-dark">
          <h2>{t(L(`اللاعبون (${players.length})`, `Players (${players.length})`))}</h2>
          <ul className="gm-roster">
            {players.map((p, i) => (
              <li key={p.id} className={room.live(p.id) ? '' : 'is-away'}>
                <Token color={TOKEN_COLORS[p.c]} label={labels[i]} />
                <bdi className="gm-roster-name">{p.name}</bdi>
                {p.id === host && <span className="gm-badge">{t(L('المضيف', 'host'))}</span>}
                {p.id === me && <span className="gm-badge is-me">{t(L('أنت', 'you'))}</span>}
                {!room.live(p.id) && <span className="gm-badge is-away">{t(L('غير متّصل', 'offline'))}</span>}
                {isHost && p.id !== me && (
                  <button type="button" className="gm-icon-btn is-small" onClick={() => kick(p.id)} aria-label={t(L(`أخرِج ${p.name}`, `Remove ${p.name}`))}><Icon name="✕" /></button>
                )}
              </li>
            ))}
          </ul>
          {players.length < 2 && <p className="gm-muted">{t(L('بانتظار الآخرين… تُلعب بلاعبَين أو أكثر، ويمكن تجربتها وحدك.', 'Waiting for the others… It is played with two or more, and you can try it alone.'))}</p>}
        </section>

        <section className="gm-panel-dark">
          <h2>{t(L('كتب الليلة', 'Tonight’s books'))}</h2>
          <div className="gm-books">
            {decks.books.map((id) => {
              const book = books.find((b) => b.id === id)
              const on = chosen.includes(id)
              return (
                <button key={id} type="button" className={`gm-book-chip ${on ? 'is-on' : ''}`} disabled={!isHost}
                  aria-pressed={on} onClick={() => toggleBook(id)}>
                  <Icon name={decks.byBook[id].icon} /> {t(book?.title || L(id, id))}
                </button>
              )
            })}
          </div>
          {!isHost && <p className="gm-muted">{t(L('يختارها المضيف.', 'The host chooses.'))}</p>}
        </section>
      </main>

      <footer className="gm-lobby-foot">
        {isHost
          ? <button type="button" className="gm-btn is-main is-wide" onClick={start} disabled={mine.start === core.g}>
              <Icon name="🎲" /> {t(players.length > 1 ? L(`ابدأ اللعب (${players.length} لاعبين)`, `Start the game (${players.length} players)`) : L('ابدأ وحدك للتجربة', 'Start alone, to try it'))}
            </button>
          : <p className="gm-waiting">{t(L(`بانتظار ${players.find((p) => p.id === host)?.name || ''} ليبدأ اللعب…`, `Waiting for ${players.find((p) => p.id === host)?.name || 'the host'} to start…`))}</p>}
      </footer>
    </div>
  )
}
