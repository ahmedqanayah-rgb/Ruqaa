const L = (ar, en) => ({ ar, en })

/*
 * Sleep-assessment questionnaire (no alcohol question). Each option carries a
 * 0..1 score contribution and may flag a tip. Scoring and tips reflect the
 * book's principles: fixed schedule is the single most effective habit,
 * caffeine half-life ~5–6h, cool room ~18.3°C/65°F, avoid evening screens,
 * naps helpful but not late.
 */
export const QUESTIONS = [
  {
    id: 'hours', icon: '🛏️',
    q: L('كم ساعة تنام في الليلة عادةً؟', 'How many hours do you sleep at night, typically?'),
    options: [
      { label: L('أقلّ من ٥ ساعات', 'Less than 5 hours'), score: 0.0, tip: 'hours' },
      { label: L('٥–٦ ساعات', '5–6 hours'), score: 0.35, tip: 'hours' },
      { label: L('٦–٧ ساعات', '6–7 hours'), score: 0.7, tip: 'hoursMild' },
      { label: L('٧–٨ ساعات', '7–8 hours'), score: 1.0 },
      { label: L('٨–٩ ساعات', '8–9 hours'), score: 1.0 },
    ],
  },
  {
    id: 'schedule', icon: '⏰',
    q: L('ما مدى ثبات موعدي نومك واستيقاظك؟ (حتى في العطلات)', 'How consistent are your bed and wake times? (even on weekends)'),
    options: [
      { label: L('ثابتان جداً كلّ يوم', 'Very consistent every day'), score: 1.0 },
      { label: L('ثابتان غالباً', 'Mostly consistent'), score: 0.6, tip: 'scheduleMild' },
      { label: L('يتغيّران كثيراً', 'They vary a lot'), score: 0.1, tip: 'schedule' },
    ],
  },
  {
    id: 'coffee', icon: '☕',
    q: L('كم كوب قهوة/كافيين تشرب يومياً؟', 'How many cups of coffee/caffeine per day?'),
    options: [
      { label: L('لا شيء', 'None'), score: 1.0 },
      { label: L('١–٢', '1–2'), score: 0.85 },
      { label: L('٣–٤', '3–4'), score: 0.5, tip: 'coffeeAmount' },
      { label: L('٥ أو أكثر', '5 or more'), score: 0.2, tip: 'coffeeAmount' },
    ],
  },
  {
    id: 'coffeeTime', icon: '🕕',
    q: L('متى آخر كوب كافيين في يومك؟', 'When is your last caffeine of the day?'),
    options: [
      { label: L('لا أشرب كافيين', 'I don’t drink caffeine'), score: 1.0 },
      { label: L('صباحاً فقط (قبل الظهر)', 'Morning only (before noon)'), score: 1.0 },
      { label: L('بعد الظهر (١٢–٤ عصراً)', 'Afternoon (12–4pm)'), score: 0.5, tip: 'coffeeTimeMild' },
      { label: L('مساءً (بعد ٤ عصراً)', 'Evening (after 4pm)'), score: 0.0, tip: 'coffeeTime' },
    ],
  },
  {
    id: 'screens', icon: '📱',
    q: L('هل تستخدم الشاشات قبل النوم مباشرةً؟', 'Do you use screens right before bed?'),
    options: [
      { label: L('نادراً/لا', 'Rarely / no'), score: 1.0 },
      { label: L('أحياناً', 'Sometimes'), score: 0.5, tip: 'screensMild' },
      { label: L('دائماً حتى النوم', 'Always, up to sleep'), score: 0.1, tip: 'screens' },
    ],
  },
  {
    id: 'temp', icon: '🌡️',
    q: L('كيف حرارة غرفة نومك؟', 'What is your bedroom temperature like?'),
    options: [
      { label: L('باردة نوعاً ما (~١٨°م)', 'Fairly cool (~18°C)'), score: 1.0 },
      { label: L('معتدلة', 'Moderate'), score: 0.6, tip: 'tempMild' },
      { label: L('دافئة', 'Warm'), score: 0.15, tip: 'temp' },
    ],
  },
  {
    id: 'refreshed', icon: '😴',
    q: L('كيف تستيقظ عادةً؟', 'How do you usually wake up?'),
    options: [
      { label: L('منتعشاً', 'Refreshed'), score: 1.0 },
      { label: L('مقبولاً', 'So-so'), score: 0.5, tip: 'refreshedMild' },
      { label: L('متعباً/بحاجة للمزيد', 'Tired / needing more'), score: 0.1, tip: 'refreshed' },
    ],
  },
  {
    id: 'naps', icon: '🌤️',
    q: L('هل تأخذ قيلولة؟ ومتى؟', 'Do you take naps? When?'),
    options: [
      { label: L('لا آخذ قيلولة', 'No naps'), score: 0.9 },
      { label: L('قصيرة ومبكّرة (<٣٠ دقيقة، قبل ٣ عصراً)', 'Short & early (<30 min, before 3pm)'), score: 1.0 },
      { label: L('طويلة أو متأخّرة', 'Long or late'), score: 0.4, tip: 'naps' },
    ],
  },
]

export const TIPS = {
  hours: L(
    'تنام أقلّ من الحاجة. النوم ليس بنكاً ولا يُعوَّض بالكامل — استهدف **٧–٩ ساعات** ليلاً، فالكمّية الناقصة تضرب الذاكرة والمناعة والقلب.',
    'You sleep less than you need. Sleep is not a bank and cannot be fully recovered — aim for **7–9 hours** a night, since a shortfall hits memory, immunity and the heart.'
  ),
  hoursMild: L(
    'قريبٌ من الهدف لكن أقلّ قليلاً. حاول إضافة ٣٠–٦٠ دقيقة، فآخر ساعات النوم غنيّة بـREM المهمّ للإبداع والعاطفة.',
    'Close to target but a little short. Try adding 30–60 minutes — the final hours of sleep are rich in REM, key for creativity and emotion.'
  ),
  schedule: L(
    '**تثبيت موعد النوم والاستيقاظ هو أقوى عادةٍ منفردة** لنومٍ صحي — حتى في العطلات. المواعيد المتقلّبة تربك ساعتك البيولوجية.',
    '**A fixed sleep–wake schedule is the single most effective habit** for healthy sleep — even on weekends. Variable timing confuses your body clock.'
  ),
  scheduleMild: L(
    'جدولك جيّد لكن يمكن تحسينه: ثبّت موعد **الاستيقاظ** خصوصاً، فهو مرساة الساعة البيولوجية.',
    'Your schedule is good but improvable: anchor your **wake time** especially — it’s the anchor of the body clock.'
  ),
  coffeeAmount: L(
    'كمية الكافيين مرتفعة. الكافيين يحجب مستقبلات الأدينوزين ويخفّض عمق النوم حتى لو نمت — قلّل الكمّية تدريجياً.',
    'Your caffeine intake is high. Caffeine blocks adenosine receptors and reduces sleep depth even if you fall asleep — cut down gradually.'
  ),
  coffeeTime: L(
    'كافيين المساء يبقى في جسمك ساعاتٍ طويلة (عمر النصف **~٥–٦ ساعات**). أوقف الكافيين بعد الظهر لحماية نومك العميق.',
    'Evening caffeine lingers for hours (half-life **~5–6 hours**). Stop caffeine after early afternoon to protect your deep sleep.'
  ),
  coffeeTimeMild: L(
    'حاول جعل آخر كوبٍ **قبل الساعة الواحدة ظهراً** ما أمكن، فأثر الكافيين قد يمتدّ حتى ٨ ساعات.',
    'Try to make your last cup **before about 1pm** where possible — caffeine’s effect can stretch up to 8 hours.'
  ),
  screens: L(
    'الضوء الأزرق من الشاشات يكبت الميلاتونين ويؤخّر نومك. أوقف الشاشات **٣٠–٦٠ دقيقة** قبل النوم، وخفّف الإضاءة مساءً.',
    'Blue light from screens suppresses melatonin and delays sleep. Stop screens **30–60 minutes** before bed and dim the lights in the evening.'
  ),
  screensMild: L(
    'قلّل الشاشات مساءً واستخدم وضع الإضاءة الدافئة/الليلية — الضوء الأزرق أشدّ المؤثّرات على الميلاتونين.',
    'Cut evening screens and use a warm/night light mode — blue light is the strongest disruptor of melatonin.'
  ),
  temp: L(
    'الغرفة الدافئة تعيق النوم. يجب أن تنخفض حرارة جسمك **~١°م** لبدء النوم؛ برّد الغرفة إلى **~١٨٫٣°م / ٦٥°ف**.',
    'A warm room hinders sleep. Your body must cool by about **1°C** to fall asleep; cool the room toward **~18.3°C / 65°F**.'
  ),
  tempMild: L(
    'اخفض حرارة الغرفة قليلاً نحو **١٨°م**؛ فالبرودة الخفيفة تسرّع الدخول إلى النوم العميق.',
    'Lower the room a little toward **18°C**; mild cool speeds entry into deep sleep.'
  ),
  refreshed: L(
    'الاستيقاظ متعباً إشارةٌ إلى نومٍ غير كافٍ أو مجزّأ. راجع الكمّية والتوقيت والكافيين والحرارة — وإن استمرّ فاستشر مختصّاً.',
    'Waking tired signals insufficient or fragmented sleep. Review quantity, timing, caffeine and temperature — and if it persists, consult a specialist.'
  ),
  refreshedMild: L(
    'انتعاشٌ متوسّط. تحسينُ التوقيت والحرارة غالباً يرفع جودة استيقاظك.',
    'A middling wake-up. Improving timing and temperature usually lifts your morning quality.'
  ),
  naps: L(
    'القيلولة الطويلة أو المتأخّرة تسحب من ضغط نوم الليل. اجعلها **قصيرة (~٢٠–٣٠ دقيقة) وقبل الثالثة عصراً**.',
    'Long or late naps drain your night-time sleep pressure. Keep them **short (~20–30 min) and before 3pm**.'
  ),
}

export const GOOD_TIP = L(
  'نومك يتماشى مع مبادئ الكتاب. حافظ على ثبات الجدول، وبرودة الغرفة، وتقليل الكافيين والشاشات مساءً.',
  'Your sleep aligns with the book’s principles. Keep a steady schedule, a cool room, and low evening caffeine and screens.'
)
