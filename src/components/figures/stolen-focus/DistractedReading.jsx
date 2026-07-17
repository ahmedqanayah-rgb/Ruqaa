import { useState, useEffect, useRef } from 'react'
import { useApp } from '../../../context/AppContext.jsx'
import FigureFrame from '../FigureFrame.jsx'
import RichText from '../../RichText.jsx'

const L = (ar, en) => ({ ar, en })

/* Fake notifications that pop over the panel during the distracted round.
   They are deliberately tempting — and clickable. Clicking one counts as
   being "lured", exactly like real life. */
const NOTIFS = [
  L('🔔 ٣ رسائل جديدة', '🔔 3 new messages'),
  L('📧 ردٌّ عاجل مطلوب', '📧 Urgent reply needed'),
  L('❤️ أعجب ١٢ شخصاً بمنشورك', '❤️ 12 people liked your post'),
  L('🛒 التخفيض ينتهي خلال ١٠ دقائق', '🛒 Sale ends in 10 minutes'),
  L('📱 البطارية ٢٠٪', '📱 Battery at 20%'),
  L('💬 بدأ أحدهم يكتب…', '💬 Someone is typing…'),
  L('🎁 خصمٌ خاصّ لك وحدك — افتح الآن', '🎁 A special discount just for you — open now'),
  L('📸 ذكرى من مثل هذا اليوم قبل سنة', '📸 A memory from this day last year'),
]

/* Two short passages, each with three comprehension questions. */
const ROUNDS = [
  {
    key: 'distract',
    passage: L(
      'للأخطبوط ثلاثة قلوب ودمٌ أزرق. يضخّ قلبان الدمَ إلى الخياشيم، بينما يضخّه الثالث إلى بقيّة الجسم. ولون الدم أزرق لأنه يعتمد على النحاس لا الحديد في حمل الأكسجين. وللأخطبوط أيضاً تجمّعٌ عصبيّ في كلّ ذراعٍ من أذرعه الثماني، فتستطيع كلّ ذراعٍ أن تتذوّق وتتحرّك بمفردها.',
      'The octopus has three hearts and blue blood. Two hearts pump blood to the gills, while the third pumps it to the rest of the body. The blood is blue because it relies on copper, not iron, to carry oxygen. The octopus also has a cluster of neurons in each of its eight arms, so each arm can taste and move on its own.'
    ),
    questions: [
      { q: L('كم قلباً للأخطبوط؟', 'How many hearts does the octopus have?'),
        opts: [L('قلبان', 'Two'), L('ثلاثة', 'Three'), L('ثمانية', 'Eight')], correct: 1 },
      { q: L('لماذا دمه أزرق؟', 'Why is its blood blue?'),
        opts: [L('يعتمد على النحاس', 'It relies on copper'), L('يعتمد على الحديد', 'It relies on iron'), L('بسبب الخياشيم', 'Because of the gills')], correct: 0 },
      { q: L('ما الذي تستطيع كلّ ذراعٍ فعله وحدها؟', 'What can each arm do on its own?'),
        opts: [L('الرؤية', 'See'), L('التذوّق والحركة', 'Taste and move'), L('ضخّ الدم', 'Pump blood')], correct: 1 },
    ],
  },
  {
    key: 'focus',
    passage: L(
      'تُنتج النحلة الواحدة نحو جزءٍ من اثني عشر جزءاً من ملعقةٍ صغيرة من العسل طوال حياتها. ولصنع برطمانٍ واحد، يطير نحل الخليّة مجتمعاً مسافةً أطول من ضعف محيط الأرض. وتدلّ النحلات بعضها على اتجاه الأزهار عبر «رقصة الاهتزاز»: زاوية الرقصة تشير نحو الشمس، وطولها يخبر البقيّة كم يبعد المكان.',
      'A single honeybee produces only about a twelfth of a teaspoon of honey in its whole life. To make one jar, a hive’s bees together fly farther than twice around the Earth. Bees tell one another the direction of flowers through a “waggle dance”: the angle of the dance points toward the sun, and its length tells the others how far away the place is.'
    ),
    questions: [
      { q: L('كم عسلاً تُنتج النحلة الواحدة في حياتها؟', 'How much honey does one bee make in its life?'),
        opts: [L('ملعقة كاملة', 'A full spoon'), L('نحو جزء من اثني عشر من ملعقة صغيرة', 'About a twelfth of a teaspoon'), L('برطمان', 'A jar')], correct: 1 },
      { q: L('ماذا تُسمّى طريقة تواصلها؟', 'What is their communication called?'),
        opts: [L('رقصة الاهتزاز', 'The waggle dance'), L('رقصة الشمس', 'The sun dance'), L('طنين الخليّة', 'The hive hum')], correct: 0 },
      { q: L('ماذا يخبر طول الرقصة؟', 'What does the dance’s length tell?'),
        opts: [L('لون الأزهار', 'The flowers’ colour'), L('كم يبعد المكان', 'How far away the place is'), L('عدد النحل', 'The number of bees')], correct: 1 },
    ],
  },
]

export function SfDistractedReading({ embedded = false, onDone }) {
  const { t } = useApp()
  const [stage, setStage] = useState('intro') // intro | read | quiz | done
  const [round, setRound] = useState(0)       // 0 distracted, 1 focused
  const [picks, setPicks] = useState({})
  const [scores, setScores] = useState([])
  const [toasts, setToasts] = useState([])
  const [lures, setLures] = useState(0)
  const readStart = useRef(0)
  const times = useRef([0, 0]) // reading seconds per round

  const data = ROUNDS[round]
  const isDistract = data.key === 'distract'

  useEffect(() => {
    if (stage !== 'read' || !isDistract) return
    let n = 0
    const id = setInterval(() => {
      const msg = NOTIFS[n % NOTIFS.length]; n += 1
      const tid = `${Date.now()}-${n}`
      setToasts((ts) => [...ts.slice(-1), { id: tid, msg }])
      setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== tid)), 3000)
    }, 1500)
    return () => { clearInterval(id); setToasts([]) }
  }, [stage, isDistract])

  const beginRead = () => { readStart.current = performance.now(); setStage('read') }
  const endRead = () => {
    times.current[round] = Math.round((performance.now() - readStart.current) / 1000)
    setStage('quiz'); setToasts([])
  }
  const lure = (id) => {
    setLures((n) => n + 1)
    setToasts((ts) => ts.filter((x) => x.id !== id))
  }

  const pick = (qi, oi) => setPicks((p) => ({ ...p, [qi]: oi }))
  const allAnswered = data.questions.every((_, qi) => picks[qi] != null)

  const submitQuiz = () => {
    const score = data.questions.reduce((s, q, qi) => s + (picks[qi] === q.correct ? 1 : 0), 0)
    const ns = [...scores]; ns[round] = score; setScores(ns)
    if (round === 0) { setRound(1); setStage('intro'); setPicks({}) }
    else {
      setStage('done')
      onDone?.({ distract: ns[0], focus: ns[1], distractTime: times.current[0], focusTime: times.current[1], lures })
    }
  }
  const reset = () => { setRound(0); setStage('intro'); setPicks({}); setScores([]); setToasts([]); setLures(0); times.current = [0, 0] }

  const body = (
    <div className="sf-reading">
      {stage === 'intro' && (
        <div className="sf-read-intro">
          <p>{isDistract
            ? t(L('الجولة الأولى: اقرأ الفقرة بينما تظهر إشعاراتٌ مُغرية — كما في يومٍ عاديّ. الإشعارات قابلةٌ للنقر… حاول ألّا تنقرها! ثم أجب عن ٣ أسئلة.',
                  'Round one: read the passage while tempting notifications pop up — just like an ordinary day. The notifications are clickable… try not to click them! Then answer 3 questions.'))
            : t(L('الجولة الثانية: اقرأ فقرةً جديدة في هدوءٍ تامّ، بلا مقاطعات. ثم أجب عن ٣ أسئلة، وقارن نتيجتك وزمنك.',
                  'Round two: read a new passage in complete calm, with no interruptions. Then answer 3 questions and compare your score and time.'))}</p>
          <button className="btn primary" onClick={beginRead}>
            {isDistract ? t(L('ابدأ القراءة المشتّتة', 'Start the distracted read')) : t(L('ابدأ القراءة الهادئة', 'Start the calm read'))}
          </button>
        </div>
      )}

      {stage === 'read' && (
        <div className={`sf-read-panel ${isDistract ? 'distract' : ''}`}>
          {isDistract && (
            <div className="sf-toasts">
              {toasts.map((x) => (
                <button key={x.id} className="sf-toast" onClick={() => lure(x.id)}>{t(x.msg)}</button>
              ))}
            </div>
          )}
          <p className="sf-passage">{t(data.passage)}</p>
          {isDistract && lures > 0 && (
            <p className="sf-lure-note">🪤 {t(L(`اصطادك الإشعار ${lures} مرّة — هكذا تتبخّر الدقائق`, `The notifications caught you ${lures} time(s) — this is how the minutes evaporate`))}</p>
          )}
          <button className="btn primary sf-read-done" onClick={endRead}>
            {t(L('انتهيت — إلى الأسئلة', 'Done — to the questions'))}
          </button>
        </div>
      )}

      {stage === 'quiz' && (
        <div className="sf-read-quiz">
          {data.questions.map((q, qi) => (
            <div key={qi} className="sf-q">
              <p className="sf-q-text"><b>{t({ ar: `${qi + 1}.`, en: `${qi + 1}.` })}</b> {t(q.q)}</p>
              <div className="sf-q-opts">
                {q.opts.map((o, oi) => (
                  <button key={oi} className={`sf-q-opt ${picks[qi] === oi ? 'picked' : ''}`}
                    onClick={() => pick(qi, oi)}>{t(o)}</button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn primary" disabled={!allAnswered} onClick={submitQuiz}>
            {t(L('احسب نتيجة هذه الجولة', 'Score this round'))}
          </button>
        </div>
      )}

      {stage === 'done' && (
        <div className="sf-read-result">
          <div className="sf-read-scores">
            <div className="sf-read-score distract">
              <span className="sf-read-score-n">{t({ ar: `${scores[0]}/3`, en: `${scores[0]}/3` })}</span>
              <span className="sf-read-score-lbl">{t(L('مع التشتيت', 'With distraction'))}</span>
            </div>
            <div className="sf-read-score focus">
              <span className="sf-read-score-n">{t({ ar: `${scores[1]}/3`, en: `${scores[1]}/3` })}</span>
              <span className="sf-read-score-lbl">{t(L('بلا تشتيت', 'Distraction-free'))}</span>
            </div>
          </div>
          <div className="sf-read-meta">
            <span>⏱ {t(L(`زمن القراءة: ${times.current[0]} ث مع التشتيت · ${times.current[1]} ث بدونه`, `Reading time: ${times.current[0]}s distracted · ${times.current[1]}s calm`))}</span>
            <span>🪤 {t(L(`إشعارات نقرتها: ${lures}`, `Notifications you clicked: ${lures}`))}</span>
          </div>
          <div className="callout note">
            <span className="callout-icon" aria-hidden>💡</span>
            <div><RichText as="p" value={scores[1] > scores[0]
              ? L('فهمتَ أكثر حين قرأت في هدوء — تماماً كما يجادل الكتاب: المقاطعة تسرق الفهم لا الوقت فقط.',
                  'You understood more when you read calmly — exactly the book’s argument: interruption steals comprehension, not just time.')
              : L('النتيجة تقريبية في تجربةٍ قصيرة كهذه، لكنّ الأبحاث واضحة: القراءة المشتّتة تُضعف الفهم والتذكّر في المتوسّط.',
                  'Results vary in a short demo like this, but the research is clear: distracted reading weakens comprehension and recall on average.')} /></div>
          </div>
          <button className="btn" onClick={reset}>↺ {t(L('أعِد التجربة', 'Try again'))}</button>
        </div>
      )}
    </div>
  )

  if (embedded) return body
  return (
    <FigureFrame number={5}
      title={L('القراءة وسط التشتيت', 'Reading amid distraction')}
      caption={L('جرّبها بنفسك: اقرأ فقرةً وسط إشعاراتٍ مُغرية ثم أجب، ثم اقرأ أخرى في هدوءٍ وقارن فهمك وزمنك. أثر التشتيت يظهر فوراً.',
                 'Try it yourself: read a passage amid tempting notifications and answer, then read another in calm and compare your comprehension and time. Distraction’s effect shows up at once.')}>
      {body}
    </FigureFrame>
  )
}
