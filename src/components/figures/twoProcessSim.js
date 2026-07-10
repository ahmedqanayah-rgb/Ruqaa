/*
 * Two-process model simulation (Walker, ch. on the two forces of sleep).
 * Matched to the book's Figure 4 & 7 references:
 *  - Process-S (sleep pressure / adenosine): the SOLID line. Rises while awake,
 *    drops during sleep. It is ALWAYS the upper line.
 *  - Process-C (circadian drive to wakefulness): the DOTTED line. A low-amplitude
 *    wave that stays BELOW S at all times, coming closest (a near-touch) only at
 *    the morning wake — the "strong drive to wakefulness" point.
 *  - Sleepiness "drive" = the vertical gap S − C (small in the morning, largest
 *    at bedtime). By construction C ≤ S, so the two lines never cross.
 * Caffeine masks S; naps discharge S; evening light nudges the circadian phase;
 * accumulated sleep-deprivation days raise the starting pressure.
 */

export const DEFAULTS = {
  bedtime: 23,        // evening hour (20–28; 25 = 1am)
  wake: 7,            // morning hour (4–11)
  caffeineMl: 0,      // ml of coffee (0 = none)
  caffeineTime: 15,   // hour of last cup
  napTime: 0,         // 0 = no nap, else hour
  napDuration: 0.5,   // hours
  eveningLight: 0.3,  // 0 (dark) .. 1 (bright screens)
  deprivationDays: 0, // 0..3 accumulated
  noSleep: false,     // Fig 7: stay awake all night
}

// Circadian drive to wakefulness (Process-C): low-amplitude wave, peak in the
// afternoon (~15:00), trough deep at night (~03:00). Bounded so it sits under S.
function circadian(hourAbs, eveningLight) {
  const h = ((hourAbs % 24) + 24) % 24
  // Evening light delays the clock a little (shifts the peak later).
  const peak = 15 + eveningLight * 1.2
  const wave = 0.5 + 0.5 * Math.cos((2 * Math.PI * (h - peak)) / 24) // 0..1
  return 0.05 + 0.34 * wave // ~0.05 .. ~0.39
}

export function simulate(params) {
  const p = { ...DEFAULTS, ...params }
  const dt = 1 / 6 // 10-minute steps
  const start = p.wake
  const end = p.wake + 48
  const tauWake = 8.5
  const tauSleep = 3.5
  const sleepFloor = 0.08

  const isAsleep = (t) => {
    if (p.noSleep) return false
    for (let k = 0; k < 3; k++) {
      const bedK = p.bedtime + 24 * k
      const wakeK = p.wake + 24 * (k + 1)
      if (t >= bedK && t < wakeK) return true
    }
    if (p.napTime > 0 && t >= p.napTime && t < p.napTime + p.napDuration) return true
    return false
  }

  const caffeine = (t) => {
    if (!p.caffeineMl || t < p.caffeineTime) return 0
    const halfLife = 5.5
    const amt = (p.caffeineMl / 200) * 0.4
    return amt * Math.pow(0.5, (t - p.caffeineTime) / halfLife)
  }

  // Start the morning at the post-sleep floor so C nearly touches S at wake.
  let S = sleepFloor + 0.08 + p.deprivationDays * 0.1
  const points = []
  for (let t = start; t <= end + 1e-9; t += dt) {
    const asleep = isAsleep(t)
    const target = asleep ? sleepFloor : 1.0
    const tau = asleep ? tauSleep : tauWake
    S += ((target - S) / tau) * dt
    S = Math.max(0, Math.min(1.15, S))
    const caf = caffeine(t)
    const Seff = Math.max(0, S - caf)
    const Craw = circadian(t, p.eveningLight)
    // Guarantee C never exceeds the (displayed) sleep-pressure line.
    const C = Math.min(Craw, Seff)
    points.push({
      t: +t.toFixed(3),
      hour: ((t % 24) + 24) % 24,
      S: +S.toFixed(4),
      Seff: +Seff.toFixed(4),
      C: +C.toFixed(4),
      caf: +caf.toFixed(4),
      asleep,
      gap: +(Seff - C).toFixed(4),
    })
  }
  return { points, start, end, params: p }
}
