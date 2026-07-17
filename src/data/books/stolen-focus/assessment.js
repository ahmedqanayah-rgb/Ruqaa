const L = (ar, en) => ({ ar, en })

/*
 * Focus-habits questionnaire — one question per cause family from the book.
 * Same shape as the Why We Sleep assessment (reused by AssessmentForm): each
 * option carries a 0..1 score and may flag a tip key. Educational, not clinical.
 */
export const QUESTIONS = [
  {
    id: 'sleep', icon: '🛏️',
    q: L('كم ساعة تنام في الليلة عادةً؟', 'How many hours do you sleep at night, typically?'),
    options: [
      { label: L('أقلّ من ٦ ساعات', 'Less than 6 hours'), score: 0.1, tip: 'sleep' },
      { label: L('٦–٧ ساعات', '6–7 hours'), score: 0.6, tip: 'sleepMild' },
      { label: L('٧–٩ ساعات', '7–9 hours'), score: 1.0 },
    ],
  },
  {
    id: 'notifications', icon: '🔔',
    q: L('كيف حال إشعارات هاتفك عادةً؟', 'What are your phone notifications usually like?'),
    options: [
      { label: L('معظمها مفعّل ويقاطعني', 'Mostly on, interrupting me'), score: 0.1, tip: 'notifications' },
      { label: L('بعضها مفعّل', 'Some are on'), score: 0.55, tip: 'notifications' },
      { label: L('معظمها مطفأ', 'Mostly off'), score: 1.0 },
    ],
  },
  {
    id: 'phoneMorning', icon: '🌙',
    q: L('هل هاتفك أوّل ما تلمسه صباحاً وآخر ما تتركه ليلاً؟', 'Is your phone the first thing you touch in the morning and the last at night?'),
    options: [
      { label: L('نعم، دائماً', 'Yes, always'), score: 0.15, tip: 'phoneMorning' },
      { label: L('أحياناً', 'Sometimes'), score: 0.55, tip: 'phoneMorning' },
      { label: L('نادراً — أتركه بعيداً', 'Rarely — I keep it away'), score: 1.0 },
    ],
  },
  {
    id: 'reading', icon: '📖',
    q: L('كم مرّة تقرأ كتاباً (ورقياً أو طويلاً) ٢٠ دقيقة متواصلة أو أكثر؟', 'How often do you read a book (paper or long-form) for 20+ minutes straight?'),
    options: [
      { label: L('نادراً جداً', 'Very rarely'), score: 0.1, tip: 'reading' },
      { label: L('أحياناً في الأسبوع', 'A few times a week'), score: 0.6, tip: 'readingMild' },
      { label: L('يومياً تقريباً', 'Almost daily'), score: 1.0 },
    ],
  },
  {
    id: 'switching', icon: '🔀',
    q: L('كم مرّة تبدّل بين المهامّ أو تتفقّد الرسائل أثناء العمل؟', 'How often do you switch tasks or check messages while working?'),
    options: [
      { label: L('كلّ بضع دقائق', 'Every few minutes'), score: 0.1, tip: 'switching' },
      { label: L('عدّة مرّات في الساعة', 'Several times an hour'), score: 0.5, tip: 'switching' },
      { label: L('أعمل في فتراتٍ مركّزة', 'I work in focused blocks'), score: 1.0 },
    ],
  },
  {
    id: 'flow', icon: '🎯',
    q: L('كم مرّة تدخل في «تدفّق»: ٣٠ دقيقة أو أكثر منغمساً في عملٍ تحبّه دون مقاطعة؟', 'How often do you reach “flow”: 30+ minutes absorbed in work you love, uninterrupted?'),
    options: [
      { label: L('نادراً', 'Rarely'), score: 0.15, tip: 'flow' },
      { label: L('أسبوعياً', 'Weekly'), score: 0.6, tip: 'flowMild' },
      { label: L('كثيراً في الأسبوع', 'Often in a week'), score: 1.0 },
    ],
  },
  {
    id: 'wandering', icon: '🚶',
    q: L('هل تمنح ذهنك وقتاً للشرود — مشيٌ أو جلوسٌ بلا شاشة؟', 'Do you give your mind time to wander — a walk or sitting with no screen?'),
    options: [
      { label: L('نادراً، أملأ كلّ لحظة بالشاشة', 'Rarely — I fill every moment with a screen'), score: 0.15, tip: 'wandering' },
      { label: L('أحياناً', 'Sometimes'), score: 0.6, tip: 'wanderingMild' },
      { label: L('يومياً', 'Daily'), score: 1.0 },
    ],
  },
  {
    id: 'diet', icon: '🍔',
    q: L('كم مرّة تأكل طعاماً مصنّعاً أو سكّرياً يرفع طاقتك ثم يُسقطها؟', 'How often do you eat processed or sugary food that spikes then crashes your energy?'),
    options: [
      { label: L('يومياً غالباً', 'Most days'), score: 0.2, tip: 'diet' },
      { label: L('أحياناً', 'Sometimes'), score: 0.6 },
      { label: L('نادراً', 'Rarely'), score: 1.0 },
    ],
  },
  {
    id: 'outdoors', icon: '🌳',
    q: L('كم من الوقت تقضيه في الخارج أو الطبيعة يومياً؟', 'How much time do you spend outdoors or in nature each day?'),
    options: [
      { label: L('غالباً لا شيء', 'Often none'), score: 0.2, tip: 'outdoors' },
      { label: L('أقلّ من نصف ساعة', 'Under half an hour'), score: 0.6, tip: 'outdoorsMild' },
      { label: L('نصف ساعة أو أكثر', 'Half an hour or more'), score: 1.0 },
    ],
  },
  {
    id: 'stress', icon: '😰',
    q: L('كم مرّة تشعر بالتوتّر أو باليقظة والترقّب؟', 'How often do you feel stressed, or on-alert and watchful?'),
    options: [
      { label: L('معظم الوقت', 'Most of the time'), score: 0.15, tip: 'stress' },
      { label: L('أحياناً', 'Sometimes'), score: 0.55, tip: 'stressMild' },
      { label: L('نادراً', 'Rarely'), score: 1.0 },
    ],
  },
  {
    id: 'multitask', icon: '🧠',
    q: L('هل تحاول القيام بأمرين معاً (كالهاتف أثناء مشاهدة أو حديث)؟', 'Do you try to do two things at once (like your phone while watching or talking)?'),
    options: [
      { label: L('دائماً', 'Always'), score: 0.15, tip: 'multitask' },
      { label: L('أحياناً', 'Sometimes'), score: 0.55, tip: 'multitask' },
      { label: L('نادراً — شيءٌ واحد في كلّ مرّة', 'Rarely — one thing at a time'), score: 1.0 },
    ],
  },
  {
    id: 'precommit', icon: '🔒',
    q: L('هل تستخدم «الالتزام المسبَق» — كإبعاد الهاتف في غرفةٍ أخرى وقت العمل العميق؟', 'Do you use “pre-commitment” — like putting the phone in another room during deep work?'),
    options: [
      { label: L('أبداً', 'Never'), score: 0.2, tip: 'precommit' },
      { label: L('أحياناً', 'Sometimes'), score: 0.6, tip: 'precommitMild' },
      { label: L('نعم، بانتظام', 'Yes, regularly'), score: 1.0 },
    ],
  },
]

export const TIPS = {
  sleep: L(
    'العقل المنهَك لا ينتبه. قلّة النوم من أكثر لصوص التركيز مباشرةً — استهدف **٧–٩ ساعات**. (راجع كتاب «لماذا ننام» على هذا الموقع).',
    'An exhausted mind cannot attend. Too little sleep is among the most direct thieves of focus — aim for **7–9 hours**. (See “Why We Sleep” on this site.)'
  ),
  sleepMild: L(
    'قريبٌ من الهدف لكن أقلّ قليلاً؛ إضافة ٣٠–٦٠ دقيقة تنعكس مباشرةً على صفاء انتباهك نهاراً.',
    'Close to target but a little short; adding 30–60 minutes shows up directly in your daytime clarity.'
  ),
  notifications: L(
    'كلّ إشعارٍ مقاطعة، وتحتاج ~٢٣ دقيقة لاستعادة تركيزك بعدها. **أطفئ ما لا يلزم** من الإشعارات، فهي مصمّمة لجذبك لا لخدمتك.',
    'Every notification is an interruption, and it takes ~23 minutes to refocus after one. **Turn off all but essential** notifications — they’re designed to grab you, not serve you.'
  ),
  phoneMorning: L(
    'إن كان الهاتف أوّل وآخر ما تلمس، فأنت تسلّم انتباهك للآلة طرفَي يومك. جرّب **الالتزام المسبَق**: منبّهٌ منفصل، والهاتف خارج غرفة النوم.',
    'If the phone is the first and last thing you touch, you hand your attention to the machine at both ends of the day. Try **pre-commitment**: a separate alarm, phone outside the bedroom.'
  ),
  reading: L(
    'القراءة العميقة تمرينٌ للانتباه يذوب في عصر التصفّح. ابدأ بـ**٢٠ دقيقة** يومياً على ورق، بعيداً عن الهاتف.',
    'Deep reading is an attention workout dissolving in the age of skimming. Start with **20 minutes** a day on paper, away from the phone.'
  ),
  readingMild: L(
    'بدايةٌ جيّدة — ثبّت موعداً يومياً للقراءة الطويلة، فالاستمرارية تبني عضلة التركيز.',
    'A good start — fix a daily slot for long reading; consistency builds the focus muscle.'
  ),
  switching: L(
    'لست تؤدّي مهامّ متعدّدة، بل تبدّل بسرعة بكلفةٍ خفيّة. اعمل في **فتراتٍ مركّزة** (٢٥–٥٠ دقيقة) والرسائل مغلقة.',
    'You’re not multitasking, you’re switching rapidly at a hidden cost. Work in **focused blocks** (25–50 min) with messages closed.'
  ),
  flow: L(
    'التدفّق أعمق صور الانتباه، ويحتاج هدفاً واضحاً وبلا مقاطعة. احمِ نافذةً يومية للعمل الذي تحبّه دون إشعارات.',
    'Flow is the deepest form of attention; it needs a clear goal and no interruption. Protect a daily window for work you love, notifications off.'
  ),
  flowMild: L(
    'أنت تعرف التدفّق — وسّع نوافذه: مهمّةٌ واحدة، هدفٌ واضح، وهاتفٌ بعيد.',
    'You know flow — widen its windows: one task, a clear goal, phone away.'
  ),
  wandering: L(
    'شرود الذهن ليس وقتاً ضائعاً؛ فيه يربط الدماغ الأفكار ويبدع. امنح نفسك **مشياً بلا شاشة** كلّ يوم.',
    'Mind-wandering is not wasted time; it’s when the brain connects ideas and creates. Give yourself a **screen-free walk** each day.'
  ),
  wanderingMild: L(
    'جيّد — اجعل لحظات الشرود عادةً ثابتة، فهي وقود الإبداع وحلّ المشكلات.',
    'Good — make wandering a fixed habit; it fuels creativity and problem-solving.'
  ),
  diet: L(
    'ارتفاع السكّر ثم هبوطه يجلب «انهيارات» التركيز. قلّل النشويات المكرّرة، وفضّل الإطلاق البطيء للطاقة.',
    'Sugar spikes then crashes bring focus “dips.” Cut refined carbs and favour slow-release energy.'
  ),
  outdoors: L(
    'الوقت في الخارج يريح الانتباه ويقلّل التوتّر. استهدف نصف ساعة يومياً، ولو مشياً قصيراً.',
    'Time outdoors rests attention and lowers stress. Aim for half an hour a day, even a short walk.'
  ),
  outdoorsMild: L(
    'زد وقتك في الخارج قليلاً؛ الطبيعة تعيد شحن قدرتك على التركيز.',
    'Increase your outdoor time a little; nature recharges your capacity to focus.'
  ),
  stress: L(
    'التوتّر المزمن يحوّل الدماغ إلى «يقظة» تمسح المحيط بدل التركيز. النوم، والحركة، ووقت الطبيعة تخفّضه — وبعض أسبابه جماعيّة تحتاج حلولاً أوسع.',
    'Chronic stress flips the brain into “vigilance,” scanning instead of focusing. Sleep, movement and nature lower it — and some causes are collective, needing wider fixes.'
  ),
  stressMild: L(
    'مستوى توتّرك متوسّط؛ عاداتٌ صغيرة (تنفّس، مشي، نوم منتظم) تُحدث فرقاً في صفاء انتباهك.',
    'Your stress is moderate; small habits (breathing, walking, regular sleep) make a real difference to your clarity.'
  ),
  multitask: L(
    'لا يركّز الدماغ على أمرين معرفيين معاً؛ «تعدّد المهامّ» يقلّل الأداء ويزيد الأخطاء. جرّب **شيئاً واحداً في كلّ مرّة**.',
    'The brain can’t focus on two cognitive things at once; “multitasking” lowers performance and raises errors. Try **one thing at a time**.'
  ),
  precommit: L(
    'أقوى أداةٍ فردية هي **الالتزام المسبَق**: قيّد خياراتك سلفاً حين تكون إرادتك قويّة — كإبعاد الهاتف فيزيائياً وقت العمل العميق.',
    'The most powerful individual tool is **pre-commitment**: bind your choices in advance while your willpower is strong — like physically removing the phone during deep work.'
  ),
  precommitMild: L(
    'أنت تستخدم الالتزام المسبَق أحياناً — اجعله عادةً ثابتة، فهو يهزم التشتيت دون الاعتماد على «قوّة الإرادة» وحدها.',
    'You use pre-commitment sometimes — make it a fixed habit; it beats distraction without relying on “willpower” alone.'
  ),
}

export const GOOD_TIP = L(
  'عاداتك تحمي انتباهك بشكلٍ جيّد: نومٌ كافٍ، إشعاراتٌ مهذّبة، قراءةٌ عميقة، ووقتٌ للتدفّق والشرود. تذكّر أن جزءاً من الحلّ جماعيّ — شارك في «تمرّد الانتباه».',
  'Your habits protect your attention well: enough sleep, tamed notifications, deep reading, and time for flow and wandering. Remember part of the solution is collective — join the “attention rebellion.”'
)
