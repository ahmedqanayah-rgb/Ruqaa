const L = (ar, en) => ({ ar, en })
const anat = (f) => `./images/anatomical/${f}`
const clean = (f) => `./images/clean/${f.replace(/\.\w+$/, '')}.webp`

/* ===================== 3) REM Sleep ===================== */
export const rem = {
  slug: 'rem',
  icon: '🌀',
  title: L('نوم حركة العين السريعة (REM)', 'REM Sleep'),
  lead: L(
    'دماغٌ مشتعل داخل جسدٍ مشلول: اكتشافه، وفيزيولوجيته، ووظائفه الثلاث الكبرى.',
    'A brain on fire inside a paralyzed body: its discovery, physiology, and three great functions.'
  ),
  blocks: [
    { type: 'h', text: L('ما هو REM ومتى اكتُشِف', 'What REM is, and when it was discovered') },
    { type: 'p', text: L(
      '«نوم حركة العين السريعة (Rapid Eye Movement)» — نسبةً إلى الحركات السريعة للعينين تحت الجفنين. اكتشفه عام **١٩٥٢** الباحثان **آسيرينسكي (Aserinsky) وكلايتمان (Kleitman)** حين أدركا أن النوم يتناوب بين نوعين مختلفين جذرياً — فكان مولد علم النوم الحديث. يُلقّب بـ**«النوم المتناقض (Paradoxical Sleep)»** لأنه يجمع دماغاً نشطاً جداً داخل جسدٍ مشلول تماماً.',
      '“Rapid Eye Movement” sleep — named for the fast eye movements under closed lids. Discovered in **1952** by **Aserinsky and Kleitman**, who realised sleep alternates between two radically different types — the birth of modern sleep science. It is nicknamed **“Paradoxical Sleep”** because it pairs a highly active brain with a completely paralyzed body.'
    ) },

    { type: 'h', text: L('فيزيولوجيا REM', 'REM physiology') },
    { type: 'ul', items: [
      L('**نشاط عالٍ في أربع مناطق:** البصرية-الفراغية، والحركية، والهيبوكامبوس (Hippocampus)، والمراكز العاطفية (اللوزة/Amygdala) — التي تنشط **~٣٠٪ أكثر** من اليقظة.',
        '**High activity in four regions:** visuo-spatial, motor, the Hippocampus, and the emotional centres (the Amygdala) — which fire about **30% more** than in waking.'),
      L('**انطفاء القشرة الجبهية الأمامية (Prefrontal Cortex):** مركز المنطق يُعزَل — سبب لامنطقية الأحلام.',
        '**The Prefrontal Cortex switches off:** the rational-planning centre is taken offline — the reason dreams are illogical.'),
      L('**الكيمياء — الأهمّ:** ينخفض **النورأدرينالين (Noradrenaline)** إلى الصفر تقريباً — الوقت الوحيد في اليوم الذي يخلو فيه الدماغ منه (مفتاح وظيفة REM العلاجية).',
        '**Chemistry — the key point:** **Noradrenaline** falls to nearly zero — the only time in 24 hours the brain is free of it (the key to REM’s therapeutic function).'),
      L('**في الجسد:** شلل عضلي تامّ (Atonia) — تبقى العينان والحجاب الحاجز وحدهما — مع فقدان تنظيم الحرارة وتذبذب القلب والتنفّس.',
        '**In the body:** total muscle paralysis (Atonia) — only the eyes and diaphragm keep working — plus loss of temperature regulation and fluctuating heart rate and breathing.'),
    ] },
    { type: 'figure', id: 'brainNetworks' },
    { type: 'image', src: clean('prefrontal.png'), transparent: true, wide: true, alt: L('القشرة الجبهية الأمامية', 'The prefrontal cortex'),
      caption: L('القشرة الجبهية الأمامية (Prefrontal Cortex) — المنطقة «المديرة» للمنطق، تنطفئ أثناء الحلم فتغدو الأحلام لامنطقية.', 'The Prefrontal Cortex — the rational “executive” region — switches off during dreaming, making dreams illogical.') },

    { type: 'callout', variant: 'fact', title: L('توزيع REM عبر الليل', 'REM across the night'), text: L(
      '**REM يتركّز في النصف الثاني من الليل**، وتطول فتراته نحو الصباح. لذلك من ينام ٦ ساعات بدل ٨ يخسر **حصّةً غير متناسبة من REM** — واقتطاع ساعتين من آخر النوم قد يمحو معظم نصيبك من الأحلام.',
      '**REM is concentrated in the second half of the night**, its bouts lengthening toward morning. So sleeping 6 hours instead of 8 loses a **disproportionate share of REM** — cutting the last two hours can erase most of your dreaming.'
    ) },

    { type: 'h', text: L('وظائف REM الثلاث', 'REM’s three functions') },
    { type: 'ol', items: [
      L('**المعالجة العاطفية:** بانعدام النورأدرينالين تُعاد معالجة الذكريات في بيئةٍ «آمنة» فتُنزَع شحنتها الحارقة مع بقائها. «ليس الزمن ما يشفي الجروح، بل الزمن الذي نمضيه في الحلم». (عقار **البرازوسين / Prazosin** يخفض النورأدرينالين فيعالج كوابيس ما بعد الصدمة / PTSD).',
        '**Emotional processing:** with noradrenaline absent, memories are reprocessed in a “safe” chemistry — their painful charge stripped while the memory itself remains. “Time does not heal wounds; it is time spent in dream sleep that heals.” (**Prazosin** lowers noradrenaline and treats PTSD nightmares.)'),
      L('**الإبداع والترابط الذكي:** يمزج REM المعارف بطرقٍ مجرّدة، فيرفع حلّ الأناغرام **١٥–٣٥٪**، و«النوم على المشكلة» ضاعف اكتشاف القاعدة الخفيّة ثلاث مرّات (**٦٠٪ مقابل ٢٠٪**).',
        '**Creativity and intelligent association:** REM fuses knowledge in abstract ways, boosting anagram solving by **15–35%**, and “sleeping on a problem” tripled discovery of a hidden rule (**60% vs 20%**).'),
      L('**المعايرة العاطفية-الاجتماعية:** يعيد ضبط قراءتنا لتعابير الوجه؛ وبعد حرمان REM يقرأ الدماغ الوجوه الودّية كتهديد.',
        '**Social-emotional calibration:** it re-tunes our reading of facial expressions; after REM loss the brain reads friendly faces as threats.'),
    ] },

    { type: 'h', text: L('REM والأحلام واضطراباته', 'REM, dreams and disorders') },
    { type: 'ul', items: [
      L('مصدر الأحلام **العاطفة لا الأحداث:** **١–٢٪** فقط إعادةٌ لأحداث محدّدة، بينما **٣٥–٥٥٪** مواضيع عاطفية.',
        'Dreams come from **emotion, not events:** only **1–2%** replay specific events, while **35–55%** are emotional themes.'),
      L('**اضطراب سلوك نوم REM (RBD):** تفشل آليّة الشلل فيمثّل الشخص أحلامه — وقد يكون علامة مبكّرة لأمراضٍ تنكّسية (باركنسون). يختلف عن **السير النومي** الذي يحدث في NREM.',
        '**REM Behaviour Disorder (RBD):** the paralysis fails and the person acts out dreams — possibly an early sign of neurodegeneration (Parkinson’s). Different from **sleepwalking**, which occurs in NREM.'),
      L('**ما يكبت REM:** الكحول (أقوى كوابحه)، والأقراص المنوّمة ومضادّات الاكتئاب، وقلّة النوم واقتطاع الصباح.',
        '**What suppresses REM:** alcohol (its strongest suppressor), sleeping pills and antidepressants, general sleep loss and cutting the morning.'),
    ] },
  ],
}

/* ===================== 4) NREM Sleep ===================== */
export const nrem = {
  slug: 'nrem',
  icon: '🌊',
  title: L('نوم انعدام حركة العين السريعة (NREM)', 'NREM Sleep'),
  lead: L(
    'النوم العميق المُرمِّم: مراحله وموجاته البطيئة، ووظائفه في الذاكرة والتنظيف والترميم.',
    'The restorative deep sleep: its stages and slow waves, and its roles in memory, cleaning and repair.'
  ),
  blocks: [
    { type: 'h', text: L('مراحل NREM الثلاث', 'The three NREM stages') },
    { type: 'ul', items: [
      L('**N1:** نوم انتقالي خفيف جداً — قد تصاحبه ارتجاجة عضلية (Hypnic Jerk).',
        '**N1:** very light transitional sleep — sometimes with a muscle twitch (Hypnic Jerk).'),
      L('**N2:** نوم خفيف مستقرّ، تظهر فيه **المغازل النومية (Sleep Spindles)** (ترسيخ ذاكرة وحماية النوم) و**مركّبات K (K-complexes)**.',
        '**N2:** stable light sleep, showing **Sleep Spindles** (memory consolidation and sleep protection) and **K-complexes**.'),
      L('**N3 — النوم العميق / الموجة البطيئة (Slow-Wave Sleep):** أعمق المراحل، تهيمن فيه **الموجات البطيئة (Slow Waves)** المتزامنة — بطلة الترميم والذاكرة والتنظيف.',
        '**N3 — deep / slow-wave sleep:** the deepest stage, dominated by synchronized **slow waves** — the champion of repair, memory and cleaning.'),
    ] },
    { type: 'callout', variant: 'note', title: L('الموجات البطيئة توقيع NREM', 'Slow waves — NREM’s signature'), text: L(
      'موجاتٌ بطيئة قويّة واسعة تنشأ من حوار **القشرة والمهاد (Thalamus)**، وتعمل كـ«موجات حَمْل» تنقل الذكريات. **جودتها تتدهور مع العمر** (خاصةً في الفصّ الجبهي)، وهذا يفسّر جزءاً كبيراً مما نظنّه «شيخوخة ذاكرة» حتمية.',
      'Powerful, broad slow waves born from a dialogue between the **cortex and Thalamus**, acting as “carrier waves” that ferry memories. **Their quality declines with age** (especially in the frontal lobe), explaining much of what we assume is inevitable “memory ageing.”'
    ) },
    { type: 'figure', id: 'fig9' },

    { type: 'h', text: L('وظائف NREM', 'NREM’s functions') },
    { type: 'ol', items: [
      L('**ترسيخ الذاكرة ونقلها:** «نقل ملفّات» من المخزن المؤقّت (**الهيبوكامبوس / Hippocampus**) إلى الدائم (**القشرة / Cortex**) — فيُثبّت الأمس ويُفرَّغ المخزن لتعلّم الغد.',
        '**Memory consolidation and transfer:** a “file transfer” from the temporary store (the **Hippocampus**) to the permanent one (the **Cortex**) — fixing yesterday and freeing the buffer for tomorrow’s learning.'),
      L('**التنظيف الدماغي (الجهاز اللمفاوي الدبقي / Glymphatic System):** تتّسع المسافات بين الخلايا فيجرف السائلُ الفضلاتِ السامّة — ومنها **بيتا-أميلويد (Beta-amyloid)** المرتبط بألزهايمر.',
        '**Brain cleaning (the Glymphatic System):** the spaces between cells widen so fluid flushes toxic waste — including the **Beta-amyloid** linked to Alzheimer’s.'),
      L('**الترميم الجسدي:** دعم المناعة، وخفض ضغط الدم والنبض، وتنظيم السكر والشهية وإفراز هرمون النموّ.',
        '**Physical repair:** supporting immunity, lowering blood pressure and heart rate, regulating glucose and appetite and releasing growth hormone.'),
    ] },
    { type: 'image', src: clean('glymphatic.png'), transparent: true, wide: true, alt: L('الجهاز اللمفاوي الدبقي', 'The glymphatic system'),
      caption: L('الجهاز اللمفاوي الدبقي (Glymphatic System) — يتّسع الحيّز بين الخلايا في النوم العميق فيغسل السائل الدماغي الفضلات السامّة.', 'The Glymphatic System — in deep sleep the space between cells widens so fluid flushes out toxic waste.') },

    { type: 'h4', text: L('كيف يعمل التنظيف الدماغي خطوةً بخطوة', 'How the brain’s cleaning works, step by step') },
    { type: 'p', text: L(
      'اكتشفت عالمة الأعصاب **ميكِن نيدرغارد (Maiken Nedergaard)** في جامعة روتشستر أن للدماغ نظام صرفٍ خاصاً به يعمل عبر خلايا **الغِلْيا (Glia)** — سُمّي «الجهاز اللمفاوي الدبقي (Glymphatic System)» لأنه يجمع بين خلايا الغِلْيا ووظيفةٍ تشبه الجهاز اللمفاوي في بقيّة الجسم. وطوال اليقظة يتراكم في نسيج الدماغ سيلٌ من الفضلات الأيضية الناتجة عن نشاط الخلايا العصبية؛ أمّا في النوم العميق فيجري تنظيفها على النحو التالي:',
      'The neuroscientist **Maiken Nedergaard** at the University of Rochester discovered that the brain has its own drainage network operating through **glial (Glia)** cells — named the “glymphatic system” because it marries the glia with a lymphatic-like function found elsewhere in the body. Throughout waking, a tide of metabolic waste from neuronal activity builds up in the brain tissue; during deep sleep it is cleared as follows:'
    ) },
    { type: 'ol', items: [
      L('**تتقلّص خلايا الغِلْيا حتى ٦٠٪** أثناء النوم العميق (NREM)، فيتّسع الحيّز الخلالي (المسافات بين الخلايا العصبية) اتّساعاً كبيراً.',
        '**Glial cells shrink by up to 60%** during deep (NREM) sleep, dramatically widening the interstitial space — the gaps between neurons.'),
      L('يندفع **السائل الدماغي الشوكي (Cerebrospinal Fluid)** عبر هذه القنوات المتّسعة، فيغسل النسيج كما يشطف الماءُ إسفنجةً متّسخة.',
        'The **cerebrospinal fluid** surges through these widened channels, rinsing the tissue the way water flushes a dirty sponge.'),
      L('يجرف هذا الغسل الفضلاتِ الأيضية السامّة — وأخطرها بروتين **بيتا-أميلويد (Beta-amyloid)** وبروتين **تاو (Tau)**، وكلاهما مرتبطٌ بمرض **ألزهايمر (Alzheimer’s)**.',
        'This flushing sweeps away toxic metabolic waste — most dangerously the **beta-amyloid** and **tau** proteins, both linked to **Alzheimer’s disease**.'),
      L('كفاءة هذا الغسل أعلى بـ**١٠–٢٠ ضعفاً** أثناء النوم العميق مقارنةً باليقظة — فالتنظيف الحقيقي يحدث حين ننام لا حين نصحو.',
        'This cleaning is **10–20× more efficient** during deep sleep than in waking — the real housekeeping happens while we sleep, not while we’re awake.'),
    ] },
    { type: 'callout', variant: 'warn', title: L('الحلقة المفرغة الخطيرة', 'A dangerous vicious circle'), text: L(
      'تنشأ هنا دورةٌ خبيثة ثنائية الاتّجاه: **قلّة النوم العميق ← تراكم بيتا-أميلويد ← تلفٌ يصيب المناطق الجبهية المولّدة للنوم العميق نفسها ← نومٌ عميق أقلّ ← طردٌ أقلّ للأميلويد…** وهكذا. والفئران المحرومة من النوم تُظهر تراكم أميلويد **فورياً**. يلخّص ووكر ذلك بعبارة: «اليقظة إضرارٌ منخفض السوية بالدماغ، والنوم معالجةٌ عصبية».',
      'This creates a two-way vicious circle: **less deep sleep → beta-amyloid builds up → damage to the very frontal regions that generate deep sleep → even less deep sleep → even less amyloid clearance…** and so on. Sleep-deprived mice show amyloid build-up **immediately**. Walker sums it up: “Wakefulness is low-level brain damage, while sleep is neurological sanitation.”'
    ) },

    { type: 'callout', variant: 'warn', title: L('حرمان NREM لا يُعوَّض', 'NREM loss is not recoverable'), text: L(
      'بلا نوم عميق كافٍ لا تُنقَل ذكريات اليوم فتضيع (جزء من عجز الـ**٤٠٪**)، وتتراكم السموم الدماغية. و**النوم ليس بنكاً**: لا يمكن ادّخاره ولا استرجاع كامل ما فات منه.',
      'Without enough deep sleep, the day’s memories are not transferred and are lost (part of the **40%** deficit), and brain toxins accumulate. And **sleep is not a bank**: it cannot be stockpiled nor fully recovered.'
    ) },

    { type: 'h', text: L('التكامل مع REM', 'Complementarity with REM') },
    { type: 'p', text: L(
      'النوعان **شريكان لا متنافسان**: **NREM العميق** يفرز ويثبّت (يحفظ «الأشجار»)، و**REM** يدمج ويصهر إبداعياً (يرسم «الغابة»). تعاقبهما (العميق أوّلاً ثم الأحلام) تسلسلٌ وظيفي — ولهذا **الليلة الكاملة** ضرورية لا مجرّد «عدد ساعات».',
      'The two are **partners, not rivals**: deep **NREM** sorts and fixes (keeps the “trees”), while **REM** integrates and fuses creatively (draws the “forest”). Their order (deep first, then dreams) is a functional sequence — which is why a **full night** matters, not just a count of hours.'
    ) },
  ],
}

/* ===================== 5) Sleep & Memory ===================== */
export const memory = {
  slug: 'memory',
  icon: '🧠',
  title: L('النوم والذاكرة', 'Sleep & Memory'),
  lead: L(
    'النوم شريكُ الذاكرة قبل التعلّم وبعده: التهيئة، والتثبيت، ثم الدمج والفهم.',
    'Sleep is memory’s partner before and after learning: priming, consolidation, then integration and understanding.'
  ),
  blocks: [
    { type: 'p', text: L(
      'يثبت الكتاب أن النوم **شريكٌ أساسي في كلّ مرحلة** من مراحل الذاكرة الثلاث: **قبل التعلّم** (يهيّئ الدماغ للاستقبال)، و**بعد التعلّم** (يُثبّت الذكريات)، و**بعد التثبيت** (يدمجها في شبكة الفهم).',
      'Sleep is an **essential partner in all three memory phases**: **before learning** (priming the brain to receive), **after learning** (consolidating memories), and **after consolidation** (integrating them into a network of understanding).'
    ) },

    { type: 'h', text: L('أولاً: النوم قبل التعلّم', 'First: sleep before learning') },
    { type: 'p', text: L(
      'الذكريات الجديدة تُخزَّن مؤقّتاً في **الهيبوكامبوس (Hippocampus)** — «صندوق وارد» محدود السعة. في تجربة ووكر، أظهر الفريق المحروم من النوم **عجزاً يبلغ ٤٠٪** في تكوين ذكريات جديدة، وكشف مسح الدماغ (fMRI) أن الهيبوكامبوس بدا «مغلقاً» لديهم. والنوم — خاصةً **المغازل النومية (Sleep Spindles)** في N2 — «يفرّغ» الصندوق ويستعيد سعة التعلّم (أثبتته تجارب القيلولة).',
      'New memories are held temporarily in the **Hippocampus** — an “inbox” of limited capacity. In Walker’s experiment, the sleep-deprived group showed a **40% deficit** in forming new memories, and fMRI showed their hippocampus looked “shut.” Sleep — especially the **Sleep Spindles** of N2 — “empties” the inbox and restores learning capacity (shown by nap experiments).'
    ) },
    { type: 'image', src: clean('hippocampus-cortex.png'), transparent: true, wide: true, alt: L('نقل الذاكرة من الهيبوكامبوس إلى القشرة', 'Memory transfer from hippocampus to cortex'),
      caption: L('نقل الذاكرة: النوم العميق يرحّل الذكريات من المخزن المؤقّت (الهيبوكامبوس / Hippocampus) إلى المخزن الدائم (القشرة / Cortex).', 'Memory transfer: deep sleep moves memories from the temporary store (Hippocampus) to the permanent store (Cortex).') },

    { type: 'h', text: L('ثانياً: النوم بعد التعلّم', 'Second: sleep after learning') },
    { type: 'ul', items: [
      L('**تجربة جينكينز ودالنباخ (١٩٢٤):** من ناموا نسوا أقلّ بكثير — أوّل دليل أن النوم **يحمي** الذاكرة.',
        '**Jenkins & Dallenbach (1924):** those who slept forgot far less — the first evidence that sleep **protects** memory.'),
      L('**النقل والتقوية:** النوم العميق (NREM) يرحّل الذكريات من الهيبوكامبوس إلى القشرة ويقوّيها.',
        '**Transfer and strengthening:** deep NREM moves memories from hippocampus to cortex and strengthens them.'),
      L('**إعادة التنشيط الموجّه (Targeted Memory Reactivation):** تذكير الدماغ بذكرى (كرائحةٍ) أثناء النوم يقوّيها تحديداً.',
        '**Targeted Memory Reactivation:** cueing a memory (e.g., a scent) during sleep strengthens that specific memory.'),
      L('**تعزيز النوم العميق يعزّز الذاكرة:** التحفيز الكهربائي البطيء (tDCS) والسرير الهزّاز زادا الموجات البطيئة فحسّنا الحفظ.',
        '**Boosting deep sleep boosts memory:** slow oscillating stimulation (tDCS) and a rocking bed increased slow waves and improved retention.'),
    ] },
    { type: 'imggrid', images: [
      { src: clean('memory-consolidation.png'), transparent: true, alt: L('ترسيخ الذاكرة أثناء النوم', 'Memory consolidation during sleep'),
        caption: L('ترسيخ الذاكرة أثناء النوم.', 'Memory consolidation during sleep.') },
      { src: clean('memory-chart.png'), transparent: true, alt: L('انتقال موقع الذاكرة عبر الليالي', 'Memory site shifting over nights'),
        caption: L('انتقال موقع استرجاع الذكرى تدريجياً من الهيبوكامبوس إلى القشرة عبر الليالي.', 'Memory retrieval gradually shifting from the hippocampus to the cortex over successive nights.') },
    ] },

    { type: 'h', text: L('ثالثاً: المهارات الحركية والدمج الإبداعي', 'Third: motor skills and creative integration') },
    { type: 'callout', variant: 'fact', title: L('تجربة النقر بالأصابع (ستيكغولد)', 'The finger-tapping study (Stickgold)'), text: L(
      'من ناموا تحسّنوا **~٢٠٪ في السرعة و~٣٥٪ في الدقّة** دون تدريبٍ إضافي — والتحسّن حدث في **المرحلة N2 المتركّزة في ساعتَي الصباح الأخيرتين**. «التدريب + ليلة نوم هو ما يصنع الإتقان». ومن يقتطع صباحه يخسر تحديداً ترسيخ المهارات.',
      'Sleepers improved by **~20% in speed and ~35% in accuracy** with no extra practice — the gain occurring in **N2, concentrated in the last two morning hours**. “Practice plus a night of sleep is what makes perfect.” Cutting the morning specifically loses skill consolidation.'
    ) },
    { type: 'p', text: L(
      'وبينما يقوّي NREM الذكريات منفصلةً، يقوم **REM** بدمجها واستخراج **القواعد والمعنى**: الاستنتاج المنطقي المتعدّي (إلنبوغن)، و«النوم على المشكلة» (فاغنر). النوم العميق يحفظ «الأشجار»، وREM يرسم «الغابة».',
      'And while NREM strengthens memories in isolation, **REM** integrates them and extracts **rules and meaning**: transitive inference (Ellenbogen) and “sleeping on a problem” (Wagner). Deep sleep keeps the “trees”; REM draws the “forest.”'
    ) },

    { type: 'h', text: L('الذاكرة والشيخوخة وألزهايمر', 'Memory, ageing and Alzheimer’s') },
    { type: 'p', text: L(
      'يتراجع **النوم العميق ذو الموجة البطيئة** كمّاً ونوعاً مع التقدّم في العمر — يبدأ الانحدار من أواخر العشرينات، وبحلول العقد السابع قد يفقد المرء **٧٠–٨٠٪** من نومه العميق، وأشدّ ما يكون هذا الفقد في مناطق **الفصّ الجبهي**. وبما أن هذا النوع من النوم هو أداة ترسيخ الذاكرة، فإن كثيراً ممّا نظنّه «ضعف ذاكرةٍ حتميّاً مع الشيخوخة» هو في جوهره **نتيجةٌ مباشرة لتدهور نوم الموجة البطيئة** — فالموجات الضعيفة تعجز عن ترحيل الذكريات وتثبيتها.',
      '**Deep, slow-wave sleep** declines in both quantity and quality with age — the fall begins in the late twenties, and by the seventies a person may lose **70–80%** of their deep sleep, most severely in the **frontal-lobe** regions. And because this kind of sleep is the tool of memory consolidation, much of what we assume is “inevitable memory ageing” is in essence a **direct result of declining slow-wave sleep** — weak waves cannot ferry and fix memories.'
    ) },
    { type: 'p', text: L(
      'أثبت **ووكر وفريقه** ذلك بقصّةٍ من ثلاثة أجزاء: (١) مناطق الدماغ الأكثر **ضموراً** مع السنّ هي **نفسها** المناطق المولّدة للنوم العميق (وسط الفصّ الجبهي) بتطابقٍ شبه تامّ؛ (٢) المسنّون يفقدون قدراً كبيراً من نومهم العميق؛ (٣) والأهمّ أن التغيّرين **مترابطان**: كلّما زاد الضمور في تلك المنطقة زادت خسارة النوم العميق، وكان الأكثر فقداناً له هم **الأسوأ نسياناً** في اختبارات الصباح التالي.',
      '**Walker and his team** proved this in a three-part story: (1) the brain regions that **atrophy** most with age are the **same** regions that generate deep sleep (the medial frontal lobe), in near-perfect overlap; (2) the elderly lose a large share of their deep sleep; and (3) crucially, the two changes are **linked**: the more atrophy in that region, the greater the deep-sleep loss — and those who lost the most deep sleep were the **worst at remembering** in next-morning tests.'
    ) },
    { type: 'callout', variant: 'warn', title: L('الحلقة المفرغة مع ألزهايمر', 'The vicious circle with Alzheimer’s'), text: L(
      'يتراكم بروتينا **بيتا-أميلويد (Beta-amyloid)** و**تاو (Tau)** في المنطقة الجبهية نفسها التي تولّد النوم العميق. فيتشكّل طريقٌ ذو اتّجاهين: قلّة النوم العميق ← تراكم الأميلويد (لأن التنظيف الدماغي يتعطّل) ← تلفٌ يصيب مولّد النوم العميق ← نومٌ عميق أقلّ… وهكذا. أثبت **ووكر ووليام جاغست (William Jagust)** أن **اضطراب النوم العميق هو «الحلقة المفقودة»** بين تراكم الأميلويد وفقدان الذاكرة. والنتيجة مزدوجة: تراكم السموم **و** ضعف ترسيخ الذاكرة معاً.',
      'The **beta-amyloid** and **tau** proteins accumulate in the very frontal region that generates deep sleep. This creates a two-way road: less deep sleep → amyloid build-up (because the brain’s cleaning stalls) → damage to the deep-sleep generator → even less deep sleep… and so on. **Walker and William Jagust** showed that **disrupted deep sleep is the “missing link”** between amyloid build-up and memory loss. The result is twofold: toxins accumulate **and** memory consolidation weakens, together.'
    ) },
    { type: 'callout', variant: 'key', title: L('نقطة أمل: قابلٌ للتدخّل', 'A note of hope: it’s treatable'), text: L(
      'الخبر الجيّد أن كثيراً من هذا التدهور **قابلٌ للتدخّل**. فتعزيز النوم العميق لدى كبار السنّ (بالنظافة النومية، والنشاط البدني، والحدّ من العوامل المفسدة، بل بالتحفيز الكهربائي أو الصوتي للموجات البطيئة) يمثّل فرصةً واعدة لحماية الذاكرة. وتشير دراساتٌ إلى أن معالجة اضطرابات النوم قد تُبطئ التدهور الإدراكي وتؤخّر ألزهايمر سنواتٍ عدّة — بما يجعل النوم نقطة وقايةٍ محتملة، لا مجرّد عَرَض.',
      'The good news is that much of this decline is **treatable**. Boosting deep sleep in older adults (through sleep hygiene, physical activity, cutting disruptors, and even electrical or acoustic stimulation of the slow waves) is a promising way to protect memory. Studies suggest that treating sleep disorders can slow cognitive decline and delay Alzheimer’s by several years — making sleep a potential point of prevention, not merely a symptom.'
    ) },
    { type: 'image', src: clean('beta-amyloid.png'), transparent: true, wide: true,
      alt: L('تشكّل لويحات بيتا-أميلويد', 'Formation of beta-amyloid plaques'),
      caption: L('تراكم **بيتا-أميلويد (Beta-amyloid)** على العصبونات وتدرّجه من وحداتٍ مفردة (Monomers) إلى لويحةٍ سامّة (Amyloid plaque).', 'Beta-amyloid accumulating on neurons and progressing from single monomers to a toxic amyloid plaque.') },
    { type: 'image', src: clean('alzheimers.png'), transparent: true, wide: true,
      alt: L('التغيّرات في دماغ ألزهايمر', 'Changes in the Alzheimer’s brain'),
      caption: L('مقارنة بين دماغٍ سليم ودماغٍ مصابٍ بألزهايمر (Alzheimer’s): تقلّص القشرة والهيبوكامبوس واتّساع البطينات.', 'A healthy brain vs. an Alzheimer’s brain: the cortex and hippocampus shrink and the ventricles enlarge.') },
  ],
}
