/*
 * The game's sounds — synthesised, not shipped. Six short tones from the Web
 * Audio API cost no download at all, where even small audio files would be a
 * few hundred kB on a site that counts its bytes (members join from very
 * uneven connections).
 *
 * Everything is best-effort: a browser with no AudioContext, or one that
 * refuses to start it, simply plays nothing. The context is created on the
 * first sound, which is always inside a tap (rolling the die) — the only time
 * a browser will allow it.
 *
 * `setMuted` is module state on purpose: the stage's mute button and every
 * caller share it without threading a prop through the tree. In memory only.
 */
let ctx = null
let muted = false

export function setMuted(value) { muted = !!value }

function audio() {
  if (muted) return null
  try {
    const Ctor = window.AudioContext || window.webkitAudioContext
    if (!Ctor) return null
    if (!ctx) ctx = new Ctor()
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  } catch {
    return null
  }
}

/* One note: a frequency (optionally gliding to another), a start offset, a
   length. The gain ramps down to silence so a note never ends in a click. */
function note(ac, { f, to, at = 0, len = 0.12, type = 'sine', vol = 0.07 }) {
  const t0 = ac.currentTime + at
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(f, t0)
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t0 + len)
  gain.gain.setValueAtTime(vol, t0)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + len)
  osc.connect(gain).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + len + 0.02)
}

function play(notes) {
  const ac = audio()
  if (!ac) return
  try { notes.forEach((n) => note(ac, n)) } catch { /* a sound is never worth an error */ }
}

export const sfx = {
  // A die rattling: a handful of quick, uneven knocks.
  roll: () => play([0, 0.07, 0.15, 0.22, 0.31, 0.42, 0.56, 0.72].map((at, i) => (
    { f: 190 + ((i * 53) % 90), at, len: 0.05, type: 'triangle', vol: 0.06 }
  ))),
  step: () => play([{ f: 520, to: 660, len: 0.06, type: 'sine', vol: 0.04 }]),
  card: () => play([{ f: 392, len: 0.09 }, { f: 523, at: 0.08, len: 0.12 }]),
  right: () => play([{ f: 523, len: 0.11 }, { f: 659, at: 0.1, len: 0.11 }, { f: 784, at: 0.2, len: 0.22 }]),
  wrong: () => play([{ f: 220, to: 150, len: 0.3, type: 'sawtooth', vol: 0.045 }]),
  luck: () => play([{ f: 660, len: 0.08 }, { f: 880, at: 0.07, len: 0.08 }, { f: 660, at: 0.14, len: 0.1 }]),
  tick: () => play([{ f: 880, len: 0.04, vol: 0.035 }]),
  win: () => play([523, 659, 784, 1047, 784, 1047].map((f, i) => (
    { f, at: i * 0.13, len: i === 5 ? 0.5 : 0.13, vol: 0.07 }
  ))),
}
