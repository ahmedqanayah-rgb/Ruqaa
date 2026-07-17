const L = (ar, en) => ({ ar, en })
const anat = (f) => `./images/anatomical/${f}`
const clean = (f) => `./images/clean/${f}`
const port = (f) => `./images/characters/${f}`

/* ===================== 6) Sleep, Health, Immunity & Cancer ===================== */
export const health = {
  slug: 'health',
  icon: '❤️‍🩹',
  title: L('النوم والصحّة والمناعة والسرطان', 'Sleep, Health, Immunity & Cancer'),
  lead: L(
    'أقوى دواءٍ وقائيّ نملكه: المناعة، والسرطان، والقلب، والأيض، والخصوبة — وكثيرٌ من آثاره يظهر بعد ليلةٍ واحدة.',
    'The most powerful preventive medicine we have: immunity, cancer, heart, metabolism, fertility — much of it after a single night.'
  ),
  blocks: [
    { type: 'h', text: L('النوم وجهاز المناعة', 'Sleep and the immune system') },
    { type: 'callout', variant: 'fact', title: L('ليلة واحدة تكفي', 'A single night is enough'), text: L(
      '**ليلة واحدة من نوم ٤ ساعات** تخفض نشاط **الخلايا القاتلة الطبيعية (Natural Killer Cells)** — قنّاصة الأورام والفيروسات — بنسبة تصل إلى **٧٠٪**. لا أسبوع، بل ليلة واحدة.',
      '**A single night of 4-hour sleep** cuts the activity of **Natural Killer Cells** — the snipers of tumours and viruses — by up to **70%**. Not a week; one night.'
    ) },
    { type: 'ul', items: [
      L('**اللقاحات:** من ينام قليلاً في الأسبوع السابق للقاح يُنتج **أقلّ من نصف** الأجسام المضادّة.',
        '**Vaccines:** short sleep in the week before a vaccine produces **less than half** the antibodies.'),
      L('**نزلات البرد:** من ينامون **أقلّ من ٥ ساعات** أكثر عرضةً للزكام **~٤٫٥ مرّة**.',
        '**Colds:** those sleeping **under 5 hours** are about **4.5×** more likely to catch a cold.'),
      L('**الالتهاب المزمن:** قلّة النوم تُبقي الجسم في التهابٍ خفيّ مرتبط بأمراض القلب والسكري.',
        '**Chronic inflammation:** sleep loss keeps the body in a hidden inflammatory state linked to heart disease and diabetes.'),
    ] },
    { type: 'imggrid', images: [
      { src: anat('natural-killer-cells.jpg'), alt: L('الخلايا القاتلة الطبيعية', 'Natural killer cells'),
        caption: L('الخلايا القاتلة الطبيعية (Natural Killer Cells) تهاجم خليّة خبيثة.', 'Natural Killer Cells attacking a malignant cell.') },
      { src: clean('nk-cells-1.png'), transparent: true, alt: L('نشاط الخلايا المناعية', 'Immune-cell activity'),
        caption: L('نشاط المناعة يعتمد على النوم ليلةً بليلة.', 'Immune activity depends on sleep, night by night.') },
    ] },

    { type: 'h', text: L('النوم والسرطان', 'Sleep and cancer') },
    { type: 'ul', items: [
      L('ربطت دراساتٌ قلّةَ النوم بارتفاع خطر سرطاناتٍ (الأمعاء، الثدي، البروستاتا) عبر ضعف الخلايا القاتلة والالتهاب.',
        'Studies link short sleep to higher risk of several cancers (bowel, breast, prostate) via weakened NK cells and inflammation.'),
      L('في الفئران، نمت الأورام أسرع وانتشرت أكثر — بزيادةٍ بلغت نحو **٢٠٠٪** لدى المحرومة من النوم.',
        'In mice, tumours grew and spread faster — up to about **200% more** in the sleep-deprived.'),
      L('صنّفت **منظمة الصحة العالمية** العمل الليلي المزمن ضمن **«المحتمَل أن يسبّب السرطان»**.',
        'The **WHO** classifies chronic night-shift work as **“probably carcinogenic.”**'),
    ] },

    { type: 'h', text: L('القلب والأوعية', 'Heart and vessels') },
    { type: 'callout', variant: 'fact', title: L('تجربة التوقيت الصيفي', 'The daylight-saving experiment'), text: L(
      'حين تُقدَّم الساعة ربيعاً (خسارة ساعة نوم) **ترتفع النوبات القلبية** في اليوم التالي، وحين تُؤخَّر خريفاً (ربح ساعة) **تنخفض** — تجربةٌ طبيعية على ~١٫٥ مليار إنسان تُثبت أن **ساعةً واحدة** تُحدث فرقاً.',
      'When clocks spring forward (losing an hour) **heart attacks rise** the next day, and when they fall back (gaining an hour) they **drop** — a natural experiment on ~1.5 billion people proving that **one hour** matters.'
    ) },

    { type: 'h', text: L('الأيض والوزن والسكري', 'Metabolism, weight and diabetes') },
    { type: 'ul', items: [
      L('**السكري:** تقييد النوم إلى ~٥ ساعات لأيّامٍ جعل رجالاً أصحاء **«ما قبل السكري»** (فان كاوتر).',
        '**Diabetes:** restricting sleep to ~5 hours for days pushed healthy men to **“pre-diabetic”** (Van Cauter).'),
      L('**الوزن:** قلّة النوم تخفض **الليبتين (Leptin)** الشبع وترفع **الغريلين (Ghrelin)** الجوع، وتوجّه الاشتهاء للسكّريات.',
        '**Weight:** sleep loss lowers satiety **Leptin** and raises hunger **Ghrelin**, steering cravings toward sugars.'),
      L('**الحمية:** من ينامون قليلاً أثناء الرجيم يخسرون **عضلاً أكثر ودهناً أقلّ** — قلّة النوم تُفشل الحمية.',
        '**Dieting:** short sleepers on a diet lose **more muscle and less fat** — sleep loss defeats the diet.'),
    ] },
    { type: 'figure', id: 'fig13' },

    { type: 'h', text: L('الهرمونات والخصوبة', 'Hormones and fertility') },
    { type: 'p', text: L(
      'قلّة النوم تخفض **التستوستيرون (Testosterone)**: مستواه لدى شابٍّ قليل النوم يعادل من يكبره **عشر سنوات**، مع تراجع جودة الحيوانات المنوية. ويُفرَز جزءٌ كبير من **هرمون النموّ (Growth Hormone)** في النوم العميق — فقلّته تعني ترميماً أقلّ.',
      'Sleep loss lowers **Testosterone**: a short-sleeping young man’s level matches someone **ten years older**, with poorer sperm quality. And much **Growth Hormone** is released in deep sleep — less sleep means less repair.'
    ) },
    { type: 'figure', id: 'fig10' },
    { type: 'figure', id: 'fig11' },
  ],
}

/* ===================== 7) Sleep Across the Lifespan ===================== */
export const lifespan = {
  slug: 'lifespan',
  icon: '⏳',
  title: L('النوم عبر مراحل العمر', 'Sleep Across the Lifespan'),
  lead: L(
    'من الرحم إلى الشيخوخة: بناء الدماغ، ثم صقله، ثم صيانته، ثم هشاشته — وكلّ مرحلة تخدم حاجتها.',
    'From womb to old age: building the brain, then refining, maintaining, and finally its fragility — each stage serving its need.'
  ),
  blocks: [
    { type: 'ul', items: [
      L('**في الرحم:** الجنين يقضي وقتاً هائلاً في **REM** يبلغ ذروته قبل الولادة — **مادّةُ بناء الدماغ** وتكوين المشابك.',
        '**In the womb:** the foetus spends enormous time in **REM**, peaking before birth — the **building material of the brain** and synapse formation.'),
      L('**الوليد:** ~**٥٠٪** من نومه REM (مقابل ~٢٠٪ للبالغ)، ونومه مجزّأ لأن ساعته لم تنضج.',
        '**The newborn:** ~**50%** of sleep is REM (vs ~20% in adults), and it is fragmented because the clock has not matured.'),
      L('**الطفولة:** تتناقص نسبة REM ويزداد **النوم العميق** — انتقالٌ من «بناء» الوصلات إلى **صقلها**.',
        '**Childhood:** REM share falls and **deep sleep** grows — a shift from “building” connections to **refining** them.'),
    ] },
    { type: 'h', text: L('المراهقة — المرحلة الحرجة', 'Adolescence — the critical stage') },
    { type: 'callout', variant: 'key', title: L('إزاحة الساعة للأمام', 'The clock shifts later'), text: L(
      'تنزاح ساعة المراهق نحو التأخّر **~٣ ساعات** — ليس كسلاً بل تحوّلٌ عصبيّ حقيقي (الميلاتونين يبدأ متأخّراً). إيقاظ مراهقٍ في الخامسة والربع صباحاً يعادل إيقاظ بالغٍ في الثالثة والربع فجراً. والنوم العميق يخدم نضج **القشرة الجبهية** وضبط النفس.',
      'A teenager’s clock shifts about **3 hours later** — not laziness but a real neural change (melatonin starts later). Waking a teen at 5:15am is like waking an adult at 3:15am. Deep sleep serves maturation of the **prefrontal cortex** and self-control.'
    ) },
    { type: 'p', text: L(
      'حرمان المراهقين (بمواعيد المدارس الباكرة) يرتبط بضعف التحصيل وحوادث السيارات وتراجع الصحّة النفسية — بل قد يظهر مع حرمان REM المديد أعراضٌ شبيهة بالذهان.',
      'Depriving teens (with early school start times) links to poorer achievement, car crashes and declining mental health — and prolonged REM loss can even bring psychosis-like symptoms.'
    ) },
    { type: 'h', text: L('الرشد والشيخوخة', 'Adulthood and old age') },
    { type: 'ul', items: [
      L('**الرشد:** نمطٌ ناضج ~**٨ ساعات** بتوازنٍ بين NREM وREM، ونظام الصيانة اليومية.',
        '**Adulthood:** a mature pattern of ~**8 hours**, balanced between NREM and REM — the daily maintenance system.'),
      L('**الشيخوخة:** كبار السنّ **لا يحتاجون نوماً أقلّ، بل يعجزون عن الحصول عليه**: تدهور النوم العميق، وتجزّؤ النوم، وتقدّم التوقيت (نعاسٌ واستيقاظٌ مبكّران).',
        '**Old age:** the elderly **don’t need less sleep — they can’t get it**: deep sleep declines, sleep fragments, and timing advances (earlier sleepiness and waking).'),
      L('العواقب: ضعف ذاكرة، وحلقة ألزهايمر المفرغة — لكن كثيراً منها **قابلٌ للتدخّل**.',
        'Consequences: weaker memory and the Alzheimer’s vicious circle — but much of it is **treatable**.'),
    ] },
  ],
}

/* ===================== 8) Dreams ===================== */
export const dreams = {
  slug: 'dreams',
  icon: '🌙',
  title: L('الأحلام', 'Dreams'),
  lead: L(
    'من الغموض إلى العلم: الدماغ الحالم، ومصدر الأحلام، ووظائفها، وقراءتها، والكوابيس.',
    'From mystery to science: the dreaming brain, the source of dreams, their functions, dream-reading and nightmares.'
  ),
  blocks: [
    { type: 'h', text: L('ما يحدث في الدماغ الحالم', 'What happens in the dreaming brain') },
    { type: 'ul', items: [
      L('**تُضيء أربع مناطق:** البصرية-الفراغية، والحركية، والهيبوكامبوس، والمراكز العاطفية (**اللوزة / Amygdala** بنشاطٍ **~٣٠٪ أكثر**).',
        '**Four regions light up:** visuo-spatial, motor, the hippocampus, and the emotional centres (the **Amygdala**, **~30% more** active).'),
      L('**تنطفئ القشرة الجبهية** (المنطق) — سبب لامنطقية الأحلام. و**ينعدم النورأدرينالين** تماماً.',
        'The **frontal cortex switches off** (logic) — why dreams are illogical. And **noradrenaline vanishes** entirely.'),
    ] },
    { type: 'image', src: clean('amygdala.png'), transparent: true, wide: true, alt: L('اللوزة الدماغية', 'The amygdala'),
      caption: L('اللوزة (Amygdala) — مركز العاطفة العميق الذي ينشط بنحو ٣٠٪ أكثر أثناء الحلم.', 'The Amygdala — the deep emotional centre, ~30% more active during dreaming.') },
    { type: 'callout', variant: 'note', title: L('مصدر الأحلام: العاطفة لا الأحداث', 'The source: emotion, not events'), text: L(
      'دراسات **ستيكغولد (Stickgold)**: **١–٢٪** فقط من الأحلام إعادةٌ لأحداثٍ محدّدة، بينما **٣٥–٥٥٪** من المواضيع العاطفية تظهر بقوّة — فالخيط الأحمر بين اليقظة والحلم عاطفيّ، ما يدحض «رقيب» فرويد.',
      '**Stickgold’s** studies: only **1–2%** of dreams replay specific events, while **35–55%** of emotional themes surface strongly — the thread between waking and dreaming is emotional, refuting Freud’s “censor.”'
    ) },
    { type: 'h', text: L('وظيفتان حقيقيتان', 'Two real functions') },
    { type: 'ol', items: [
      L('**المعالجة العاطفية:** بانعدام النورأدرينالين تُنزَع شحنة الذكرى مع بقائها (كارترايت: المكتئبون الذين حلموا بصدماتهم هم وحدهم من تعافوا).',
        '**Emotional processing:** with noradrenaline gone, the memory’s charge is stripped while it remains (Cartwright: only the depressed who dreamed of their trauma recovered).'),
      L('**الإبداع وحلّ المشكلات:** مندلييف (Mendeleev)، وأوتو لوفي (Otto Loewi)، ومكارتني (McCartney) وريتشاردز (Richards) — و«النوم على المشكلة» ضاعف الحلول (٦٠٪ مقابل ٢٠٪).',
        '**Creativity and problem-solving:** Mendeleev, Otto Loewi, McCartney and Richards — and “sleeping on a problem” doubled solutions (60% vs 20%).'),
    ] },
    { type: 'h', text: L('قراءة الأحلام، والأحلام الجليّة، والكوابيس', 'Dream-reading, lucid dreams and nightmares') },
    { type: 'ul', items: [
      L('**قراءة الأحلام:** تنبّأ فريق **كاميتاني (Kamitani)** بمحتوى الحلم من مسح الدماغ — أوّل «قراءة أحلام» (وقلقٌ أخلاقي).',
        '**Dream-reading:** the **Kamitani** team predicted dream content from brain scans — the first “dream reading” (and an ethical worry).'),
      L('**الأحلام الجليّة (Lucid Dreaming):** أقلّ من **٢٠٪** يتحكّمون بأحلامهم (أُثبت بـfMRI) — طليعةٌ تطوّرية؟',
        '**Lucid dreaming:** under **20%** can control their dreams (proven by fMRI) — an evolutionary vanguard?'),
      L('**الكوابيس وPTSD:** يبقى النورأدرينالين مرتفعاً فتتكرّر الكوابيس؛ **البرازوسين (Prazosin)** يعالجها بخفضه.',
        '**Nightmares and PTSD:** noradrenaline stays high so nightmares recur; **Prazosin** treats them by lowering it.'),
    ] },
  ],
}

/* ===================== 9) Animal Sleep ===================== */
export const animal = {
  slug: 'animal',
  icon: '🐬',
  title: L('نوم الحيوانات', 'Animal Sleep'),
  lead: L(
    'ظاهرةٌ كونيةٌ قديمة: لا كائنَ يُفلت من النوم، وعجائبه دليلٌ على ضرورته.',
    'A universal, ancient phenomenon: no creature escapes sleep, and its wonders prove its necessity.'
  ),
  blocks: [
    { type: 'p', text: L(
      'لم يُعثَر على كائنٍ حيٍّ لا ينام إطلاقاً — وهذه العموميّة دليلٌ على أن النوم وظيفةٌ حيوية لا غنى عنها، فالطبيعة لا تُبقي على سلوكٍ خطِرٍ (فقدان الوعي أمام المفترسات) لولا ضرورته. والنوم **أقدم من ملايين السنين**، سابقٌ للثدييات.',
      'No living creature has been found that never sleeps — and this universality is proof that sleep is an indispensable vital function; nature would not preserve so dangerous a behaviour (unconsciousness before predators) unless it were essential. Sleep is **millions of years old**, predating mammals.'
    ) },
    { type: 'h', text: L('النوم بنصف دماغ', 'Unihemispheric sleep') },
    { type: 'ul', items: [
      L('**الدلافين والحيتان** تنام بنصف دماغها والعين المقابلة مغلقة، بينما النصف الآخر يقظٌ ليتنفّس ويحذر — فلو نامت بدماغها كلّه لغرقت.',
        '**Dolphins and whales** sleep with half the brain while the opposite eye closes, the other half awake to breathe and stay alert — sleeping with the whole brain would drown them.'),
      L('**الطيور** تحرس الصفّ: الطرفية تُبقي نصف دماغها يقظاً وعيناً نحو الخطر، والوسطى تنام بدماغٍ كامل — وتتناوب.',
        '**Birds** guard the row: edge birds keep half the brain awake and one eye toward danger while central birds sleep fully — and they take turns.'),
      L('بعض **الطيور المهاجرة** تنام أثناء الطيران بلمحاتٍ قصيرة و/أو بنصف دماغ.',
        'Some **migrating birds** sleep in flight in brief snatches and/or unihemispherically.'),
    ] },
    { type: 'image', src: anat('half-sleeping-bird.jpg'), wide: true, alt: L('طائر ينام بنصف دماغ', 'A bird sleeping unihemispherically'),
      caption: L('النوم أحادي النصف الكروي — طائرٌ بعينٍ مفتوحة يحرس بينما ينام نصفُ دماغه.', 'Unihemispheric sleep — a bird keeps one eye open on guard while half its brain sleeps.') },
    { type: 'callout', variant: 'fact', title: L('«أثر الليلة الأولى» فينا', 'The “first-night effect” in us'), text: L(
      'حين تنام في مكانٍ جديد يبقى **نصف دماغك أكثر تيقّظاً** فتنام نوماً أخفّ — صدىً باهتٌ للنوم أحادي النصف عند الحيوانات. والدرس الأكبر: **الإنسان وحده يحرم نفسه من النوم عمداً**.',
      'In a new place, **half your brain stays more vigilant** and you sleep lighter — a faint echo of animal unihemispheric sleep. The larger lesson: **only humans deliberately deprive themselves of sleep**.'
    ) },
  ],
}

/* ===================== 10) Characters & Their Stories ===================== */
export const characters = {
  slug: 'characters',
  icon: '👥',
  title: L('الشخصيات وقصصها', 'Characters & Their Stories'),
  lead: L(
    'أبرز من وردت قصصهم في الكتاب: حالاتٌ مأساوية، وعلماء واكتشافات، وأمثلة أداء.',
    'The people whose stories fill the book: tragic cases, scientists and discoveries, and performance examples.'
  ),
  blocks: [
    { type: 'h', text: L('حالات وقصص مأساوية', 'Tragic cases and stories') },
    { type: 'people', people: [
      { img: port('kenneth-parks.jpg'), name: L('كينيث باركس', 'Kenneth Parks'), tag: L('«القاتل النائم»', 'The “sleepwalking killer”'),
        story: L('شابٌّ كنديٌّ في الثالثة والعشرين من عمره. في عام ١٩٨٧ نهض ليلاً وهو نائم، وقاد سيّارته نحو ٢٣ كيلومتراً إلى بيت حَمَويه، فقتل حماته وأصاب حماه بجروحٍ بالغة — ثم استيقظ في الطريق مذعوراً وسلّم نفسه للشرطة. ولكونه معروفاً بتاريخٍ عائليٍّ وشخصيٍّ طويلٍ مع **السير النومي** (الذي يحدث في النوم العميق لا في الأحلام)، قرّرت هيئة المحلّفين أنه لم يكن واعياً بأفعاله، فحكمت بـ**براءته** عام ١٩٨٨. قصّته المثال الأشهر على أن السير النومي فعلٌ لاواعٍ صادرٌ عن دماغٍ عالقٍ بين النوم العميق واليقظة.',
                 'A 23-year-old Canadian. In 1987 he arose at night while asleep, drove his car about 23 kilometres to his in-laws’ home, killed his mother-in-law and gravely injured his father-in-law — then woke on the way in horror and turned himself in to the police. Because he was known for a long family and personal history of **sleepwalking** (which occurs in deep NREM sleep, not in dreaming), the jury decided he had not been conscious of his acts and **acquitted** him in 1988. His story is the most famous example that sleepwalking is an unconscious act by a brain stuck between deep sleep and waking.') },
      { img: port('michael-corke.jpg'), name: L('مايكل كورك', 'Michael Corke'), tag: L('الذي مات من قلّة النوم', 'The man who died of lack of sleep'),
        story: L('معلّم موسيقى أمريكي، أصيب في نحو الأربعين من عمره بمرض **الأرق العائلي القاتل (FFI)** — اضطرابٌ وراثيٌّ نادرٌ ناجمٌ عن طفرةٍ في جين بروتين البريون (Prion) تهاجم المهاد (بوّابة الدماغ الحسّية) وتثقبه، فيصبح النوم مستحيلاً. توقّف كورك عن النوم كلياً، وتدهورت حالته الجسدية والعقلية على مدى نحو ستّة أشهر حتى **توفّي وعمره ٤٢ سنة**. قصّته أقوى دليلٍ في الكتاب على أن الحرمان الكامل من النوم **يقتل** فعلاً.',
                 'An American music teacher who, at around forty, developed **Fatal Familial Insomnia (FFI)** — a rare hereditary disorder caused by a mutation in the prion-protein gene that attacks the thalamus (the brain’s sensory gate) and perforates it, making sleep impossible. Corke stopped sleeping entirely, and his physical and mental state deteriorated over about six months until he **died at the age of 42**. His story is the book’s strongest proof that total sleep deprivation truly **kills**.') },
      { img: port('william-halsted.jpg'), name: L('وليام هالستد', 'William Halsted'), tag: L('الجرّاح المدمن على الكوكايين', 'The cocaine-addicted surgeon'),
        story: L('جرّاحٌ أمريكيٌّ بارز، يُعدّ من مؤسّسي الجراحة الحديثة، وأنشأ نظام **«الإقامة» (Residency)** لتدريب الأطباء في مستشفى جونز هوبكنز عام ١٨٨٩. كان في أثناء أبحاثه على التخدير الموضعي قد جرّب الكوكايين على نفسه فأدمنه، وظلّ يصارع الإدمان (ثم المورفين) سرّاً معظم حياته المهنية. والمفارقة المأساوية أن إدمانه للكوكايين — الذي يُبقي متعاطيه مستيقظاً — هو ما شكّل قناعته بأن الطبيب يجب أن يعمل ساعاتٍ طويلةً بلا نوم، فأسّس نموذج المناوبات المرهِقة الذي **ما زال يُطبَّق على الأطباء المقيمين حتى اليوم** رغم ثبوت خطره على المرضى.',
                 'A prominent American surgeon, considered one of the founders of modern surgery, who created the **residency** system for training doctors at Johns Hopkins Hospital in 1889. During his research on local anaesthesia he had experimented with cocaine on himself and became addicted, and he secretly battled that addiction (and later morphine) for most of his career. The tragic irony is that his cocaine addiction — which keeps the user awake — is what shaped his conviction that a doctor should work long hours without sleep, so he founded the exhausting-shift model that **is still applied to resident doctors today**, despite its proven danger to patients.') },
      { img: port('menachem-begin.jpg'), name: L('مناحيم بيغن', 'Menachem Begin'), tag: L('النوم كأداة تعذيب', 'Sleep as an instrument of torture'),
        story: L('رئيس وزراء إسرائيل لاحقاً، وصف في مذكّراته تجربته حين كان سجيناً لدى الاستخبارات السوفيتية (KGB)، وكيف استُخدم **الحرمان من النوم** أسلوبَ تعذيبٍ ضدّه (سمّاه جلّادوه «إدارة النوم»). يستشهد ووكر بشهادته لبيان أن الحرمان من النوم سلاحُ تعذيبٍ قاسٍ — لكنه فاشلٌ حتى كأداة، لأنه يضاعف احتمال الاعترافات الكاذبة فلا يعطي معلوماتٍ موثوقة.',
                 'Later prime minister of Israel, he described in his memoirs his experience as a prisoner of Soviet intelligence (the KGB) and how **sleep deprivation** was used as a method of torture against him (his interrogators called it “sleep management”). Walker cites his testimony to show that sleep deprivation is a cruel weapon of torture — yet a failed one even as a tool, because it multiplies the likelihood of false confessions and so yields no reliable information.') },
    ] },
    { type: 'h', text: L('علماء واكتشافات', 'Scientists and discoveries') },
    { type: 'people', people: [
      { img: port('eugene-aserinsky.jpg'), name: L('يوجين أسيرينسكي وناثانيال كلايتمان', 'Eugene Aserinsky & Nathaniel Kleitman'), tag: L('مكتشفا REM (١٩٥٢)', 'Discoverers of REM (1952)'),
        story: L('في عام ١٩٥٢ لاحظ الباحثان أن نوم الإنسان يمرّ بفتراتٍ تتحرّك فيها العينان بسرعةٍ تحت الجفنين ويصبح نشاط الدماغ فيها شبيهاً باليقظة. هذا الاكتشاف قسم النوم إلى نوعين (**REM** و**NREM**) وأطلق علم النوم الحديث بأسره. (وكلايتمان نفسه صاحب تجربة كهف «ماموث كيف» الشهيرة التي عزل فيها نفسه تحت الأرض لدراسة الإيقاع اليومي).',
                 'In 1952 the two researchers noticed that human sleep passes through periods in which the eyes move rapidly beneath the lids and brain activity becomes wake-like. This discovery split sleep into two types (**REM** and **NREM**) and launched the whole of modern sleep science. (Kleitman himself was behind the famous Mammoth Cave experiment, in which he isolated himself underground to study the circadian rhythm.)') },
      { img: port('nathaniel-kleitman.jpg'), name: L('ناثانيال كلايتمان في كهف ماموث', 'Nathaniel Kleitman in Mammoth Cave'), tag: L('الأب المؤسّس لعلم النوم', 'The founding father of sleep science'),
        story: L('(الأب المؤسّس لعلم النوم) — أجرى عام ١٩٣٨ تجربةً شهيرة عزل فيها نفسه ومساعده في أعماق كهف «ماموث كيف» المظلم أسابيع، ليكتشف أن الجسم يحافظ على إيقاعٍ يوميٍّ داخليٍّ قريبٍ من ٢٤ ساعة حتى بغياب ضوء الشمس تماماً.',
                 '(The founding father of sleep science.) In 1938 he ran a famous experiment in which he isolated himself and his assistant deep inside the dark Mammoth Cave for weeks, discovering that the body maintains an internal daily rhythm close to 24 hours even in the complete absence of sunlight.') },
      { img: port('dmitri-mendeleev.jpg'), name: L('ديمتري مندلييف', 'Dmitri Mendeleev'), tag: L('الجدول الدوري في المنام', 'The periodic table in a dream'),
        story: L('الكيميائيّ الروسيّ الذي عجز سنواتٍ عن ترتيب العناصر الكيميائية، حتى **رأى في حلمه (سنة ١٨٦٩)** جدولاً تنتظم فيه العناصر كلٌّ في مكانه — فاستيقظ ودوّنه، فكان **الجدول الدوري**. مثالٌ على قدرة نوم الأحلام (REM) على ربط المعلومات المتناثرة في أنماطٍ إبداعية جديدة.',
                 'The Russian chemist who for years failed to arrange the chemical elements, until he **saw in a dream (in 1869)** a table in which each element fell into its place — he woke and wrote it down, and it became the **periodic table**. An example of REM dream sleep’s power to link scattered information into new creative patterns.') },
      { img: port('otto-loewi.jpg'), name: L('أوتو لوفي', 'Otto Loewi'), tag: L('تجربة نوبل من حلم', 'A Nobel experiment from a dream'),
        story: L('عالم أعصابٍ حلم بتجربةٍ على قلبَي ضفدعين تُثبت أن التواصل بين الخلايا العصبية **كيميائيٌّ** (عبر النواقل العصبية) لا كهربائيٌّ فقط. أجرى التجربة كما رآها في منامه، فأثبت فكرته وحاز لاحقاً **جائزة نوبل**. مثالٌ آخر على إبداع نوم الأحلام.',
                 'A neuroscientist who dreamed of an experiment on two frog hearts that proved communication between nerve cells is **chemical** (via neurotransmitters), not only electrical. He performed the experiment exactly as he had dreamed it, proved his idea, and later won the **Nobel Prize**. Another example of the creativity of dream sleep.') },
      { img: port('paul-mccartney.jpg'), name: L('بول مكارتني وكيث ريتشاردز', 'Paul McCartney & Keith Richards'), tag: L('ألحانٌ من النوم', 'Melodies from sleep'),
        story: L('يستشهد ووكر بموسيقيَّين شهيرين: **بول مكارتني** (من فرقة البيتلز) الذي جاءته ألحان أغنيتَي «Yesterday» و«Let It Be» في نومه، و**كيث ريتشاردز** (من فرقة رولينغ ستونز) الذي استيقظ ذات ليلة (عام ١٩٦٥) ليجد أنه سجّل في نومه افتتاحية أغنية «Satisfaction» الشهيرة. أمثلةٌ على أن الحلم حاضنةٌ للإبداع الفنّي.',
                 'Walker cites two famous musicians: **Paul McCartney** (of the Beatles), to whom the melodies of “Yesterday” and “Let It Be” came in his sleep, and **Keith Richards** (of the Rolling Stones), who woke one night (in 1965) to find he had recorded the famous opening riff of “Satisfaction” in his sleep. Examples that dreaming is an incubator of artistic creativity.') },
      { img: port('mary-shelley.jpg'), name: L('ماري شيلي', 'Mary Shelley'), tag: L('«فرانكنشتاين» من رؤيا', '“Frankenstein” from a vision'),
        story: L('الأديبة التي استلهمت روايتها الشهيرة **«فرانكنشتاين»** (عام ١٨١٦) من مشهدٍ شبيهٍ بالحلم رأته في حالةٍ بين النوم واليقظة. مثالٌ أدبيٌّ على الإبداع النابع من عقل الحلم.',
                 'The author who drew her famous novel **“Frankenstein”** (1816) from a dream-like scene she saw in a state between sleep and waking. A literary example of creativity springing from the dreaming mind.') },
      { img: port('thomas-edison.jpg'), name: L('توماس إديسون', 'Thomas Edison'), tag: L('قيلولة «الكرات الفولاذية»', 'The “steel-ball” nap'),
        story: L('المخترع الشهير كان يزدري النوم علناً، لكنه سرّاً اعتمد تقنية قيلولةٍ ذكية: يجلس على كرسيٍّ ممسكاً كراتٍ فولاذية فوق صحونٍ معدنية، فإذا غفا وبدأ يدخل الحلم ارتخت يده فسقطت الكرات محدثةً ضجّةً توقظه — فيدوّن الأفكار الإبداعية التي التقطها عقله في تلك اللحظة («الفجوة العبقرية» بين اليقظة والنوم).',
                 'The famous inventor publicly scorned sleep, yet secretly relied on a clever napping technique: he would sit in a chair holding steel balls over metal pans, so that if he dozed off and began to enter dreaming his hand would relax and the balls would drop, making a clatter that woke him — and he would jot down the creative ideas his mind had caught in that moment (the “genius gap” between wake and sleep).') },
    ] },
    { type: 'h', text: L('علماء النوم وشخصيات الأداء', 'Sleep scientists and performance figures') },
    { type: 'people', people: [
      { img: port('sigmund-freud.jpg'), name: L('زيغموند فرويد', 'Sigmund Freud'), tag: L('الرائد المُخطئ', 'The mistaken pioneer'),
        story: L('عالم النفس الذي أعاد في كتابه «تفسير الأحلام» (١٨٩٩) الأحلامَ بحقٍّ إلى **الدماغ** (لا الآلهة والأرواح) — إسهامٌ مهمّ. لكن نظريته (أن رغباتٍ مكبوتةً تمرّ عبر «رقيبٍ» فتخرج متنكّرةً في الحلم) **غير قابلةٍ للاختبار العلمي**. يشبّه ووكر تفسيرات محلّليه المتضاربة للحلم الواحد بقراءة الأبراج — تفسيرٌ عموميٌّ يناسب أيّ أحد.',
                 'The psychologist who, in his book “The Interpretation of Dreams” (1899), rightly returned dreams to the **brain** (not to gods and spirits) — an important contribution. But his theory (that repressed desires pass through a “censor” and emerge disguised in the dream) is **not scientifically testable**. Walker likens his analysts’ conflicting interpretations of the same dream to astrology — a generic reading that fits anyone.') },
      { img: port('rosalind-cartwright.jpg'), name: L('روزاليند كارترايت', 'Rosalind Cartwright'), tag: L('عالمة أحلام الصدمات', 'Scientist of trauma dreams'),
        story: L('باحثةٌ يعدّها ووكر رائدةً في مقام فرويد. درست أحلام المكتئبين الذين يمرّون بطلاقٍ مؤلم، وتابعتهم سنةً كاملة، فاكتشفت أن من حلموا **بصدماتهم العاطفية نفسها** هم وحدهم من تعافوا — دليلٌ على أن REM يعالج الجروح النفسية.',
                 'A researcher whom Walker considers a pioneer on a par with Freud. She studied the dreams of depressed people going through a painful divorce and followed them for a full year, discovering that only those who dreamed of **their own emotional trauma** recovered — evidence that REM heals psychological wounds.') },
      { img: port('robert-stickgold.jpg'), name: L('روبرت ستيكغولد', 'Robert Stickgold'), tag: L('باحث الذاكرة والأحلام', 'Memory & dreams researcher'),
        story: L('عالمٌ يتكرّر ذكره كثيراً؛ صاحب دراساتٍ محورية أثبتت أن مصدر الأحلام هو **العاطفة لا الأحداث** (١–٢٪ فقط من الأحلام إعادةٌ لأحداثٍ محدّدة)، وأن النوم يرسّخ المهارات (تجربة النقر بالأصابع)، وأن حلم REM بمحتوى المهمّة يحسّن الأداء أضعافاً (تجربة المتاهة الافتراضية).',
                 'A frequently cited scientist behind pivotal studies proving that the source of dreams is **emotion, not events** (only 1–2% of dreams replay specific events), that sleep consolidates skills (the finger-tapping study), and that REM dreaming about a task improves performance many times over (the virtual-maze study).') },
      { img: port('charles-czeisler.jpg'), name: L('تشارلز تشايزلر', 'Charles Czeisler'), tag: L('عالم الإيقاع اليومي والضوء', 'Circadian and light scientist'),
        story: L('من كبار الباحثين في تأثير الضوء والإيقاع اليومي، وله دورٌ في كشف أثر الإنارة الاصطناعية ومصابيح LED على الميلاتونين والساعة البيولوجية، وفي الدعوة لإصلاح مواعيد العمل والنوبات.',
                 'A leading researcher into the effect of light and the circadian rhythm, with a role in revealing how artificial lighting and LED lamps affect melatonin and the biological clock, and in advocating reform of work and shift schedules.') },
      { img: port('daniel-kripke.jpg'), name: L('دانييل كريبكي', 'Daniel Kripke'), tag: L('الباحث المستقلّ في الأقراص المنوّمة', 'The independent sleeping-pill researcher'),
        story: L('عالمٌ لا صلة له بشركات الأدوية، أجرى دراسةً واسعة (٢٠١٢) كشفت أن مستخدمي الأقراص المنوّمة أكثر عرضةً للوفاة بنحو **٤٫٦ مرّة** وأعلى خطراً للسرطان — من أقوى الأدلّة ضدّ الاعتماد على الحبوب.',
                 'A scientist with no ties to drug companies, he conducted a large study (2012) revealing that sleeping-pill users are about **4.6×** more likely to die and at higher cancer risk — among the strongest evidence against relying on the pills.') },
      { img: port('andre-iguodala.jpg'), name: L('أندريه إيغودالا', 'André Iguodala'), tag: L('لاعب كرة السلة', 'The basketball player'),
        story: L('لاعبٌ محترفٌ في الدوري الأمريكي (فريق ووريَرز)، تُستخدم بياناتُ نومه مثالاً حيّاً: حين نام أكثر، تحسّنت دقّة تصويبه، وزاد زمن لعبه الفعّال، وقلّت أخطاؤه وإصاباته — تجسيدٌ لأثر النوم المباشر على الأداء الرياضي (انظر الشكل ١١).',
                 'A professional NBA player (the Warriors) whose sleep data is used as a living example: when he slept more, his shooting accuracy improved, his effective playing time increased, and his errors and injuries dropped — an embodiment of sleep’s direct effect on athletic performance (see Figure 11).') },
      { img: port('allan-rechtschaffen.jpg'), name: L('آلان رِختشافن', 'Allan Rechtschaffen'), tag: L('صاحب تجربة الفئران', 'The rat-deprivation experiment'),
        story: L('الباحث الذي أجرى في جامعة شيكاغو (١٩٨٣) واحدةً من أكثر التجارب مأساويةً وإثارةً للجدل الأخلاقي: حرمان الفئران من النوم كلياً، فماتت جميعها خلال نحو ١٥ يوماً (بنفس سرعة الموت جوعاً)، وتبيّن أن سبب موتها **إنتانٌ دموي** من بكتيريا أمعائها. (آخر تجربةٍ من نوعها).',
                 'The researcher who ran, at the University of Chicago (1983), one of the most tragic and ethically controversial experiments: totally depriving rats of sleep, so that they all died within about 15 days (as fast as death by starvation), the cause turning out to be **septicaemia** from their own gut bacteria. (The last experiment of its kind.)') },
      { img: port('randy-gardner.jpg'), name: L('راندي غاردنر', 'Randy Gardner'), tag: L('الرقم القياسي في السهر', 'The record for staying awake'),
        story: L('يشير الكتاب إلى تاريخ محاولات تسجيل أرقامٍ قياسية في البقاء مستيقظاً — وهي محاولاتٌ خطيرة توقّفت موسوعة غينيس عن الاعتراف بها في الثمانينيات لخطرها على الصحّة. (تبقى قصص السهر القياسي شاهداً على حدود احتمال الجسم البشري لقلّة النوم).',
                 'The book points to the history of attempts to set records for staying awake — dangerous attempts that the Guinness Book of Records stopped recognizing in the 1980s because of their danger to health. (The record-sleeplessness stories remain a testament to the limits of the human body’s tolerance for lack of sleep.)') },
    ] },
  ],
}
