/* ============================================================================
   «رُقعة النرد» — this book's question deck for the club's dice game
   (pages/Game.jsx finds every books/<slug>/game.js by glob; nothing registers it).
   ----------------------------------------------------------------------------
   THE FIRST OPTION IS ALWAYS THE RIGHT ONE. The game shuffles the options every
   time a card is drawn, so author them in the order that is easiest to check:
   the truth, then the jokes.

   THREE RULES, and the game stops being a game about the book if one breaks:

   1. **The right answer is a fact this site already states** — in a chapter, a
      study or the myth-or-fact deck — and `why` says it the way the site does.
      Nothing here is new research; if a number is not on the site, it is not
      in a question.
   2. **The wrong answers are jokes, not plausible rivals.** Nobody should lose
      a point to a trick. The fun is that the true answer sounds like the
      strangest of the three and the room has to decide whether to trust it.
   3. **No question may need the book open.** One fact, one sentence of setup.

   `why` is read aloud after the answer, so it carries the fact and one more
   thing worth knowing — not a restatement of the option.
   ========================================================================== */

const L = (ar, en) => ({ ar, en })
const q = (id, text, opts, why) => ({ id, q: text, opts, why })

/* The mark this book's squares wear on the board (a key into Icon.jsx). */
export const gameIcon = '🌙'

export const gameDeck = [
  q('ws-spiders',
    L('أعطت «ناسا» العناكبَ عقاقير مختلفة ثم تركتها تنسج شباكها. أيّ عنكبوتٍ نسج أسوأ شبكة؟',
      'NASA gave spiders different drugs, then let them spin their webs. Which spider built the most hopeless web?'),
    [
      L('عنكبوت الكافيين — شبكته أسوأ حتى من شبكة عنكبوت LSD', 'The caffeine spider — worse even than the one on LSD'),
      L('عنكبوت الماريجوانا — بدأ بحماسٍ ثم نسي ماذا كان يفعل', 'The marijuana spider — it started keenly, then forgot what it was doing'),
      L('العنكبوت الذي قرأ الأخبار ذلك الصباح', 'The spider that had read the news that morning'),
    ],
    L('شبكة الكافيين كانت الأكثر تشوّهاً بين الجميع — أسوأ من LSD. ويلاحظ ووكر أنه المخدّر الوحيد الذي نقدّمه للأطفال بلا قلق.',
      'The caffeine web was the most distorted of all — worse than LSD. Walker notes it is the only addictive drug we hand to children without a second thought.')),

  q('ws-dolphin',
    L('كيف ينام الدلفين دون أن يغرق؟', 'How does a dolphin sleep without drowning?'),
    [
      L('ينام بنصف دماغه، والنصف الآخر في المناوبة', 'With half its brain at a time — the other half stays on duty'),
      L('يحبس أنفاسه ويضبط المنبّه', 'It holds its breath and sets an alarm'),
      L('لا ينام أصلاً، بل يتظاهر بالإصغاء كما نفعل في الاجتماعات', 'It doesn’t. It just pretends to listen, like the rest of us in meetings'),
    ],
    L('الدلافين والبطّ تنام بنصف دماغٍ في كلّ مرّة. وأنت تفعل شيئاً شبيهاً: في ليلتك الأولى في مكانٍ جديد ينام نصف دماغك أخفّ من الآخر، حرصاً.',
      'Dolphins and ducks sleep one hemisphere at a time. You do a mild version: on your first night somewhere new, half your brain sleeps more lightly, on guard.')),

  q('ws-elephant-bat',
    L('أحدهما ينام نحو أربع ساعات، والآخر نحو تسع عشرة ساعة. من هو من؟',
      'One sleeps about four hours a day, the other about nineteen. Who is who?'),
    [
      L('الفيل ينام أربعاً، والخفاش البنّي تسع عشرة', 'The elephant sleeps four, the brown bat nineteen'),
      L('الخفاش ينام أربعاً لأن عنده دواماً ليلياً، والفيل تسع عشرة', 'The bat sleeps four — it works nights — and the elephant nineteen'),
      L('كلاهما ينام ثماني ساعاتٍ كأيّ مواطنٍ صالح', 'Both sleep eight, like good citizens'),
    ],
    L('الفيل نحو ٤ ساعات والخفاش البنّي نحو ١٩ — ولا يوجد عاملٌ واحد (لا الحجم ولا غيره) يفسّر هذا التباين.',
      'The elephant about 4 hours, the brown bat about 19 — and no single factor, body size included, explains the gap.')),

  q('ws-nasa-nap',
    L('قاست «ناسا» القيلولة المثالية لطيّاريها. كم طولها، وماذا أعطتهم؟',
      'NASA measured the ideal nap for its pilots. How long was it, and what did it buy them?'),
    [
      L('٢٦ دقيقة — وارتفع الأداء ٣٤٪', '26 minutes — and performance rose 34%'),
      L('ثلاث ساعات — وأقلعت الرحلة من دونهم', 'Three hours — and the mission took off without them'),
      L('خمس ثوانٍ بعينين مفتوحتين، وتُعرف باسم «قيلولة الاجتماع»', 'Five seconds with the eyes open, also known as “the meeting nap”'),
    ],
    L('قيلولة ٢٦ دقيقة رفعت الأداء ٣٤٪ واليقظة أكثر من ٥٠٪ — ومنها وُلدت «ثقافة القيلولة» في ناسا.',
      'A 26-minute nap raised performance 34% and alertness by more than 50% — the origin of NASA’s “nap culture”.')),

  q('ws-aetna',
    L('ماذا فعلت شركة التأمين Aetna بنوم موظّفيها؟',
      'What did the insurer Aetna do about its employees’ sleep?'),
    [
      L('دفعت لهم مكافأةً عن كلّ ليلةٍ ينامون فيها جيّداً', 'Paid them a bonus for every night they slept well'),
      L('خصمت من راتب كلّ من ضُبط يتثاءب', 'Docked the pay of anyone caught yawning'),
      L('استبدلت بالمكاتب أسرّةً بطابقين', 'Replaced the desks with bunk beds'),
    ],
    L('دفعت Aetna ٢٥ دولاراً عن الليلة — النوم استثمارٌ في الإنتاج لا خصمٌ منه.',
      'Aetna paid $25 a night — sleep as an investment in output, not a cost to it.')),

  q('ws-19-hours',
    L('بعد ١٩ ساعة بلا نوم يصير أداء دماغك مثل أداء…',
      'After 19 hours awake, your brain performs like the brain of…'),
    [
      L('سائقٍ تجاوز الحدّ القانوني للكحول', 'A driver over the legal drink-drive limit'),
      L('سمكةٍ ذهبية عندها موعد تسليم', 'A goldfish with a deadline'),
      L('فيلسوف — بطيءٌ لكنه عميق', 'A philosopher — slow, but deep'),
    ],
    L('دراسةٌ أسترالية: بعد ١٩ ساعة من اليقظة يتساوى أداؤك مع من تجاوز حدّ السُّكْر القانوني. والأسوأ أنك لا تشعر بذلك.',
      'An Australian study: after 19 hours awake you perform like someone legally drunk. Worse, you do not feel it.')),

  q('ws-aliens',
    L('ماذا يقول علم النوم عمّن يروون أن «كائناتٍ فضائية اختطفتهم» ليلاً؟',
      'What does sleep science say about people who report being “abducted by aliens” at night?'),
    [
      L('شلل النوم: استيقظ الوعي والجسد ما زال مشلولاً في نوم الأحلام', 'Sleep paralysis: the mind woke while the body was still locked in dream sleep'),
      L('الكائنات حقيقية، لكنها لا تأخذ إلا من ينام أقلّ من ستّ ساعات', 'The aliens are real, but they only take people who sleep under six hours'),
      L('تعشَّوا متأخّرين. القصّة المعتادة', 'They ate too late. The usual story'),
    ],
    L('شلل النوم: تستيقظ عاجزاً عن الحركة مع هلوسةٍ حيّة وخوفٍ شديد. يصيب نحو واحدٍ من كلّ أربعة أصحّاء.',
      'Sleep paralysis: you wake unable to move, with vivid hallucination and intense fear. It affects about one healthy person in four.')),

  q('ws-dreams-made',
    L('ما الذي يجمع الجدول الدوري، وألحان «البيتلز»، ورواية «فرانكنشتاين»؟',
      'What do the periodic table, the Beatles’ melodies and “Frankenstein” have in common?'),
    [
      L('كلّها جاءت أصحابَها في النوم', 'All of them came to their makers in sleep'),
      L('كلّها كُتبت في ليلة سهرٍ واحدة على القهوة', 'All were written in a single caffeinated night'),
      L('لم يفهمها أحدٌ في البداية، ولا حتى أصحابها', 'Nobody understood them at first, their makers included'),
    ],
    L('مندلييف رأى جدوله في حلم (١٨٦٩)، ومكارتني استيقظ على ألحانه، وماري شيلي حلمت بوحشها. نوم الأحلام يمزج الأفكار المتباعدة.',
      'Mendeleev dreamed his table (1869), McCartney woke with his melodies, Mary Shelley dreamed her monster. Dream sleep mixes ideas that are far apart.')),

  q('ws-daylight-saving',
    L('في كلّ ربيعٍ تتقدّم الساعة ويخسر مليار ونصف إنسانٍ ساعة نوم. ماذا يحدث في اليوم التالي؟',
      'Every spring the clocks jump forward and a billion and a half people lose an hour of sleep. What happens the next day?'),
    [
      L('ترتفع النوبات القلبية وحوادث السير', 'Heart attacks and road crashes go up'),
      L('يصل الجميع قبل موعدهم بساعة، خطأً', 'Everyone arrives an hour early, by mistake'),
      L('تعلن المقاهي عيداً وطنياً', 'Coffee shops declare a national holiday'),
    ],
    L('ترتفع النوبات والحوادث بعد خسارة الساعة في الربيع، وتنخفض بعد ربحها في الخريف. ساعةٌ واحدة.',
      'Heart attacks and crashes rise after the spring loss and fall after the autumn gain. One hour.')),

  q('ws-bedroom',
    L('ما درجة حرارة غرفة النوم المثالية؟', 'What is the ideal bedroom temperature for sleep?'),
    [
      L('نحو ١٨ درجة مئوية — أبرد ممّا يظنّ معظمنا', 'About 18°C — cooler than most of us think'),
      L('ثلاثون درجة، كرغيفٍ خرج لتوّه من الفرن', 'Thirty degrees, like a loaf fresh from the oven'),
      L('ما يقرّره من بيده جهاز التحكّم', 'Whatever the person holding the remote decides'),
    ],
    L('يجب أن تنخفض حرارة جسدك نحو درجةٍ واحدة ليبدأ النوم، والغرفة المثالية نحو ١٨٫٣°م. معظمنا يضبطها أدفأ من اللازم.',
      'Your core temperature has to drop about one degree for sleep to begin, and the ideal room is about 18.3°C. Most of us keep it too warm.')),

  q('ws-melatonin',
    L('فحص باحثون أقراص الميلاتونين ليقارنوا ما فيها بما كُتب على العلبة. ماذا وجدوا؟',
      'Researchers tested melatonin pills against what their labels promised. What was inside?'),
    [
      L('ما بين ٨٣٪ أقلّ و٤٧٨٪ أكثر ممّا على الملصق', 'Anything from 83% less to 478% more than the label says'),
      L('الجرعة المكتوبة تماماً، ومعها وسادةٌ صغيرة', 'Exactly the stated dose, plus a tiny pillow'),
      L('قهوة منزوعة الكافيين في الغالب', 'Mostly decaf'),
    ],
    L('تراوح المحتوى بين ٨٣٪ أقلّ و٤٧٨٪ أكثر من المكتوب، وبعضها احتوى سيروتونين ملوِّثاً.',
      'The content ranged from 83% below to 478% above the label, and some pills contained serotonin as a contaminant.')),

  q('ws-teen-clock',
    L('لماذا لا يستطيع المراهق أن ينام في العاشرة مساءً؟',
      'Why can’t a teenager fall asleep at ten at night?'),
    [
      L('ساعته البيولوجية تتأخّر فعلاً نحو ثلاث ساعات', 'Their body clock really does shift about three hours later'),
      L('عنادٌ خالص، مثبتٌ علمياً', 'Pure stubbornness, scientifically confirmed'),
      L('لأن بطّارية هاتفه أقوى من بطّاريته', 'Because the phone’s battery lasts longer than theirs'),
    ],
    L('إزاحةٌ عصبية حقيقية لا كسل. وإيقاظه في السابعة يشبه إيقاظ بالغٍ في الرابعة أو الخامسة فجراً.',
      'A real neurological shift, not laziness. Waking a teenager at seven is like waking an adult at four or five in the morning.')),

  q('ws-short-gene',
    L('قلّةٌ من الناس تكفيهم ساعات نومٍ قليلة بسبب طفرةٍ جينية. كم هي نادرة؟',
      'A few people truly manage on little sleep thanks to a gene mutation. How rare is it?'),
    [
      L('احتمال أن تضربك صاعقة أكبر من احتمال أن تحملها', 'You are more likely to be struck by lightning'),
      L('واحدٌ من كلّ ثلاثة — وكلّهم مديروك في العمل', 'One person in three — and all of them are your managers'),
      L('كلّنا نحملها، وتشتغل وقت الامتحانات', 'Everyone has it; it switches on at exam time'),
    ],
    L('أقلّ من ١٪. ومعظم من يظنّون أنفسهم من أصحابها مخطئون: أداؤهم متدهور، لكنهم فقدوا القدرة على الحكم عليه.',
      'Under 1%. And most people who think they have it are wrong: their performance is degraded, and they have lost the ability to judge it.')),

  q('ws-atonia',
    L('لماذا لا تنهض من سريرك وتمثّل أحلامك؟', 'Why don’t you get out of bed and act out your dreams?'),
    [
      L('لأن دماغك يشلّ عضلاتك في نوم الأحلام', 'Because your brain paralyses your muscles during dream sleep'),
      L('حسن التربية', 'Good manners'),
      L('أنت تفعل. أهلك أكثر تهذيباً من أن يخبروك', 'You do. Your family is too polite to mention it'),
    ],
    L('في نوم حركة العين السريعة تُشلّ العضلات الإرادية كلّها (Atonia) — لا تعمل إلا العينان والتنفّس.',
      'In REM sleep every voluntary muscle is paralysed (atonia) — only the eyes and breathing keep working.')),

  q('ws-fetus',
    L('من يقضي في نوم الأحلام وقتاً أطول من أيّ حاضرٍ في هذه الجلسة؟',
      'Who spends more time in dream sleep than anyone in this meeting?'),
    [
      L('الجنين — نحو تسع ساعاتٍ يومياً قبيل الولادة', 'An unborn baby — about nine hours a day near birth'),
      L('طالبٌ في الصفّ الأخير من محاضرة الثامنة صباحاً', 'A student in the back row of an 8 a.m. lecture'),
      L('من أطفأ كاميرته الآن', 'Whoever has just turned their camera off'),
    ],
    L('الجنين يقضي معظم وقته في نوم حركة العين السريعة — «سمادٌ عصبي» يبني وصلات الدماغ.',
      'A fetus spends most of its time in REM sleep — a “neural fertiliser” that builds the brain’s connections.')),

  q('ws-cold',
    L('رشّ العلماء فيروس الزكام في أنوف متطوّعين (نعم، حقّاً). من أُصيب أكثر؟',
      'Scientists sprayed a cold virus up volunteers’ noses (yes, really). Who caught the cold most?'),
    [
      L('من ينامون أقلّ من خمس ساعات: مرض نصفهم تقريباً', 'Those sleeping under five hours: about half fell ill'),
      L('من خرجوا وشعرهم مبلول', 'Those who went out with wet hair'),
      L('لا أحد — نام الفيروس أوّلاً', 'Nobody — the virus fell asleep first'),
    ],
    L('أقلّ من ٥ ساعات: أُصيب نحو ٥٠٪. سبع إلى ثماني ساعات: ١٨٪ فقط. علاقةٌ خطّية بين النوم والمناعة.',
      'Under 5 hours: about 50% were infected. Seven to eight hours: just 18%. A straight line between sleep and immunity.')),

  q('ws-school-survey',
    L('سأل ووكر الناس عمّا تعلّموه في المدرسة عن الصحّة: ٩٨٪ عن التغذية و١٠٠٪ عن الرياضة. وعن النوم؟',
      'Walker asked people what school had taught them about health: 98% nutrition, 100% exercise. And sleep?'),
    [
      L('صفر بالمئة', 'Zero per cent'),
      L('خمسون بالمئة — وناموا في النصف الآخر', 'Fifty per cent — they slept through the other half'),
      L('١١٠٪ في المدارس ذات المقاعد المريحة', '110%, in schools with comfortable chairs'),
    ],
    L('صفر. لا أحد تلقّى أيّ تعليمٍ عن النوم — فجوةٌ صارخة، ولهذا يدعو ووكر إلى منهجٍ مدرسيّ عن النوم.',
      'Zero. Nobody had been taught anything about sleep — a glaring gap, and why Walker calls for a school curriculum on it.')),

  q('ws-sat',
    L('أخّرت مدارس إيدينا في مينيسوتا بداية الدوام من ٧:٢٥ إلى ٨:٣٠. ماذا حدث لدرجات طلّابها في اختبار SAT؟',
      'Schools in Edina, Minnesota moved the first bell from 7:25 to 8:30. What happened to their students’ SAT scores?'),
    [
      L('ارتفعت حتى ٢١٢ نقطة', 'They rose by up to 212 points'),
      L('لا شيء، لكنّ الفطور صار أفضل', 'Nothing, but breakfast improved'),
      L('انخفضت — سهر الجميع ساعةً إضافية', 'They fell — everyone stayed up an hour later'),
    ],
    L('ارتفعت حتى ٢١٢ نقطة. وفي مقاطعة تيتون خفض التأخير حوادث سيّارات المراهقين ٧٠٪ — بسطرٍ واحد في جدول الدوام.',
      'They rose by up to 212 points. And in Teton County the same change cut teenagers’ car crashes by 70% — one line in a timetable.')),

  q('ws-wages',
    L('وجد اقتصاديون أن ساعة نومٍ إضافية كلّ ليلة تساوي…',
      'Economists found that one extra hour of sleep a night is worth…'),
    [
      L('أجراً أعلى بنحو ٤ إلى ٥٪', 'Wages about 4 to 5% higher'),
      L('ساعة تأخيرٍ إضافية عن الدوام', 'One extra hour of being late for work'),
      L('لا شيء: الوقت مال، وقد أنفقتَه', 'Nothing: time is money, and you spent it'),
    ],
    L('ساعة نومٍ إضافية ← أجرٌ أعلى ٤–٥٪. ومع ذلك اختار كثيرون في إحدى الدراسات المال الأكثر على النوم الأكثر — وهي مقايضةٌ خاسرة.',
      'An extra hour of sleep goes with 4–5% higher wages. Even so, in one study many people chose more money over more sleep — a losing trade.')),

  q('ws-beauty',
    L('صوّر باحثون في ستوكهولم وجوه الناس بعد نومٍ كافٍ وبعد حرمان، وطلبوا من غرباء أن يحكموا. ماذا كان الحكم؟',
      'Researchers in Stockholm photographed people rested and sleep-deprived, and asked strangers to judge. The verdict?'),
    [
      L('«نوم الجمال» حقيقة: الوجوه المتعبة بدت أقلّ صحّةً وجاذبية', '“Beauty sleep” is real: the tired faces looked less healthy and less attractive'),
      L('المتعبون بدوا أكثر غموضاً، ونالوا مواعيد أكثر', 'The tired ones looked more mysterious and got more dates'),
      L('لم يميّز أحدٌ شيئاً: الجميع يبدو متعباً في شتاء ستوكهولم', 'Nobody could tell: everyone looks tired in a Stockholm winter'),
    ],
    L('صور قلّة النوم قُيِّمت أكثر تعباً وأقلّ صحّةً وجاذبية — تأكيدٌ علمي لعبارة جدّاتنا.',
      'The short-sleep photos were rated more tired, less healthy and less attractive — scientific backing for what our grandmothers said.')),

  q('ws-brain-wash',
    L('ماذا يفعل دماغك في النوم العميق ولا يكاد يفعله وأنت مستيقظ؟',
      'What does your brain do in deep sleep that it barely does while you are awake?'),
    [
      L('يغسل نفسه — نظام التنظيف يعمل أسرع بعشر إلى عشرين مرّة', 'It washes itself — the cleaning system runs ten to twenty times faster'),
      L('يتوقّف أخيراً عن تذكيرك بذلك الموقف المحرج من ٢٠٠٩', 'It finally stops replaying that embarrassing moment from 2009'),
      L('ينزّل التحديثات ثم يعيد التشغيل', 'It downloads the updates and restarts'),
    ],
    L('الجهاز اللمفاوي الدبقي: في النوم العميق تنكمش خلايا الغِلْيا ويُجرف «بيتا أميلويد» — البروتين المرتبط بألزهايمر.',
      'The glymphatic system: in deep sleep the glial cells shrink and beta-amyloid — the protein tied to Alzheimer’s — is flushed away.')),

  q('ws-halsted',
    L('الطبيب الذي أرسى نظام مناوبات الأطبّاء المقيمين الطويلة كان يعمل بلا نومٍ فعلاً. ما سرّه؟',
      'The doctor behind the marathon shifts of hospital residents really did work without sleep himself. His secret?'),
    [
      L('كان مدمن كوكايين', 'He was addicted to cocaine'),
      L('زوجةٌ تصنع قهوةً ممتازة', 'A wife who made excellent coffee'),
      L('كان توأمين في السرّ', 'He was secretly twins'),
    ],
    L('ويليام هالستد. والثمن يدفعه المرضى إلى اليوم: المقيمون في مناوبات ٣٠ ساعة يخطئون التشخيص ٤٦٠٪ أكثر.',
      'William Halsted. Patients still pay for it: residents on 30-hour shifts make 460% more diagnostic errors.')),
]
