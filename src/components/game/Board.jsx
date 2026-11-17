import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import { ASPECT, SQUARES, typeAt, pathPoints, stepSize, boardOf, squareOf, mirrored } from '../../lib/game/board.js'
import { T } from '../../lib/game/engine.js'
import { sfx } from '../../lib/game/sfx.js'
import { Token, TOKEN_COLORS, tokenLabels } from './parts.jsx'

/*
 * THE BOARD: the game's road — one painted board per book in play (see
 * lib/game/board.js) — the squares drawn over each painting's road, and the
 * players' tokens.
 *
 * ONE BOARD AT A TIME. The boards are stacked, the first at the bottom, in a
 * strip that slides: the screen shows the board where the turn is being played,
 * and when a token walks off the top of one board the strip slides down to show
 * the next. That is how the road got three times longer without its squares
 * getting three times smaller on a phone. The book marks in the corner show
 * another board for a while; the view goes back to the play at the next turn.
 *
 * The pictures are files (data/gameArt.js). The squares are NOT in them — they
 * are drawn here, at points along the very curve each road was painted over,
 * which is what lets a square say what it is with a crisp icon at any size, and
 * lets the page know exactly where a token stands.
 *
 * EVERYTHING IS SIZED FROM THE BOARD'S OWN WIDTH (`cqw`): the board is a
 * container, so a square is "so many hundredths of the board" whether the board
 * is a phone's width or half a desktop window.
 *
 * `targets` is where the tokens ARE, by the rules; `shown` is where they are
 * DRAWN, and it walks one square per beat toward the target — the engine moves
 * a token six squares in one step, and nobody on a call wants to see it
 * teleport. On arrival (and on a reload) tokens are simply where they are.
 */
const MARK = { S: '▶', F: '🏁', L: '🧪', B: '🎭', C: '🍀', D: '🎤' }
const STEP = stepSize()
const POINTS = [pathPoints(false), pathPoints(true)]

/* Where square `square` of a board painted for book number `art` sits on it. */
export const pointOf = (art, square) => POINTS[mirrored(art) ? 1 : 0][square]

function useWalk(targets, quiet) {
  const [shown, setShown] = useState(targets)
  const at = useRef(targets)
  const key = targets.join(',')
  useEffect(() => {
    let timer = null
    const tick = () => {
      let moved = false
      const next = targets.map((to, i) => {
        const from = at.current[i] ?? to
        if (from === to) return to
        moved = true
        // A new game sends everyone home: that is not a walk, it is a reset.
        return Math.abs(to - from) > 9 ? to : from + Math.sign(to - from)
      })
      at.current = next
      setShown(next)
      if (moved) {
        if (!quiet) sfx.step()
        timer = setTimeout(tick, T.hop)
      }
    }
    tick()
    return () => clearTimeout(timer)
    // `key` is the targets, by value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return shown
}

export default function Board({ players, targets, activeId, me, boards, focusKey, quiet = false, label, children }) {
  const shown = useWalk(targets, quiet)
  const labels = useMemo(() => tokenLabels(players.map((p) => p.name)), [players])
  const pages = boards.length
  const last = pages * SQUARES - 1
  const pageOf = (pos) => Math.min(pages - 1, boardOf(pos))

  /* Which board is on screen: the one where the turn's token is (drawn) — so
     the view slides on with it as it walks off the top — unless a player has
     asked to look at another, until the next turn. */
  const active = players.findIndex((p) => p.id === activeId)
  const follow = pageOf(shown[active] ?? players[active]?.pos ?? 0)
  const [peek, setPeek] = useState(null)
  useEffect(() => { setPeek(null) }, [focusKey])
  const view = peek ?? follow

  /* Tokens sharing a square stand in a ring around its centre. */
  const spots = useMemo(() => {
    const groups = {}
    players.forEach((p, i) => { if (!p.gone) (groups[Math.min(last, shown[i] ?? p.pos)] ||= []).push(i) })
    const out = {}
    for (const [key, group] of Object.entries(groups)) {
      const pos = Number(key)
      const page = pageOf(pos)
      const centre = pointOf(boards[page].art, squareOf(pos))
      const crowd = group.length
      const reach = crowd === 1 ? 0 : STEP * (crowd > 4 ? 0.36 : 0.26)
      group.forEach((i, k) => {
        const angle = (2 * Math.PI * k) / crowd - Math.PI / 2
        out[i] = { page, x: centre.x + Math.cos(angle) * reach, y: centre.y + Math.sin(angle) * reach * ASPECT, crowd }
      })
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, shown, boards])

  const here = new Set(players.map((p, i) => (p.gone ? -1 : Math.min(last, shown[i] ?? p.pos))))

  return (
    <div className="gm-board" style={{ '--step': `${(STEP * 100).toFixed(3)}cqw` }}>
      <div className="gm-board-strip" role="img" aria-label={label}
        style={{ height: `${pages * 100}%`, transform: `translateY(${(view * 100) / pages}%)` }}>
        {boards.map((page, b) => (
          <div key={page.id} className="gm-board-page" style={{ top: `${((pages - 1 - b) * 100) / pages}%`, height: `${100 / pages}%` }}>
            <img className="gm-board-art" src={page.img} alt="" draggable={false} decoding="async" fetchpriority={b === view ? 'high' : 'low'} />
            {Array.from({ length: SQUARES }, (_, sq) => {
              const pos = b * SQUARES + sq
              const type = typeAt(pos, pages)
              const p = pointOf(page.art, sq)
              return (
                <span key={sq} className={`gm-sq t-${type} z-${page.art} ${here.has(pos) ? 'is-here' : ''}`}
                  style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}>
                  <Icon name={type === 'K' ? page.icon : MARK[type]} />
                </span>
              )
            })}
            {players.map((p, i) => {
              const spot = spots[i]
              if (!spot || spot.page !== b) return null
              return (
                <Token key={p.id} color={TOKEN_COLORS[p.c]} label={labels[i]}
                  className={`on-board ${p.id === activeId ? 'is-active' : ''} ${p.id === me ? 'is-me' : ''} ${spot.crowd > 4 ? 'is-crowded' : ''}`}
                  style={{ left: `${spot.x * 100}%`, top: `${spot.y * 100}%` }} />
              )
            })}
          </div>
        ))}
      </div>
      {children}
      {pages > 1 && (
        <div className="gm-board-pages" dir="ltr">
          {boards.map((page, b) => (
            <button key={page.id} type="button" className={`gm-board-page-btn z-${page.art} ${b === view ? 'is-on' : ''}`}
              aria-pressed={b === view} aria-label={page.title}
              onClick={() => setPeek(b === follow ? null : b)}>
              <Icon name={page.icon} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
