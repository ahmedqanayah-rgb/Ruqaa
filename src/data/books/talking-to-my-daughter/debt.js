/* ============================================================================
   «الدَّين والربا والأنظمة الثلاثة» — the club's own companion to the book.
   ----------------------------------------------------------------------------
   Converted from the club's PDF of the same name (revised edition, October
   2026), written alongside the Arabic translation. A solo top-level tab, like
   «داخل حالة التدفّق» for Stolen Focus, for the same reason: it is not the
   book's content, and it opens by saying whose it is.

   WHAT THE PDF HAD THAT THIS DOES NOT, and why:
   - Page references into the club's own scan, and notes about that scan's
     missing pages. They describe one file on one person's computer; on a public
     page they would be noise. The arguments they pointed to are all here.
   - The worked market example NAMED A BANK, from a broker's social-media post
     advertising its mortgage rates. The point — an Islamic financing ad whose
     rates rise with the term the way a loan's do — stands without the name, and
     a third party's post is too thin a source to hold a named company's pricing
     up to public critique. Its table of rates went with the name.
   - The link to an online copy of Usmani's «An Introduction to Islamic
     Finance». It looks like an unauthorised upload; the book is cited by name.
   - The world map of debt. It was a recoloured screenshot of the IMF's own
     map; figure 17's bars carry the same point from the same data.

   Every number that remains is the PDF's, with the PDF's source.

   VOCABULARY. The PDF says «البنك» where the translation says «المصرف», and
   «المُقرض الأخير» where it says «ملجأ أخير للإقراض», because those are the
   words people use; this tab keeps the PDF's choice. The chapter summaries keep
   the translation's.

   RELIGIOUS TEXT. The Qur’anic verses and hadith are transcribed from the PDF
   with their references; the English renders their meaning and is not a
   translation of the Qur’an. The tab presents scholarly positions, including
   minority ones, and says so — it is not a fatwa, and must not drift into one.
   ========================================================================== */
const L = (ar, en) => ({ ar, en })

/* ---------------------------------------------------------------- 1 */
const fromSurplus = {
  id: 'surplus-debt',
  title: L('١ · من الفائض إلى الدَّين', '1 · From surplus to debt'),
  blocks: [
    { type: 'p', text: L(
      'يبدأ الكتاب من سؤال اللامساواة، ويبني جوابه على كلمةٍ واحدة: **الفائض (Surplus)** — ما يبقى من المحصول بعد طعام المنتجين وتعويض البذار. حين صارت الزراعة تُنتج أكثر من حاجة أصحابها احتاج الناس إلى من يحصي المخزون ويحرسه ويوزّعه، ومن هنا نشأت **الكتابة والدَّين والنقود والدولة**.',
      'The book starts from the question of inequality and builds its answer on one word: **surplus** — what is left of the harvest once the producers have eaten and the seed is replaced. When farming began to yield more than its farmers needed, people were needed to count the store, guard it and share it out, and from there came **writing, debt, money and the state**.'
    ) },
    { type: 'p', text: L(
      'ثم يميّز بين قيمتين: **القيمة الاستعمالية** — قيمة الشيء حين تعيشه، كغروب الشمس أو دعابة صديق — و**القيمة التبادلية**، أي سعره في السوق. وعلى هذا التمييز تقوم فكرته التاريخية: عرف الناس قديماً **مجتمعاتٍ ذات أسواق**، لكنّ أغلب ما يُنتج كان يُنتج خارج السوق. ثم ظهر **مجتمع السوق** — الاسم الذي يختاره الكتاب بدل «الرأسمالية» — حين صارت عوامل الإنتاج نفسها، الأرض والأدوات و**قوّة العمل**، بضائع. بدأ ذلك في بريطانيا مع **التسييجات**: طرد الملّاك الأقنان وأحلّوا محلّهم الخراف، فصارت الأرض تُؤجَّر وصار المطرودون يعرضون قوّة عملهم للبيع.',
      'Then he distinguishes two values: **experiential value** — what a thing is worth as you live it, a sunset, a friend’s joke — and **exchange value**, its price in a market. His history rests on the distinction: people long knew **societies with markets**, but most of what was produced was produced outside the market. **Market society** — his word for capitalism — arrived when the factors of production themselves, land, tools and **labour power**, became commodities. It began in Britain with **the enclosures**: landlords drove out the serfs and put sheep in their place, so land came to be rented and the evicted offered their labour for sale.'
    ) },
    { type: 'p', text: L(
      'وأهمّ فكرةٍ لموضوعنا ما يسمّيه **الانقلاب الكبير (The Great Reversal)**. في الإقطاع كان الأقنان ينتجون أوّلاً، ثم يأخذ السيّد حصّته، والدَّين إن وقع جاء في الآخر. وبعد تسليع الأرض والعمل انقلب الترتيب: على **صاحب المشروع** أن يدفع الإيجار والأجور وثمن البذار قبل أن ينتج شيئاً، فلا بدّ له من أن يقترض أوّلاً. هكذا صار **الدَّين (Debt)** يسبق الإنتاج بدل أن يتبعه، وصار التوزيع مقرّراً قبل أن يبدأ الإنتاج.',
      'The idea that matters most here is what he calls **the Great Reversal**. Under feudalism serfs produced first, the lord took his share, and debt, if it came at all, came last. Once land and labour were commodities the order flipped: an **entrepreneur** must pay rent, wages and seed before producing anything, so he must borrow first. That is how **debt** came to precede production instead of following it, and distribution came to be settled before production began.'
    ) },
    { type: 'p', text: L(
      'ومن الدَّين جاء الباقي. **الفائدة (Interest)** هي ما يدفعه المدين فوق أصل القرض، وهي مع العقد المُلزِم ما يميّز هذا الدَّين من ديون التضامن القديمة بين الجيران. و**الربح (Profit)** هو ما يبقى لصاحب المشروع بعد الأجور والإيجار وسداد الدَّين مع فائدته؛ ومن لا يربح لا يستطيع السداد فيخرج من السوق، ولذلك صار الربح شرطاً للبقاء لا مجرّد رغبةٍ في الغنى. ويقول الكتاب إن **الدَّين، لا الفحم، كان الوقود الحقيقي للثورة الصناعية.**',
      'Everything else came from debt. **Interest** is what a debtor pays on top of the loan, and with a binding contract it is what separates this debt from the old debts of solidarity between neighbours. **Profit** is what the entrepreneur keeps after wages, rent and the debt with its interest; whoever makes none cannot repay and leaves the market, which is why profit became a condition of survival, not merely a wish to be rich. And the book says **debt, not coal, was the real fuel of the Industrial Revolution.**'
    ) },
    { type: 'p', text: L(
      'يترك هذا العرض سؤالين مفتوحين: هل يجوز أن يكون للدَّين سعرٌ أصلاً؟ هذا موضوع القسم الثاني. ومن أين يأتي المال الذي يُقرَض؟ هذا موضوع القسم الرابع.',
      'This leaves two questions open. May a debt have a price at all? That is section two. And where does the money that is lent come from? That is section four.'
    ) },
    { type: 'linkcards', title: L('في الكتاب', 'In the book'), links: [
      { to: '/book/talking-to-my-daughter/review?open=debt-profit', icon: '🔗', label: L('الفصل ٣ · زواج الدَّين والربح — ومعه شكل «الانقلاب الكبير»', 'Chapter 3 · The Marriage of Debt and Profit — with the Great Reversal figure') },
    ] },
  ],
}

/* ---------------------------------------------------------------- 2 */
const riba = {
  id: 'riba',
  title: L('٢ · الربا', '2 · Riba'),
  blocks: [
    { type: 'h', text: L('من فاوست إلى قرار المجمع', 'From Faust to the Fiqh Academy') },
    { type: 'p', text: L(
      'يروي الكتاب حكاية فاوست في نسختين: عالِمٌ يوقّع بدمه عقداً مع الشيطان — أربعٌ وعشرون سنةً من السلطة والمتعة مقابل روحه حين يحلّ الأجل. في مسرحية **مارلو** أواخر القرن السادس عشر لا مهرب له؛ وفي مسرحية **غوته** مطلع القرن التاسع عشر ينجو. ويقرأ فاروفاكيس هذا الفرق مرآةً لتحوّل أوروبا، يلخّصه الشكل.',
      'The book tells the story of Faust in two versions: a scholar signs a contract in his blood with the devil — twenty-four years of power and pleasure for his soul when the term is up. In **Marlowe’s** play at the end of the sixteenth century there is no escape; in **Goethe’s** at the start of the nineteenth he is saved. Varoufakis reads the difference as a mirror of Europe’s transformation, which the figure sums up.'
    ) },
    { type: 'figure', id: 'tdRibaPaths' },
    { type: 'p', text: L(
      'في زمن مارلو كان المسيحيون يعدّون أخذ الفائدة على الدَّين خطيئة، وتسمّيها الترجمة «الربا». وفي زمن غوته صار الأوروبيون يتسامحون مع المدين ما دام يسدّد أصل الدَّين وفائدته. ويربط الكتاب هذا التحوّل بالبروتستانت الذين انشقّوا عن الكنيسة الكاثوليكية في القرن السادس عشر: بطلهم التاجر صاحب المشروع، وأخلاقهم الجديدة قبلت القرض بفائدة. وفي رأيه أن الثورة الصناعية ما كانت لتقع لو بقي ذلك المنع. وفي مقالةٍ له عن الحكاية نفسها يذكر قانوناً إنجليزياً أجاز الفائدة في عهد هنري الثامن.',
      'In Marlowe’s time Christians held that taking interest on a debt was a sin, which the translation calls «riba». By Goethe’s, Europeans tolerated a debtor so long as he repaid the principal and the interest. The book ties the shift to the Protestants who broke from the Catholic Church in the sixteenth century: their hero was the merchant-entrepreneur, and their new ethic accepted lending at interest. In his view the Industrial Revolution could not have happened had the ban stood. In an article on the same story he mentions an English law that permitted interest under Henry VIII.'
    ) },
    { type: 'p', text: L(
      'ويقابل الكتاب فاوست بسكروج، بخيل ديكنز الذي يكدّس الفوائد ولا يُنفق. وأيّهما أنسب لمجتمع السوق؟ فاوست، الذي يقترض ويُنفق اليوم ويدفع غداً. فلو ادّخر الناس كلّهم ولم يقترض أحد لتوقّف الاقتصاد.',
      'The book sets Faust against Scrooge, Dickens’s miser who hoards interest and spends nothing. Which suits a market society? Faust, who borrows, spends today and pays tomorrow. If everyone saved and no one borrowed, the economy would stop.'
    ) },

    { type: 'h', text: L('ما الربا؟', 'What is riba?') },
    { type: 'p', text: L(
      'الربا في اللغة **الزيادة**، وهو في الفقه نوعان. الأوّل **ربا النسيئة**، ويسمّى ربا الديون: زيادةٌ على الدَّين مقابل الأجل، وله صورتان — زيادةٌ مشروطة على القرض منذ بداية العقد، كأن تُقرضه ١٠٠ على أن يردّها ١١٠ بعد سنة؛ وزيادةٌ عند حلول الأجل وعجز المدين عن السداد: يُمهَل ويُزاد عليه مقابل الإمهال. والثاني **ربا الفضل**، ويسمّى ربا البيوع: زيادةٌ أو تأجيلٌ في مبادلة صنفٍ بجنسه من الأصناف الستّة الواردة في الحديث — الذهب والفضّة والقمح والشعير والتمر والملح — كمئة غرام ذهبٍ بمئةٍ وعشرة. وما يهمّنا في موضوع البنوك هو الأوّل.',
      'Riba means **increase**, and jurisprudence knows two kinds. The first is **riba al-nasi’ah**, the riba of debts: an increase on a debt in return for time. It takes two forms — an increase stipulated in a loan from the start, as when you lend 100 to be repaid as 110 a year later; and an increase when the debt falls due and the debtor cannot pay: he is given more time and charged for it. The second is **riba al-fadl**, the riba of sales: an increase or delay in exchanging one of the six kinds named in the hadith — gold, silver, wheat, barley, dates and salt — for its own kind, such as 100 grams of gold for 110. For banking, it is the first that matters.'
    ) },
    { type: 'table', caption: L('**جدول ١.** خلاصة: نوعا الربا.', '**Table 1.** In short: the two kinds of riba.'),
      head: [L('النوع', 'Kind'), L('ما هو', 'What it is'), L('مثال', 'Example')],
      rows: [
        [L('ربا النسيئة (ربا الديون) · Riba al-nasi’ah', 'Riba al-nasi’ah (riba of debts)'), L('زيادة على الدَّين مقابل الأجل، مشروطة من أوّل العقد أو مقابل الإمهال.', 'An increase on a debt for time — stipulated from the start, or charged for an extension.'), L('١٠٠ تُردّ ١١٠ بعد سنة.', '100 repaid as 110 a year later.')],
        [L('ربا الفضل (ربا البيوع) · Riba al-fadl', 'Riba al-fadl (riba of sales)'), L('زيادة أو تأجيل في مبادلة صنفٍ بجنسه من الأصناف الستّة.', 'An increase or delay in exchanging one of the six kinds for its own kind.'), L('١٠٠ غرام ذهبٍ مقابل ١١٠.', '100 grams of gold for 110.')],
      ] },

    { type: 'h4', text: L('النصوص', 'The texts') },
    { type: 'p', text: L('النصوص الأساسية في ربا الديون هي هذه:', 'These are the core texts on the riba of debts:') },
    { type: 'ul', items: [
      L('﴿وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا﴾ — البقرة: ٢٧٥', '“God has permitted trade and forbidden riba.” — al-Baqarah 2:275'),
      L('﴿وَإِنْ تُبْتُمْ فَلَكُمْ رُءُوسُ أَمْوَالِكُمْ لَا تَظْلِمُونَ وَلَا تُظْلَمُونَ﴾ — البقرة: ٢٧٩', '“If you repent, you shall have your principal: you shall neither wrong nor be wronged.” — al-Baqarah 2:279'),
      L('﴿وَإِنْ كَانَ ذُو عُسْرَةٍ فَنَظِرَةٌ إِلَىٰ مَيْسَرَةٍ﴾ — البقرة: ٢٨٠', '“And if the debtor is in hardship, then let there be respite until ease.” — al-Baqarah 2:280'),
      L('﴿لَا تَأْكُلُوا الرِّبَا أَضْعَافًا مُضَاعَفَةً﴾ — آل عمران: ١٣٠', '“Do not consume riba, doubled and redoubled.” — Al ‘Imran 3:130'),
      L('«لَعَنَ رَسُولُ اللَّهِ ﷺ آكِلَ الرِّبَا وَمُوكِلَهُ وَكَاتِبَهُ وَشَاهِدَيْهِ، وَقَالَ: هُمْ سَوَاءٌ» — مسلم ١٥٩٨', '“The Messenger of God cursed the one who consumes riba, the one who pays it, the one who records it and its two witnesses, and said: they are all alike.” — Muslim 1598'),
    ] },
    { type: 'p', text: L('ومنها تُستخلص ثلاث قواعد:', 'From them three rules follow:') },
    { type: 'ol', items: [
      L('**البيع غير الربا.** الربح من مبادلة سلعةٍ أو منفعة حلال، والزيادة على دَينٍ نقديّ حرام.', '**Trade is not riba.** Profit from exchanging a good or a service is lawful; an increase on a money debt is forbidden.'),
      L('**للدائن رأس ماله فقط:** لا زيادة فيَظلِم، ولا نقص فيُظلَم.', '**The creditor gets his principal only:** no increase, or he wrongs; no decrease, or he is wronged.'),
      L('**المعسر يُمهَل،** ولا يُزاد عليه.', '**A debtor in hardship is given time,** and nothing is added to what he owes.'),
    ] },

    { type: 'h4', text: L('لماذا؟ منطق التحريم', 'Why? The logic of the ban') },
    { type: 'p', text: L('يلخّص **محمد تقي العثماني**، في «مقدّمة في التمويل الإسلامي»، هذا المنطق في ثلاث أفكار.', '**Muhammad Taqi Usmani**, in An Introduction to Islamic Finance, sums up the logic in three ideas.') },
    { type: 'p', text: L(
      '**المال وسيلة، لا سلعة.** ليس للمال منفعةٌ في ذاته، فهو **وسيلة تبادل (Medium of exchange)**. السلعة تُؤكل أو تُلبس أو تُسكن، والمال لا يُنتفع به إلا بإنفاقه، ولذلك لا يجوز أن يُباع بربحٍ من جنسه: ١٠٠ اليوم مقابل ١١٠ غداً. وهنا يلتقي الكتابان ثم يفترقان. فاروفاكيس يلاحظ أن المال في مجتمع السوق تحوّل من وسيلةٍ إلى غاية، ويصف **سوق المال (Money market)** بأنها سوقٌ لا يُباع فيها المال بل يُؤجَّر، والفائدة سعر تأجيره — ويردّ بذلك على من يصرّون على أن المال «سلعةٌ كأيّ سلعةٍ أخرى»، لكن لسببٍ اقتصاديّ: خفض الفائدة قد يُقرأ علامةً على سوء الحال فلا يقترض أصحاب المشاريع ولا يوظّفون. والعثماني يقول إن هذا التأجير نفسه لا يصحّ: ما لا يُنتفع به إلا باستهلاكه — كالنقود والطعام والوقود — لا يُؤجَّر؛ وما سُمّي إجارةً له فهو قرض، وأجرته فائدة.',
      '**Money is a means, not a commodity.** Money has no use in itself; it is **a medium of exchange**. A good is eaten, worn or lived in; money is of use only when spent, so it may not be sold for a profit in its own kind: 100 today for 110 tomorrow. Here the two books meet and part. Varoufakis observes that in a market society money turned from a means into an end, and describes **the money market** as one where money is not sold but rented, interest being the rent — answering those who insist money is “a commodity like any other”, but for an economic reason: an interest-rate cut can read as a sign of trouble, so entrepreneurs neither borrow nor hire. Usmani says the renting itself is invalid: what can be used only by consuming it — money, food, fuel — cannot be leased; what is called leasing it is a loan, and its rent is interest.'
    ) },
    { type: 'p', text: L(
      '**الربح يقتضي مخاطرة.** في النظرية الرأسمالية يأخذ **رأس المال (Capital)** فائدةً ثابتة، ويأخذ صاحب المشروع الربح ويتحمّل المخاطرة. ويقول العثماني إن الإسلام لا يفصل بينهما: من يضع مالاً في مشروعٍ عليه أن يتحمّل احتمال الخسارة، وحقّه حصّةٌ من الربح الفعليّ لا مبلغٌ مضمون. والقاعدة الفقهية في ذلك: **«الخراج بالضمان»**، أي الغُنم بالغُرم.',
      '**Profit requires risk.** In capitalist theory **capital** takes a fixed interest while the entrepreneur takes the profit and carries the risk. Usmani says Islam does not separate the two: whoever puts money into a project must bear the chance of loss, and is owed a share of actual profit, not a guaranteed sum. The legal maxim: **“al-kharaj bil-daman”** — gain goes with liability.'
    ) },
    { type: 'p', text: L(
      '**الفائدة تفصل العائد عن النتيجة.** إذا ربح المشروع كثيراً أخذ صاحب المال عائداً ثابتاً صغيراً وذهب الباقي إلى المقترض. وإذا خسر بقيت الفائدة مستحقّة. ففي الحالين طرفٌ مظلوم.',
      '**Interest cuts the return loose from the outcome.** If the project does very well, the lender takes a small fixed return and the rest goes to the borrower. If it fails, the interest is still owed. Either way, one side is wronged.'
    ) },

    { type: 'h4', text: L('هل فائدة البنك هي الربا؟', 'Is bank interest riba?') },
    { type: 'p', text: L(
      'في المسألة خلافٌ معاصر، والقولان ليسا بالوزن نفسه. **قول المجامع الفقهية، وهو قول الأغلبية:** نعم. مجمع البحوث الإسلامية في الأزهر قرّر سنة **١٩٦٥**، بحضور ممثّلين عن أكثر من ٣٥ بلداً، أن الفائدة على القروض بأنواعها ربا، استهلاكيةً كانت أو إنتاجية. ومجمع الفقه الإسلامي الدولي قرّر سنة **١٩٨٥** أن الزيادة على القرض من أوّل العقد، والزيادة على الدَّين مقابل تأجيله، كلتاهما ربا.',
      'This is a live dispute, and the two positions do not weigh the same. **The fiqh academies’ position, the majority’s:** yes. Al-Azhar’s Islamic Research Academy ruled in **1965**, with representatives of more than 35 countries present, that interest on loans of every kind is riba, whether for consumption or production. The International Islamic Fiqh Academy ruled in **1985** that an increase on a loan from the start of the contract, and an increase on a debt for deferring it, are both riba.'
    ) },
    { type: 'p', text: L(
      '**قولٌ مخالف، وهو قول الأقلّية:** أجاز مفتي مصر محمد سيد طنطاوي سنة **١٩٨٩** عوائد شهادات الاستثمار، وقرّر مجمع البحوث الإسلامية نفسه سنة **٢٠٠٢** أن استثمار الأموال في بنوكٍ تحدّد الربح مقدّماً حلال، وعلى هذا الرأي دار الإفتاء المصرية. حجّة هذا الفريق أن المودع موكِّلٌ للبنك في استثمار ماله، لا مُقرِض. وردّ الأغلبية أن القانون يعدّ الوديعة قرضاً، وأن البنك ضامنٌ للمبلغ وفائدته، والوكيل لا يضمن. وفي المسألة نقاشٌ اقتصاديّ أيضاً: في كتاب «الربا والفائدة» الصادر في دمشق، يفرّق محمد رياض الأبرش بين ربا الماضي وفائدة الاقتصاد الحديث، ويردّ عليه رفيق يونس المصري. **وهذا القسم عرضٌ للآراء، لا فتوى.**',
      '**A dissenting position, the minority’s:** in **1989** the Mufti of Egypt, Muhammad Sayyid Tantawi, permitted the returns on investment certificates, and in **2002** the same Islamic Research Academy ruled that investing money with banks that set the profit in advance is permissible — the position of Egypt’s Dar al-Ifta. This side argues the depositor appoints the bank as his agent to invest the money, rather than lending it. The majority replies that the law treats a deposit as a loan, and the bank guarantees the sum and its interest — which an agent does not. There is an economic debate too: in the book «Riba and Interest», published in Damascus, Muhammad Riyad al-Abrash distinguishes the riba of the past from the interest of the modern economy, and Rafiq Yunus al-Misri answers him. **This section sets out the positions; it is not a fatwa.**'
    ) },

    { type: 'h4', text: L('«أضعافاً مضاعفة» بالأرقام', '“Doubled and redoubled”, in numbers') },
    { type: 'p', text: L(
      '**الفائدة المركّبة (Compound interest)** فائدةٌ على الفائدة: ما لم يُسدَّد من فائدة هذه السنة يُضاف إلى أصل الدَّين، فتُحسب عليه فائدة السنة التالية. والقانون: **A = P × (1 + r)ⁿ** — حيث A المبلغ المستحقّ في النهاية، وP أصل الدَّين، وr نسبة الفائدة السنوية، وn عدد السنوات. دَينٌ قدره ١٠٠ بفائدة ١٠٪ سنوياً، إن لم يُسدَّد، يصير ١٣٣٫١ بعد ثلاث سنوات و٢١٤٫٤ بعد ثماني سنوات: أي أنه يتضاعف في نحو سبع سنواتٍ وربع. والشكل يقارن دَيناً كهذا بثمن **المرابحة (Murabahah)**: بيعٌ بثمنٍ مؤجَّلٍ ثابت يشرحه القسم الثالث.',
      '**Compound interest** is interest on interest: whatever of this year’s interest goes unpaid is added to the principal, and next year’s interest is charged on the total. The formula: **A = P × (1 + r)ⁿ** — where A is the sum owed at the end, P the principal, r the annual rate and n the number of years. A debt of 100 at 10% a year, unpaid, becomes 133.1 after three years and 214.4 after eight: it doubles in about seven and a quarter years. The figure sets a debt like this against the price of a **murabaha**: a sale at a fixed deferred price, explained in section three.'
    ) },
    { type: 'figure', id: 'tdCompound' },
    { type: 'p', text: L(
      'في المرابحة يُحدَّد الثمن عند العقد، ويبقى كما هو إن تأخّر السداد. قرار مجمع الفقه الدولي بشأن البيع بالتقسيط يجيز أن يكون الثمن المؤجَّل أعلى من الثمن الحالّ، وأن يختلف باختلاف الأجل، بشرط أن يُحسم عند العقد. ويمنع بعد ذلك أيّ زيادةٍ على المدين المتأخّر، بشرطٍ سابقٍ أو بغير شرط. فالملزم حصّةٌ في ثمن البيع، ولا حصّة له في دَينٍ ثبت. والخصم عند السداد المبكر ليس حقّاً تلقائياً: يجوز فقط إن لم يُتّفق عليه مسبقاً.',
      'In a murabaha the price is fixed at the contract and stays the same if payment is late. The International Islamic Fiqh Academy’s ruling on instalment sales permits a deferred price higher than the cash price, varying with the term, on condition that it is settled at the contract. After that it forbids any increase on a late debtor, whether stipulated in advance or not: the seller’s share is in the sale price, not in a debt once fixed. And a discount for early payment is not automatic: it is permitted only if not agreed in advance.'
    ) },

    { type: 'sources', title: L('مصادر هذا القسم', 'Sources for this section'), items: [
      { label: L('فاروفاكيس، «خاطرة ليوم الميلاد: فاوست وسكروج والدَّين» (٢٠١٠)', 'Varoufakis, “A thought for Xmas day: Faustus, Scrooge and debt in the age of capital” (2010)'), publisher: L('مدوّنة المؤلّف', 'The author’s blog'), url: 'https://www.yanisvaroufakis.eu/2010/12/25/a-thought-for-xmas-day-faustus-scrooge-and-debt-in-the-age-of-capital/' },
      { label: L('«الربا» (usury)', '“Usury”'), publisher: L('الموسوعة البريطانية', 'Encyclopaedia Britannica'), url: 'https://www.britannica.com/money/usury' },
      { label: L('صحيح مسلم ١٥٩٨', 'Sahih Muslim 1598'), publisher: L('موقع سنّة', 'Sunnah.com'), url: 'https://sunnah.com/muslim:1598' },
      { label: L('قاعدة «الخراج بالضمان»', 'The maxim “al-kharaj bil-daman”'), publisher: L('الدرر السنية، موسوعة القواعد الفقهية', 'Dorar, encyclopedia of legal maxims'), url: 'https://dorar.net/qfiqhia/1482' },
      { label: L('مجمع الفقه الإسلامي الدولي، قرار ١٠ (٢/١٠) في التعامل المصرفي بالفوائد، ١٩٨٥', 'IIFA Resolution 10 (10/2) on bank interest, 1985'), publisher: L('مجمع الفقه الإسلامي الدولي', 'International Islamic Fiqh Academy'), url: 'https://iifa-aifi.org/en/32234.html' },
      { label: L('القره داغي، «فوائد المصارف من الحرام والحلال» — وفيه قرار مؤتمر الأزهر ١٩٦٥', 'Al-Qaradaghi on bank interest — including the 1965 al-Azhar ruling'), publisher: L('المكتبة الشاملة', 'Al-Maktaba al-Shamela'), url: 'https://shamela.ws/book/968/1267' },
      { label: L('فتوى طنطاوي ١٩٨٩ وقرار مجمع البحوث ٢٠٠٢', 'Tantawi’s 1989 fatwa and the Research Academy’s 2002 ruling'), publisher: L('إسلام أون لاين', 'IslamOnline'), url: 'https://islamonline.net/29688' },
      { label: L('موقف دار الإفتاء المصرية (٢٠٢١)', 'Egypt’s Dar al-Ifta position (2021)'), publisher: L('مصراوي', 'Masrawy'), url: 'https://www.masrawy.com/islameyat/others-islamic_ppl_news/details/2021/10/13/2105262/' },
      { label: L('«الربا والفائدة: دراسة اقتصادية مقارنة» (الأبرش والمصري)', '“Usury and Interest: A Comparative Economic Study” (al-Abrash & al-Misri)'), publisher: L('موسوعة الفقه المعاصر', 'Encyclopedia of Contemporary Fiqh'), url: 'https://ency.feqhemoaser.com/en/view/Usury_and_Interest:_A_Comparative_Economic_Study_(book)' },
      { label: L('مجمع الفقه الدولي: البيع بالتقسيط (١٩٩٠)', 'IIFA: instalment sales (1990)'), publisher: L('مجمع الفقه الإسلامي الدولي', 'International Islamic Fiqh Academy'), url: 'https://iifa-aifi.org/en/32398.html' },
      { label: L('مجمع الفقه الدولي: الحطّ مقابل التعجيل (١٩٩٢)', 'IIFA: discount for early payment (1992)'), publisher: L('مجمع الفقه الإسلامي الدولي', 'International Islamic Fiqh Academy'), url: 'https://iifa-aifi.org/en/32442.html' },
    ] },
  ],
}

/* ---------------------------------------------------------------- 3 */
const banks = {
  id: 'banks',
  title: L('٣ · البنك التقليدي والبنك الإسلامي', '3 · The conventional bank and the Islamic bank'),
  blocks: [
    { type: 'p', text: L(
      'يعمل البنك التقليدي بالدَّين من الجهتين: يأخذ ودائع بفائدة، ويمنح قروضاً بفائدةٍ أعلى، وربحه الفرق بين الفائدتين. والبنك الإسلامي ممنوعٌ من ذلك في الجهتين. من جهة المودعين: **الحساب الجاري** عنده مضمونٌ بلا عائد، و**حساب الاستثمار** مضاربة — المودع فيه صاحب المال والبنك عاملٌ فيه، يتقاسمان الربح، والمودع في النظرية معرّضٌ للخسارة. ومن جهة التمويل: عليه أن يبيع أو يؤجّر أو يشارك.',
      'A conventional bank works with debt on both sides: it takes deposits at interest and makes loans at a higher interest, profiting from the gap. An Islamic bank may do neither. On the depositors’ side: its **current account** is guaranteed but earns nothing, and its **investment account** is a mudaraba — the depositor owns the capital, the bank works it, they share the profit, and in theory the depositor can lose. On the financing side: it must sell, lease, or go into partnership.'
    ) },
    { type: 'h4', text: L('السيارة نفسها، بعقدين', 'The same car, two contracts') },
    { type: 'p', text: L(
      'تريد سيارةً سعرها ٢٠٬٠٠٠ ولا تملك ثمنها. أمامك طريقان: في الأوّل يُقرضك البنك المبلغ فتشتري السيارة أنت ثم تردّ القرض مع فائدته؛ وفي الثاني، وهو المرابحة، يشتري البنك السيارة أوّلاً فتدخل في ملكه، ثم يبيعها لك بثمنٍ أعلى مؤجَّل.',
      'You want a car costing 20,000 and don’t have the money. There are two roads. In the first the bank lends you the sum, you buy the car yourself and repay the loan with interest. In the second, the murabaha, the bank buys the car first so that it becomes the bank’s, then sells it to you at a higher deferred price.'
    ) },
    { type: 'figure', id: 'tdCarTwoWays' },

    { type: 'h4', text: L('العقود الأساسية', 'The core contracts') },
    { type: 'p', text: L(
      'يقوم التمويل الإسلامي على عقودٍ معروفة في الفقه، يمكن جمعها في ثلاث مجموعات. **عقود المشاركة في الربح والخسارة:** في **المشاركة (Musharakah)** يقدّم الطرفان رأس المال ويتقاسمان الربح بنسبةٍ متّفقٍ عليها من الربح الفعليّ، ويتحمّل كلّ شريكٍ الخسارة بقدر حصّته. وفي **المضاربة (Mudarabah)** يقدّم طرفٌ المال (ربّ المال) والآخر العمل (المضارب)؛ الربح بينهما نسبةٌ من الربح الفعليّ لا مبلغٌ مقطوع، وإن وقعت خسارة فهي في المال على ربّ المال، ويخسر المضارب جهده، إلا إذا قصّر أو تعدّى.',
      'Islamic finance rests on contracts long known to jurisprudence, which fall into three groups. **Profit-and-loss sharing:** in a **musharaka** both sides put in capital and share profit in an agreed proportion of actual profit, each bearing loss in proportion to his share. In a **mudaraba** one side provides money (the owner of capital) and the other work (the managing partner); profit is split as a share of actual profit, never a fixed sum, and a loss falls on the capital and its owner, while the manager loses his effort — unless he was negligent or broke the terms.'
    ) },
    { type: 'figure', id: 'tdWhoBearsLoss' },
    { type: 'p', text: L(
      '**عقود البيع.** المرابحة رأيناها: يشتري البنك السلعة التي طلبها العميل ثم يبيعها له بالكلفة مع ربحٍ معلوم، وغالباً بالتقسيط؛ المخاطرة على البنك ما دامت السلعة في ملكه، وبعد البيع تصير ديناً ثابتاً على العميل. و**السَّلَم (Salam)** بيع بضاعةٍ موصوفة تُسلَّم لاحقاً بثمنٍ يُدفع كاملاً مقدّماً. و**الاستصناع (Istisna’)** طلب صنع شيءٍ بمواصفاتٍ محدّدة. وفي الاثنين يتحمّل الممّول مخاطرة بضاعةٍ حقيقية. **عقد الإجارة (Ijarah):** يملك البنك الأصل، كعقارٍ أو آلة، ويؤجّر منفعته؛ فإن تلف الأصل تحمّله المؤجِّر، إلا إذا قصّر المستأجر.',
      '**Sales.** Murabaha we have seen: the bank buys what the customer asked for and sells it to him at cost plus a known profit, usually in instalments; the risk is the bank’s while it owns the good, and after the sale it becomes a fixed debt on the customer. **Salam** is the sale of a specified good for later delivery, paid in full in advance. **Istisna’** is an order to manufacture something to specification. In both the financier carries the risk of a real good. **Ijara:** the bank owns the asset, a building or a machine, and leases its use; if the asset is destroyed the lessor bears it, unless the lessee was at fault.'
    ) },
    { type: 'p', text: L(
      'وخارج هذه المجموعات عقدٌ شاع كثيراً هو **التورّق (Tawarruq)**: يشتري العميل سلعةً بالتقسيط ثم يبيعها فوراً نقداً لطرفٍ ثالث. لا مشروع هنا ولا أصل يبقى. النتيجة نقدٌ اليوم بدَينٍ أكبر غداً.',
      'Outside these groups is a contract that has become very common: **tawarruq**. The customer buys a good in instalments and immediately sells it for cash to a third party. There is no project and no asset left. The result is cash today for a bigger debt tomorrow.'
    ) },
    { type: 'table', caption: L('**جدول ٢.** خلاصة: العقود الأساسية ومن يتحمّل الخسارة في كلٍّ منها.', '**Table 2.** In short: the core contracts and who bears the loss in each.'),
      head: [L('العقد', 'Contract'), L('الفكرة', 'The idea'), L('من يتحمّل الخسارة', 'Who bears the loss')],
      rows: [
        [L('المشاركة · Musharakah', 'Musharaka · partnership'), L('شريكان في رأس المال، والربح بنسبةٍ متّفقٍ عليها من الربح الفعليّ.', 'Two partners in the capital; profit in an agreed share of actual profit.'), L('كلّ شريكٍ بقدر حصّته.', 'Each partner in proportion to his share.')],
        [L('المضاربة · Mudarabah', 'Mudaraba · profit-sharing'), L('مالٌ من طرفٍ وعملٌ من طرف، والربح نسبةٌ لا مبلغٌ مقطوع.', 'Money from one side, work from the other; profit as a share, never a fixed sum.'), L('ربّ المال في ماله، والمضارب في جهده.', 'The owner in his capital, the manager in his effort.')],
        [L('المرابحة · Murabahah', 'Murabaha · cost-plus sale'), L('البنك يشتري السلعة ثم يبيعها بربحٍ معلوم، بالتقسيط غالباً.', 'The bank buys the good, then sells it at a known profit, usually in instalments.'), L('البنك ما دامت السلعة في ملكه.', 'The bank, while it owns the good.')],
        [L('الإجارة · Ijarah', 'Ijara · lease'), L('البنك يملك الأصل ويؤجّر منفعته.', 'The bank owns the asset and leases its use.'), L('المؤجِّر، إلا إذا قصّر المستأجر.', 'The lessor, unless the lessee was at fault.')],
        [L('السَّلَم والاستصناع', 'Salam and istisna’'), L('بضاعةٌ تُسلَّم لاحقاً، بثمنٍ مقدّم أو بحسب الصنع.', 'A good delivered later, paid in advance or as it is made.'), L('الممّول، لأنه يملك بضاعةً حقيقية.', 'The financier, who owns a real good.')],
        [L('التورّق · Tawarruq', 'Tawarruq · commodity murabaha'), L('شراء سلعةٍ بالتقسيط وبيعها فوراً نقداً لطرفٍ ثالث.', 'Buying a good in instalments and selling it at once for cash to a third party.'), L('لا أصل يبقى: دَينٌ ثابت على العميل.', 'No asset remains: a fixed debt on the customer.')],
      ] },
    { type: 'p', text: L(
      'يرتّب العثماني هذه العقود هكذا: المشاركة والمضاربة هما الأصل. والمرابحة والإجارة «ليستا مثاليّتين»: تجوزان عند الحاجة وبشروطهما، وخطوةً انتقالية فقط. أمّا التورّق المنظَّم الذي ترتّبه البنوك، فقد قرّر مجمع الفقه الدولي سنة **٢٠٠٩** أنه لا يجوز، ومع ذلك ما زال علماء شريعةٍ بارزون يجيزونه.',
      'Usmani ranks them like this: musharaka and mudaraba are the ideal. Murabaha and ijara are “not ideal”: permissible when needed and on their conditions, and only as a transitional step. As for organised tawarruq arranged by banks, the International Islamic Fiqh Academy ruled in **2009** that it is not permissible — though prominent Shariah scholars still allow it.'
    ) },

    { type: 'h4', text: L('الفرق، بنداً بنداً', 'The difference, point by point') },
    { type: 'p', text: L(
      'تجتمع الفروق في ستّة بنود. **الأوّل** ما يبيعه البنك: التقليدي يبيع مالاً، أي قرضاً نقدياً؛ والإسلامي يبيع سلعةً أو منفعةً أو حصّةً في شراكة. **الثاني** مصدر الربح: فائدةٌ على الزمن هناك، وربح بيعٍ أو أجرةٌ أو حصّةٌ من ربحٍ فعليّ هنا. **الثالث** المخاطرة: في القرض هي على المقترض وحده، وللبنك أصل المبلغ وفائدته مهما جرى للمشروع؛ وفي العقود الإسلامية يملك البنك الأصل ويتحمّل مخاطرته قبل بيعه، أو يشارك في الخسارة. **الرابع** التأخّر في السداد: فائدة تأخيرٍ تزيد الدَّين هناك؛ وهنا لا يزيد الثمن، وإن اشتُرط على المماطل القادر مبلغٌ ذهب إلى وجوه الخير لا إلى أرباح البنك. **الخامس** وجهة المال: أيّ نشاطٍ قانونيّ مربح، مقابل نشاطٍ مباحٍ مرتبطٍ بأصلٍ حقيقيّ. **السادس** الرقابة: البنك المركزي وحده، أو البنك المركزي ومعه هيئة رقابةٍ شرعية.',
      'The differences come down to six points. **First,** what the bank sells: the conventional bank sells money, a cash loan; the Islamic bank sells a good, a use, or a share in a partnership. **Second,** where profit comes from: interest on time there; a sale’s margin, a rent, or a share of actual profit here. **Third,** risk: in a loan it is the borrower’s alone, and the bank gets principal and interest whatever happens to the project; in the Islamic contracts the bank owns the asset and carries its risk before selling it, or shares the loss. **Fourth,** late payment: late interest grows the debt there; here the price does not rise, and if a solvent debtor who stalls is charged a sum, it goes to charity, not to the bank’s profit. **Fifth,** where the money goes: any legal profitable activity, against a permissible activity tied to a real asset. **Sixth,** oversight: the central bank alone, or the central bank with a Shariah supervisory board.'
    ) },
    { type: 'table', caption: L('**جدول ٣.** خلاصة: البنك التقليدي والبنك الإسلامي في النظرية.', '**Table 3.** In short: the conventional bank and the Islamic bank, in theory.'),
      head: [L('', ''), L('البنك التقليدي', 'Conventional bank'), L('البنك الإسلامي، في النظرية', 'Islamic bank, in theory')],
      rows: [
        [L('ماذا يبيع', 'What it sells'), L('مالاً: قرضٌ نقديّ.', 'Money: a cash loan.'), L('سلعة أو منفعة أو حصّة في شراكة.', 'A good, a use, or a share in a partnership.')],
        [L('مصدر الربح', 'Source of profit'), L('فائدةٌ على الزمن.', 'Interest on time.'), L('ربح بيع، أو أجرة، أو حصّة من ربحٍ فعليّ.', 'A sale’s margin, a rent, or a share of real profit.')],
        [L('المخاطرة', 'Risk'), L('على المقترض وحده.', 'The borrower’s alone.'), L('البنك يملك الأصل قبل بيعه، أو يشارك في الخسارة.', 'The bank owns the asset before selling it, or shares the loss.')],
        [L('إذا تأخّر السداد', 'If payment is late'), L('فائدة تأخيرٍ تزيد الدَّين.', 'Late interest grows the debt.'), L('الثمن لا يزيد.', 'The price does not rise.')],
        [L('أين يذهب المال', 'Where the money goes'), L('إلى أيّ نشاطٍ قانونيّ مربح.', 'Any legal, profitable activity.'), L('إلى نشاطٍ مباحٍ مرتبطٍ بأصلٍ حقيقيّ.', 'A permissible activity tied to a real asset.')],
        [L('الرقابة', 'Oversight'), L('البنك المركزي.', 'The central bank.'), L('البنك المركزي، ومعه هيئة رقابةٍ شرعية.', 'The central bank, with a Shariah board.')],
      ] },
    { type: 'p', text: L(
      'البند الثالث هو ما رسمه الشكل ١٣، والبند الرابع هو ما رأيناه في الشكل ١١.',
      'The third point is what figure 13 drew, and the fourth what figure 11 showed.'
    ) },

    { type: 'h4', text: L('في النظرية وفي الواقع', 'In theory and in practice') },
    { type: 'p', text: L(
      'التحريم واضحٌ في النصّ، فماذا عن التطبيق؟ النقد يأتي من داخل الصناعة قبل أن يأتي من خارجها. يقول العثماني نفسه إن البنوك الإسلامية تعمل في أغلب الأحيان بالرُّخَص — أي بالمرابحة والإجارة — لا بالأصل، أي بالمشاركة والمضاربة، ولذلك بقي أثرها في الاقتصاد محدوداً. وينتقد كذلك ربط ربح المرابحة بسعر الفائدة السائد: المعاملة تبقى صحيحة، لكنها تشبه المعاملة الربوية في الشكل ولا تخدم هدف التوزيع العادل.',
      'The ban is clear in the text — what about practice? The criticism comes from inside the industry before it comes from outside. Usmani himself says Islamic banks mostly work with the concessions — murabaha and ijara — rather than the ideal, musharaka and mudaraba, which is why their effect on the economy has stayed limited. He also criticises pegging murabaha profit to the prevailing interest rate: the transaction remains valid, but it resembles an interest-based one in form and does nothing for fair distribution.'
    ) },
    { type: 'p', text: L(
      'مثالٌ من السوق يوضح المقصود. في **نيسان ٢٠٢٦** نُشر إعلانٌ عن عروض تمويلٍ عقاريّ لبنكٍ إسلاميّ سعوديّ: جدول نِسبٍ تكبر مع المدّة، **٢٫٨٩٪ لخمس سنوات** ثم تزيد قليلاً كلّ سنة حتى **٢٫٩٩٪ لعشر**. والإعلان لا يذكر نوع العقد ولا طريقة حساب النسبة. إن كان العقد بيعاً مؤجَّلاً، كما في المرابحة، فهذا التسعير جائزٌ عند المجمع: للبائع أن يجعل الثمن المؤجَّل أعلى من الحالّ وأن يفاوت بين الآجال، ما دام الثمن يُحسم عند العقد ولا يزيد بعده. لكنّ القارئ يرى أن طريقة العرض هي طريقة القرض نفسها: نسبةٌ تكبر كلّما طال الأجل. **وهذا هو الشبه في الشكل الذي قصده العثماني.**',
      'An example from the market makes the point. In **April 2026** an advertisement appeared for a Saudi Islamic bank’s home-financing offers: a table of rates rising with the term, **2.89% for five years**, edging up each year to **2.99% for ten**. It names neither the type of contract nor how the rate is calculated. If the contract is a deferred sale, as in murabaha, the Academy permits such pricing: a seller may set a deferred price above the cash price and vary it by term, provided the price is fixed at the contract and does not rise afterwards. But a reader sees that the presentation is a loan’s: a rate that grows the longer the term. **That is the resemblance in form Usmani meant.**'
    ) },
    { type: 'p', text: L(
      'وأرقام السوق تؤكّد غلبة المرابحة التي ذكرها العثماني. في السعودية، في الربع الثالث من ٢٠٢٥، شكّلت المرابحة والتورّق معاً نحو **٩٠٪** من التمويل المتوافق مع الشريعة. أمّا المشاركة والمضاربة معاً فأقلّ من **٠٫٢٪**.',
      'The market figures confirm the dominance of murabaha that Usmani described. In Saudi Arabia in the third quarter of 2025, murabaha and tawarruq together made up about **90%** of Shariah-compliant financing. Musharaka and mudaraba together were under **0.2%**.'
    ) },
    { type: 'figure', id: 'tdSaudiContracts' },
    { type: 'p', text: L('والدراسات تقول شيئاً قريباً:', 'And the studies say something similar:') },
    { type: 'ul', items: [
      L('دراسةٌ شملت بنوك **٢٢ بلداً** وجدت فروقاً قليلة في نموذج العمل: البنوك الإسلامية أقلّ كفاءةً في التكلفة، لكنّ رأس مالها أعلى وجودة أصولها أفضل.', 'A study of banks in **22 countries** found few differences in business model: Islamic banks are less cost-efficient, but better capitalised, with better asset quality.'),
      L('ورقةٌ لصندوق النقد الدولي: في أزمة **٢٠٠٨** خفّف نموذج البنوك الإسلامية الضربة على أرباحها، وفي **٢٠٠٩** تراجعت أرباحها أكثر من البنوك التقليدية لضعف إدارة المخاطر عند بعضها.', 'An IMF paper: in the **2008** crisis the Islamic banks’ model softened the blow to their profits, and in **2009** their profits fell further than conventional banks’, owing to weaker risk management at some.'),
      L('مجلس الخدمات المالية الإسلامية: بلغت أصول الصناعة نحو **٤٫٤ تريليون دولار** سنة ٢٠٢٥، وتقريره لسنة ٢٠٢٦ يحذّر من أن منتجاتٍ وميزانياتٍ جديدة «تحاكي» البنوك التقليدية.', 'The Islamic Financial Services Board: industry assets reached about **$4.4 trillion** in 2025, and its 2026 report warns that new products and balance sheets “mimic” conventional banks.'),
      L('محمود الجمل، في كتابٍ أكاديميّ نقدي: الصناعة تعيد إنتاج المنتجات التقليدية بعقودٍ قديمة، والأفضل أن تركّز على الجوهر، كالبنوك المجتمعية والتمويل الصغير.', 'Mahmoud El-Gamal, in a critical academic book: the industry reproduces conventional products with old contracts, and would do better to focus on substance, such as community banking and microfinance.'),
    ] },
    { type: 'callout', variant: 'key', title: L('أربعة أسئلة تميّز المرابحة من قرضٍ متنكّر', 'Four questions that tell a murabaha from a disguised loan'), text: L(
      '**١.** هل توجد سلعةٌ حقيقية تُشترى، أم أن المطلوب سيولةٌ فقط؟ **٢.** هل اشترى البنك السلعة وملكها وتحمّل مخاطرتها قبل أن يبيعها لي؟ **٣.** هل الثمن محدّدٌ من البداية، ولا يزيد إن تأخّرت؟ **٤.** إن وُجد مبلغٌ على التأخير، فهل يذهب إلى وجوه الخير أم إلى أرباح البنك؟ — مأخوذة من شروط المرابحة وأخطائها الشائعة عند العثماني، ومن قرار المجمع ومعيار هيئة المحاسبة.',
      '**1.** Is there a real good being bought, or is the need just cash? **2.** Did the bank buy the good, own it and carry its risk before selling it to me? **3.** Is the price fixed from the start, and does it stay put if I am late? **4.** If there is a charge for lateness, does it go to charity or to the bank’s profit? — Drawn from Usmani’s conditions for murabaha and its common faults, the Academy’s ruling, and the AAOIFI standard.'
    ) },
    { type: 'sources', title: L('مصادر هذا القسم', 'Sources for this section'), items: [
      { label: L('أحمد وإقبال وخان، «قضايا تواجه البنوك الإسلامية»', 'Ahmed, Iqbal & Khan, “Issues Faced by Islamic Banks”'), publisher: L('إسلاميك ماركتس', 'IslamicMarkets'), url: 'https://islamicmarkets.com/education/issues-faced-by-islamic-banks' },
      { label: L('مجمع الفقه الدولي، قرار ١٧٩ (٥/١٩) بشأن التورّق، ٢٠٠٩', 'IIFA Resolution 179 (19/5) on tawarruq, 2009'), publisher: L('مجمع الفقه الإسلامي الدولي', 'International Islamic Fiqh Academy'), url: 'https://iifa-aifi.org/en/32987.html' },
      { label: L('«فقهاء يطالبون بإلغاء التورّق» (٢٠٠٩)', '“Jurists call for tawarruq to be abolished” (2009)'), publisher: L('الجزيرة نت', 'Al Jazeera'), url: 'https://www.aljazeera.net/ebusiness/2009/11/19/%d9%81%d9%82%d9%87%d8%a7%d8%a1-%d9%8a%d8%b7%d8%a7%d9%84%d8%a8%d9%88%d9%86-%d8%a8%d8%a5%d9%84%d8%ba%d8%a7%d8%a1-%d8%a7%d9%84%d8%aa%d9%88%d8%b1%d9%82' },
      { label: L('هيئة المحاسبة والمراجعة، المعيار الشرعي ٣: المدين المماطل', 'AAOIFI Shari’ah Standard No. 3: the procrastinating debtor'), publisher: L('إسلاميك ماركتس', 'IslamicMarkets'), url: 'https://islamicmarkets.com/publications/procrastinating-debtor-scope-of-the-standard' },
      { label: L('«عقود التمويل الإسلامي ترتفع ١٣٪ إلى ٢٫٧ تريليون ريال في الربع الثالث ٢٠٢٥» — بيانات ساما', '“Islamic finance contracts rise 13% to SAR 2.70T in Q3 2025: SAMA”'), publisher: L('أرقام', 'Argaam'), url: 'https://www.argaam.com/en/article/articledetail/id/1871736' },
      { label: L('بيك وديميرغوتش-كونت وميروش، «البنوك الإسلامية والتقليدية» (٢٠١٣)', 'Beck, Demirgüç-Kunt & Merrouche, “Islamic vs. conventional banking” (2013)'), publisher: L('مجلّة البنوك والتمويل', 'Journal of Banking & Finance'), url: 'https://doi.org/10.1016/j.jbankfin.2012.09.016' },
      { label: L('حسن ودريدي، «آثار الأزمة العالمية على البنوك الإسلامية والتقليدية» (٢٠١٠)', 'Hasan & Dridi, “The Effects of the Global Crisis on Islamic and Conventional Banks” (2010)'), publisher: L('صندوق النقد الدولي', 'IMF'), url: 'https://www.imf.org/external/pubs/cat/longres.aspx?sk=24183' },
      { label: L('مجلس الخدمات المالية الإسلامية، تقرير الاستقرار ٢٠٢٦', 'IFSB, Islamic Financial Stability Report 2026'), publisher: L('مجلس الخدمات المالية الإسلامية', 'IFSB'), url: 'https://www.ifsb.org/press-releases/ifsb-releases-islamic-financial-stability-report-2026-highlighting-emerging-hybrid-risks-in-islamic-banking/' },
      { label: L('الجمل، «التمويل الإسلامي: القانون والاقتصاد والممارسة» (٢٠٠٦)', 'El-Gamal, Islamic Finance: Law, Economics, and Practice (2006)'), publisher: L('مطبعة جامعة كامبريدج', 'Cambridge University Press'), url: 'https://www.cambridge.org/core/books/islamic-finance/FD60F9CB788309C36E2C4A1DD113701A' },
      { label: L('بدايات البنوك الإسلامية: ميت غمر ١٩٦٣ وبنك دبي الإسلامي ١٩٧٥', 'Origins of Islamic banking: Mit Ghamr 1963, Dubai Islamic Bank 1975'), publisher: L('جامعة ميلانو-بيكوكا', 'University of Milano-Bicocca'), url: 'https://www.lawpluralism.unimib.it/en/focus/origins-and-models-of-islamic-banking' },
    ] },
  ],
}

/* ---------------------------------------------------------------- 4 */
const moneyState = {
  id: 'money-state',
  title: L('٤ · المال والدولة والسندات', '4 · Money, the state and bonds'),
  blocks: [
    { type: 'p', text: L(
      'ترك القسم الأوّل سؤالاً معلّقاً: من أين يأتي المال الذي يُقرَض؟ وجوابه يفتح أسئلةً أخرى: لماذا تقترض الدول بالسندات، ولماذا يعدّها الكاتب شرّاً لا بدّ منه، ولماذا لا تُقرض الدولة الناس مباشرةً بدل أن يتوسّط المصرفي، وما موقف الفقه من ذلك كلّه. يسير هذا القسم على الأسئلة بالترتيب: جواب الكتاب أوّلاً، ثم النظرة الرأسمالية السائدة، ثم النظرة الإسلامية.',
      'Section one left a question hanging: where does the money that is lent come from? The answer opens others: why states borrow through bonds, why the author calls them a necessary evil, why the state doesn’t lend to people directly instead of through bankers, and what jurisprudence makes of it all. This section takes them in order: the book’s answer first, then the mainstream capitalist view, then the Islamic view.'
    ) },

    { type: 'h', text: L('من أين يأتي المال؟', 'Where does money come from?') },
    { type: 'p', text: L(
      'للكتاب جوابان، تاريخيّ ومعاصر. **الجواب التاريخي** في فصله الأوّل: نشأت النقود سجلّاً للدَّين. في بلاد ما بين النهرين كان العامل يأخذ أجره صَدَفةً نُقش عليها مقدار القمح الذي يدين له به الحاكم — فالصَّدَفة دَينٌ على الحاكم، وهي في الوقت نفسه نقدٌ يشتري به العامل من غيره. ولا تعمل إلا إذا وثق الناس بأن سلطةً قويةً تضمنها، ومن هذه الثقة جاءت كلمة **الائتمان (Credit)**.',
      'The book has two answers, historical and modern. **The historical answer**, in its first chapter: money began as a record of debt. In Mesopotamia a worker was paid with a shell engraved with the grain the ruler owed him — a debt on the ruler, and at the same time money the worker could spend with others. It worked only if people trusted that a strong authority stood behind it, and that trust is where the word **credit** comes from.'
    ) },
    { type: 'p', text: L(
      '**والجواب المعاصر** في الفصل الرابع، «سحر الأعمال المصرفية الأسود». يظنّ أكثر الناس أن المصرفيّ وسيط: يأخذ ودائع المدّخرين ويُقرضها، ويربح الفرق بين الفائدتين. يقول الكتاب إن البنوك بدأت هكذا، لكنّ هذا ليس ما يشغلها اليوم. مثاله **مريم**، صاحبة ورشة دراجات، تطلب قرضاً بنصف مليون جنيه: المصرفيّ لا يأخذ المبلغ من ودائع عملاء آخرين، بل يكتب الرقم في حسابها، فيظهر مالٌ لم يكن موجوداً. يسمّي الكتاب ذلك خلق المال **«من العدم» (Out of thin air)**، ويصوّر القرض سفراً عبر الزمن: صاحب المشروع يسحب إلى الحاضر قيمةً تبادلية لم تُنتج بعد، والمصرفيّ وكيل هذا السفر. فإن أنتج المقترض تلك القيمة فعلاً سُدّد القرض، وإن لم يُنتجها وقعت الأزمة.',
      '**The modern answer** is in chapter four, “The Black Magic of Banking”. Most people think a banker is a go-between: he takes savers’ deposits, lends them on, and profits from the gap. The book says banking began that way, but that is not what keeps bankers busy today. Its example is **Miriam**, who runs a bicycle workshop and asks for a £500,000 loan: the banker does not take the sum from other customers’ deposits — he types the number into her account, and money appears that did not exist. The book calls this creating money **out of thin air**, and pictures a loan as time travel: the entrepreneur pulls into the present exchange value not yet produced, and the banker is the travel agent. If the borrower really produces that value the loan is repaid; if not, the crisis comes.'
    ) },
    { type: 'p', text: L(
      'وليس هذا رأي كاتبٍ ناقدٍ وحده. **بنك إنكلترا**، وهو البنك المركزي البريطاني، كتب سنة **٢٠١٤** أن البنوك لا تعمل مجرّد وسيطٍ يُقرض ما أودعه المدّخرون، وأنه كلّما منح بنكٌ قرضاً خلق في اللحظة نفسها وديعةً مقابلة. وبحسب أرقامه، **٩٧٪** من النقود المتداولة في بريطانيا ودائعُ مصرفية.',
      'And this is not only a critic’s view. **The Bank of England**, Britain’s central bank, wrote in **2014** that banks do not act as mere intermediaries lending out what savers deposited, and that whenever a bank makes a loan it creates a matching deposit at the same moment. By its figures, **97%** of the money in circulation in Britain is bank deposits.'
    ) },
    { type: 'p', text: L(
      'فالمال إذن نوعان. الأوّل **مال البنك المركزي (Central bank money)**: الأوراق النقدية، ومعها **الاحتياطيات (Reserves)** — أرصدة البنوك التجارية لدى البنك المركزي. والثاني **مال البنوك (Bank money)**: الأرقام في حساباتنا، وهي وعدٌ من البنك بأن يعطينا نقداً عند الطلب. النوع الأوّل تصدره الدولة عبر بنكها المركزي، والثاني تخلقه البنوك الخاصة حين تُقرض، ويفنى حين يُسدَّد القرض.',
      'So money is of two kinds. The first is **central bank money**: banknotes, together with **reserves** — commercial banks’ balances at the central bank. The second is **bank money**: the numbers in our accounts, which are a bank’s promise to give us cash on demand. The first is issued by the state through its central bank; the second is created by private banks when they lend, and vanishes when the loan is repaid.'
    ) },
    { type: 'figure', id: 'tdMoneyLayers' },
    { type: 'p', text: L(
      'ولخلق المال حدود: على البنك أن يجد مقترضين قادرين على السداد وأن يُقرض بربح، وعليه أن يلتزم بقواعد الرقابة. والبنك المركزي يحدّد سعر الفائدة الذي يجعل الاقتراض أرخص أو أغلى، وهذا السعر، بحسب بنك إنكلترا، هو القيد الأخير على خلق المال.',
      'Money creation has limits: a bank must find borrowers able to repay and lend at a profit, and must keep to the supervisory rules. And the central bank sets the interest rate that makes borrowing cheaper or dearer — which, according to the Bank of England, is the final constraint on money creation.'
    ) },
    { type: 'p', text: L(
      'وفي الفصل السابع يروي الكتاب قصّة معسكرٍ لأسرى الحرب العالمية الثانية صارت فيه السجائر نقوداً: وسيلة تبادل، ومقياساً للأسعار، ومخزوناً للقيمة. وحتى هناك ظهر الإقراض بفائدة: من ادّخر سجائر أقرضها بزيادة. كانت كمّية السجائر تتبع طرود الصليب الأحمر، وهو جهةٌ محايدة لا تعلم أنها تدير نقداً، فكان مال المعسكر «غير سياسيّ». أمّا في مجتمعات السوق فالمال أكثر بكثيرٍ من النقود المعدنية والورقية، لأن المصرفيين يخلقونه، وهو مرتبطٌ بالدَّين العام والضرائب وسلطة الدولة.',
      'In chapter seven the book tells of a Second World War prison camp where cigarettes became money: a medium of exchange, a measure of prices, a store of value. Even there lending at interest appeared: whoever saved cigarettes lent them for more. The quantity of cigarettes followed the Red Cross parcels — a neutral party that didn’t know it was running a currency — so the camp’s money was “apolitical”. In market societies money is far more than notes and coins, because bankers create it, and it is bound up with public debt, taxes and the power of the state.'
    ) },

    { type: 'h', text: L('لماذا يحتاج المصرفي إلى الدولة؟', 'Why does the banker need the state?') },
    { type: 'p', text: L(
      'قدرةٌ كهذه مغرية. كلّما أقرض المصرفيون أكثر ربحوا أكثر، ثم وجدوا طريقةً لإبعاد الخطر عن أنفسهم: يقطّعون القرض حصصاً صغيرة ويبيعونها لمستثمرين. وفي سنوات الرخاء يبدو كلّ شيءٍ مستقرّاً فيزيدون. ثم يأتي يومٌ تكبر فيه القروض حتى لا تكفي الأرباح لسدادها. يعجز بعض المقترضين، فيخاف المودعون ويطلبون أموالهم دفعةً واحدة، والبنك لا يملك منها نقداً إلا جزءاً صغيراً. عندها يدور ما يسمّيه الكتاب **إعادة التدوير (Recycling)** في الاتجاه المعاكس — وإعادة التدوير هي أن يُنفق العمّال أجورهم في المتاجر، وأن يُنفق أصحاب الأعمال إيراداتهم على الأجور. فإذا انعكست: أُغلقت شركات، فسُرّح عمّال، فنقص الإنفاق، فأُغلقت شركاتٌ أخرى. والخلاصة عند الكتاب أنّ العملية التي تولّد الربح والثروة هي نفسها التي تولّد الانهيار.',
      'Such a power is tempting. The more bankers lend the more they earn, and they find ways to push the risk off themselves: they cut a loan into small pieces and sell them to investors. In good years everything looks stable, so they lend more. Then one day the loans have grown too big for profits to repay. Some borrowers fail, depositors take fright and want their money at once, and the bank holds only a small part of it in cash. That is when what the book calls **recycling** runs in reverse — recycling being workers spending their wages in shops and businesses spending their takings on wages. Reversed: firms close, workers are laid off, spending falls, more firms close. The book’s conclusion: the process that generates profit and wealth is the same one that generates the crash.'
    ) },
    { type: 'p', text: L(
      'ومن يوقف الانهيار؟ الدولة وحدها. بنكها المركزي يخلق مالاً جديداً، من العدم أيضاً، ويُقرضه للبنوك المتعثّرة. هذا دور **المُقرض الأخير (Lender of last resort)** — وتسمّيه الترجمة «ملجأ أخير للإقراض» — أي الجهة التي يُلجأ إليها حين لا يبقى غيرها. والحكومات تضمن كذلك مدّخرات الناس، إلى حدٍّ معيّن، حتى لا يتهافتوا على سحبها. ويذكّر الكتاب بأنّ دور الدولة هذا ليس جديداً تماماً، فأصداف بلاد ما بين النهرين كانت السلطة تصدرها أيضاً. الجديد أنّ مصرفيّي القطاع الخاص صاروا يملكون الامتياز نفسه.',
      'Who stops the crash? Only the state. Its central bank creates new money, out of thin air too, and lends it to the struggling banks. That is the role of the **lender of last resort** — the translation calls it «ملجأ أخير للإقراض» — the party of last appeal when no one else is left. And governments guarantee people’s savings, up to a limit, so that they don’t rush to withdraw them. The book reminds us this role is not entirely new: Mesopotamia’s shells were issued by the authorities too. What is new is that private bankers came to hold the same privilege.'
    ) },
    { type: 'p', text: L(
      'من هنا العلاقة التي يصفها الكتاب بأنها «علاقة مسمومة». المصرفيون يحتاجون إلى الحكومات لتحميهم، والحكومات تحتاج إلى المصرفيين ليغذّوا الاقتصاد. في الرخاء يهاجم الأقوياء الدولة ويطالبون بأن تتركهم وشأنهم، وفي الأزمة يرفعون سمّاعة الهاتف ويطالبون بالإنقاذ. والسياسيون الذين يُفترض أن يضبطوا المصرفيين يُنتخبون بتبرّعاتهم، ومن يراقبونهم قد يعملون عندهم بعد ترك الوظيفة الحكومية، فتبقى الرقابة ضعيفة. وينتهي الكتاب إلى مفارقة: يمكن الحدّ من الاضطراب الذي يسبّبه المصرفيون، ولا يمكن إزالته، لأن الاقتصاد يتغذّى على ما يقدّمونه، أي الدَّين.',
      'Hence the relationship the book calls “toxic”. Bankers need governments to protect them, and governments need bankers to fuel the economy. In good times the powerful attack the state and demand to be left alone; in a crisis they pick up the phone and demand a rescue. The politicians meant to rein in the bankers are elected with their donations, and the people who supervise them may go to work for them after leaving government, so supervision stays weak. The book ends on a paradox: the turmoil bankers cause can be reduced but never removed, because the economy feeds on what they supply — debt.'
    ) },

    { type: 'h', text: L('لماذا توجد السندات الحكومية؟', 'Why do government bonds exist?') },
    { type: 'p', text: L(
      '**السند الحكومي (Government bond)** ورقة دَين. مثال الكتاب: تقترض الحكومة مئة مليون من مصرفيّ لعشر سنوات، وتعطيه ورقةً تتعهّد فيها بردّ المبلغ بعد عشر سنوات وبدفع خمسة ملايين كلّ سنةٍ فائدة. هذه الورقة هي السند، والحكومة ملتزمةٌ بها لمن يملكها، أيّاً كان. وتسمّى السندات القصيرة الأجل **أذون الخزانة (Treasury bills)**. ومجموع ما على الدولة من هذه الديون هو **الدَّين العام (Public debt)**.',
      'A **government bond** is a paper of debt. The book’s example: the government borrows a hundred million from a banker for ten years and gives him a paper promising to repay in ten years and to pay five million a year in interest. That paper is the bond, and the government is bound to whoever holds it. Short-dated bonds are called **Treasury bills**. And the sum of all such debts the state owes is **public debt**.'
    ) },
    { type: 'p', text: L(
      'التفسير المدرسيّ بسيط: تقترض الدولة حين تزيد نفقاتها على ضرائبها — في الحروب والطوارئ، ولبناء الطرق والمدارس، ولإنعاش الاقتصاد في الركود. وبدل أن ترفع الضرائب دفعةً واحدة توزّع الكلفة على سنوات. والحرب أوضح مثال: في تقرير صندوق النقد الدولي لربيع **٢٠٢٦** أن موجات الإنفاق العسكري، في بيانات ١٦٤ بلداً منذ ١٩٤٦، مُوّل نحو ثلثي زيادتها بالعجز، وأنّ الدَّين العام يرتفع معها بنحو سبع نقاطٍ من الناتج في ثلاث سنوات.',
      'The textbook explanation is simple: a state borrows when its spending exceeds its taxes — in wars and emergencies, to build roads and schools, and to revive the economy in a slump. Instead of raising taxes all at once it spreads the cost over years. War is the clearest case: the IMF’s spring **2026** outlook found that across 164 countries since 1946, about two-thirds of the increase in military spending surges was financed by deficits, with public debt rising about seven points of GDP over three years.'
    ) },
    { type: 'p', text: L(
      'ويضيف فاروفاكيس سببين لا يقف عندهما التفسير المدرسيّ. **الأوّل سياسيّ.** الدولة، كما يقول، تزوّد الأثرياء «ببوليصة تأمينٍ رائعة»: عنفها هو الذي أنشأ الملكيات الخاصة وحماها، وهي التي تبني الطرق والمدارس والمستشفيات وتحفظ الأمن. لكنّ الأثرياء يفعلون ما في وسعهم للتهرّب من أقساط هذا التأمين، أي الضرائب، ونفوذهم يجعل المطلوب منهم دائماً أقلّ ممّا تنفقه الدولة لأجلهم. وأجور العمّال أقلّ من أن تسدّ الفرق. فمن أين يأتي الباقي؟ من الدَّين العام. ومن يُقرض الحكومة؟ المصرفيون، وبمالٍ يخلقونه من العدم كما خلقوا قرض مريم. فهم، في تعبير الكتاب، يستفيدون مرّتين من انخفاض ضرائبهم.',
      'Varoufakis adds two reasons the textbook doesn’t reach. **The first is political.** The state, he says, gives the rich “a magnificent insurance policy”: its violence created private property and protects it, and it builds the roads, schools and hospitals and keeps order. But the rich do all they can to dodge the premiums — taxes — and their influence keeps what is asked of them below what the state spends on their behalf. Workers’ wages are too low to close the gap. So where does the rest come from? Public debt. And who lends to the government? The bankers — with money they create from nothing, as they created Miriam’s loan. In the book’s words, they gain twice from their low taxes.'
    ) },
    { type: 'p', text: L(
      '**والثاني مصرفيّ، وهو الأهمّ.** البنوك نفسها تحتاج إلى السندات. المصرفيّ يكره النقد الراكد الذي لا يدرّ فائدة، لكنه يحتاج إلى شيءٍ يبيعه في لحظةٍ إن طلب المودعون أموالهم. والسند الحكوميّ يجمع الأمرين: فائدته آمنة، ويُقبل **ضماناً (Collateral)** حين يقترض المصرفيّ من بنوكٍ أخرى، ويُباع فوراً. لذلك تسمّى السندات بلغة المصرفيين «أكثر الأصول سيولة»، و**السيولة (Liquidity)** سهولة تحويل الأصل إلى نقد. والبنوك المركزية نفسها تقبل السندات ضماناً حين تُقرض البنوك. ويستشهد الكتاب بسنغافورة: قانونها يمنع الحكومة من أن تنفق أكثر من ضرائبها، وهي مع ذلك تقترض، لأنّ مصرفيّي مجتمع السوق يحتاجون إلى الدَّين العام حاجة السمك إلى الماء.',
      '**The second is about banking, and matters more.** Banks themselves need bonds. A banker hates idle cash that earns nothing, yet needs something he can sell in a moment if depositors want their money. A government bond does both: its interest is safe, it is accepted as **collateral** when the banker borrows from other banks, and it can be sold at once. That is why bankers call bonds “the most liquid of assets” — **liquidity** being how easily an asset turns into cash. Central banks themselves accept bonds as collateral when they lend to banks. The book cites Singapore: its law forbids the government to spend more than its taxes, and yet it borrows, because a market society’s bankers need public debt as fish need water.'
    ) },
    { type: 'p', text: L(
      'وفي الأزمة يتّضح الارتباط أكثر. حين تنقذ الدولة البنوك لا تكتفي بخلق مالٍ جديد، بل تصدر سنداتٍ إضافية وتقترض بها من مصرفيين آخرين، أجانب في الغالب، لتمرّر المال إلى المصرفيين المحلّيين. ثم يأتي **التيسير الكمّي (Quantitative easing)**: يشتري البنك المركزي نفسه سنداتٍ من السوق بمالٍ يخلقه لهذا الغرض.',
      'In a crisis the link is plainer still. When the state rescues the banks it doesn’t only create new money; it issues extra bonds and borrows with them from other bankers, usually foreign ones, to pass the money to the local bankers. Then comes **quantitative easing**: the central bank itself buys bonds in the market with money it creates for the purpose.'
    ) },
    { type: 'figure', id: 'tdBondCycle' },
    { type: 'p', text: L(
      'ويجمع الكتاب وظائف الدَّين العام في جملة: يدفع ثمن البنية التحتية التي يعتمد عليها الاقتصاد كلّه، ويقوّي إعادة التدوير حين تتباطأ، ويعطي المصرفيين القلقين أكثر أصولهم سيولة، وهو أشبه **بحزامٍ مطاطيّ** يتمدّد في الأوقات العصيبة فلا ينقطع النظام. والأرقام تُظهر أن الدَّين العام قاعدةٌ لا استثناء، وإن تفاوت حجمه كثيراً.',
      'The book sums up the functions of public debt in a sentence: it pays for the infrastructure the whole economy relies on, strengthens recycling when it slows, gives anxious bankers their most liquid asset, and works like **an elastic band** that stretches in bad times so the system doesn’t snap. And the figures show public debt is the rule, not the exception, however much its size varies.'
    ) },
    { type: 'figure', id: 'tdDebtGdp' },
    { type: 'p', text: L(
      'والدَّين في ازدياد. بحسب صندوق النقد يبلغ الدَّين العام في الاقتصادات المتقدّمة نحو **١٠٨٪** من ناتجها سنة ٢٠٢٦، وفي الاقتصادات الناشئة والنامية نحو **٧٧٪**؛ ويتوقّع الصندوق أن يصلا سنة **٢٠٣١** إلى ١١٥٪ و٨٦٪. وفي الولايات المتحدة يُتوقَّع أن يصعد من ١٢٤٪ سنة ٢٠٢٥ إلى ١٤٢٪ سنة ٢٠٣١.',
      'And the debt is growing. By the IMF’s figures, public debt in advanced economies is about **108%** of their output in 2026, and about **77%** in emerging and developing ones; the Fund expects them to reach 115% and 86% by **2031**. In the United States it is expected to climb from 124% in 2025 to 142% in 2031.'
    ) },

    { type: 'h4', text: L('لماذا يعدّه الكاتب شرّاً لا بدّ منه؟', 'Why does the author call it a necessary evil?') },
    { type: 'p', text: L(
      'عبارة «شرّ لا بدّ منه» ليست في الكتاب بلفظها، لكنها تلخّص موقفه. في الفصل الثالث يقول إنّ الدَّين لمجتمعات السوق كالجحيم للمسيحية: «مزعجٌ لكن لا غنى عنه». وفي الفصل الرابع يقول إنّ الدَّين العام «شبحٌ في آلة»: شيءٌ لا يُرى، تعمل به آلة مجتمع السوق، أحسنت العمل أم أساءت. هو **مزعجٌ** لأنه في نظر الكتاب مظهرٌ من مظاهر علاقات القوّة: جوابٌ عن رفض الأغنياء أن يدفعوا حصّتهم، ويربط الدولة بالمصرفيين في علاقتهما المسمومة، ويولّد حاجةً ملحّة إلى جباية الضرائب ولو لمجرّد مواصلة السداد. و**لا غنى عنه** للأسباب التي رأيناها: بلا سندات لا يجد المصرفيون أصلاً سائلاً يستندون إليه، ولا تجد الدولة ما تموّل به البنية التحتية والإنقاذ. ولذلك يحذّر الكتاب ممّن يتحدّثون عن الدَّين العام كأنه وباءٌ يجب استئصاله: كثيره صداع، وقليله مشكلة أيضاً.',
      'The phrase “necessary evil” is not in the book in those words, but it sums up his position. In chapter three he says debt is to market societies what hell is to Christianity: “unpleasant yet indispensable”. In chapter four he calls public debt a “ghost in the machine”: something unseen by which the machinery of market society runs, well or badly. It is **unpleasant** because, in the book’s view, it is an expression of power: an answer to the refusal of the rich to pay their share; it binds the state to the bankers in their toxic relationship; and it creates an urgent need to collect taxes, if only to keep paying it. It is **indispensable** for the reasons we saw: without bonds bankers have no liquid asset to lean on, and the state nothing to fund infrastructure and rescues with. So the book warns against those who talk of public debt as a plague to eradicate: too much is a headache, and too little is a problem too.'
    ) },
    { type: 'p', text: L(
      'ومع ذلك لا يدافع الكاتب عن المصرفيين. ما العمل حين يعجز مدينٌ عن السداد؟ جوابه أن **الديون غير القابلة للسداد (Unpayable debts)** يجب أن تُشطب، لا لأن ذلك أخلاقيّ بل لأنه عمليّ: من بقي مفلساً إلى الأبد لا يوظّف ولا يشتري ولا يتعافى. ولهذا غيّرت مجتمعات السوق قوانينها في القرن التاسع عشر، فظهرت **المسؤولية المحدودة (Limited liability)** التي تحمي بيت صاحب الشركة من دائنيها. وأعلى الأصوات اعتراضاً على الإعفاء أصوات المصرفيين، وهم أقلّ الناس تعرّضاً لخسارة ثرواتهم حين يقع الانهيار. وأسوأ العوالم في رأيه عالمٌ يُنقذ فيه المصرفيون ولا يُنقذ سائر المدينين، والحكومات منهم. ومثاله بلده اليونان: حكومةٌ تُعدّ معسرة ويُفرض عليها أن تتظاهر بالقدرة على السداد، ستجبي الضرائب بلا نهاية ولا تتعافى. والأرقام تؤيّد ما كتبه: سنة ٢٠١٣ كان الاقتصاد اليوناني أصغر ممّا كان سنة ٢٠٠٧ بنحو **٢٧٪**، وسنة ٢٠٢٥ ما زال أصغر بنحو **١٤٪**، والدَّين العام نحو ١٤٦٪ من الناتج — وكان في الطريق هبوطٌ ثانٍ سنة ٢٠٢٠ بسبب جائحة كورونا.',
      'Even so, the author does not defend the bankers. What to do when a debtor cannot pay? His answer is that **unpayable debts** must be written off — not because it is moral but because it is practical: someone bankrupt for ever never hires, buys or recovers. That is why market societies changed their laws in the nineteenth century and created **limited liability**, which protects a company owner’s home from its creditors. The loudest objections to debt relief come from bankers, the people least exposed to losing their fortunes when the crash comes. The worst of all worlds, in his view, is one where bankers are rescued and other debtors — governments among them — are not. His example is his own country, Greece: a government held to be insolvent and made to pretend it can pay will tax without end and never recover. The figures bear him out: in 2013 the Greek economy was about **27%** smaller than in 2007, in 2025 still about **14%** smaller, with public debt around 146% of GDP — and a second fall along the way in 2020, from the Covid pandemic.'
    ) },

    { type: 'h4', text: L('لماذا لا تُقرض الدولة الناس مباشرة؟ ولماذا الوسيط؟', 'Why doesn’t the state lend to people directly? Why the middleman?') },
    { type: 'p', text: L('للسؤال أربعة أجوبة، كلٌّ منها يكشف جانباً.', 'There are four answers, each showing one side of it.') },
    { type: 'p', text: L(
      '**الجواب التاريخي.** في رواية الكتاب لم تُعيّن الدولةُ المصرفيَّ وسيطاً، بل وجدته قائماً. أصحاب المشاريع بعد الانقلاب الكبير احتاجوا إلى قروضٍ أكبر ممّا يُقرضه الأهل والأصدقاء، ولمّا لم يعد أخذ الفائدة خطيئةً وسُمح لهم بفرضها بحرّية اكتسبوا قدرتهم على خلق المال. ثم جاءت الدولة، منذ القرن التاسع عشر وبضغطٍ من أقوى مواطنيها، لتقف وراءهم حين يتعثّرون.',
      '**The historical answer.** In the book’s telling, the state did not appoint the banker as middleman; it found him already there. Entrepreneurs after the Great Reversal needed loans bigger than family and friends could make, and once taking interest was no longer a sin and they were free to charge it, bankers acquired the power to create money. Then the state came along, from the nineteenth century, under pressure from its most powerful citizens, to stand behind them when they stumbled.'
    ) },
    { type: 'p', text: L(
      '**الجواب العمليّ.** تقول كتب الاقتصاد إن البنوك تجمع مدّخراتٍ صغيرة قصيرة الأجل وتحوّلها إلى قروضٍ كبيرة طويلة الأجل. والإقراض ليس توزيع مالٍ فحسب، بل اختيار: لا بدّ ممّن يقرّر من يستحقّ القرض، ويتابعه، ويتحمّل خسارته إن لم يُسدّد. وحتى حين تريد الدولة أن تُقرض فإنها تمرّ غالباً عبر البنوك. مثالٌ من ألمانيا: بنك التنمية الحكوميّ **KfW** لا فروع له ولا يأخذ ودائع، ويموّل نفسه من أسواق المال، وقد جمع منها نحو ٧٨ مليار يورو سنة ٢٠٢٤؛ ومن يريد قرضاً مدعوماً منه يطلبه عبر بنكه العادي، فالبنك هو الذي يدرس الطلب ويوقّع العقد ويتحمّل خطر عدم السداد كلّه أو بعضه.',
      '**The practical answer.** Economics textbooks say banks gather small short-term savings and turn them into large long-term loans. And lending is not just handing out money but choosing: someone must decide who deserves a loan, follow it up, and bear the loss if it isn’t repaid. Even when a state wants to lend, it usually goes through the banks. An example from Germany: the state development bank **KfW** has no branches and takes no deposits, funding itself on the capital markets — about €78 billion raised in 2024; whoever wants one of its subsidised loans applies through their ordinary bank, which assesses the application, signs the contract and bears all or part of the risk of default.'
    ) },
    { type: 'p', text: L(
      'وتُقرض الدولة الناس مباشرةً أحياناً، حين يكون الهدف اجتماعياً لا ربحياً. مثالٌ ألمانيٌّ آخر هو مساعدة الطلاب **BAföG**: نصفها منحة ونصفها قرضٌ من الدولة بلا فائدة، ولا يُطلب من الطالب أن يردّ أكثر من ١٠٬٠١٠ يورو. ومثالٌ ثالث، من تونس، يبيّن أنّ الدولة قد تريد قرضاً بلا فائدة ثم تمرّ بالبنوك أيضاً: قانونٌ صدر سنة ٢٠٢٤ ألزم البنوك بأن تخصّص ٨٪ على الأقلّ من أرباحها السنوية لقروضٍ صغيرة «على الشرف»، بلا فائدة وبلا ضمانات. وحدّد أمرٌ صدر في تموز ٢٠٢٦ سقوفها: ٥٬٠٠٠ دينار للفرد، و١٠٬٠٠٠ لصاحب المشروع الصغير، و٢٥٬٠٠٠ للمؤسّسة الصغرى أو المتوسّطة وللشركة الأهلية. وبدأ تلقّي الطلبات في أوّل تشرين الأول ٢٠٢٦ عبر منصّةٍ رقمية لكلّ بنك، والبنك هو الذي يدرس الملفّ ويقرّر. **فالدولة هنا لم تُقرض، بل أمرت الوسيط بأن يُقرض من ربحه.**',
      'Sometimes the state does lend directly, when the purpose is social rather than profit. Another German example is student support, **BAföG**: half grant and half interest-free state loan, with no student asked to repay more than €10,010. A third, from Tunisia, shows a state that wants interest-free loans and still goes through the banks: a 2024 law obliged banks to set aside at least 8% of their annual profits for small loans “on honour”, interest-free and unsecured. An order of July 2026 set their ceilings: 5,000 dinars for an individual, 10,000 for a small-business owner, 25,000 for a small or medium enterprise or a community company. Applications opened on 1 October 2026 through a digital platform at each bank, and it is the bank that studies the file and decides. **Here the state did not lend; it ordered the middleman to lend out of its profit.**'
    ) },
    { type: 'p', text: L(
      '**الجواب القانونيّ.** في منطقة اليورو تمنع المادّة ١٢٣ من معاهدة عمل الاتحاد الأوروبي البنك المركزي من إقراض الحكومات أو شراء سنداتها مباشرةً عند إصدارها، ويسمّى ذلك حظر **التمويل النقدي (Monetary financing)**. والحجّة أن الحكومة لو استطاعت أن تموّل إنفاقها من البنك المركزي لضاع الانضباط المالي وارتفعت الأسعار، وتجربة التضخّم الجامح في ألمانيا حاضرةٌ في الأذهان. فعلى الحكومة أن تموّل نفسها بالضرائب أو بالاقتراض من السوق، ويبقى للبنك المركزي أن يشتري السندات لاحقاً من السوق الثانوية بشروط.',
      '**The legal answer.** In the euro area, Article 123 of the Treaty on the Functioning of the EU forbids the central bank to lend to governments or to buy their bonds directly at issue — the ban on **monetary financing**. The argument is that if a government could fund its spending from the central bank, fiscal discipline would go and prices would rise; Germany’s experience of runaway inflation is very much in mind. So the government must fund itself by taxing or by borrowing in the market, while the central bank may later buy bonds on the secondary market, under conditions.'
    ) },
    { type: 'p', text: L(
      '**جواب فاروفاكيس.** جوابه سياسيّ، وهو في الفصل السابع. أمام دولةٍ لا يدفع أغنياؤها ما يكفي من الضرائب طريقان: أن تقترض فيكبر الدَّين العام، أو أن تأمر بنكها المركزي بخلق مزيدٍ من النقود لتشتري ما يحتاج إليه المجتمع. والطريق الثاني أقرب إلى أن تموّل الدولة نفسها مباشرة. لكنّ الطبقات الميسورة تقاومه دائماً، كما كره أسرى المعسكر الذين كدّسوا السجائر وصول سجائر جديدة لأنّ النقد الجديد ينقص القوّة الشرائية لما جمعوه. ولذلك، يقول الكتاب، قاد الأثرياء حملةً لـ«إلغاء تسييس» البنوك المركزية وجعلها مستقلّة عن الحكومات، فلا يستطيع السياسي أن يأمرها بزيادة **العرض النقدي (Money supply)**. والنتيجة عند الكتاب ليست جهةً محايدةً كالصليب الأحمر، بل بنكٌ مركزيّ قراراته سياسية كما كانت، غير أنها خرجت من رقابة البرلمان وصارت أقرب إلى نفوذ الأقلّية القوية والمصرفيين.',
      '**Varoufakis’s answer.** His answer is political, in chapter seven. A state whose rich don’t pay enough tax has two roads: borrow, so public debt grows; or tell its central bank to create more money to buy what society needs. The second road is closer to the state funding itself directly. But the well-off always resist it — just as the camp’s prisoners who hoarded cigarettes hated new cigarettes arriving, since new money cuts the buying power of what they had piled up. That is why, the book says, the rich led a campaign to “depoliticise” central banks and make them independent of governments, so no politician can order them to increase **the money supply**. The result, for the book, is not a neutral party like the Red Cross but a central bank whose decisions are as political as ever, only now beyond Parliament’s oversight and closer to the sway of a powerful few and the bankers.'
    ) },
    { type: 'p', text: L(
      'ولهذا يقول إنّ الاعتقاد بأنّ المال يمكن أن يُفصل عن الدولة وعن السياسة «وهمٌ خطير»، وعنوان الفصل «الوهم الخطير للمال غير السياسي». ويضرب له مثلين: معيار الذهب قبل أزمة ١٩٢٩، والبيتكوين بعد أزمة ٢٠٠٨. كلاهما يثبّت كمّية المال، فيدفع إلى **الانكماش (Deflation)** ويمنع الدولة من التدخّل السريع حين يقع الانهيار. فالسؤال عنده ليس هل تتحكّم السياسة في المال، بل لمصلحة من يتحكّم فيه: الأكثرية أم الأقلّية. والحلّ الذي يقترحه **«إضفاء طابعٍ ديمقراطي» على النقود: صوتٌ واحد لكلّ شخص.**',
      'That is why he calls the belief that money can be separated from the state and from politics “a dangerous fantasy” — the chapter is titled “The Dangerous Fantasy of Apolitical Money”. He gives two examples: the Gold Standard before the 1929 crash, and Bitcoin after the 2008 one. Both fix the quantity of money, pushing towards **deflation** and stopping the state from intervening fast when the crash comes. So the question for him is not whether politics controls money, but in whose interest: the many or the few. And his remedy is **to “democratise” money: one person, one vote.**'
    ) },
    { type: 'p', text: L(
      'وحاصل هذه الأجوبة الثلاثة مفارقة: مال الدولة يُخلق في البنك المركزي، لكنه لا يصل إلى الناس ولا إلى الحكومة نفسها إلّا مروراً بالبنوك الخاصة، التي تأخذ فائدةً في الطريق.',
      'And these answers add up to a paradox: the state’s money is created at the central bank, yet it reaches neither the people nor the government itself except by passing through the private banks, which take interest on the way.'
    ) },

    { type: 'h4', text: L('النظرة الرأسمالية إلى اقتراض الحكومة', 'The capitalist view of government borrowing') },
    { type: 'p', text: L(
      'في الاقتصاد الرأسمالي السائد لا خلاف على المبدأ: السند الحكومي أداةٌ عادية، والفائدة ثمنها. الخلاف على المقدار والتوقيت. أتباع **كينز (John Maynard Keynes)** يرون أنّ على الدولة أن تقترض وتنفق في الركود لتعوّض ضعف الطلب الخاص. ومعارضوهم يخشون التضخّم إذا زاد الإنفاق على ما يستطيع الاقتصاد إنتاجه، ويخشون تراكم دَينٍ يصعب حمله. ومن هذا الخلاف وُلدت قواعد مثل **كابح الديون (Schuldenbremse)** في الدستور الألماني: منذ إصلاح ٢٠٠٩ لا يجوز للحكومة الاتحادية أن تقترض، خارج تقلّبات الدورة الاقتصادية، أكثر من ٠٫٣٥٪ من الناتج في السنة. وفي آذار ٢٠٢٥ عُدّل الدستور لاستثناء نفقات الدفاع التي تتجاوز ١٪ من الناتج، ولإنشاء صندوقٍ خاص بقيمة ٥٠٠ مليار يورو للبنية التحتية والحياد المناخي.',
      'In mainstream capitalist economics there is no dispute about the principle: the government bond is an ordinary instrument and interest is its price. The dispute is over size and timing. Followers of **John Maynard Keynes** say the state should borrow and spend in a slump to make up for weak private demand. Their opponents fear inflation if spending outruns what the economy can produce, and fear a pile of debt too heavy to carry. From that dispute came rules like the **debt brake (Schuldenbremse)** in Germany’s constitution: since the 2009 reform the federal government may not borrow, outside the swings of the business cycle, more than 0.35% of GDP a year. In March 2025 the constitution was amended to exempt defence spending above 1% of GDP and to create a €500 billion special fund for infrastructure and climate neutrality.'
    ) },
    { type: 'p', text: L(
      'فالدَّين العام بفائدة، في النظرة الرأسمالية، مسألة إدارة: كم نقترض، ومتى، وبأيّ سعر. وفاروفاكيس، وهو ناقدٌ لهذا النظام، يغيّر السؤال إلى: من يُقرض، ولمصلحة من. يريد إنقاذ البنوك لا المصرفيين، وشطب ما لا يُسدَّد، وإضفاء طابعٍ ديمقراطي على القرار النقدي. لكنه يعامل رفع تحريم الفائدة واقعةً تاريخية احتاج إليها مجتمع السوق، ولا يسأل هل تجوز الفائدة أصلاً. هذا السؤال يطرحه الفقه.',
      'So for the capitalist view, interest-bearing public debt is a question of management: how much to borrow, when, at what price. Varoufakis, a critic of the system, changes the question to: who lends, and for whose benefit. He wants to rescue the banks, not the bankers; to write off what cannot be paid; and to democratise monetary decisions. But he treats the lifting of the ban on interest as a historical fact market society needed, and never asks whether interest is permissible at all. That question jurisprudence asks.'
    ) },

    { type: 'h4', text: L('النظرة الإسلامية: حكم السندات', 'The Islamic view: the ruling on bonds') },
    { type: 'p', text: L(
      'حكم السند في الفقه مبنيٌّ على تعريف الربا الذي رأيناه في القسم الثاني. السند قرض، والفائدة عليه زيادةٌ مشروطة على القرض، ولا فرق بين أن يكون المقترض فرداً أو شركةً أو دولة. هذا ما قرّره **مجمع الفقه الإسلامي الدولي سنة ١٩٩٠**: السندات التي تتعهّد بردّ قيمتها مع فائدةٍ منسوبة إليها محرّمة، إصداراً وشراءً وتداولاً، سواء أصدرتها جهةٌ خاصة أو جهةٌ تابعة للدولة. ولا أثر لتسميتها شهاداتٍ أو أوراقاً استثمارية أو ادّخارية، ولا لتسمية الفائدة ربحاً أو دخلاً أو عمولة. وكذلك السندات التي تُباع بأقلّ من قيمتها الاسمية ولا تدفع فائدةً دورية، لأنّ الفرق بين السعرين فائدةٌ مخصومة سلفاً.',
      'The ruling on bonds in jurisprudence rests on the definition of riba from section two. A bond is a loan, and the interest on it is a stipulated increase on the loan, whether the borrower is a person, a company or a state. That is what the **International Islamic Fiqh Academy ruled in 1990**: bonds that promise repayment with interest attached are forbidden to issue, buy or trade, whether issued by a private party or a state body. Calling them certificates or investment or savings papers changes nothing, nor does calling the interest profit, income or commission. The same goes for bonds sold below face value with no periodic interest, since the gap between the two prices is interest deducted in advance.'
    ) },
    { type: 'p', text: L(
      'لكنّ الفقه لا يمنع الدولة من الاقتراض. الممنوع هو الزيادة المشروطة. في السنّة أنّ النبي ﷺ استقرض أربعين ألفاً، فلمّا جاءه مالٌ ردّها وقال: «إنما جزاء السلف الحمد والأداء». واستسلف بَكراً، أي جملاً فتيّاً، فلم يوجد عند السداد إلّا جملٌ خيرٌ منه، فأمر بإعطائه وقال: «إنّ خيار الناس أحسنهم قضاءً». فما يزيده المدين من نفسه عند السداد، بلا شرطٍ سابق، جائز. والمشروط سلفاً هو الربا.',
      'But jurisprudence does not forbid the state to borrow. What is forbidden is the stipulated increase. In the Sunnah, the Prophet ﷺ borrowed forty thousand, and when money came he repaid it, saying: “The reward of a loan is thanks and repayment.” And he borrowed a young camel, and at repayment only a better camel could be found, so he ordered it given, saying: “The best of people are those best at repaying.” So whatever a debtor adds of his own accord at repayment, with no prior condition, is permitted. What is stipulated in advance is riba.'
    ) },
    { type: 'p', text: L(
      'وإذا أعسر المدين فالقاعدة القرآنية التي مرّت في القسم الثاني إمهاله بلا زيادة، وإسقاط الدَّين عنه أفضل: ﴿وَأَنْ تَصَدَّقُوا خَيْرٌ لَكُمْ﴾. وهذا قريبٌ ممّا يطالب به فاروفاكيس لديون اليونان، ومن شطب الديون غير القابلة للسداد، وهو نفسه يستشهد بما في الكتاب المقدّس من إلغاءٍ دوريّ للديون. والفرق في التعليل: هو يطلب شطبها لأنه الحلّ العملي، والنصّ يوجب الإمهال ويندب إلى الإسقاط لأنه عدلٌ وإحسان.',
      'And if the debtor falls into hardship, the Qur’anic rule from section two is to give him time without increase — and forgiving the debt is better: “and that you give it as charity is better for you” (al-Baqarah 2:280). This is close to what Varoufakis asks for Greece’s debts, and to writing off unpayable debts, and he himself cites scripture’s periodic cancellation of debts. The difference is in the reasoning: he wants them cancelled because it is the practical solution; the text requires respite and recommends forgiveness because it is just and generous.'
    ) },
    { type: 'p', text: L(
      'ويذكر الباحث **منذر قحف** أنّ الاقتراض العام عُرف في عهد النبي ﷺ ثم عند العباسيين والعثمانيين، وأنّ الشريعة لا تمنع الدولة من الاقتراض بلا فائدة، وأنّ الماوردي نصّ على أنّ الحاكم اللاحق ملزمٌ بسداد ما اقترضه من سبقه. ويضيف أنّ كثيراً من اقتراض الدول اليوم سببه الإفراط في الإنفاق، لا الضرورة.',
      'The researcher **Monzer Kahf** notes that public borrowing was known in the Prophet’s time ﷺ and later under the Abbasids and Ottomans; that the Shariah does not stop the state borrowing without interest; and that al-Mawardi held a later ruler bound to repay what his predecessor borrowed. He adds that much state borrowing today comes from overspending, not necessity.'
    ) },

    { type: 'h4', text: L('النظرة الإسلامية: البدائل', 'The Islamic view: the alternatives') },
    { type: 'p', text: L('كيف تموّل دولةٌ نفسها بلا فائدة؟ يعدّد قحف أدواتٍ عدّة.', 'How does a state fund itself without interest? Kahf lists several tools.') },
    { type: 'ul', items: [
      L('**القرض الحسن.** قرضٌ بلا فائدة يُعوَّل فيه على الدافع الديني والوطني. وقد تفرضه الدولة عند الضرورة، فيكون أشبه بضريبةٍ تُردّ لاحقاً، ولا بدّ عندئذٍ من مسوّغٍ من المصلحة العامة والعدل في التوزيع.',
        '**Qard hasan.** An interest-free loan relying on religious and civic motive. The state may impose it in necessity, making it something like a tax repaid later — and then it needs a justification in the public interest and fairness in who bears it.'),
      L('**صكوك الإجارة.** يملك حملة الصكوك أصلاً، كمبنى أو مطار، ويؤجّرونه للدولة. عائدهم أجرةٌ لا فائدة، وعليهم مخاطر الملكية، وتُتداول هذه الصكوك بسعر السوق لأنها تمثّل ملكيةً لا ديناً.',
        '**Ijara sukuk.** The holders own an asset, a building or an airport, and lease it to the state. Their return is rent, not interest; they carry the risks of ownership; and the sukuk trade at market prices because they represent ownership, not debt.'),
      L('**صكوك المشاركة والمضاربة.** تصلح للمشاريع العامة التي تدرّ دخلاً، كجسرٍ يُدفع رسمٌ لعبوره. ولا يجوز فيها ضمان عائدٍ ثابت لحامل الصك.',
        '**Musharaka and mudaraba sukuk.** Suited to public projects that earn income, like a toll bridge. No fixed return may be guaranteed to the holder.'),
      L('**السَّلَم والاستصناع والمرابحة.** تشتري بها الدولة ما تحتاج إليه من سلعٍ ومنشآت بثمنٍ معجَّل أو مؤجَّل. لكنّ ما ينشأ عنها ديون، والدَّين في الفقه لا يُباع إلّا بقيمته الاسمية، فلا سوق ثانوية لها.',
        '**Salam, istisna’ and murabaha.** The state buys the goods and facilities it needs at a price paid now or later. But what they create are debts, and in jurisprudence a debt may be sold only at face value, so there is no secondary market for them.'),
    ] },
    { type: 'p', text: L(
      'والمجمع نفسه اقترح بديلاً عن السندات: صكوكٌ قائمة على المضاربة لمشروعٍ محدّد، لا فائدة فيها ولا ربح مقطوع، ولحاملها حصّةٌ من الربح إن تحقّق. و**الصكوك (Sukuk)**، ومفردها صكّ، شهاداتٌ تمثّل حصّةً شائعة في ملكية أصلٍ أو مجموعة أصول، وعائدها من دخل ذلك الأصل. وقد صارت أداة تمويلٍ حكوميٍّ بالدرجة الأولى: بحسب تقرير السوق المالية الإسلامية الدولية، بلغ ما أُصدر منها في العالم سنة ٢٠٢٥ نحو **٢٦٢٫٩ مليار دولار**، أكثر من نصفه أصدرته حكومات ونحو خُمسه جهاتٌ شبه حكومية. وتجاوز مجموع الصكوك القائمة **تريليون دولار**.',
      'The Academy itself proposed an alternative to bonds: sukuk based on mudaraba for a specific project, with no interest and no fixed profit, the holder taking a share of profit if there is any. **Sukuk** (singular sakk) are certificates representing an undivided share in the ownership of an asset or a group of assets, with their return coming from that asset’s income. They have become chiefly an instrument of government finance: according to the International Islamic Financial Market, worldwide issuance in 2025 was about **$262.9 billion**, more than half of it by governments and about a fifth by quasi-sovereign bodies. Sukuk outstanding passed **$1 trillion**.'
    ) },
    { type: 'figure', id: 'tdSukukIssuers' },
    { type: 'p', text: L(
      'وليست الصكوك حكراً على البلدان الإسلامية. سنة **٢٠٠٤** أقرّت ولاية **ساكسونيا-أنهالت** الألمانية إصدار ما وُصف بأوّل صكٍّ حكوميّ في أوروبا، بنحو ١٠٠ مليون يورو: نقلت حقوقاً في مبانٍ إلى مؤسّسةٍ هولندية ثم استأجرتها منها، فيقبض حملة الصكوك أجرةً لا فائدة، ولها أن تستردّ حقوقها بعد خمس سنوات.',
      'Nor are sukuk confined to Muslim countries. In **2004** the German state of **Saxony-Anhalt** approved what was described as Europe’s first government sukuk, for about €100 million: it transferred rights in buildings to a Dutch entity and leased them back, so holders received rent rather than interest, with the state entitled to take its rights back after five years.'
    ) },

    { type: 'h4', text: L('النظرة الإسلامية: بين النظرية والواقع', 'The Islamic view: between theory and practice') },
    { type: 'p', text: L(
      'هنا يتكرّر ما رأيناه في المرابحة. يفرّق الباحثون بين صكوكٍ **مدعومة بأصول (Asset-backed)**، يملك حملتها الأصل فعلاً، وصكوكٍ **قائمة على أصول (Asset-based)**، يكون حملتها فيها في منزلة الدائنين العاديين. وقد مالت السوق إلى النوع الثاني: تتعهّد الجهة المُصدِرة بإعادة شراء الأصل عند الاستحقاق، فيعود إلى حامل الصكّ رأس ماله كاملاً. وسنة ٢٠٠٧ قال **العثماني**، وكان يرأس المجلس الشرعي في هيئة المحاسبة والمراجعة للمؤسّسات المالية الإسلامية، إنّ نحو **٨٥٪** من الصكوك لا توافق الشريعة بسبب تعهّدات إعادة الشراء، لأنّ الوعد بردّ رأس المال ينقض مبدأ المشاركة في الربح والمخاطرة. ويخلص باحثون إلى أنّ كثيراً من الصكوك يشبه أدوات الدَّين التقليدية في تدفّقاته النقدية وفي مخاطره وعوائده، وأنّ الابتكار فيه قانونيٌّ أكثر منه مالياً.',
      'Here what we saw with murabaha recurs. Researchers distinguish **asset-backed** sukuk, whose holders really own the asset, from **asset-based** sukuk, whose holders stand like ordinary creditors. The market has leaned to the second: the issuer undertakes to buy the asset back at maturity, returning the holder’s capital in full. In 2007 **Usmani**, then chairing the Shariah board of the Accounting and Auditing Organization for Islamic Financial Institutions, said about **85%** of sukuk did not comply with the Shariah because of these repurchase undertakings, since a promise to return the capital breaks the principle of sharing profit and risk. Researchers conclude that many sukuk resemble conventional debt in their cash flows, risks and returns, and that their innovation is more legal than financial.'
    ) },
    { type: 'figure', id: 'tdBondVsSukuk' },
    { type: 'p', text: L(
      'وكما في فوائد البنوك، في المسألة قولٌ مخالف. دار الإفتاء المصرية أفتت سنة ٢٠١٢ بجواز الاستثمار في أذون الخزانة المصرية، وعدّتها «عقود تمويلٍ جديدة» لا قروضاً، واستندت إلى أنّ للدولة شخصيةً اعتبارية تختلف أحكامها عن أحكام الأفراد. وقال المفتي الأسبق نصر فريد واصل سنة ٢٠١٨ إنّ السندات الحكومية وأذون الخزانة مشروعة، بخلاف سندات الشركات ذات الفائدة الثابتة. وهو قول أقلّية، وقرارات المجامع الفقهية الدولية على خلافه.',
      'As with bank interest, there is a dissenting view. Egypt’s Dar al-Ifta ruled in 2012 that investing in Egyptian Treasury bills is permissible, treating them as “new financing contracts” rather than loans, on the ground that the state has a legal personality whose rules differ from individuals’. The former mufti Nasr Farid Wasel said in 2018 that government bonds and Treasury bills are legitimate, unlike corporate bonds at fixed interest. It is a minority view, and the international fiqh academies’ rulings go the other way.'
    ) },

    { type: 'h4', text: L('النظرة الإسلامية: خلق المال والوسيط', 'The Islamic view: money creation and the middleman') },
    { type: 'p', text: L(
      'ومن أين يأتي المال في التصوّر الإسلامي؟ نقطة البداية عند العثماني أنّ المال لا منفعة له في ذاته، وأنّ نظريات الفائدة أخطأت حين عاملته معاملة السلعة. وفي حكمه القضائي الصادر سنة ١٩٩٩ يعدّ «التوسّع في النقود المصطنعة والتضخّم» من آثار الفائدة العامة.',
      'And where does money come from in the Islamic conception? Usmani’s starting point is that money has no use in itself, and that theories of interest erred in treating it as a commodity. In his 1999 court judgment he counts “the expansion of artificial money and inflation” among the general effects of interest.'
    ) },
    { type: 'p', text: L(
      'ومن هنا ينظر اقتصاديون مسلمون بريبةٍ إلى خلق المال بالإقراض بفائدة: مالٌ يولد من دَين، ويذهب نفع خلقه إلى البنك. وفي دراسةٍ لاقتصاديَّين من صندوق النقد الدولي، محسن خان وعباس ميراخور، نموذجان لنظامٍ مصرفيٍّ بلا فائدة. في الأوّل تحتفظ البنوك باحتياطيٍّ كامل، أي ١٠٠٪، مقابل الحسابات الجارية، فلا تخلق بها مالاً، وتذهب منافع خلق المال إلى المجتمع كلّه لا إلى فئةٍ منه. وفي الثاني تُستثمر الودائع بالمضاربة، فيكون المودع شريكاً يربح ويخسر، لا دائناً مضموناً. وفي الحالين لا سعر فائدةٍ يديره البنك المركزي. أدواته نِسب الاحتياطي، وبيع وشراء أوراقٍ تمثّل ملكيةً لا ديناً، والاستثمار المباشر على أساس المشاركة في الربح. لكنّ الدراسة تعترف بالعقدة: إذا مُنعت الفائدة فلا طريق مقبولاً لتمويل عجز الحكومة إلّا خلق المال، وهذا قد يتعارض مع استقرار الاقتصاد، والمسألة خلافية.',
      'Hence Muslim economists’ suspicion of creating money by lending at interest: money born of debt, with the benefit of creating it going to the bank. A study by two IMF economists, Mohsin Khan and Abbas Mirakhor, sets out two models of a banking system without interest. In the first, banks hold full reserves — 100% — against current accounts, so they create no money with them, and the gains from money creation go to the whole society rather than one part of it. In the second, deposits are invested by mudaraba, making the depositor a partner who gains and loses, not a guaranteed creditor. In both there is no interest rate for the central bank to manage; its tools are reserve ratios, buying and selling papers that represent ownership rather than debt, and direct investment on a profit-sharing basis. But the study admits the knot: if interest is banned there is no accepted way to fund a government deficit except creating money, which may clash with economic stability — and the question is disputed.'
    ) },
    { type: 'p', text: L(
      'فجواب الفقه عن سؤال «لماذا لا تُقرض الدولة الناس مباشرة؟» ذو شقّين. الدولة تستطيع أن تُقرض قرضاً حسناً بلا فائدة، أو أن تُلزم به غيرها؛ وقد رأينا مثالين: قرض الطلاب في ألمانيا، وقروض «الشرف» في تونس. أمّا التمويل الاستثماري فالأصل فيه ألّا يكون قرضاً أصلاً، من الدولة أو من غيرها، بل مشاركةً أو بيعاً أو إجارة. والوسيط عندئذٍ ليس مُقرِضاً يأخذ فائدةً مضمونة، بل مضاربٌ أو شريكٌ أو تاجرٌ أو مؤجّرٌ يتحمّل نصيبه من المخاطرة.',
      'So jurisprudence answers “why doesn’t the state lend directly?” in two parts. The state can make an interest-free qard hasan, or oblige others to — we saw two examples, Germany’s student loans and Tunisia’s loans “on honour”. But investment finance should not be a loan at all, from the state or anyone else; it should be a partnership, a sale or a lease. And the middleman is then not a lender taking guaranteed interest but a managing partner, a partner, a trader or a lessor carrying his share of the risk.'
    ) },
    { type: 'table', caption: L('**جدول ٥.** خلاصة: ثلاث قراءاتٍ للمال والدَّين العام.', '**Table 5.** In short: three readings of money and public debt.'),
      head: [L('', ''), L('النظرة الرأسمالية', 'Mainstream view'), L('قراءة فاروفاكيس', 'Varoufakis'), L('الفقه الإسلامي', 'Islamic jurisprudence')],
      rows: [
        [L('من يخلق المال', 'Who creates money'), L('البنوك التجارية بالإقراض، والبنك المركزي يضبط السعر.', 'Commercial banks, by lending; the central bank sets the rate.'), L('المصرفيون «من العدم»، والدولة تقف وراءهم.', 'Bankers, “from thin air”, with the state behind them.'), L('خلق المال بدَينٍ ربويّ مرفوض، والبديل احتياطيٌّ كامل أو مشاركة.', 'Money created by interest-bearing debt is rejected; the alternative is full reserves or partnership.')],
        [L('السند الحكومي', 'The government bond'), L('أداةٌ عادية، وفائدته ثمن الاقتراض.', 'An ordinary instrument; its interest is the price of borrowing.'), L('«شبحٌ في آلة»: مزعجٌ ولا غنى عنه، وهو ماء المصرفيين.', '“A ghost in the machine”: unpleasant, indispensable — the bankers’ water.'), L('قرضٌ بزيادةٍ مشروطة، أي ربا، عند المجامع.', 'A loan with a stipulated increase — riba, per the academies.')],
        [L('لماذا تقترض الدولة', 'Why the state borrows'), L('عجز، وحروب، واستثمار، وإنعاشٌ في الركود.', 'Deficits, wars, investment, stimulus in a slump.'), L('الأثرياء لا يدفعون حصّتهم، والمصرفيون يحتاجون إلى أصلٍ سائل.', 'The rich don’t pay their share, and bankers need a liquid asset.'), L('الاقتراض جائزٌ عند الحاجة، بلا فائدة.', 'Borrowing is permitted when needed — without interest.')],
        [L('العلاج أو البديل', 'Remedy or alternative'), L('قواعد للعجز والدَّين، وبنكٌ مركزيّ مستقلّ.', 'Rules on deficits and debt, and an independent central bank.'), L('شطب ما لا يُسدَّد، وإضفاء طابعٍ ديمقراطي على النقود.', 'Write off what cannot be paid; democratise money.'), L('قرضٌ حسن، وصكوك إجارةٍ ومشاركة، وسَلَمٌ واستصناع.', 'Qard hasan, ijara and partnership sukuk, salam and istisna’.')],
        [L('دور المصرفي', 'The banker’s role'), L('وسيطٌ يختار المقترضين ويتحمّل الخطر.', 'A go-between who chooses borrowers and carries risk.'), L('خالقٌ للمال، في علاقةٍ مسمومة مع الدولة.', 'A creator of money, in a toxic relationship with the state.'), L('شريكٌ أو تاجرٌ أو مؤجّر، لا مُقرِضٌ بفائدة.', 'A partner, trader or lessor — not a lender at interest.')],
        [L('حدود الطرح', 'Its limits'), L('أزمات دَينٍ متكرّرة، وإنقاذ البنوك بالمال العام.', 'Repeated debt crises, and banks rescued with public money.'), L('يسأل من يتحكّم في المال، ولا يسأل عن جواز الفائدة.', 'Asks who controls money, not whether interest is permissible.'), L('كثيرٌ من الصكوك يحاكي السندات، وتمويل العجز بلا فائدة موضع خلاف.', 'Many sukuk mimic bonds, and funding deficits without interest is contested.')],
      ] },
    { type: 'sources', title: L('مصادر هذا القسم', 'Sources for this section'), items: [
      { label: L('ماكلي وراديا وتوماس، «خلق المال في الاقتصاد الحديث» (٢٠١٤)', 'McLeay, Radia & Thomas, “Money creation in the modern economy” (2014)'), publisher: L('بنك إنكلترا', 'Bank of England'), url: 'https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy' },
      { label: L('«ما المُقرض الأخير؟»', '“What is a lender of last resort?”'), publisher: L('البنك المركزي الأوروبي', 'European Central Bank'), url: 'https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what-is-a-lender-of-last-resort.en.html' },
      { label: L('«البنوك: في قلب المسألة»', '“Banks: At the Heart of the Matter”'), publisher: L('صندوق النقد الدولي، التمويل والتنمية', 'IMF, Finance & Development'), url: 'https://www.imf.org/en/Publications/fandd/issues/Series/Back-to-Basics/Banks' },
      { label: L('«ما الضمان؟»', '“What is collateral?”'), publisher: L('البنك المركزي الأوروبي', 'European Central Bank'), url: 'https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me/html/collateral.en.html' },
      { label: L('آفاق الاقتصاد العالمي، نيسان ٢٠٢٦', 'World Economic Outlook, April 2026'), publisher: L('صندوق النقد الدولي', 'IMF'), url: 'https://doi.org/10.5089/9798229042758.081' },
      { label: L('الدَّين العام الإجمالي، نسبةً إلى الناتج', 'General government gross debt, percent of GDP'), publisher: L('صندوق النقد الدولي، DataMapper', 'IMF DataMapper'), url: 'https://www.imf.org/external/datamapper/GGXWDG_NGDP@WEO' },
      { label: L('نموّ الناتج الحقيقي، نسبةً سنوية', 'Real GDP growth, annual percent change'), publisher: L('صندوق النقد الدولي، DataMapper', 'IMF DataMapper'), url: 'https://www.imf.org/external/datamapper/NGDP_RPCH@WEO' },
      { label: L('عن بنك KfW', 'About KfW'), publisher: 'KfW', url: 'https://www.kfw.de/About-KfW/' },
      { label: L('«BAföG — مالٌ من الدولة»', '“BAföG – money from the state”'), publisher: L('اتحاد الخدمات الطلابية الألماني', 'Deutsches Studierendenwerk'), url: 'https://studierendenwerke.de/themen/studienfinanzierung/bafoeg' },
      { label: L('منشور البنك المركزي التونسي عدد ٨ لسنة ٢٠٢٦: القروض «على الشرف»', 'Central Bank of Tunisia circular 8/2026: loans “on honour”'), publisher: L('البنك المركزي التونسي', 'Central Bank of Tunisia'), url: 'https://ar.tunisienumerique.com/wp-content/uploads/2026/09/Cir_2026_08_ar.pdf' },
      { label: L('«قروض الشرف: إدماج المقصيّين من النظام المالي»', '“Prêts sur l’honneur : bancariser les exclus du système financier”'), publisher: 'La Presse', url: 'https://www.lapresse.tn/2026/09/13/prets-sur-lhonneur-bancariser-les-exclus-du-systeme-financier' },
      { label: L('«حظر التمويل النقدي: جدار أوروبا بين السياستين النقدية والمالية» (٢٠٢٦)', '“Prohibiting monetary financing: Europe’s firewall” (2026)'), publisher: 'SUERF', url: 'https://www.suerf.org/publications/suerf-policy-notes-and-briefs/prohibiting-monetary-financing-europes-firewall-between-monetary-and-fiscal-policy/' },
      { label: L('«كابح الديون» — مسرد البوندستاغ', '“Schuldenbremse” — Bundestag glossary'), publisher: L('البوندستاغ الألماني', 'German Bundestag'), url: 'https://www.bundestag.de/services/glossar/glossar/S/schuldenbremse-868664' },
      { label: L('استثناء الدفاع وصندوق البنية التحتية من كابح الديون (٢٠٢٥)', 'Defence exemption and infrastructure fund (2025)'), publisher: 'Noerr', url: 'https://www.noerr.com/de/insights/ausnahme-von-der-schuldenbremse-fuer-verteidigungsausgaben-und-sondervermoegen-fuer-investitionen-in-infrastruktur-und-klimaschutz-beschlossen' },
      { label: L('مجمع الفقه الدولي، قرار ٦٠ (٦/١١) بشأن السندات، ١٩٩٠', 'IIFA Resolution 60 (11/6) on bonds, 1990'), publisher: L('مجمع الفقه الإسلامي الدولي', 'International Islamic Fiqh Academy'), url: 'https://iifa-aifi.org/en/32428.html' },
      { label: L('قحف، «عجز الموازنة وأدوات الاقتراض العام في نظامٍ اقتصاديّ إسلامي» (١٩٩٤)', 'Kahf, “Budget Deficits and Public Borrowing Instruments in an Islamic Economic System” (1994)'), publisher: L('المجلّة الأمريكية للعلوم الاجتماعية الإسلامية', 'American Journal of Islamic Social Sciences'), url: 'https://ajis.org/index.php/ajiss/article/view/2428' },
      { label: L('ديا وباشا ولحسنة، «تمويل القطاع العام وإدارة الدَّين» (٢٠١٥)', 'Diaw, Bacha & Lahsasna, “Public sector funding and debt management” (2015)'), publisher: L('جامعة حمد بن خليفة', 'Hamad Bin Khalifa University'), url: 'https://ibir-api.hbku.edu.qa/sites/default/files/2021-03/Public%20sector%20fundingand%20debt%20management%20Chapter%2010.pdf' },
      { label: L('تقرير الصكوك ٢٠٢٦: الصكوك القائمة تتجاوز تريليون دولار', 'IIFM Sukuk Report 2026: outstanding sukuk pass $1 trillion'), publisher: L('السوق المالية الإسلامية الدولية', 'International Islamic Financial Market'), url: 'https://www.iifm.net/press-media/news-and-updates/historic-milestone-global-sukuk-outstanding-crosses-the-usd-1-trillion-mark-says-iifm-sukuk-report-2026/130' },
      { label: L('«ولايةٌ ألمانية تصدر أوّل صكٍّ في أوروبا» (٢٠٠٤)', '“German State to Issue Europe’s First Islamic Bond” (2004)'), publisher: L('عرب نيوز، عن رويترز', 'Arab News, via Reuters'), url: 'https://www.arabnews.com/node/246436' },
      { label: L('«ملاحظاتٌ ناقدة تهزّ سوق الصكوك» (٢٠٠٨)', '“Islamic bond market wrecked by critical remarks” (2008)'), publisher: L('أرابيان بزنس، عن رويترز', 'Arabian Business, via Reuters'), url: 'https://arabianbusiness.com/markets/equities/sukuk/islamic-bond-market-wrecked-by-critical-remarks-83923' },
      { label: L('دار الإفتاء المصرية، فتوى ١٩٥٦: الاستثمار في أذون الخزانة (٢٠١٢)', 'Dar al-Ifta fatwa 1956: investing in Treasury bills (2012)'), publisher: L('دار الإفتاء المصرية', 'Egyptian Dar al-Ifta'), url: 'https://www.dar-alifta.org/ar/fatwa/details/11966/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1-%D9%81%D9%8A-%D8%A3%D8%B0%D9%88%D9%86-%D8%A7%D9%84%D8%AE%D8%B2%D8%A7%D9%86%D8%A9' },
      { label: L('«فريد واصل: التعامل في السندات غير الحكومية لا يجوز شرعاً» (٢٠١٨)', 'Nasr Farid Wasel on government and corporate bonds (2018)'), publisher: L('مصراوي', 'Masrawy'), url: 'https://www.masrawy.com/news/news_egypt/details/2018/10/17/1446181/' },
      { label: L('العثماني، نصّ الحكم التاريخي في الفائدة (١٩٩٩)', 'Usmani, The Text of the Historic Judgment on Interest (1999)'), publisher: L('البلاغ', 'Albalagh'), url: 'https://www.albalagh.net/Islamic_economics/riba_judgement.shtml' },
      { label: L('خان وميراخور، «الإدارة النقدية في اقتصادٍ إسلامي» (١٩٩٤)', 'Khan & Mirakhor, “Monetary Management in an Islamic Economy” (1994)'), publisher: L('جامعة الملك عبد العزيز', 'King Abdulaziz University'), url: 'https://gssr.kau.edu.sa/Files/320/Researches/50888_21025.pdf' },
      { label: L('خان، «المصرفية الإسلامية بلا فائدة: تحليلٌ نظري» (١٩٨٦)', 'Khan, “Islamic Interest-Free Banking: A Theoretical Analysis” (1986)'), publisher: L('صندوق النقد الدولي', 'IMF Staff Papers'), url: 'https://ideas.repec.org/a/pal/imfstp/v33y1986i1p1-27.html' },
    ] },
  ],
}

/* ---------------------------------------------------------------- 5 */
const threeSystems = {
  id: 'three-systems',
  title: L('٥ · الأنظمة الثلاثة', '5 · The three systems'),
  blocks: [
    { type: 'p', text: L(
      'كلّ نظامٍ اقتصاديّ جوابٌ مختلف عن ثلاثة أسئلة: من يملك وسائل الإنتاج، ومن يقرّر ماذا نُنتج، ومن يأخذ الفائض. والسؤال الأخير هو الذي يبدأ به الكتاب. ملاحظةٌ على الأسماء: «الشيوعية» عند ماركس مرحلةٌ عليا تأتي بعد «الاشتراكية»، وما طُبّق في الاتحاد السوفييتي يسمّى **اقتصاداً مخطّطاً مركزياً (Command economy)**، وهو المقصود هنا بالنظام الشيوعي.',
      'Every economic system is a different answer to three questions: who owns the means of production, who decides what is produced, and who takes the surplus. The last is the question the book starts with. A note on names: for Marx “communism” is a higher stage after “socialism”, and what was applied in the Soviet Union is called a **command economy** — which is what “the communist system” means here.'
    ) },
    { type: 'p', text: L(
      '**الرأسمالي.** هو «مجتمع السوق» الذي يدور عليه الكتاب كلّه. الملكية خاصة لأغلب وسائل الإنتاج، والأسواق والأسعار تحدّد ماذا يُنتج ولمن. المحرّك هو الربح، والفائدة سعر المال وقلب النظام، والمال نفسه يُؤجَّر كما تُؤجَّر السلعة. يتحمّل المخاطرة المقترض وصاحب المشروع، ويُوزَّع الفائض بحسب الملكية والعقد: أجورٌ وربحٌ وفائدةٌ وإيجار. والنقد الشائع له أنه ينتج أزمات دَينٍ وتفاوتاً كبيراً في الثروة.',
      '**Capitalist.** This is the “market society” the whole book turns on. Most means of production are privately owned, and markets and prices decide what is produced and for whom. The engine is profit, interest is the price of money and the heart of the system, and money itself is rented like any good. The risk falls on the borrower and the entrepreneur, and the surplus is shared by ownership and contract: wages, profit, interest and rent. The usual criticism is that it produces debt crises and great inequality of wealth.'
    ) },
    { type: 'p', text: L(
      '**الشيوعي.** يطالب البيان الشيوعي، سنة ١٨٤٨، بإلغاء الملكية الخاصة لوسائل الإنتاج، وبحصر الائتمان في بنكٍ وطنيٍّ واحد تملكه الدولة. وفي الاقتصاد المخطّط تحدّد خطّةٌ مركزية الكمّيات والأسعار، والمحرّك تنفيذ الخطّة لا الربح، والمال أداةٌ لتنفيذها، والمخاطرة على الدولة. وتوزّع الدولة الدخل: لكلٍّ بحسب عمله، وفي المرحلة العليا بحسب حاجته. وفي التطبيق السوفييتي بقيت الفائدة، لكنها إدارية: دفاتر التوفير كانت تعطي ٢٪ أو ٣٪، والنِّسب تُحدَّد بقرارٍ بلا دورٍ حقيقيّ في توزيع الموارد. والنقد الشائع أنّ الأسعار فيه لا تؤدّي دور الإشارات، وأنّ تخطيط ملايين السلع شديد التعقيد.',
      '**Communist.** The Communist Manifesto of 1848 calls for abolishing private ownership of the means of production and centralising credit in a single state-owned national bank. In a planned economy a central plan sets quantities and prices; the engine is fulfilling the plan, not profit; money is a tool for carrying it out; and the risk is the state’s. The state distributes income: to each according to his work, and at the higher stage according to his needs. In Soviet practice interest survived, but administratively: savings books paid 2% or 3%, rates set by decree with no real role in allocating resources. The usual criticism is that prices cannot act as signals, and that planning millions of goods is fiendishly complex.'
    ) },
    { type: 'p', text: L(
      '**الإسلامي.** بحسب العثماني، يقبل قوى السوق والربح والملكية الخاصة، لكنه يضع لها حدوداً لا تتغيّر بقانون: تحريم الربا والقمار والاحتكار وغيرها. ويلخّص **محمد باقر الصدر** في كتابه «اقتصادنا» الهيكل في ثلاثة أركان: ملكيةٌ مزدوجة، وحرّيةٌ اقتصادية ضمن حدود، وعدالةٌ اجتماعية. المال فيه وسيلة تبادلٍ لا سلعة، والمخاطرة يتقاسمها صاحب المال وصاحب العمل، والفائض يُوزَّع بحسب العقد وبشرط المخاطرة. ومن أدوات التوزيع الزكاة، وهي ربع العشر في النقد، أي ٢٫٥٪. ومن نصوصه:',
      '**Islamic.** According to Usmani, it accepts market forces, profit and private property, but sets them limits no law can change: the prohibition of riba, gambling, hoarding and more. **Muhammad Baqir al-Sadr**, in his book «Iqtisaduna» («Our Economy»), sums up its structure in three pillars: dual ownership, economic freedom within limits, and social justice. Money in it is a medium of exchange, not a commodity; risk is shared between the owner of capital and the one who works it; and the surplus is distributed by contract and on condition of risk. Among its tools of distribution is zakat — a fortieth of cash holdings, 2.5%. Among its texts:'
    ) },
    { type: 'ul', items: [
      L('﴿كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنْكُمْ﴾ — الحشر: ٧', '“So that it does not circulate only among the rich among you.” — al-Hashr 59:7'),
      L('«الْمُسْلِمُونَ شُرَكَاءُ فِي ثَلَاثٍ: فِي الْكَلَإِ وَالْمَاءِ وَالنَّارِ» — أبو داود ٣٤٧٧', '“Muslims are partners in three things: pasture, water and fire.” — Abu Dawud 3477'),
    ] },
    { type: 'p', text: L(
      'الآية تضع مبدأً: ألّا يبقى المال متداولاً بين الأغنياء وحدهم. والحديث يؤسّس لملكيةٍ عامة للموارد المشتركة. وهذا قريبٌ ممّا يطرحه الفصل الأخير من الكتاب عن موارد لا يملكها أحد — كالنهر والغابة والهواء — وعن «المسؤولية الجماعية» عنها.',
      'The verse sets a principle: wealth must not circulate among the rich alone. The hadith grounds public ownership of shared resources. Which is close to what the book’s last chapter says about resources no one owns — the river, the forest, the air — and about “collective responsibility” for them.'
    ) },
    { type: 'table', caption: L('**جدول ٦.** خلاصة: الأنظمة الثلاثة.', '**Table 6.** In short: the three systems.'),
      head: [L('', ''), L('الرأسمالي', 'Capitalism'), L('الشيوعي', 'Command economy'), L('الإسلامي', 'Islamic economy')],
      rows: [
        [L('الملكية', 'Ownership'), L('خاصة لأغلب وسائل الإنتاج.', 'Private, for most means of production.'), L('عامة: الدولة تملك وسائل الإنتاج.', 'Public: the state owns the means of production.'), L('مزدوجة: خاصة وعامة وملكية دولة.', 'Dual: private, public and state ownership.')],
        [L('من يقرّر ماذا نُنتج', 'Who decides what is made'), L('السوق والأسعار.', 'The market and prices.'), L('خطّةٌ مركزية تحدّد الكمّيات والأسعار.', 'A central plan setting quantities and prices.'), L('السوق، ضمن حدودٍ شرعية ورقابة.', 'The market, within religious limits and oversight.')],
        [L('المحرّك', 'The engine'), L('الربح.', 'Profit.'), L('تنفيذ الخطّة.', 'Fulfilling the plan.'), L('الربح الحلال، ومعه واجبات كالزكاة.', 'Lawful profit, with duties like zakat.')],
        [L('الفائدة', 'Interest'), L('سعر المال، وقلب النظام.', 'The price of money; the system’s heart.'), L('فائدةٌ إدارية صغيرة لا دور لها في التوزيع.', 'A small administered rate with no role in allocation.'), L('محرّمة، والبديل مشاركةٌ وبيعٌ وإجارة.', 'Forbidden; the alternative is partnership, sale and lease.')],
        [L('المال', 'Money'), L('سلعةٌ تُؤجَّر.', 'A good that is rented.'), L('أداةٌ لتنفيذ الخطّة.', 'A tool for carrying out the plan.'), L('وسيلة تبادل، لا سلعة.', 'A medium of exchange, not a good.')],
        [L('من يتحمّل المخاطرة', 'Who carries the risk'), L('المقترض وصاحب المشروع.', 'The borrower and the entrepreneur.'), L('الدولة.', 'The state.'), L('صاحب المال وصاحب العمل معاً.', 'The owner of capital and the worker together.')],
        [L('توزيع الفائض', 'Sharing the surplus'), L('أجورٌ وربحٌ وفائدةٌ وإيجار، بحسب الملكية والعقد.', 'Wages, profit, interest and rent, by ownership and contract.'), L('الدولة توزّع: لكلٍّ بحسب عمله، ثم بحسب حاجته.', 'The state distributes: by work, then by need.'), L('بحسب العقد وبشرط المخاطرة، ومعه الزكاة.', 'By contract and on condition of risk, plus zakat.')],
        [L('نقدٌ شائع', 'A common criticism'), L('أزمات دَين، وتفاوتٌ كبير في الثروة.', 'Debt crises and great inequality of wealth.'), L('الأسعار لا تؤدّي دور الإشارات، والتخطيط شديد التعقيد.', 'Prices cannot signal, and planning is fiendishly complex.'), L('فجوةٌ بين النظرية والتطبيق.', 'A gap between theory and practice.')],
      ] },
    { type: 'p', text: L(
      '**وأين فاروفاكيس من الثلاثة؟** ليس مع أيٍّ منها كما هو. ينتقد مجتمع السوق من أوّل الكتاب إلى آخره، ولا يقف عند التجربة السوفييتية ولا عند التخطيط المركزي. وما يقترحه في الفصول الأخيرة شيءٌ آخر: أن يصير جزءٌ من آلات كلّ شركةٍ ملكاً للجميع، وأن تُدار النقود وموارد الكوكب بقرارٍ ديمقراطي. ويلخّص الخلاف في شعارين: **«إضفاء طابعٍ ديمقراطي على كلّ شيء»** مقابل **«تسليع كلّ شيء»**. وهو يقرّ بأنّ الأسواق تُحسن توزيع السلع العادية بين الناس، ويرى أنها تسيء إدارة النقود وقوّة العمل والآلات. وأغلب بلدان اليوم مزيجٌ من سوقٍ ودولة، لا نظامٌ صافٍ. و«النظام الإسلامي» في الجدول إطارٌ نظريّ: في الواقع التمويل الإسلامي قطاعٌ صغير يعمل داخل اقتصاد سوقٍ قائمٍ على الفائدة، وبلا دعمٍ كاملٍ من القوانين والبنوك المركزية، بحسب العثماني نفسه.',
      '**And where does Varoufakis stand among the three?** With none of them as it is. He criticises market society from the first page to the last, and doesn’t stop at the Soviet experiment or at central planning. What he proposes in the closing chapters is something else: that part of every company’s machines become everyone’s property, and that money and the planet’s resources be run by democratic decision. He sums up the clash in two slogans: **“Democratise everything”** against **“Commodify everything”**. He grants that markets distribute ordinary goods among people well, and holds that they manage money, labour and machines badly. Most countries today are a mix of market and state, not a pure system. And “the Islamic system” in the table is a theoretical framework: in practice Islamic finance is a small sector working inside a market economy built on interest, without full support from the laws and the central banks — as Usmani himself says.'
    ) },
    { type: 'p', text: L('ويختم القسم بمثالٍ يمرّ بالأنظمة الثلاثة: كيف تصل مدّخرات شخصٍ إلى مشروع، وماذا يعود إليه.', 'The section ends with an example that runs through all three: how one person’s savings reach a project, and what comes back to them.') },
    { type: 'figure', id: 'tdThreeSystems' },
    { type: 'sources', title: L('مصادر هذا القسم', 'Sources for this section'), items: [
      { label: L('«الرأسمالية»', '“Capitalism”'), publisher: L('الموسوعة البريطانية', 'Encyclopaedia Britannica'), url: 'https://www.britannica.com/money/capitalism' },
      { label: L('«الشيوعية»', '“Communism”'), publisher: L('الموسوعة البريطانية', 'Encyclopaedia Britannica'), url: 'https://www.britannica.com/topic/communism' },
      { label: L('«الاقتصاد المخطّط»', '“Command economy”'), publisher: L('الموسوعة البريطانية', 'Encyclopaedia Britannica'), url: 'https://www.britannica.com/print/article/127708' },
      { label: L('ماركس وإنجلز، البيان الشيوعي، الفصل الثاني (١٨٤٨)', 'Marx & Engels, Manifesto of the Communist Party, ch. II (1848)'), publisher: 'Marxists.org', url: 'https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch02.htm' },
      { label: L('ماركس، نقد برنامج غوتا (١٨٧٥)', 'Marx, Critique of the Gotha Programme (1875)'), publisher: 'Marxists.org', url: 'https://www.marxists.org/archive/marx/works/1875/gotha/ch01.htm' },
      { label: L('غارفي، «المال والتدفّقات المالية والائتمان في الاتحاد السوفييتي» (١٩٧٧)', 'Garvy, Money, Financial Flows, and Credit in the Soviet Union (1977)'), publisher: 'NBER', url: 'https://www.nber.org/chapters/c4156.pdf' },
      { label: L('الصدر، «اقتصادنا»: الهيكل العام للاقتصاد الإسلامي', 'Al-Sadr, «Iqtisaduna»: the general structure of the Islamic economy'), publisher: L('البلاغ', 'Al-Balagh'), url: 'https://balagh.com/mosoa/article/pdf/14244' },
    ] },
  ],
}

/* ---------------------------------------------------------------- 6 */
const summary = {
  id: 'summary',
  title: L('٦ · الخلاصة', '6 · In summary'),
  blocks: [
    { type: 'ol', items: [
      L('في مجتمع السوق يسبق الدَّينُ الإنتاج، والفائدة سعره. هذه قصّة الفصل الثالث من الكتاب.', 'In a market society debt comes before production, and interest is its price. That is the story of the book’s third chapter.'),
      L('الربا في الفقه كلّ زيادةٍ مشروطة على دَين. فالمال وسيلةٌ لا سلعة، والربح يقتضي مخاطرة.', 'In jurisprudence riba is any stipulated increase on a debt. Money is a means, not a commodity, and profit requires risk.'),
      L('البنك الإسلامي يختلف في العقد: يبيع سلعةً أو يؤجّر أو يشارك، والثمن لا يزيد بالتأخير.', 'The Islamic bank differs in the contract: it sells a good, leases or partners, and the price does not grow with delay.'),
      L('في الواقع أغلب تمويله مرابحةٌ وتورّق، والنتيجة الاقتصادية قريبةٌ من البنك التقليدي. وهذا النقد يقوله أهل الصناعة أنفسهم.', 'In practice most of its financing is murabaha and tawarruq, and the economic result is close to a conventional bank’s. That criticism comes from the industry itself.'),
      L('أغلب المال تخلقه البنوك الخاصة «من العدم» حين تُقرض، والدولة تقف وراءها ببنكها المركزي.', 'Most money is created by private banks “from thin air” when they lend, with the state behind them through its central bank.'),
      L('السندات الحكومية تموّل الدولة وتعطي المصرفيين أصلاً سائلاً. الدَّين عند الكتاب «مزعجٌ لكن لا غنى عنه». والمجامع الفقهية ترى السند قرضاً ربوياً، والبديل المقترح قرضٌ حسن وصكوك، مع أنّ كثيراً من الصكوك يحاكي السندات.', 'Government bonds fund the state and give bankers a liquid asset. For the book, debt is “unpleasant yet indispensable”. The fiqh academies see a bond as an interest-bearing loan; the proposed alternative is qard hasan and sukuk — though many sukuk mimic bonds.'),
      L('الوسيط المصرفي موجودٌ لأنّ أحداً يجب أن يختار المقترضين ويتحمّل الخطر، ولأنّ القانون في منطقة اليورو يمنع البنك المركزي من تمويل الحكومة مباشرة، ولأنّ الأقوياء، في رأي الكتاب، يقاومون أن تخلق الدولة المال لنفسها. والفقه لا يلغي الوسيط، بل يغيّر عقده: من مُقرِضٍ بفائدة إلى شريكٍ أو تاجرٍ أو مؤجّر.', 'The banking middleman exists because someone must choose the borrowers and carry the risk; because in the euro area the law forbids the central bank to fund the government directly; and because the powerful, in the book’s view, resist the state creating money for itself. Jurisprudence doesn’t abolish the middleman; it changes his contract — from lender at interest to partner, trader or lessor.'),
      L('الأنظمة الثلاثة أجوبةٌ مختلفة عن السؤال نفسه: من يملك، ومن يقرّر، ومن يأخذ الفائض.', 'The three systems are different answers to the same question: who owns, who decides, and who takes the surplus.'),
    ] },
  ],
}

export const debtSection = {
  slug: 'debt-usury',
  icon: '⚖️',
  title: L('الدَّين والربا والأنظمة الثلاثة', 'Debt, Usury and the Three Systems'),
  lead: L(
    'يمرّ فاروفاكيس على الموضوع في سطرين: الإسلام يحرّم الفائدة، والمسيحية كانت تحرّمها. هذا ملخّصٌ من النادي يفتح تلك الملاحظة على أربعة أسئلة: ما الربا ولماذا حُرّم؟ بماذا يختلف البنك الإسلامي عن التقليدي في النظرية والواقع؟ من أين يأتي المال، ولماذا تقترض الدول بالسندات؟ وكيف تجيب الأنظمة الثلاثة — الرأسمالي والشيوعي والإسلامي — عن سؤال الكتاب: من يأخذ الفائض، وبأيّ حقّ؟',
    'Varoufakis touches the subject in two sentences: Islam forbids interest, and Christianity once did. This is a club companion that opens that remark onto four questions: what is riba, and why was it forbidden? How does an Islamic bank differ from a conventional one, in theory and in practice? Where does money come from, and why do states borrow through bonds? And how do the three systems — capitalist, communist and Islamic — answer the book’s question: who takes the surplus, and by what right?'
  ),
  blocks: [
    { type: 'callout', variant: 'note', title: L('من أين هذا القسم؟', 'Where this section comes from'), text: L(
      '**هذا ليس من كتاب فاروفاكيس.** إنه ملخّصٌ مرافقٌ كتبه النادي إلى جانب الترجمة العربية: ما يخصّ الكتاب منه مأخوذٌ منه، و**الجزء الإسلاميّ يعتمد على كتاب «مقدّمة في التمويل الإسلامي» لمحمد تقي العثماني** (ترجمة عمر أحمد كشكار، دار الرواد، دمشق ٢٠١٩)، ومعه قرارات المجامع الفقهية وأبحاثٌ وبياناتٌ منشورة، مصادرها في آخر كلّ قسم. وهو **عرضٌ للآراء، لا فتوى**: حيث في المسألة خلاف، يُذكر القولان ووزن كلٍّ منهما. أرقام الأمثلة افتراضية إلا ما ذُكر مصدره.',
      '**This is not from Varoufakis’s book.** It is a companion the club wrote alongside the Arabic translation: what concerns the book is taken from it, and **the Islamic part relies on Muhammad Taqi Usmani’s An Introduction to Islamic Finance** (Arabic translation by Omar Ahmad Kishkar, Dar al-Rawad, Damascus 2019), together with the rulings of the fiqh academies and published research and data, sourced at the end of each section. It **sets out positions; it is not a fatwa**: where there is disagreement, both views are given with their weight. Worked examples use hypothetical numbers unless a source is named.'
    ) },
    { type: 'tabs', panels: [fromSurplus, riba, banks, moneyState, threeSystems, summary] },
  ],
}
