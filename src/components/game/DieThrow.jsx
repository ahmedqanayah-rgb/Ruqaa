import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { DIE, DONE, FACES, planThrow, poseAt, shadeOf, shadowOf, cssMatrix } from '../../lib/game/throw.js'
import { sfx } from '../../lib/game/sfx.js'
import { PIPS } from './parts.jsx'

/*
 * The die, thrown onto the board. How it is thrown — and why every phone sees
 * the same throw — is lib/game/throw.js; this file only draws it.
 *
 * One frame per screen refresh, read off the ROOM's clock (held against this
 * phone's own for the length of the throw, so it runs smoothly), and written
 * straight to the DOM — transform and opacity only, never through React state.
 * A phone that hears of the roll late joins the throw where it has got to; one
 * that arrives after it is over sees nothing. Sizes are in the board's own
 * units (cqw), so the die is the same share of the board on any screen.
 *
 * A picture, not text: `dir="ltr"`, so the board's right-to-left page does not
 * mirror it.
 */
const CELLS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const calm = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/* Sounds are scheduled once per roll, even when React runs an effect twice. */
let sounded = ''

function paint(el, plan, t, still) {
  const u = el.layer.clientWidth * DIE
  if (!u) return
  const pose = poseAt(plan, t, still)
  // The layer fades, never the cube (game.css says why).
  el.layer.style.opacity = pose.alpha.toFixed(3)
  el.die.style.transform = cssMatrix(pose, u)
  shadeOf(pose.m).forEach((o, i) => { el.shades[i].style.opacity = o.toFixed(3) })
  const sh = shadowOf(pose)
  el.shadow.style.transform = `translate(${(sh.x * u - u / 2).toFixed(2)}px, ${(sh.y * u - u / 2).toFixed(2)}px) rotate(${sh.yaw.toFixed(4)}rad) scale(${sh.k.toFixed(3)})`
  el.shadow.style.opacity = sh.o.toFixed(3)
  el.halo.style.transform = `translate(${(pose.p[0] * u - u / 2).toFixed(2)}px, ${(pose.p[1] * u - u / 2).toFixed(2)}px) scale(${(2.3 + 0.6 * pose.pop).toFixed(3)})`
  el.halo.style.opacity = pose.halo.toFixed(3)
}

export default function DieThrow({ room, seed, turn, value, rolledAt }) {
  const plan = useMemo(() => planThrow(seed, turn, value), [seed, turn, value])
  const [on, setOn] = useState(() => room.now() - rolledAt < DONE)
  const el = useRef({ shades: [] })

  useLayoutEffect(() => {
    if (!on) return undefined
    const still = calm()
    const offset = room.now() - performance.now()
    const since = () => performance.now() + offset - rolledAt

    const key = `${seed}:${turn}:${rolledAt}`
    if (sounded !== key) {
      sounded = key
      const t0 = since()
      sfx.dice((still ? plan.knocks.slice(-1) : plan.knocks).filter((k) => k.at > t0).map((k) => ({ ...k, at: (k.at - t0) / 1000 })))
    }

    let frame = 0
    const draw = () => {
      const t = since()
      if (t >= DONE) { setOn(false); return }
      paint(el.current, plan, t, still)
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [on, plan, room, rolledAt, seed, turn])

  if (!on) return null
  const keep = (name) => (node) => { el.current[name] = node }
  return (
    <div className="gm-throw" ref={keep('layer')} dir="ltr" aria-hidden>
      <span className="gm-throw-halo" ref={keep('halo')} />
      <span className="gm-throw-shadow" ref={keep('shadow')} />
      <span className="gm-throw-die" ref={keep('die')}>
        <i className="gm-throw-core" /><i className="gm-throw-core is-x" /><i className="gm-throw-core is-y" />
        {FACES.map((face, i) => (
          <span key={face} className={`gm-throw-face f${face}`}>
            {CELLS.map((cell) => <i key={cell} className={PIPS[face].includes(cell) ? 'on' : ''} />)}
            <b ref={(node) => { el.current.shades[i] = node }} />
          </span>
        ))}
      </span>
    </div>
  )
}
