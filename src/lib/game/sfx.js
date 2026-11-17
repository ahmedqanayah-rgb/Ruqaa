/*
 * The game's sounds — synthesised, not shipped. Six short tones from the Web
 * Audio API cost no download at all, where even small audio files would be a
 * few hundred kB on a site that counts its bytes (members join from very
 * uneven connections).
 *
 * Everything is best-effort: a browser with no AudioContext, or one that
 * refuses to start it, simply plays nothing. The context is created on the
 * first sound — for the player who rolls, inside the tap, the only time a
 * browser is sure to allow it.
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

/* A twentieth of a second of noise, fading: the click in a knock. Made once. */
let noise = null
function noiseOf(ac) {
  if (!noise || noise.sampleRate !== ac.sampleRate) {
    const n = Math.floor(ac.sampleRate * 0.05)
    noise = ac.createBuffer(1, n, ac.sampleRate)
    const d = noise.getChannelData(0)
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n)
  }
  return noise
}

/* The die knocking on the board: a click of filtered noise over a short,
   hollow, wooden note. `s` is how hard (0–1), `p` the pitch (1 is the board;
   the frame sounds lower, the rattle in the hand higher). */
function knock(ac, { at, s, p }) {
  const t0 = ac.currentTime + Math.max(0, at)
  const src = ac.createBufferSource()
  src.buffer = noiseOf(ac)
  src.playbackRate.value = 0.8 + 0.4 * p
  const band = ac.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 2400 * p
  band.Q.value = 1.4
  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.05 + 0.25 * s, t0)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.04 + 0.03 * s)
  src.connect(band).connect(gain).connect(ac.destination)
  src.start(t0)
  src.stop(t0 + 0.1)
  note(ac, { f: 620 * p, to: 470 * p, at: Math.max(0, at), len: 0.05 + 0.04 * s, type: 'triangle', vol: 0.02 + 0.07 * s })
}

export const sfx = {
  // The thrown die: every knock it makes, each `at` seconds from now (DieThrow).
  dice: (knocks) => {
    const ac = audio()
    if (!ac) return
    try { knocks.forEach((k) => knock(ac, k)) } catch { /* a sound is never worth an error */ }
  },
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
