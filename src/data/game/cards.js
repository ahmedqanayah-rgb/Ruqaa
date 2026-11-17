/* ============================================================================
   «رُقعة النرد» — the chance cards and the dares (the question decks live with
   each book, in books/<slug>/game.js).
   ----------------------------------------------------------------------------
   CHANCE («حظّ»). `text` is the STORY ONLY — it never says what happens. What
   happens is `effect`, and the card prints that line itself from the effect
   (lib/game/effects.js), so the words on the card and what the game does
   cannot drift apart. Every story is a real thing from one of the books, which
   is the point: a card that sends you back three squares for an all-nighter is
   the book's argument, told as a board game.

   The game's only currency is SQUARES — where you stand is your score — so
   every effect moves tokens:
     { kind: 'move',   n }            this player moves n squares (negative = back)
     { kind: 'others', n }            every OTHER player moves n squares
     { kind: 'all',    n }            everyone moves n squares
     { kind: 'again' }                roll again
     { kind: 'skip' }                 miss the next turn
     { kind: 'steal',  n }            take up to n squares from whoever is furthest ahead
     { kind: 'swap' }                 swap places with the nearest player ahead
     { kind: 'loan',   now, later }   forward `now` at once, back `later` before the next roll
   No card can carry anyone over the finish line: the game is not won on luck.

   `book` ties a card to the book its story is from: a game played with only
   some of the books draws only their cards (and the cards with no book).

   DARES («تحدٍّ»). Performed out loud on the call by whoever landed on the
   square; everyone else is the jury and votes on their own phone (a tie
   passes). Each one should take under twenty seconds, need no props, and work
   with cameras on or off unless it says otherwise.
   ========================================================================== */

const L = (ar, en) => ({ ar, en })
const luck = (id, book, text, effect) => ({ id, book, text, effect })
const dare = (id, book, text) => ({ id, book, text })

const WS = 'why-we-sleep'
const SF = 'stolen-focus'
const TD = 'talking-to-my-daughter'

export const luckCards = [
  /* ---------------------------- لماذا ننام ---------------------------- */
  luck('l-ws-eight', WS,
    L('نمتَ ثماني ساعاتٍ كاملة. دماغك مغسولٌ ولامع.', 'You slept a full eight hours. Your brain is washed and gleaming.'),
    { kind: 'move', n: 3 }),
  luck('l-ws-allnighter', WS,
    L('سهرتَ حتى الفجر «لتنجز أكثر». أداؤك الآن كأداء من تجاوز الحدّ القانوني للكحول.',
      'You stayed up till dawn “to get more done”. You now perform like someone over the legal limit.'),
    { kind: 'move', n: -3 }),
  luck('l-ws-nap', WS,
    L('قيلولة «ناسا»: ٢٦ دقيقة، وارتفع أداؤك ٣٤٪.', 'The NASA nap: 26 minutes, and your performance is up 34%.'),
    { kind: 'again' }),
  luck('l-ws-coffee', WS,
    L('قهوةٌ بعد العصر. نصف كافيينها ما زال في دمك عند منتصف الليل، وأنت تتقلّب في السرير.',
      'Coffee in the late afternoon. Half its caffeine is still in your blood at midnight, and you are staring at the ceiling.'),
    { kind: 'skip' }),
  luck('l-ws-clocks', WS,
    L('تقدّمت الساعة في الربيع، وسُرقت ساعةٌ من نوم الجميع.', 'The clocks went forward in spring, and an hour of everyone’s sleep was stolen.'),
    { kind: 'all', n: -1 }),
  luck('l-ws-dream', WS,
    L('حلمتَ بالحلّ، كما حلم مندلييف بجدوله الدوري.', 'You dreamed the answer, the way Mendeleev dreamed his periodic table.'),
    { kind: 'move', n: 2 }),

  /* -------------------------- تركيزنا المسلوب -------------------------- */
  luck('l-sf-notification', SF,
    L('إشعار! «شخصٌ ما أعجبه شيءٌ ما». التقطتَ هاتفك للمرّة ٢٦١٧ اليوم.',
      'A notification! “Somebody liked something.” You pick up your phone for the 2,617th time today.'),
    { kind: 'move', n: -2 }),
  luck('l-sf-flow', SF,
    L('أغلقتَ الإشعارات كلّها ودخلتَ حالة التدفّق.', 'You switched off every notification and slipped into flow.'),
    { kind: 'move', n: 3 }),
  luck('l-sf-scroll', SF,
    L('تمريرٌ لا نهائي: دخلتَ لتتفقّد شيئاً واحداً، وخرجتَ بعد ساعة.',
      'Infinite scroll: you went in to check one thing, and came out an hour later.'),
    { kind: 'skip' }),
  luck('l-sf-retreat', SF,
    L('ثلاثة أشهرٍ بلا إنترنت في بروفينستاون. عاد إليك تركيزك.',
      'Three months offline in Provincetown. Your focus has come back.'),
    { kind: 'move', n: 2 }),
  luck('l-sf-four-days', SF,
    L('أسبوع عملٍ من أربعة أيام: ارتفعت إنتاجيّتك ٤٠٪.', 'A four-day week: your productivity is up 40%.'),
    { kind: 'again' }),
  luck('l-sf-steal', SF,
    L('تركيزٌ مسلوب! لكنّك هذه المرّة أنت السالب.', 'Stolen focus! Only this time, you are the thief.'),
    { kind: 'steal', n: 2 }),
  luck('l-sf-outrage', SF,
    L('منشورٌ غاضب انتشر كالنار: الخوارزمية تكافئ الغضب، والجميع توقّف ليتشاجر.',
      'An outraged post goes viral: the algorithm rewards anger, and everyone stops to argue.'),
    { kind: 'others', n: -1 }),

  /* --------------------- الاقتصاد كما أشرحه لابنتي --------------------- */
  luck('l-td-loan', TD,
    L('كتب المصرف رقماً بجانب اسمك: مالٌ من العدم! لكنّ الدَّين يُسدَّد بفائدته قبل رميتك القادمة.',
      'The bank typed a number next to your name: money from thin air! But the debt is repaid, with interest, before your next roll.'),
    { kind: 'loan', now: 3, later: 4 }),
  luck('l-td-bombing', TD,
    L('ليلة القصف في المعسكر: دخّن الجميع سجائرهم، فارتفعت قيمة ما بقي معك.',
      'The night of the bombing in the camp: everyone smoked their cigarettes, so what you have left is worth more.'),
    { kind: 'move', n: 2 }),
  luck('l-td-sheep', TD,
    L('طردك المالك من أرضه، ووضع مكانك خروفاً.', 'The landlord has evicted you and put a sheep in your place.'),
    { kind: 'move', n: -3 }),
  luck('l-td-forest', TD,
    L('احترقت الغابة… فـ«نما» الاقتصاد. منطقٌ عجيب، لكنه في صالحك.',
      'The forest burned down… so the economy “grew”. Strange logic, but it works in your favour.'),
    { kind: 'move', n: 1 }),
  luck('l-td-crash', TD,
    L('انهيار ١٩٢٩! الجميع يتراجع… إلا أنت.', 'The crash of 1929! Everyone falls back… except you.'),
    { kind: 'others', n: -2 }),
  luck('l-td-share', TD,
    L('في ماكرونيسوس تقاسم السجناء كلّ ما يصلهم، بلا مقابل.',
      'On Makronisos the prisoners shared whatever reached them, for nothing.'),
    { kind: 'all', n: 1 }),
  luck('l-td-arbitrage', TD,
    L('مراجحة! اشتريتَ الشاي رخيصاً من الفرنسيين وبعته غالياً للإنجليز.',
      'Arbitrage! You bought tea cheap from the French and sold it dear to the English.'),
    { kind: 'swap' }),
  luck('l-td-stag', TD,
    L('أحد الصيّادين خشي أن يتراخى غيره، فالتفت إلى الأرانب البرّية — وتبعه الجميع.',
      'One hunter feared another would slacken and turned to the hares — and everyone followed.'),
    { kind: 'all', n: -1 }),
]

export const dares = [
  dare('d-yawn', WS,
    L('تثاءب تثاؤباً مقنعاً. إن تثاءب بعدك أحدٌ في الجلسة فقد نجحت.',
      'Give us one convincing yawn. If anyone on the call yawns after you, you pass.')),
  dare('d-nap-ad', WS,
    L('قدّم إعلاناً من خمس عشرة ثانية لمنتجٍ جديد اسمه «القيلولة».',
      'Give a fifteen-second advert for a brand-new product called “the nap”.')),
  dare('d-dream', WS,
    L('اروِ أغرب حلمٍ تذكره، في جملتين. تنجح إن ضحك أحد.',
      'Tell the strangest dream you remember, in two sentences. You pass if anyone laughs.')),
  dare('d-allnighter', WS,
    L('دافِع في خمس عشرة ثانية عن السهر للمذاكرة ليلة الامتحان… ثم اعتذر للعلم.',
      'Defend pulling an all-nighter before an exam, for fifteen seconds… then apologise to science.')),
  dare('d-late', WS,
    L('اختلق أسخف عذرٍ للتأخّر عن جلسة النادي بسبب النوم. تنجح إن ضحك أحد.',
      'Invent the silliest sleep-related excuse for being late to the club session. You pass if anyone laughs.')),

  dare('d-five-thieves', SF,
    L('سمِّ خمسة أشياء تسرق تركيزك، في عشر ثوانٍ.', 'Name five things that steal your focus, in ten seconds.')),
  dare('d-mime', SF,
    L('مثّل بلا كلام: قارئٌ يحاول أن يقرأ وهاتفه لا يكفّ عن الرنين. تنجح إن عرفوا ما تمثّله.',
      'Mime it, no words: a reader trying to read while the phone will not stop buzzing. You pass if they guess it.')),
  dare('d-flow-taboo', SF,
    L('اشرح «حالة التدفّق» دون أن تقول: تركيز، انتباه، تدفّق.',
      'Explain “flow” without saying: focus, attention, flow.')),
  dare('d-law', SF,
    L('اقترح قانوناً واحداً يحمي انتباه البشر. تنجح إن صوّتت له المجموعة.',
      'Propose one law to protect human attention. You pass if the group votes for it.')),
  dare('d-switch', SF,
    L('عُدّ تنازلياً من عشرة، بالعربية والإنجليزية بالتناوب: عشرة، nine، ثمانية… خطأٌ واحد وتخسر.',
      'Count down from ten, alternating Arabic and English: عشرة, nine, ثمانية… One slip and you fail.')),

  dare('d-money-child', TD,
    L('اشرح «من أين يأتي المال؟» في عشر ثوانٍ، كأنك تشرح لطفلٍ في الخامسة.',
      'Explain “where does money come from?” in ten seconds, as if to a five-year-old.')),
  dare('d-banker', TD,
    L('أنت مصرفيّ: امنح أحد الحاضرين قرضاً «من العدم»، وأقنعه بالتوقيع.',
      'You are a banker: grant someone here a loan “from thin air”, and talk them into signing.')),
  dare('d-sell', TD,
    L('بِع للمجموعة شيئاً أمامك الآن على المكتب، في خمس عشرة ثانية. تنجح إن «اشتراه» أحد.',
      'Sell the group something on your desk right now, in fifteen seconds. You pass if anyone “buys” it.')),
  dare('d-barter', TD,
    L('لا نقود في هذا العالم: قايِض أحد الحاضرين — ماذا تعطيه مقابل كتابه المفضّل؟ تنجح إن قبل.',
      'There is no money in this world: barter with someone here — what will you give for their favourite book? You pass if they accept.')),

  /* --------------------------- for any book --------------------------- */
  dare('d-last-book', null,
    L('اذكر آخر كتابٍ قرأته خارج النادي، وجملةً واحدة عنه.',
      'Name the last book you read outside the club, and say one sentence about it.')),
  dare('d-straight-face', null,
    L('عشر ثوانٍ بلا ضحكٍ ولا ابتسام، والجميع يحاول إضحاكك.',
      'Ten seconds without laughing or smiling, while everyone tries to crack you.')),
  dare('d-changed', null,
    L('اذكر فكرةً واحدة من كتب النادي غيّرت شيئاً في يومك. تنجح بمجرّد أن تَصدُق.',
      'Name one idea from the club’s books that changed something in your day. You pass simply by being honest.')),
]
