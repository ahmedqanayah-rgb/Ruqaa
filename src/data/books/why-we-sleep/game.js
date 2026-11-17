/* ============================================================================
   «رُقعة النرد» — this book's rounds for the club's board game
   (pages/Game.jsx finds every books/<slug>/game.js by glob; nothing registers it).
   ----------------------------------------------------------------------------
   HOW A GOOD ROUND IS WRITTEN — the house rules for every book's deck. They
   come from how quiz writers and party games do it (a question is only as good
   as its wrong answers; Wits & Wagers and Fibbage reward a good guess over
   recall), and from the club's own verdict on the first deck: "so obvious".

   1. **The right answer is a fact this site already states** — in a chapter, a
      study, a person's card or the myth-or-fact deck — and `why` says it the
      way the site does. Nothing here is new research.
   2. **Every wrong answer must be one a half-informed player could believe.**
      Same kind, same scale, same length as the right one; the popular myth is
      the best distractor there is ("sugar", "screens", "gold"). No throwaway
      jokes among the options: a joke option is a free elimination.
   3. **The fun lives in the setup and in `why`** — the absurd experiment, the
      twist, the line read aloud after the answer — not in silly options.
   4. **No round may need the book open.** One fact, one sentence of setup.
   5. The FIRST option is always the right one (the game deals them in a
      seeded order, the same on every phone). Four options, always.

   THE KINDS (lib/game/decks.js checks every shape; scripts/sim-game.mjs runs it):
     mcq    { id, q, opts: [right, …3], why }
     num    { id, q, a, unit?, dot?, show?, why }   closest guess wins
     who    { id, name, clues: [3, vague → giveaway], why, img? }   MAIN people only
     graph  { id, q, chart?, opts: [text | { chart }], why, answerChart? }
            charts are data for components/game/MiniChart.jsx
     bluff  { id, q (with ____), truth, alt?: [also counts as true], decoys, why }
            players type lies that fit the blank, then hunt for the truth;
            `decoys` are the house's lies when there are few players
     pic    { id, kind: 'name', img, name, aliases, opts: [right, …3], hints, why, q?, view? }
            { id, kind: 'book', img, hints, why, q? }
            a picture already on the site; "name" is answered by TYPING
            (lib/game/match.js), with hints and the options for sale at a step
            each; list every acceptable short form in `aliases`
   The book's myth-or-fact deck becomes its «خرافة أم حقيقة؟» rounds.
   ========================================================================== */
import { curve, poly } from '../../../lib/game/chart.js'

const L = (ar, en) => ({ ar, en })
const mcq = (id, q, opts, why) => ({ id, q, opts, why })
const num = (id, q, a, extra, why) => ({ id, q, a, ...extra, why })
const who = (id, name, clues, why, img) => ({ id, name, clues, why, ...(img ? { img } : {}) })
const bluff = (id, q, truth, alt, decoys, why) => ({ id, q, truth, alt, decoys, why })

/* «خمّن الصورة» — pictures already on this site. `name` rounds are answered by
   typing (lib/game/match.js forgives typos and spellings; every acceptable short
   form goes in `aliases`, and decks.js checks no wrong option would pass);
   `book` rounds ask which of the club's books the picture is from. `view`
   zooms past a printed title or margin. */
const picName = (id, img, name, aliases, wrong, hints, why, extra = {}) => ({ id, kind: 'name', img, name, aliases, opts: [name, ...wrong], hints, why, ...extra })
const picBook = (id, img, hints, why, extra = {}) => ({ id, kind: 'book', img, hints, why, ...extra })
const WHO = L('من هذا؟', 'Who is this?')

/* The mark this book's squares wear on the board (a key into Icon.jsx). */
export const gameIcon = '🌙'

/* ------------------------------- questions ------------------------------- */
const mcqs = [
  mcq('ws-spiders',
    L('أعطت «ناسا» العناكب عقاقير مختلفة ثم راقبتها تنسج شباكها. أيّ عنكبوتٍ نسج أكثر الشباك تخبّطاً على الإطلاق؟',
      'NASA gave spiders different drugs, then watched them spin. Which spider built the most deranged web of all?'),
    [L('عنكبوت الكافيين', 'The one on caffeine'), L('عنكبوت LSD', 'The one on LSD'), L('عنكبوت الماريجوانا', 'The one on marijuana'), L('عنكبوت الأمفيتامين', 'The one on amphetamine')],
    L('الكافيين — وشبكته أسوأ حتى من شبكة LSD. ويلاحظ ووكر أنه المخدّر الإدماني الوحيد الذي نقدّمه لأطفالنا دون أن يرفّ لنا جفن.',
      'Caffeine — a worse web even than LSD’s. Walker notes it is the only addictive drug we hand to children without a second thought.')),

  mcq('ws-dolphin',
    L('كيف ينام الدلفين دون أن يغرق؟', 'How does a dolphin sleep without drowning?'),
    [L('بنصف دماغه في كلّ مرّة، والنصف الآخر يقظ', 'With half its brain at a time; the other half stays awake'),
      L('بغفواتٍ من ثوانٍ، يصعد بينها ليتنفّس', 'In naps of a few seconds, surfacing to breathe between them'),
      L('يحبس أنفاسه ساعاتٍ وينام في القاع', 'It holds its breath for hours and sleeps on the seabed'),
      L('لا ينام وهو يسبح أبداً، بل يعوّض حين يهدأ البحر', 'It never sleeps while swimming; it catches up when the sea is calm')],
    L('الدلافين والبطّ تنام بنصف دماغٍ في كلّ مرّة. وأنت تفعل شيئاً من ذلك: في ليلتك الأولى في فندق ينام نصف دماغك أخفّ من الآخر، كحارسٍ مناوب.',
      'Dolphins and ducks sleep one hemisphere at a time. You do a little of it too: on your first night in a hotel, half your brain sleeps more lightly, on guard.')),

  mcq('ws-aetna',
    L('وجدت شركة التأمين «إتنا» طريقةً لتجعل موظّفيها ينامون أكثر. ماذا فعلت؟',
      'The insurer Aetna found a way to make its staff sleep more. What did it do?'),
    [L('دفعت لهم مكافأةً عن كلّ ليلة نوماً جيّداً', 'Paid them a bonus for every night they slept well'),
      L('منعت رسائل العمل بعد الثامنة مساءً', 'Banned work emails after 8 pm'),
      L('وضعت غرفاً للقيلولة في كلّ مكاتبها', 'Put nap rooms in all its offices'),
      L('أعطتهم يوم الجمعة إجازة', 'Gave them Fridays off')],
    L('خمسة وعشرون دولاراً عن الليلة. النوم عندها استثمارٌ في الإنتاج، لا خصمٌ منه.',
      '$25 a night. Sleep, for Aetna, was an investment in output, not a cost to it.')),

  mcq('ws-aliens',
    L('لعلم النوم تفسيرٌ رصين لمن يقسم أن كائناتٍ فضائية زارته في الليل وشلّت حركته. ما هو؟',
      'Sleep science has a sober explanation for people who swear aliens visited them at night and froze them in place. What is it?'),
    [L('شلل النوم: يستيقظ العقل والجسد ما زال مقيّداً بنوم الأحلام', 'Sleep paralysis: the mind wakes while the body is still locked in dream sleep'),
      L('الذعر الليلي الذي يأتي من النوم العميق', 'Night terrors, which come out of deep sleep'),
      L('السير النومي الذي لا يتذكّره صاحبه', 'Sleepwalking that the sleeper doesn’t remember'),
      L('هلوساتٌ من فرط هرمون الميلاتونين', 'Hallucinations from too much melatonin')],
    L('شلل النوم: تستيقظ عاجزاً عن الحركة، مع هلوسةٍ حيّة وخوفٍ شديد. يمرّ به نحو واحدٍ من كلّ أربعة أشخاصٍ أصحّاء — والفضائيون أبرياء.',
      'Sleep paralysis: you wake unable to move, with vivid hallucination and intense fear. About one healthy person in four has it — the aliens are innocent.')),

  mcq('ws-made-in-sleep',
    L('ما الذي يجمع الجدول الدوري، ولحن أغنيةٍ للبيتلز، ورواية «فرانكنشتاين»؟',
      'What do the periodic table, a Beatles melody and Frankenstein have in common?'),
    [L('جاءت كلّها إلى أصحابها في النوم', 'All came to their makers in sleep'),
      L('أُنجزت كلّها في ليلةٍ واحدة بلا نوم', 'All were finished in one sleepless night'),
      L('رُفضت كلّها أوّل مرّة', 'All were turned down the first time'),
      L('وُلدت كلّها في صيفٍ ماطر واحد', 'All were born in the same rainy summer')],
    L('حلم مندلييف بجدوله (١٨٦٩)، واستيقظ مكارتني ولحنه في رأسه، ورأت ماري شيلي مخلوقها بين النوم واليقظة. نوم الأحلام يصل بين أفكارٍ متباعدة — ولهذا «ننام على الفكرة».',
      'Mendeleev dreamed his table (1869), McCartney woke with his melody, Mary Shelley saw her creature between sleep and waking. Dream sleep links distant ideas — which is why we “sleep on it”.')),

  mcq('ws-clocks',
    L('في صباح الربيع الذي تتقدّم فيه الساعة ونخسر ساعة نوم، ما الذي يرتفع؟',
      'On the spring morning the clocks go forward and we lose an hour of sleep, what goes up?'),
    [L('النوبات القلبية', 'Heart attacks'),
      L('لا شيء يُقاس — إنها ساعةٌ واحدة', 'Nothing measurable — it’s one hour'),
      L('الإنتاجية، لأن الناس يعوّضون التأخير', 'Productivity, as people make up for lost time'),
      L('مبيعات القهوة وحدها', 'Only coffee sales')],
    L('ترتفع النوبات القلبية وحوادث الطرق بعد خسارة الربيع، وتنخفض بعد مكسب الخريف. ساعةٌ واحدة!',
      'Heart attacks and road crashes rise after the spring loss, and fall after the autumn gain. One hour!')),

  mcq('ws-melatonin',
    L('فحص باحثون حبوب الميلاتونين ليقارنوا ما فيها بما يقوله الملصق. ماذا وجدوا؟',
      'Researchers tested melatonin pills against what their labels said. What did they find?'),
    [L('من أقلّ بـ٨٣٪ إلى أكثر بـ٤٧٨٪ ممّا على الملصق', 'Anything from 83% less to 478% more than the label'),
      L('مطابقةً للملصق تقريباً، كأيّ دواء', 'About what the label says, like any medicine'),
      L('نصف الجرعة المكتوبة في الغالب', 'Usually half the dose on the label'),
      L('ضعف الجرعة دائماً، احتياطاً', 'Always double the dose, to be safe')],
    L('ما بين ناقصةٍ بـ٨٣٪ وزائدةٍ بـ٤٧٨٪ — وفي بعضها سيروتونين لم يطلبه أحد.',
      'Anywhere from 83% under to 478% over the label — and some contained serotonin nobody asked for.')),

  mcq('ws-teens',
    L('لماذا لا يستطيع المراهق أن ينام في العاشرة مساءً؟', 'Why can’t a teenager fall asleep at ten at night?'),
    [L('لأن ساعته البيولوجية تتأخّر فعلاً نحو ثلاث ساعات', 'Because their body clock really runs about three hours later'),
      L('بسبب الشاشات: أبعِد الهاتف فينام في العاشرة', 'Screens: take the phone away and they’d sleep at ten'),
      L('لأنه يحتاج نوماً أقلّ من الكبار', 'Because they need less sleep than adults'),
      L('لأن هرمونات النموّ تُبقيه متيقّظاً ليلاً', 'Because growth hormones keep them alert at night')],
    L('تحوّلٌ عصبيٌّ حقيقيّ، لا كسل. وإيقاظ مراهقٍ في السابعة كإيقاظ بالغٍ في الرابعة أو الخامسة فجراً.',
      'A real neurological shift, not laziness. Waking a teenager at seven is like waking an adult at four or five in the morning.')),

  mcq('ws-short-sleepers',
    L('قلّةٌ من الناس يكفيها نومٌ قليل فعلاً، بفضل طفرةٍ جينية. كم هم نادرون؟',
      'A few people really do fine on little sleep, thanks to a gene. How rare are they?'),
    [L('أقلّ من ١٪ — احتمال أن تصيبك صاعقة أكبر', 'Under 1% — you’re likelier to be struck by lightning'),
      L('نحو واحدٍ من كلّ عشرة', 'About one in ten'),
      L('نحو ربع البالغين', 'About a quarter of adults'),
      L('نحو نصف المديرين التنفيذيين', 'About half of all CEOs')],
    L('أقلّ من ١٪. وأغلب من يظنّون أنهم منهم مخطئون: أداؤهم متراجع، وقد فقدوا القدرة على ملاحظة ذلك.',
      'Under 1%. And most people who think they are one are wrong: their performance has slipped, and they have lost the ability to notice.')),

  mcq('ws-atonia',
    L('لماذا لا تنهض من سريرك وتمثّل أحلامك؟', 'Why don’t you get out of bed and act out your dreams?'),
    [L('لأن دماغك يشلّ عضلاتك أثناء نوم الأحلام', 'Your brain paralyses your muscles during dream sleep'),
      L('لأن الأحلام تحدث في النوم العميق والجسد ثقيلٌ جدّاً', 'Dreams happen in deep sleep, when the body is too heavy to move'),
      L('لأن الدماغ الحالم لا يرسل أوامر حركة أصلاً', 'The dreaming brain sends no movement commands at all'),
      L('بل تفعل قليلاً: هذا هو التقلّب في السرير', 'You do, a little: that’s what tossing and turning is')],
    L('في نوم حركة العين السريعة (REM) تُشلّ كلّ عضلةٍ إرادية؛ لا تعمل إلا العينان والتنفّس. والدماغ يرسل الأوامر فعلاً — لكنّ الشلل يحجبها.',
      'In REM sleep every voluntary muscle is paralysed; only the eyes and breathing keep working. The brain does send the commands — the paralysis blocks them.')),

  mcq('ws-unborn',
    L('من يقضي في نوم الأحلام وقتاً أطول من أيّ أحدٍ في هذه المكالمة؟',
      'Who spends more time in dream sleep than anyone on this call?'),
    [L('جنينٌ في أسابيعه الأخيرة', 'A baby in the last weeks before birth'),
      L('مراهقٌ في عطلة نهاية الأسبوع', 'A teenager at the weekend'),
      L('قطّةٌ منزلية', 'A house cat'),
      L('مسنٌّ في الثمانين', 'Someone in their eighties')],
    L('يقضي الجنين معظم وقته في نوم الأحلام (REM): «سمادٌ عصبيّ» يبني وصلات الدماغ قبل أن يرى العالم.',
      'A fetus spends most of its time in REM sleep — a “neural fertiliser” that builds the brain’s connections before it ever sees the world.')),

  mcq('ws-beauty',
    L('صوّر باحثون في ستوكهولم الأشخاص أنفسهم مرتاحين ومحرومين من النوم، وطلبوا من غرباء أن يحكموا على الصور. ماذا وجدوا؟',
      'Stockholm researchers photographed the same people rested and sleep-deprived, and asked strangers to judge. The verdict?'),
    [L('بدت الوجوه المتعبة أقلّ صحّةً وجاذبية', 'The tired faces looked less healthy and less attractive'),
      L('لم يميّز الغرباء بين الصور', 'The strangers couldn’t tell the photos apart'),
      L('بدت الوجوه المتعبة أكثر لطفاً', 'The tired faces looked friendlier'),
      L('تغيّرت وجوه الرجال وحدهم', 'Only the men’s faces changed')],
    L('«نوم الجمال» حقيقيّ: صُنّفت صور قلّة النوم أكثر تعباً وأقلّ صحّةً وجاذبية. جدّاتنا كنّ على حقّ.',
      '“Beauty sleep” is real: the short-sleep photos were rated more tired, less healthy and less attractive. Our grandmothers were right.')),

  mcq('ws-brain-wash',
    L('ماذا يفعل دماغك في النوم العميق ولا يكاد يفعله وأنت مستيقظ؟', 'What does your brain do in deep sleep that it barely does awake?'),
    [L('يغسل نفسه من الفضلات، ومنها بروتين بيتا أميلويد', 'It washes itself, flushing out waste such as beta-amyloid'),
      L('يتوقّف عن العمل تقريباً ليوفّر الطاقة', 'It almost shuts down, to save energy'),
      L('ينمّي خلايا عصبية جديدة للغد', 'It grows new brain cells for tomorrow'),
      L('يحرق ما أكلته في المساء', 'It burns off what you ate in the evening')],
    L('الجهاز «الغليمفاوي»: في النوم العميق تنكمش الخلايا الدبقية ويُغسل بيتا أميلويد — البروتين المرتبط بالزهايمر. والدماغ النائم بعيدٌ عن السكون.',
      'The glymphatic system: in deep sleep glial cells shrink and beta-amyloid — the protein tied to Alzheimer’s — is flushed away. A sleeping brain is anything but idle.')),

  mcq('ws-halsted',
    L('الجرّاح الذي اخترع مناوبات الأطباء المقيمين المرهِقة كان يسهر بلا تعب. ما سرّه؟',
      'The surgeon who invented the punishing shifts of hospital residents could stay up without flagging. His secret?'),
    [L('كان مدمناً على الكوكايين', 'He was addicted to cocaine'),
      L('كان يحمل جين قلّة النوم النادر', 'He carried the rare short-sleep gene'),
      L('كان يأخذ غفوات عشر دقائق بين العمليات', 'He took ten-minute naps between operations'),
      L('كان يشرب عشرين فنجان قهوة في اليوم', 'He drank twenty cups of coffee a day')],
    L('وليام هالستد. وما زال المرضى يدفعون الثمن: المقيمون في مناوبات ٣٠ ساعة يرتكبون أخطاء تشخيص أكثر بـ٤٦٠٪.',
      'William Halsted. Patients still pay for it: residents on 30-hour shifts make 460% more diagnostic errors.')),
]

/* -------------------------------- numbers -------------------------------- */
const nums = [
  num('ws-n-nap',
    L('قاست «ناسا» القيلولة المثالية لطيّاريها. كم دقيقةً كانت؟', 'NASA measured the ideal nap for its pilots. How many minutes long was it?'),
    26, { unit: L('دقيقة', 'minutes') },
    L('٢٦ دقيقة رفعت الأداء ٣٤٪ واليقظة أكثر من ٥٠٪ — ومنها وُلدت «ثقافة القيلولة» في ناسا.',
      '26 minutes raised performance 34% and alertness by more than 50% — the birth of NASA’s nap culture.')),
  num('ws-n-drunk',
    L('بعد كم ساعةً بلا نوم يصير أداؤك كأداء من تجاوز الحدّ القانوني للكحول؟', 'After how many hours awake do you perform like someone over the legal drink-drive limit?'),
    19, { unit: L('ساعة', 'hours') },
    L('دراسةٌ أسترالية: ١٩ ساعة. والأسوأ أنك لا تشعر بذلك.', 'An Australian study: 19 hours. Worse, you don’t feel it.')),
  num('ws-n-room',
    L('ما درجة حرارة غرفة النوم المثالية للنوم، بالمئوية؟', 'What is the ideal bedroom temperature for sleep, in °C?'),
    18.3, { unit: L('°م', '°C'), dot: true, show: L('١٨٫٣', '18.3') },
    L('نحو ١٨٫٣ درجة: على حرارة جسمك أن تنخفض درجةً كاملة كي يبدأ النوم. أغلبنا يدفّئ غرفته أكثر ممّا ينبغي.',
      'About 18.3°C: your core temperature has to drop about a degree for sleep to begin. Most of us keep it too warm.')),
  num('ws-n-sat',
    L('أخّرت مدارس إدينا في مينيسوتا الجرس الأوّل من ٧:٢٥ إلى ٨:٣٠. بكم نقطةً ارتفعت نتائج اختبار SAT عند أفضل الطلاب؟',
      'Schools in Edina, Minnesota moved the first bell from 7:25 to 8:30. By how many points did the top students’ SAT scores rise?'),
    212, { unit: L('نقطة', 'points') },
    L('حتى ٢١٢ نقطة. وفي مقاطعة تيتون قلّل التغيير نفسه حوادث سيارات المراهقين ٧٠٪ — سطرٌ واحد في جدول.',
      'Up to 212 points. In Teton County the same change cut teenagers’ car crashes by 70% — one line in a timetable.')),
  num('ws-n-school',
    L('سأل ووكر الناس عمّا علّمتهم المدرسة عن الصحّة: تذكّر ٩٨٪ دروس التغذية و١٠٠٪ دروس الرياضة. وكم بالمئة تعلّموا شيئاً عن النوم؟',
      'Walker asked what school had taught people about health: 98% remembered nutrition lessons, 100% exercise. What percentage learned anything about sleep?'),
    0, { unit: L('٪', '%') },
    L('صفر. لم يتعلّم أحدٌ شيئاً — ولهذا يطالب ووكر بمنهجٍ مدرسيٍّ للنوم.', 'Zero. Nobody had been taught a thing — which is why Walker wants sleep on the school curriculum.')),
  num('ws-n-elephant',
    L('كم ساعةً ينام الفيل في اليوم تقريباً؟', 'About how many hours a day does an elephant sleep?'),
    4, { unit: L('ساعات', 'hours') },
    L('نحو أربع ساعات، والخفاش البنّي نحو تسع عشرة — ولا عاملٌ واحد، حتى حجم الجسم، يفسّر الفارق.',
      'About four hours, and the brown bat about nineteen — and no single factor, body size included, explains the gap.')),
]

/* ------------------------------ who is it? ------------------------------ */
const people = [
  who('ws-w-walker', L('ماثيو ووكر', 'Matthew Walker'),
    [L('وُلد في ليفربول مطلع السبعينيات، ثم عبر الأطلسي ولم يكفّ عن الكلام في موضوعٍ واحد.', 'Born in Liverpool in the early 1970s, he crossed the Atlantic and never stopped talking about one thing.'),
      L('محاضرته في TED تسمّي شيئاً تفعله كلّ ليلة «قوّةً خارقة».', 'His TED talk calls something you do every night a “superpower”.'),
      L('أسّس مركز علوم النوم البشري في بيركلي، وكتب كتاب النادي الأوّل.', 'He founded the Center for Human Sleep Science at Berkeley, and wrote the club’s first book.')],
    L('ماثيو ووكر، «دبلوماسيّ النوم».', 'Matthew Walker, “the Sleep Diplomat”.'),
    './images/characters/matthew-walker.webp'),
  who('ws-w-kleitman', L('ناثانيال كلايتمان', 'Nathaniel Kleitman'),
    [L('سنة ١٩٣٨ نزل تحت الأرض أسابيع — بإرادته — ومعه مساعد.', 'In 1938 he went underground for weeks — on purpose — with an assistant.'),
      L('أثبت أن الجسم يحفظ يوماً من نحو ٢٤ ساعة حتى بلا شمس.', 'He showed the body keeps a day of about 24 hours even with no sun at all.'),
      L('الأب المؤسّس لعلم النوم، ومختبره كهف «ماموث».', 'The founding father of sleep science, whose lab was Mammoth Cave.')],
    L('ناثانيال كلايتمان في كهف «ماموث كيف».', 'Nathaniel Kleitman, in Mammoth Cave.'),
    './images/characters/nathaniel-kleitman.webp'),
  who('ws-w-edison', L('توماس إديسون', 'Thomas Edison'),
    [L('كان يسخر علناً من النوم ويعدّه مضيعةً للوقت.', 'He publicly mocked sleep as a waste of time.'),
      L('وسرّاً كان يغفو على كرسيّ ممسكاً كراتٍ فولاذية فوق صحونٍ معدنية.', 'Secretly, he dozed in a chair holding steel balls over metal pans.'),
      L('مخترعٌ يُنسب إليه الضوء الذي يُسهرنا اليوم.', 'An inventor credited with the light that keeps us up today.')],
    L('توماس إديسون: إذا غفا سقطت الكرات فأيقظته الضجّة، فدوّن ما التقطه عقله بين اليقظة والنوم.', 'Thomas Edison: when he dozed off the balls fell and the clatter woke him, and he wrote down what his mind had caught between waking and sleep.'),
    './images/characters/thomas-edison.webp'),
  who('ws-w-mendeleev', L('ديمتري مندلييف', 'Dmitri Mendeleev'),
    [L('عجز سنواتٍ عن ترتيب قائمةٍ واحدة.', 'For years he could not get one list into order.'),
      L('سنة ١٨٦٩ جاءه الحلّ في حلم، فاستيقظ ودوّنه.', 'In 1869 the answer came to him in a dream; he woke and wrote it down.'),
      L('جدوله معلّقٌ في كلّ مختبر كيمياء في العالم.', 'His table hangs in every chemistry lab in the world.')],
    L('ديمتري مندلييف والجدول الدوري.', 'Dmitri Mendeleev, and the periodic table.'),
    './images/characters/dmitri-mendeleev.webp'),
  who('ws-w-halsted', L('وليام هالستد', 'William Halsted'),
    [L('يُعدّ من مؤسّسي الجراحة الحديثة.', 'He is counted among the founders of modern surgery.'),
      L('سنة ١٨٨٩ ابتكر التدريب المرهِق للأطباء المقيمين في جونز هوبكنز.', 'In 1889 he devised the punishing training of resident doctors at Johns Hopkins.'),
      L('كان يسهر الليالي بفضل إدمانٍ سرّيٍّ على الكوكايين.', 'He stayed up nights thanks to a secret cocaine addiction.')],
    L('وليام هالستد — ومناوباته ما زالت تُطبَّق رغم خطرها المثبت على المرضى.', 'William Halsted — whose shifts are still worked, despite their proven danger to patients.'),
    './images/characters/william-halsted.webp'),
  who('ws-w-freud', L('زيغموند فرويد', 'Sigmund Freud'),
    [L('أعاد الأحلام بحقٍّ إلى الدماغ، بعيداً عن الآلهة والأرواح.', 'He rightly put dreams back in the brain, away from gods and spirits.'),
      L('يشبّه ووكر تفسيرات أتباعه للحلم الواحد بقراءة الأبراج.', 'Walker likens his followers’ readings of a dream to horoscopes.'),
      L('صاحب «تفسير الأحلام» (١٨٩٩).', 'He wrote The Interpretation of Dreams (1899).')],
    L('زيغموند فرويد: إسهامٌ مهمّ، ونظريةٌ لا يمكن اختبارها.', 'Sigmund Freud: an important contribution, and a theory no one can test.'),
    './images/characters/sigmund-freud.webp'),
  who('ws-w-parks', L('كينيث باركس', 'Kenneth Parks'),
    [L('كنديٌّ في الثالثة والعشرين.', 'A Canadian, twenty-three years old.'),
      L('سنة ١٩٨٧ قاد سيّارته نحو ٢٣ كيلومتراً دون أن يستيقظ.', 'In 1987 he drove about 23 kilometres without waking up.'),
      L('برّأته هيئة المحلّفين لأنه كان يسير نائماً — أشهر قضايا السير النومي.', 'A jury acquitted him because he had been sleepwalking — the most famous sleepwalking case.')],
    L('كينيث باركس: السير النومي فعلٌ لا واعٍ من دماغٍ عالقٍ بين النوم العميق واليقظة.', 'Kenneth Parks: sleepwalking is an unconscious act of a brain stuck between deep sleep and waking.'),
    './images/characters/kenneth-parks.webp'),
]

/* -------------------------------- charts -------------------------------- */
const pressure = {
  x: { ticks: ['7:00', '13:00', '19:00', '1:00', '7:00'] },
  y: { hide: true },
  lines: [{ pts: poly([0, 0.08], [0.667, 0.92], [1, 0.1]), tone: 'a' }],
  marks: [{ x: 0.667, label: L('النوم', 'sleep') }],
}
const coffeeAxes = {
  x: { ticks: ['16:00', '20:00', '0:00', '4:00'] },
  y: { label: L('الكافيين في الدم', 'caffeine in the blood') },
  marks: [{ x: 0, label: L('فنجان', 'a cup') }],
  ask: [0.5, 0.5],
}
const decay = (half) => [[0, 0.04], ...curve((x) => 0.9 * Math.pow(0.5, ((x - 0.04) * 12) / half), { from: 0.04, to: 1 })]
const adult = { pts: poly([0, 0.05], [0.25, 0.08], [0.42, 0.85], [0.92, 0.85], [1, 0.5]), tone: 'c', dash: true }
const teenAxes = {
  x: { ticks: ['18:00', '21:00', '0:00', '3:00', '6:00'] },
  y: { label: L('الميلاتونين: النعاس', 'melatonin: sleepiness') },
  lines: [{ ...adult, dash: false, tone: 'a' }],
}
const coldBars = (hide) => ({
  y: hide ? { hide: true } : { label: L('أُصيبوا بالزكام', 'caught the cold') },
  bars: [
    { v: 0.5, label: L('أقلّ من ٥ ساعات', 'under 5 h'), show: '50%', tone: 'b' },
    { v: 0.18, label: L('٧–٨ ساعات', '7–8 h'), show: '18%', tone: 'a' },
  ],
})

const graphs = [
  { id: 'ws-g-pressure', chart: pressure,
    answerChart: { ...pressure, y: { label: L('ضغط النوم (الأدينوزين)', 'sleep pressure (adenosine)') } },
    q: L('هذا الخطّ يصعد طوال النهار وينهار في الليل. ماذا يقيس المحور المخفيّ؟', 'This line climbs all day and collapses overnight. What does the hidden axis measure?'),
    opts: [L('ضغط النوم (الأدينوزين)', 'Sleep pressure (adenosine)'), L('هرمون الميلاتونين', 'Melatonin'), L('الكافيين في الدم', 'Caffeine in the blood'), L('الجوع', 'Hunger')],
    why: L('الأدينوزين يتراكم مع كلّ ساعة يقظة، والنوم يكنسه. أمّا الميلاتونين فلا يتراكم طوال النهار: هو إشارة «حلّ الليل» فقط.',
      'Adenosine builds with every waking hour, and sleep sweeps it away. Melatonin does not build all day: it only signals that night has come.') },

  { id: 'ws-g-coffee', chart: coffeeAxes,
    q: L('شربتَ قهوةً في الرابعة عصراً. أيّ منحنى يُظهر الكافيين في دمك حتى الرابعة فجراً؟', 'You drink a coffee at 4 pm. Which curve shows the caffeine in your blood until 4 am?'),
    opts: [
      { chart: { lines: [{ pts: decay(7), tone: 'a' }] } },
      { chart: { lines: [{ pts: decay(1), tone: 'a' }] } },
      { chart: { lines: [{ pts: poly([0, 0.04], [0.04, 0.9], [0.58, 0.9], [0.62, 0.05], [1, 0.05]), tone: 'a' }] } },
      { chart: { lines: [{ pts: poly([0, 0.04], [1, 0.9]), tone: 'a' }] } },
    ],
    why: L('يتلاشى ببطء: عند منتصف الليل ما زال نحو نصفه في دمك. ولهذا تتقلّب في السرير وتلوم «الأرق».',
      'It fades slowly: at midnight about half of it is still in your blood. Which is why you lie awake blaming “insomnia”.') },

  { id: 'ws-g-teen', chart: teenAxes,
    q: L('هذا منحنى النعاس الليلي عند بالغ. أيّ منحنى هو منحنى المراهق؟ (الخطّ المنقّط: البالغ)', 'This is an adult’s night-time sleepiness. Which curve is a teenager’s? (Dotted: the adult.)'),
    opts: [
      { chart: { lines: [adult, { pts: poly([0, 0.05], [0.5, 0.08], [0.67, 0.85], [1, 0.85]), tone: 'b' }] } },
      { chart: { lines: [adult, { pts: poly([0, 0.08], [0.17, 0.85], [0.67, 0.85], [0.75, 0.5], [1, 0.1]), tone: 'b' }] } },
      { chart: { lines: [adult, { pts: poly([0, 0.05], [0.25, 0.08], [0.42, 0.42], [0.92, 0.42], [1, 0.25]), tone: 'b' }] } },
      { chart: { lines: [adult, { pts: poly([0, 0.1], [1, 0.1]), tone: 'b' }] } },
    ],
    why: L('المنحنى نفسه، متأخّراً نحو ثلاث ساعات. ساعة المراهق البيولوجية تتأخّر فعلاً — ولهذا يُعدّ جرس الساعة السابعة قسوةً عصبية.',
      'The same curve, about three hours later. A teenager’s body clock really does shift — which makes a seven o’clock bell a neurological cruelty.') },

  { id: 'ws-g-cold', chart: coldBars(true), answerChart: coldBars(false),
    q: L('قُسّم متطوّعون بحسب ساعات نومهم. ماذا يقيس المحور المخفيّ؟', 'Volunteers were split by how long they slept. What does the hidden axis measure?'),
    opts: [L('من أصيب بالزكام بعد رشّ فيروسه في أنفه', 'Who caught a cold after the virus was sprayed up their nose'),
      L('من أصيب بالزكام في شتاءٍ عاديّ', 'Who caught a cold during an ordinary winter'),
      L('من غفا في العمل', 'Who dozed off at work'),
      L('من شعر بالجوع ليلاً', 'Who felt hungry at night')],
    why: L('رشّ العلماء فيروس الزكام في أنوف المتطوّعين (حقّاً). من ناموا أقلّ من خمس ساعات أُصيب نحو نصفهم، ومن ناموا سبعاً أو ثماني ١٨٪ فقط.',
      'Scientists sprayed a cold virus up volunteers’ noses (really). Of those sleeping under five hours, about half fell ill; of those sleeping seven or eight, just 18%.') },
]

/* ------------------------------ white lies ------------------------------ */
const bluffs = [
  bluff('ws-b-edison',
    L('كان إديسون يغفو ممسكاً ____ فوق صحنٍ معدني، فإذا نام أيقظته الضجّة.', 'Edison napped holding ____ over a metal pan, so that dozing off woke him with a clatter.'),
    L('كراتٍ فولاذية', 'steel balls'),
    ['كرات فولاذ', 'كرات حديد', 'كرة فولاذية', 'كرات معدنية', 'كرات', 'steel ball', 'balls', 'metal balls', 'iron balls', 'ball bearings'],
    [L('ملعقة', 'a spoon'), L('مفاتيح بيته', 'his house keys'), L('مصباحاً كهربائياً', 'a light bulb'), L('كتاباً ثقيلاً', 'a heavy book')],
    L('كراتٍ فولاذية. سقوطها كان يوقظه في «الفجوة العبقرية» بين اليقظة والنوم، فيدوّن ما التقطه.', 'Steel balls. Their fall woke him in the “genius gap” between waking and sleep, and he wrote down what he had caught.')),
  bluff('ws-b-kleitman',
    L('سنة ١٩٣٨ عاش ناثانيال كلايتمان أسابيع ____ ليعرف إن كان الجسم يحفظ الوقت بلا شمس.', 'In 1938 Nathaniel Kleitman spent weeks living ____ to learn whether the body keeps time without the sun.'),
    L('في كهف', 'in a cave'),
    ['كهف', 'في كهف ماموث', 'كهف ماموث', 'مغارة', 'في مغارة', 'cave', 'a cave', 'mammoth cave', 'in mammoth cave', 'underground in a cave'],
    [L('في غوّاصة', 'in a submarine'), L('في القطب الشمالي', 'at the North Pole'), L('في قبو مستشفى', 'in a hospital basement'), L('في منجم فحم', 'in a coal mine')],
    L('في كهف «ماموث» المظلم. وجد أن الجسم يحافظ على يومٍ من نحو ٢٤ ساعة حتى بلا ضوء.', 'In the dark of Mammoth Cave. The body kept a day of about 24 hours even without light.')),
  bluff('ws-b-teens',
    L('إيقاظ مراهقٍ في السابعة صباحاً كإيقاظ بالغٍ في ____.', 'Waking a teenager at seven in the morning is like waking an adult at ____.'),
    L('الرابعة أو الخامسة فجراً', 'four or five in the morning'),
    ['4', '5', 'الرابعة', 'الخامسة', 'الرابعة فجرا', 'الخامسة فجرا', 'الرابعة صباحا', 'الخامسة صباحا', 'four', 'five', '4am', '5am', 'four am', 'five am', '4 or 5', 'four or five', 'four in the morning', 'five in the morning'],
    [L('منتصف الليل', 'midnight'), L('الثالثة فجراً', 'three in the morning'), L('السادسة صباحاً', 'six in the morning')],
    L('الرابعة أو الخامسة فجراً: ساعة المراهق تتأخّر نحو ثلاث ساعات.', 'Four or five in the morning: a teenager’s clock runs about three hours late.')),
  bluff('ws-b-mendeleev',
    L('عجز مندلييف سنواتٍ عن ترتيب العناصر، حتى رأى الجدول ____.', 'Mendeleev failed for years to arrange the elements — until he saw the table ____.'),
    L('في حلم', 'in a dream'),
    ['حلم', 'في الحلم', 'في منامه', 'في المنام', 'منام', 'dream', 'a dream', 'in his dream', 'in his sleep', 'in sleep', 'while asleep'],
    [L('في أوراق اللعب', 'in a deck of cards'), L('على رقعة شطرنج', 'on a chessboard'), L('في نافذةٍ مكسورة', 'in a broken window')],
    L('في حلم (١٨٦٩). نوم الأحلام يصل معلوماتٍ متناثرة في أنماطٍ جديدة.', 'In a dream (1869). Dream sleep links scattered information into new patterns.')),
  bluff('ws-b-beauty',
    L('في دراسة ستوكهولم، رأى الغرباء الوجوه المتعبة أقلّ صحّةً وأقلّ ____.', 'In the Stockholm study, strangers rated the tired faces less healthy and less ____.'),
    L('جاذبية', 'attractive'),
    ['جاذبيه', 'جمالا', 'جمال', 'جذابه', 'جذابة', 'attractive', 'beautiful', 'pretty', 'good looking', 'handsome'],
    [L('ذكاءً', 'intelligent'), L('ثقةً', 'trustworthy'), L('لطفاً', 'friendly'), L('شباباً', 'young')],
    L('أقلّ جاذبية. «نوم الجمال» له الآن دليلٌ علمي.', 'Less attractive. “Beauty sleep” now has evidence behind it.')),
  bluff('ws-b-aetna',
    L('كانت شركة «إتنا» تدفع لموظّفيها ٢٥ دولاراً عن كلّ ليلة ____.', 'The insurer Aetna paid its staff $25 for every night they ____.'),
    L('ناموا فيها جيّداً', 'slept well'),
    ['نوم', 'النوم', 'ناموا', 'ناموا جيدا', 'نوم جيد', 'نوم كاف', 'ناموا بما يكفي', 'slept', 'sleep', 'slept enough', 'slept 7 hours', 'got enough sleep', 'slept well'],
    [L('أطفؤوا فيها هواتفهم', 'switched off their phones'), L('لم يتأخّروا فيها في العمل', 'didn’t stay late at work'), L('مشوا فيها إلى البيت', 'walked home')],
    L('ناموا فيها جيّداً. النوم استثمارٌ في الإنتاج، لا خصمٌ منه.', 'Slept well. Sleep as an investment in output, not a cost to it.')),
]

/* ------------------------------- pictures ------------------------------- */
const pics = [
  picName('ws-p-spider', './images/clean/spider/caffeine.webp', L('الكافيين', 'Caffeine'),
    ['caffeine', 'كافيين', 'الكافيين', 'كافين', 'coffee', 'قهوة', 'القهوة'],
    [L('LSD', 'LSD'), L('الماريجوانا', 'Marijuana'), L('الأمفيتامين', 'Amphetamine')],
    [L('المخدّر الإدماني الوحيد الذي نقدّمه للأطفال بلا قلق.', 'The only addictive drug we happily give children.'),
      L('أغلبنا يتناول شيئاً منه قبل التاسعة صباحاً.', 'Most of us have some before nine in the morning.')],
    L('الكافيين — شبكته أسوأ حتى من شبكة LSD.', 'Caffeine — a worse web even than LSD’s.'),
    { q: L('أعطت «ناسا» عنكبوتاً مخدّراً فنسج هذه الشبكة. أيّ مخدّر؟', 'NASA gave a spider a drug and it spun this. Which drug?') }),
  picName('ws-p-edison', './images/characters/thomas-edison.webp', L('توماس إديسون', 'Thomas Edison'),
    ['Edison', 'إديسون', 'اديسون', 'thomas edison'],
    [L('نيكولا تسلا', 'Nikola Tesla'), L('ألكسندر غراهام بل', 'Alexander Graham Bell'), L('هنري فورد', 'Henry Ford')],
    [L('سخر من النوم علناً — وغفا سرّاً.', 'He mocked sleep in public — and napped in secret.'),
      L('كان يغفو ممسكاً كراتٍ فولاذية فوق صحونٍ معدنية.', 'He napped holding steel balls over metal pans.')],
    L('توماس إديسون، وقيلولة الكرات الفولاذية.', 'Thomas Edison, and his steel-ball nap.'), { q: WHO }),
  picName('ws-p-freud', './images/characters/sigmund-freud.webp', L('زيغموند فرويد', 'Sigmund Freud'),
    ['Freud', 'فرويد', 'sigmund freud', 'سيغموند فرويد'],
    [L('كارل يونغ', 'Carl Jung'), L('إيفان بافلوف', 'Ivan Pavlov'), L('ألفرد أدلر', 'Alfred Adler')],
    [L('يشبّه ووكر تفسيرات أتباعه للأحلام بقراءة الأبراج.', 'Walker likens his followers’ dream readings to horoscopes.'),
      L('صاحب «تفسير الأحلام» (١٨٩٩).', 'He wrote The Interpretation of Dreams (1899).')],
    L('فرويد: أعاد الأحلام إلى الدماغ، بنظريةٍ لا تُختبر.', 'Freud: he put dreams back in the brain, with a theory no one can test.'), { q: WHO }),
  picName('ws-p-mendeleev', './images/characters/dmitri-mendeleev.webp', L('ديمتري مندلييف', 'Dmitri Mendeleev'),
    ['Mendeleev', 'Mendeleyev', 'مندلييف', 'مندليف', 'dmitri mendeleev'],
    [L('ليو تولستوي', 'Leo Tolstoy'), L('فيودور دوستويفسكي', 'Fyodor Dostoevsky'), L('إيفان بافلوف', 'Ivan Pavlov')],
    [L('كيميائيّ روسيّ.', 'A Russian chemist.'), L('جاءه جدوله في حلم سنة ١٨٦٩.', 'His table came to him in a dream in 1869.')],
    L('مندلييف، والجدول الدوري الذي رآه في المنام.', 'Mendeleev, and the periodic table he saw in a dream.'), { q: WHO }),
  picName('ws-p-walker', './images/characters/matthew-walker.webp', L('ماثيو ووكر', 'Matthew Walker'),
    ['Walker', 'ووكر', 'والكر', 'matthew walker', 'ماثيو ووكر'],
    [L('أندرو هوبرمان', 'Andrew Huberman'), L('راسل فوستر', 'Russell Foster'), L('تشارلز تشايزلر', 'Charles Czeisler')],
    [L('محاضرته في TED تسمّي النوم «قوّةً خارقة».', 'His TED talk calls sleep a superpower.'), L('كتب كتاب النادي الأوّل.', 'He wrote the club’s first book.')],
    L('ماثيو ووكر، صاحب «لماذا ننام».', 'Matthew Walker, who wrote Why We Sleep.'), { q: WHO }),
  picName('ws-p-mccartney', './images/characters/paul-mccartney.webp', L('بول مكارتني', 'Paul McCartney'),
    ['McCartney', 'مكارتني', 'ماكارتني', 'paul mccartney', 'بول مكارتني'],
    [L('جون لينون', 'John Lennon'), L('ميك جاغر', 'Mick Jagger'), L('كيث ريتشاردز', 'Keith Richards')],
    [L('جاءه لحنٌ في نومه.', 'A melody came to him in his sleep.'), L('استيقظ ولحن «Yesterday» في رأسه.', 'He woke up with “Yesterday” in his head.')],
    L('بول مكارتني — ولحنٌ من الحلم صار من أشهر أغاني «البيتلز».', 'Paul McCartney — and a tune from a dream became one of the Beatles’ best known.'), { q: WHO }),
  picBook('ws-p-bird', './images/anatomical/half-sleeping-bird.webp',
    [L('هذا الطائر نائم — بنصف دماغه.', 'This bird is asleep — with half its brain.')],
    L('من «لماذا ننام»: الطيور والدلافين تنام بنصف دماغٍ في كلّ مرّة.', 'From Why We Sleep: birds and dolphins sleep one half of the brain at a time.')),
  picBook('ws-p-parks', './images/characters/kenneth-parks.webp',
    [L('قاد سيّارته ٢٣ كيلومتراً دون أن يستيقظ.', 'He drove 23 kilometres without waking up.')],
    L('كينيث باركس، من «لماذا ننام»: أشهر قضايا السير النومي.', 'Kenneth Parks, from Why We Sleep: the most famous sleepwalking case.')),
  picBook('ws-p-kleitman', './images/characters/nathaniel-kleitman.webp',
    [L('أمضى أسابيع في كهفٍ سنة ١٩٣٨.', 'He spent weeks in a cave in 1938.')],
    L('ناثانيال كلايتمان، الأب المؤسّس لعلم النوم — من «لماذا ننام».', 'Nathaniel Kleitman, the founding father of sleep science — from Why We Sleep.')),
]

export const gameDeck = { mcq: mcqs, num: nums, who: people, graph: graphs, bluff: bluffs, pic: pics }
