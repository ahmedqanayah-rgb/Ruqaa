import { ASPECT } from './board.js'
import { T } from './engine.js'
import { seeded } from './rand.js'

/*
 * THE THROW — the die, as it is thrown onto the board.
 *
 * When a player rolls, every phone shows the same throw: the die is shaken in
 * the hand for a moment, flies out over the board, bounces (off the board, and
 * off its frame if it gets that far), tips over its edges and settles — on the
 * number the rules have already rolled.
 *
 * A REAL, SMALL SIMULATION, not a canned animation: a cube with mass and spin
 * under gravity, struck at its corners by the table and the board's four sides
 * (impulses with restitution and friction). That is what makes it look thrown
 * rather than animated: every bounce changes the spin the way a real one does.
 *
 * LANDING ON THE ROLLED NUMBER. The rules decide the number (engine.js, from
 * the room's seed), and physics cannot be asked for a face. So the cube is
 * thrown unlabelled, and once it has settled its faces are LABELLED so that the
 * one on top carries the number that was rolled. A cube is the same shape after
 * any of its 24 turns, so the relabelling changes nothing about the motion —
 * only which pips are painted where (`relabel`).
 *
 * THE SAME THROW ON EVERY PHONE. It is thrown with the room's seed, the
 * simulation itself uses nothing but + − × ÷ and √ (which every JavaScript
 * engine computes to the same bit — no sin or exp in the loop), and the moment
 * shown is read off the room's clock. Six phones, one throw.
 *
 * Units: the die's edge is 1, and the board is BW × BH edges. x runs right, y
 * down the board and z up off it, towards the viewer — CSS's own axes, so a
 * pose here is a CSS transform with no conversion.
 */

/* The die's edge as a share of the board's width. game.css draws it at 16cqw. */
export const DIE = 0.16
const BW = 1 / DIE
const BH = BW / ASPECT

/* The throw's timeline, in ms after `rolledAt`. The engine's T.dice — when the
   token sets off — covers the shake, the flight and a beat to read the die,
   which then fades while the token walks. Shaking first is not only theatre:
   it is the time the roll takes to reach the other phones, so they see the
   throw from its start, not from its middle. */
export const SHAKE = 560
const READ = 480
const FADE = 320
const FLY = T.dice - SHAKE - READ
const GONE = T.dice - 60 // the fade starts here…
export const DONE = GONE + FADE // …and the die is gone here

/* ---- the physics ---- */
const HZ = 400 // steps a second
const DT = 1 / HZ
const REC = 2 // a frame is kept every REC steps
const G = 48 // edges a second², slower than life: a real die is over in a blink
const E_TABLE = 0.42 // how much of a bounce survives, off the board…
const E_WALL = 0.5 // …and off its frame
const MU = 0.45 // friction
const INV_I = 6 // a cube of mass 1 and edge 1 turns like I = 1/6 about any axis
const CORNERS = [-0.5, 0.5].flatMap((x) => [-0.5, 0.5].flatMap((y) => [-0.5, 0.5].map((z) => [x, y, z])))
const REACH = 0.87 // no corner is further than this from the centre (half the diagonal, √3/2)

/* The faces, by the direction each faces in the die's own frame — the same
   directions game.css gives `.gm-throw-face.f1` … `.f6`. */
export const FACES = [1, 2, 3, 4, 5, 6]
const NORMAL = { 1: [0, 0, 1], 6: [0, 0, -1], 2: [1, 0, 0], 5: [-1, 0, 0], 3: [0, -1, 0], 4: [0, 1, 0] }

/* ---- quaternions [w, x, y, z] and 3×3 matrices (row-major) ---- */
export function qmul(a, b) {
  return [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
  ]
}
function qnorm(q) {
  const n = Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3])
  return [q[0] / n, q[1] / n, q[2] / n, q[3] / n]
}
/* The shorter way from a to b, a share w along it. */
function nlerp(a, b, w) {
  const s = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3] < 0 ? -1 : 1
  return qnorm([a[0] + (s * b[0] - a[0]) * w, a[1] + (s * b[1] - a[1]) * w, a[2] + (s * b[2] - a[2]) * w, a[3] + (s * b[3] - a[3]) * w])
}
export function qmat([w, x, y, z]) {
  return [
    1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y),
    2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x),
    2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y),
  ]
}
const mv = (m, v) => [
  m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
  m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
  m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
]
function mm(a, b) {
  const out = new Array(9)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) out[r * 3 + c] = a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c]
  }
  return out
}
const lerp = (a, b, w) => a + (b - a) * w

/* The cube's 24 turns: the signed permutation matrices with determinant +1. */
const TURNS = (() => {
  const out = []
  for (const p of [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]) {
    for (let s = 0; s < 8; s++) {
      const m = new Array(9).fill(0)
      for (let r = 0; r < 3; r++) m[r * 3 + p[r]] = (s >> r) & 1 ? -1 : 1
      const det = m[0] * (m[4] * m[8] - m[5] * m[7]) - m[1] * (m[3] * m[8] - m[5] * m[6]) + m[2] * (m[3] * m[7] - m[4] * m[6])
      if (det === 1) out.push(m)
    }
  }
  return out
})()

/* A turn of the cube inside its own skin that brings the face which will be
   labelled `value` to where the face that ended on top sat. */
function relabel(value, top) {
  const want = NORMAL[top]
  return TURNS.find((m) => mv(m, NORMAL[value]).every((c, i) => c === want[i]))
}

/* Random directions without trigonometry: rejection sampling. */
function unit(rand, dims) {
  for (;;) {
    const v = Array.from({ length: dims }, () => rand() * 2 - 1)
    const n = v.reduce((sum, c) => sum + c * c, 0)
    if (n > 0.01 && n <= 1) return v.map((c) => c / Math.sqrt(n))
  }
}

/* An impulse at a corner `r` (from the centre) against a surface facing `n`. */
function kick(s, rx, ry, rz, jx, jy, jz) {
  s.vx += jx; s.vy += jy; s.vz += jz
  s.wx += INV_I * (ry * jz - rz * jy)
  s.wy += INV_I * (rz * jx - rx * jz)
  s.wz += INV_I * (rx * jy - ry * jx)
}
function strike(s, rx, ry, rz, nx, ny, nz, e) {
  const cv = (axis) => (axis === 0 ? s.vx + (s.wy * rz - s.wz * ry) : axis === 1 ? s.vy + (s.wz * rx - s.wx * rz) : s.vz + (s.wx * ry - s.wy * rx))
  const vn = cv(0) * nx + cv(1) * ny + cv(2) * nz
  if (vn >= 0) return 0
  const ax = ry * nz - rz * ny, ay = rz * nx - rx * nz, az = rx * ny - ry * nx
  // A slow touch does not bounce: that is what lets the die come to rest.
  const j = (-(1 + (vn < -0.8 ? e : 0)) * vn) / (1 + INV_I * (ax * ax + ay * ay + az * az))
  kick(s, rx, ry, rz, nx * j, ny * j, nz * j)
  // Friction, against whatever is still sliding — never more than it takes to stop it.
  const ux = cv(0), uy = cv(1), uz = cv(2)
  const un = ux * nx + uy * ny + uz * nz
  let tx = ux - un * nx, ty = uy - un * ny, tz = uz - un * nz
  const tl = Math.sqrt(tx * tx + ty * ty + tz * tz)
  if (tl > 1e-6) {
    tx /= tl; ty /= tl; tz /= tl
    const bx = ry * tz - rz * ty, by = rz * tx - rx * tz, bz = rx * ty - ry * tx
    const jt = Math.min(MU * j, tl / (1 + INV_I * (bx * bx + by * by + bz * bz)))
    kick(s, rx, ry, rz, -tx * jt, -ty * jt, -tz * jt)
  }
  return -vn
}

/* One throw of an unlabelled cube, from the hand until it lies still. */
function simulate(rand) {
  const s = {}
  // The hand, near the bottom of the board, and where it aims: the middle.
  s.px = BW * (0.3 + 0.4 * rand()); s.py = BH - 1.05; s.pz = 1.55
  const aimX = BW * (0.26 + 0.48 * rand()), aimY = BH * (0.3 + 0.2 * rand())
  let dx = aimX - s.px, dy = aimY - s.py
  const dist = Math.sqrt(dx * dx + dy * dy)
  dx /= dist; dy /= dist
  const speed = dist * (1.5 + 0.5 * rand())
  s.vx = dx * speed; s.vy = dy * speed; s.vz = 3.5 + 3 * rand()
  // Spin: mostly rolling forwards (about z × the way it flies), some every which way.
  const [ux, uy, uz] = unit(rand, 3)
  const roll = 10 + 8 * rand(), tumble = 8 + 9 * rand()
  s.wx = -dy * roll + ux * tumble; s.wy = dx * roll + uy * tumble; s.wz = uz * tumble
  ;[s.qw, s.qx, s.qy, s.qz] = unit(rand, 4)
  const p0 = [s.px, s.py, s.pz], q0 = [s.qw, s.qx, s.qy, s.qz]

  const frames = []
  const hits = []
  const hit = (t, speed, wall) => {
    const last = hits[hits.length - 1]
    if (last && t - last.t < 0.03) last.s = Math.max(last.s, speed)
    else hits.push({ t, s: speed, wall })
  }
  let still = 0
  let i = 0
  for (; i < HZ * 3; i++) {
    if (i % REC === 0) frames.push(s.px, s.py, s.pz, s.qw, s.qx, s.qy, s.qz)
    // Fly…
    s.vz -= G * DT
    s.px += s.vx * DT; s.py += s.vy * DT; s.pz += s.vz * DT
    // …and turn: q += ½ (0, ω) q dt.
    const { qw, qx, qy, qz, wx, wy, wz } = s
    const q = qnorm([
      qw + 0.5 * DT * (-wx * qx - wy * qy - wz * qz),
      qx + 0.5 * DT * (wx * qw + wy * qz - wz * qy),
      qy + 0.5 * DT * (wy * qw + wz * qx - wx * qz),
      qz + 0.5 * DT * (wz * qw + wx * qy - wy * qx),
    ])
    ;[s.qw, s.qx, s.qy, s.qz] = q
    const R = qmat(q)
    const t = i * DT
    // In open air there is nothing to strike.
    if (s.pz > REACH && s.px > REACH && s.px < BW - REACH && s.py > REACH && s.py < BH - REACH) { still = 0; continue }

    // Every corner that has gone through the board or a side is struck back.
    let touching = false
    for (let pass = 0; pass < 3; pass++) {
      for (const [lx, ly, lz] of CORNERS) {
        const rx = R[0] * lx + R[1] * ly + R[2] * lz
        const ry = R[3] * lx + R[4] * ly + R[5] * lz
        const rz = R[6] * lx + R[7] * ly + R[8] * lz
        const cx = s.px + rx, cy = s.py + ry, cz = s.pz + rz
        if (cz < 0) {
          touching = true
          const v = strike(s, rx, ry, rz, 0, 0, 1, E_TABLE)
          if (pass === 0 && v > 1.5) hit(t, v, false)
        }
        let w = 0
        if (cx < 0) w = strike(s, rx, ry, rz, 1, 0, 0, E_WALL)
        else if (cx > BW) w = strike(s, rx, ry, rz, -1, 0, 0, E_WALL)
        if (cy < 0) w = Math.max(w, strike(s, rx, ry, rz, 0, 1, 0, E_WALL))
        else if (cy > BH) w = Math.max(w, strike(s, rx, ry, rz, 0, -1, 0, E_WALL))
        if (pass === 0 && w > 1.5) hit(t, w, true)
      }
    }
    // Nothing may stay inside the board or its frame.
    let lowZ = 0, lowX = 0, highX = 0, lowY = 0, highY = 0
    for (const [lx, ly, lz] of CORNERS) {
      const cx = s.px + R[0] * lx + R[1] * ly + R[2] * lz
      const cy = s.py + R[3] * lx + R[4] * ly + R[5] * lz
      const cz = s.pz + R[6] * lx + R[7] * ly + R[8] * lz
      lowZ = Math.min(lowZ, cz); lowX = Math.min(lowX, cx); highX = Math.max(highX, cx - BW)
      lowY = Math.min(lowY, cy); highY = Math.max(highY, cy - BH)
    }
    s.pz -= lowZ; s.px -= lowX + highX; s.py -= lowY + highY

    // Rolling on the board costs a little, every step.
    if (touching) {
      const f = 1 - 1.8 * DT, g = 1 - 0.9 * DT
      s.wx *= f; s.wy *= f; s.wz *= f
      s.vx *= g; s.vy *= g
    }
    // Lying flat, and barely moving, for a moment: it has settled.
    const flat = Math.max(Math.abs(R[6]), Math.abs(R[7]), Math.abs(R[8])) > 0.999
    const slow = s.vx * s.vx + s.vy * s.vy + s.vz * s.vz < 0.03 && s.wx * s.wx + s.wy * s.wy + s.wz * s.wz < 0.4
    if (touching && flat && slow) { if (++still >= 8) break } else still = 0
  }
  frames.push(s.px, s.py, s.pz, s.qw, s.qx, s.qy, s.qz)

  // Which face is up, and the small turn that lays it exactly flat.
  const q = [s.qw, s.qx, s.qy, s.qz]
  const R = qmat(q)
  let j = 0
  for (let k = 1; k < 3; k++) if (Math.abs(R[6 + k]) > Math.abs(R[6 + j])) j = k
  const sign = R[6 + j] > 0 ? 1 : -1
  const top = j === 0 ? (sign > 0 ? 2 : 5) : j === 1 ? (sign > 0 ? 4 : 3) : sign > 0 ? 1 : 6
  const u = [sign * R[j], sign * R[3 + j], sign * R[6 + j]]
  const qCorr = qnorm([1 + u[2], u[1], -u[0], 0]) // the shortest turn from u to straight up
  return {
    p0, q0, frames, n: frames.length / 7, hits, top, qCorr,
    end: i * DT, pEnd: [s.px, s.py, 0.5], qRest: qmul(qCorr, q),
  }
}

/*
 * The throw for one roll. A few throws are tried, in a seeded order, and the
 * first that bounces properly, settles in good time and stops clear of the
 * edges is kept — the same choice on every phone.
 */
export function planThrow(seed, turn, value) {
  let pick = null
  for (let attempt = 0; attempt < 8; attempt++) {
    const sim = simulate(seeded(seed, turn, 'throw', attempt))
    const bounces = sim.hits.filter((h) => !h.wall && h.s > 2.5).length
    const [x, y] = sim.pEnd
    const clear = x > 1 && x < BW - 1 && y > 1.2 && y < BH - 1.6
    const miss = Math.abs(sim.end - 1.1) + (bounces >= 2 ? 0 : 1) + (clear ? 0 : 2)
    if (!pick || miss < pick.miss) pick = { sim, miss }
    if (sim.end >= 0.75 && sim.end <= 1.45 && bounces >= 2 && clear) break
  }
  const { sim } = pick
  // The flight is played a little faster or slower, never by much, to fit.
  const rate = Math.min(1.3, Math.max(0.85, (sim.end * 1000) / FLY))
  const at = (simT) => SHAKE + (simT * 1000) / rate
  // The knocks the die makes: rattling in the hand, then every bounce.
  const r = seeded(seed, turn, 'rattle')
  const knocks = []
  for (let k = 60 + 30 * r(); k < SHAKE - 50; k += 45 + 45 * r()) knocks.push({ at: k, s: 0.12 + 0.18 * r(), p: 1.25 + 0.3 * r() })
  for (const h of sim.hits) knocks.push({ at: at(h.t), s: Math.min(1, h.s / 9), p: h.wall ? 0.8 : 0.95 + 0.1 * r() })
  return {
    ...sim, rate, C: relabel(value, sim.top), settle: at(sim.end), knocks,
    jig: unit(r, 3), // the axis the die wobbles about in the hand
  }
}

/* Where the die is, and how it is turned, `t` ms after the roll. */
export function poseAt(plan, t, still = false) {
  let p, q
  if (still) {
    // Reduced motion: no throw — the die is simply there, settled.
    p = plan.pEnd; q = plan.qRest
  } else if (t < SHAKE) {
    // In the hand: it comes up over the edge of the board, and is shaken.
    const rise = 1 - (1 - Math.min(1, t / 170)) ** 3
    const env = Math.sin((Math.PI * t) / SHAKE)
    p = [
      plan.p0[0] + 0.1 * env * Math.sin(t / 21),
      plan.p0[1] + (1 - rise) * 2.4 + 0.08 * env * Math.sin(t / 29 + 1.3),
      plan.p0[2],
    ]
    const half = 0.16 * env * Math.sin(t / 17)
    const sh = Math.sin(half)
    q = qmul([Math.cos(half), plan.jig[0] * sh, plan.jig[1] * sh, plan.jig[2] * sh], plan.q0)
  } else {
    const st = ((t - SHAKE) / 1000) * plan.rate
    if (st >= plan.end) {
      p = plan.pEnd; q = plan.qRest
    } else {
      const f = st * (HZ / REC)
      const i = Math.min(plan.n - 2, Math.floor(f))
      const w = Math.min(1, f - i)
      const F = plan.frames, o = i * 7
      p = [lerp(F[o], F[o + 7], w), lerp(F[o + 1], F[o + 8], w), lerp(F[o + 2], F[o + 9], w)]
      q = nlerp([F[o + 3], F[o + 4], F[o + 5], F[o + 6]], [F[o + 10], F[o + 11], F[o + 12], F[o + 13]], w)
      // The last sliver lays it exactly flat (the simulation stops a hair short).
      const left = plan.end - st
      if (left < 0.12) {
        const b = 1 - left / 0.12
        q = nlerp(q, qmul(plan.qCorr, q), b)
        p = [p[0], p[1], lerp(p[2], 0.5, b)]
      }
    }
  }
  const alpha = still
    ? Math.min(1, t / 200) * (t > GONE ? Math.max(0, 1 - (t - GONE) / FADE) : 1)
    : t < 100 ? t / 100 : t > GONE ? Math.max(0, 1 - (t - GONE) / FADE) : 1
  const settled = still ? 0 : t - plan.settle
  return {
    p, m: mm(qmat(q), plan.C), alpha,
    halo: settled >= 0 ? Math.min(1, settled / 200) : 0,
    pop: settled >= 0 ? Math.max(0, 1 - settled / 260) : 0,
  }
}

/* ---- drawing it: light, shade and shadow ---- */
const LIGHT = (() => { const l = [-0.35, -0.55, 1], n = Math.sqrt(l[0] ** 2 + l[1] ** 2 + l[2] ** 2); return l.map((c) => c / n) })()

/* How much darker each face (in FACES order) is, lit from the top left. */
export function shadeOf(m) {
  return FACES.map((face) => {
    const n = mv(m, NORMAL[face])
    const lit = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2])
    return Math.min(0.66, Math.max(0, 0.62 - 0.74 * lit))
  })
}

/* The shadow on the board: cast away from the light, softer and fainter the
   higher the die, turned with whichever of its axes lies flattest. */
export function shadowOf({ p, m }) {
  const h = Math.max(0, p[2] - 0.5)
  let j = 0
  for (let k = 1; k < 3; k++) if (Math.abs(m[6 + k]) < Math.abs(m[6 + j])) j = k
  return {
    x: p[0] - (LIGHT[0] / LIGHT[2]) * p[2],
    y: p[1] - (LIGHT[1] / LIGHT[2]) * p[2],
    yaw: Math.atan2(m[3 + j], m[j]),
    k: 1.04 + 0.16 * h,
    o: 0.62 / (1 + 0.55 * h),
  }
}

/* The die's CSS transform, for a board whose die edge is `u` px. */
export function cssMatrix({ p, m, alpha }, u) {
  const k = 0.88 + 0.12 * alpha
  const f = (n) => n.toFixed(5)
  return `matrix3d(${f(m[0] * k)},${f(m[3] * k)},${f(m[6] * k)},0,${f(m[1] * k)},${f(m[4] * k)},${f(m[7] * k)},0,${f(m[2] * k)},${f(m[5] * k)},${f(m[8] * k)},0,${f(p[0] * u - u / 2)},${f(p[1] * u - u / 2)},${f(p[2] * u)},1)`
}
