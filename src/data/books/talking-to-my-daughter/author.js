/*
 * «عن المؤلّف» — Yanis Varoufakis. Facts checked against his English Wikipedia
 * entry (October 2026); the "how the book was born" part is his own prologue.
 *
 * His daughter appears here only as the person the book is written to — the
 * book's own framing. No photograph of her: she is a private person, and was
 * photographed as a minor. See scripts/prep-economy-images.mjs.
 */
const L = (ar, en) => ({ ar, en })
const port = (f) => `./images/characters/${f.replace(/\.\w+$/, '')}.webp`

export const author = {
  blocks: [
    { type: 'image', src: port('yanis-varoufakis.jpg'), wide: true,
      alt: L('يانيس فاروفاكيس', 'Yanis Varoufakis'),
      caption: L('الاقتصاديّ يانيس فاروفاكيس (Yanis Varoufakis).', 'The economist Yanis Varoufakis.') },

    { type: 'p', text: L(
      '**يانيس فاروفاكيس (Yanis Varoufakis)** اقتصاديّ يونانيّ وُلد في أثينا في **٢٤ مارس ١٩٦١**. أستاذٌ جامعيّ أمضى معظم مسيرته في بريطانيا وأستراليا، ثم صار عام **٢٠١٥** وزيراً لمالية اليونان في ذروة أزمتها — ستّة أشهرٍ جعلته من أشهر الاقتصاديين في العالم.',
      '**Yanis Varoufakis** is a Greek economist, born in Athens on **24 March 1961**. An academic who spent most of his career in Britain and Australia, he became Greece’s finance minister in **2015**, at the height of its crisis — six months that made him one of the best-known economists in the world.'
    ) },

    { type: 'h', text: L('من إسكس إلى سيدني وأثينا', 'From Essex to Sydney and Athens') },
    { type: 'p', text: L(
      'درس الاقتصاد والرياضيات في بريطانيا: البكالوريوس في **جامعة إسكس**، ثم ماجستير الإحصاء الرياضيّ في **جامعة برمنغهام** (١٩٨٢)، ثم الدكتوراه في الاقتصاد من إسكس (١٩٨٧). درّس في إسكس وإيست أنغليا وكامبريدج، ثم في **جامعة سيدني** بين ١٩٨٨ و٢٠٠٠ — ولهذا نشأت ابنته في أستراليا — ثم عاد أستاذاً في **جامعة أثينا**. وتخصّصه الأصلي **نظرية الألعاب**، التي ألّف فيها كتاباً جامعياً، وهي ظاهرةٌ في هذا الكتاب: صيد الأيل في الفصل الخامس مسألةٌ من مسائلها.',
      'He studied economics and mathematics in Britain: a first degree at the **University of Essex**, an MSc in mathematical statistics at the **University of Birmingham** (1982), and a doctorate in economics from Essex (1987). He taught at Essex, East Anglia and Cambridge, then at the **University of Sydney** from 1988 to 2000 — which is why his daughter grew up in Australia — before returning as a professor at the **University of Athens**. His field is **game theory**, on which he co-wrote a textbook, and it shows in this book: the stag hunt in chapter five is one of its classic problems.'
    ) },

    { type: 'h', text: L('ستّة أشهر في وزارة المالية', 'Six months as finance minister') },
    { type: 'p', text: L(
      'في يناير **٢٠١٥** عُيّن وزيراً للمالية في حكومة ألكسيس تسيبراس، ليفاوض دائني اليونان — الاتحاد الأوروبي والبنك المركزي الأوروبي وصندوق النقد الدولي — على ديونها وشروط التقشّف المفروضة عليها. وفي **٦ يوليو ٢٠١٥**، غداة استفتاءٍ رفض فيه اليونانيون عرض الدائنين، استقال، رافضاً ما رآه استسلاماً للتقشّف. روى تلك الأشهر في مذكّراته **«راشدون في الغرفة» (Adults in the Room)**، التي حوّلها المخرج كوستا غافراس إلى فيلم (٢٠١٩).',
      'In January **2015** he became finance minister in Alexis Tsipras’s government, to negotiate with Greece’s creditors — the EU, the European Central Bank and the IMF — over its debts and the austerity attached to them. On **6 July 2015**, the day after a referendum in which Greeks rejected the creditors’ proposal, he resigned, opposed to what he saw as a surrender to austerity. He told the story of those months in his memoir **Adults in the Room**, which Costa-Gavras made into a film (2019).'
    ) },
    { type: 'p', text: L(
      'بعدها شارك في تأسيس **حركة الديمقراطية في أوروبا (DiEM25)** في برلين سنة ٢٠١٦، ثم حزباً يونانياً سنة ٢٠١٨ نال به مقعداً في البرلمان بين ٢٠١٩ و٢٠٢٣.',
      'Afterwards he co-founded the **Democracy in Europe Movement (DiEM25)** in Berlin in 2016, then a Greek party in 2018, which took him back into parliament from 2019 to 2023.'
    ) },

    { type: 'h', text: L('كتبه', 'His books') },
    { type: 'ul', items: [
      L('**«المينوتور العالمي» (The Global Minotaur)** (٢٠١١) عن الاقتصاد العالميّ منذ الحرب العالمية الثانية وأزمة ٢٠٠٨.',
        '**The Global Minotaur** (2011), on the world economy from the Second World War to the 2008 crash.'),
      L('**«والضعفاء يعانون ما يجب عليهم أن يعانوه؟» (And the Weak Suffer What They Must?)** (٢٠١٦) عن أوروبا والتقشّف.',
        '**And the Weak Suffer What They Must?** (2016), on Europe and austerity.'),
      L('**«راشدون في الغرفة» (Adults in the Room)** (٢٠١٧): مذكّراته في الوزارة.',
        '**Adults in the Room** (2017): his memoir of the ministry.'),
      L('**«الاقتصاد كما أشرحه لابنتي»** — صدر باليونانية ٢٠١٣، وبالإنجليزية ٢٠١٧. موضوع هذا الموقع.',
        '**Talking to My Daughter About the Economy** — published in Greek in 2013 and in English in 2017. The subject of this site.'),
      L('**«الآن الآخر» (Another Now)** (٢٠٢٠): روايةٌ عن مجتمعٍ ما بعد الرأسمالية.',
        '**Another Now** (2020): a novel about a post-capitalist society.'),
      L('**«الإقطاع التقني» (Technofeudalism)** (٢٠٢٣): أطروحته بأن رأسمالية المنصّات الرقمية لم تعد رأسماليةً أصلاً.',
        '**Technofeudalism** (2023): his argument that the capitalism of the digital platforms is no longer capitalism at all.'),
    ] },

    { type: 'h', text: L('كيف وُلد هذا الكتاب', 'How this book was born') },
    { type: 'p', text: L(
      'سنة **٢٠١٣** دعاه ناشره اليوناني إلى أن يكلّم الشبّان مباشرةً عن الاقتصاد. وكان دافعه قناعةً يكرّرها: **الاقتصاد أهمّ من أن يُترك للاقتصاديين** — وإن لم تستطع أن تشرحه بلغةٍ يفهمها الشبّان فأنت لا تفهمه. ودافعٌ آخر أقرب: ابنته **كسينيا** تعيش في أستراليا وهو في اليونان، فإمّا أنّهما بعيدان، وإمّا يعدّان الأيام إلى الفراق التالي. فكتب كأنه يحدّثها عمّا لم يتّسع الوقت للحديث عنه.',
      'In **2013** his Greek publisher invited him to talk directly to young people about the economy. His reason for accepting is a conviction he repeats: **the economy is too important to leave to the economists** — and if you cannot explain it in language young people understand, you don’t understand it yourself. There was a closer reason too: his daughter **Xenia** lives in Australia and he in Greece, so they are either far apart or counting the days to the next parting. So he wrote as if talking to her about the things there had never been time for.'
    ) },
    { type: 'p', text: L(
      'كتبه **باليونانية في تسعة أيام** في بيت العائلة بجزيرة إيجينا، بلا خطّةٍ ولا فهرسٍ مسبق، وهو كتابه الوحيد بلا حواشٍ ولا مراجع. وبعد عامٍ من صدوره صار وزيراً، فتُرجم إلى لغاتٍ كثيرة — وظلّ الإنجليزية آخرها، حتى صدر بها سنة ٢٠١٧.',
      'He wrote it **in Greek in nine days** at the family house on the island of Aegina, with no plan or table of contents, and it is his only book with no footnotes or references. A year after it appeared he became a minister, and it was translated into many languages — English last of all, in 2017.'
    ) },
    { type: 'callout', variant: 'key', title: L('لماذا لا ترد كلمة «الرأسمالية»؟', 'Why the word “capitalism” never appears'), text: L(
      'يتجنّب الكتاب عمداً كلمتَي «رأس المال» و«الرأسمالية»، لا لعيبٍ فيهما بل لأن ما تحمّلتاه من أثقالٍ يحجب جوهر الأشياء. فيقول **«مجتمع السوق»** بدل الرأسمالية، و**«الآلات»** و**«وسائل الإنتاج المُنتَجة»** بدل رأس المال. وهذا مفتاحٌ لقراءة كلّ فصل.',
      'The book avoids the words “capital” and “capitalism” on purpose — not because anything is wrong with them, but because their baggage gets in the way of seeing the essence of things. So it says **“market society”** for capitalism, and **“machinery”** or **“produced means of production”** for capital. That is a key to reading every chapter.'
    ) },
    { type: 'p', text: L(
      'ويعترف بأن الكتاب «مليءٌ بأفكارٍ وقصصٍ جمعها أو استعارها أو نهبها» منذ الثمانينيات، ويسمّي أربعة كتب: «أسلحة، جراثيم، وفولاذ» لجارد دايموند، و«علاقة الهبة» لريتشارد تيتموس عن سوق الدم، و«الفلاسفة الدنيويون» لروبرت هيلبرونر، و«رَدّ الدَّين» (Payback) لمارغريت آتوود، الذي يراه أمتع ما كُتب عن الدَّين. ثم شبح كارل ماركس، والتراجيديا الأثينية، و«مغالطة التركيب» عند كينز، وبرتولت بريشت.',
      'He admits the book is riddled with ideas and stories he has collected, borrowed or plundered since the early 1980s, and names four books: Jared Diamond’s Guns, Germs and Steel; Richard Titmuss’s The Gift Relationship, on the market for blood; Robert Heilbroner’s The Worldly Philosophers; and Margaret Atwood’s Payback, which he calls perhaps the most entertaining book ever written on debt. Then the spectre of Karl Marx, the Athenian tragedians, Keynes’s “fallacy of composition”, and Bertolt Brecht.'
    ) },

    { type: 'callout', variant: 'note', title: L('ملاحظة للقراءة (للتوازن)', 'A note for reading (for balance)'), text: L(
      'هذا كتاب سياسيٍّ له موقف، لا كتابٌ مدرسيّ محايد — وهو يقول ذلك صراحةً في فصله الأخير: «لن أدّعي الحياد». قراءته لاستقلال المصارف المركزية، ولأسواق الانبعاثات، ولأسباب البطالة، يخالفه فيها اقتصاديّون كثيرون. اقرأه حجّةً تُناقَش، لا خلاصةً للعلم — وهو ما سيرضيه على الأرجح، فرسالة الكتاب كلّها ألّا نترك الاقتصاد لمن يدّعون امتلاك الحقيقة فيه.',
      'This is a book by a politician with a position, not a neutral textbook — and it says so plainly in its last chapter: “I am not going to pretend to be neutral.” Many economists disagree with its reading of independent central banks, emissions markets and the causes of unemployment. Read it as an argument to be debated, not a summary of settled science — which would probably please him, since the book’s whole message is not to leave the economy to those who claim to own the truth about it.'
    ) },
  ],
}
