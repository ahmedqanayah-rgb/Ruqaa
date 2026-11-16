import { useApp } from '../../context/AppContext.jsx'
import { POINTS } from '../../lib/game/engine.js'

/*
 * Small pieces the game's screens share: the players' tokens, the die, and the
 * rules.
 */
const L = (ar, en) => ({ ar, en })

/* Six token colours, picked to stay apart from one another on the dark table
   AND from the three books' tones the squares wear. Colour is never the only
   mark: every token also carries its player's letter (see `tokenLabels`). */
export const TOKEN_COLORS = ['#F4B13E', '#5CC8F2', '#3DD9A4', '#F2788C', '#B79CF8', '#EDE7DA']

/* What each token says: the player's first letter — or their number, wherever
   two players would otherwise show the same letter (سارة and سلمى; or everyone,
   when nobody typed a name and they are all «اللاعب …»). */
export function tokenLabels(names) {
  const first = names.map((n) => Array.from(n.trim())[0]?.toUpperCase() || '')
  return first.map((ch, i) => (ch && first.indexOf(ch) === first.lastIndexOf(ch) ? ch : String(i + 1)))
}

export function Token({ color, label, className = '', style }) {
  return (
    <span className={`gm-token ${className}`} style={{ '--tk': color, ...style }} aria-hidden>
      {label}
    </span>
  )
}

/* ---- the die: a real cube, turned to the face that was rolled ----
   Six faces placed in 3D; the cube is rotated so the rolled one faces the
   table. `spin` counts rolls, and each roll adds whole turns on top of the last
   rotation, so the cube always tumbles FORWARD — and a second 4 in a row still
   visibly rolls instead of sitting still.

   A picture, not text: it must not mirror in a right-to-left page (a die's
   pips are not a sentence), hence `dir="ltr"`. */
const PIPS = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] }
// The rotation that brings each face to the front.
const FACE_TURN = { 1: [0, 0], 2: [0, -90], 3: [-90, 0], 4: [90, 0], 5: [0, 90], 6: [0, 180] }

export function Die({ value = 1, spin = 0, rolling = false }) {
  const [x, y] = FACE_TURN[value] || FACE_TURN[1]
  const turns = spin * 720
  return (
    <span className={`gm-die ${rolling ? 'is-rolling' : ''}`} dir="ltr" aria-hidden>
      <span className="gm-die-cube" style={{ transform: `rotateX(${x + turns}deg) rotateY(${y + turns}deg)` }}>
        {[1, 2, 3, 4, 5, 6].map((face) => (
          <span key={face} className={`gm-die-face f${face}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell) => (
              <i key={cell} className={PIPS[face].includes(cell) ? 'on' : ''} />
            ))}
          </span>
        ))}
      </span>
    </span>
  )
}

/* The rules, short enough to read aloud once at the start of a session. The
   numbers come from the engine's own POINTS, so the page cannot promise a score
   the game does not give. */
/* Arabic counts in three forms (واحدة / ـتان / ٣–١٠ جمع), so a number cannot
   simply be dropped in front of a noun the way English allows. */
const ptsAr = (n) => (n === 1 ? 'نقطةٌ واحدة' : n === 2 ? 'نقطتان' : `${n} نقاط`)
const ptsEn = (n) => (n === 1 ? '1 point' : `${n} points`)

export function GameRules() {
  const { t } = useApp()
  const rules = [
    L('لاعبٌ واحد يفتح اللعبة ويشارك شاشته في الجلسة. الجميع يجيبون بصوتهم، وهو ينقر ما قالوه.',
      'One person opens the game and shares their screen in the meeting. Everyone answers out loud, and the host taps what they said.'),
    L('في دورك: ارمِ النرد، وتحرّك، ونفّذ ما تقوله الخانة.',
      'On your turn: roll the die, move, and do what the square says.'),
    L(`سؤالٌ من كتاب: ${ptsAr(POINTS.mcq)} للإجابة الصحيحة. «خرافة أم حقيقة؟»: ${ptsAr(POINTS.tf)}.`,
      `A question from a book: ${ptsEn(POINTS.mcq)} for the right answer. “Myth or fact?”: ${ptsEn(POINTS.tf)}.`),
    L(`التحدّي يُؤدّى أمام الجميع، والمجموعة هي الحكم: ${ptsAr(POINTS.dare)} إن نجح. وبطاقة الحظّ تفعل ما تقول.`,
      `A dare is done in front of everyone, and the group is the judge: ${ptsEn(POINTS.dare)} if it passes. A luck card does what it says.`),
    L(`أوّل من يبلغ الخانة الأخيرة ينال ${ptsAr(POINTS.finish)}، وتُكمَل الجولة ليتساوى عدد الأدوار — ثم يفوز صاحب أعلى رصيد، لا أوّل الواصلين.`,
      `The first to reach the last square earns ${ptsEn(POINTS.finish)} and the round is finished, so everyone has had the same number of turns — then the highest score wins, not the first to arrive.`),
  ]
  return (
    <ol className="gm-rules">
      {rules.map((r, i) => <li key={i}>{t(r)}</li>)}
    </ol>
  )
}
