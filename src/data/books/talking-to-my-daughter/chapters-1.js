/*
 * «الاقتصاد كما أشرحه لابنتي» — chapters 1–4, as panels of «مراجعة الكتاب».
 *
 * VOCABULARY FOLLOWS THE ARABIC EDITION the club reads (عماد شيحة, Dar Al Saqi
 * 2020): الفائض، المسرّات والبضائع، القيمة الاستعمالية والقيمة التبادلية،
 * التسليع، مجتمعات ذات أسواق، مجتمع السوق، قوّة العمل، التسييجات، الانقلاب
 * الكبير، أصحاب المشاريع، إعادة التدوير، المصرف/المصرفيون، الدَّين العام، سوق
 * المال. Names too: السيد نابوك، القبطان كوستاس، باريس، كسينيا. A reader who
 * meets a word here should find the same word on the page in front of them.
 * Chapter titles are the edition's own, read off the scan.
 *
 * Summaries are in the club's words. Quotations are kept to a line, and only
 * where the line itself is the point.
 */
const L = (ar, en) => ({ ar, en })
const img = (f) => `./images/economy/${f}`

/* ===================== Chapter 1 ===================== */
export const inequality = {
  slug: 'inequality',
  icon: '🗺️',
  title: L('١ · لماذا كلّ هذا القدر من اللّامساواة؟', '1 · Why So Much Inequality?'),
  lead: L(
    'سألت كسينيا أباها: لماذا كلّ هذه اللامساواة؟ فأجابها بسؤالٍ أغرب: لماذا غزا البريطانيون أستراليا، ولم يغزُ سكّانها الأصليون إنكلترا؟ والجواب كلمةٌ واحدة: الفائض.',
    'Xenia asked her father why there is so much inequality. He answered with a stranger question: why did the British invade Australia, and not the Aboriginal Australians England? The answer is one word: surplus.'
  ),
  blocks: [
    { type: 'p', text: L(
      'يُولد الأطفال جميعاً عُراة، ثم يُلبَس بعضهم أغلى الثياب ويُترك أكثرهم في الأسمال. من هنا يبدأ فاروفاكيس، ومن سؤالٍ طرحته ابنته وهي مراهقة تعيش في سيدني: **«لماذا كلّ هذه اللامساواة يا أبي؟ أهي البشرية بهذا الغباء؟»**. لم يُرضِها جوابه الأوّل، ولم يُرضِه هو أيضاً، فقرّر أن يكتب لها كتاباً.',
      'Every baby is born naked; soon some are dressed in the finest clothes and most are left in rags. That is where Varoufakis starts, and with a question his daughter asked as a teenager in Sydney: **“Why so much inequality, Dad? Is humanity that stupid?”** His first answer satisfied neither of them, so he wrote her a book.'
    ) },
    { type: 'p', text: L(
      'ويبدأ بسؤالٍ لا يجرؤ عليه المعلّمون: **لماذا لم يُنزل المحاربون الأصليون جيشاً في دوفر ويزحفوا على لندن؟** السؤال خطيرٌ لأن له جوابين كسولين، كلاهما مسموم: إمّا أن الأوروبيين أذكى، وإمّا أن السكّان الأصليين ألطف من أن يغزوا أحداً. والجوابان يقولان الشيء نفسه — أن ثمّة فرقاً فطرياً بين البشر — دون أن يفسّرا شيئاً. ولا شيء يبرّر جرائم المستعمِر أكثر من حجّةٍ كهذه.',
      'He begins with a question no schoolteacher dares ask: **why didn’t Aboriginal warriors land at Dover and march on London?** It is a dangerous question because it has two lazy answers, both poisonous: either the Europeans were smarter, or the Aboriginal people were too nice to invade anyone. Both say the same thing — that there is some innate difference between peoples — while explaining nothing. And nothing excuses a colonist’s crimes better than an argument like that.'
    ) },
    { type: 'image', src: img('first-fleet.webp'), wide: true,
      alt: L('سفنٌ شراعية تدخل خليجاً صخرياً في لوحةٍ ملوّنة', 'Sailing ships entering a rocky harbour, in a coloured print'),
      caption: L('«الأسطول الأوّل يدخل ميناء جاكسون، ٢٦ يناير ١٧٨٨» — طباعةٌ حجرية ملوّنة نُشرت بعد قرنٍ من الحدث. السؤال الذي يفتتح به الكتاب: لماذا جرت الرحلة في هذا الاتجاه، لا في الاتجاه المعاكس؟',
                 '“The First Fleet entering Port Jackson, January 26, 1788” — a chromolithograph published a century later. The question the book opens with: why did the voyage run this way, and not the other?') },

    { type: 'h', text: L('الأسواق شيء، والاقتصاد شيءٌ آخر', 'Markets are one thing, economies another') },
    { type: 'p', text: L(
      'أوّل خطأ يصحّحه الكتاب: الأسواق ليست الاقتصاد. السوق مكانٌ للمبادلة — موزةٌ بتفّاحتين — وقد عرفها أسلافنا قبل أن يزرعوا. أمّا **الاقتصاد** فاحتاج إلى شيءٍ آخر: أن ينتج الإنسان ما لم يكن ليوجد لولا عمله.',
      'The first error the book corrects: markets are not the economy. A market is a place of exchange — a banana for two apples — and our ancestors had them before they ever farmed. An **economy** needed something more: humans producing what would not exist without their labour.'
    ) },

    { type: 'h', text: L('قفزتان كبيرتان: الكلام والفائض', 'Two big leaps: speech and surplus') },
    { type: 'p', text: L(
      'القفزة الأولى قبل عشرات آلاف السنين: الكلام. والثانية قبل اثني عشر ألف عام: **الزراعة**. ولم تكن الزراعة فرحاً ولا اختراعاً واعياً: لجأ إليها البشر لأنهم جاعوا، بعد أن اصطادوا معظم فرائسهم وتكاثروا. وحيث وفّرت الطبيعة طعاماً كافياً — كما في أستراليا — لم يزرع أحد.',
      'The first leap, tens of thousands of years ago: speech. The second, twelve thousand years ago: **farming**. And farming was no joy and no deliberate invention: humans turned to it because they were starving, having hunted down most of their prey and multiplied. Where nature provided enough — as in Australia — nobody farmed.'
    ) },
    { type: 'callout', variant: 'key', title: L('الفائض (Surplus)', 'Surplus'), text: L(
      'ما يبقى من المحصول بعد أن يأكل الناس ويعوّضوا البذار — ما يُدّخر لعامٍ عجاف أو يُزرع لينمو. والصيد وجمع الثمار لا يصنعان فائضاً مهما برع أصحابهما: السمك والأرانب والموز تفسد، أمّا القمح والأرزّ والشعير فتُخزَّن. **من الفائض وُلد كلّ ما يلي.**',
      'What is left of the harvest after people have eaten and set aside seed — saved against a bad year, or sown to grow more. Hunting and gathering make no surplus however skilled the hunters: fish, rabbits and bananas rot, while wheat, rice and barley keep. **Everything that follows was born of the surplus.**'
    ) },
    { type: 'figure', id: 'tdSurplus' },
    { type: 'p', text: L(
      'أوّل الكتابة كان **دفتر حساب**: كم أودع السيد نابوك من القمح في المخزن المشترك. وكان العمّال يُدفع لهم بصَدَفاتٍ نُقش عليها ما يدين به الحاكم لهم من قمحٍ لم يُحصد بعد — فهي دَينٌ ونقدٌ في آن، وعملةٌ «افتراضية» قبل أن تُسكّ أوّل قطعة معدنية. ولكي تُقبل تلك الصَّدَفات احتاج الناس إلى **الثقة** بسلطةٍ تضمنها: ومن هنا الدولة. ومن هنا أيضاً كلمة الائتمان (credit)، من اللاتينية credere: «أن تؤمن».',
      'The first writing was **a ledger**: how much grain Mr Nabuk had left in the common granary. Workers were paid in shells engraved with the grain the ruler owed them from a harvest not yet in — a debt and a currency at once, “virtual” money before a single coin was struck. For those shells to be accepted people needed **faith** in a power that guaranteed them: hence the state. And hence the word credit, from the Latin credere: “to believe”.'
    ) },
    { type: 'p', text: L(
      'ثم احتاج الفائض إلى من يديره ويحرسه — موظّفين وشرطةً وجيشاً — وإلى من يُقنع الأكثرية المعدمة بأن توزيعه الجائر **نظامٌ إلهيّ**، فلا تثور على أقلّيةٍ أضعف منها عدداً. ولهذا ظلّت الدولة والكهنوت شيئاً واحداً آلاف السنين. وفي مخازن القمح والمدن المكتظّة بلا صرفٍ صحّي تكاثرت الجراثيم؛ اكتسب أهلها مناعةً على أجيال، وصارت مصافحتهم تقتل شعوباً لم تعرفها — في أستراليا والأمريكتين مات من الأمراض أكثر ممّن ماتوا بالرصاص.',
      'Then the surplus needed people to manage and guard it — officials, police, an army — and people to persuade the destitute majority that its unequal sharing was **a divine order**, so that they would not rise against a minority they far outnumbered. That is why state and clergy were one and the same for thousands of years. And in granaries and crowded towns without sewers, germs multiplied; their people grew resistant over generations, and their handshake killed peoples who had never met them — in Australia and the Americas, more died of disease than of bullets.'
    ) },

    { type: 'h', text: L('إذن: لماذا لم يحدث العكس؟', 'So: why not the other way round?') },
    { type: 'p', text: L(
      'لا علاقة للأمر بالحمض النووي. في أوراسيا فرض المناخ والحاجة زراعةً وفائضاً كبيرين، ومعهما دولٌ وجيوشٌ وسفنٌ وبنادق — وجراثيم. أمّا في أستراليا فكان ثلاثة أو أربعة ملايين إنسان يعيشون في توازنٍ مع قارّةٍ بحجم أوروبا، طعامهم وفير، فلم يحتاجوا إلى الزراعة. كان لديهم شعرٌ وموسيقى وأساطير عظيمة القيمة، لكن لا شيء ممّا يحتاجه المرء ليغزو غيره أو يصدّ غازياً.',
      'It has nothing to do with DNA. In Eurasia, climate and need forced large-scale farming and surplus, and with them states, armies, ships and guns — and germs. In Australia, three or four million people lived in balance with a continent the size of Europe, with plenty to eat, and so never needed to farm. They had poetry, music and myths of tremendous value, but nothing it takes to invade others or to repel an invader.'
    ) },
    { type: 'p', text: L(
      'وماذا عن أفريقيا؟ انظر إلى الخريطة: أوراسيا تمتدّ **شرقاً وغرباً**، من الأطلسي إلى المحيط الهادئ، فتبقى في مناخاتٍ متقاربة، وينتقل القمح فيها من لشبونة إلى شنغهاي. وأفريقيا تمتدّ **شمالاً وجنوباً**، من المتوسّط عبر خطّ الاستواء والصحراء إلى الجنوب المعتدل، فلا تنتقل المحاصيل في مناخاتها المتعاقبة. **الجغرافيا، لا الجينات**، هي التي قرّرت من سيستعمر من.',
      'And Africa? Look at a map: Eurasia runs **east to west**, Atlantic to Pacific, staying in similar climates, so wheat travels from Lisbon to Shanghai. Africa runs **north to south**, from the Mediterranean across the equator and the Sahara to the temperate south, so crops cannot travel through its succession of climates. **Geography, not genes**, decided who would colonise whom.'
    ) },
    { type: 'imggrid', images: [
      { src: img('guns-germs-steel-ar.webp'), alt: L('غلاف الطبعة العربية من «أسلحة، جراثيم، وفولاذ»', 'Cover of the Arabic edition of Guns, Germs and Steel'),
        caption: L('**«أسلحة، جراثيم، وفولاذ»** لجارد دايموند بالعربية. يقول فاروفاكيس في مقدّمته إن هذا الفصل كلّه قائمٌ عليه.',
                   '**Guns, Germs and Steel** by Jared Diamond, in Arabic. Varoufakis says in his preface that this whole chapter rests on it.') },
      { src: img('guns-germs-steel-en.webp'), alt: L('غلاف الطبعة الإنجليزية من «أسلحة، جراثيم، وفولاذ»', 'Cover of Guns, Germs and Steel'),
        caption: L('الأصل الإنجليزي، ١٩٩٧.', 'The English original, 1997.') },
    ] },

    { type: 'h', text: L('نوعٌ آخر من اللامساواة', 'Another kind of inequality') },
    { type: 'p', text: L(
      'الجغرافيا تفسّر لماذا اغتنت بلدانٌ وافتقرت أخرى، لكنها لا تفسّر اللامساواة **داخل** البلد الواحد. هنا تعمل آلية الفائض نفسها: من وضع يده عليه نال سلطةً سياسية وثقافية يستعملها ليحصل على حصّةٍ أكبر منه. اسأل أيّ رجل أعمال: أن تجني مليوناً وأنت تملك ملايين أسهل بكثير من أن تجني ألفاً وأنت لا تملك شيئاً. هكذا تتكاثر **الأوليغارشية** — «حكم القلّة» باليونانية.',
      'Geography explains why some countries grew rich and others poor, but not inequality **within** a country. There the same surplus mechanism works: whoever controls it gains political and cultural power, which they use to take a bigger share of it. Ask any businessman: making a million when you already have several is far easier than making a thousand when you have nothing. That is how **oligarchy** — Greek for “rule by the few” — reproduces itself.'
    ) },

    { type: 'h', text: L('«أملكه، إذن أستحقّه»', '“I have it, so I deserve it”') },
    { type: 'p', text: L(
      'ويختم الفصل بملاحظةٍ موجّهة إلى ابنته وإلينا: عقولنا تساوي تلقائياً بين «أملك» و«أستحقّ». نغضب لطفلٍ ينام جائعاً، ولا نخطر ببالنا أن حرمانه وبحبوحتنا قد يكونان ثمرة العملية نفسها. لا تقسُ على من يصدّقون ذلك — لكن **اقسُ على نفسك** حين تغريك فكرة أن اللامساواة الفاحشة أمرٌ لا مفرّ منه. احتفظ بغضبك، واستثمره بحكمة.',
      'The chapter ends with a note to his daughter and to us: our minds automatically equate “I have” with “I deserve”. We are outraged by a child who goes to bed hungry, without for a moment considering that their deprivation and our comfort may be products of the same process. Don’t be too hard on those who believe it — but **be hard on yourself** when you are tempted to think that outrageous inequality is unavoidable. Keep your outrage, and invest it wisely.'
    ) },
  ],
}

/* ===================== Chapter 2 ===================== */
export const marketSociety = {
  slug: 'market-society',
  icon: '🌤️',
  title: L('٢ · ولادة مجتمع السوق', '2 · The Birth of the Market Society'),
  lead: L(
    'غروب الشمس، ودعابات صديق، وغطسةٌ في البحر لأن صيّاداً عجوزاً طلبها — أشياء لا ثمن لها. فكيف صار كلّ شيءٍ تقريباً بضاعةً تُشترى وتُباع؟',
    'A sunset, a friend’s jokes, a dive into the sea because an old fisherman asked — things with no price. So how did almost everything become a commodity to be bought and sold?'
  ),
  blocks: [
    { type: 'p', text: L(
      'مساءٌ صيفيّ في جزيرة إيجينا: يفسد الأب على ابنته لحظة الغروب بشرحٍ علميّ عن لون الشمس، ثم يُضحكهم الصغير باريس في المطعم، ثم يطلب القبطان كوستاس من كسينيا أن تغطس لتُدخل حبلاً في سلسلة مرساته العالقة — فتغطس فخورةً بأنها بطلة اللحظة. هذه كلّها **مسرّات (goods)**: تملأ الحياة بسعادةٍ عميقة، ولم يُصنع أيٌّ منها ليُباع.',
      'A summer evening on Aegina: a father ruins his daughter’s sunset with a scientific explanation of its colour; little Paris has everyone laughing at the taverna; then Captain Kostas asks Xenia to dive and thread a rope through his snagged anchor chain — and she dives, proud to be the heroine of the moment. All of these are **goods** in the old sense: they fill life with deep happiness, and none was made to be sold.'
    ) },

    { type: 'h', text: L('نوعان من القيمة', 'Two kinds of value') },
    { type: 'p', text: L(
      'وفي المقابل **البضائع (commodities)**: ما يُنتج لكي يُباع. وللأشياء قيمتان: **القيمة الاستعمالية** — ما تعنيه التجربة نفسها — و**القيمة التبادلية**، أي ثمنها في السوق. ادفع لـ«أبل» أكثر تصنع أكثر؛ لكن ادفع لباريس عن كلّ ضحكة فيرتبك ويجفّ ظُرفه، واعرض على كسينيا خمسة يوروهات لتغطس فقد لا تقفز أصلاً: **المال قد يطرد القيمة التي جعلت الفعل يستحقّ العناء.** وإن احترف باريس الكوميديا يوماً صارت نكاته بضاعة، لكنها قبل ذلك شيءٌ آخر.',
      'Opposite them are **commodities**: things produced in order to be sold. Things carry two values: **experiential value** — what the experience itself means — and **exchange value**, their price in a market. Pay Apple more and it makes more; but pay Paris per laugh and he freezes up, offer Xenia five euros to dive and she might not jump: **money can drive out the very value that made an act worth doing.** If Paris becomes a professional comedian one day his jokes turn into commodities — but until then they are something else.'
    ) },
    { type: 'figure', id: 'tdTwoValues' },
    { type: 'p', text: L(
      'ومثاله الأشهر سوق الدم: يقول الكتاب إن البلدان التي تدفع للمتبرّعين تجمع دماً أقلّ من تلك التي يُتبرَّع فيها مجاناً، لأن الدفع يطرد من يتبرّعون بدافع النجدة أكثر ممّا يجذب من يريدون المال. ويستعير من أوسكار وايلد وصفه للمتهكّم: من **يعرف ثمن كلّ شيء ولا يعرف قيمة أيّ شيء** — ومجتمعاتنا تجعلنا جميعاً كذلك.',
      'His best-known example is the market for blood: the book says countries that pay donors collect less blood than those where it is given free, because payment drives away more people who give out of solidarity than it attracts people who want money. And he borrows Oscar Wilde’s cynic, who **knows the price of everything and the value of nothing** — which, he says, our societies make of us all.'
    ) },

    { type: 'h', text: L('تسليع كلّ شيء', 'The commodification of everything') },
    { type: 'p', text: L(
      'يوم أحد الفصح، بعد يومين من الطبخ، يطلب الأب من ابنته أن تساعده في الترتيب، فتعرض أن تدفع له من حصّالتها لتُعفى. لا ثمن يعوّض خيبته. فالعائلات والأصدقاء يتبادلون العمل لكن **لا كما في السوق**: تبادلٌ شخصيّ دافئ، لا معاملةٌ عابرة باردة كنقرةٍ على «أمازون». وكلمة «اقتصاد» نفسها من اليونانية: «أويكونوميا»، أي قوانين إدارة البيت (oikos). ثم خرج الإنتاج من البيت، حتى صارت للبذور والجينات والأرحام المؤجَّرة قيمةٌ تبادلية — والأدقّ أن نسمّي ما نعيشه «أغورانوميا»: قوانين السوق.',
      'Easter Sunday, after two days of cooking, the father asks his daughter to help tidy up, and she offers to pay him from her piggy bank to be let off. No price could make up for his disappointment. Families and friends do exchange labour, but **not as a market does**: warm, personal exchange, not a cold, passing transaction like a click on Amazon. The word “economy” itself is Greek: oikonomia, the laws of running a household (oikos). Then production left the household, until seeds, genes and rented wombs acquired exchange value — and what we live in would more honestly be called “agoranomy”: the laws of the marketplace.'
    ) },

    { type: 'h', text: L('عالمٌ خارج منطق السوق', 'A world outside the logic of markets') },
    { type: 'p', text: L(
      'في إلياذة هوميروس يُضرب أخيل عن القتال لأن أغاممنون استولى على غنيمته — ولم يخطر لأغاممنون أن يعرض عليه مالاً، فذلك كان سيضاعف الإهانة. وحين تنازع أياكس وأوديسيوس على سلاح أخيل، احتكما إلى الحجّة لا إلى المزاد: من يفوز بالمال لا بالجدارة يتذكّر هزيمته كلّما نظر إلى السلاح. هذا هو الفرق بين **مجتمعات ذات أسواق** — عرفت التجارة لكن لم يحكمها منطقها — وبين **مجتمع السوق** الذي نعيش فيه، حيث تسود القيمة التبادلية.',
      'In Homer’s Iliad, Achilles goes on strike because Agamemnon took his spoils — and it never occurs to Agamemnon to offer him money, which would only have doubled the insult. When Ajax and Odysseus fought over Achilles’ armour, they settled it by argument, not by auction: whoever won by money rather than merit would be reminded of his failure every time he looked at the arms. That is the difference between **societies with markets** — which traded, but were not ruled by trade’s logic — and the **market society** we live in, where exchange value reigns.'
    ) },

    { type: 'h', text: L('كيف وُلد مجتمع السوق؟', 'How market societies were born') },
    { type: 'p', text: L(
      'للإنتاج ثلاثة عناصر: **وسائل إنتاجٍ مُنتَجة** (أدوات وآلات ومبانٍ)، و**الأرض**، و**العمل**. وفي العصور السابقة لم يكن أيٌّ منها بضاعة: القنّ يعمل ولا يبيع عمله، والسيّد يأخذ حصّته بالقوّة لا بالأجر، والأرض لا تُباع — من باع أرض أجداده جلب العار. وُلد مجتمع السوق حين صارت الثلاثة بضائع لها أسعار. وهذا ما يسمّيه، مستعيراً من كارل بولاني، **«التحوّل الكبير»**.',
      'Production needs three things: **produced means of production** (tools, machines, buildings), **land**, and **labour**. In earlier ages none of them was a commodity: the serf worked without selling his labour, the lord took his share by force rather than wages, and land was not for sale — selling your ancestors’ acres was a disgrace. Market society was born when all three became commodities with prices. This is what, borrowing from Karl Polanyi, he calls **the Great Transformation**.'
    ) },
    { type: 'h4', text: L('التجارة العالمية والتسييجات', 'Global trade and the enclosures') },
    { type: 'p', text: L(
      'بدأت القصّة في البحر: سفنٌ أفضل، وبوصلةٌ صينية، وطرقٌ بحرية جديدة، فصار الصوف الإنجليزي والحرير الصيني والتوابل سلعاً عالمية لها سعرٌ دوليّ. رأى الملّاك الإنجليز التجّارَ يثرون، فقرّروا اللحاق بهم: ما فائدة شمندر الأقنان في السوق العالمية؟ لا شيء. فسيّجوا أراضيهم وطردوا الأقنان وأحلّوا محلّهم الخراف، لأن صوفها يُباع في العالم. هذه **التسييجات (Enclosures)**: من أعنف التحوّلات في تاريخ البشر، وأنجعها.',
      'It began at sea: better ships, a Chinese compass, new sea routes — and English wool, Chinese silk and spices became global goods with an international price. English landowners watched merchants grow rich and decided to join them: what was a serf’s beetroot worth on the world market? Nothing. So they fenced their estates, evicted the serfs and put sheep in their place, because wool sold worldwide. These were **the enclosures**: one of the most violent transformations in human history, and one of the most effective.'
    ) },
    { type: 'p', text: L(
      'وهكذا وُلد السوقان معاً. القنّ المطرود على طريقٍ موحل لا يملك إلا قوّة عمله، فيطرق أوّل باب: «أعمل أيّ شيءٍ مقابل خبزٍ ومأوى» — هذه ولادة **سوق العمل**. والملّاك أدركوا أن بوسعهم تأجير الأرض بسعرٍ يحدّده سعر الصوف العالميّ — وهذه ولادة **سوق الأرض**. صار الجميع تجّاراً من نوعٍ ما: معظمهم يبيعون عرق جبينهم، وقليلٌ منهم مستأجرون يرتعبون من تقلّب سعر الصوف.',
      'And so both markets were born together. The evicted serf on a muddy road owns nothing but his labour, so he knocks on the first door: “I’ll do anything for bread and shelter” — the birth of **the labour market**. The landowners realised they could rent out land at a price set by the world price of wool — the birth of **the land market**. Everyone became a merchant of some kind: most sold the sweat of their backs, a few became tenants terrified of the price of wool.'
    ) },
    { type: 'callout', variant: 'note', title: L('من خارج الكتاب: شاهدٌ من القرن السادس عشر', 'From outside the book: a witness from the sixteenth century'), text: L(
      'قبل فاروفاكيس بنحو خمسة قرون رأى **توماس مور** التسييجات بعينيه. في «يوتوبيا» (١٥١٦) يقول أحد شخوصه إن الخراف، التي كانت وديعةً تكتفي بالقليل، صارت شرهةً حتى إنها **تأكل البشر أنفسهم** وتخرّب الحقول والبيوت والمدن. العبارة من أشهر ما كُتب عن هذا التحوّل وهو يحدث.',
      'Some five centuries before Varoufakis, **Thomas More** watched the enclosures happen. In Utopia (1516) one of his characters says that sheep, once so meek and so easily fed, had become so greedy that they **devour men themselves** and lay waste fields, houses and towns. It is one of the best-known lines ever written about this transformation while it was under way.'
    ) },
    { type: 'imggrid', images: [
      { src: img('utopia-ar.webp'), alt: L('غلاف الطبعة العربية من «يوتوبيا»', 'Cover of the Arabic edition of Utopia'),
        caption: L('**«يوتوبيا»** لتوماس مور بالعربية.', '**Utopia** by Thomas More, in Arabic.') },
      { src: img('utopia-en.webp'), alt: L('غلاف «يوتوبيا»', 'Cover of Utopia'),
        caption: L('الأصل اللاتيني ١٥١٦؛ وهذه طبعةٌ إنجليزية.', 'The Latin original dates from 1516; this is an English edition.') },
    ] },
    { type: 'h4', text: L('المصانع: مختبرات التاريخ الرمادية', 'Factories: history’s grey laboratories') },
    { type: 'p', text: L(
      'كانت المكوّنات جاهزة، وجاءت الحرارة في النصف الثاني من القرن الثامن عشر: **محرّك جيمس واط البخاري**، والمصانع ذات المداخن السوداء — «طواحين الشيطان المظلمة» كما سمّاها ويليام بليك. ولماذا بريطانيا؟ يرجّح الكتاب ثلاثة أسباب: ملّاكها لا يملكون جيوشاً خاصّة فيغتنون بالنهب، وملكٌ قويّ يرسل جيشه لقمع الأقنان الرافضين للطرد، وأرضٌ مركّزة في أيدي قلّةٍ يكفي اتّفاقها.',
      'The ingredients were in place, and the heat came in the second half of the eighteenth century: **James Watt’s steam engine**, and factories with black chimneys — the “dark satanic mills” of William Blake. Why Britain? The book favours three reasons: its landowners had no private armies to grow rich by plunder; a strong monarch sent troops to crush serfs who resisted eviction; and land was concentrated in few enough hands that their agreement was enough.'
    ) },
    { type: 'h4', text: L('التناقض الكبير', 'The Great Contradiction') },
    { type: 'p', text: L(
      'انتصار القيمة التبادلية غيّر العالم إلى الأفضل والأسوأ معاً. انتهت عبودية الأرض، ووُلد مفهومٌ جديد للحرّية، وصار ممكناً أن يُنتج ما يكفي الجميع. لكن الحرّية جاءت بقيودٍ جديدة: العامل حرّ ما دام يجد من يشتري عمله، وإلا فهو حرٌّ في أن يتشرّد. أربع عشرة ساعة عملٍ في اليوم، وأطفالٌ في العاشرة مقيّدون إلى الآلات، ونساءٌ حوامل في المناجم — وعبيدٌ مخطوفون من أفريقيا في المستعمرات. **ثروةٌ لا يتخيّلها عقل، وبؤسٌ لا يوصف، في آنٍ واحد.**',
      'The triumph of exchange value changed the world for the better and the worse at once. Serfdom ended, a new idea of freedom was born, and producing enough for everyone became possible. But the freedom came with new chains: the worker was free so long as someone bought his labour, and otherwise free to be homeless. Fourteen-hour days, ten-year-olds chained to engines, pregnant women in the mines — and slaves abducted from Africa in the colonies. **Unimaginable wealth and unspeakable suffering, side by side.**'
    ) },
    { type: 'p', text: L(
      'وفي هذا الانقلاب صار المال **غايةً** بعد أن كان وسيلة. لم يكن السيّد الإقطاعيّ ليبيع قصره مهما عُرض عليه؛ أمّا اليوم فلا قصر ولا لوحة ولا يخت إلا ويُباع إن ناسب السعر. الطمع قديم، أمّا **دافع الربح** فاختراعٌ حديث — وقد جاء، كما في الفصل التالي، مقترناً بدورٍ جديد للدَّين.',
      'In this reversal money became **an end** rather than a means. A feudal lord would never sell his castle whatever he was offered; today there is hardly a castle, painting or yacht that won’t be sold at the right price. Greed is ancient; **the profit motive** is a recent invention — and it arrived, as the next chapter shows, hand in hand with a new role for debt.'
    ) },
  ],
}

/* ===================== Chapter 3 ===================== */
export const debtProfit = {
  slug: 'debt-profit',
  icon: '🔗',
  title: L('٣ · زواج الدَّين والربح', '3 · The Marriage of Debt and Profit'),
  lead: L(
    'فاوست يوقّع بدمه عقداً مع الشيطان: أربعٌ وعشرون سنةً من السلطة والمتعة، وروحه هي الفائدة. يقول فاروفاكيس إن هذه ليست حكاية رعب — إنها حكاية دَين.',
    'Faustus signs a contract with the devil in his own blood: twenty-four years of power and pleasure, with his soul as the interest. This, Varoufakis says, is not a horror story — it is a story about debt.'
  ),
  blocks: [
    { type: 'p', text: L(
      'في مسرحية **كريستوفر مارلو** «الدكتور فاوست» يعرض الشيطان ميفستوفيليس على العالِم أربعاً وعشرين سنةً من السلطة المطلقة والمتعة، على أن يسلّمه روحه بعدها. يقبل فاوست، ويوقّع العقد بدمه. لماذا لم يقرأ الأب هذه الحكاية لابنته صغيرة؟ لا لأنها مرعبة — فحكايات الأخوين غريم أفظع — بل لأن موضوعها لا يليق بالأطفال: **الدَّين**.',
      'In **Christopher Marlowe’s** play Doctor Faustus, the devil Mephistopheles offers the scholar twenty-four years of absolute power and pleasure, after which he must hand over his soul. Faustus agrees, and signs the contract in his own blood. Why didn’t the father read his daughter this story when she was small? Not because it is frightening — the Brothers Grimm are worse — but because its subject is unfit for children: **debt**.'
    ) },
    { type: 'image', src: img('mephistopheles-delacroix.webp'), wide: true,
      alt: L('شيطانٌ مجنّح يطير فوق مدينةٍ ذات أبراج', 'A winged devil flying above a city of spires'),
      caption: L('ميفستوفيليس يطير فوق المدينة — طباعةٌ حجرية لأوجين دولاكروا (١٨٢٨) ضمن رسومه لـ«فاوست» غوته.',
                 'Mephistopheles flying over the city — a lithograph by Eugène Delacroix (1828), from his illustrations for Goethe’s Faust.') },

    { type: 'h', text: L('دَين الجيران، ودَين العقود', 'Neighbours’ debts and contract debts') },
    { type: 'p', text: L(
      'الناس يستدينون منذ الأزل: يساعدك جارك فتقول «لك عندي واحدة»، ويُردّ المعروف يوماً بلا ورق. لكن دَين اليوم يختلف بأمرين: **العقد** الذي يحوّل المعروف إلى التزامٍ قانونيّ بقيمٍ تبادلية، و**الفائدة (Interest)** — ما يدفعه المدين فوق أصل القرض. في التضامن تكسب الشعور بأنك أحسنت، كما في غطسة كسينيا؛ وفي العقد تكسب فائضاً من القيمة التبادلية.',
      'People have always owed each other: a neighbour helps you out and you say “I owe you one”, and the favour is returned one day with no paperwork. But today’s debt differs in two ways: **the contract**, which turns a favour into a legal obligation priced in exchange values, and **interest** — what the debtor pays on top of the loan. In solidarity you earn the glow of having done right, as with Xenia’s dive; in a contract you earn a surplus of exchange value.'
    ) },

    { type: 'h', text: L('الانقلاب الكبير', 'The Great Reversal') },
    { type: 'p', text: L(
      'في الإقطاع كان التسلسل: **إنتاجٌ ثم توزيعٌ ثم دَين.** الأقنان يزرعون، والسيّد يأخذ حصّته، ثم يبيع ما فضل ويُقرض به. ومع تسليع الأرض والعمل انقلب الترتيب: القنّ السابق الذي صار مستأجراً وصاحب مشروع يحتاج إلى مالٍ قبل أن يملك شيئاً — للإيجار والأجور والبذار — فيقترض أوّلاً. وصار الإيجار والأجور والفائدة تُحسم **قبل** الإنتاج. الوحيد الذي لا يعرف ما سيبقى له في النهاية هو صاحب المشروع نفسه.',
      'Under feudalism the order ran: **production, then distribution, then debt.** Serfs farmed, the lord took his share, then sold what was left and lent from it. Once land and labour became commodities the order flipped: the former serf, now a tenant and an entrepreneur, needs money before he owns anything — rent, wages, seed — so he borrows first. Rent, wages and interest were fixed **before** production. The only person who doesn’t know what he will be left with is the entrepreneur himself.'
    ) },
    { type: 'figure', id: 'tdGreatReversal' },
    { type: 'p', text: L(
      'هكذا صار **الربح** شرطاً للبقاء لا ترفاً: إن هبط سعر الصوف أو ضربت الطبيعةُ المحصول، جاع صاحب المشروع وغرق في دَينٍ لا يُسدَّد — عبداً لالتزاماته، تماماً كفاوست.',
      'That is how **profit** became a condition of survival, not a luxury: if the price of wool fell or nature struck the harvest, the entrepreneur went hungry and sank into unpayable debt — a slave to his obligations, just like Faustus.'
    ) },

    { type: 'h', text: L('الثروة والمنافسة', 'Wealth and competition') },
    { type: 'p', text: L(
      'تخيّل حوض استحمام: الماء الداخل من الصنبور إيرادات المشروع، والخارج من البالوعة نفقاته؛ والفرق يرفع منسوب الثروة. الأرستقراطيّ كان مضموناً بالسياسة والقانون والعرف، فلم يحتج إلى تحسين أدواته. أمّا صاحب المشروع فلا يضمنه أحد، وأيّ أحدٍ يستطيع أن يصير صاحب مشروع إن استدان — فاشتعلت **المنافسة**: من يبيع أرخص يكسب الزبائن، ومن يدفع أجوراً أقلّ يربح أكثر، ومن يرفع إنتاجية العمل أسرع يفوز بالسباقين. هكذا دخل محرّك واط الورش.',
      'Picture a bathtub: water from the tap is the business’s revenue, water down the plughole its costs, and the difference raises the level of wealth. The aristocrat was protected by politics, law and custom, so he never needed better tools. The entrepreneur was protected by no one, and anyone could become one by borrowing — so **competition** caught fire: whoever sold cheapest won customers, whoever paid least gained most, and whoever raised labour’s productivity fastest won both races. That is how Watt’s engine got into the workshops.'
    ) },
    { type: 'quote', text: L(
      '«الدَّين لمجتمعات السوق كالجحيم للمسيحية: مزعجٌ، لكن لا غنى عنه.»',
      '“Debt is to market societies what hell is to Christianity: unpleasant yet indispensable.”'
    ) },
    { type: 'p', text: L(
      'ويقولها صراحة: **الدَّين، لا الفحم، هو الوقود الحقيقي للثورة الصناعية.** كلّ الثروة التي لا يتخيّلها عقل، والتي خُلقت في القرون الثلاثة الماضية، تدين بوجودها في النهاية للدَّين.',
      'He puts it plainly: **debt, not coal, was the real fuel of the Industrial Revolution.** All the unimaginable wealth created over the past three centuries ultimately owes its existence to debt.'
    ) },

    { type: 'h', text: L('فاوست مارلو وفاوست غوته', 'Marlowe’s Faustus and Goethe’s Faust') },
    { type: 'p', text: L(
      'كتب مارلو مسرحيته أواخر القرن السادس عشر، وكتب **غوته** «فاوست» مطلع القرن التاسع عشر. وبين النسختين فرقٌ يكشف الكثير: فاوست مارلو يُساق إلى الجحيم عند منتصف الليل وهو يتوسّل، أمّا فاوست غوته فينقذه الملائكة لأنه كفّر عن ذنبه بأعمالٍ صالحة. ولاحظ أن المصرفيين يسمّون سداد الدَّين مع فائدته **«الافتداء» (redemption)** — والكلمة نفسها تعني الخلاص.',
      'Marlowe wrote his play at the end of the sixteenth century; **Goethe** wrote Faust at the dawn of the nineteenth. The difference between them reveals a great deal: Marlowe’s Faustus is dragged to hell at midnight, begging; Goethe’s Faust is saved by angels, having atoned through good deeds. And note that bankers call repaying a debt with interest **“redemption”** — the same word that means salvation.'
    ) },
    { type: 'p', text: L(
      'في زمن مارلو كان المسيحيون يعدّون أخذ الفائدة على الدَّين خطيئةً اسمها **الربا (usury)** — كما يحرّمه الإسلام إلى اليوم — فطالب الجمهور بعقاب من دفع للشيطان أقصى فائدة: روحه. وبين المسرحيّتين انتقلت أوروبا من مجتمعاتٍ ذات أسواق إلى مجتمع السوق، وهذا الانتقال ما كان ليحدث دون رفع التحريم. وكان **البروتستانت** حاسمين في ذلك: جعلوا الفرد المستقلّ عمادَ كنيستهم، فصار التاجر وصاحب المشروع بطلهم، واحتضنت أخلاقهم الجديدة القرض بفائدة.',
      'In Marlowe’s day Christians held that taking interest on a debt was a sin called **usury** — as Islam forbids it to this day — so audiences demanded punishment for a man who paid the devil the ultimate interest: his soul. Between the two plays Europe moved from societies with markets to a market society, and that move could not have happened without lifting the ban. The **Protestants** were decisive: they made the autonomous individual the pillar of their church, so the merchant and the entrepreneur became their hero, and their new ethic embraced lending at interest.'
    ) },
    { type: 'imggrid', images: [
      { src: img('faust-ar.webp'), alt: L('غلاف الطبعة العربية من «فاوست» لغوته', 'Cover of the Arabic edition of Goethe’s Faust'),
        caption: L('**«فاوست»** ليوهان فولفغانغ فون غوته بالعربية.', '**Faust** by Johann Wolfgang von Goethe, in Arabic.') },
      { src: img('faust-en.webp'), alt: L('غلاف «فاوست» لغوته', 'Cover of Goethe’s Faust'),
        caption: L('صدر جزؤه الأوّل ١٨٠٨ والثاني ١٨٣٢ — وفي الثاني يُنقذ فاوست.', 'Part One appeared in 1808 and Part Two in 1832 — and in Part Two, Faust is saved.') },
    ] },
    { type: 'h4', text: L('فاوست أم سكروج؟', 'Faust or Scrooge?') },
    { type: 'p', text: L(
      'ثم يقارن فاوست بـ**إبنيزر سكروج**، بخيل تشارلز ديكنز في «ترنيمة عيد الميلاد»، الذي يكدّس الفوائد ولا يُنفق، حتى يرى موته الوحيد فيتوب ويبدأ بالإنفاق. أيّهما يناسب مجتمع السوق؟ **فاوست**: يقترض ويتمتّع اليوم ويدفع فائدةً باهظة غداً. فلو صار الناس كلّهم سكروج يدّخرون ولا يقترضون، لتوقّف الاقتصاد تماماً.',
      'Then he sets Faust against **Ebenezer Scrooge**, Charles Dickens’s miser in A Christmas Carol, who piles up interest and spends nothing until he is shown his own lonely death, repents and starts to spend. Which suits a market society? **Faust**: borrow, enjoy today, pay hefty interest tomorrow. If everyone were a Scrooge, saving and never borrowing, the economy would come to a complete standstill.'
    ) },
    { type: 'linkcards', title: L('للتوسّع: ماذا عن الربا اليوم؟', 'To go further: and riba today?'), links: [
      { to: '/book/talking-to-my-daughter/debt-usury', icon: '⚖️', label: L('الدَّين والربا والأنظمة الثلاثة — ملخّصٌ مرافق من النادي', 'Debt, Usury and the Three Systems — a club companion') },
    ] },
  ],
}

/* ===================== Chapter 4 ===================== */
export const banking = {
  slug: 'banking',
  icon: '🌀',
  title: L('٤ · سحر الأعمال المصرفية الأسود', '4 · The Black Magic of Banking'),
  lead: L(
    'من أين يأتي المصرف بنصف المليون الذي يُقرضه؟ ليس من ودائع الآخرين: من العدم. وهذا السحر نفسه هو الذي يبني الثروة ويهدمها.',
    'Where does the bank find the half-million it lends? Not from other people’s savings: from thin air. And the same magic that builds the wealth is what brings it crashing down.'
  ),
  blocks: [
    { type: 'p', text: L(
      'الاقتصاد كالنظام البيئيّ يعيش على **إعادة التدوير**: العمّال يُنفقون أجورهم في المتاجر، والمتاجر تدفع منها الأجور. وحين تتعطّل الدورة يحلّ التصحّر. في «عناقيد الغضب» لجون شتاينبك تُرمى أطنان البطاطا في النهر ويُرشّ البرتقال بالكيروسين بينما الملايين جياع — والغضب في نفوس الناس ينضج كعنقودٍ على الكرمة.',
      'An economy, like an ecosystem, lives on **recycling**: workers spend their wages in shops, and shops pay wages out of the takings. When the cycle breaks, desertification follows. In John Steinbeck’s The Grapes of Wrath, tons of potatoes are dumped in the river and oranges sprayed with kerosene while millions go hungry — and the wrath in people’s souls ripens like grapes on the vine.'
    ) },

    { type: 'h', text: L('أصحاب المشاريع مسافرون عبر الزمن', 'Entrepreneurs as time travellers') },
    { type: 'p', text: L(
      'صاحب المشروع الذي يقترض لا يأخذ مالاً من مُقرضه فحسب: إنه **يسحب قيمةً تبادلية من المستقبل إلى الحاضر**. يمدّ يده عبر غشاءٍ شفّاف إلى زمنٍ لم يأتِ، ويقبض على قيمةٍ لم تُنتج بعد. فإن صدقت رؤيته وباع صوفه كما توقّع، سدّد. وإن أخطأ، «أفسد الخطّ الزمني» — وأفلس.',
      'An entrepreneur who borrows is not just taking a lender’s money: he is **pulling exchange value from the future into the present**. He reaches through a semi-transparent membrane into a time not yet come and grabs value not yet produced. If he has read the future right and his wool sells as expected, he repays. If not, he has “disturbed the timeline” — and goes bust.'
    ) },

    { type: 'h', text: L('المصرفيون وكلاء سفر', 'Bankers as travel agents') },
    { type: 'p', text: L(
      'يظنّ أكثر الناس أن المصرف وسيط: يأخذ ودائع المدّخرين ويُقرضها ويربح الفرق بين الفائدتين. هكذا بدأت المصارف فعلاً، لكن هذا ليس ما يشغلها اليوم. **مريم** تصنع الدرّاجات وتطلب قرضاً بنصف مليون جنيه لتشتري آلةً تصنع الإطارات من ألياف الكربون. من أين يأتي المصرفيّ بالمبلغ؟ **من العدم**: يكتب خمسةً وبعدها خمسة أصفار بجانب اسمها. هكذا يُخلق نصف مليون جنيه بضغطة زرّ.',
      'Most people think a bank is a go-between: it takes savers’ deposits, lends them on and profits from the gap between two interest rates. That is how banking began, but it is not what keeps bankers busy today. **Miriam** makes bicycles and asks for a £500,000 loan to buy a machine that builds carbon-fibre frames. Where does the banker find the money? **From thin air**: he types a five followed by five zeros next to her name. Half a million pounds, created at the press of a key.'
    ) },
    { type: 'p', text: L(
      'ويستشهد الكتاب باقتصاديٍّ لامع — وهو جون كينيث غالبريث — قال إن الطريقة التي تخلق بها المصارف المال **«بسيطةٌ إلى حدٍّ ينفر منه العقل»**. وما يحدث فعلاً أن المصرف جلس مريمَ الحاضرة أمام غشاء الزمن، وجعلها تقترض من مريمَ المستقبل — صاحبة شركة الدرّاجات الناجحة — مقابل فائدةٍ ورسوم. ولأن المصرف لا يُقرض قيمةً موجودة، فلديه كلّ دافعٍ ليُقرض أكثر: كفئران المختبر التي اكتشفت أن الرافعة تأتي بالطعام.',
      'The book quotes a brilliant economist — John Kenneth Galbraith — who said the process by which banks create money **“is so simple that the mind is repelled”**. What is really happening is that the bank has sat today’s Miriam in front of the time membrane and let her borrow from tomorrow’s Miriam — the successful bicycle-maker — in return for interest and fees. And because the bank is not lending existing value, it has every reason to lend more: like laboratory rats that have found the lever that drops a food pellet.'
    ) },
    { type: 'figure', id: 'tdBankLedger' },

    { type: 'h', text: L('الانهيار', 'The crash') },
    { type: 'p', text: L(
      'في عشرينيات القرن العشرين فقدت المصارف عقالها لسببين: نما الاقتصاد ونمت معه حاجته إلى الدَّين، ووجد المصرفيون طرقاً لحماية أنفسهم من العواقب — يقطّعون قرض مريم أسهماً صغيرة ويبيعونها لآلاف المستثمرين، فيستردّون المال فوراً، فإن تعثّرت خسر المستثمرون. وكلّما بدا كلّ شيءٍ أكثر استقراراً، أفرطوا في السحر حتى ينقلب **سحراً أسود**: قروضٌ أكبر من أن يواكبها الاقتصاد، ومستقبلٌ اقترض منه الجميع ولن يأتي.',
      'In the 1920s banking came unhinged for two reasons: the economy grew, and its appetite for debt with it; and bankers found ways to shield themselves — chopping Miriam’s loan into small shares sold to thousands of investors, recovering the money at once, so that if she defaulted it was the investors who lost. The more stable everything looked, the more freely they cast their spells, until the spells crossed into **black magic**: loans too large for the economy to keep pace with, and a future everyone had borrowed from that will never arrive.'
    ) },
    { type: 'p', text: L(
      'ثم السلسلة المعروفة: تُغلق مريم ورشتها، ويُسرَّح العمّال، فتخسر المتاجر، فتتراكم على المصارف قروضٌ لا تُسدَّد. تنتشر إشاعة، فيصطفّ المودعون ليسحبوا أموالهم — لكن المصرف لا يملك إلا قليلاً من النقد، فيُنزل أبوابه. **الانهيار** يتبعه **الكساد**: الجميع مدينون للجميع، والعمّال الذين يريدون العمل لا يجدونه، وأرباب العمل الذين يريدون التوظيف يخشون ألّا يجدوا من يشتري. هذا هو العقاب (نِمِسيس) الذي يلحق بغرور المصرفيين (هيوبريس)، ويقع أوّلاً على الفقراء والأبرياء.',
      'Then the familiar chain: Miriam closes her workshop, workers are laid off, shops lose customers, and the banks fill up with loans that will not be repaid. A rumour spreads, depositors queue to withdraw their money — but the bank holds little cash, and pulls down its shutters. **The crash** is followed by **the slump**: everyone owes everyone, workers who want to work can’t find it, employers who would hire fear no one will buy. This is the nemesis that follows the bankers’ hubris, and it falls first on the poor and the innocent.'
    ) },

    { type: 'h', text: L('دور الدولة (ليس جديداً تماماً)', 'The (not so) new role of the state') },
    { type: 'p', text: L(
      'وحدها الدولة توقف الدوّامة، وتبدأ بالمصارف: يُقرضها **المصرف المركزي** — بنك إنكلترا، والاحتياطي الفيدرالي، والبنك المركزي الأوروبي — لتبقى أبوابها مفتوحة. ومن أين له المال؟ **من العدم أيضاً.** لكنه لا يفعل ذلك طلباً للربح، بل لإنقاذ المصرفيين من أنفسهم، بوصفه **ملجأً أخيراً للإقراض**. ثم تضمن الحكومات ودائع الناس كي لا يتدافعوا إلى الشبابيك. وليس في هذا جديد: صَدَفات السيد نابوك كانت مالاً من «العدم» تضمنه سلطة. **الجديد** أن المصرفيين من القطاع الخاص صاروا يملكون الامتياز نفسه.',
      'Only the state can stop the spiral, and it starts with the banks: the **central bank** — the Bank of England, the Federal Reserve, the European Central Bank — lends them money so they can stay open. And where does it get the money? **From thin air, too.** But not for profit: to save the bankers from themselves, as the **lender of last resort**. Then governments guarantee people’s deposits so they won’t stampede to the counters. None of this is new: Mr Nabuk’s shells were money from “nothing”, backed by a ruler. **What is new** is that private bankers now hold the same privilege.'
    ) },

    { type: 'h', text: L('علاقةٌ مسمومة', 'A toxic relationship') },
    { type: 'p', text: L(
      'لماذا لا تُنقذ الدولةُ المصارفَ وتترك المصرفيين يفلسون عبرةً لغيرهم؟ لأن السياسيين يُنتخبون بأموال المصرفيين، ولأن كثيراً من مراقبي المصارف ينتقلون للعمل عندها بعد التقاعد. فلا يحذر المصرفيون: يتباطؤون بعد كلّ أزمة كسائقٍ دفع مخالفة سرعة، ثم يعودون إلى السرعة. ومن هنا المفارقة: **كلّما نجحت الدولة في صنع الاستقرار، صار الإفراط في الدَّين أكثر أماناً — فازداد عدم الاستقرار.**',
      'Why not rescue the banks but let the bankers go bust as a warning to the rest? Because politicians are elected with bankers’ money, and many bank regulators go to work for the banks when they retire. So bankers have no reason for caution: after each crisis they slow down like a driver fined for speeding, then speed again. Hence the paradox: **the better the state is at creating stability, the safer it becomes to pile on debt — and the more instability follows.**'
    ) },

    { type: 'h', text: L('الديون غير القابلة للسداد', 'Unpayable debts') },
    { type: 'p', text: L(
      'ما العمل حين يعجز مدينٌ عن السداد؟ **تُشطب الديون.** وليست هذه مسألة أخلاق بل مسألة عمل: من بقي مفلساً إلى الأبد لا يوظّف ولا يشتري ولا يُعلّم أولاده. في العصر الفيكتوري المبكّر كان المدين المعسر يُسجن حتى يسدّد — وهكذا تُعامَل اليوم دولٌ كاليونان. لكن مجتمعات السوق نجت من أزمات القرن التاسع عشر لأنها غيّرت القانون: وُلدت **المسؤولية المحدودة** التي تحمي بيت صاحب الشركة إن أفلست شركته. ومن المفارقة أن أصحاب الشركات نالوا هذه الحماية، ولم ينلها الناس العاديون. وفي الكتب المقدّسة أن الديون تُشطب دورياً، كما تحتاج الغابة إلى حرق بعض أغصانها الساقطة كي لا تلتهمها النار.',
      'What to do when a debtor cannot pay? **Write the debt off.** Not as a matter of ethics but of practicality: someone bankrupt for ever never hires, buys, or sends their children to university. In early Victorian times insolvent debtors were jailed until they paid — the way countries like Greece are treated today. But market societies survived the crashes of the nineteenth century because they changed the law: **limited liability** was born, protecting a company owner’s home if the company went bust. The irony is that company owners got this protection and ordinary people did not. And scripture ordains that debts be cancelled periodically, as a forest needs some fallen branches burned so that a wildfire does not consume it.'
    ) },

    { type: 'h', text: L('الطفيليّ الضروري', 'The necessary parasite') },
    { type: 'p', text: L(
      'في الرخاء يهاجم الأثرياء الدولة: «عائقٌ أمام التنمية»، و«طفيليّ» يقتات على القطاع الخاص بالضرائب، بل «لا يوجد شيءٌ اسمه المجتمع». وفي الأزمة يصرخون: «أين الحكومة؟». والحقيقة أن الثروة الخاصّة بُنيت على عنف الدولة — جنود الملك هم من طردوا الأقنان — ثم على طرقها وجسورها ومدارسها ومستشفياتها وشرطتها. الدولة **بوليصة تأمينٍ رائعة** للأثرياء، وهم يفعلون كلّ ما بوسعهم لكي لا يدفعوا أقساطها. بل الثروة كلّها تُنتج جماعياً: العمّال يحتاجون أصحاب المشاريع، وهؤلاء يحتاجون المصرفيين، وهؤلاء يحتاجون الحكومات.',
      'In good times the rich attack the state: “a brake on development”, a “parasite” feeding on the private sector through taxes — even “there is no such thing as society”. In a crisis they cry “where is the government?”. The truth is that private wealth was built on state violence — it was the king’s soldiers who drove the serfs off — and then on its roads, bridges, schools, hospitals and police. The state is **a magnificent insurance policy** for the rich, who do all they can to avoid paying the premiums. Indeed all wealth is produced collectively: workers need entrepreneurs, who need bankers, who need governments.'
    ) },

    { type: 'h', text: L('الدَّين العام: الشبح في الآلة', 'Public debt: the ghost in the machine') },
    { type: 'p', text: L(
      'لأن الأثرياء يدفعون ضرائب أقلّ ممّا تُنفقه الدولة لأجلهم، ولأن أجور العمّال بالكاد تكفي، تسدّ الدولة الفرق **بالاقتراض**. والمُقرضون هم المصرفيون — بمالٍ خلقوه من العدم. فلا تصدّق من يتحدّثون عن الدَّين العام كأنه وباءٌ يجب استئصاله: كثيره مشكلة، وقليله مشكلة أيضاً. حتى سنغافورة، الملزمة قانوناً بألّا تُنفق أكثر من ضرائبها، تقترض — لأن **مصرفيي مجتمع السوق يحتاجون الدَّين العام حاجة السمك إلى الماء.**',
      'Because the rich pay less tax than the state spends on their behalf, and workers’ wages barely suffice, the state covers the gap by **borrowing**. And the lenders are the bankers — with money they conjured from thin air. So don’t believe those who talk about public debt as a plague to eradicate: too much is a problem, and so is too little. Even Singapore, legally barred from spending more than it taxes, borrows — because **a market society’s bankers need public debt as surely as fish need water.**'
    ) },
    { type: 'p', text: L(
      'تقترض الحكومة مئة مليون لعشر سنين، وتعطي المُقرض ورقةً تَعِد فيها بالسداد وبخمسة ملايين فائدةً كلّ سنة: هذا هو **السند (bond)** — من «الارتباط»، لأن الحكومة صارت مرتبطةً بحامله. والمصرفيون يعشقون السندات: فائدتها آمنة، وتصلح ضماناً لقروضٍ أخرى، وتُباع فوراً إن احتاجوا إلى نقد — «أكثر الأصول سيولة». الدَّين العام إذن أكثر من دَين: **رباطٌ مطّاطيّ** يمسك النظام ويتمدّد في الأوقات العصيبة كي لا ينقطع، و«الشبح في الآلة» الذي يُشغّل مجتمع السوق.',
      'The government borrows a hundred million for ten years and gives the lender a paper promising repayment and five million a year in interest: that is **a bond** — the government is now bound to whoever holds it. And bankers love bonds: safe interest, usable as collateral for further loans, and saleable at once if they need cash — “the most liquid of assets”. So public debt is more than debt: **an elastic band** holding the system together, stretching in bad times so it doesn’t snap — the “ghost in the machine” that makes a market society run.'
    ) },
  ],
}
