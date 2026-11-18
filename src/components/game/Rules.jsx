import { useApp } from '../../context/AppContext.jsx'
import { L } from './parts.jsx'

/*
 * The rules, short enough to read aloud once at the start of a session. They
 * describe what lib/game/engine.js actually does — change one, change both.
 */
const RULES = [
  L('كلٌّ يفتح اللعبة على هاتفه ويدخل الغرفة برمزها المكوّن من ستة أرقام. اللوح وكلّ ما يجري يظهر على كلّ هاتف — لا حاجة لمشاركة الشاشة، والمكالمة للكلام والضحك.',
    'Everyone opens the game on their own phone and joins the room with its six-digit code. The board and everything on it is on every phone — no screen sharing; the call is for talking and laughing.'),
  L('الطريق يمرّ بلوحٍ لكلّ كتاب: وادي النوم، ثم مدينة التشتّت، ثم سوق الجزيرة. حين يبلغ أحدٌ أعلى اللوح ينزلق اللوح إلى الذي يليه.',
    'The road runs through one board for each book: the valley of sleep, then the city of distraction, then the island market. When someone reaches the top of a board, the view slides on to the next.'),
  L('في دورك ترمي النرد وتتحرّك. والخانة التي تقف عليها تفتح جولةً يلعبها الجميع في الوقت نفسه، كلٌّ على هاتفه.',
    'On your turn you roll and move. The square you land on opens a round that EVERYONE plays at the same moment, each on their own phone.'),
  L('النقاط هنا خطوات: الإجابة الصحيحة تقدّمك خطوتين. ولكلّ سؤالٍ تلميحٌ تشتريه بخطوة. وأسرع إجابةٍ صحيحة تأخذ خطوةً إضافية، ولصاحب الخانة خطوةٌ أخرى إن أصاب.',
    'Points are steps: a right answer moves your token two. Every question has a hint, which costs a step. The fastest right answer earns an extra step, and the player whose square it is gets one more if they get it right.'),
  L('الجولات: أسئلة من الكتب، وخرافة أم حقيقة، وأرقام (الأقرب يفوز)، ومن هو؟ (كلّما احتجتَ تلميحاتٍ أقلّ ربحت أكثر)، ومن هذا؟ (وجهٌ وأربعة أسماء)، ورسوم بيانية، وخمّن الصورة (اكتب الاسم بنفسك، أو اشترِ تلميحاً أو الخيارات بخطوة)، وكذبة بيضاء، والمختبر، وتحدّيات يحكم فيها الجميع، وبطاقات حظّ.',
    'Rounds: questions from the books, myth or fact, numbers (closest wins), who is it? (the fewer clues you need, the more you win), who is this? (a face and four names), charts, picture this (type the name yourself, or buy a hint or the options for a step), a white lie, the Lab, dares the room judges, and chance cards.'),
  L('لا عجلة، إلا إن اختار المضيف جولاتٍ بوقت: الجولة تنتظر الجميع، وبعدها شرحٌ قصير يبقى حتى يقرأه الجميع ويضغطوا «التالي».',
    'No rush, unless the host chose rounds against the clock: a round waits for everyone, and after it a short explanation stays up until everyone has read it and tapped “next”.'),
  L('أوّل من يصل إلى آخر الطريق يُنهي اللعبة ويفوز.',
    'The first to reach the end of the road ends the game, and wins.'),
]

export default function Rules() {
  const { t } = useApp()
  return (
    <ol className="gm-rules">
      {RULES.map((rule, i) => <li key={i}>{t(rule)}</li>)}
    </ol>
  )
}
