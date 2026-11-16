/*
 * What a luck card DOES, in words — generated from its `effect`, never typed
 * onto the card (see data/game/cards.js). One source for the rule means the
 * line on the card and what the engine then does cannot disagree.
 *
 * Arabic counts its nouns three ways (واحدة / ـتان / ٣–١٠ جمع), so the helpers
 * spell the small numbers the cards actually use instead of gluing a digit to
 * a singular.
 */
const L = (ar, en) => ({ ar, en })

const squaresAr = (n) => (n === 1 ? 'خانةً واحدة' : n === 2 ? 'خانتين' : `${n} خانات`)
const pointsAr = (n) => (n === 1 ? 'نقطةً واحدة' : n === 2 ? 'نقطتين' : `${n} نقاط`)
const squaresEn = (n) => (n === 1 ? '1 square' : `${n} squares`)
const pointsEn = (n) => (n === 1 ? '1 point' : `${n} points`)

export function effectLine(effect) {
  const n = Math.abs(effect.n || 0)
  switch (effect.kind) {
    case 'move':
      return effect.n > 0
        ? L(`تقدّم ${squaresAr(n)}`, `Move forward ${squaresEn(n)}`)
        : L(`ارجع ${squaresAr(n)}`, `Go back ${squaresEn(n)}`)
    case 'score':
      return effect.n > 0
        ? L(`اربح ${pointsAr(n)}`, `Win ${pointsEn(n)}`)
        : L(`اخسر ${pointsAr(n)}`, `Lose ${pointsEn(n)}`)
    case 'again':
      return L('ارمِ النرد مرّةً أخرى', 'Roll again')
    case 'skip':
      return L('يفوتك دورك القادم', 'Miss your next turn')
    case 'steal':
      return L('خذ نقطةً من صاحب أعلى رصيد', 'Take a point from whoever is ahead')
    case 'gift':
      return L('أعطِ نقطةً لصاحب أقلّ رصيد', 'Give a point to whoever is last')
    case 'others':
      return effect.n > 0
        ? L(`يتقدّم كلّ لاعبٍ آخر ${squaresAr(n)}`, `Every other player moves forward ${squaresEn(n)}`)
        : L(`يرجع كلّ لاعبٍ آخر ${squaresAr(n)}`, `Every other player goes back ${squaresEn(n)}`)
    case 'all':
      return effect.n > 0
        ? L(`يربح الجميع ${pointsAr(n)}`, `Everyone wins ${pointsEn(n)}`)
        : L(`يخسر الجميع ${pointsAr(n)}`, `Everyone loses ${pointsEn(n)}`)
    case 'loan':
      return L(`خذ ${pointsAr(effect.now)} الآن، وردّ ${pointsAr(effect.later)} في دورك القادم`,
        `Take ${pointsEn(effect.now)} now, and repay ${pointsEn(effect.later)} on your next turn`)
    default:
      return L('', '')
  }
}

/* Whether a card is good news, bad news or neither for the player who drew it —
   the card wears it as a colour so the room reacts before the line is read. */
export function effectMood(effect) {
  switch (effect.kind) {
    case 'move': case 'score': return effect.n > 0 ? 'good' : 'bad'
    case 'again': case 'steal': case 'others': return 'good'
    case 'skip': case 'all': return 'bad'
    default: return 'mixed'
  }
}
