const L = (ar, en) => ({ ar, en })

/* ===================== 11) Shocking Facts ===================== */
export const shocking = {
  slug: 'shocking',
  icon: '⚡',
  title: L('الحقائق الصادمة والغريبة', 'Shocking Facts'),
  lead: L(
    'أكثر المعلومات إثارةً للدهشة ومخالفةً للحدس — مثالية لإشعال النقاش.',
    'The most surprising, counter-intuitive facts — perfect to spark discussion.'
  ),
  blocks: [
    { type: 'h', text: L('الموت والخطر المباشر', 'Death and direct danger') },
    { type: 'ul', items: [
      L('**اليقظة الطويلة تجعلك «ثملاً قانونياً»:** بعد **١٩–٢٤ ساعة** بلا نوم يعادل أداؤك تجاوزَ الحدّ القانوني للسُّكْر.',
        '**Long wakefulness makes you “legally drunk”:** after **19–24 hours** awake your performance equals being over the legal drink-drive limit.'),
      L('**القيادة تحت النعاس تقتل أكثر من الكحول والمخدّرات معاً** — بسبب «النُّويمات الدقيقة (Microsleeps)».',
        '**Drowsy driving kills more than alcohol and drugs combined** — because of “microsleeps.”'),
      L('**يمكن أن تموت من قلّة النوم:** الأرق العائلي القاتل يوقف النوم كلياً فيموت المصاب خلال ~١٠ أشهر.',
        '**You can die of sleep loss:** Fatal Familial Insomnia stops sleep entirely and the patient dies within ~10 months.'),
      L('**تغيير الساعة صيفاً (خسارة ساعة) يرفع النوبات القلبية** — وربحها خريفاً يخفضها.',
        '**Springing the clock forward (losing an hour) raises heart attacks** — falling back lowers them.'),
      L('**كارثتا تشيرنوبل وإكسون فالديز** جذرُهما قلّة نومٍ عند عمّالٍ في ساعات الفجر.',
        '**Chernobyl and Exxon Valdez** were rooted in the sleep loss of workers in the pre-dawn hours.'),
    ] },
    { type: 'figure', id: 'fig12' },

    { type: 'h', text: L('الجسد والمرض', 'Body and disease') },
    { type: 'ul', items: [
      L('**ليلة نوم ٤ ساعات تُسقط الخلايا القاتلة ٧٠٪.** **نوم قليل قبل اللقاح يُبطل نصف مفعوله.**',
        '**A 4-hour night drops NK cells 70%.** **Short sleep before a vaccine halves its effect.**'),
      L('**أسبوع من نوم ٥ ساعات يجعل شابّاً سليماً «ما قبل السكري».** **قلّة النوم تُشيخ خصوبة الرجل عشر سنوات.**',
        '**A week of 5-hour sleep makes a healthy young man “pre-diabetic.”** **Sleep loss ages male fertility by a decade.**'),
      L('**تنام قليلاً فتأكل أكثر — وتشتهي الأسوأ** (ليبتين↓ غريلين↑). وجملة ووكر: **«كلّما قصُر نومك، قصُرت حياتك».**',
        '**Sleep less and you eat more — and crave the worst** (leptin↓ ghrelin↑). Walker’s line: **“The shorter your sleep, the shorter your life.”**'),
    ] },

    { type: 'h', text: L('عالم النوم والحيوان والأحلام', 'The world of sleep, animals and dreams') },
    { type: 'ul', items: [
      L('**الدلافين والبطّ تنام بنصف دماغ**، وأنت تنام «بنصف يقظة» أوّل ليلة في مكانٍ جديد.',
        '**Dolphins and ducks sleep with half a brain**, and you sleep “half-awake” your first night in a new place.'),
      L('**كلّ الكائنات تنام، والإنسان وحده يحرم نفسه عمداً.** ومن يحتاجون ٦ ساعات فقط (طفرة DEC2) **أندر من أن يُضربوا بالبرق**.',
        '**Every creature sleeps; only humans deprive themselves deliberately.** True 6-hour sleepers (the DEC2 mutation) are **rarer than being struck by lightning**.'),
      L('**صار بالإمكان «قراءة» محتوى الحلم من مسح الدماغ**، و**«النوم على المشكلة» يضاعف حلّها ثلاث مرّات**.',
        '**Dream content can now be “read” from brain scans**, and **“sleeping on a problem” triples solving it**.'),
      L('**«الاختطاف الفضائي» تفسيره شلل النوم** (يصيب ١ من ٤ أصحاء)، و**القيلولة ٢٦ دقيقة رفعت الأداء ٣٤٪** (ناسا).',
        '**“Alien abduction” is explained by sleep paralysis** (1 in 4 healthy people), and a **26-minute nap raised performance 34%** (NASA).'),
    ] },

    { type: 'h', text: L('المجتمع والمؤسسات', 'Society and institutions') },
    { type: 'ul', items: [
      L('**من أسّس نظام «الطبيب المقيم» بلا نوم كان مدمن كوكايين**؛ والمقيمون في نوبات ٣٠ ساعة يخطئون التشخيص **٤٦٠٪** أكثر.',
        '**The founder of sleepless residency was a cocaine addict**; residents on 30-hour shifts make **460%** more diagnostic errors.'),
      L('**تأخير موعد المدرسة رفع درجات SAT ٢١٢ نقطة** (إيدينا)، وخفض حوادث المراهقين **٧٠٪** (تيتون).',
        '**Delaying school start raised SAT scores 212 points** (Edina) and cut teen crashes **70%** (Teton).'),
      L('**تكلفة قلّة النوم على أمريكا ٤١١ مليار دولار سنوياً** — أكثر من ٢٪ من الناتج المحلّي.',
        '**Sleep loss costs the US $411 billion a year** — more than 2% of GDP.'),
    ] },
  ],
}

/* ===================== 12) Common Myths ===================== */
export const myths = {
  slug: 'myths',
  icon: '❓',
  title: L('المغالطات الشائعة', 'Common Myths'),
  lead: L(
    'مفاهيم خاطئة يفنّدها ووكر — اطرح كلّاً كسؤال «صح أم خطأ؟» قبل كشف الردّ.',
    'Misconceptions Walker debunks — pose each as “true or false?” before revealing the answer.'
  ),
  blocks: [
    { type: 'myth',
      claim: L('«أستطيع تعويض نومي الفائت في العطلة».', '“I can make up lost sleep on the weekend.”'),
      reply: L('النوم **ليس بنكاً**؛ لا تدّخره ولا تسترجع كامل ما فاتك من نومٍ عميق. بعض الضرر **لا يُعوَّض**.',
               'Sleep is **not a bank**; you can’t stockpile it or fully recover lost deep sleep. Some damage is **irreversible**.') },
    { type: 'myth',
      claim: L('«بعض الناس يكفيهم ٤–٥ ساعات، وأنا منهم».', '“Some people need only 4–5 hours, and I’m one of them.”'),
      reply: L('طفرة **DEC2** نادرةٌ جداً (أقلّ من ١٪)؛ ومعظم من يظنّون أنفسهم منها **مخطئون** — أداؤهم متدهور لكنهم فقدوا القدرة على الحكم عليه.',
               'The **DEC2** mutation is extremely rare (<1%); most who think they have it are **wrong** — impaired but unable to judge it.') },
    { type: 'myth',
      claim: L('«القدماء والقبائل ينامون أقلّ، فالثماني ساعات أسطورة».', '“Ancient and tribal peoples sleep less, so 8 hours is a myth.”'),
      reply: L('تلك القبائل تمنح نفسها **فرصة نومٍ ٧–٨٫٥ ساعات**، ومتوسّط أعمارها ٥٨ سنة وسبب وفاتها الأوّل العدوى (ضعف مناعي).',
               'Those tribes give themselves a **7–8.5 hour sleep opportunity**; they live to ~58 on average, dying mainly of infection (immune weakness).') },
    { type: 'myth',
      claim: L('«الكحول (كأسٌ قبل النوم) يساعدني أنام».', '“A drink before bed helps me sleep.”'),
      reply: L('الكحول **مهدّئ لا مُنوّم**؛ يجزّئ نومك بصحواتٍ لا تشعر بها و**يكبت REM** — فتستيقظ أقلّ انتعاشاً.',
               'Alcohol is a **sedative, not a sleep aid**; it fragments sleep with awakenings you don’t notice and **suppresses REM** — you wake less refreshed.') },
    { type: 'myth',
      claim: L('«الأقراص المنوّمة تعطيني نوماً جيداً».', '“Sleeping pills give me good sleep.”'),
      reply: L('الأقراص تمنح **تخديراً لا نوماً**، ومستخدموها أكثر عرضةً للوفاة **~٤٫٦ مرّة**. البديل الأفضل **العلاج السلوكي (CBT-I)**.',
               'Pills give **sedation, not sleep**, and their users are about **4.6×** more likely to die. The better option is **CBT-I**.') },
    { type: 'myth',
      claim: L('«القهوة مساءً لا تؤثّر فيّ».', '“Evening coffee doesn’t affect me.”'),
      reply: L('حتى لو نمت، الكافيين (عمر نصفٍ ~٥–٦ ساعات) **يقلّل عمق نومك** ويحرمك جزءاً من النوم العميق.',
               'Even if you fall asleep, caffeine (half-life ~5–6 h) **reduces your sleep depth** and robs you of deep sleep.') },
    { type: 'myth',
      claim: L('«النوم حالة سكونٍ — الدماغ يُطفأ».', '“Sleep is shutdown — the brain switches off.”'),
      reply: L('النوم حالةٌ **نشطة ومنظّمة**: موجاتٌ متزامنة تنقل الذاكرة وتنظّف الدماغ في العميق، ودماغٌ نشِطٌ في REM.',
               'Sleep is **active and highly organized**: synchronized waves ferry memory and clean the brain in deep sleep, and the brain is active in REM.') },
    { type: 'myth',
      claim: L('«السير أثناء النوم تمثيلٌ للأحلام».', '“Sleepwalking is acting out dreams.”'),
      reply: L('السير النومي يحدث في **النوم العميق (NREM)** لا في REM؛ وتمثيل الأحلام اضطرابٌ مختلف (**RBD**) يحدث في REM.',
               'Sleepwalking occurs in **deep NREM**, not REM; acting out dreams is a different disorder (**RBD**) that occurs in REM.') },
    { type: 'myth',
      claim: L('«السهر للمذاكرة أذكى من النوم».', '“Pulling an all-nighter beats sleeping.”'),
      reply: L('السهر **يخذلك مرّتين**: قبله عجز **٤٠٪** في الترميز، وبعده لا تثبيت. والمحروم أقلّ إبداعاً وأكثر خطأً.',
               'It **fails you twice**: a **40%** encoding deficit before, and no consolidation after. The sleep-deprived are less creative and more error-prone.') },
    { type: 'myth',
      claim: L('«قلّة النوم علامة قوّةٍ وتفانٍ».', '“Sleeping little is a badge of strength and dedication.”'),
      reply: L('قلّة النوم **عاملُ خطرٍ** لا بطولة — على الصحّة والأداء والأخلاق. استعِد نومك **بلا خجلٍ ولا وصمة كسل**.',
               'Sleeping little is a **risk factor**, not heroism — for health, performance and even ethics. Reclaim your sleep **without shame**.') },
    { type: 'myth',
      claim: L('«مواعيد المدرسة الباكرة تعوّد المراهقين على الانضباط».', '“Early school start times build discipline in teens.”'),
      reply: L('سهر المراهق **إزاحةٌ عصبية حقيقية (~٣ ساعات)** لا كسل. المواعيد الباكرة تضرّ تحصيله وسلامته وصحّته النفسية.',
               'A teen’s late nights are a real **neural shift (~3 hours)**, not laziness. Early starts harm achievement, safety and mental health.') },
    { type: 'myth',
      claim: L('«القيلولة النهارية علامة كسل».', '“Napping is a sign of laziness.”'),
      reply: L('القيلولة القصيرة **تجدّد التعلّم وترفع الأداء** — قيلولة **٢٦ دقيقة** رفعت الأداء **٣٤٪** (ناسا).',
               'A short nap **renews learning and lifts performance** — a **26-minute** nap raised performance **34%** (NASA).') },
    { type: 'myth',
      claim: L('«كبار السنّ يحتاجون نوماً أقلّ بطبيعتهم».', '“Older people naturally need less sleep.”'),
      reply: L('كبار السنّ **لا يحتاجون أقلّ، بل يعجزون عن الحصول عليه**؛ وتدهوره مرتبطٌ بالذاكرة وألزهايمر — وكثيرٌ منه قابلٌ للتدخّل.',
               'The elderly **don’t need less — they can’t get it**; the decline links to memory and Alzheimer’s — and much of it is treatable.') },
  ],
}

/* ===================== 14) Session Materials & Discussion (LAST) ===================== */
export const discussion = {
  slug: 'discussion',
  icon: '💬',
  title: L('مواد الجلسة والنقاش', 'Session Materials & Discussion'),
  lead: L(
    'بعد مراجعة كلّ المواد، يبدأ الحوار: أسئلة نقاش موزّعة على محاور، ونقاط مراجعة سريعة.',
    'After reviewing all the material, the conversation begins: themed discussion questions and quick review points.'
  ),
  blocks: [
    { type: 'h', text: L('أسئلة النقاش', 'Discussion questions') },
    { type: 'h4', text: L('محور الفهم والاستيعاب', 'Understanding') },
    { type: 'ol', items: [
      L('ما النظامان اللذان يتحكّمان في توقيت نومنا، وكيف يتفاعلان لتحديد شعورنا بالنعاس؟',
        'What two systems control the timing of our sleep, and how do they interact to determine sleepiness?'),
      L('ما الفرق الجوهري في الوظيفة بين النوم العميق (NREM) ونوم الأحلام (REM)؟ ولماذا «الليلة الكاملة» ضرورية؟',
        'What is the fundamental functional difference between deep NREM and dreaming REM? And why is a “full night” necessary?'),
      L('لماذا يعدّ النوم شريكاً للذاكرة **قبل** التعلّم لا بعده فقط؟',
        'Why is sleep a partner to memory **before** learning, not only after?'),
    ] },
    { type: 'h4', text: L('محور المفاجأة والصدمة', 'Surprise and shock') },
    { type: 'ol', items: [
      L('أيّ حقيقةٍ في الكتاب صدمتك أكثر من غيرها؟ ولماذا؟', 'Which fact in the book shocked you most, and why?'),
      L('كيف غيّرت فكرة «القيادة تحت النعاس أخطر من الكحول» نظرتك للسهر؟',
        'How did “drowsy driving is more dangerous than drunk driving” change your view of staying up?'),
      L('هل فاجأك أن الأقراص المنوّمة لا تمنح نوماً حقيقياً وترفع خطر الوفاة؟',
        'Were you surprised that sleeping pills don’t give real sleep and raise mortality risk?'),
    ] },
    { type: 'h4', text: L('محور الجدل والرأي', 'Debate and opinion') },
    { type: 'ol', items: [
      L('يقترح ووكر تأخير مواعيد بدء المدارس. هل تتّفق؟ وما العقبات العملية؟',
        'Walker proposes delaying school start times. Do you agree? What are the practical obstacles?'),
      L('هل على أماكن العمل أن تكافئ النوم (كتجربة Aetna) أو تعدّل مواعيدها؟ أم إن ذلك مبالغة؟',
        'Should workplaces reward sleep (like Aetna) or adjust hours? Or is that excessive?'),
      L('«قراءة محتوى الأحلام» صارت ممكنة مخبرياً. ما حدودها الأخلاقية؟',
        'Reading dream content is now lab-possible. What are its ethical limits?'),
      L('هل يجب أن يُعامَل الحرمان من النوم كقضية صحّة عامّة كالتدخين؟',
        'Should sleep deprivation be treated as a public-health issue, like smoking?'),
    ] },
    { type: 'h4', text: L('محور التطبيق الشخصي', 'Personal application') },
    { type: 'ol', items: [
      L('ما العادة النومية الأولى التي تنوي تغييرها بعد قراءة الكتاب؟',
        'What is the first sleep habit you intend to change after reading the book?'),
      L('أيّ «مفسدات النوم» (الشاشات، الكافيين، الكحول، الحرارة) أكثرها تأثيراً في نومك؟',
        'Which “sleep spoiler” (screens, caffeine, alcohol, heat) affects your sleep most?'),
      L('هل جرّبت شيئاً من الكتاب فعلاً (كتثبيت موعد الاستيقاظ أو تبريد الغرفة)؟ وما النتيجة؟',
        'Have you actually tried something from the book (fixed wake time, cooler room)? What happened?'),
    ] },
    { type: 'h4', text: L('محور نقدي (لتوازن الحوار)', 'A critical lens (for balance)') },
    { type: 'ol', items: [
      L('يُنتقَد الكتاب أحياناً بأنه يبالغ في بعض الأرقام أو يعرض الأدلّة بانتقائية. هل لمست ذلك؟',
        'The book is sometimes criticised for overstating some numbers or presenting evidence selectively. Did you sense that?'),
      L('هل نصائح الكتاب قابلة للتطبيق في واقع حياتنا المزدحمة؟ أم إنها مثالية؟',
        'Are the book’s recommendations applicable in our busy lives? Or are they idealistic?'),
    ] },

    { type: 'h', text: L('نقاط المراجعة السريعة', 'Quick review points') },
    { type: 'callout', variant: 'key', title: L('آلية النوم', 'Sleep mechanism'), text: L(
      'نظامان يحكمان التوقيت: **الإيقاع اليومي** (ساعة ~٢٤ ساعة وربع، تُضبَط بالضوء) و**ضغط النوم** (الأدينوزين، والكافيين يحجب مستقبلاته). الميلاتونين **يوقّت** لا يولّد. دوراتٌ من **~٩٠ دقيقة**: العميق أوّل الليل وREM آخره.',
      'Two systems govern timing: the **circadian rhythm** (a ~24h15m clock, set by light) and **sleep pressure** (adenosine; caffeine blocks its receptors). Melatonin **times**, doesn’t generate. Cycles of **~90 min**: deep sleep early, REM late.'
    ) },
    { type: 'callout', variant: 'key', title: L('الذاكرة والمناعة', 'Memory and immunity'), text: L(
      'السهر قبل التعلّم → **عجز ٤٠٪**. ليلة نوم ٤ ساعات → الخلايا القاتلة **٧٠٪** أقلّ. نوم <٥ ساعات → الزكام **~٤٫٥ مرّة**. العمل الليلي المزمن **محتمَل التسبّب بالسرطان**.',
      'All-nighter before learning → a **40% deficit**. A 4-hour night → NK cells down **70%**. Sleep <5h → colds **~4.5×**. Chronic night work is **probably carcinogenic**.'
    ) },
    { type: 'callout', variant: 'key', title: L('المجتمع والحلول', 'Society and solutions'), text: L(
      'تأخير المدارس: SAT حتى **٢١٢ نقطة**، وحوادث المراهقين حتى **٧٠٪** أقلّ. مقيمو ٣٠ ساعة: أخطاء **٤٦٠٪**. كلفة أمريكا **٤١١ مليار/سنة**. الأقراص المنوّمة: وفاة **٤٫٦ مرّة**؛ والبديل **CBT-I**.',
      'Delaying school: SAT up to **212 points**, teen crashes down to **70%**. 30-hour residents: **460%** more errors. US cost **$411B/yr**. Sleeping pills: **4.6×** mortality; the alternative is **CBT-I**.'
    ) },
    { type: 'quote', text: L(
      '**النوم الكافي أقوى استثمارٍ للصحّة بلا كلفة. الكمّية والتوقيت والاكتمال كلّها تهمّ. والحرمان لا يُعوَّض.**',
      '**Sufficient sleep is the most powerful cost-free health investment. Quantity, timing and completeness all matter. And deprivation is not recoverable.**'
    ) },
  ],
}
