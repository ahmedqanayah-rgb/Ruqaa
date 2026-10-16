/*
 * «الاقتصاد كما أشرحه لابنتي» — Yanis Varoufakis, the club's third book
 * (season from 27 September 2026). Same shape as the other two:
 *
 *   «المؤلّف والمترجم»                 author + translator, one heading each
 *   «مراجعة الكتاب»                    the eight chapters and the epilogue
 *   «الدَّين والربا والأنظمة الثلاثة»   the club's own companion — a solo tab,
 *                                       like «داخل حالة التدفّق», because it is
 *                                       not the book and says so
 *   «أنشطة إضافية»                     quiz, myth-or-fact, characters
 *
 * WHAT IS NOT HERE, ON PURPOSE: an assessment or a lab. Both earlier books had a
 * self-measurement activity because their subjects are things a reader does —
 * sleeping, paying attention. This book’s subject is a system. Its interactive
 * work lives in the chapters instead: one figure each, so a reader can push on
 * the one moving part of every story (the hunt, the camp, the river…).
 *
 * The translator is NOT data/translator.js — that module is one man's
 * biography (الحارث النبهان, the first two books). See ./translator.js.
 */
import { author } from './author.js'
import { translator } from './translator.js'
import { inequality, marketSociety, debtProfit, banking } from './chapters-1.js'
import { oedipalMarkets, hauntedMachines, apoliticalMoney, stupidViruses, epilogue } from './chapters-2.js'
import { debtSection } from './debt.js'
import { verdict, bloodCheck, bitcoinCheck, easterIslandCheck } from './reception.js'
import { mythOrFact } from './mythOrFact.js'
import { studies, interestOrder } from './studies.js'
import { characters } from './characters.js'

const L = (ar, en) => ({ ar, en })

/* One end-of-chapter question per panel, keyed by slug. */
const QUICK = {
  inequality: {
    q: L('لماذا غزا البريطانيون أستراليا، ولم يحدث العكس، بحسب الكتاب؟', 'Why, according to the book, did the British invade Australia and not the reverse?'),
    opts: [L('لأن الأوروبيين أذكى', 'Because Europeans were smarter'), L('الجغرافيا، وما أنتجته من فائضٍ زراعيّ ودولٍ وجراثيم', 'Geography — and the farm surplus, states and germs it produced'), L('صدفة الرياح والملاحة', 'An accident of winds and navigation')],
    correct: 1,
    note: L('حيث كان الطعام وفيراً لم يحتج أحدٌ إلى الزراعة، فلم يولد فائض، ولا كتابة، ولا جيوش. لا علاقة للحمض النووي بشيء.', 'Where food was plentiful nobody needed to farm, so no surplus was born — no writing, no armies. DNA had nothing to do with it.'),
  },
  'market-society': {
    q: L('ماذا حدث حين طرد الملّاك الإنجليز الأقنان وأحلّوا محلّهم الخراف؟', 'What happened when English landlords evicted the serfs and put sheep in their place?'),
    opts: [L('صار العمل والأرض بضاعتين', 'Labour and land became commodities'), L('صار الأقنان ملّاكاً', 'The serfs became landowners'), L('فقد الصوف قيمته', 'Wool lost its value')],
    correct: 0,
    note: L('القنّ المطرود لا يملك إلا قوّة عمله فيبيعها — سوق العمل؛ والأرض صار لها إيجارٌ يحدّده سعر الصوف — سوق الأرض.', 'An evicted serf owns only his labour, so he sells it — the labour market; land acquires a rent set by the price of wool — the land market.'),
  },
  'debt-profit': {
    q: L('ما «الانقلاب الكبير»؟', 'What is the “Great Reversal”?'),
    opts: [L('انتقال الدَّين من آخر سلسلة الإنتاج إلى أوّلها', 'Debt moving from the end of the production chain to its start'), L('انتقال الصناعة إلى المدن', 'Industry moving to the cities'), L('سيطرة الدولة على المصارف', 'The state taking over the banks')],
    correct: 0,
    note: L('في الإقطاع: إنتاجٌ فتوزيعٌ فدَين. في مجتمع السوق: دَينٌ فتوزيعٌ فإنتاج — ولهذا صار الربح شرطاً للبقاء.', 'Under feudalism: production, distribution, debt. In market society: debt, distribution, production — which is why profit became a condition of survival.'),
  },
  banking: {
    q: L('من أين يأتي المصرف بنصف المليون الذي يُقرضه لمريم؟', 'Where does the bank find the half-million it lends Miriam?'),
    opts: [L('من ودائع العملاء الآخرين', 'From other customers’ deposits'), L('من رأس ماله', 'From its own capital'), L('من العدم: يكتب الرقم في حسابها', 'From thin air: it types the number into her account')],
    correct: 2,
    note: L('القرض يخلق الوديعة، وسداده يُفنيها. وإن عجزت مريم ومثيلاتها، اقترض الجميع من مستقبلٍ لن يأتي — فوقع الانهيار.', 'The loan creates the deposit; repaying it destroys it. If Miriam and many like her fail, everyone has borrowed from a future that never comes — and the crash follows.'),
  },
  'oedipal-markets': {
    q: L('لماذا قد لا يخلق خفضُ الأجور كلّها وظائف؟', 'Why might cutting every wage create no jobs?'),
    opts: [L('لأن العمّال يرفضون العمل', 'Because workers refuse to work'), L('لأن أرباب العمل يتوقّعون زبائن أقلّ فيُحجمون', 'Because employers expect fewer customers and hold back'), L('لأن القانون يحدّد الأجور', 'Because the law fixes wages')],
    correct: 1,
    note: L('كماريا: إن قبلت النقابات خفض الأجور فالأوضاع سيّئة، ومن سيشتري حين تنخفض الأجور كلّها؟ النبوءة تحقّق نفسها.', 'Like Maria: if the unions accept a cut, things are bad — and who will buy once every wage falls? The prophecy fulfils itself.'),
  },
  'haunted-machines': {
    q: L('ماذا يقترح فاروفاكيس لكي يصير البشر أسياد آلاتهم؟', 'What does Varoufakis propose so humanity masters its machines?'),
    opts: [L('حظر الروبوتات', 'Ban robots'), L('أن يملك الجميع جزءاً من آلات كلّ شركة، وتُوزَّع أرباحه بالتساوي', 'Everyone owns part of every company’s machines, sharing its profits equally'), L('خفض الضرائب على العمّال', 'Cut taxes on workers')],
    correct: 1,
    note: L('هكذا لا تنهار القدرة على الشراء مع الأتمتة، ويصير البشر كلّهم مستفيدين من عمل الآلات بدل قلّةٍ تملكها.', 'That way buying power does not collapse as automation spreads, and all humans benefit from the machines’ work instead of the few who own them.'),
  },
  'apolitical-money': {
    q: L('ماذا حدث للأسعار في المعسكر بعد ليلة القصف؟', 'What happened to prices in the camp after the night of the bombing?'),
    opts: [L('ارتفعت', 'They rose'), L('انخفضت: صار لوح الشوكولاتة بسيجارةٍ واحدة', 'They fell: a chocolate bar cost a single cigarette'), L('لم تتغيّر', 'Nothing changed')],
    correct: 1,
    note: L('دخّن الأسرى المرتعبون سجائرهم، فقلّت وارتفعت قيمة كلٍّ منها: انكماش. قيمة العملة في ندرتها، لا في كلفتها.', 'Terrified prisoners smoked their cigarettes, so there were fewer and each was worth more: deflation. A currency’s value lies in its scarcity, not its cost.'),
  },
  'stupid-viruses': {
    q: L('لماذا «ينمو» الاقتصاد حين تحترق الغابة؟', 'Why does the economy “grow” when the forest burns?'),
    opts: [L('لأن للأشجار المحترقة قيمةً تبادلية', 'Because the burned trees had exchange value'), L('لأن الأشجار بلا قيمةٍ تبادلية، والوقود وإعادة البناء لهما قيمة', 'Because the trees had no exchange value, while the fuel and rebuilding do'), L('لأن التأمين يدفع ثمن الغابة', 'Because insurance pays for the forest')],
    correct: 1,
    note: L('ما لا يُباع لا يُحسب، وما يُباع من دماره يُحسب نموّاً. ولهذا يرى الكتاب أن مجتمع السوق يستخفّ بالبيئة استخفافاً إجرامياً.', 'What cannot be sold is not counted, and what can be sold from its destruction counts as growth. Which is why the book says market society criminally undervalues the environment.'),
  },
  epilogue: {
    q: L('لماذا يرفض المؤلّف آلة HALPEVAM؟', 'Why does the author refuse the HALPEVAM machine?'),
    opts: [L('لأنها باهظة الثمن', 'Because it is too expensive'), L('لأن السعادة الحقيقية تحتاج ذاتاً تتغيّر، والآلة تجمّد رغباتك', 'Because real happiness needs a self that can change, and the machine freezes your desires'), L('لأن الآلات لا تستطيع أن تُسعد أحداً', 'Because machines can’t make anyone happy')],
    correct: 1,
    note: L('«يودايمونيا»: ازدهارٌ يتغيّر فيه المرء بالصراع مع عالمٍ لا يمنحه كلّ شيء. ومجتمع السوق، كالآلة، يحاول إشباع رغباتنا — هدفٌ ما كان ينبغي أن يتحقّق.', 'Eudaimonia: a flourishing in which we change through conflict with a world that doesn’t give us everything. And market society, like the machine, tries to satisfy our preferences — a goal that should never be met.'),
  },
}

/* A chapter is a PANEL of «مراجعة الكتاب», so its check travels inside it as a
   `quick` block — the same delivery path as Stolen Focus's `panel()`. */
const panel = (s, extra = []) => ({
  id: s.slug,
  icon: s.icon,
  title: s.title,
  lead: s.lead,
  blocks: [...s.blocks, ...extra, ...(QUICK[s.slug] ? [{ type: 'quick', quick: QUICK[s.slug] }] : [])],
})

/* Author and translator in ONE tab, one heading each — same as the other books. */
const people = {
  slug: 'author',
  icon: '✍️',
  title: L('المؤلّف والمترجم', 'Author & Translator'),
  lead: L(
    'يانيس فاروفاكيس الذي كتب الكتاب لابنته، وعماد شيحة الذي نقله إلى العربية — كلاهما هنا.',
    'Yanis Varoufakis, who wrote the book for his daughter, and Imad Shiha, who brought it into Arabic — both here.'
  ),
  blocks: [
    { type: 'tabs', panels: [
      { id: 'author', title: L('المؤلّف', 'The author'), blocks: author.blocks },
      { id: 'translator', title: L('المترجم', 'The translator'), blocks: translator.blocks },
    ] },
  ],
}

/* THE WHOLE BOOK IN ONE TAB — eight chapters and the epilogue, in order. Deep
   links are `…/review?open=banking`. The club's three fact-checks go against
   the chapters whose claims they correct, not on a page of their own. */
const review = {
  slug: 'review',
  icon: '📖',
  title: L('مراجعة الكتاب', 'The Book'),
  lead: L(
    'فصول الكتاب الثمانية وخاتمته بترتيبها، فصلاً بعد فصل — من سؤال اللامساواة إلى آلة HALPEVAM.',
    'The book’s eight chapters and its epilogue in order, one after another — from the question of inequality to the HALPEVAM machine.'
  ),
  blocks: [
    { type: 'tabs', panels: [
      panel(inequality),
      panel(marketSociety, bloodCheck),
      panel(debtProfit),
      panel(banking),
      panel(oedipalMarkets),
      panel(hauntedMachines),
      panel(apoliticalMoney, bitcoinCheck),
      panel(stupidViruses, easterIslandCheck),
      panel(epilogue),
    ] },
  ],
}

const activities = {
  slug: 'activities',
  kind: 'activities',
  icon: '🎯',
  title: L('أنشطة إضافية', 'Extra activities'),
  lead: L(
    'كلّ ما تفعله بعد القراءة في صفحةٍ واحدة: خمّن ما حدث في التجارب والحوادث، والعب «خرافة أم حقيقة؟»، وتعرّف إلى شخصيات الكتاب.',
    'Everything you do after reading, on one page: guess what happened in the experiments and episodes, play “Myth or Fact?”, and meet the book’s cast.'
  ),
  parts: [
    {
      id: 'studies',
      kind: 'quiz',
      icon: '🔬',
      title: L('تجارب وحوادث', 'Experiments & Episodes'),
      lead: L(
        'اثنتان وعشرون تجربةً وحادثةً وتجربةً فكرية من الكتاب ومن ملخّص النادي المرافق، كلعبة تخمين: اقرأ ما جرى، خمّن النتيجة، ثم اكشفها.',
        'Twenty-two experiments, episodes and thought experiments from the book and the club’s companion, as a guessing game: read what happened, predict the outcome, then reveal it.'
      ),
      studies,
      interestOrder,
      // What the landing's chip calls them — these are not studies.
      countLabel: L('تجربةً وحادثة', 'experiments & episodes'),
    },
    {
      id: 'myth-or-fact',
      kind: 'myth-game',
      icon: '🎲',
      title: L('خرافة أم حقيقة؟', 'Myth or Fact?'),
      lead: L(
        'عبارةٌ واحدة في كلّ مرّة — قرّر: خرافةٌ شائعة عن الاقتصاد، أم حقيقةٌ من الكتاب؟ ثم اقرأ لماذا.',
        'One statement at a time — decide: a common myth about the economy, or a fact from the book? Then read why.'
      ),
      items: mythOrFact,
    },
    { id: 'characters', icon: characters.icon, title: characters.title,
      lead: characters.lead, blocks: characters.blocks },
  ],
}

export const talkingToMyDaughter = {
  id: 'talking-to-my-daughter',
  // The Arabic title, author and translator are the Dar Al Saqi edition's own
  // (read off its title page); the English is the 2017 Bodley Head edition's.
  title: L('الاقتصاد كما أشرحه لابنتي', 'Talking to My Daughter About the Economy'),
  // English only: the Arabic edition prints no subtitle, and the house rule is to
  // follow the published edition rather than translate one into existence.
  subtitle: L('', 'A Brief History of Capitalism'),
  author: L('يانيس فاروفاكيس', 'Yanis Varoufakis'),
  authorPhoto: './images/characters/yanis-varoufakis.webp',
  cover: L('./images/talking-to-my-daughter-cover-ar.jpg', './images/talking-to-my-daughter-cover-en.jpg'),
  blurb: L(
    'وزير مالية اليونان السابق يشرح لابنته المراهقة الاقتصاد بلا مصطلحات: من أين جاءت اللامساواة، وكيف يخلق المصرفيون المال من العدم، ولماذا لا يمكن أن يكون المال بلا سياسة — بقصصٍ من فاوست وأوديب و«ماتريكس».',
    'Greece’s former finance minister explains the economy to his teenage daughter without jargon: where inequality came from, how bankers create money from thin air, and why money can never be free of politics — through stories from Faust, Oedipus and The Matrix.'
  ),
  verdict,
  accent: 'var(--accent)',
  groups: [
    { slug: 'author' },
    { slug: 'review' },
    { slug: 'debt-usury' },
    { slug: 'activities' },
  ],
  sections: [
    people,
    review,
    debtSection,
    activities,
  ],
}
