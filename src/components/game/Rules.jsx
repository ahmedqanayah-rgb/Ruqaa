import { useApp } from '../../context/AppContext.jsx'
import { L } from './parts.jsx'

/*
 * The rules, short enough to read aloud once at the start of a session. They
 * describe what lib/game/engine.js actually does — change one, change both.
 */
const RULES = [
  L('كلٌّ يفتح اللعبة على هاتفه ويدخل الغرفة برمزها المكوّن من ستة أرقام. اللوح وكلّ ما يجري يظهر على كلّ هاتف — لا حاجة لمشاركة الشاشة، والمكالمة للكلام والضحك.',
    'Everyone opens the game on their own phone and joins the room with its six-digit code. The board and everything on it is on every phone — no screen sharing; the call is for talking and laughing.'),
  L('في دورك ترمي النرد وتتحرّك. والخانة التي تقف عليها تفتح جولةً يلعبها الجميع في الوقت نفسه، كلٌّ على هاتفه.',
    'On your turn you roll and move. The square you land on opens a round that EVERYONE plays at the same moment, each on their own phone.'),
  L('النقاط هنا خطوات: كلّ إجابةٍ صحيحة تقدّمك على اللوح. وأسرع إجابةٍ صحيحة تأخذ خطوةً إضافية، ولصاحب الخانة خطوةٌ أخرى إن أصاب.',
    'Points are steps: every right answer moves your token. The fastest right answer earns an extra step, and the player whose square it is gets one more if they get it right.'),
  L('الجولات: أسئلة من الكتب، وخرافة أم حقيقة، وأرقام (الأقرب يفوز)، ومن هو؟ (كلّما عرفتَ أبكر ربحت أكثر)، ورسوم بيانية، وكذبة بيضاء، والمختبر، وتحدّيات يحكم فيها الجميع، وبطاقات حظّ.',
    'Rounds: questions from the books, myth or fact, numbers (closest wins), who is it? (the sooner you know, the more you win), charts, a white lie, the Lab, dares the room judges, and chance cards.'),
  L('أوّل من يصل إلى منارة الكتب في آخر الطريق يُنهي اللعبة ويفوز.',
    'The first to reach the lighthouse of books at the end of the road ends the game, and wins.'),
]

export default function Rules() {
  const { t } = useApp()
  return (
    <ol className="gm-rules">
      {RULES.map((rule, i) => <li key={i}>{t(rule)}</li>)}
    </ol>
  )
}
