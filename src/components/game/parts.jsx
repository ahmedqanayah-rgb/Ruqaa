import { useEffect, useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import Icon from '../Icon.jsx'

/*
 * Small pieces the game's screens share: the players' tokens, the die, the
 * clock, and the words every screen uses for the kinds of round.
 */
export const L = (ar, en) => ({ ar, en })

/* Eight token colours, picked to stay apart from one another on the painted
   board. Colour is never the only mark: every token also carries its player's
   letter (see `tokenLabels`). */
export const TOKEN_COLORS = ['#F4B13E', '#5CC8F2', '#3DD9A4', '#F2788C', '#B79CF8', '#F3EEE2', '#FF8A4C', '#B8E04A']

/* What each token says: the player's first letter — or their number, wherever
   two players would otherwise show the same letter (سارة and سلمى). */
export function tokenLabels(names) {
  const first = names.map((n) => Array.from(String(n || '').trim())[0]?.toUpperCase() || '')
  return first.map((ch, i) => (ch && first.indexOf(ch) === first.lastIndexOf(ch) ? ch : String(i + 1)))
}

export function Token({ color, label, className = '', style }) {
  return (
    <span className={`gm-token ${className}`} style={{ '--tk': color, ...style }} aria-hidden>
      {label}
    </span>
  )
}

/* A player as a small chip: token and name. */
export function Who({ player, label, className = '' }) {
  return (
    <span className={`gm-who ${className}`}>
      <Token color={TOKEN_COLORS[player.c]} label={label} />
      <bdi>{player.name}</bdi>
    </span>
  )
}

/* ---- the small die: a real cube, turned to the face that was rolled ----
   The one in the roll button and under the board, showing the last roll. (The
   die THROWN across the board is DieThrow.jsx.) Six faces placed in 3D; the
   cube is rotated so the rolled one faces the viewer, and each roll adds whole
   turns on top of the last rotation (`spin` counts rolls), so it always turns
   forward to its new face.

   A picture, not text: it must not mirror in a right-to-left page (a die's
   pips are not a sentence), hence `dir="ltr"`. */
export const PIPS = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] }
const FACE_TURN = { 1: [0, 0], 2: [0, -90], 3: [-90, 0], 4: [90, 0], 5: [0, 90], 6: [0, 180] }

export function Die({ value = 1, spin = 0 }) {
  const [x, y] = FACE_TURN[value] || FACE_TURN[1]
  const turns = spin * 720
  return (
    <span className="gm-die" dir="ltr" aria-hidden>
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

/* ---- time ----
   The room's clock (the mailbox's, as estimated by net.js), re-read on a
   steady beat. Everything on a countdown reads THIS, never Date.now(): six
   phones with six wrong clocks must still run out of time together. */
export function useNow(room, every = 200) {
  const [now, setNow] = useState(() => room.now())
  useEffect(() => {
    const id = setInterval(() => setNow(room.now()), every)
    return () => clearInterval(id)
  }, [room, every])
  return now
}

/* A bar that empties from t0 to t1 — and nothing at all for an untimed round. */
export function TimeBar({ now, t0, t1 }) {
  if (t1 == null) return null
  const left = Math.max(0, Math.min(1, (t1 - now) / Math.max(1, t1 - t0)))
  const secs = Math.max(0, Math.ceil((t1 - now) / 1000))
  return (
    <div className={`gm-time ${secs <= 5 ? 'is-low' : ''}`} role="timer" aria-label={`${secs}s`}>
      <span className="gm-time-fill" style={{ transform: `scaleX(${left})` }} />
      <b dir="ltr">{secs}</b>
    </div>
  )
}

/* "+2" beside a name — the one way steps are written, in either language. */
export function Steps({ n }) {
  if (!n) return null
  return <b className={`gm-steps ${n < 0 ? 'is-neg' : ''}`} dir="ltr">{n > 0 ? `+${n}` : `−${Math.abs(n)}`}</b>
}

/* Arabic counts in three forms (واحدة / ـتان / ٣–١٠ جمع), so a number cannot
   simply be dropped in front of a noun the way English allows. */
export const stepsText = (n) => L(
  n === 1 ? 'خطوةً واحدة' : n === 2 ? 'خطوتين' : `${n} خطوات`,
  n === 1 ? '1 step' : `${n} steps`,
)

/* ---- the kinds of round, in words ----
   `how` is what the "you landed on…" card says, so it has to be readable in
   the three seconds that card is up. */
export const KIND = {
  mcq: {
    icon: '📖', tone: 'book',
    title: L('سؤال من الكتاب', 'A question from the book'),
    how: L('الكلّ يجيب على هاتفه. الإجابة الصحيحة بخطوتين، والتلميح (حذف إجابتين) يكلّف خطوة. وأسرع المصيبين يأخذ خطوةً إضافية.',
      'Everyone answers on their own phone. A right answer is worth two steps, and a hint (two answers removed) costs one. The fastest right answer earns an extra step.'),
  },
  tf: {
    icon: '❓', tone: 'book',
    title: L('خرافة أم حقيقة؟', 'Myth or fact?'),
    how: L('عبارةٌ واحدة: حقيقةٌ يقولها الكتاب، أم خرافةٌ شائعة؟ الإجابة الصحيحة بخطوتين، والتلميح يكلّف خطوة.',
      'One statement: a fact the book states, or a popular myth? A right answer is worth two steps, and a hint costs one.'),
  },
  num: {
    icon: '🔢', tone: 'book',
    title: L('كم الرقم؟', 'What’s the number?'),
    how: L('لا خيارات هنا. الأقرب إلى الرقم الصحيح يتقدّم خطوتين، ومن أصابه تمامًا ثلاثًا. والنطاق تلميحٌ بخطوة.',
      'No options here. Whoever is closest moves two steps; an exact hit, three. A range is a hint, for a step.'),
  },
  who: {
    icon: '👤', tone: 'book',
    title: L('من هو؟', 'Who is it?'),
    how: L('ثلاثة تلميحات تظهر تباعًا — ولك أن تكشف التالي قبل وقته. كلّما أجبتَ أبكر ربحتَ أكثر: ٣ ثم ٢ ثم ١.',
      'Three clues, one after another — and you can open the next one early. The earlier you answer the more it is worth: 3, then 2, then 1.'),
  },
  graph: {
    icon: '📈', tone: 'book',
    title: L('اقرأ الرسم', 'Read the chart'),
    how: L('رسمٌ من الكتاب وسؤالٌ عنه. الإجابة الصحيحة بخطوتين، والتلميح (حذف إجابتين) يكلّف خطوة.',
      'A chart from the book, and a question about it. A right answer is worth two steps, and a hint (two answers removed) costs one.'),
  },
  bluff: {
    icon: '🎭', tone: 'bluff',
    title: L('كذبة بيضاء', 'White lie'),
    how: L('اكتب إجابةً كاذبة تبدو صحيحة. ثم تظهر الأكاذيب مع الحقيقة: خطوتان إن وجدتَ الحقيقة (والتلميح يحذف كذبةً بخطوة)، وخطوةٌ عن كلّ من صدّق كذبتك.',
      'Write a false answer that sounds true. Then the lies appear beside the truth: two steps for finding the truth (a hint strikes out a lie, for a step), and one for everyone who believes your lie.'),
  },
  dare: {
    icon: '🎤', tone: 'dare',
    title: L('تحدٍّ', 'Dare'),
    how: L('صاحب الدور يؤدّي التحدّي بصوته في المكالمة، والبقيّة يحكمون من هواتفهم. إن نجح تقدّم خطوتين.',
      'Whoever’s turn it is performs the dare out loud on the call; everyone else judges from their phone. A pass is worth two steps.'),
  },
  pic: {
    icon: '🖼️', tone: 'pic',
    title: L('خمّن الصورة', 'Picture this'),
    how: L('صورةٌ من كتبنا: شخص، أو حدث، أو لوحة. سمِّها، أو قل من أيّ كتابٍ هي. التلميح والخيارات متاحة — لكن كلّ عونٍ يكلّف خطوة.',
      'A picture from our books — a person, an event or a painting. Name it, or say which book it is from. Hints and options are there, but every bit of help costs a step.'),
  },
  face: {
    icon: '🙂', tone: 'book',
    title: L('من هذا؟', 'Who is this?'),
    how: L('وجهٌ من الكتاب، وأربعة أسماء. الإجابة الصحيحة بخطوتين، والتلميح يكلّف خطوة. وأسرع المصيبين يأخذ خطوةً إضافية.',
      'A face from the book, and four names. A right answer is worth two steps, and a hint costs one. The fastest right answer earns an extra step.'),
  },
  luck: { icon: '🍀', tone: 'luck', title: L('حظّ', 'Chance'), how: null },
  mini: { icon: '🧪', tone: 'lab', title: L('المختبر', 'The Lab'), how: null },
}

export const MINI = {
  sheep: {
    icon: '🐑', title: L('عُدَّ الخراف', 'Count the sheep'),
    how: L('ستعبر الحقلَ خرافٌ… وبعض الذئاب. عُدَّ الخراف وحدها، ثم اكتب العدد. الأقرب يفوز.',
      'Sheep will cross the field… and a few wolves. Count only the sheep, then enter the number. Closest wins.'),
  },
  reflex: {
    icon: '⚡', title: L('اختبار اليقظة', 'The vigilance test'),
    how: L('انتظر… وحين تخضرّ الشاشة انقر بأسرع ما تستطيع. أربع محاولات، والنقر قبل الإشارة يكلّفك.',
      'Wait… and the moment the screen turns green, tap as fast as you can. Four rounds — and a tap before the signal costs you.'),
  },
  memory: {
    icon: '🧠', title: L('ذاكرة الأرقام', 'The digits'),
    how: L('ثمانية أرقام تظهر واحدًا واحدًا. احفظها، ثم اكتبها بالترتيب نفسه.',
      'Eight digits appear one at a time. Remember them, then type them back in the same order.'),
  },
  stroop: {
    icon: '🎨', title: L('لون الحبر', 'The colour of the ink'),
    how: L('تظهر كلمةٌ هي اسم لون، مكتوبةٌ بحبرٍ من لونٍ آخر. انقر لون الحبر، لا ما تقوله الكلمة.',
      'A colour’s name appears, printed in another colour of ink. Tap the colour of the INK — not what the word says.'),
  },
  search: {
    icon: '🔍', title: L('السهم الوحيد', 'The one arrow'),
    how: L('بين السهام سهمٌ واحد يشير إلى الأعلى. جِده وانقره، ثماني مرّات، بأسرع ما تستطيع.',
      'Among the arrows, exactly one points up. Find it and tap it — eight times, as fast as you can.'),
  },
  stag: {
    icon: '🦌', title: L('صيد الأيّل', 'The stag hunt'),
    how: L('حكاية روسو: الأيّل لا يُصاد إلا إذا اتّجه إليه الصيّادون كلّهم. إن فعلتم تقدّم كلٌّ منكم ٣ خطوات. ومن اختار الأرنب ضَمِن خطوةً لنفسه… وأفلت الأيّل من الجميع.',
      'Rousseau’s tale: the stag is caught only if EVERY hunter goes for it. If you all do, each of you moves 3 steps. Whoever takes the hare is sure of 1 step — and the stag gets away from everyone.'),
  },
  auction: {
    icon: '🔨', title: L('مزاد دروع أخيل', 'The auction of Achilles’ armour'),
    how: L('عند الإغريق نال أوديسيوس دروعَ أخيل بالحجّة لا بالمال. مجتمعُ السوق يبيعها في مزاد: اعرض سرًّا من ٠ إلى ٤ خطوات. أعلى عرضٍ لم يعرضه غيرك يربح الدروع (+٥) ويدفع ما عرض.',
      'The Greeks gave Achilles’ armour to the better argument, not the bigger purse. A market society auctions it: secretly bid 0 to 4 steps. The highest bid that nobody else made wins the armour (+5) and pays what it bid.'),
  },
}

/* The head of a round's card: its mark, its name, and whose book it is from. */
export function KindHead({ ch, decks, books }) {
  const { t } = useApp()
  const kind = KIND[ch.k]
  const mini = ch.k === 'mini' ? MINI[ch.id] : null
  const book = ch.book ? books.find((b) => b.id === ch.book) : null
  return (
    <div className="gm-kind">
      <span className="gm-kind-mark"><Icon name={mini?.icon || (book && ch.k !== 'bluff' ? decks.byBook[ch.book].icon : kind.icon)} /></span>
      <span className="gm-kind-text">
        <strong>{t(mini ? mini.title : kind.title)}</strong>
        {(book || mini) && <small>{mini ? t(kind.title) : t(book.title)}</small>}
      </span>
    </div>
  )
}

/* Copy text wherever a browser will let us: the clipboard API, then the old
   execCommand, and failing both, false — the caller shows the text to copy by
   hand. (The first fails on insecure origins and unfocused documents; the
   second in some in-app browsers. Same chain as components/ResultCard.jsx.) */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch { /* fall through */ }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

/* A room code is shown in two groups of three: easier to read out on a call. */
export const prettyCode = (code) => `${String(code).slice(0, 3)} ${String(code).slice(3)}`
