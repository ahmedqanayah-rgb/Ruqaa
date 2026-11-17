/*
 * IS A TYPED ANSWER THE RIGHT NAME? — the forgiving checker behind «خمّن الصورة».
 *
 * A player types "Karl Marks", «كارل ماركس», «ماركس» or "marx" and all of them
 * should count; "Engels" should not. Pure and deterministic, because every phone
 * marks every answer itself and they must reach the same verdict (engine.js).
 * No AI: an outside service would see what members type, cost money per answer,
 * add waiting, and could fail on the night — and the host can always accept a
 * near miss by hand on the result screen.
 *
 * How it forgives:
 *   - letters: Arabic alef/ya/ta-marbuta/hamza forms are one letter each; Arabic
 *     and Persian digits are Western; case, diacritics, tatweel and punctuation
 *     are ignored; «ال» is dropped from the front of a word, and so are "the",
 *     "a", "of", "and", "mr", "dr";
 *   - spelling: a few letters may differ (`tol` grows with the name's length),
 *     and on long names the consonants alone may be compared, which forgives
 *     the vowels transliterations disagree on (شتاينبك / شتاينبيك);
 *   - extra words: "the philosopher Karl Marx" contains "karl marx".
 * What it does NOT do: guess. Every acceptable short form (a surname alone, a
 * nickname, the other language) is listed in the deck's `aliases`, and
 * lib/game/decks.js checks that no wrong option of a question would pass.
 */
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
const STOP = new Set(['the', 'a', 'an', 'of', 'and', 'mr', 'mrs', 'dr', 'sir', 'st'])

export function nameTokens(raw) {
  return String(raw ?? '')
    .normalize('NFKD')
    .replace(/\p{M}|ـ/gu, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ک/g, 'ك')
    .replace(/ی/g, 'ي')
    .replace(/[٠-٩]/g, (d) => ARABIC_DIGITS.indexOf(d))
    .replace(/[۰-۹]/g, (d) => PERSIAN_DIGITS.indexOf(d))
    .toLowerCase()
    // Latin letters that spell one sound two ways: Marx/Marks, Phil/Fil.
    .replace(/x/g, 'ks')
    .replace(/ph/g, 'f')
    .replace(/ck/g, 'k')
    .replace(/q/g, 'k')
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .map((t) => (t.length > 4 && t.startsWith('ال') ? t.slice(2) : t))
    .filter((t) => !STOP.has(t))
}

export const nameKey = (raw) => nameTokens(raw).join('')

/* The consonants alone: the vowels are where transliterations disagree. */
const skeleton = (key) => key.replace(/[aeiouyاوي]/g, '')

/* How many letters may differ, by the length of the right answer. */
const tol = (n) => (n <= 3 ? 0 : n <= 6 ? 1 : n <= 11 ? 2 : 3)

/* Optimal-string-alignment distance (insert, delete, replace, swap two
   neighbours), giving up as soon as it is over `max`. */
export function editDistance(a, b, max = Infinity) {
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev2 = null
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    const row = [i]
    let best = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      let d = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost)
      if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, prev2[j - 2] + 1)
      row.push(d)
      if (d < best) best = d
    }
    if (best > max) return max + 1
    prev2 = prev
    prev = row
  }
  return prev[b.length]
}

export function matchesName(typed, aliases) {
  const t = nameKey(typed)
  if (t.length < 2) return false
  for (const alias of aliases) {
    const a = nameKey(alias)
    if (!a) continue
    if (t === a) return true
    if (a.length >= 5 && t.includes(a)) return true
    const n = tol(a.length)
    if (n && editDistance(t, a, n) <= n) return true
    if (a.length >= 6) {
      const ts = skeleton(t)
      const as = skeleton(a)
      const m = tol(as.length)
      if (as.length >= 3 && m && editDistance(ts, as, m) <= m) return true
    }
  }
  return false
}
