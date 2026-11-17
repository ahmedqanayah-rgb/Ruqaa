/*
 * What a chance card DOES, in words — generated from its `effect`, never typed
 * onto the card (see data/game/cards.js). One source for the rule means the
 * line on the card and what the engine then does cannot disagree.
 *
 * Arabic counts its nouns three ways (واحدة / ـتان / ٣–١٠ جمع), so the helpers
 * spell the small numbers the cards actually use instead of gluing a digit to
 * a singular.
 */
const L = (ar, en) => ({ ar, en })

const squaresAr = (n) => (n === 1 ? 'خانةً واحدة' : n === 2 ? 'خانتين' : `${n} خانات`)
const squaresEn = (n) => (n === 1 ? '1 square' : `${n} squares`)

export function effectLine(effect) {
  const n = Math.abs(effect.n || 0)
  switch (effect.kind) {
    case 'move':
      return effect.n > 0
        ? L(`تقدّم ${squaresAr(n)}`, `Move forward ${squaresEn(n)}`)
        : L(`ارجع ${squaresAr(n)}`, `Go back ${squaresEn(n)}`)
    case 'others':
      return effect.n > 0
        ? L(`يتقدّم كلّ لاعبٍ آخر ${squaresAr(n)}`, `Every other player moves forward ${squaresEn(n)}`)
        : L(`يرجع كلّ لاعبٍ آخر ${squaresAr(n)}`, `Every other player goes back ${squaresEn(n)}`)
    case 'all':
      return effect.n > 0
        ? L(`يتقدّم الجميع ${squaresAr(n)}`, `Everyone moves forward ${squaresEn(n)}`)
        : L(`يرجع الجميع ${squaresAr(n)}`, `Everyone goes back ${squaresEn(n)}`)
    case 'again':
      return L('ارمِ النرد مرّةً أخرى', 'Roll again')
    case 'skip':
      return L('يفوتك دورك القادم', 'Miss your next turn')
    case 'steal':
      return L(`خذ حتى ${squaresAr(n)} من المتصدّر`, `Take up to ${squaresEn(n)} from whoever is in front`)
    case 'swap':
      return L('بادِل مكانك مع أقرب لاعبٍ أمامك', 'Swap places with the nearest player ahead of you')
    case 'loan':
      return L(`تقدّم ${squaresAr(effect.now)} الآن، وارجع ${squaresAr(effect.later)} قبل رميتك القادمة`,
        `Move forward ${squaresEn(effect.now)} now, and back ${squaresEn(effect.later)} before your next roll`)
    default:
      return L('', '')
  }
}

/* Whether a card is good news, bad news or neither for the player who drew it —
   the card wears it as a colour so the room reacts before the line is read. */
export function effectMood(effect) {
  switch (effect.kind) {
    case 'move': case 'all': return effect.n > 0 ? 'good' : 'bad'
    case 'others': return effect.n < 0 ? 'good' : 'bad'
    case 'again': case 'steal': case 'swap': return 'good'
    case 'skip': return 'bad'
    default: return 'mixed'
  }
}
