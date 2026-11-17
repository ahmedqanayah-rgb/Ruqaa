import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import { GAME_ART } from '../../data/gameArt.js'
import { ASPECT, TYPES, pathPoints, stepSize, zoneOf } from '../../lib/game/board.js'
import { T } from '../../lib/game/engine.js'
import { sfx } from '../../lib/game/sfx.js'
import { Token, TOKEN_COLORS, tokenLabels } from './parts.jsx'

/*
 * THE BOARD: the painted map, the thirty-six squares drawn over its road, and
 * the players' tokens.
 *
 * The picture is one file (public/images/game/board.webp). The squares are NOT
 * in it — they are drawn here, at points along the very curve the picture's
 * road was painted over (lib/game/board.js), which is what lets a square say
 * what it is with a crisp icon at any size, and lets the page know exactly
 * where a token stands.
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
const POINTS = pathPoints()
const STEP = stepSize()

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

export default function Board({ players, targets, activeId, me, zoneIcons, quiet = false, label, children }) {
  const shown = useWalk(targets, quiet)
  const labels = useMemo(() => tokenLabels(players.map((p) => p.name)), [players])

  /* Tokens sharing a square stand in a ring around its centre. */
  const spots = useMemo(() => {
    const groups = {}
    players.forEach((p, i) => { if (!p.gone) (groups[shown[i] ?? p.pos] ||= []).push(i) })
    const out = {}
    for (const [pos, group] of Object.entries(groups)) {
      const centre = POINTS[pos] || POINTS[0]
      const crowd = group.length
      const reach = crowd === 1 ? 0 : STEP * (crowd > 4 ? 0.36 : 0.26)
      group.forEach((i, k) => {
        const angle = (2 * Math.PI * k) / crowd - Math.PI / 2
        out[i] = { x: centre.x + Math.cos(angle) * reach, y: centre.y + Math.sin(angle) * reach * ASPECT, crowd }
      })
    }
    return out
  }, [players, shown])

  const here = new Set(players.map((p, i) => (p.gone ? -1 : shown[i] ?? p.pos)))

  return (
    <div className="gm-board" style={{ '--step': `${(STEP * 100).toFixed(3)}cqw` }} role="img" aria-label={label}>
      <img className="gm-board-art" src={GAME_ART.board} alt="" draggable={false} decoding="async" />
      {POINTS.map((p, i) => {
        const type = TYPES[i]
        return (
          <span key={i} className={`gm-sq t-${type} z-${zoneOf(i)} ${here.has(i) ? 'is-here' : ''}`}
            style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}>
            <Icon name={type === 'K' ? zoneIcons[zoneOf(i)] : MARK[type]} />
          </span>
        )
      })}
      {players.map((p, i) => {
        const spot = spots[i]
        if (!spot) return null
        return (
          <Token key={p.id} color={TOKEN_COLORS[p.c]} label={labels[i]}
            className={`on-board ${p.id === activeId ? 'is-active' : ''} ${p.id === me ? 'is-me' : ''} ${spot.crowd > 4 ? 'is-crowded' : ''}`}
            style={{ left: `${spot.x * 100}%`, top: `${spot.y * 100}%` }} />
        )
      })}
      {children}
    </div>
  )
}
