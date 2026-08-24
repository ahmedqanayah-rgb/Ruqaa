const L = (ar, en) => ({ ar, en })
const img = (f) => `./images/${f}`

/* ===================== Speed, Switching & Flow (Causes 1–2) ===================== */
export const speedFlow = {
  slug: 'speed-flow',
  icon: '⚡',
  title: L('السرعة والتشتّت والتدفّق', 'Speed, Switching & Flow'),
  lead: L(
    'نحن لا نؤدّي مهامّ متعدّدة معاً؛ بل نبدّل بينها بسرعةٍ مذهلة — وكلّ تبديلةٍ لها ثمن. وفي المقابل يوجد نقيضها: حالة التدفّق.',
    'We do not multitask; we switch between tasks at astonishing speed — and every switch has a price. Its opposite is the state of flow.'
  ),
  blocks: [
    { type: 'h', text: L('السبب الأوّل: السرعة والتبديل والتصفية', 'Cause one: speed, switching and filtering') },
    { type: 'p', text: L(
      'نبدأ بالحقيقة الأكثر بساطةً وإحراجاً: العالم يضخّ فينا معلوماتٍ أكثر ممّا صُمّمت أدمغتنا لمعالجته. قدّر باحثون أن الإنسان العاديّ كان يستهلك عام **١٩٨٦** ما يعادل **٤٠ صحيفة** من المعلومات يومياً؛ وبحلول **٢٠٠٧** قفز الرقم إلى ما يعادل **١٧٤ صحيفة** في اليوم. لم يكبر دماغنا خمس مرّات في عقدين — لكنّ سيل المعلومات فعل. والنتيجة أننا نقضي يومنا في **التصفية (filtering)**: فرزٌ محمومٌ لما يستحقّ الانتباه، يستهلك هو نفسه انتباهاً هائلاً.',
      'Start with the simplest, most embarrassing fact: the world now pumps more information into us than our brains were built to process. Researchers estimated that in **1986** an ordinary person consumed the equivalent of **40 newspapers** of information a day; by **2007** that had leapt to the equivalent of **174 newspapers** a day. Our brains did not grow five-fold in two decades — but the flood of information did. The result is that we spend our days **filtering**: a frantic triage of what deserves attention, which itself devours enormous attention.'
    ) },
    { type: 'p', text: L(
      'وسط هذا السيل، كيف نعمل فعلاً؟ حين وضع باحثون برنامج تتبّعٍ على حواسيب طلّابٍ لرصد يومهم، اكتشفوا أن الطالب **يبدّل مهمّته مرّةً كلّ ٦٥ ثانية** في المتوسّط، وأن الزمن الوسيط الذي يركّز فيه على شيءٍ واحد **١٩ ثانية فقط**. والكبار ليسوا أفضل حالاً كثيراً: وجدت **غلوريا مارك (Gloria Mark)** — عالمة المقاطعات في جامعة كاليفورنيا (إرفاين) — أن موظّف المكتب يبقى مع المهمّة الواحدة نحو **ثلاث دقائق** في المتوسّط قبل أن يقاطَع أو يقاطِع نفسه، ويندر أن يحظى بساعةٍ واحدة متواصلة دون مقاطعة.',
      'Amid this flood, how do we actually work? When researchers put tracking software on students’ computers to monitor their day, they found a student **switches task once every 65 seconds** on average, and the median time spent focused on any one thing was **just 19 seconds**. Adults are not much better: **Gloria Mark** — the scientist of interruption at UC Irvine — found the average office worker stays with one task for about **three minutes** before being interrupted or interrupting themselves, and rarely gets a single uninterrupted hour.'
    ) },
    { type: 'p', text: L(
      'وأشهر رقمٍ في هذا الباب أنك حين تُقاطَع وأنت مركّز، تحتاج في المتوسّط إلى **٢٣ دقيقة** لتعود إلى الحالة نفسها. والرقم منسوبٌ إلى **غلوريا مارك** نفسها — لا إلى مايكل بوزنر كما ورد في الكتاب — لكنّه رقمٌ **متنازعٌ عليه**: لم يظهر قطّ في بحثٍ محكَّم، وإنما في مقابلاتها الصحفية، وتقديرات الدراسات الأخرى أقرب إلى ١١–١٦ دقيقة (انظر «الكتاب في الميزان»). تبقى الفكرة العامّة صامدة — للمقاطعة ذيلٌ طويل بعدها — أمّا الرقم نفسه فخذه بحذر.',
      'The most famous number here is that when you are focusing and get interrupted, it takes on average **23 minutes** to return to the same state. It belongs to **Gloria Mark** herself — not to Michael Posner, as the book has it — but it is a **contested** number: it has never appeared in a peer-reviewed paper, only in her press interviews, and other studies put the figure closer to 11–16 minutes (see “The book under scrutiny”). The general point stands — an interruption has a long tail after it — but treat the number itself with care.'
    ) },
    { type: 'callout', variant: 'key', title: L('خرافة تعدّد المهامّ', 'The multitasking myth'), text: L(
      'يوضّح عالِم الأعصاب **إيرل ميلر (Earl Miller)** من معهد ماساتشوستس للتقنية (MIT) أن الدماغ لا يستطيع فعلاً التركيز إلا على فكرةٍ أو فكرتين في اللحظة الواحدة. ما نسمّيه «تعدّد المهامّ» هو في الحقيقة **تبديلٌ سريع** ذهاباً وإياباً — ونحن لا نلاحظه لأن الدماغ «يرقّع» الفجوات ويوهمنا بالسلاسة. والأدهى أن مَن يعتقدون أنهم بارعون في تعدّد المهامّ يكونون غالباً الأسوأ أداءً فيه عند القياس.',
      'Neuroscientist **Earl Miller** of MIT explains that the brain can genuinely focus on only one or two thoughts at a time. What we call “multitasking” is really **rapid switching** back and forth — and we fail to notice because the brain “stitches over” the gaps and gives us an illusion of smoothness. Worse: the people most convinced they are great multitaskers usually perform worst when actually measured.'
    ) },
    { type: 'p', text: L(
      'التبديل يضرّنا بأربع طرقٍ يحدّدها ميلر وزملاؤه: **كلفة التبديل** — يحتاج الدماغ وقتاً لإعادة الضبط بعد كلّ قفزة، وتبقى «بقايا انتباه» من المهمّة السابقة تلوّث الحالية؛ و**أثر التخريب** — الأخطاء تتكاثر لأن دماغك المتعجّل يملأ الفراغات بتخمينات؛ و**استنزاف الإبداع** — الأفكار الجديدة تولد من ربط عناصر بعيدة، والدماغ المُبدِّل لا يملك مهلة الربط؛ و**ضعف الذاكرة** — ما لا تنتبه إليه بعمقٍ لا يُخزَّن بعمق.',
      'Switching hurts us in four ways Miller and colleagues identify: the **switch cost** — the brain needs time to reconfigure after every jump, and “attention residue” from the previous task contaminates the current one; the **screw-up effect** — errors multiply because your hurried brain fills the gaps with guesses; the **creativity drain** — new ideas come from linking distant elements, and a switching brain never gets the linking time; and **diminished memory** — what you never attend to deeply is never stored deeply.'
    ) },
    { type: 'p', text: L(
      'كم يكلّف ذلك؟ في تجربةٍ صغيرة أُجريت لصالح شركة **هيوليت-باكارد (Hewlett-Packard)**، أدّى العمل وسط مقاطعات البريد والمكالمات إلى هبوط الأداء الذهنيّ الفعليّ بما يعادل **١٠ نقاط ذكاء** — أي ضِعف الأثر المقيس لتدخين الحشيش، وما يوازي أن تعمل بعد ليلةٍ بلا نوم. الرقم من دراسةٍ محدودة، لكنّ الاتجاه تؤكّده أبحاث المختبرات: التشتيت المستمرّ يجعل الأذكياء يعملون بعقولٍ أصغر من عقولهم.',
      'How much does it cost? In a small study commissioned by **Hewlett-Packard**, working amid email and phone interruptions dropped effective cognitive performance by the equivalent of **10 IQ points** — twice the measured effect of smoking cannabis, and roughly what a night without sleep does. The figure comes from a limited study, but lab research confirms the direction: constant distraction makes smart people work with smaller minds than they own.'
    ) },
    { type: 'h4', text: L('انتباهٌ جماعيّ يتقلّص', 'A shrinking collective attention') },
    { type: 'p', text: L(
      'ليست المشكلة فرديةً فحسب. حلّل **سونه ليمان (Sune Lehmann)** وزملاؤه كيف يتشبّث العالم بموضوعاته الرائجة: في عام **٢٠١٣** كان الموضوع يبقى ضمن أكثر ٥٠ موضوعاً تداولاً على تويتر لمدّة **١٧٫٥ ساعة**؛ وبحلول **٢٠١٦** هبطت المدّة إلى **١١٫٩ ساعة**. وحين عاد الفريق إلى بياناتٍ أقدم — الكتب على مدى أكثر من قرن، وبحث غوغل، وتذاكر السينما — وجد النمط نفسه: كلّ موضوعٍ يصعد أسرع ويسقط أسرع، عقداً بعد عقد.',
      'The problem is not only individual. **Sune Lehmann** and colleagues analysed how the world holds onto its trending topics: in **2013** a topic stayed among the 50 most-discussed on Twitter for **17.5 hours**; by **2016** that had fallen to **11.9 hours**. And when the team reached back into older data — books across more than a century, Google searches, cinema tickets — they found the same pattern: every topic rises faster and falls faster, decade after decade.'
    ) },
    { type: 'p', text: L(
      'تفسير ليمان بسيطٌ ومقلق: لا حاجة إلى مؤامرة. حين تضخّ في نظامٍ ما مزيداً من المعلومات، يقلّ الزمن الذي يستطيع النظام تخصيصه لكلّ معلومة. نحن «نستهلك» الموضوعات كما نستهلك كلّ شيءٍ آخر: أسرع فأسرع — والثمن أن القضايا التي تحتاج تفكيراً طويلاً (كالمناخ والديمقراطية) لم تعد تجد مَن يبقى معها طويلاً.',
      'Lehmann’s explanation is simple and unsettling: no conspiracy required. Pump more information into a system, and the time the system can give each item shrinks. We “consume” topics the way we consume everything else — faster and faster — and the price is that the issues requiring long thought (climate, democracy) can no longer find anyone who stays with them long.'
    ) },
    { type: 'figure', id: 'sfCollectiveAttention' },

    { type: 'h', text: L('السبب الثاني: تعطيل التدفّق', 'Cause two: the crippling of flow') },
    { type: 'p', text: L(
      'إن كان التبديل أسوأ حالات الانتباه، فما أفضلها؟ الجواب عند **ميهالي تشيكزينتميهالي (Mihaly Csikszentmihalyi)** — وقصّته نفسها درسٌ: طفلٌ في بودابست أثناء الحرب العالمية الثانية، رأى الكبار من حوله ينهارون، ولاحظ أنه هو نفسه لا يجد سلاماً إلا حين يغرق في لعبة الشطرنج غرقاً يمحو الحرب من وعيه. كبر ليسأل: ما هذه الحالة؟ ولاحظ لاحقاً أن الرسّامين ينسون الجوع والنوم أمام اللوحة، ثم يفقد كثيرون اهتمامهم بها فور اكتمالها — فالمكافأة لم تكن اللوحة، بل **الانغماس نفسه**.',
      'If switching is attention at its worst, what is attention at its best? The answer belongs to **Mihaly Csikszentmihalyi** — and his own story is a lesson: a child in Budapest during the Second World War, watching the adults around him fall apart, he noticed that he himself found peace only when he sank into chess so deeply the war vanished from his awareness. He grew up asking: what is that state? Later he observed painters forgetting hunger and sleep before a canvas — then losing interest in the painting the moment it was finished. The reward was never the painting; it was **the immersion itself**.'
    ) },
    { type: 'p', text: L(
      'سمّاها **التدفّق (Flow)**: حالةٌ تنغمس فيها كلّياً في نشاطٍ ذي معنى حتى يختفي الزمن وتذوب الذات في العمل. ولدراستها ابتكر منهج «أخذ العيّنات من الخبرة»: زوّد آلاف الأشخاص بأجهزة نداءٍ ترنّ في أوقاتٍ عشوائية ليسجّلوا ماذا يفعلون وكيف يشعرون — فتبيّن أن أعمق لحظات الرضا البشريّ ليست في الاسترخاء السلبيّ، بل في الانغماس النشط.',
      'He named it **flow**: a state of total immersion in a meaningful activity until time vanishes and the self dissolves into the work. To study it he invented “experience sampling”: thousands of people carried pagers that buzzed at random moments, prompting them to record what they were doing and how they felt — revealing that the deepest moments of human satisfaction are not passive relaxation but active absorption.'
    ) },
    { type: 'p', text: L(
      'ولحسن الحظّ، للتدفّق شروطٌ يمكن هندستها:',
      'Fortunately, flow has conditions you can engineer:'
    ) },
    { type: 'ul', items: [
      L('**هدفٌ واحد واضح:** التدفّق لا يحتمل الشراكة؛ مهمّةٌ واحدة محدّدة، لا قائمة مفتوحة ولا هاتفٌ بجوارك.',
        '**One clear goal:** flow tolerates no rivals; a single defined task, not an open list with a phone at your elbow.'),
      L('**معنى:** يتدفّق الإنسان فيما يهمّه هو، لا فيما فُرض عليه فرضاً بلا مغزى.',
        '**Meaning:** people flow in what matters to them, not in what is imposed without purpose.'),
      L('**حافّة القدرة:** أصعب قليلاً من مستواك فلا تملّ، وليس أصعب كثيراً فلا تُحبَط — عند هذه الحافّة بالضبط يُقفل الانتباه على المهمّة.',
        '**The edge of ability:** slightly harder than your level so you are not bored, not far harder so you are not crushed — at exactly that edge, attention locks onto the task.'),
    ] },
    { type: 'p', text: L(
      'لكن التدفّق هشّ: كلّ مقاطعةٍ أو إشعارٍ يطردك منه، وقد تحتاج وقتاً طويلاً للعودة. البيئة التي تقاطعنا كلّ دقائق ليست مزعجةً فحسب — إنها تجعل أعمق حالات العقل البشريّ **مستحيلة بنيوياً**. وهنا مفارقة العصر: نملك أدواتٍ أكثر من أيّ جيلٍ مضى، ونحرم أنفسنا من الحالة الذهنية الوحيدة التي تُنجَز فيها الأعمال العظيمة.',
      'But flow is fragile: every interruption or notification ejects you from it, and returning can take a long time. An environment that interrupts us every few minutes is not merely annoying — it makes the deepest state of the human mind **structurally impossible**. That is the paradox of the age: we own more tools than any generation before us, and we deny ourselves the one mental state in which great work gets done.'
    ) },
    { type: 'figure', id: 'sfFlowChannel' },
    { type: 'callout', variant: 'key', title: L('التدفّق هو البديل، لا الحرمان', 'Flow is the alternative — not deprivation'), text: L(
      'درسٌ عمليّ يلحّ عليه الكتاب: لا تُهزَم المشتّتات بقوّة الإرادة العارية، بل بمنافسٍ أقوى منها. الشخص الذي يجد تدفّقه — في الكتابة أو البرمجة أو الرياضة أو الموسيقى — لا «يقاوم» هاتفه؛ إنه ببساطة مشغولٌ عنه بما هو ألذّ. اجعل سؤالك الأوّل: ما النشاط الذي أذوب فيه؟ ثم ابنِ يومك ليحميه.',
      'A practical lesson the book insists on: distraction is not defeated by naked willpower but by a stronger competitor. The person who finds their flow — in writing, coding, sport, or music — does not “resist” their phone; they are simply too absorbed in something more delicious. Make your first question: what activity do I dissolve into? Then build your day to protect it.'
    ) },
  ],
}

/* ===================== Exhaustion & Sleep (Cause 3) ===================== */
export const exhaustion = {
  slug: 'exhaustion',
  icon: '🥱',
  title: L('الإنهاك والنوم', 'Exhaustion & Sleep'),
  lead: L(
    'لا يمكن لعقلٍ منهَكٍ أن ينتبه. قلّة النوم والإرهاق المزمن من أكثر لصوص التركيز مباشرةً — وأكثرها إهمالاً.',
    'An exhausted mind cannot pay attention. Too little sleep and chronic tiredness are among the most direct thieves of focus — and the most neglected.'
  ),
  blocks: [
    { type: 'p', text: L(
      'يخصّص هاري سبباً كاملاً للإنهاك البدني والذهني، لأنه الشرط الذي تُبنى عليه بقية الأسباب: كلّ حيلةٍ تسرق انتباهك تنجح أسرع على دماغٍ متعب. والأرقام صادمة: نحو **٤٠٪ من الأمريكيين** محرومون من النوم مزمناً (أقلّ من سبع ساعات في الليلة)، والأطفال ينامون اليوم أقلّ ممّا كان أقرانهم ينامون قبل قرن بنحو **٨٥ دقيقة** في الليلة. نحن نجري تجربةً جماعيةً غير مسبوقة على أدمغتنا — ونستغرب أنها لا تركّز.',
      'Hari devotes an entire cause to physical and mental exhaustion, because it is the substrate every other cause builds on: every trick that steals attention works faster on a tired brain. The numbers are stark: roughly **40% of Americans** are chronically sleep-deprived (under seven hours a night), and children today sleep about **85 minutes less** per night than their counterparts a century ago. We are running an unprecedented mass experiment on our own brains — and acting surprised that they cannot focus.'
    ) },
    { type: 'p', text: L(
      'ما حجم الأثر؟ تشرح عالمة النوم **روكسان بريتشارد (Roxanne Prichard)** — التي درست نوم طلّاب الجامعات — أن البقاء مستيقظاً نحو **١٩ ساعة** متواصلة يجعل أداءك المعرفيّ مكافئاً لأداء شخصٍ تجاوز حدّ **السُّكر القانوني** للقيادة. أي أن ملايين الطلّاب والموظّفين يبدؤون مهامّهم الدقيقة كلّ يوم بعقولٍ «ثملة» بالإرهاق — ثم يلومون إرادتهم حين يتشتّتون.',
      'How big is the effect? Sleep scientist **Roxanne Prichard** — who studied the sleep of university students — explains that staying awake for about **19 straight hours** leaves your cognitive performance equivalent to someone over the **legal limit for drunk driving**. Millions of students and workers begin demanding tasks every day with minds “drunk” on exhaustion — then blame their willpower when they cannot focus.'
    ) },

    { type: 'h4', text: L('ماذا يفعل النوم لانتباهك', 'What sleep does for your attention') },
    { type: 'p', text: L(
      'النوم ليس «إطفاءً» للدماغ بل وردية عملٍ ليلية. أثناء النوم العميق يتدفّق السائل الدماغيّ الشوكيّ عبر أنسجة الدماغ **فيغسل الفضلات الأيضية** المتراكمة من يومك — كما بيّنت أبحاث **مايكن نيدرغارد (Maiken Nedergaard)**؛ وفيه تُنقَل ذكريات اليوم من التخزين المؤقّت إلى الذاكرة الطويلة؛ وفي الأحلام تُعالَج التجارب والانفعالات وتُنسَج الروابط بين الأفكار. اقطع النوم، وستمنع فريق الصيانة من دخول المبنى — ثم تطالب المبنى بأن يعمل بكامل طاقته.',
      'Sleep is not the brain “switching off” but a night shift at work. During deep sleep, cerebrospinal fluid washes through brain tissue, **rinsing out the metabolic waste** your waking day deposited — as research by **Maiken Nedergaard** showed; the day’s memories are moved from temporary storage into long-term memory; and in dreams, experiences and emotions are processed and new connections woven. Cut sleep short, and you have barred the maintenance crew from the building — then demanded the building run at full capacity.'
    ) },
    { type: 'callout', variant: 'warn', title: L('اليقظة المزيّفة', 'Wired tiredness'), text: L(
      'يحذّر **تشارلز تشايزلر (Charles Czeisler)** من خدعةٍ نمارسها على أنفسنا: القهوة ومشروبات الطاقة لا تلغي الحاجة إلى النوم؛ إنها **تُخفي إشارة النعاس** فقط، كمن يلصق شريطاً على ضوء تحذير الوقود. والأسوأ أن الجسد يفسّر السهر الطويل كحالة **طوارئ**: يرفع هرمونات التوتّر ويضيّق الانتباه إلى «وضع النجاة» — وهو أبعد ما يكون عن التركيز العميق الهادئ. حتى إن الحرمان من النوم يُستخدَم في الاستجواب لتحطيم قدرة الإنسان على التفكير المتماسك.',
      '**Charles Czeisler** warns of a trick we play on ourselves: coffee and energy drinks do not cancel the need for sleep; they merely **mask the sleepiness signal**, like taping over the fuel warning light. Worse, the body reads prolonged wakefulness as an **emergency**: stress hormones rise and attention narrows into survival mode — the very opposite of calm, deep focus. Sleep deprivation is even used in interrogation precisely because it breaks a person’s capacity for coherent thought.'
    ) },
    { type: 'p', text: L(
      'ولماذا يتسامح مجتمعٌ كاملٌ مع هذا؟ لأن اليقظة مربحة. يلاحظ تشايزلر أن النائم لا يشتري شيئاً ولا يشاهد إعلاناً ولا يمرّر أيّ شاشة — فكلّ ساعة نومٍ إضافية هي ساعةٌ مخصومة من اقتصاد الانتباه. هكذا صار السهر «وسام شرف» والإرهاق علامة جدّية، بينما هما في الحقيقة تنازلٌ يوميّ عن أثمن أصولنا الذهنية.',
      'And why does an entire society tolerate this? Because wakefulness is profitable. Czeisler observes that a sleeping person buys nothing, watches no ads, and scrolls no screen — every extra hour of sleep is an hour deducted from the attention economy. That is how sleeplessness became a “badge of honour” and exhaustion a mark of seriousness, when in truth they are a daily surrender of our most valuable mental asset.'
    ) },
    { type: 'callout', variant: 'note', title: L('التقاءٌ مع كتابنا السابق', 'A meeting point with our previous book'), text: L(
      'يظهر الباحث **تشارلز تشايزلر (Charles Czeisler)** — عالِم النوم والإيقاع اليومي — في هذا الكتاب وفي «لماذا ننام» معاً. من أراد التعمّق في كيف يعيد النوم ضبط الدماغ والانتباه، فكتابنا الأوّل مرجعٌ كامل لذلك.',
      'The researcher **Charles Czeisler** — scientist of sleep and the circadian rhythm — appears in both this book and “Why We Sleep.” For anyone who wants to go deeper into how sleep resets the brain and attention, our first book is a full reference for it.'
    ) },
    { type: 'linkcards', title: L('اقرأ في كتاب «لماذا ننام»', 'Read in “Why We Sleep”'), links: [
      // was the deleted «الملخّص العام»; the mechanism section is what that
      // card actually promised — how sleep resets the brain.
      { to: '/book/why-we-sleep/review?tab=mechanism', icon: '🌙', label: L('آلية النوم الكاملة', 'How sleep works') },
      { to: '/book/why-we-sleep/review?tab=health', icon: '❤️', label: L('النوم والصحّة', 'Sleep and health') },
      { to: '/book/why-we-sleep/activities', icon: '📝', label: L('قيّم نومك', 'Assess your sleep') },
    ] },
    { type: 'p', text: L(
      'الخلاصة بسيطة: قبل أن تلوم إرادتك على تشتّتك، اسأل كم تنام. جرّب أسبوعاً واحداً بثماني ساعاتٍ منتظمة، ولاحظ ماذا يحدث لقدرتك على القراءة والإنصات وإنهاء المهامّ. استعادة النوم ليست نصيحةً من ضمن قائمة؛ إنها **الشرط المسبَق** الذي يجعل بقية النصائح ممكنة.',
      'The takeaway is simple: before blaming your willpower for your distraction, ask how much you sleep. Try a single week of a regular eight hours, and watch what happens to your ability to read, listen, and finish tasks. Reclaiming sleep is not one tip among many; it is the **precondition** that makes every other tip possible.'
    ) },
  ],
}
