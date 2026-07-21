/*
 * The "Stolen Focus" book module — self-contained, same shape as why-we-sleep.
 * Extras over the base shape: `groups` (landing-page grouping), a `fam` tag on
 * cause sections (family colour on cards), and a `quick` one-question check
 * appended to each article section (rendered by BookSection after the blocks).
 */
import { author } from './author.js'
import { summary, causesMap, speedFlow, exhaustion } from './sections-1.js'
import { readingMindwandering, bigTech, cruelOptimism } from './sections-2.js'
import { stressVigilance, dietPollution, adhd, childhood, rebellion } from './sections-3.js'
import { characters, shocking, myths, discussion } from './sections-4.js'
import { QUESTIONS, TIPS, GOOD_TIP } from './assessment.js'
import { studies, interestOrder } from './studies.js'

const L = (ar, en) => ({ ar, en })

/* One quick end-of-article question per section, keyed by slug. */
const QUICK = {
  summary: {
    q: L('ما المقارنة التي يعتمدها هاري لتفسير أزمة الانتباه؟', 'Which comparison does Hari use to explain the attention crisis?'),
    opts: [L('وباء السمنة', 'The obesity epidemic'), L('سباق التسلّح', 'The arms race'), L('انقراض الديناصورات', 'The dinosaurs’ extinction')],
    correct: 0,
    note: L('كما لم تنهَر إرادة البشر فجأةً بل تغيّرت بيئتهم الغذائية، تغيّرت بيئة الانتباه فتغيّر تركيزنا.', 'Just as human willpower didn’t suddenly collapse — the food environment changed — the attention environment changed, and our focus with it.'),
  },
  'causes-map': {
    q: L('في أيّ عائلةٍ يقع «التفاؤل القاسي»؟', 'Which family does “cruel optimism” belong to?'),
    opts: [L('العقل', 'Mind'), L('التقنية', 'Technology'), L('المجتمع', 'Society')],
    correct: 2,
    note: L('يبدو مرتبطاً بالتقنية، لكنه خطابٌ اجتماعيّ يحمّل الفرد وحده مشكلةً جماعية.', 'It sounds tech-related, but it is a social script that loads a collective problem onto the individual.'),
  },
  'speed-flow': {
    q: L('كم تحتاج في المتوسّط لتعود إلى تركيزك العميق بعد مقاطعة؟', 'On average, how long does it take to regain deep focus after an interruption?'),
    opts: [L('٣ دقائق', '3 minutes'), L('٢٣ دقيقة', '23 minutes'), L('ساعتان', 'Two hours')],
    correct: 1,
    note: L('دراسة مايكل بوزنر — ولهذا يعيش المُقاطَع باستمرار في «طريق العودة» إلى تركيزٍ لا يصله.', 'Michael Posner’s finding — which is why the constantly interrupted live forever “on the way back” to a focus they never reach.'),
  },
  exhaustion: {
    q: L('البقاء مستيقظاً نحو ١٩ ساعة يجعل أداءك المعرفيّ مكافئاً لِمَن؟', 'Staying awake about 19 hours leaves your cognition equivalent to whose?'),
    opts: [L('طفلٍ في العاشرة', 'A ten-year-old'), L('شخصٍ تجاوز حدّ السُّكر القانوني للقيادة', 'Someone over the drunk-driving limit'), L('لا يتغيّر شيء', 'Nothing changes')],
    correct: 1,
    note: L('ملايين يبدؤون أعمالهم الدقيقة كلّ يومٍ بعقولٍ «ثملة» بالإرهاق — ثم يلومون إرادتهم.', 'Millions start demanding work every day with minds “drunk” on exhaustion — then blame their willpower.'),
  },
  'reading-mindwandering': {
    q: L('ماذا اكتشف ماركوس رايكل حين طلب من الناس «ألّا يفعلوا شيئاً» في الماسح؟', 'What did Marcus Raichle find when people “did nothing” in the scanner?'),
    opts: [L('الدماغ يخفت تدريجياً', 'The brain gradually dims'), L('شبكةٌ كاملة تضيء بقوّة', 'A whole network lights up'), L('لا يتغيّر شيء', 'Nothing changes')],
    correct: 1,
    note: L('«شبكة الوضع الافتراضي»: الشرود ليس توقّفاً — إنه نمط عملٍ آخر ينسج المعنى والخطط والأفكار.', 'The Default Mode Network: wandering is not idling — it is another working mode, weaving meaning, plans and ideas.'),
  },
  'big-tech': {
    q: L('من أين استعارت التطبيقات حيلة «المكافأة المتغيّرة»؟', 'Where did apps borrow the “variable reward” trick from?'),
    opts: [L('ب. ف. سكِنر وعلم الاشتراط', 'B. F. Skinner and conditioning'), L('أفلام هوليوود', 'Hollywood films'), L('ألعاب الأطفال القديمة', 'Old children’s games')],
    correct: 0,
    note: L('مكافأةٌ غير متوقّعة تُرسّخ السلوك كالإدمان — ولهذا صُمّم السحب للتحديث كذراع آلة قمار.', 'An unpredictable reward locks behaviour in like an addiction — which is why pull-to-refresh is built like a slot-machine lever.'),
  },
  'cruel-optimism': {
    q: L('ماذا حدث لتركيز هاري بعد عودته من عزلة بروفينستاون؟', 'What happened to Hari’s focus after he returned from Provincetown?'),
    opts: [L('بقي مثالياً', 'It stayed perfect'), L('زحفت العادات القديمة عائدةً خلال أشهر', 'The old habits crept back within months'), L('ساء أكثر ممّا كان', 'It got worse than before')],
    correct: 1,
    note: L('الدرس المزدوج: التغيير الفرديّ يكشف الممكن، لكنه لا يصمد وحده في بيئةٍ لم تتغيّر.', 'The double lesson: individual change reveals what is possible, but cannot hold alone in an unchanged environment.'),
  },
  'stress-vigilance': {
    q: L('ماذا فعل الفقر بأداء مزارعي قصب السكّر قبل الحصاد؟', 'What did poverty do to the sugarcane farmers’ performance before harvest?'),
    opts: [L('لم يتغيّر', 'Nothing changed'), L('انخفض بما يعادل نحو ١٣ نقطة ذكاء', 'It fell by about 13 IQ points'), L('ارتفع بسبب الحافز', 'It rose from motivation')],
    correct: 1,
    note: L('المزارع نفسه، قبل قبض ثمن المحصول وبعده — الفقر ضريبةٌ على الانتباه لا فشلٌ فيه.', 'The very same farmer, before and after being paid — poverty is a tax on attention, not a failure of it.'),
  },
  'diet-pollution': {
    q: L('ماذا فرض الاتحاد الأوروبي بعد تجربة ساوثهامبتون على الملوّنات؟', 'What did the EU require after the Southampton food-dye study?'),
    opts: [L('لا شيء', 'Nothing'), L('ملصق تحذيرٍ على المنتجات الحاوية عليها', 'A warning label on products containing them'), L('حظر السكّر كلّياً', 'A total ban on sugar')],
    correct: 1,
    note: L('الملوّنات نفسها لا تزال تُباع في أماكن أخرى بلا أيّ تحذير.', 'The same dyes are still sold elsewhere with no warning at all.'),
  },
  adhd: {
    q: L('على ماذا يتّفق نيغ والتميمي رغم خلافهما؟', 'What do Nigg and Timimi agree on despite their disagreement?'),
    opts: [L('أن الدواء يكفي وحده', 'Medication alone is enough'), L('أن البيئة تؤثّر في الأعراض', 'Environment shapes the symptoms'), L('أن التشخيص دقيقٌ دائماً', 'Diagnosis is always accurate')],
    correct: 1,
    note: L('نومُ الطفل وغذاؤه ولعبه وتوتّر بيته — يظهر في الأعراض عند الطرفين معاً.', 'A child’s sleep, food, play, and home stress show up in the symptoms — on both sides of the debate.'),
  },
  childhood: {
    q: L('بحلول ٢٠٠٣، كم نسبة أطفال أمريكا الذين كانوا يلعبون خارجاً بحرّية بانتظام؟', 'By 2003, what share of US children still played freely outdoors regularly?'),
    opts: [L('١٠٪', '10%'), L('٥٠٪', '50%'), L('٧٥٪', '75%')],
    correct: 0,
    note: L('جيلٌ واحد فقط — وانتقلت الطفولة خلف الأبواب المغلقة وإلى الشاشات.', 'A single generation — and childhood moved behind closed doors and onto screens.'),
  },
  rebellion: {
    q: L('ما السابقتان اللتان يستشهد بهما هاري على أن التمرّد الجماعي ينجح؟', 'Which two precedents does Hari cite to show collective rebellion works?'),
    opts: [L('الرصاص وطبقة الأوزون', 'Lead and the ozone layer'), L('التبغ والوجبات السريعة', 'Tobacco and fast food'), L('التلفاز والراديو', 'Television and radio')],
    correct: 0,
    note: L('في الحالتين بدت الصناعة أقوى من أن تُهزم — وفي الحالتين نظّم الناس أنفسهم وانتصروا.', 'In both cases the industry looked unbeatable — and in both, people organised and won.'),
  },
}

/* Family tag per cause section — drives the coloured card accents. */
const FAM = {
  'speed-flow': 'mind', 'reading-mindwandering': 'mind',
  'big-tech': 'tech',
  exhaustion: 'body', 'diet-pollution': 'body',
  'cruel-optimism': 'society', 'stress-vigilance': 'society', adhd: 'society', childhood: 'society',
}

const enrich = (s) => ({ ...s, fam: FAM[s.slug], quick: QUICK[s.slug] })

export const stolenFocus = {
  id: 'stolen-focus',
  title: L('تركيزنا المسلوب', 'Stolen Focus'),
  // Arabic subtitle follows the published Dar Al-Tanweer edition; the English is the
  // book's own subtitle. The two deliberately do not mirror each other.
  subtitle: L('لماذا صرنا نعاني مشكلة قلة الانتباه؟',
              'Why You Can’t Pay Attention — and How to Think Deeply Again'),
  author: L('يوهان هاري', 'Johann Hari'),
  authorPhoto: './images/characters/johann-hari.jpg',
  cover: L('./images/stolen-focus-cover-ar.jpg', './images/stolen-focus-cover-en.jpg'),
  blurb: L(
    'تحقيقٌ عالميّ في أسباب انهيار انتباهنا — اثنا عشر سبباً خارجياً تسرق تركيزنا، وكيف نستعيده فرداً وجماعة.',
    'A global investigation into why our attention collapsed — twelve external forces stealing our focus, and how to reclaim it as individuals and together.'
  ),
  accent: 'var(--accent)',
  groups: [
    { title: L('ابدأ هنا', 'Start here'), slugs: ['author', 'summary', 'causes-map'] },
    { title: L('الأسباب الاثنا عشر', 'The twelve causes'),
      slugs: ['speed-flow', 'exhaustion', 'reading-mindwandering', 'big-tech', 'cruel-optimism',
              'stress-vigilance', 'diet-pollution', 'adhd', 'childhood', 'rebellion'] },
    { title: L('جرّب بنفسك', 'Try it yourself'), slugs: ['focus-assessment', 'focus-lab', 'studies'] },
    { title: L('مراجع النادي', 'Club reference'), slugs: ['characters', 'shocking', 'myths', 'discussion'] },
  ],
  sections: [
    author,
    enrich(summary),
    enrich(causesMap),
    enrich(speedFlow),
    enrich(exhaustion),
    enrich(readingMindwandering),
    enrich(bigTech),
    enrich(cruelOptimism),
    enrich(stressVigilance),
    enrich(dietPollution),
    enrich(adhd),
    enrich(childhood),
    enrich(rebellion),
    characters,
    shocking,
    myths,
    {
      slug: 'focus-assessment',
      kind: 'assessment',
      icon: '📝',
      title: L('تقييم عادات التركيز', 'Focus Habits Assessment'),
      lead: L(
        'بعد أن عرفت أسباب الكتاب، قيّم عاداتك في التركيز واحصل على نصائح شخصية — كلّ شيء يجري في متصفّحك.',
        'Now that you know the book’s causes, assess your own focus habits and get personalized tips — all in your browser.'
      ),
      assessment: { questions: QUESTIONS, tips: TIPS, goodTip: GOOD_TIP },
    },
    {
      slug: 'focus-lab',
      kind: 'focus-lab',
      icon: '🧪',
      title: L('مختبر التركيز', 'The Focus Lab'),
      lead: L(
        'سبع ألعابٍ قصيرة تُشعرك بانتباهك وهو يعمل: كبح التشتيت، وكلفة التبديل، وثبات اليقظة، والتصفية وسط الضجيج، والذاكرة العاملة، وسعة الأرقام، والقراءة وسط الإشعارات — مع مؤشّرٍ إجماليّ في النهاية.',
        'Seven short games that let you feel your attention at work: suppressing distraction, the cost of switching, steady vigilance, filtering through noise, working memory, digit span, and reading amid notifications — with an overall score at the end.'
      ),
    },
    {
      slug: 'studies',
      kind: 'quiz',
      icon: '🔬',
      title: L('الدراسات والتجارب', 'Studies & Experiments'),
      lead: L(
        'ستّون دراسةً وتجربة من الكتاب كلعبة تخمين: اقرأ المنهجية، خمّن النتيجة، ثم اكشفها واقرأ النقاش.',
        'Sixty of the book’s studies and experiments as a guessing game: read the methodology, predict the result, then reveal it and read the discussion.'
      ),
      studies,
      interestOrder,
    },
    discussion,
  ],
}
