/* ============================================================================
   «رُقعة النرد» — this book's rounds for the club's board game.
   The house rules for writing a round, and the shape of every kind, are at the
   top of books/why-we-sleep/game.js. In short: the right answer is a fact the
   site states; every wrong answer is one a half-informed player could believe;
   the fun is in the setup and the `why`; the first option is the right one.

   The Arabic follows the translation the club reads (see the header of
   chapters-2.js): الظبي والأرانب البرّية، البرّادات، الشوكولا، انكماش الأسعار،
   كزافييه. Where the club's own check corrected the book — Bitcoin's last coin
   — the question asks what the CHECK found.
   ========================================================================== */
import { curve, poly } from '../../../lib/game/chart.js'

const L = (ar, en) => ({ ar, en })
const mcq = (id, q, opts, why) => ({ id, q, opts, why })
const num = (id, q, a, extra, why) => ({ id, q, a, ...extra, why })
const who = (id, name, clues, why, img) => ({ id, name, clues, why, ...(img ? { img } : {}) })
const bluff = (id, q, truth, alt, decoys, why) => ({ id, q, truth, alt, decoys, why })

/* «خمّن الصورة» — pictures already on this site. `name` rounds are answered by
   typing (lib/game/match.js forgives typos and spellings; every acceptable short
   form goes in `aliases`, and decks.js checks no wrong option would pass);
   `book` rounds ask which of the club's books the picture is from. `view`
   zooms past a printed title or margin. */
const picName = (id, img, name, aliases, wrong, hints, why, extra = {}) => ({ id, kind: 'name', img, name, aliases, opts: [name, ...wrong], hints, why, ...extra })
const picBook = (id, img, hints, why, extra = {}) => ({ id, kind: 'book', img, hints, why, ...extra })
const WHO = L('من هذا؟', 'Who is this?')

/* «من هذا؟» — a face from this book's people (their card on this site), and
   four names to choose from. `tag` and `about` are what is read out after the
   answer; `f` marks a woman, so the other names offered are women's too. */
const face = (id, img, name, tag, about, f) => ({ id, img, name, tag, about, ...(f ? { f: 1 } : {}) })

export const gameIcon = '⚖️'

/* ------------------------------- questions ------------------------------- */
const mcqs = [
  mcq('td-first-writing',
    L('اختُرعت الكتابة في بلاد ما بين النهرين. ماذا سجّلت أولى النصوص؟', 'Writing was invented in Mesopotamia. What did the very first texts record?'),
    [L('كم بقي من قمح كلّ مزارعٍ في المخزن المشترك', 'How much grain each farmer had in the common granary'),
      L('صلواتٍ للآلهة', 'Prayers to the gods'),
      L('قوانين الملك', 'The king’s laws'),
      L('أسماء الملوك وانتصاراتهم', 'The names and victories of kings')],
    L('إيصالاتٌ تُثبت أن السيد نابوك أودع قمحه. الكتابة ابنة الفائض — ومعها الدَّين والمال.', 'Receipts proving Mr Nabuk had deposited his grain. Writing is a child of the surplus — and so are debt and money.')),

  mcq('td-australia',
    L('لماذا غزا البريطانيون أستراليا، ولم يغزُ سكّانها الأصليون بريطانيا؟', 'Why did the British invade Australia, and not the Aboriginal Australians invade Britain?'),
    [L('الجغرافيا: زراعة أوراسيا أنتجت فائضاً — ومعه جيوشٌ وسفنٌ وجراثيم', 'Geography: Eurasian farming made a surplus — and with it armies, ships and germs'),
      L('أسلحةٌ أفضل اخترعها أناسٌ أذكى', 'Better weapons, invented by cleverer people'),
      L('كانت أستراليا شبه خالية حين وصلوا', 'Australia was nearly empty when they arrived'),
      L('لم يعرف سكّانها الأصليون صناعة القوارب', 'The Aboriginal Australians never built boats')],
    L('حيث الطعام وفير لا يحتاج أحدٌ إلى الزراعة، فلا يولد فائض — لا كتابة ولا جيوش. والجينات بريئة.', 'Where food is plentiful nobody needs to farm, so no surplus is born — no writing, no armies. DNA had nothing to do with it.')),

  mcq('td-thin-air',
    L('اقترضت مريم نصف مليون من المصرف. من أين جاء المصرف بالمال؟', 'Miriam borrows half a million from the bank. Where does the bank get it?'),
    [L('من العدم: كتب الرقم في حسابها', 'From thin air: it typed the number into her account'),
      L('من مدّخرات زبائن آخرين', 'From other customers’ savings'),
      L('من خزنة المصرف المركزي', 'From the central bank’s vault'),
      L('من أرباحه المتراكمة', 'From its accumulated profits')],
    L('القرض يخلق الوديعة لا العكس. ومصرف إنجلترا نفسه يقول إن نحو ٩٧٪ من المال ودائع خلقتها المصارف حين أقرضت.', 'The loan creates the deposit, not the other way round. The Bank of England itself says about 97% of money is deposits banks created by lending.')),

  mcq('td-credit',
    L('كلمة «credit» (الائتمان) من الفعل اللاتيني «credere». ما معناه؟', 'The word “credit” comes from the Latin verb “credere”. What does it mean?'),
    [L('أن تؤمن', 'To believe'), L('أن تُقرض', 'To lend'), L('أن تَدين', 'To owe'), L('أن تحسب', 'To count')],
    L('أن تؤمن. الدَّين والمال يقومان على إيمانٍ بأن الوعد سيُوفى — من صَدَفة نابوك إلى الأرقام في حسابك.', 'To believe. Debt and money rest on faith that a promise will be kept — from Nabuk’s shell to the numbers in your account.')),

  mcq('td-oikonomia',
    L('من الكلمة اليونانية «أويكونوميا» جاءت كلمة «اقتصاد». ماذا كانت تعني؟', 'The Greek “oikonomia” gave us “economy”. What did it originally mean?'),
    [L('قواعد إدارة البيت', 'The rules of running a household'), L('قوانين السوق', 'The laws of the marketplace'), L('فنّ المقايضة', 'The art of barter'), L('عدّ النقود', 'The counting of coins')],
    L('«أويكوس» البيت و«نوموي» القواعد. ولأن الإنتاج غادر البيت منذ زمن، يقترح الكتاب اسماً أصدق: «أغورانوميا» — قوانين السوق. (وهو الخيار الذي ظننتَه صحيحاً، أليس كذلك؟)',
      'Oikos (household) plus nomoi (rules). Since production left the household long ago, the book suggests a truer name: “agoranomy”, the laws of the market — the option that tempted you.')),

  mcq('td-idiotis',
    L('في أثينا القديمة، من كان يُسمّى «إديوتيس»؟', 'In ancient Athens, who was called an “idiotis”?'),
    [L('من يهتمّ بشؤونه وحدها ويهمل الشأن العام', 'Someone who minded only their own business and ignored public affairs'),
      L('من لا يعرف القراءة', 'Someone who couldn’t read'),
      L('الغريب الذي لا جنسية له', 'A foreigner without citizenship'),
      L('العبد المحرَّر', 'A freed slave')],
    L('ثم جعلتها الإنجليزية تعني الأحمق. وبالمعنيين، يقول الكتاب، جعلتنا مجتمعات السوق «إديوتس».', 'English later made the word mean a fool. In both senses, the book says, market societies have made idiots of us.')),

  mcq('td-bombing',
    L('ليلةً سقطت القنابل قرب المعسكر، فدخّن الأسرى المذعورون حتى الفجر. ماذا حدث للأسعار صباحاً؟', 'One night bombs fell near the camp, and the terrified prisoners smoked till dawn. What happened to prices in the morning?'),
    [L('انخفضت: صارت السيجارة الواحدة تشتري أكثر', 'They fell: each cigarette bought more'),
      L('ارتفعت: الجميع أراد الشوكولا', 'They rose: everyone wanted chocolate'),
      L('ارتفعت: الذعر رفع كلّ شيء', 'They rose: panic pushed everything up'),
      L('لم تتغيّر', 'They didn’t change')],
    L('انكماش الأسعار: لوح الشوكولا الذي كان بخمس سجائر صار بواحدة. قيمة العملة في ندرتها، لا في كلفة صنعها.', 'Price deflation: a chocolate bar that cost five cigarettes now cost one. A currency’s value lies in its scarcity, not in what it cost to make.')),

  mcq('td-pharaoh',
    L('لنفترض أن جيمس واط عرض محرّكه البخاري على فرعون مصر. ما الذي كان سيحدث للمحرّك؟', 'Suppose James Watt had shown his steam engine to the Pharaoh. What would have become of it?'),
    [L('تحفةٌ في القصر يتباهى بها أمام الزوّار', 'A curiosity in the palace to dazzle visitors'),
      L('أهرامٌ تُبنى في نصف الوقت', 'Pyramids built in half the time'),
      L('أوّل مصنعٍ في التاريخ', 'The first factory in history'),
      L('يحظره ليحمي أعمال العبيد', 'He’d ban it to protect the slaves’ work')],
    L('لا شيء يدفع فرعوناً يملك مئات آلاف العبيد إلى استعماله في الإنتاج. الآلات انتشرت لأن أصحاب مشاريع مدينين تنافسوا على الربح.', 'Nothing would push a pharaoh with hundreds of thousands of slaves to put it to work. Machines spread because indebted entrepreneurs competed for profit.')),

  mcq('td-iphone',
    L('يُباع «آيفون» بنحو ٦٠٠ جنيه. كم يذهب منها إلى المصنع الذي جمّعه؟', 'An iPhone sells for about £600. How much of that goes to the factory that assembled it?'),
    [L('أقلّ من ١٥٠ جنيهاً', 'Less than £150'), L('نحو ٢٥٠ جنيهاً', 'About £250'), L('نحو ٣٥٠ جنيهاً', 'About £350'), L('نحو ٥٠٠ جنيه', 'About £500')],
    L('والباقي لـ«أبل» ثمناً لملكيّتها الفكرية. ومن هنا سؤال الكتاب الحاسم: ماذا لو صارت الآلات تصمّم الآلات؟', 'Apple keeps the rest for its intellectual property. Hence the book’s decisive question: what if machines come to design machines?')),

  mcq('td-ecuador',
    L('سنة ٢٠٠٨ فعل دستور الإكوادور شيئاً لم يفعله دستورٌ قبله. ما هو؟', 'In 2008 Ecuador’s constitution did something no constitution had done before. What?'),
    [L('اعترف بحقوقٍ للطبيعة نفسها', 'It gave rights to nature itself'),
      L('اعتمد البيتكوين عملةً رسمية', 'It made bitcoin legal tender'),
      L('ألغى المصارف الخاصّة', 'It abolished private banks'),
      L('منع الإعلانات في الأماكن العامّة', 'It banned advertising in public spaces')],
    L('الغابة محميّةٌ لذاتها، أيّاً كانت قيمتها التبادلية. (والبيتكوين؟ تلك السلفادور، سنة ٢٠٢١.)', 'The rainforest protected for its own sake, whatever its exchange value. (Bitcoin? That was El Salvador, in 2021.)')),

  mcq('td-luddites',
    L('حطّم «اللوديون» الأنوال الجديدة. بحسب الكتاب، علامَ كان خلافهم الحقيقي؟', 'The Luddites smashed the new looms. According to the book, what was their real quarrel about?'),
    [L('على من يملك الآلات', 'Who owned the machines'),
      L('على الآلات ذاتها: خافوا التقدّم', 'The machines themselves: they feared progress'),
      L('على المنافسة الأجنبية', 'Foreign competition'),
      L('على ضجيج المصانع', 'The noise of the mills')],
    L('قلّةٌ قليلة أخذت المكاسب، ورُمي العمّال إلى الجوع. السؤال لم يكن يوماً «آلاتٌ أم لا؟» بل «لمن؟».', 'A tiny few took the gains while the workers were thrown into hunger. The question was never “machines or not?” but “whose?”.')),

  mcq('td-achilles',
    L('بعد موت أخيل أراد أياكس وأوديسيوس دروعه. كيف حسم الإغريق الأمر؟', 'After Achilles died, Ajax and Odysseus both wanted his armour. How did the Greeks settle it?'),
    [L('سمعوا حجّة كلٍّ منهما، فربحت الحجّة الأفضل', 'They heard each man’s argument, and the better argument won'),
      L('بمزاد: لمن يدفع أكثر', 'By auction: to the highest bidder'),
      L('بمبارزةٍ حتى الموت', 'By a duel to the death'),
      L('بالقرعة', 'By drawing lots')],
    L('ربح أوديسيوس. المزاد كان سيكون إهانة: الشرف في الاستحقاق لا في القيمة التبادلية — الفرق بين مجتمعٍ فيه أسواق ومجتمع السوق.',
      'Odysseus won. An auction would have been an insult: the honour was in deserving it, not in exchange value — the difference between a society with markets and a market society.')),

  mcq('td-bitcoin',
    L('يقول الكتاب إن آخر بيتكوين سيُعدَّن نحو ٢٠٣٢. ماذا وجد تحقّق النادي؟', 'The book says the last bitcoin will be mined around 2032. What did the club’s own fact-check find?'),
    [L('سقف الواحد والعشرين مليوناً صحيح، لكنّ الجزء الأخير يأتي نحو ٢١٤٠', 'The 21-million cap is right, but the last fraction arrives around 2140'),
      L('صحيحٌ تماماً', 'It’s exactly right'),
      L('لا سقف أصلاً: البيتكوين بلا حدّ', 'There is no cap: bitcoin is unlimited'),
      L('عُدّن آخر بيتكوين سنة ٢٠٢١', 'The last bitcoin was mined in 2021')],
    L('مكافأة التعدين تنتصف كلّ أربع سنواتٍ تقريباً: نحو ٩٩٪ يصدر بحلول ٢٠٣٥، والجزء الأخير نحو ٢١٤٠.', 'The mining reward halves about every four years: some 99% is issued by around 2035, and the last fraction around 2140.')),

  mcq('td-gold',
    L('ما الذي يسند معظم عملات العالم اليوم؟', 'What backs most of the world’s currencies today?'),
    [L('لا شيء سوى قرارات الدول وثقة الناس', 'Nothing but the decisions of states and the trust of people'),
      L('الذهب في خزائن المصارف المركزية', 'Gold in central bank vaults'),
      L('الدولار الأمريكي', 'The US dollar'),
      L('النفط', 'Oil')],
    L('انتهى ارتباط الذهب سنة ١٩٧١ حين علّق نيكسون تحويل الدولار. مال اليوم «سياسيّ» من أوّله إلى آخره.', 'The gold link ended in 1971, when Nixon suspended the dollar’s convertibility. Today’s money is political all the way down.')),

  mcq('td-maria',
    L('قرأت ماريا، صاحبة مصنع البرّادات، أن النقابات مستعدّة لخفض الأجور ٢٠٪ لتعزيز فرص العمل. ماذا تفعل؟', 'Maria, who makes fridges, reads that the unions are ready to see wages fall 20% to boost jobs. What does she do?'),
    [L('لا توظّف أحداً: من سيشتري برّاداتها حين تنخفض الأجور كلّها؟', 'Hires no one: who will buy her fridges once every wage has fallen?'),
      L('توظّف فاسيلي صباحاً: العمل صار أرخص', 'Hires Wasily in the morning: labour just got cheaper'),
      L('توظّف عاملين بدل واحد', 'Hires two workers instead of one'),
      L('تخفض أسعار برّاداتها ٢٠٪', 'Cuts her fridge prices by 20%')],
    L('هكذا تفكّر صاحبة المشروع الذكية — وتخشى أن يكفّ غيرها عن التوظيف أيضاً. منكرو البطالة ينتظرون العكس.', 'That is how a smart businesswoman thinks — and she fears others will stop hiring too. The unemployment deniers expect the opposite.')),

  mcq('td-kostas',
    L('علقت مرساة القبطان كوستاس فطلب من كسينيا أن تغطس لأجلها. ماذا لو عرض عليها خمسة يوروهات؟', 'Captain Kostas’s anchor snagged and he asked Xenia to dive for it. What if he had offered her five euros?'),
    [L('لربّما لم تقفز', 'She might not have jumped'),
      L('لقفزت مرّتين', 'She’d have dived twice'),
      L('لطلبت عشرة', 'She’d have asked for ten'),
      L('لما تغيّر شيء', 'Nothing would have changed')],
    L('درس القيمتين: حين يدخل السعر قد تهرب المتعة. القيمة الاستعمالية والقيمة التبادلية لا تجتمعان دائماً.', 'The lesson of the two values: when a price comes in, the joy may leave. Experiential and exchange value don’t always get along.')),
]

/* -------------------------------- numbers -------------------------------- */
const nums = [
  num('td-n-days',
    L('في كم يوماً كتب فاروفاكيس هذا الكتاب؟', 'How many days did Varoufakis take to write this book?'),
    9, { unit: L('أيام', 'days') },
    L('تسعة أيام، بلا حاشيةٍ واحدة، في بيت العائلة في إيجينا (٢٠١٣). ولم يصدر بالإنجليزية إلا سنة ٢٠١٧.', 'Nine days, without a single footnote, at the family house on Aegina (2013). It did not appear in English until 2017.')),
  num('td-n-interest',
    L('في المعسكر يُقرض المصرفيّ عشر سجائر ويطلب اثنتي عشرة الشهر القادم (٢٠٪). فإن توقّع أن تفقد السيجارة ١٠٪ من قيمتها، كم بالمئة يطلب؟',
      'In the camp a banker lends ten cigarettes for twelve next month (20%). If he expects a cigarette to lose 10% of its value, what monthly rate does he ask?'),
    30, { unit: L('٪', '%') },
    L('٣٠٪: يضيف إلى فائدته ما يتوقّع أن تخسره السيجارة. كلفة المال المقترض تتوقّف على ما يُتوقَّع للأسعار.', '30%: he adds what he expects a cigarette to lose. The cost of borrowed money depends on what prices are expected to do.')),
  num('td-n-cap',
    L('كم مليون بيتكوين يمكن أن يوجد في النهاية؟', 'How many million bitcoins can ever exist?'),
    21, { unit: L('مليون', 'million') },
    L('واحدٌ وعشرون مليوناً — سقفٌ في الخوارزمية نفسها.', 'Twenty-one million — a cap written into the algorithm itself.')),
  num('td-n-boe',
    L('بحسب مصرف إنجلترا (٢٠١٤)، كم بالمئة من المال ودائع خلقتها المصارف حين أقرضت؟', 'According to the Bank of England (2014), what percentage of money is deposits that banks created by lending?'),
    97, { unit: L('٪', '%') },
    L('نحو ٩٧٪. المال يُخلق في الغالب حين يُقرض، لا حين يُطبع.', 'About 97%. Money is mostly created when it is lent, not when it is printed.')),
  num('td-n-nixon',
    L('في أيّ سنةٍ علّق نيكسون تحويل الدولار إلى ذهب؟', 'In what year did Nixon suspend the dollar’s convertibility into gold?'),
    1971, { unit: L('', '') },
    L('١٩٧١. منذ ذلك اليوم يقوم المال على قرارات الدول وثقة الناس وحدهما.', '1971. Since that day money has rested on states’ decisions and people’s trust alone.')),
  num('td-n-minister',
    L('كم شهراً بقي فاروفاكيس وزيراً لمالية اليونان سنة ٢٠١٥؟', 'For how many months was Varoufakis Greece’s finance minister in 2015?'),
    6, { unit: L('أشهر', 'months') },
    L('ستّة أشهر، انتهت باستقالته في ٦ يوليو، غداة استفتاءٍ رفض فيه اليونانيون مقترح الدائنين.', 'Six months, ending with his resignation on 6 July, the day after a referendum in which Greeks rejected the creditors’ proposal.')),
]

/* ------------------------------ who is it? ------------------------------ */
const people = [
  who('td-w-varoufakis', L('يانيس فاروفاكيس', 'Yanis Varoufakis'),
    [L('درس الإحصاء الرياضيّ في برمنغهام، ودرّس نظرية الألعاب في سيدني.', 'He studied mathematical statistics in Birmingham and taught game theory in Sydney.'),
      L('صار وزير مالية بلده ستّة أشهر في أوج أزمتها.', 'He became his country’s finance minister for six months, at the height of its crisis.'),
      L('شرح الاقتصاد لابنته — في تسعة أيام.', 'He explained the economy to his daughter — in nine days.')],
    L('يانيس فاروفاكيس.', 'Yanis Varoufakis.'), './images/characters/yanis-varoufakis.webp'),
  who('td-w-xenia', L('كسينيا', 'Xenia'),
    [L('تعيش في سيدني.', 'She lives in Sydney.'),
      L('سؤالها «لماذا كلّ هذه اللامساواة؟» يفتتح كتاباً.', 'Her question, “why so much inequality?”, opens a book.'),
      L('اسمها يعني «الإحسان إلى الغرباء».', 'Her name means “kindness to strangers”.')],
    L('كسينيا، ابنة المؤلّف: الكتاب كلّه رسالةٌ إليها.', 'Xenia, the author’s daughter: the whole book is a letter to her.'), './images/characters/xenia.webp'),
  who('td-w-nabuk', L('السيد نابوك', 'Mr Nabuk'),
    [L('أودع قمحه في المخزن المشترك.', 'He left his grain in the common granary.'),
      L('قبض مقابله صَدَفةً منقوشة.', 'He was handed an engraved shell in return.'),
      L('صَدَفته كانت أوّل كتابة، وأوّل دَين، وأوّل نقد.', 'His shell was the first writing, the first debt and the first money.')],
    L('السيد نابوك، المزارع من بلاد ما بين النهرين.', 'Mr Nabuk, the Mesopotamian farmer.'), './images/characters/mr-nabuk.webp'),
  who('td-w-kostas', L('القبطان كوستاس', 'Captain Kostas'),
    [L('صيّادٌ في جزيرة إيجينا.', 'A fisherman on Aegina.'),
      L('علقت مرساته في القاع.', 'His anchor snagged on the bottom.'),
      L('طلب من كسينيا أن تغطس لأجلها — ولم يعرض مالاً.', 'He asked Xenia to dive for it — and offered no money.')],
    L('القبطان كوستاس: لو عرض خمسة يوروهات لربّما لم تقفز.', 'Captain Kostas: had he offered five euros, she might not have jumped.'), './images/characters/captain-kostas.webp'),
  who('td-w-wasily', L('فاسيلي', 'Wasily'),
    [L('نال الدكتوراه في الاقتصاد سنة ١٩٨٩.', 'He got a doctorate in economics in 1989.'),
      L('خفّض سقف طموحه شهراً بعد شهر، بلا جدوى.', 'Month after month he lowered his sights, in vain.'),
      L('«أسوأ ما يحدث أن تقرّر بيع روحك للشيطان فتكتشف أن الشيطان لا يشتري».', '“The worst is to decide to sell your soul to the devil, only to find the devil isn’t buying.”')],
    L('فاسيلي، صديق المؤلّف العاطل عن العمل.', 'Wasily, the author’s jobless friend.'), './images/characters/wasily.webp'),
  who('td-w-maria', L('ماريا', 'Maria'),
    [L('صاحبة مشروعٍ صناعيّ صغير.', 'She owns a small manufacturing business.'),
      L('خبرٌ عن النقابات والأجور أطار النوم من عينيها.', 'A headline about unions and wages kept her awake at night.'),
      L('تصنع البرّادات — وقرّرت ألّا توظّف فاسيلي.', 'She makes fridges — and decided not to hire Wasily.')],
    L('ماريا: صيّاد روسو في ثوب صاحبة مصنع.', 'Maria: Rousseau’s hunter as a factory owner.'), './images/characters/maria.webp'),
  who('td-w-radford', L('ريتشارد رادفورد', 'Richard Radford'),
    [L('ضابطٌ بريطاني درس الاقتصاد، أُسر سنة ١٩٤١.', 'A British officer who had studied economics, captured in 1941.'),
      L('دوّن بعد الحرب ما رآه في معسكر الأسرى.', 'After the war he wrote down what he saw in the prison camp.'),
      L('بفضله نعرف كيف صارت السجائر نقوداً.', 'Thanks to him we know how cigarettes became money.')],
    L('ريتشارد رادفورد: الفصل السابع كلّه قائمٌ على شهادته.', 'Richard Radford: all of chapter seven rests on his account.')),
]

/* -------------------------------- charts -------------------------------- */
const chocolate = {
  y: { label: L('ثمن لوح الشوكولا (سجائر)', 'price of a chocolate bar (cigarettes)') },
  lines: [{ pts: poly([0, 0.83], [0.55, 0.83], [0.6, 0.17], [1, 0.17]), tone: 'a' }],
  notes: [{ x: 0.2, y: 0.92, text: '5' }, { x: 0.85, y: 0.27, text: '1' }],
  marks: [{ x: 0.575, label: L('ليلةٌ ما', 'one night') }],
}
const parcelsBase = poly([0, 0.42], [0.5, 0.42])
const parcels = {
  y: { label: L('ثمن لوح الشوكولا (سجائر)', 'price of a chocolate bar (cigarettes)') },
  lines: [{ pts: parcelsBase, tone: 'a' }],
  marks: [{ x: 0.5, label: L('سجائر أكثر في الطرود', 'more cigarettes in the parcels') }],
  ask: [0.78, 0.42],
}
const after = (...pts) => ({ lines: [{ pts: [...parcelsBase, ...pts], tone: 'a' }], marks: [{ x: 0.5 }] })
const gdp = (fire) => ({ bars: [{ v: 0.6, tone: 'a' }, { v: fire, tone: 'b' }] })
const coins = (pts) => ({ lines: [{ pts, tone: 'c' }], marks: [{ x: 0.2 }] })
const jobs = (...pts) => ({ lines: [{ pts: [[0, 0.5], [0.5, 0.5], ...pts], tone: 'a' }], marks: [{ x: 0.5 }] })

const graphs = [
  { id: 'td-g-chocolate', chart: chocolate,
    q: L('بين ليلةٍ وضحاها هبط ثمن لوح الشوكولا في المعسكر من خمس سجائر إلى واحدة. ماذا حدث تلك الليلة؟', 'Overnight, a chocolate bar in the camp went from five cigarettes to one. What happened that night?'),
    opts: [L('قصفٌ قريب، فدخّن الأسرى سجائرهم', 'Bombs fell nearby, and the prisoners smoked their cigarettes'),
      L('أرسل الصليب الأحمر سجائر إضافية', 'The Red Cross sent extra cigarettes'),
      L('احتكر أحد المصرفيين الشوكولا', 'A banker cornered the chocolate'),
      L('منع الحرّاس التدخين', 'The guards banned smoking')],
    why: L('قلّت السجائر، فارتفعت قيمة كلٍّ منها: انكماش الأسعار. ولو أرسل الصليب الأحمر سجائر إضافية لحدث العكس.', 'Fewer cigarettes, so each was worth more: price deflation. Extra cigarettes from the Red Cross would have done the opposite.') },

  { id: 'td-g-parcels', chart: parcels,
    q: L('ماذا سيحدث لثمن الشوكولا بعد أن يضاعف الصليب الأحمر السجائر في كلّ طرد؟', 'What happens to the price of chocolate once the Red Cross doubles the cigarettes in every parcel?'),
    opts: [
      { chart: after([0.56, 0.84], [1, 0.84]) },
      { chart: after([0.56, 0.2], [1, 0.2]) },
      { chart: after([1, 0.42]) },
      { chart: after([0.56, 0.84], [0.62, 0.42], [1, 0.42]) },
    ],
    why: L('سجائر أكثر تطارد الشوكولا نفسها: كلّ سيجارةٍ تشتري أقلّ — تضخّم الأسعار. ولا يعود الثمن من تلقاء نفسه.', 'More cigarettes chasing the same chocolate: each buys less — price inflation. And the price does not drift back by itself.') },

  { id: 'td-g-forest',
    q: L('احترقت غابةٌ عظيمة. أيّ رسمٍ يُظهر الناتج الاقتصادي للبلد: السنة السابقة (يميناً في العربية، يساراً في الإنجليزية — العمود الأوّل) وسنة الحريق؟',
      'A great forest burns down. Which chart shows the country’s economic output: the year before (first bar) and the year of the fire?'),
    opts: [{ chart: gdp(0.72) }, { chart: gdp(0.45) }, { chart: gdp(0.6) }, { chart: gdp(0.15) }],
    why: L('يرتفع: وقود طائرات الإطفاء وإعادة البناء كلّها تُحسب، والأشجار القائمة لا قيمة تبادلية لها. هكذا «ينمو» الاقتصاد حين تحترق الغابة.', 'It goes up: the firefighting fuel and the rebuilding all count, while standing trees have no exchange value. That is how the economy “grows” when the forest burns.') },

  { id: 'td-g-bitcoin',
    chart: { x: { ticks: ['2009', '2140'] }, y: { label: L('عدد البيتكوين الموجود', 'bitcoins in existence') }, marks: [{ x: 0.2, label: '2035' }], ask: [0.5, 0.5] },
    q: L('أيّ منحنى يُظهر عدد البيتكوين الموجود من ٢٠٠٩ إلى ٢١٤٠؟', 'Which curve shows how many bitcoins exist, from 2009 to 2140?'),
    opts: [
      { chart: coins(curve((x) => 0.92 * (1 - Math.pow(0.5, x / 0.0305)), { steps: 60 })) },
      { chart: coins(poly([0, 0.02], [1, 0.92])) },
      { chart: coins(curve((x) => 0.02 + 0.9 * Math.pow(x, 3))) },
      { chart: coins(poly([0, 0.02], [0.2, 0.92], [1, 0.3])) },
    ],
    why: L('تنتصف المكافأة كلّ أربع سنواتٍ تقريباً، فيصعد المنحنى بسرعة ثم يزحف نحو سقف الواحد والعشرين مليوناً: ٩٩٪ بحلول ٢٠٣٥، والباقي حتى ٢١٤٠.', 'The reward halves about every four years, so the curve shoots up, then creeps toward the 21-million ceiling: 99% by 2035, the rest by 2140.') },

  { id: 'td-g-deniers',
    chart: { y: { label: L('الوظائف', 'jobs') }, lines: [{ pts: [[0, 0.5], [0.5, 0.5]], tone: 'a' }], marks: [{ x: 0.5, label: L('الأجور −٢٠٪', 'wages −20%') }], ask: [0.78, 0.5] },
    q: L('خُفّضت الأجور كلّها ٢٠٪. منكرو البطالة يتوقّعون أن تزيد الوظائف. ماذا يتوقّع الكتاب؟', 'Every wage is cut 20%. The unemployment deniers expect jobs to rise. What does the book expect?'),
    opts: [{ chart: jobs([0.58, 0.32], [1, 0.22]) }, { chart: jobs([0.58, 0.68], [1, 0.8]) }, { chart: jobs([1, 0.5]) }, { chart: jobs([0.58, 0.7], [1, 0.5]) }],
    why: L('تتراجع: أصحاب المشاريع يقرؤون الخبر تشاؤماً، فيكفّون عن التوظيف — ويصدق تشاؤمهم. كصيّادي روسو، قد ينتهون إلى مطاردة الأرانب البرّية وهم لا يريدونها.', 'They fall: entrepreneurs read the news as gloom and stop hiring — and their gloom comes true. Like Rousseau’s hunters, they may end up chasing hares they never wanted.') },
]

/* ------------------------------ white lies ------------------------------ */
const bluffs = [
  bluff('td-b-sheep',
    L('طرد ملّاك الأراضي الإنجليز الأقنان، ووضعوا مكانهم ____.', 'English landlords evicted the serfs and put ____ on the land instead.'),
    L('الخراف', 'sheep'),
    ['خراف', 'خرافا', 'الغنم', 'غنم', 'اغنام', 'الاغنام', 'خروف', 'نعاج', 'sheep', 'a sheep', 'flocks of sheep'],
    [L('مصانع النسيج', 'textile mills'), L('أشجار الزيتون', 'olive trees'), L('مناجم الفحم', 'coal mines')],
    L('الخراف: صوفها يُباع في العالم كلّه. ومن «التسييجات» وُلد سوق قوّة العمل وسوق الأرض معاً.', 'Sheep: their wool sold all over the world. The enclosures gave birth to the labour market and the land market together.')),
  bluff('td-b-money',
    L('في معسكر أسرى الحرب كانت النقود ____.', 'In the prisoner-of-war camp, the money was ____.'),
    L('السجائر', 'cigarettes'),
    ['سجائر', 'السجاير', 'سجاير', 'سيجارة', 'السيجارة', 'cigarettes', 'cigarette', 'cigs', 'tobacco', 'التبغ'],
    [L('الشوكولا', 'chocolate'), L('أزرار القمصان', 'shirt buttons'), L('علب الحليب المجفّف', 'tins of powdered milk')],
    L('السجائر: تدوم، وتُحمل، وتُقسَّم، ويريدها الجميع — حتى من لا يدخّن.', 'Cigarettes: they keep, they carry, they divide, and everyone wants them — even non-smokers.')),
  bluff('td-b-faustus',
    L('وقّع الدكتور فاوست عقده مع الشيطان بـ____.', 'Doctor Faustus signed his contract with the devil in ____.'),
    L('دمه', 'his own blood'),
    ['الدم', 'دم', 'دمه', 'بالدم', 'بدمه', 'blood', 'his blood', 'his own blood'],
    [L('حبرٍ ذهبيّ', 'golden ink'), L('رمادٍ ونار', 'ash and fire'), L('دموعه', 'his tears')],
    L('بدمه: دَينٌ وفائدته روحه بعد أربعٍ وعشرين سنةً من السلطة واللذّة.', 'In his own blood: a debt whose interest was his soul, after twenty-four years of power and pleasure.')),
  bluff('td-b-ecuador',
    L('منح دستور الإكوادور (٢٠٠٨) حقوقاً لـ____.', 'Ecuador’s 2008 constitution gave rights to ____.'),
    L('الطبيعة', 'nature'),
    ['الطبيعه', 'الطبيعة نفسها', 'الغابة', 'الغابات', 'الأرض', 'nature', 'nature itself', 'mother earth', 'the rainforest', 'the forest', 'pachamama'],
    [L('الأجيال القادمة', 'future generations'), L('الحيوانات الأليفة', 'pets'), L('الروبوتات', 'robots')],
    L('للطبيعة نفسها — أوّلٌ في تاريخ الدساتير.', 'To nature itself — a first in constitutional history.')),
  bluff('td-b-kostas',
    L('طلب القبطان كوستاس من كسينيا أن تغطس لتُخرج ____.', 'Captain Kostas asked Xenia to dive down for his ____.'),
    L('مرساته', 'anchor'),
    ['المرساة', 'مرساة', 'مرساته', 'الهلب', 'anchor', 'the anchor', 'his anchor'],
    [L('نظّارته', 'glasses'), L('محفظته', 'wallet'), L('صنّارته', 'fishing rod')],
    L('مرساته — بلا مقابل. ولو عرض خمسة يوروهات لربّما لم تقفز.', 'His anchor — for nothing. Had he offered five euros, she might not have jumped.')),
]

/* ------------------------------- pictures ------------------------------- */
const pics = [
  picName('td-p-marx', './images/characters/karl-marx.webp', L('كارل ماركس', 'Karl Marx'),
    ['Marx', 'ماركس', 'karl marx', 'كارل ماركس'],
    [L('تشارلز داروين', 'Charles Darwin'), L('ليو تولستوي', 'Leo Tolstoy'), L('فريدريك إنجلز', 'Friedrich Engels')],
    [L('يقول فاروفاكيس إنه يسكن كلّ أفكاره.', 'Varoufakis says he haunts all his thinking.'),
      L('كتب أن الآلات «القوّة التي علينا أن ننحني لها».', 'He wrote that machines are “the force we must bow to”.')],
    L('كارل ماركس — «الشبح» الحاضر في كلّ فكرة.', 'Karl Marx — the “spectre” behind every thought.'), { q: WHO }),
  picName('td-p-smith', './images/characters/adam-smith.webp', L('آدم سميث', 'Adam Smith'),
    ['Smith', 'سميث', 'adam smith', 'آدم سميث'],
    [L('ديفيد هيوم', 'David Hume'), L('جون لوك', 'John Locke'), L('إسحاق نيوتن', 'Isaac Newton')],
    [L('الأب المؤسّس لعلم الاقتصاد.', 'The founding father of economics.'), L('صاحب «اليد الخفية».', 'The man behind the “invisible hand”.')],
    L('آدم سميث، صاحب «ثروة الأمم».', 'Adam Smith, author of The Wealth of Nations.'), { q: WHO }),
  picName('td-p-keynes', './images/characters/john-maynard-keynes.webp', L('جون ماينارد كينز', 'John Maynard Keynes'),
    ['Keynes', 'كينز', 'كينيز', 'john maynard keynes', 'جون ماينارد كينز'],
    [L('ونستون تشرشل', 'Winston Churchill'), L('فريدريش هايك', 'Friedrich Hayek'), L('ميلتون فريدمان', 'Milton Friedman')],
    [L('ما يصحّ على شركةٍ، قال، لا يصحّ على الاقتصاد كلّه.', 'What holds for one firm, he said, does not hold for the whole economy.'),
      L('كتب سنة ١٩٣٠ مقالةً عن «أحفادنا».', 'In 1930 he wrote an essay about “our grandchildren”.')],
    L('كينز و«مغالطة التركيب».', 'Keynes, and the fallacy of composition.'), { q: WHO }),
  picName('td-p-varoufakis', './images/characters/yanis-varoufakis.webp', L('يانيس فاروفاكيس', 'Yanis Varoufakis'),
    ['Varoufakis', 'فاروفاكيس', 'yanis varoufakis', 'يانيس فاروفاكيس', 'يانيس'],
    [L('ألكسيس تسيبراس', 'Alexis Tsipras'), L('توما بيكيتي', 'Thomas Piketty'), L('سلافوي جيجك', 'Slavoj Žižek')],
    [L('وزير مالية اليونان ستّة أشهر سنة ٢٠١٥.', 'Greece’s finance minister for six months in 2015.'), L('كتب كتاب النادي الثالث في تسعة أيام.', 'He wrote the club’s third book in nine days.')],
    L('يانيس فاروفاكيس.', 'Yanis Varoufakis.'), { q: WHO }),
  picName('td-p-shelley', './images/characters/mary-shelley.webp', L('ماري شيلي', 'Mary Shelley'),
    ['Mary Shelley', 'ماري شيلي', 'Shelley', 'شيلي'],
    [L('جين أوستن', 'Jane Austen'), L('شارلوت برونتي', 'Charlotte Brontë'), L('إميلي ديكنسون', 'Emily Dickinson')],
    [L('بدأت في ليلةٍ عاصفة بسويسرا قصّة رعب.', 'On a stormy night in Switzerland she began a horror story.'), L('صنعت فرانكنشتاين.', 'She made Frankenstein.')],
    L('ماري شيلي — وهي في كتابين من كتب النادي.', 'Mary Shelley — who appears in two of the club’s books.'), { q: WHO }),
  picName('td-p-oedipus', './images/economy/oedipus-sphinx-moreau.webp', L('أوديب وأبو الهول', 'Oedipus and the Sphinx'),
    ['Oedipus', 'أوديب', 'اوديب', 'Sphinx', 'the sphinx', 'أبو الهول', 'ابو الهول'],
    [L('برسيوس وميدوسا', 'Perseus and Medusa'), L('ثيسيوس والمينوتور', 'Theseus and the Minotaur'), L('أوديسيوس والعملاق', 'Odysseus and the Cyclops')],
    [L('حلّ لغزاً فصار ملكاً — وتزوّج أمّه.', 'He solved a riddle, became king — and married his own mother.'), L('لوحةٌ لغوستاف مورو، ١٨٦٤.', 'A painting by Gustave Moreau, 1864.')],
    L('أوديب وأبو الهول: نبوءةٌ تحقّق نفسها، كسوقَي قوّة العمل والمال.', 'Oedipus and the Sphinx: a prophecy that fulfils itself, like the labour and money markets.'),
    { q: L('من في هذه اللوحة؟', 'Who is in this painting?') }),
  picName('td-p-mephisto', './images/economy/mephistopheles-delacroix.webp', L('ميفستوفيليس', 'Mephistopheles'),
    ['Mephisto', 'mephistopheles', 'ميفستوفيليس', 'مفيستوفيليس', 'ميفيستوفيليس', 'ميفستو', 'the devil', 'devil', 'satan', 'الشيطان', 'شيطان', 'ابليس'],
    [L('بروميثيوس', 'Prometheus'), L('إيكاروس', 'Icarus'), L('دراكولا', 'Dracula')],
    [L('وقّع فاوست معه عقداً بدمه.', 'Faust signed a contract with him, in blood.'), L('رسمه دولاكروا لـ«فاوست» غوته.', 'Delacroix drew him for Goethe’s Faust.')],
    L('ميفستوفيليس يطير فوق المدينة — دولاكروا، ١٨٢٨.', 'Mephistopheles flying over the city — Delacroix, 1828.'),
    { q: L('من هذا الطائر في السماء؟', 'Who is this, flying over the town?'), view: { pos: '50% 34%', zoom: 1.25 } }),
  picName('td-p-fleet', './images/economy/first-fleet.webp', L('الأسطول الأوّل', 'The First Fleet'),
    ['first fleet', 'the first fleet', 'الأسطول الأول', 'الاسطول الاول', 'first fleet australia'],
    [L('كولومبوس يصل إلى أمريكا', 'Columbus reaching America'), L('سفينة «ماي فلاور»', 'The Mayflower'), L('فاسكو دا غاما يبلغ الهند', 'Vasco da Gama reaching India')],
    [L('به يبدأ الفصل الأوّل: لماذا غزا البريطانيون أستراليا، لا العكس؟', 'The first chapter starts here: why did the British invade Australia, and not the other way round?'),
      L('ميناء جاكسون، يناير ١٧٨٨.', 'Port Jackson, January 1788.')],
    L('الأسطول الأوّل يدخل ميناء جاكسون، ١٧٨٨.', 'The First Fleet entering Port Jackson, 1788.'),
    { q: L('أيّ حدثٍ هذا؟', 'What event is this?'), view: { pos: '50% 40%', zoom: 1.4 } }),
  picName('td-p-nixon', './images/economy/nixon.webp', L('ريتشارد نيكسون', 'Richard Nixon'),
    ['Nixon', 'نيكسون', 'richard nixon', 'ريتشارد نيكسون'],
    [L('جون كينيدي', 'John F. Kennedy'), L('رونالد ريغان', 'Ronald Reagan'), L('ليندون جونسون', 'Lyndon Johnson')],
    [L('سنة ١٩٧١ فكّ الدولار عن الذهب.', 'In 1971 he cut the dollar loose from gold.'), L('رئيسٌ أمريكيّ استقال سنة ١٩٧٤.', 'A US president who resigned in 1974.')],
    L('نيكسون — في ركن النادي «من خارج الكتاب» بعد الفصل السابع.', 'Nixon — in the club’s “from outside the book” aside after chapter seven.'), { q: WHO }),
  picName('td-p-sirens', './images/economy/ulysses-sirens-waterhouse.webp', L('أوليسيس والحوريّات', 'Ulysses and the Sirens'),
    ['Ulysses', 'Odysseus', 'أوليسيس', 'أوديسيوس', 'عوليس', 'يوليسيس', 'sirens', 'الحوريات', 'السيرينات'],
    [L('جيسون والأرغونوتيون', 'Jason and the Argonauts'), L('سفينة نوح', 'Noah’s Ark'), L('الهولندي الطائر', 'The Flying Dutchman')],
    [L('ربط نفسه إلى الصاري ليسمع غناءهنّ وينجو.', 'He had himself tied to the mast so he could hear their song and live.'), L('من أوديسة هوميروس.', 'From Homer’s Odyssey.')],
    L('أوليسيس والحوريّات — ووترهاوس، ١٨٩١.', 'Ulysses and the Sirens — Waterhouse, 1891.'),
    { q: L('من هؤلاء؟', 'Who are these?') }),
  picName('td-p-bretton', './images/economy/bretton-woods-1944.webp', L('مؤتمر بريتون وودز', 'The Bretton Woods conference'),
    ['Bretton Woods', 'بريتون وودز', 'bretton woods conference'],
    [L('مؤتمر يالطا', 'The Yalta conference'), L('مؤتمر فرساي للسلام', 'The Versailles peace conference'), L('تأسيس الأمم المتحدة', 'The founding of the United Nations')],
    [L('يوليو ١٩٤٤: أُعيد فيه ربط عملات العالم بالدولار، والدولار بالذهب.', 'July 1944: the world’s currencies tied to the dollar, and the dollar to gold.'),
      L('فندقٌ في نيوهامبشير.', 'A hotel in New Hampshire.')],
    L('بريتون وودز، ١٩٤٤ — في ركن النادي «من خارج الكتاب».', 'Bretton Woods, 1944 — in the club’s “from outside the book” aside.'),
    { q: L('أيّ اجتماعٍ هذا؟', 'What gathering is this?') }),
  picBook('td-p-matrix', './images/economy/the-matrix.webp',
    [L('العميل سميث يسمّي البشر فيروساً.', 'Agent Smith calls humans a virus.')],
    L('«المصفوفة» — من «الاقتصاد كما أشرحه لابنتي».', 'The Matrix — from Talking to My Daughter About the Economy.')),
  picBook('td-p-nabuk', './images/characters/mr-nabuk.webp',
    [L('قايض قمحه بصَدَفةٍ منقوشة.', 'He traded his grain for an engraved shell.')],
    L('السيد نابوك — من «الاقتصاد كما أشرحه لابنتي».', 'Mr Nabuk — from Talking to My Daughter About the Economy.')),
]

/* --------------------------------- faces --------------------------------- */
const faces = [
  face('td-f-mr-nabuk', './images/characters/mr-nabuk.webp', L('السيد نابوك', 'Mr Nabuk'),
    L('مزارعٌ في بلاد ما بين النهرين', 'A Mesopotamian farmer'),
    L('أودع قمحه في المخزن المشترك وقبض صَدَفةً منقوشة: أوّل كتابة، وأوّل دَين، وأوّل نقد. يعود في الفصل الرابع ليُثبت أن مال المصرف المركزي ليس جديداً.',
      'He left his grain in the common granary and was handed an engraved shell: the first writing, the first debt, the first money. He returns in chapter four to show that central-bank money is nothing new.')),
  face('td-f-miriam', './images/characters/miriam.webp', L('مريم', 'Miriam'),
    L('صانعة درّاجات', 'A bicycle-maker'),
    L('طلبت نصف مليون جنيه لآلةٍ تصنع إطارات الكربون، فكتبه المصرفيّ في حسابها من العدم. إمّا أن تصير مريمُ المستقبلِ ناجحة، وإمّا يقع الانهيار.',
      'She asked for half a million pounds for a carbon-frame machine, and the banker typed it into her account from thin air. Either tomorrow’s Miriam succeeds, or the crash comes.'), 1),
  face('td-f-maria', './images/characters/maria.webp', L('ماريا', 'Maria'),
    L('صاحبة مصنع برّادات', 'A fridge-maker'),
    L('تفكّر في توظيف فاسيلي، ثم تقرأ أن النقابات مستعدّة لخفض الأجور ٢٠٪ فتقرّر ألّا توظّف أحداً: من سيملك ما يشتري به برّاداتها؟ صيّاد روسو في ثوب صاحبة مصنع.',
      'She is thinking of hiring Wasily, then reads that the unions are ready to see wages fall 20%, and decides to hire no one: who will have the money to buy her fridges? Rousseau’s hunter as a factory owner.'), 1),
  face('td-f-adam-smith', './images/characters/adam-smith.webp', L('آدم سميث', 'Adam Smith'),
    L('صاحب «ثروة الأمم»', 'Author of The Wealth of Nations'),
    L('الأب المؤسّس لعلم الاقتصاد. عبارته «اليد الخفية» صارت، عند فاروفاكيس، شعار دينٍ علمانيّ يقدّم مجتمع السوق نظاماً طبيعياً.',
      'The founding father of economics. His “invisible hand” became, for Varoufakis, the motto of a secular religion presenting market society as the natural order.')),
  face('td-f-karl-marx', './images/characters/karl-marx.webp', L('كارل ماركس', 'Karl Marx'),
    L('«الشبح» الحاضر في كلّ فكرة', 'The “spectre” behind every thought'),
    L('يقول المؤلّف إن ماركس يسكن كلّ أفكاره. منه وصف الآلات بأنها «القوّة التي علينا أن ننحني لها»، والميل إلى الأزمة الذي يمنعها من الاستيلاء الكامل.',
      'The author says Marx haunts all his thinking. From him come the machines as “the force we must bow to”, and the tendency to crisis that stops them taking over entirely.')),
  face('td-f-john-maynard-keynes', './images/characters/john-maynard-keynes.webp', L('جون ماينارد كينز', 'John Maynard Keynes'),
    L('«مغالطة التركيب»', 'The “fallacy of composition”'),
    L('ما يصحّ على شركةٍ لا يصحّ على الاقتصاد كلّه. ويستشهد الكتاب بمقالته عن «أحفادنا» (١٩٣٠): سيُرى حبّ المال على حقيقته يوماً.',
      'What holds for one firm does not hold for the whole economy. The book quotes his 1930 essay on “our grandchildren”: one day the love of money will be seen for what it is.')),
  face('td-f-jared-diamond', './images/characters/jared-diamond.webp', L('جارد دايموند', 'Jared Diamond'),
    L('صاحب «أسلحة، جراثيم، وفولاذ»', 'Author of Guns, Germs and Steel'),
    L('على كتابه يقوم الفصل الأوّل كلّه: الجغرافيا، لا الجينات، هي التي قرّرت من سيستعمر من.',
      'The whole first chapter rests on his book: geography, not genes, decided who would colonise whom.')),
  face('td-f-sophocles', './images/characters/sophocles.webp', L('سوفوكليس', 'Sophocles'),
    L('صاحب «أوديب ملكاً»', 'Author of Oedipus Rex'),
    L('نبوءةٌ تحقّق نفسها لأن من سمعها حاول الهرب منها: هكذا يشرح الكتاب سوقَي العمل والمال.',
      'A prophecy that fulfils itself because those who hear it try to escape it: the book’s way of explaining the labour and money markets.')),
  face('td-f-goethe', './images/characters/goethe.webp', L('يوهان فولفغانغ فون غوته', 'Johann Wolfgang von Goethe'),
    L('صاحب «فاوست»', 'Author of Faust'),
    L('في نسخته من القرن التاسع عشر يُنقذ فاوست — فقد صار الدَّين مع الفائدة مقبولاً. وله أيضاً «الساحر المتمرّن» عن مخلوقٍ يفلت من صانعه.',
      'In his nineteenth-century version Faust is saved — debt with interest had become acceptable. He also wrote The Sorcerer’s Apprentice, about a creation that escapes its maker.')),
  face('td-f-yanis-varoufakis', './images/characters/yanis-varoufakis.webp', L('يانيس فاروفاكيس', 'Yanis Varoufakis'),
    L('مؤلّف «الاقتصاد كما أشرحه لابنتي»', 'Author of “Talking to My Daughter About the Economy”'),
    L('اقتصاديّ يونانيّ وُلد في أثينا (١٩٦١)، أمضى معظم مسيرته أستاذاً في بريطانيا وأستراليا، ثم صار وزيراً لمالية اليونان ستّة أشهر في ذروة أزمتها (٢٠١٥).',
      'A Greek economist born in Athens (1961) who spent most of his career teaching in Britain and Australia, then was Greece’s finance minister for six months at the height of its crisis (2015).')),
  face('td-f-imad-shiha', './images/characters/imad-shiha.webp', L('عماد شيحة', 'Imad Shiha'),
    L('مترجم الكتاب إلى العربية', 'The book’s Arabic translator'),
    L('روائيٌّ ومترجمٌ سوريّ (١٩٥٤–٢٠٢٢) ترجم عن الإنجليزية كتباً في الاقتصاد والسياسة والفلسفة والتاريخ — ومنها الطبعة العربية من كتاب فاروفاكيس.',
      'A Syrian novelist and translator (1954–2022) who translated books on economics, politics, philosophy and history from English — among them the Arabic edition of Varoufakis’s book.')),
]

/* ----------------------- myth-or-fact hints -----------------------
   One nudge per statement of this book's «خرافة أم حقيقة؟» deck
   (mythOrFact.js), bought for a step in the game. Keyed by the statement's
   English text, so a reworded statement fails decks.js's check instead of
   silently losing its hint. A hint points at the reasoning — never says
   "myth" or "fact". */
const tfHints = {
  'Banks lend out depositors’ money, and cannot lend more than has been deposited with them.':
    L('تذكّر مريم: كتب المصرفيّ نصف مليون في حسابها — فمن أين جاء المال؟', 'Remember Miriam: the banker typed half a million into her account — so where did the money come from?'),
  'Cutting all wages puts the unemployed back to work.':
    L('تذكّر ماريا وبرّاداتها: من سيشتريها إن انخفضت أجور الجميع؟', 'Remember Maria and her fridges: who will buy them if everyone\'s wages fall?'),
  'Lowering interest rates always pushes entrepreneurs to borrow and invest.':
    L('ماذا يقرأ صاحب المشروع في خفضٍ مذعورٍ للفائدة؟', 'What does an entrepreneur read into a panicked rate cut?'),
  'A banknote is worth what it cost to print.':
    L('ورقة الألف دراخما كلّفت طباعتها عشرين.', 'A thousand-drachma note cost twenty to print.'),
  'The Luddites opposed machines because they hated technology.':
    L('اسأل: من كان يملك الآلات، ومن جاع بسببها؟', 'Ask who owned the machines — and who went hungry because of them.'),
  'Most of the world’s currencies today are backed by the gold their states hold.':
    L('تذكّر قرار نيكسون عام ١٩٧١.', 'Remember Nixon\'s decision in 1971.'),
  'Bitcoin will reach its maximum supply of 21 million around 2032.':
    L('مكافأة التعدين تنقص إلى النصف كلّ أربع سنواتٍ تقريباً — فمتى تنفد حقاً؟', 'The mining reward halves roughly every four years — so when does it really run out?'),
  'Easter Islanders abandoned their island after cutting down every tree and starving.':
    L('هل ما زال للرابانوي أحفادٌ يعيشون في الجزيرة اليوم؟', 'Do the Rapanui still have descendants living on the island today?'),
  'Islam is the only religion that has forbidden charging interest on loans.':
    L('تذكّر لماذا طالب جمهور مارلو بعقاب فاوستوس.', 'Remember why Marlowe\'s audience wanted Faustus punished.'),
  'The earliest writing in Mesopotamia was records of grain in storehouses.':
    L('تذكّر صَدَفة السيد نابوك.', 'Remember Mr Nabuk\'s shell.'),
  'The word “credit” comes from a Latin verb meaning “to believe”.':
    L('الدَّين والنقد كلاهما يقوم على الثقة بأن الوعد سيُوفى.', 'Debt and money both rest on trust that a promise will be kept.'),
  'In its Greek origin, the word “economy” means the laws of running a household.':
    L('«أويكوس» بيت، و«نوموس» قانون.', 'Oikos is a household; nomos is a law.'),
  'Cigarettes became the currency of a Second World War prisoner-of-war camp.':
    L('تُحفظ، وتُحمل، وتُقسَّم، ويريدها الجميع — حتى من لا يدخّن.', 'They keep, they carry, they divide, and everyone wants them — even non-smokers.'),
  'Lenders raise interest rates when they expect inflation to rise.':
    L('المال الذي سيُردّ إليك سيشتري أقلّ.', 'The money you get back will buy less.'),
  'Insolvent debtors were imprisoned in early Victorian Britain.':
    L('قبل «المسؤولية المحدودة» كان الدَّين يلاحق صاحبه شخصياً.', 'Before limited liability, a debt followed its owner personally.'),
  'Ecuador amended its constitution to recognise rights belonging to nature itself.':
    L('الغابة محميّةٌ لذاتها، مهما كانت «قيمتها التبادلية».', 'The rainforest protected for its own sake, whatever its “exchange value”.'),
  'In ancient Athens, an “idiotis” was someone who minded only his own business.':
    L('من لا يشارك في شؤون المدينة — والكلمة غيّرت معناها لاحقاً في الإنجليزية.', 'Someone who took no part in the city\'s affairs — the word changed its meaning later, in English.'),
  'Varoufakis wrote this book in Greek in nine days.':
    L('كتبه في بيت العائلة في إيجينا، بلا خطّة وبلا هوامش.', 'He wrote it at the family house on Aegina, with no plan and no footnotes.'),
}

export const gameDeck = { mcq: mcqs, num: nums, who: people, graph: graphs, bluff: bluffs, pic: pics, face: faces, tfHints }
