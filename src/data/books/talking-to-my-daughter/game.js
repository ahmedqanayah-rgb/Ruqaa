/* ============================================================================
   «رُقعة النرد» — this book's question deck for the club's dice game.
   The rules for writing one are at the top of books/why-we-sleep/game.js:
   the FIRST option is the right one (the game shuffles them), the right answer
   is a fact the site already states, and the wrong answers are jokes.

   SPECIFIC TO THIS BOOK: where the club's own check corrected the book
   (Bitcoin's last coin, Easter Island, paid blood donation — see reception.js)
   a question either asks what the CHECK found or leaves the claim alone. It
   never asks the room to "know" the book's version as fact.
   ========================================================================== */

const L = (ar, en) => ({ ar, en })
const q = (id, text, opts, why) => ({ id, q: text, opts, why })

export const gameIcon = '⚖️'

export const gameDeck = [
  q('td-first-writing',
    L('اختُرعت الكتابة في بلاد الرافدين. ماذا سجّلت النصوص الأولى؟',
      'Writing was invented in Mesopotamia. What did the very first texts record?'),
    [
      L('كم أودع كلّ مزارعٍ من القمح في المخزن المشترك', 'How much grain each farmer had left in the shared granary'),
      L('شكوى من عنزة الجيران', 'A complaint about the neighbour’s goat'),
      L('«اليوم الأوّل: اخترعتُ الكتابة. لا أحد يستطيع قراءة هذا بعد»', '“Day one: invented writing. Nobody can read this yet”'),
    ],
    L('إيصالاتٌ تثبت أن السيد نابوك أودع قمحه. الكتابة بنت الفائض — وكذلك الدَّين والمال.',
      'Receipts proving that Mr Nabuk had deposited his grain. Writing is a child of the surplus — and so are debt and money.')),

  q('td-australia',
    L('لماذا غزا البريطانيون أستراليا، ولم يغزُ الأستراليون الأصليون بريطانيا؟',
      'Why did the British invade Australia, and not the Aboriginal Australians invade Britain?'),
    [
      L('الجغرافيا: زراعة أوراسيا أنتجت فائضاً، ومعه الجيوش والسفن والجراثيم', 'Geography: Eurasia’s farming produced a surplus — and with it armies, ships and germs'),
      L('طقس بريطانيا. لم يُرِدها أحد', 'Britain’s weather. Nobody wanted it'),
      L('جاء الأستراليون ورأوا الطعام ثم عادوا', 'The Australians came, saw the food, and went home'),
    ],
    L('حيث كان الطعام وفيراً لم يحتج أحدٌ إلى الزراعة، فلم يولد فائضٌ ولا كتابة ولا جيوش. لا علاقة للحمض النووي بشيء.',
      'Where food was plentiful nobody needed to farm, so no surplus was born — no writing, no armies. DNA had nothing to do with it.')),

  q('td-sheep',
    L('طرد الملّاك الإنجليز الأقنان من الأرض. من سكنها بدلاً منهم؟',
      'English landlords threw the serfs off the land. Who moved in instead?'),
    [
      L('الخراف — فصوفها يُباع في العالم كلّه', 'Sheep — their wool sold all over the world'),
      L('المحامون', 'Lawyers'),
      L('أقارب الملّاك من المدينة، لعطلة نهاية الأسبوع', 'The landlords’ cousins from the city, for the weekend'),
    ],
    L('التسييجات: القنّ المطرود لا يملك إلا قوّة عمله فيبيعها، والأرض صار لها إيجار — هكذا وُلد سوق العمل وسوق الأرض معاً.',
      'The enclosures: an evicted serf owns only his labour, so he sells it, and land acquires a rent — the labour market and the land market, born together.')),

  q('td-thin-air',
    L('تقترض مريم نصف مليون من المصرف. من أين يأتي المصرف بالمبلغ؟',
      'Miriam borrows half a million from the bank. Where does the bank get it?'),
    [
      L('من العدم: يكتب الرقم في حسابها', 'From thin air: it types the number into her account'),
      L('من قبوٍ يحرسه تنّين', 'From a vault guarded by a dragon'),
      L('يمرّر قبّعةً على بقيّة العملاء', 'It passes a hat around the other customers'),
    ],
    L('القرض يخلق الوديعة لا العكس. ويقول بنك إنجلترا نفسه (٢٠١٤) إن نحو ٩٧٪ من المال ودائعُ خلقتها المصارف بالإقراض.',
      'The loan creates the deposit, not the other way round. The Bank of England itself (2014) says about 97% of money is deposits that banks created by lending.')),

  q('td-credit',
    L('كلمة «credit» (ائتمان) تعود إلى الفعل اللاتيني «credere». ما معناه؟',
      'The word “credit” comes from the Latin verb “credere”. What does it mean?'),
    [
      L('أن تصدّق', 'To believe'),
      L('أن تندم', 'To regret'),
      L('«أردّها لك يوم الخميس»', '“I’ll pay you back on Thursday”'),
    ],
    L('الدَّين والمال قائمان على الإيمان بأن الوعد سيُوفى — من أصداف السيد نابوك إلى الأرقام في حسابك اليوم.',
      'Debt and money rest on faith that a promise will be kept — from Mr Nabuk’s shells to the numbers in your account today.')),

  q('td-oikonomia',
    L('كلمة «اقتصاد» (economy) أصلها اليوناني «أويكونوميا». ماذا كانت تعني؟',
      'The Greek “oikonomia” gave us the word “economy”. What did it originally mean?'),
    [
      L('قوانين تدبير المنزل', 'The rules of running a household'),
      L('فنّ الظهور بمظهر المشغول قرب المال', 'The art of looking busy near money'),
      L('«أمرٌ معقّد، اسأل اقتصادياً»', '“It’s complicated — ask an economist”'),
    ],
    L('أويكوس (بيت) + نوموي (قوانين). وبما أن الإنتاج غادر البيت منذ زمن، يقترح الكتاب اسماً أصدق: «أغورانوميا»، قوانين السوق.',
      'Oikos (household) plus nomoi (rules). Since production left the household long ago, the book suggests a truer name: “agoranomy”, the laws of the marketplace.')),

  q('td-idiotis',
    L('في أثينا القديمة، من كان يُسمّى «إيديوتيس» (idiotis)؟',
      'In ancient Athens, who was called an “idiotis”?'),
    [
      L('من يهتمّ بشؤونه الخاصّة وحدها ويترك الشأن العامّ', 'Someone who minded only his own business and ignored public affairs'),
      L('من يُقرض أصدقاءه مالاً', 'Someone who lent money to his friends'),
      L('من يضغط «الردّ على الجميع»', 'Anyone who pressed “reply all”'),
    ],
    L('ثم جعلت الإنجليزية الكلمة بمعنى «أحمق». وبالمعنيين معاً — يقول الكتاب — جعلت مجتمعات السوق منّا «إيديوتيس».',
      'English later made the word mean a fool. In both senses, the book says, market societies have made idiots of us.')),

  q('td-cigarettes',
    L('في معسكرٍ لأسرى الحرب العالمية الثانية، ما الذي صار هو العملة؟',
      'In a Second World War prisoner-of-war camp, what became the money?'),
    [
      L('السجائر', 'Cigarettes'),
      L('سنداتٌ بتوقيع قائد المعسكر', 'IOUs signed by the camp commander'),
      L('النكات: كلّما كانت النكتة أفضل كان الرغيف أكبر', 'Jokes: the better the joke, the bigger the loaf'),
    ],
    L('سجّلها الاقتصادي الأسير ريتشارد رادفورد (١٩٤٥): تُحفظ وتُحمل وتُقسَّم ويريدها الجميع — حتى غير المدخّنين.',
      'Recorded by Richard Radford, an economist and prisoner (1945): they keep, they carry, they divide, and everyone wants them — even non-smokers.')),

  q('td-bombing',
    L('ليلة قصفٍ قرب المعسكر، دخّن الأسرى المرتعبون حتى الفجر. ماذا حدث للأسعار في الصباح؟',
      'One night bombs fell near the camp and the terrified prisoners smoked until dawn. What happened to prices in the morning?'),
    [
      L('انخفضت: قلّت السجائر فصارت الواحدة تشتري أكثر', 'They fell: with fewer cigarettes about, each one bought more'),
      L('ارتفعت: كان الجميع أتعب من أن يساوم', 'They rose: everyone was too tired to haggle'),
      L('أغلق السوق أبوابه لقيلولة', 'The market closed for a nap'),
    ],
    L('انكماش: صار لوح الشوكولاتة بسيجارةٍ واحدة. قيمة العملة في ندرتها، لا في كلفتها.',
      'Deflation: a chocolate bar now cost a single cigarette. A currency’s value lies in its scarcity, not in what it cost to make.')),

  q('td-liberation',
    L('حين اقترب التحرير وعرف الجميع أن المعسكر سيُغلق قريباً، ماذا حدث لاقتصاده الصغير؟',
      'As liberation approached and everyone knew the camp would soon close, what happened to its little economy?'),
    [
      L('انهار: دخّن الأسرى مدّخراتهم، وتبخّرت الديون دخاناً', 'It collapsed: the prisoners smoked their savings, and the debts went up in smoke'),
      L('ازدهر: تنزيلات اليوم الأخير، كلّ شيءٍ يجب أن يُباع', 'It boomed: last-day sale, everything must go'),
      L('افتتحوا بورصةً، في الوقت المناسب تماماً', 'They opened a stock exchange, just in time'),
    ],
    L('اقتصادٌ نقديّ لا يصمد إذا عرف الجميع أن نهايته قريبة: توقّع الانهيار يكفي لإحداثه.',
      'A monetised economy cannot survive once everyone knows its end is near: expecting the collapse is enough to cause it.')),

  q('td-faustus',
    L('وقّع الدكتور فاوست عقداً مع الشيطان بدمه. ما «الفائدة» التي سيدفعها؟',
      'Doctor Faustus signs a contract with the devil in his own blood. What is the “interest” he will pay?'),
    [
      L('روحه، بعد أربعٍ وعشرين سنة من القوّة والمتعة', 'His soul, after twenty-four years of power and pleasure'),
      L('٤٫٥٪ ثابتة، مع حسابٍ جارٍ مجّاني', '4.5% fixed, with free current account'),
      L('عمرٌ كامل من الرسائل المزعجة', 'A lifetime of spam email'),
    ],
    L('مسرحية مارلو: الدَّين وفائدته. والكنيسة أيضاً حرّمت الفائدة قروناً وسمّتها رباً — لهذا طالب جمهور مارلو بعقاب فاوست.',
      'Marlowe’s play: a debt and its interest. The Church, too, forbade interest for centuries and called it usury — which is why Marlowe’s audience wanted Faustus punished.')),

  q('td-pharaoh',
    L('لو اخترع جيمس واط محرّكه البخاري في مصر القديمة وعرضه على الفرعون، ماذا كان سيصير به؟',
      'Suppose James Watt had invented his steam engine in ancient Egypt and shown it to the Pharaoh. What would have become of it?'),
    [
      L('تحفةً يتباهى بها في القصر', 'A curiosity to show off in the palace'),
      L('أوّل سكّة حديدٍ مصرية: الجيزة–الأقصر، مع عربة طعام', 'The first Egyptian railway: Giza to Luxor, with a dining car'),
      L('إبريق شايٍ صاخباً جدّاً', 'A very loud kettle'),
    ],
    L('لا شيء يدفع فرعوناً يملك مئات آلاف العبيد إلى استعماله في الإنتاج. الآلات انتشرت لأن أصحاب مشاريع مدينين تنافسوا على الربح.',
      'Nothing pushes a pharaoh with hundreds of thousands of slaves to use it in production. Machines spread because indebted entrepreneurs competed for profit.')),

  q('td-iphone',
    L('يُباع «آيفون» بنحو ٦٠٠ جنيهٍ إسترليني. كم يذهب منها إلى المصنع الذي جمّعه؟',
      'An iPhone sells for about £600. How much of that goes to the factory that assembled it?'),
    [
      L('أقلّ من ١٥٠ جنيهاً', 'Less than £150'),
      L('٥٩٩ جنيهاً — وتحتفظ «أبل» بجنيهٍ للملصقات', '£599 — Apple keeps a pound for the stickers'),
      L('كلّها: «أبل» تعمل حبّاً في الناس', 'All of it: Apple does it for love'),
    ],
    L('والباقي تحتفظ به «أبل» ثمناً لملكيّتها الفكرية. ومن هنا سؤال الكتاب الحاسم: هل تستطيع الآلات أن تصمّم الآلات؟',
      'Apple keeps the rest as payment for its intellectual property. Hence the book’s decisive question: can machines design machines?')),

  q('td-stag',
    L('صيّادو روسو لا يصطادون الأيل إلا معاً. أحدهم بدأ يشكّ في رفاقه. ماذا يفعل — وماذا يحدث؟',
      'Rousseau’s hunters can only catch the stag together. One of them starts to doubt the others. What does he do — and what happens?'),
    [
      L('يتحوّل إلى الأرانب، فيتبعه الجميع، ويفلت الأيل', 'He turns to the hares, everyone follows, and the stag gets away'),
      L('يدعو إلى اجتماع. يموت الأيل من الشيخوخة', 'He calls a meeting. The stag dies of old age'),
      L('يصطاد الأيل وحده ثم يؤلّف كتاباً في تطوير الذات', 'He catches the stag alone, then writes a self-help book about it'),
    ],
    L('الشكّ وحده يكفي ليفلت الأيل: التشاؤم نبوءةٌ تحقّق نفسها — تماماً كاقتصادٍ يتوقّع فيه كلّ واحدٍ أن يُحجم الآخرون.',
      'Doubt alone lets the stag escape: pessimism is a prophecy that fulfils itself — exactly like an economy in which everyone expects everyone else to hold back.')),

  q('td-forest',
    L('احترقت غابة. ماذا يحدث للناتج الاقتصادي للبلد؟',
      'A forest burns down. What happens to the country’s economic output?'),
    [
      L('يرتفع: وقود طائرات الإطفاء وإعادة البناء كلّها تُحتسب', 'It goes up: the firefighting planes’ fuel and the rebuilding all count'),
      L('ينخفض بمقدار غابةٍ واحدة بالضبط', 'It goes down by exactly one forest'),
      L('لا شيء، لكنّ مبيعات المارشميلو تبلغ ذروتها', 'Nothing, though marshmallow sales peak'),
    ],
    L('الأشجار الواقفة بلا قيمةٍ تبادلية، أمّا الوقود وإعادة البناء فلهما قيمة. هكذا «ينمو» الاقتصاد حين تحترق الغابة.',
      'Standing trees have no exchange value, while the fuel and the rebuilding do. That is how the economy “grows” when the forest burns.')),

  q('td-ecuador',
    L('عام ٢٠٠٨ فعلت الإكوادور ما لم يفعله دستورٌ قبلها. ماذا؟',
      'In 2008 Ecuador did something no constitution had done before. What?'),
    [
      L('اعترفت للطبيعة نفسها بحقوق', 'It recognised rights belonging to nature itself'),
      L('جعلت الدَّين العامّ غير قانوني في عطلة نهاية الأسبوع', 'It made the national debt illegal at weekends'),
      L('عيّنت نمراً وزيراً للبيئة', 'It appointed a jaguar as minister of the environment'),
    ],
    L('الغابة المطيرة محميّةٌ لذاتها، مهما كانت قيمتها التبادلية — ما يسمّيه الكتاب سابقةً في التاريخ الدستوري.',
      'The rainforest protected for its own sake, whatever its exchange value — which the book calls a first in constitutional history.')),

  q('td-luddites',
    L('حطّم «اللوديون» الأنوال الجديدة. ما خصومتهم الحقيقية بحسب الكتاب؟',
      'The Luddites smashed the new looms. According to the book, what was their real quarrel?'),
    [
      L('من يملك الآلات، لا الآلات نفسها', 'Who owned the machines — not the machines themselves'),
      L('الضجيج: الأنوال أعلى صوتاً ممّا تتخيّل', 'The noise: looms are louder than you would think'),
      L('كانوا قد طلبوا طرازاً آخر', 'They had ordered a different model'),
    ],
    L('قلّةٌ ضئيلة تأخذ المكاسب، والعمّال يُلقَون إلى الجوع. السؤال لم يكن يوماً «آلةٌ أم لا»، بل «لمن؟».',
      'A tiny few took the gains while workers were thrown into hunger. The question was never “machines or not”, but “whose?”.')),

  q('td-nine-days',
    L('كم استغرق فاروفاكيس في كتابة هذا الكتاب؟',
      'How long did Varoufakis take to write this book?'),
    [
      L('تسعة أيام، بلا هامشٍ واحد', 'Nine days, without a single footnote'),
      L('تسع سنوات، معظمها هوامش', 'Nine years, most of them footnotes'),
      L('ما زال يكتبه؛ هذا مجرّد الإعلان', 'He is still writing it; this is just the trailer'),
    ],
    L('كتبه باليونانية عام ٢٠١٣ في بيت العائلة بجزيرة إيجينا، بلا خطّةٍ ولا مراجع. ولم يصدر بالإنجليزية إلا عام ٢٠١٧.',
      'He wrote it in Greek in 2013, at the family house on Aegina, with no plan and no references. It did not appear in English until 2017.')),

  q('td-achilles',
    L('بعد موت أخيل تنازع أياكس وأوديسيوس على سلاحه. كيف حسم الإغريق الأمر؟',
      'After Achilles died, Ajax and Odysseus both wanted his armour. How did the Greeks settle it?'),
    [
      L('استمعوا إلى حجّة كلٍّ منهما، وفازت الحجّة الأقوى', 'They heard each man’s argument, and the better argument won'),
      L('بمزاد: بيع للرجل في آخر القاعة صاحب الحصان الخشبي', 'An auction: sold to the man at the back with the wooden horse'),
      L('حجر، ورقة، مقصّ — الأفضل من ثلاث', 'Rock, paper, scissors — best of three'),
    ],
    L('فاز أوديسيوس. والمزاد كان سيُعدّ إهانة: المهمّ شرف الاستحقاق لا القيمة التبادلية — الفرق بين مجتمعٍ فيه أسواق و«مجتمع السوق».',
      'Odysseus won. An auction would have been an insult: what mattered was the honour of deserving it, not exchange value — the difference between a society with markets and a market society.')),

  q('td-bitcoin',
    L('يقول الكتاب إن آخر «بيتكوين» ستُعدَّن نحو عام ٢٠٣٢. ماذا وجد تحقّق النادي؟',
      'The book says the last bitcoin will be mined around 2032. What did the club’s own fact-check find?'),
    [
      L('السقف (٢١ مليوناً) صحيح، لكن الكسر الأخير يصل نحو عام ٢١٤٠', 'The cap of 21 million is right, but the last fraction arrives around 2140'),
      L('عُدِّنت الثلاثاء الماضي على يد مراهقٍ في غرفته', 'It was mined last Tuesday by a teenager in his bedroom'),
      L('لا سقف أصلاً؛ الرقم بدا جالباً للحظّ فحسب', 'There is no cap; the number just felt lucky'),
    ],
    L('مكافأة التعدين تنتصف كلّ أربع سنوات تقريباً: ٩٩٪ تصدر بحلول ٢٠٣٥ تقريباً، وآخر كسرٍ نحو ٢١٤٠.',
      'The mining reward halves roughly every four years: about 99% is issued by around 2035, and the last fraction around 2140.')),

  q('td-makronisos',
    L('سأل فاروفاكيس أباه، وكان سجيناً سياسياً: هل صارت السجائر عملةً في معسكركم أيضاً؟ ما الجواب؟',
      'Varoufakis asked his father, once a political prisoner: did cigarettes become money in your camp too? The answer?'),
    [
      L('لا: كانوا يتقاسمون كلّ ما يصلهم', 'No: they shared whatever they received'),
      L('نعم، وكان هو محافظ المصرف المركزي', 'Yes, and he ran the central bank'),
      L('لا، استعملوا الزيتون — فكّةٌ أصغر', 'No, they used olives — smaller change'),
    ],
    L('أبوه لم يكن يدخّن، لكنه كان يطلب السجائر ويعطيها للمدخّنين بلا مقابل. السوق ليس قانوناً من قوانين الطبيعة البشرية.',
      'His father did not smoke, but asked for cigarettes and gave them to the smokers for nothing. The market is not a law of human nature.')),

  q('td-gold',
    L('بماذا تُغطّى معظم عملات العالم اليوم؟',
      'What backs most of the world’s currencies today?'),
    [
      L('لا شيء سوى قرارات الدول وثقة الناس', 'Nothing but the decisions of states and the trust of people'),
      L('سبائك ذهبٍ في جبلٍ سويسري', 'Gold bars inside a Swiss mountain'),
      L('جدول «إكسل» واثقٌ من نفسه جدّاً', 'A very confident spreadsheet'),
    ],
    L('انتهى غطاء الذهب عام ١٩٧١ حين علّق نيكسون تحويل الدولار إلى ذهب. مال اليوم «سياسيّ» بالكامل.',
      'The gold link ended in 1971, when Nixon suspended the dollar’s convertibility. Today’s money is “political” all the way down.')),
]
