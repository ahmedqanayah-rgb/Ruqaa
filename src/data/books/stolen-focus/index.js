/*
 * The "Stolen Focus" book module — self-contained, same shape as why-we-sleep.
 * Extras over the base shape: `groups` (landing-page grouping), a `fam` tag on
 * cause sections (family colour on cards), and a `quick` one-question check
 * appended to each article section (rendered by BookSection after the blocks).
 *
 * SIMPLIFIED 2026-08-24, in step with why-we-sleep — see that file's header for
 * the shared list. Book-specific parts:
 *
 *   «خريطة الأسباب»        → removed. The twelve causes are the group beneath it.
 *   «تقييم عادات التركيز»  → moved INSIDE «مختبر التركيز» as its second panel;
 *                            both answered "how is my focus?", one by
 *                            self-report and one by measurement.
 *   «داخل حالة التدفّق»     → promoted to a solo top-level tab. It was alone
 *                            inside a titled group, so reaching it meant
 *                            unfolding a drawer to find one item.
 *   «الكتاب في الميزان»    → removed as a section; its load-bearing entries
 *                            survive. The 23-minute fact-check is a myth item
 *                            in the game (mythOrFact.js), and the ADHD critique
 *                            — which has practical stakes, someone could stop
 *                            treatment over it — moved into the ADHD section.
 */
import { author } from './author.js'
import { translatorSection } from '../../translator.js'
import { speedFlow, exhaustion } from './sections-1.js'
import { readingMindwandering, bigTech, cruelOptimism } from './sections-2.js'
import { stressVigilance, dietPollution, adhd, childhood, rebellion } from './sections-3.js'
import { characters } from './sections-4.js'
import { flowState } from './sections-flow.js'
import { verdict, adhdCaveat, authorScrutiny } from './reception.js'
import { mythOrFact } from './mythOrFact.js'
import { QUESTIONS, TIPS, GOOD_TIP } from './assessment.js'
import { studies, interestOrder } from './studies.js'

const L = (ar, en) => ({ ar, en })

/* One quick end-of-article question per section, keyed by slug. */
const QUICK = {
  'speed-flow': {
    q: L('كم من الوقت يقول الكتاب إنك تحتاجه لتعود إلى تركيزك العميق بعد مقاطعة؟', 'How long does the book say it takes to regain deep focus after an interruption?'),
    opts: [L('٣ دقائق', '3 minutes'), L('٢٣ دقيقة', '23 minutes'), L('ساعتان', 'Two hours')],
    correct: 1,
    note: L('هذا ما يقوله الكتاب — والرقم لغلوريا مارك لا لبوزنر، ولم يُنشر في بحثٍ محكَّم. تقديراتٌ أخرى تقول ١١–١٦ دقيقة.', 'That is what the book says — the figure is Gloria Mark’s, not Posner’s, and was never published in a peer-reviewed paper. Other estimates put it at 11–16 minutes.'),
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
  'flow-state': {
    q: L('ماذا وجدت دراسة تشيكزينتميهالي ولوفيفر حين رنّت أجهزة النداء؟', 'What did Csikszentmihalyi & LeFevre’s pagers reveal?'),
    opts: [L('نتدفّق في الفراغ أكثر من العمل', 'We flow more in leisure than at work'),
           L('نتدفّق في العمل أكثر — ومع ذلك نفضّل الفراغ', 'We flow more at work — yet still prefer leisure'),
           L('لا فرق بين الحالتين', 'No difference between the two')],
    correct: 1,
    note: L('«مفارقة العمل»: العمل يأتي ببنية التدفّق جاهزة (هدفٌ وقواعد وتغذيةٌ راجعة)، والفراغ يصلنا بلا بنية — فنختار الأسهل ونسمّيه راحة.', 'The “paradox of work”: a job arrives with the architecture of flow pre-installed — goal, rules, feedback — while free time arrives with none, so we take the easy option and call it rest.'),
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

/* The author and the translator in one tab, switched inside it — same shape as
   the other book. The translator is the reason this club can read the book at
   all; pairing them says so, and it costs one sidebar entry instead of two. */
/* The ADHD chapters carry their own critique now. It goes against the chapters
   rather than on a separate page because it has practical stakes — someone with
   ADHD could read them and stop their treatment. */
const adhdChecked = { ...adhd, blocks: [...adhd.blocks, ...adhdCaveat] }

const translator = translatorSection({ titleAr: 'تركيزنا المسلوب', titleEn: 'Stolen Focus', yearAr: '٢٠٢٣' })
const people = {
  slug: 'author',
  icon: '✍️',
  title: L('المؤلّف والمترجم', 'Author & Translator'),
  lead: L(
    'يوهان هاري الذي كتب الكتاب، والحارث النبهان الذي نقله إلى العربية — كلاهما هنا.',
    'Johann Hari, who wrote the book, and Al-Harith Al-Nabhan, who brought it into Arabic — both here.'
  ),
  blocks: [
    { type: 'tabs', panels: [
      /* How much weight the book's reporting deserves, and Hari's own
         professional record, are questions about the author — so the scrutiny
         that «الكتاب في الميزان» used to carry sits in his panel. */
      { title: L('المؤلّف', 'The author'), blocks: [...author.blocks, ...authorScrutiny] },
      { title: L('المترجم', 'The translator'), blocks: translator.blocks },
    ] },
  ],
}

export const stolenFocus = {
  id: 'stolen-focus',
  title: L('تركيزنا المسلوب', 'Stolen Focus'),
  // Arabic subtitle follows the published Dar Al-Tanweer edition; the English is the
  // book's own subtitle. The two deliberately do not mirror each other.
  subtitle: L('لماذا صرنا نعاني مشكلة قلة الانتباه؟',
              'Why You Can’t Pay Attention — and How to Think Deeply Again'),
  author: L('يوهان هاري', 'Johann Hari'),
  authorPhoto: './images/characters/johann-hari.webp',
  cover: L('./images/stolen-focus-cover-ar.jpg', './images/stolen-focus-cover-en.jpg'),
  blurb: L(
    'تحقيقٌ عالميّ في أسباب انهيار انتباهنا — اثنا عشر سبباً خارجياً تسرق تركيزنا، وكيف نستعيده فرداً وجماعة.',
    'A global investigation into why our attention collapsed — twelve external forces stealing our focus, and how to reclaim it as individuals and together.'
  ),
  verdict,
  accent: 'var(--accent)',
  /* `{ slug }` is a solo entry — a top-level tab with no group header. See
     entrySlugs in data/books.js. */
  groups: [
    { slug: 'author' },
    { title: L('الأسباب الاثنا عشر', 'The twelve causes'),
      slugs: ['speed-flow', 'exhaustion', 'reading-mindwandering', 'big-tech', 'cruel-optimism',
              'stress-vigilance', 'diet-pollution', 'adhd', 'childhood', 'rebellion'] },
    // Drawn from another book. It used to sit in a titled group of its own so it
    // never read as Hari's — but a group of one only buried it, and the section
    // opens with a callout saying whose book it is, which does that job better.
    { slug: 'flow-state' },
    { title: L('جرّب بنفسك', 'Try it yourself'), slugs: ['focus-lab', 'studies', 'myth-or-fact'] },
    { title: L('مراجع النادي', 'Club reference'), slugs: ['characters'] },
  ],
  sections: [
    people,
    // Same translator as the other book, so the biography lives in one shared
    // module and each book passes only its own edition details.
    enrich(speedFlow),
    enrich(exhaustion),
    enrich(readingMindwandering),
    enrich(bigTech),
    enrich(cruelOptimism),
    enrich(stressVigilance),
    enrich(dietPollution),
    enrich(adhdChecked),
    enrich(childhood),
    enrich(rebellion),
    enrich(flowState),
    characters,
    {
      slug: 'focus-lab',
      kind: 'focus-lab',
      icon: '🧪',
      title: L('مختبر التركيز', 'The Focus Lab'),
      lead: L(
        'سبع ألعابٍ قصيرة تُشعرك بانتباهك وهو يعمل: كبح التشتيت، وكلفة التبديل، وثبات اليقظة، والتصفية وسط الضجيج، والذاكرة العاملة، وسعة الأرقام، والقراءة وسط الإشعارات — مع مؤشّرٍ إجماليّ في النهاية.',
        'Seven short games that let you feel your attention at work: suppressing distraction, the cost of switching, steady vigilance, filtering through noise, working memory, digit span, and reading amid notifications — with an overall score at the end. A habits assessment sits in the second panel, so you can read the two together.'
      ),
      /* Second panel of this same tab — see FocusLabPanels in BookSection. It
         was its own sidebar entry; both it and the games answer "how is my
         focus?", one by self-report and one by measurement, and the pair is
         worth more read against each other than three items apart. */
      assessment: {
        questions: QUESTIONS, tips: TIPS, goodTip: GOOD_TIP,
        title: L('تقييم عادات التركيز', 'Focus Habits Assessment'),
      },
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
    {
      slug: 'myth-or-fact',
      kind: 'myth-game',
      icon: '🎲',
      title: L('خرافة أم حقيقة؟', 'Myth or Fact?'),
      lead: L(
        'عبارةٌ واحدة في كلّ مرّة — قرّر: خرافةٌ شائعة أم حقيقةٌ من الكتاب؟ ثم اقرأ لماذا.',
        'One statement at a time — decide: a common myth, or a fact from the book? Then read why.'
      ),
      items: mythOrFact,
    },
  ],
}
