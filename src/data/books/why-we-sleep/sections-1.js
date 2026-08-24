const L = (ar, en) => ({ ar, en })
const anat = (f) => `./images/anatomical/${f}`
// background-removed cut-outs, now WebP; callers still pass the old .png name.
const clean = (f) => `./images/clean/${f.replace(/\.\w+$/, '')}.webp`

/* ===================== 2) Complete Sleep Mechanism ===================== */
export const mechanism = {
  slug: 'mechanism',
  icon: '⚙️',
  title: L('آلية النوم الكاملة', 'Complete Sleep Mechanism'),
  lead: L(
    'كيف ينظّم الجسمُ النومَ، وما الذي يحدث خلاله مرحلةً مرحلة، ولماذا، وما عواقب اختلاله.',
    'How the body regulates sleep, what happens stage by stage, why, and the consequences when it breaks down.'
  ),
  blocks: [
    { type: 'h', text: L('نظامان يتحكّمان في توقيت النوم', 'Two systems control sleep timing') },
    { type: 'p', text: L(
      'يُحكَم النومُ واليقظةُ بنظامين مستقلَّين يعملان معاً لكنهما منفصلان: **الإيقاع اليومي (Circadian Rhythm)** (يحدّد *متى* نميل إلى النوم أو اليقظة على مدار الأربع والعشرين ساعة)، و**ضغط النوم (Sleep Pressure)** (يحدّد *مقدار* حاجتنا إلى النوم بحسب طول مدّة يقظتنا).',
      'Sleep and wake are governed by two independent systems that work together but separately: the **Circadian Rhythm** (which sets *when* we tend toward sleep or wake across 24 hours) and **Sleep Pressure** (which sets *how much* we need sleep depending on how long we have been awake).'
    ) },
    { type: 'h4', text: L('أولاً: الإيقاع اليومي', 'First: the Circadian Rhythm') },
    { type: 'ul', items: [
      L('**الساعة الرئيسية:** تقع في **النواة فوق التصالبية (SCN – Suprachiasmatic Nucleus)** داخل الوطاء (Hypothalamus)، وتُطلق إيقاعاً داخلياً مدّته **~٢٤ ساعة وربع** — لذلك تحتاج «ضبطاً» يومياً.',
        'The **master clock** sits in the **Suprachiasmatic Nucleus (SCN)** within the Hypothalamus, running an internal rhythm of about **24 hours and 15 minutes** — so it needs daily re-setting.'),
      L('**كيف تُضبَط:** أقوى إشارة ضبط هي **الضوء**؛ مستقبلات في الشبكية أشدّ حساسيةً **للضوء الأزرق قصير الموجة** (ما يجعل شاشات LED مؤذيةً ليلاً).',
        '**How it’s set:** the strongest cue is **light**; retinal receptors are most sensitive to **short-wavelength blue light** (which makes LED screens harmful at night).'),
      L('**الميلاتونين (Melatonin):** تفرزه **الغدة الصنوبرية (Pineal Gland)** عند الظلام؛ دوره **توقيت** بدء النوم لا توليده — «جرس البداية» لا اللاعب.',
        '**Melatonin:** released by the **Pineal Gland** at darkness; its role is to **time** sleep onset, not generate it — the “starter gun,” not the runner.'),
      L('**درجة الحرارة الداخلية:** يجب أن تنخفض **~١°م** لبدء النوم (الغرفة المثلى **~١٨٫٣°م / ٦٥°ف**).',
        '**Core body temperature** must drop about **1°C** to begin sleep (ideal room ~**18.3°C / 65°F**).'),
      L('**النمط الزمني (Chronotype):** يختلف وراثياً — «طيور نهارية» و«بوم ليلي»؛ والمراهقون لديهم إزاحةٌ للأمام **~٣ ساعات**.',
        '**Chronotype** varies genetically — “larks” and “owls”; adolescents are shifted **~3 hours** later.'),
    ] },
    { type: 'image', src: clean('brain-regions.png'), transparent: true, wide: true,
      alt: L('نظرة عامة على مناطق الدماغ والمهاد', 'Brain regions overview and the thalamus'),
      caption: L('مناطق الدماغ الرئيسية والمهاد (Thalamus) — حيث تقع أنظمة تنظيم النوم.', 'The main brain regions and the Thalamus — where the sleep-regulating systems sit.') },
    { type: 'image', src: clean('light-pathway.png'), transparent: true, wide: true,
      alt: L('مسار الضوء من الشبكية إلى النواة فوق التصالبية', 'Light pathway from retina to the SCN'),
      caption: L('مسار الضوء: الشبكية تنقل معلومة النهار/الليل إلى النواة فوق التصالبية (SCN) فتُضبَط الساعة الداخلية مع دورة الشمس.', 'The light pathway: the retina carries the day/night signal to the Suprachiasmatic Nucleus (SCN), syncing the internal clock with the sun.') },

    { type: 'figure', id: 'fig1' },
    { type: 'figure', id: 'fig2' },

    { type: 'h4', text: L('ثانياً: ضغط النوم والأدينوزين', 'Second: sleep pressure and adenosine') },
    { type: 'p', text: L(
      'منذ لحظة الاستيقاظ يتراكم **الأدينوزين (Adenosine)** في الدماغ، فيتعاظم «ضغط النوم». بعد ~١٦ ساعة يقظة يبلغ ذروته فيصعب مقاومة النوم. و**الكافيين (Caffeine)** يعمل عبر **حجب مستقبلات الأدينوزين** — لا يزيل المادّة بل يُخفي إشارتها (تمويه للنعاس)، وعمر نصفه ~٥–٦ ساعات، وعند زواله يعود الأدينوزين دفعةً واحدة («انهيار الكافيين»).',
      'From the moment you wake, **Adenosine** builds up in the brain, growing “sleep pressure.” After ~16 hours awake it peaks and sleep becomes hard to resist. **Caffeine** works by **blocking adenosine receptors** — it doesn’t remove the molecule, it hides its signal (masking sleepiness); its half-life is ~5–6 hours, and when it wears off the accumulated adenosine floods back (the “caffeine crash”).'
    ) },
    { type: 'image', src: clean('adenosine-1.png'), transparent: true, wide: true,
      alt: L('الوضع الطبيعي لمستقبل الأدينوزين A2A', 'Normal Adenosine A2A receptor function'),
      caption: L('**الوضع الطبيعي:** يتراكم الأدينوزين (Adenosine) ويشغل مستقبلاته (A2A Receptor) على الخلية بعد المشبكية فيولّد إشارة النعاس.',
                 '**Normal function:** adenosine builds up and occupies its A2A receptors on the post-synaptic cell, producing the sleepiness signal.'),
      legend: [
        L('النهاية المحورية (Axon Terminal)', 'Axon Terminal'),
        L('الحويصلة التشابكية (Synaptic Vesicle)', 'Synaptic Vesicle'),
        L('الخلية بعد المشبكية (Post-Synaptic Cell)', 'Post-Synaptic Cell'),
        L('مستقبل A2A (A2A Receptor)', 'A2A Receptor'),
        L('الأدينوزين (Adenosine)', 'Adenosine'),
      ] },
    { type: 'image', src: clean('adenosine-2.png'), transparent: true, wide: true,
      alt: L('الكافيين يحجب مستقبلات الأدينوزين', 'Caffeine blocking adenosine receptors'),
      caption: L('**مع الكافيين:** يرتبط الكافيين (Caffeine) بمستقبلات الأدينوزين ويحجبها، فيُخفي إشارة النعاس مؤقّتاً دون أن يزيل المادّة نفسها.',
                 '**With caffeine:** caffeine binds to and blocks the adenosine receptors, temporarily hiding the sleepiness signal without removing the molecule itself.'),
      legend: [
        L('الكافيين (Caffeine)', 'Caffeine'),
        L('مستقبل الأدينوزين المحجوب (Blocked receptor)', 'Blocked receptor'),
        L('الأدينوزين (Adenosine)', 'Adenosine'),
      ] },

    { type: 'figure', id: 'fig3' },

    { type: 'callout', variant: 'key', title: L('التفاعل بين النظامين', 'How the two systems interact'), text: L(
      'خطّ الإيقاع اليومي وخطّ ضغط النوم يسيران متوازيين؛ **الفجوة بينهما هي مقدار النعاس**: صغيرة صباحاً (نستيقظ منتعشين) وتتّسع مساءً حتى تبلغ أقصاها وقت النوم. ولو سهرت ليلة كاملة يستمرّ الأدينوزين بالتراكم، لكنك قد تشعر بـ«صحوة ثانية» صباحاً لأن منبّه الإيقاع اليومي يرتفع رغم ارتفاع الأدينوزين.',
      'The circadian line and the sleep-pressure line run in parallel; **the gap between them is your sleepiness**: small in the morning (we wake refreshed) and widening through the evening until it peaks at bedtime. Pull an all-nighter and adenosine keeps building — yet you may feel a “second wind” in the morning because the circadian alerting signal rises even as adenosine stays high.'
    ) },
    { type: 'figure', id: 'fig4_6' },
    { type: 'figure', id: 'fig7' },

    { type: 'h', text: L('بوّابة النوم: كيف يبدأ النوم فيزيولوجياً', 'The sleep gate: how sleep begins physiologically') },
    { type: 'ul', items: [
      L('**مفتاح اليقظة في الوطاء:** يُفرز **الأوركسين (Orexin / Hypocretin)** الذي يُثبّت اليقظة؛ عند الليل ينخفض فيُطفأ منبّه اليقظة. (فقدان خلايا الأوركسين سبب **التغفيق / Narcolepsy**).',
        'A **wake switch in the hypothalamus** secretes **Orexin (Hypocretin)** to hold wakefulness on; at night it falls and the alerting signal switches off. (Loss of orexin cells causes **narcolepsy**.)'),
      L('**المهاد يُغلق البوّابة الحسّية:** **المهاد (Thalamus)** يغلق بوّابة الحواسّ فتنقطع إشارات العالم الخارجي عن القشرة. (في **الأرق العائلي القاتل** يُدمَّر المهاد فتبقى البوّابة مفتوحة ويستحيل النوم).',
        'The **thalamus closes the sensory gate:** the **Thalamus** shuts the senses off from the cortex. (In **Fatal Familial Insomnia** the thalamus is destroyed, the gate stays open, and sleep becomes impossible.)'),
      L('**تراجع جذع الدماغ:** تنخفض طاقة مراكز التنشيط فيكتمل الانتقال إلى النوم المستقرّ.',
        '**Brainstem stand-down:** arousal centres power down and the transition into stable sleep completes.'),
    ] },
    { type: 'image', src: clean('orexin.png'), transparent: true, wide: true,
      alt: L('خلايا الأوركسين/الهيبوكريتين', 'Orexin/Hypocretin neurons'),
      caption: L('خلايا الأوركسين (Orexin / Hypocretin) في الوطاء — مفتاح اليقظة الذي يُثبّت حالة الصحو، وينخفض إفرازه ليلاً.', 'Orexin (Hypocretin) neurons in the hypothalamus — the wake switch that holds wakefulness on, and quiets at night.') },

    { type: 'h', text: L('مراحل النوم بالترتيب', 'Sleep stages, in order') },
    { type: 'p', text: L(
      'ينقسم النوم إلى نوعين يتناوبان في **دورات ~٩٠ دقيقة** تتكرّر ٤–٥ مرات: **NREM** (نوم هادئ عميق بمراحله N1، N2 — بمغازله النومية (Sleep Spindles) — وN3 نوم الموجة البطيئة)، و**REM** (نوم نشِط تحدث فيه معظم الأحلام، مع شلل عضلي وانطفاء القشرة الجبهية).',
      'Sleep divides into two types alternating in **~90-minute cycles** repeated 4–5 times: **NREM** (quiet deep sleep with stages N1, N2 — with its Sleep Spindles — and N3 slow-wave sleep), and **REM** (active sleep where most dreams occur, with muscle paralysis and the frontal cortex switched off).'
    ) },
    { type: 'callout', variant: 'fact', title: L('نقطة جوهرية: التوزيع غير متساوٍ', 'Key point: the distribution is uneven'), text: L(
      '**النصف الأول** من الليل يهيمن عليه **NREM العميق (N3)**، و**النصف الثاني** يهيمن عليه **REM**. لذلك من ينام ٦ ساعات بدل ٨ لا يخسر ٢٥٪ فقط بل حصّةً غير متناسبة من **REM** المتركّز في الساعات الأخيرة — وهذا يفسّر لماذا اقتطاع آخر النوم مؤذٍ بشكل خاصّ للإبداع والاتّزان العاطفي.',
      'The **first half** of the night is dominated by **deep NREM (N3)**, and the **second half** by **REM**. So sleeping 6 hours instead of 8 costs not 25% but a disproportionate share of the **REM** concentrated in the final hours — which is why cutting the end of sleep is especially harmful to creativity and emotional balance.'
    ) },
    { type: 'figure', id: 'fig8' },
    { type: 'figure', id: 'fig9' },
    { type: 'image', src: anat('rem-vs-nrem.webp'), wide: true, alt: L('مقارنة بين REM وNREM', 'REM vs NREM comparison'),
      caption: L('مقارنة بين نوم REM ونوم NREM.', 'A comparison of REM and NREM sleep.') },

    { type: 'h', text: L('آثار اختلال الآلية (قلة النوم)', 'Consequences of a broken mechanism (sleep loss)') },
    { type: 'ul', items: [
      L('**الدماغ والإدراك:** تراجع التركيز، «نُويمات دقيقة (Microsleeps)» خطيرة، وأداءٌ بعد ١٩–٢٤ ساعة يقظة يعادل **السُّكْر القانوني**.',
        '**Brain & cognition:** falling focus, dangerous **microsleeps**, and performance after 19–24 hours awake equal to **legal drunkenness**.'),
      L('**العاطفة:** فرط نشاط **اللوزة (Amygdala)** حتى **٦٠٪** مع انقطاع تنظيم الفصّ الجبهي → تقلّب مزاجي.',
        '**Emotion:** amygdala hyperactivity up to **60%** with loss of frontal-lobe regulation → mood volatility.'),
      L('**المناعة والقلب والأيض:** خلايا قاتلة أقلّ، خطر قلبٍ أعلى، اختلال سكرٍ وشهية.',
        '**Immunity, heart & metabolism:** fewer natural-killer cells, higher cardiac risk, disrupted glucose and appetite.'),
      L('**المدى الطويل:** تراكم بيتا-أميلويد (Beta-amyloid) وزيادة خطر ألزهايمر (Alzheimer’s).',
        '**Long term:** beta-amyloid build-up and increased Alzheimer’s risk.'),
    ] },
  ],
}
