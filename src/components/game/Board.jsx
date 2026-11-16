import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { books } from '../../data/books.js'
import { toneStyle } from '../../lib/tone.js'
import Icon from '../Icon.jsx'
import { Token } from './parts.jsx'

const L = (ar, en) => ({ ar, en })

/* What each kind of square is called, and the mark it wears. */
export const SQUARE = {
  start: { icon: '▶', label: L('البداية', 'Start') },
  finish: { icon: '🏁', label: L('النهاية', 'Finish') },
  tf: { icon: '❓', label: L('خرافة أم حقيقة؟', 'Myth or fact?') },
  luck: { icon: '⭐', label: L('حظّ', 'Luck') },
  dare: { icon: '🎤', label: L('تحدٍّ', 'Dare') },
}

/*
 * How the track folds into the space it has: `cols` × `rows` squares, each
 * `cell` pixels.
 *
 * The board is a SNAKE — along one row, down, back along the next — and it has
 * to be as large as the screen allows, because on a shared screen the squares
 * are what the room is watching. So the fold is chosen, not fixed: every way of
 * arranging n squares in full rows is tried and the one with the biggest square
 * wins. A wide desktop window gets 6×5; a phone held upright gets 5×6 from the
 * same thirty squares.
 *
 * Only exact folds (cols divides n): a ragged last row would leave the finish
 * square stranded mid-row with empty slots beside it.
 */
function fold(n, width, height) {
  let best = null
  for (let cols = 4; cols <= 10; cols++) {
    if (n % cols) continue
    const rows = n / cols
    const cell = Math.floor(Math.min(width / cols, height / rows))
    if (!best || cell > best.cell) best = { cols, rows, cell }
  }
  return best
}

/* Where square i sits. Even rows run in the reading direction, odd rows run
   back — the snake. `c` is counted from the inline START, so the whole board
   mirrors with the page: it begins at the right in Arabic and the left in
   English, like everything else. */
function place(i, cols) {
  const r = Math.floor(i / cols)
  const c = i % cols
  return { r, c: r % 2 ? cols - 1 - c : c }
}

/* Tokens sharing a square fan out around its lower half instead of stacking. */
const FAN = {
  1: [[0, 0]],
  2: [[-0.17, 0], [0.17, 0]],
  3: [[-0.2, 0.06], [0, -0.1], [0.2, 0.06]],
  4: [[-0.2, -0.1], [0.2, -0.1], [-0.2, 0.13], [0.2, 0.13]],
  5: [[-0.24, -0.1], [0, -0.14], [0.24, -0.1], [-0.13, 0.13], [0.13, 0.13]],
  6: [[-0.24, -0.1], [0, -0.14], [0.24, -0.1], [-0.24, 0.13], [0, 0.13], [0.24, 0.13]],
}

export default function Board({ board, players, shown, turn, labels, colors, decks }) {
  const { t } = useApp()
  const wrapRef = useRef(null)
  const [box, setBox] = useState(null)

  /* Measure the room the board has. Synchronously on mount, then on the next
     frame and a beat later — a first reading can land before the layout has
     settled, and ResizeObserver callbacks are throttled in background and
     embedded contexts (the same belt-and-braces HeroCinema needed). */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined
    const measure = () => {
      const r = el.getBoundingClientRect()
      setBox((prev) => (prev && prev[0] === r.width && prev[1] === r.height ? prev : [r.width, r.height]))
    }
    measure()
    const raf = requestAnimationFrame(measure)
    const settle = setTimeout(measure, 300)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf); clearTimeout(settle)
      ro?.disconnect(); window.removeEventListener('resize', measure)
    }
  }, [])

  const layout = useMemo(
    () => (box && box[0] > 0 && box[1] > 0 ? fold(board.length, box[0], box[1]) : null),
    [board.length, box],
  )
  const bookById = useMemo(() => new Map(books.map((b) => [b.id, b])), [])

  // Which tokens stand on which square, so they can share it.
  const onSquare = useMemo(() => {
    const map = new Map()
    shown.forEach((pos, i) => { map.set(pos, [...(map.get(pos) || []), i]) })
    return map
  }, [shown])

  return (
    <div className="gm-boardwrap" ref={wrapRef}>
      {layout && (
        <div className="gm-board" role="img"
          aria-label={t(L(`رقعة اللعب: ${board.length} خانة`, `The board: ${board.length} squares`))}
          style={{ width: layout.cols * layout.cell, height: layout.rows * layout.cell, '--cell': `${layout.cell}px` }}>

          {/* the track under the squares: one link from each square to the next */}
          {board.slice(0, -1).map((_, i) => {
            const a = place(i, layout.cols)
            const b = place(i + 1, layout.cols)
            const down = b.r !== a.r
            return (
              <i key={`l${i}`} className={`gm-link ${down ? 'is-down' : ''}`} style={{
                insetInlineStart: `calc(${Math.min(a.c, b.c) + 0.5} * var(--cell))`,
                top: `calc(${a.r + 0.5} * var(--cell))`,
              }} />
            )
          })}

          {board.map((sq, i) => {
            const { r, c } = place(i, layout.cols)
            const book = sq.book ? bookById.get(sq.book) : null
            const meta = SQUARE[sq.type]
            return (
              <div key={i} className={`gm-sq is-${sq.type} ${players[turn]?.pos === i ? 'is-here' : ''}`}
                style={{ insetInlineStart: `calc(${c} * var(--cell))`, top: `calc(${r} * var(--cell))`, ...toneStyle(book) }}
                title={t(book ? book.title : meta.label)}>
                <span className="gm-sq-face">
                  <Icon name={book ? decks.icon[sq.book] : meta.icon} className="gm-sq-icon" />
                  {(sq.type === 'start' || sq.type === 'finish') && <span className="gm-sq-word">{t(meta.label)}</span>}
                </span>
              </div>
            )
          })}

          {shown.map((pos, i) => {
            const { r, c } = place(pos, layout.cols)
            const group = onSquare.get(pos) || [i]
            const [dx, dy] = (FAN[group.length] || FAN[6])[group.indexOf(i)] || [0, 0]
            return (
              <Token key={`t${i}`} color={colors[i]} label={labels[i]}
                className={`on-board ${i === turn ? 'is-turn' : ''} ${group.length > 2 ? 'is-crowded' : ''}`}
                style={{
                  insetInlineStart: `calc(${c + 0.5 + dx} * var(--cell))`,
                  top: `calc(${r + 0.64 + dy} * var(--cell))`,
                }} />
            )
          })}
        </div>
      )}
    </div>
  )
}
