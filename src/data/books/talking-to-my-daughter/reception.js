/*
 * The club's verdict on «الاقتصاد كما أشرحه لابنتي», and the club's own checks
 * of the three factual claims in it that don't hold as stated.
 *
 * Same bar as the other two books' reception.js: every check is sourced to
 * primary work, says what still stands as well as what doesn't, and sits beside
 * the claim it corrects — appended to that chapter in index.js, because a
 * correction filed away from its claim is one nobody reads.
 *
 * None of the three touches the book's argument. Varoufakis tells stories to
 * teach a mechanism; these are details in the stories. They are here because a
 * club that repeats a wrong fact in a session has learned the wrong fact.
 */
const L = (ar, en) => ({ ar, en })
const CLUB = L('تحقّقٌ من النادي', 'A check by the club')

/* The club's own opinion — edit freely, this is the club's voice, not a fact. */
export const verdict = {
  rating: 4,
  text: L(
    'أوضح ما قرأناه عن سؤالٍ نعيش داخله ولا نراه: من أين يأتي المال، ولماذا يجرّ الدَّين الاقتصاد ويخنقه معاً، ولماذا لا تنتهي الأزمات. يشرح بالقصص لا بالمعادلات — فاوست وأوديب ومعسكر أسرى ونهر سلمون — فيبقى في الذاكرة. وضعفه الوجه الآخر لقوّته: قصيرٌ ومنحاز، يعرض حجج خصومه بأضعف صورها أحياناً.',
    'The clearest thing we have read on a question we live inside without seeing: where money comes from, why debt both drives an economy and strangles it, and why the crises never end. It explains with stories rather than equations — Faust, Oedipus, a prison camp, a trout river — so it sticks. Its weakness is the other side of its strength: short and partisan, it sometimes gives its opponents’ arguments in their weakest form.'
  ),
  readIf: L(
    'تشعر أن نشرات الاقتصاد تُكتب بلغةٍ لا تُفهم عمداً، وتريد أن تفهم ما يُقال لك.',
    'You feel the economic news is written in a language designed not to be understood, and you want to follow what you are being told.'
  ),
  caveat: L(
    'حلوله — ملكية الجميع لجزءٍ من الآلات، و«ديمقراطية المال» — أسئلةٌ مفتوحة لا أجوبة مجرّبة؛ والكتاب نفسه يقول إنها تحتاج كتاباً آخر.',
    'His remedies — public part-ownership of the machines, “democratic money” — are open questions, not tested answers; the book itself says they would need another book.'
  ),
}

/* → chapter 2, after the market for blood. */
export const bloodCheck = [
  { type: 'debate',
    critic: CLUB,
    topic: L('هل يُنقص الدفعُ التبرّعَ بالدم؟', 'Does paying for blood reduce it?'),
    claim: L(
      'في البلدان التي يُدفع فيها للمتبرّعين يُجمع دمٌ أقلّ بكثير ممّا في البلدان التي يُتبرَّع فيها مجاناً، لأن الدفع يطرد المتبرّعين الأوفياء أكثر ممّا يجذب طلّاب المال.',
      'Countries that pay blood donors collect significantly less than countries where blood is given free, because payment drives away more willing donors than it attracts people after money.'
    ),
    critique: L(
      'الفكرة لريتشارد تيتموس (١٩٧٠)، وقد صمد جزءٌ منها حين اختُبرت. في تجربةٍ ميدانية سويدية (ميلستروم ويوهانسون، ٢٠٠٨) **انخفض عدد المتبرّعات من النساء إلى النصف تقريباً** حين عُرض عليهنّ مال، وعاد حين صار ممكناً التبرّع بالمبلغ لجمعيةٍ خيرية — ولم يتأثّر الرجال. لكن مراجعةً لاحقة نُشرت في «ساينس» (لاسيتيرا وماسيس وسلونيم، ٢٠١٣) وجدت أن **١٨ حافزاً من ١٩** في تجارب ميدانية زادت التبرّع، ومنها بطاقاتٌ شرائية في أوهايو رفعت احتمال تبرّع المتبرّعين السابقين ٢٦٪ (بطاقة ٥ دولارات) و٥٢٪ (بطاقة ١٠ دولارات).',
      'The idea is Richard Titmuss’s (1970), and part of it survived testing. In a Swedish field experiment (Mellström & Johannesson, 2008), **women’s donations fell by almost half** when they were offered money, and recovered when the payment could be given to charity — men were unaffected. But a later review in Science (Lacetera, Macis & Slonim, 2013) found that **18 of 19 incentives** tested in field studies increased donations, including gift cards in Ohio that raised past donors’ likelihood of giving by 26% (a $5 card) and 52% (a $10 card).'
    ),
    response: L(
      'ما يبقى: المال **قد** يطرد الدافع الذي يدفع الناس إلى العطاء، وهذا هو جوهر حجّة الفصل عن القيمتين. أمّا القاعدة العامة بأن الدفع يُنقص الدم دائماً، فالأدلّة الحديثة لا تسندها.',
      'What stands: money **can** crowd out the motive that makes people give, which is the heart of the chapter’s argument about the two kinds of value. The blanket rule that payment always means less blood is not what the recent evidence shows.'
    ),
  },
  { type: 'sources', title: L('اقرأ بنفسك', 'Read it yourself'), items: [
    { label: L('ميلستروم ويوهانسون، «إقصاء الحافز في التبرّع بالدم: هل كان تيتموس محقّاً؟» (٢٠٠٨)', 'Mellström & Johannesson, “Crowding Out in Blood Donation: Was Titmuss Right?” (2008)'),
      publisher: L('مجلّة الجمعية الاقتصادية الأوروبية', 'Journal of the European Economic Association'),
      url: 'https://ideas.repec.org/a/tpr/jeurec/v6y2008i4p845-863.html' },
    { label: L('عرضٌ لدراسة لاسيتيرا وماسيس وسلونيم في «ساينس» (٢٠١٣)', 'On Lacetera, Macis & Slonim in Science (2013)'),
      publisher: L('جامعة جونز هوبكنز', 'Johns Hopkins University'),
      url: 'https://hub.jhu.edu/2013/06/04/blood-donations-economic-incentives/' },
  ] },
]

/* → chapter 7, after Bitcoin. */
export const bitcoinCheck = [
  { type: 'debate',
    critic: CLUB,
    topic: L('متى تكتمل «بيتكوين»؟', 'When does Bitcoin’s supply run out?'),
    claim: L(
      'ينمو عدد وحدات «بيتكوين» ببطء حتى يبلغ حدّه الأقصى — ٢١ مليوناً — في وقتٍ ما من عام ٢٠٣٢.',
      'The number of bitcoins grows slowly until it reaches its maximum — 21 million — some time in 2032.'
    ),
    critique: L(
      'الحدّ الأقصى صحيح: أقلّ بقليلٍ من ٢١ مليوناً. لكن التاريخ لا: مكافأة التعدين **تنقص إلى النصف كلّ ٢١٠ آلاف كتلة، أي كلّ أربع سنين تقريباً**، فيقترب العدد من حدّه دون أن يبلغه قبل زمنٍ طويل. يُقدَّر أن ٩٩٪ منها سيكون قد صدر نحو **٢٠٣٥**، وأن آخر وحدةٍ ستُستخرج نحو **سنة ٢١٤٠**.',
      'The cap is right: slightly under 21 million. The date is not: the mining reward **halves every 210,000 blocks, roughly every four years**, so the total creeps towards its limit without reaching it for a very long time. About 99% will have been issued by around **2035**, and the last fraction of a coin is expected around **2140**.'
    ),
    response: L(
      'ولا يمسّ هذا حجّة الفصل: كمّيةٌ تكاد تثبت، ولا يستطيع أحدٌ أن يزيدها في الأزمة، هي ما يجعل الانكماش أرجح والإنقاذ مستحيلاً.',
      'None of this touches the chapter’s argument: a supply that is all but fixed, which nobody can increase in a crisis, is what makes deflation likelier and a rescue impossible.'
    ),
  },
  { type: 'sources', title: L('اقرأ بنفسك', 'Read it yourself'), items: [
    { label: L('«العرض المضبوط» — جدول إصدار «بيتكوين»', '“Controlled supply” — Bitcoin’s issuance schedule'),
      publisher: L('ويكي بيتكوين', 'Bitcoin Wiki'),
      url: 'https://en.bitcoin.it/wiki/Controlled_supply' },
  ] },
]

/* → chapter 8, after Easter Island. */
export const easterIslandCheck = [
  { type: 'debate',
    critic: CLUB,
    topic: L('هل دمّر سكّان جزيرة الفصح جزيرتهم؟', 'Did Easter Islanders destroy their island?'),
    claim: L(
      'قطع سكّان جزيرة الفصح أشجارها حتى انجرفت التربة وتصحّرت الجزيرة، فاضطرّهم الجوع إلى هجرها، ولم يبقَ منهم إلا تماثيلهم.',
      'Easter Islanders logged their trees until the soil washed away and the island became a desert, so famine forced them to abandon it, leaving only their statues behind.'
    ),
    critique: L(
      'الغابة اختفت فعلاً، لكن قصّة **«الانتحار البيئيّ»** — التي شاعت بكتاب جارد دايموند «الانهيار» — تتراجع أمام الأبحاث الحديثة. لم يهجر الرابانوي جزيرتهم قطّ: كانوا هناك حين وصل الأوروبيون سنة ١٧٢٢، وأحفادهم هناك اليوم. ومسحٌ لحدائقهم الصخرية نُشر سنة ٢٠٢٤ في «ساينس أدفانسز» خلص إلى أن السكّان كانوا **أقلّ عدداً وأكثر استقراراً** ممّا افتُرض، بلا ذروةٍ ثم انهيار، ووجدت دراسةٌ جينية في السنة نفسها ما يؤيّد ذلك. وللدراستين منتقدون يرون أنهما أغفلتا مواقع زراعية أخرى.',
      'The forest did disappear, but the **“ecocide”** story — popularised by Jared Diamond’s Collapse — is giving way to recent research. The Rapanui never abandoned their island: they were there when Europeans arrived in 1722, and their descendants are there today. A survey of their rock gardens published in Science Advances in 2024 concluded the population was **smaller and more stable** than assumed, with no boom and crash, and a genetic study the same year found evidence in the same direction. Both have critics, who argue they missed other farming sites.'
    ),
    response: L(
      'ما يبقى: البشر قادرون على تدمير بيئتهم، والفصل لا يحتاج جزيرة الفصح ليُثبت ذلك — ونهره الخيالي يكفي. أمّا جزيرة الفصح نفسها فقد تكون مثالاً على العكس: شعبٌ تكيّف مع مواردٍ شحيحة.',
      'What stands: humans can destroy their environment, and the chapter doesn’t need Easter Island to show it — its imaginary river is enough. Easter Island itself may be an example of the opposite: a people who adapted to scarce resources.'
    ),
  },
  { type: 'sources', title: L('اقرأ بنفسك', 'Read it yourself'), items: [
    { label: L('«جزيرة الفصح لم تنهَر بسبب الاستنزاف، كما تقترح دراسة» — عن دراسة ديفيس وزملائه (٢٠٢٤)', '“Easter Island did not collapse from overuse of resources after all, study suggests” — on Davis et al. (2024)'),
      publisher: L('مجلّة سميثسونيان', 'Smithsonian Magazine'),
      url: 'https://www.smithsonianmag.com/smart-news/easter-island-did-not-collapse-from-overuse-of-resources-after-all-study-suggests-180984591/' },
  ] },
]
