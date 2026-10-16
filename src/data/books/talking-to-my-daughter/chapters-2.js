/*
 * «الاقتصاد كما أشرحه لابنتي» — chapters 5–8 and the epilogue. See the header
 * of chapters-1.js for the vocabulary rule.
 *
 * CHAPTER 8's ARABIC TITLE IS NOT CONFIRMED. The club's scan of the edition is
 * missing the page it opens on (its own companion PDF notes the same gap), so
 * «فيروساتٌ غبيّة؟» is a faithful rendering of "Stupid Viruses?", not a reading
 * of the printed page. Check it against a paper copy and correct it here.
 */
const L = (ar, en) => ({ ar, en })
const img = (f) => `./images/economy/${f}`

/* ===================== Chapter 5 ===================== */
export const oedipalMarkets = {
  slug: 'oedipal-markets',
  icon: '❓',
  title: L('٥ · سوقان أوديبيّان', '5 · Two Oedipal Markets'),
  lead: L(
    'يقول بعضهم إن البطالة لا وجود لها: العاطل لم يخفّض أجره بما يكفي. يردّ فاروفاكيس بأيلٍ وأرانب وبنبوءةٍ إغريقية — لأن سوقَي العمل والمال تحكمهما نبوءاتٌ تحقّق نفسها.',
    'Some say unemployment does not exist: the jobless just haven’t cut their price far enough. Varoufakis answers with a stag, some hares and a Greek prophecy — because the labour and money markets are ruled by prophecies that fulfil themselves.'
  ),
  blocks: [
    { type: 'p', text: L(
      'سنة ١٩٨٩ نال صديقه **فاسيلي** الدكتوراه في الاقتصاد ولم يجد عملاً، فخفّض سقف طموحه شهراً بعد شهر بلا جدوى، وكتب إليه: أسوأ ما يحدث للمرء أن يبلغ به اليأس أن يبيع روحه للشيطان — **فيكتشف أن الشيطان لا يشتري.** وفي المقابل صديقه **أندرياس** يشكو أنه لا يستطيع بيع بيته الصيفي في جزيرة باتموس، فيعرض عليه أن يشتريه بعشرة يوروهات. ضحك أندرياس، لأن الفرق كبير بين ألّا تستطيع البيع وألّا تنال السعر الذي تريده.',
      'In 1989 his friend **Wasily** got his doctorate in economics and could find no job; month after month he lowered his sights, in vain, and wrote: the worst thing that can happen is to grow so desperate you decide to sell your soul to the devil — **only to find the devil isn’t buying.** Meanwhile his friend **Andreas** complained he couldn’t sell his summer house on Patmos, and was offered ten euros for it. Andreas laughed: there is a big difference between being unable to sell something and not getting the price you want.'
    ) },

    { type: 'h', text: L('منكرو البطالة', 'The unemployment deniers') },
    { type: 'p', text: L(
      'على هذا الفرق يبني **منكرو البطالة** حجّتهم: فاسيلي كأندرياس، يستطيع أن يبيع عمله إن قبل خمسين يوروهاً في الشهر — فبطالته اختيار. وهي حجّةٌ تضيف إلى الجرح إهانة: تلوم الضحيّة على كونها ضحيّة، كما رأينا في الفصل الأوّل مع السكّان الأصليين. لكن عيبها الأكبر عمليّ: لو خفّض أصحاب البيوت أسعارهم لوجدوا مشترين في النهاية، أمّا لو خفّض كلّ العاطلين أجورهم فالأرجح أن **تقلّ الوظائف**.',
      'On that difference **the unemployment deniers** build their case: Wasily, like Andreas, could sell his labour if he accepted fifty euros a month — so his unemployment is a choice. It is an argument that adds insult to injury: it blames the victim for being one, as the first chapter saw with the Aboriginal Australians. But its biggest flaw is practical: if every homeowner cut their price they would all find buyers eventually; if every jobless person cut their wage, there would most likely be **fewer jobs**.'
    ) },

    { type: 'h', text: L('الأيل والأرانب', 'The stag and the hares') },
    { type: 'p', text: L(
      'تخيّل، مع **جان جاك روسو**، صيّادين بشباكٍ وأقواسٍ ضعيفة يطوّقون أيلاً سيُطعم القبيلة أيّاماً. التطويق بطيء، ويفشل إن انشغل صيّادٌ واحد بأرنبٍ يقفز قربه — والأرنب وجبةٌ واحدة لعائلةٍ واحدة. كلّهم يفضّلون الأيل، وكلٌّ منهم سيثبت **إن وثق بأن الآخرين سيثبتون**. لكن يكفي أن يخشى أحدهم أن يتراخى غيره حتى يلتفت إلى الأرانب، فيتبعه الجميع. **التفاؤل يحقّق نفسه، والتشاؤم كذلك.**',
      'Imagine, with **Jean-Jacques Rousseau**, hunters with nets and feeble bows encircling a stag that will feed the tribe for days. Encircling it takes time, and fails if a single hunter turns aside for a hare bounding nearby — and a hare is one meal for one family. They all prefer the stag, and each will hold the line **if he trusts that the others will**. But it takes only one to fear another might fumble for him to turn to the hares — and the rest follow. **Optimism fulfils itself; so does pessimism.**'
    ) },
    { type: 'figure', id: 'tdStagHunt' },

    { type: 'h', text: L('لماذا لا يشبه العمل البيوت والسيارات والطماطم؟', 'Why labour isn’t like houses, cars or tomatoes') },
    { type: 'p', text: L(
      'البيت يُشترى لعطلاته، والسيارة لقيادتها، والطماطم لأكلها: قيمتها التبادلية تأتي من قيمتها الاستعمالية. أمّا عمل فاسيلي فلا يريده أحدٌ لذاته. **ماريا** تصنع الثلّاجات، وستوظّفه فقط إن وثقت بأن خمس ثلّاجاتٍ إضافية ستجد من يشتريها بما يفوق أجره. ثم تقرأ ليلاً عنواناً: «النقابات تقبل خفض الأجور ٢٠٪ لزيادة الوظائف». هل تفرح وتوظّف؟ الأرجح أنها تفكّر: **إن قبلت النقابات بهذا فالأوضاع سيّئة جدّاً — ومن سيشتري ثلّاجاتي حين تنخفض الأجور كلّها؟** فلا توظّف أحداً.',
      'A house is bought for its holidays, a car for the driving, tomatoes for eating: their exchange value comes from their experiential value. But nobody wants Wasily’s labour for its own sake. **Maria** makes fridges, and will hire him only if she trusts that five more fridges will find buyers for more than his wage. Then one night she reads a headline: “Unions accept 20% wage cut to boost jobs.” Does she rejoice and hire? More likely she thinks: **if the unions accept that, things must be dire — and who will buy my fridges once every wage has fallen?** So she hires no one.'
    ) },
    { type: 'p', text: L(
      'وسوق المال مثله. لا أحد يشتري المال فيها، بل **يستأجره** — كما يستأجر صاحب العمل وقت العامل. يقول المؤمنون بالسوق إن خفض الفائدة يُرخص الاقتراض فيقترض الناس أكثر. لكن ماريا حين تقرأ «المصرف المركزي سيخفض الفائدة كثيراً» قد تفكّر: إن فعل هذا فالأمور تبدو رهيبة… انسَ الأمر. خفض الفائدة في الركود قد يُقرأ **يأساً**، فيطرد أصحاب المشاريع من صيد الأيل إلى الأرانب.',
      'The money market is the same. Nobody buys money there; they **rent** it — just as an employer rents a worker’s time. Market believers say cutting interest rates makes borrowing cheaper, so people borrow more. But when Maria reads “Central bank to cut rates sharply”, she may think: for them to do that, things must look terrible… forget it. A rate cut in a slump can read as **desperation**, chasing entrepreneurs off the stag hunt and back to the hares.'
    ) },

    { type: 'h', text: L('عقدة أوديب في سوقَي العمل والمال', 'The Oedipus complex of labour and money markets') },
    { type: 'p', text: L(
      'في مسرحية **سوفوكليس** «أوديب ملكاً» تتنبّأ العرّافة للملك لايوس بأن ابنه سيقتله، فيأمر بقتل الوليد، فيُترك على جبل، فينقذه راعٍ ويربّيه ملك كورنثة. يكبر أوديب، فتتنبّأ له العرّافة بأنه سيتزوّج أمّه، فيهرب من كورنثة — فيلتقي لايوس عند مفترق طرق ويقتله في أوّل «غضبٍ مروريّ» في الأدب، ثم يحلّ لغز **أبي الهول** فيُتوَّج ملكاً على طيبة ويتزوّج أرملة الملك: أمّه. **لولا النبوءتان لما تحقّقتا.**',
      'In **Sophocles’** play Oedipus Rex, the oracle tells King Laius his son will kill him, so he orders the baby killed; the child is left on a mountain, rescued by a shepherd and raised by the king of Corinth. Grown up, Oedipus hears the oracle say he will marry his mother, so he flees Corinth — meets Laius at a crossroads and kills him in literature’s first road rage, then solves the riddle of the **Sphinx**, is crowned king of Thebes and marries the late king’s widow: his mother. **Without the two prophecies, neither would have come true.**'
    ) },
    { type: 'image', src: img('oedipus-sphinx-moreau.webp'),
      alt: L('أبو الهول متشبّثاً بصدر أوديب في لوحةٍ زيتية', 'The Sphinx clinging to Oedipus’s chest, in an oil painting'),
      caption: L('«أوديب وأبو الهول» — غوستاف مورو، ١٨٦٤.', '“Oedipus and the Sphinx” — Gustave Moreau, 1864.') },
    { type: 'p', text: L(
      'وهكذا سوقا العمل والمال: حين يرى أصحاب المشاريع الأجور والفائدة تنخفض، يتنبّؤون بالركود فلا يقترضون ولا يوظّفون — فتبقى الأجور والفائدة منخفضة، **وتتحقّق النبوءة**. لو كان سوفوكليس يكتب صفحات المال في الجرائد، يقول فاروفاكيس، لصار فهم محن مجتمع السوق أسهل كثيراً.',
      'So it is with the labour and money markets: when entrepreneurs see wages and interest rates falling, they prophesy a slump and neither borrow nor hire — so wages and rates stay low, **and the prophecy comes true**. If only Sophocles wrote the financial pages, Varoufakis says, a market society’s trials would be so much easier to understand.'
    ) },
    { type: 'imggrid', images: [
      { src: img('oedipus-rex-ar.webp'), alt: L('غلاف طبعةٍ عربية من «أوديب»', 'Cover of an Arabic edition of Oedipus'),
        caption: L('**«أوديب ملكاً»** لسوفوكليس بالعربية.', '**Oedipus Rex** by Sophocles, in Arabic.') },
      { src: img('oedipus-rex-en.webp'), alt: L('غلاف «أوديب ملكاً»', 'Cover of Oedipus Rex'),
        caption: L('كُتبت في أثينا نحو ٤٢٩ قبل الميلاد.', 'Written in Athens around 429 BC.') },
    ] },
    { type: 'callout', variant: 'note', title: L('من خارج الكتاب: كينز', 'From outside the book: Keynes'), text: L(
      'الحجّة الجوهرية في هذا الفصل — أن خفض الأجور جميعاً قد يعمّق البطالة بدل أن يعالجها، لأن ما يصحّ على شركةٍ واحدة لا يصحّ على الاقتصاد كلّه — هي حجّة **جون ماينارد كينز** في «النظرية العامة للتشغيل والفائدة والنقود» (١٩٣٦). لا يسمّي فاروفاكيس الكتاب هنا، لكنه يذكر في مقدّمته «مغالطة التركيب» عند كينز بين أكثر ما شكّل تفكيره.',
      'This chapter’s central argument — that cutting every wage may deepen unemployment rather than cure it, because what is true for one firm is not true for the whole economy — is **John Maynard Keynes’s**, in The General Theory of Employment, Interest and Money (1936). Varoufakis doesn’t name the book here, but his preface lists Keynes’s “fallacy of composition” among what shaped his thinking most.'
    ) },
    { type: 'imggrid', images: [
      { src: img('general-theory-ar.webp'), alt: L('غلاف الطبعة العربية من «النظرية العامة» لكينز', 'Cover of the Arabic edition of Keynes’s General Theory'),
        caption: L('**«النظرية العامة للتشغيل والفائدة والنقود»** بالعربية.', '**The General Theory of Employment, Interest and Money**, in Arabic.') },
      { src: img('general-theory-en.webp'), alt: L('غلاف «النظرية العامة» لكينز', 'Cover of Keynes’s General Theory'),
        caption: L('الأصل الإنجليزي، ١٩٣٦.', 'The English original, 1936.') },
    ] },

    { type: 'h', text: L('العنصر البشريّ', 'The human element') },
    { type: 'p', text: L(
      'إن كان الاقتصاد محرّك المجتمع والدَّين وقوده، فالعمل **شرارته** والمال **زيته**. وكلاهما يقدر أن يدير المحرّك، وأن يوقفه ويمنع تشغيله من جديد. ويرى فاروفاكيس أن هذين الشيطانين هما بعض ما يجعلنا بشراً: قدرتنا على التفكير في سلوكنا وسلوك الآخرين، وعلى توقّع أفعالهم — ومعرفتنا أنّا نادراً ما نقاوم دافع النجاة القريب، ولو هزمنا على المدى البعيد. ولكي نصالح هذا البشر الفوضويّ مع آلةٍ اقتصادية مثالية نحتاج تحوّلاً بحجم الانقلاب الكبير. وها نحن في واحدٍ الآن: الأتمتة — غير أنها تمضي في الاتجاه المعاكس، لتستبدل الإنسان لا لتصالحه.',
      'If the economy is society’s engine and debt its fuel, labour is **the spark** and money **the lubricant**. Both can drive the engine, and both can stall it and stop it starting again. These two demons, Varoufakis says, are part of what makes us human: our capacity to reflect on our own behaviour and others’, to predict what they will do — and our knowledge that we rarely resist the short-term urge to save ourselves, however self-defeating. Reconciling these messy humans with an idealised economic machine would take a transformation as radical as the Great Reversal. And we are in one now: automation — only it runs the other way, replacing humans rather than reconciling them.'
    ) },
  ],
}

/* ===================== Chapter 6 ===================== */
export const hauntedMachines = {
  slug: 'haunted-machines',
  icon: '⚙️',
  title: L('٦ · آلاتٌ مسكونة بالأشباح', '6 · Haunted Machines'),
  lead: L(
    'من «فرانكنشتاين» إلى «ماتريكس»: نخاف مخلوقاتنا. لكن الخوف الحقيقي، عند فاروفاكيس، ليس من الآلات بل ممّن يملكها — ومن مجتمعٍ يستعملها ليستعبدنا بدل أن يحرّرنا.',
    'From Frankenstein to The Matrix, we fear our creations. But the real fear, for Varoufakis, is not of the machines but of who owns them — and of a society that uses them to enslave us instead of freeing us.'
  ),
  blocks: [
    { type: 'p', text: L(
      'ليلةٌ عاصفة في قصرٍ بالريف السويسري، مطلع القرن التاسع عشر: **ماري شيلي** واللورد بايرون وأصدقاؤهما يتبارون في كتابة قصص الرعب. تكتب شيلي عن الدكتور **فيكتور فرانكنشتاين**، طبيبٍ أراد أن يهزم الموت، فخاط من أشلاء الجثث جسداً وبعث فيه الحياة بالكهرباء. نهض المخلوق يبحث عن الحنان، فهرب صانعه مرتعباً. ولأن المجتمع لفظه، قتل كثيرين انتقاماً لوحدته — ومنهم زوجة فيكتور — ثم قتل صانعه نفسه في القطب الشمالي.',
      'A stormy night in a villa in the Swiss countryside, early in the nineteenth century: **Mary Shelley**, Lord Byron and their friends hold a contest to write horror stories. Shelley writes of Doctor **Victor Frankenstein**, a physician who meant to defeat death, stitched a body from corpses and woke it with electricity. The creature rose looking for affection, and its maker fled in horror. Rejected by society, it killed many in revenge for its loneliness — Victor’s wife among them — and at last killed its maker at the North Pole.'
    ) },
    { type: 'image', src: img('frankenstein-1831.webp'),
      alt: L('نقشٌ يُظهر مخلوقاً عملاقاً ينهض وصانعه يفرّ', 'An engraving of a giant creature rising as its maker flees'),
      caption: L('واجهة طبعة ١٨٣١ من «فرانكنشتاين» — أوّل صورةٍ للمخلوق.', 'The frontispiece of the 1831 edition of Frankenstein — the first picture of the creature.') },
    { type: 'imggrid', images: [
      { src: img('frankenstein-ar.webp'), alt: L('غلاف الطبعة العربية من «فرانكنشتاين»', 'Cover of the Arabic edition of Frankenstein'),
        caption: L('**«فرانكنشتاين»** لماري شيلي بالعربية.', '**Frankenstein** by Mary Shelley, in Arabic.') },
      { src: img('frankenstein-en.webp'), alt: L('غلاف «فرانكنشتاين»', 'Cover of Frankenstein'),
        caption: L('صدرت أوّل مرّة ١٨١٨.', 'First published in 1818.') },
    ] },

    { type: 'h', text: L('متلازمة فرانكنشتاين', 'The Frankenstein syndrome') },
    { type: 'p', text: L(
      'لم تدخل الآلات حياتنا لأنها عبقرية، بل لأن **أصحاب المشاريع المدينين** يتنافسون على الربح: من يُنتج أكثر بالعمل نفسه يبيع أرخص. تخيّل أن جيمس واط عاش في مصر الفراعنة وعرض محرّكه على الفرعون: لوضعه في قصره تحفةً يتباهى بها — فلديه مئات آلاف العبيد، ولا منافسين يطاردون الربح. ومع تتابع الاختراعات امتلكت البشرية **جيشاً من العبيد الآليين**. فلماذا لم نصل إلى عالم «ستار تريك»، حيث يخرج الطعام من فتحةٍ في الجدار ويتفرّغ البشر للفلسفة؟ لأننا نشبه **الهامستر على عجلته**: نركض أسرع، ولا نصل إلى أيّ مكان. بدل أن تخدمنا الآلات صرنا نكدّ لنحافظ عليها.',
      'Machines did not enter our lives because they were ingenious, but because **indebted entrepreneurs** compete for profit: whoever produces more from the same labour sells cheaper. Imagine James Watt in the Egypt of the pharaohs, showing his engine to the king: it would have stood in the palace as a curiosity — he had hundreds of thousands of slaves, and no competitors chasing profit. Invention by invention, humanity acquired **an army of mechanical slaves**. So why aren’t we in the world of Star Trek, food popping out of a hole in the wall while humans do philosophy? Because we are like **hamsters on a wheel**: running faster, going nowhere. Instead of the machines serving us, we toil to keep them going.'
    ) },

    { type: 'h', text: L('من «ماتريكس» إلى ماركس', 'The Matrix and Karl Marx') },
    { type: 'p', text: L(
      'من حكاية «القِدر السحرية» للأخوين غريم و«الساحر المتدرّب» لغوته إلى «بليد رانر» و«المدمّر»: نحن نخاف مخلوقاتنا. وأصدق وريثٍ لـ«فرانكنشتاين»، في رأيه، هو **«ماتريكس»**: أرضٌ استولت عليها الآلات، لكنها تُبقي البشر أحياء في حاضناتٍ تأكل حرارة أجسادهم طاقةً، وتُسقط في عقولهم واقعاً افتراضياً كي لا يموتوا يأساً ولا يعرفوا أنهم عبيد. الفيلم مخيف لأنه يتحدّث عن الحاضر: خوفنا من استعبادٍ تامٍّ إلى حدّ أننا لا نشعر به — وربّما حدث فعلاً ولا سبيل لنا إلى معرفته.',
      'From the Brothers Grimm’s Sweet Porridge and Goethe’s The Sorcerer’s Apprentice to Blade Runner and The Terminator: we fear our creations. Their truest heir to Frankenstein, he thinks, is **The Matrix**: an Earth the machines have taken, keeping humans alive in pods whose body heat they harvest as power, while beaming a virtual world into their minds so they neither die of despair nor know they are slaves. The film frightens because it is about the present: our fear of an enslavement so complete we cannot feel it — and which may already have happened, with no way of knowing.'
    ) },
    { type: 'imggrid', images: [
      { src: img('the-matrix.webp'), alt: L('ملصق فيلم «ماتريكس»', 'Poster for The Matrix'),
        caption: L('**«ماتريكس»** (١٩٩٩): البشر بطّاريات، والعالم الذي يرونه وهم.', '**The Matrix** (1999): humans as batteries, and the world they see an illusion.') },
      { src: img('blade-runner.webp'), alt: L('ملصق فيلم «بليد رانر»', 'Poster for Blade Runner'),
        caption: L('**«بليد رانر»** (١٩٨٢): آلاتٌ لا تُميَّز عن البشر — فما الإنسان؟', '**Blade Runner** (1982): machines you cannot tell from people — so what is a human?') },
      { src: img('the-terminator.webp'), alt: L('ملصق فيلم «المدمّر»', 'Poster for The Terminator'),
        caption: L('**«المدمّر»** (١٩٨٤): آلاتٌ تريد إبادتنا.', '**The Terminator** (1984): machines out to wipe us out.') },
      { src: img('star-trek.webp'), alt: L('ملصق «ستار تريك»', 'A Star Trek poster'),
        caption: L('**«ستار تريك»**: الحلم المعاكس — آلاتٌ تُنتج كلّ شيء، وبشرٌ تحرّروا من الحاجة.', '**Star Trek**: the opposite dream — machines that make everything, and humans freed from want.') },
    ] },
    { type: 'p', text: L(
      'كتب **كارل ماركس** أن الآلات — وسائل الإنتاج المُنتَجة — هي «القوّة التي علينا أن ننحني لها»، و«ماتريكس» يصوّر اكتمال هذا المسار. لكن ماركس رأى في الاقتصاد **صمّام أمان**: ميلاً إلى الأزمة يمنع الآلات من الاستيلاء الكامل على العمل البشريّ قبل أن يقع.',
      '**Karl Marx** wrote that machines — the produced means of production — are “the force we must bow to”, and The Matrix depicts that process completed. But Marx also saw a **safety valve** in the economy: a tendency to crisis that stops machines from taking over human labour entirely before it gets there.'
    ) },
    { type: 'imggrid', images: [
      { src: img('das-kapital-ar.webp'), alt: L('غلاف الطبعة العربية من «رأس المال»', 'Cover of the Arabic edition of Capital'),
        caption: L('**«رأس المال»** لكارل ماركس بالعربية. لا يسمّيه فاروفاكيس هنا، لكن تحليل الآلات والأزمة الذي يستعيره منه فيه.',
                   '**Capital** by Karl Marx, in Arabic. Varoufakis doesn’t name it here, but the analysis of machinery and crisis he borrows is in it.') },
      { src: img('das-kapital-en.webp'), alt: L('غلاف «رأس المال»', 'Cover of Das Kapital'),
        caption: L('صدر مجلّده الأوّل ١٨٦٧.', 'Its first volume appeared in 1867.') },
    ] },

    { type: 'h', text: L('متلازمة إيكاروس', 'The Icarus syndrome') },
    { type: 'p', text: L(
      'صنع ديدالوس لابنه إيكاروس جناحين من شمعٍ وريش، فحلّق قريباً من الشمس فذاب الشمع وسقط في البحر. ومجتمعات السوق كذلك: الأتمتة تخفض الكلفة، والمنافسة تخفض الأسعار معها، والروبوتات **لا تشتري ما تصنعه**. ثلاث قوى تدفع الأسعار إلى ما تحت الكلفة، فيجد أصحاب المشاريع الذين اقترضوا من المستقبل ليشتروا الآلات أن أرباحهم تبخّرت — فيتّصلون بمصرفييهم، ويبدأ الانهيار.',
      'Daedalus made his son Icarus wings of wax and feathers; he flew too close to the sun, the wax melted and he fell into the sea. So with market societies: automation cuts costs, competition drags prices down with them, and robots **don’t buy what they make**. Three forces push prices below costs, and entrepreneurs who borrowed from the future to buy machines find their profits gone — they call their bankers, and the crash begins.'
    ) },
    { type: 'figure', id: 'tdIcarus' },
    { type: 'p', text: L(
      'وفي الأزمة يعود الإنسان: قلّ المنافسون فارتفعت الأسعار قليلاً، وصار العامل الجائع أرخص من الآلة الجديدة. هكذا حدث بعد ٢٠٠٨. فالآلهة الأشدّ انتقاماً تحقّق لنا أشدّ رغباتنا: كما تحوّل كلّ ما لمسه **ميداس** ذهباً فبقي وحيداً، يحلم أرباب العمل بالتخلّص من العنصر البشريّ فيجدون الخسارة. ومجتمع السوق كـ**سيزيف**: يدفع الصخرة نحو القمّة — إخراج الإنسان من الإنتاج — فتتدحرج قبل أن تبلغها، مرّةً بعد مرّة.',
      'And in the crisis, humans come back: competitors are fewer so prices rise a little, and a hungry worker is cheaper than a new machine. That is what happened after 2008. The most vengeful gods grant our dearest wishes: as everything **Midas** touched turned to gold and left him alone, employers who dream of shedding the human element find losses instead. Market society is **Sisyphus**: it pushes the rock towards the summit — taking humans out of production — and it rolls back down before getting there, again and again.'
    ) },
    { type: 'image', src: img('automation.webp'), wide: true,
      alt: L('ذراعان آليّتان تعملان فوق خطّ إنتاجٍ في مصنعٍ أبيض', 'Two robotic arms working over a production line in a white factory'),
      caption: L('صورةٌ توضيحية لأتمتةٍ صناعية، لا لمصنعٍ بعينه.', 'An illustration of industrial automation, not any particular factory.') },

    { type: 'h', text: L('المقاومة ليست عبثاً', 'Resistance is never futile') },
    { type: 'p', text: L(
      'في زمن شيلي حطّم **اللوديون** — عمّالٌ إنجليز — الأنوال البخارية. وهم من أكثر من أُسيء فهمهم: لم يعادوا الآلات، بل أن يملكها قلّةٌ قليلة. وفي مصانع القمصان في بنغلاديش اليوم آلاف العمّال لا الروبوتات، في مشهدٍ يشبه **«الأزمنة الحديثة»** لشارلي شابلن (١٩٣٦)، حيث يُضطرّ العامل إلى مجاراة خطّ التجميع حتى يصير آلةً هو نفسه. والمفارقة: تنظيم العمّال في **نقابات** للمطالبة بأجورٍ أعلى وساعاتٍ أقلّ هو ترياق متلازمة إيكاروس، لأن الأجور هي ما يشتري البضائع. وحين يقول «البورغ» في «ستار تريك» للبشر «ستُستَوعَبون، والمقاومة عبث» — فالجواب: **المقاومة ليست عبثاً أبداً.**',
      'In Shelley’s time the **Luddites** — English workers — smashed the steam looms. They are among history’s most misunderstood: their quarrel was not with machines but with how few people owned them. In Bangladesh’s T-shirt factories today there are thousands of workers, not robots — a scene out of Charlie Chaplin’s **Modern Times** (1936), where a worker forced to keep up with the assembly line turns into a machine himself. The irony: workers organising in **unions** for higher pay and shorter hours is the antidote to the Icarus syndrome, because wages are what buy the goods. And when the Borg tell humans in Star Trek “you will be assimilated, resistance is futile” — the answer is: **resistance is never futile.**'
    ) },

    { type: 'h', text: L('سرّ القيمة التبادلية: البشر', 'The secret of exchange value: humans') },
    { type: 'p', text: L(
      'أغلى ما في الإنتاج اليوم التصميم: من نحو ٦٠٠ جنيه ثمن «آيفون» يذهب أقلّ من ١٥٠ إلى المصنع الصيني الذي جمّعه، ويبقى الباقي لـ«أبل» ثمناً لملكيّتها الفكرية. فإن صارت الآلات تصمّم الآلات، فهل نعيش كسقراط في الساحة، أم كبطّاريات «ماتريكس»؟ يرى أن الجواب يتوقّف على من يملك. فحلم كلّ ربّ عمل ليس عالماً بلا عمل، بل أن يستبدل **عمّاله هو** بالروبوتات بينما يواصل منافسوه توظيف البشر الذين يشترون بضاعته.',
      'The most valuable part of production today is design: of the roughly £600 an iPhone costs, less than £150 goes to the Chinese factory that assembled it, and Apple keeps the rest for its intellectual property. If machines come to design machines, will we live like Socrates in the agora, or like batteries in The Matrix? That, he says, depends on who owns them. Every employer’s dream is not a world without work but to replace **his own** workers with robots while his competitors keep employing the humans who buy his goods.'
    ) },
    { type: 'p', text: L(
      'وماذا عن من يقول: لنصِر نحن آلات؟ في **«بليد رانر»** يطارد ريك ديكارد آلاتٍ لا تُميَّز عن البشر. ويطلب فاروفاكيس من ابنته أن تتخيّل استبدال أعضائها قطعةً قطعة — سمّاعة، فقدمٌ إلكترونية، فقلبٌ آلي، فشرائح في الدماغ — حتى نقطةٍ لا نعرفها تكفّ عندها عن أن تكون كسينيا. وإن صار البشر جميعاً كذلك، صار الاقتصاد **كأحشاء ساعة**: تبادلٌ للطاقة بين التروس بلا قيمةٍ تبادلية، لأن لا أحد هناك ليُقيّم شيئاً. مدنٌ كخلايا النحل، لا مجتمعات.',
      'And those who say: let us become machines ourselves? In **Blade Runner**, Rick Deckard hunts machines indistinguishable from people. Varoufakis asks his daughter to imagine her parts replaced one by one — a hearing aid, a bionic foot, a mechanical heart, chips in the brain — until some point we cannot name where she stops being Xenia. If all humans became like that, the economy would be **like the inside of a clock**: energy passing between gears with no exchange value, because no one is there to value anything. Cities like beehives, not societies.'
    ) },

    { type: 'h', text: L('تحوّلٌ كبيرٌ جديد ومختلف', 'A new and different Great Transformation') },
    { type: 'p', text: L(
      'لا يدعو إلى إيقاف التكنولوجيا — فهو يحبّها كما أحبّت شيلي فكرة أن يهزم العلمُ المرض. ومصادر الأمل عنده واقعية: قدرة البشر التي لا تنفد على المقاومة، وأزمةٌ تقع لا محالة إن نجحت الأتمتة أكثر من اللازم. لكنه يقترح ما هو أفضل من انتظار الكوارث: **أن يصير جزءٌ من آلات كلّ شركة ملكاً للجميع**، وتصبّ حصّته من الأرباح في صندوقٍ مشترك يُوزَّع بالتساوي. هكذا يصير البشر كلّهم مستفيدين من عمل الآلات، فلا تنهار القدرة على الشراء. وإن اكتملت الأتمتة يوماً صارت المنتجات كالهواء: وفيرةٌ بلا ثمن. ويستشهد بـ**كينز** نفسه، في مقالته «الإمكانات الاقتصادية لأحفادنا» (١٩٣٠): سيُرى حبّ المال للتملّك يوماً على حقيقته — علّةً مرضية مقيتة.',
      'He does not call for halting technology — he loves it, as Shelley surely loved the idea of science defeating disease. His sources of hope are realistic: humans’ inexhaustible capacity to resist, and a crash that is bound to come if automation succeeds too well. But he proposes something better than waiting for disasters: **that a portion of every company’s machines become everyone’s property**, its share of the profits flowing into a common fund shared equally. Then all humans benefit from the machines’ labour and buying power does not collapse. And if automation is ever complete, products become like air: plentiful and free. He quotes **Keynes** himself, in “Economic Possibilities for our Grandchildren” (1930): the love of money as a possession will one day be seen for what it is — a somewhat disgusting morbidity.'
    ) },
  ],
}

/* ===================== Chapter 7 ===================== */
export const apoliticalMoney = {
  slug: 'apolitical-money',
  icon: '⚖️',
  title: L('٧ · الوهم الخطير للمال غير السياسي', '7 · The Dangerous Fantasy of Apolitical Money'),
  lead: L(
    'في معسكرٍ لأسرى الحرب صارت السجائر نقوداً، وكان الصليب الأحمر — دون أن يدري — مصرفها المركزي المحايد. خارج الأسلاك الشائكة لا يوجد مصرفٌ محايد، ولا مالٌ بلا سياسة.',
    'In a prisoner-of-war camp, cigarettes became money, and the Red Cross — without knowing it — was its neutral central bank. Outside the barbed wire there is no neutral bank, and no money without politics.'
  ),
  blocks: [
    { type: 'p', text: L(
      'سنة ١٩٤١ أسر الألمان ضابطاً بريطانياً اسمه **ريتشارد رادفورد**، درس الاقتصاد، فدوّن بعد الحرب ما رآه في معسكر الأسرى الغربيين. كان الصليب الأحمر يرسل إلى الجميع طروداً متماثلة فيها طعامٌ وقهوةٌ وشاي وشوكولاتة وسجائر. وأوّل من رأى الفرصة ضبّاطٌ فرنسيون أذكياء: الفرنسيّ يحبّ القهوة ولا يبالي بالشاي، والإنجليزيّ عكسه.',
      'In 1941 the Germans captured a British officer named **Richard Radford**, a trained economist, who after the war wrote down what he saw in the camp for Western prisoners. The Red Cross sent everyone identical parcels — food, coffee, tea, chocolate, cigarettes. The first to see an opportunity were some shrewd French officers: a Frenchman loves coffee and cares little for tea, an Englishman the reverse.'
    ) },

    { type: 'h', text: L('المراجحة', 'Arbitrage') },
    { type: 'p', text: L(
      'استعار التجّار الفرنسيون شاي مواطنيهم ووعدوهم بقهوةٍ مقابله، ثم بادلوه في عنابر الإنجليز بقهوةٍ أكثر ممّا وعدوا، واحتفظوا بالفرق. هذه **المراجحة (arbitrage)**: أن تشتري رخيصاً في سوق وتبيع غالياً في أخرى. ثم دخل المنافسون — مثل باسكال المتأخّر الذي عرض على مواطنيه قهوةً أكثر — فضاق الهامش حتى عرف الجميع سعر الشاي بالقهوة، وأفقد التجّارُ أنفسهم عملهم. وعلى ألواح الإعلانات في المعسكر استقرّت الأسعار، كما تفعل شاشات «بلومبرغ» في غرف التداول اليوم.',
      'The French traders borrowed their compatriots’ tea, promising coffee in return, swapped it in the English huts for more coffee than they had promised, and kept the difference. That is **arbitrage**: buying cheap in one market and selling dear in another. Then competitors came in — like the latecomer Pascal, offering his countrymen more coffee — and the spread shrank until everyone knew the price of tea in coffee, and the traders had done themselves out of a job. On the camp’s noticeboards prices settled, just as Bloomberg screens do in trading rooms today.'
    ) },

    { type: 'h', text: L('عملةٌ مسرطِنة: السجائر', 'A carcinogenic currency: cigarettes') },
    { type: 'p', text: L(
      'ثم ثقلت المقايضة المباشرة — شايٌ بقهوةٍ بشوكولاتة — فبرزت سلعةٌ وسيطة: **السجائر**. فهي تدوم ولا تفسد، وتُحمل في الجيب، وتُقسَّم، ويرغب فيها الجميع: المدخّن لنيكوتينها، وغير المدخّن لقيمتها التبادلية. وصار لها ثلاثة أدوار: سلعةٌ تُستهلك، و**وسيلة تبادلٍ ومقياسٌ للأسعار**، و**مخزنٌ للقيمة** يُدّخر ليومٍ عصيب. ومع الادّخار جاء الإقراض بفائدة — ومعه خطر ألّا يسدّد المقترض، أو أن يدخّن السجائر كلّها.',
      'Then direct barter — tea for coffee for chocolate — grew cumbersome, and one go-between commodity emerged: **cigarettes**. They keep, fit in a pocket, divide easily, and everyone wants them: smokers for the nicotine, non-smokers for their exchange value. They took on three roles: a good to consume, **a medium of exchange and a measure of prices**, and **a store of value** saved for a rainy day. With saving came lending at interest — and with it the risk that a borrower would not pay back, or would smoke the lot.'
    ) },

    { type: 'h', text: L('التضخّم والانكماش في المعسكر', 'Inflation and deflation in the camp') },
    { type: 'p', text: L(
      'سمع فاروفاكيس صغيراً أن ورقة الألف دراخما لا تكلّف طباعتها إلا عشرين دراخما، فلم يفهم: كيف تساوي ألفاً؟ المعسكر يفسّرها: حين زاد الصليب الأحمر السجائر في الطرود صارت كلّ سيجارةٍ تشتري أقلّ — **تضخّم**. وفي ليلةٍ قصف فيها الحلفاء المنطقة، دخّن الأسرى المرتعبون سيجارةً تلو الأخرى، فقلّت السجائر في الصباح وارتفعت قيمتها: بعد أن كان لوح الشوكولاتة بخمس سجائر صار بواحدة — **انكماش**. فقيمة العملة لا علاقة لها بكلفة صنعها، بل **بندرتها**.',
      'As a boy Varoufakis heard that a thousand-drachma note cost only twenty drachmas to print, and couldn’t understand how it could be worth a thousand. The camp explains it: when the Red Cross added cigarettes to the parcels, each cigarette bought less — **inflation**. And on a night when Allied bombers hit the area, terrified prisoners smoked one cigarette after another; by morning there were far fewer and each was worth more: a chocolate bar that cost five cigarettes now cost one — **deflation**. A currency’s value has nothing to do with what it costs to make, only with **how scarce it is**.'
    ) },
    { type: 'figure', id: 'tdCigaretteCamp' },

    { type: 'h', text: L('سعر الفائدة، وتوقّعاتٌ كبرى', 'Interest rates, and great expectations') },
    { type: 'p', text: L(
      'كان «مصرفيّو» المعسكر يُقرضون عشر سجائر ويطلبون اثنتي عشرة الشهر القادم: ٢٠٪. فإن توقّعوا وصول سجائر كثيرة تُفقد كلَّ سيجارة ١٠٪ من قيمتها، طلبوا ٣٠٪. وهذا ما تعنيه نشرة الأخبار حين تقول إن الفائدة سترتفع لأن التضخّم يتسارع. والطقس لا يبالي بتوقّعاتنا، أمّا الاقتصاد فيتشكّل بها: حين تقدّم الألمان في روسيا استقرّت الأسعار لأن الأسر سيطول، وحين اقترب الحلفاء لم يعد أحدٌ يريد الادّخار. ولمّا توقّفت الطرود دخّن الأسرى ما ادّخروا، و**تبخّرت الديون حرفياً** — وانهار اقتصاد المعسكر قبل أن تُفتح أبوابه. اقتصادٌ نقديّ لا يعيش إن عرف الجميع أن نهايته قريبة.',
      'The camp’s “bankers” lent ten cigarettes and asked for twelve next month: 20%. If they expected a flood of cigarettes that would cost each one 10% of its value, they asked 30%. That is what the news means when it says rates will rise because inflation is picking up. The weather doesn’t care what we expect; an economy is shaped by it: when the Germans advanced in Russia prices settled, because captivity would be long; when the Allies drew near, no one wanted to save. When the parcels stopped, prisoners smoked their savings and **the debts literally went up in smoke** — the camp’s economy collapsed before its gates were opened. A monetised economy cannot survive if everyone knows its end is near.'
    ) },

    { type: 'h', text: L('من السجائر إلى المال السياسي', 'From cigarettes to political money') },
    { type: 'p', text: L(
      'الصَّدَف والملح والحديد والذهب، ثم الورق، ثم أرقامٌ على هاتفك: ما يجعل العملة عملةً هو **الثقة**. ومنذ القدم احتاج الناس إلى حمايتها من جشع حكّامهم أنفسهم: الذين يُنقصون الذهب في العملات ليصكّوا منها أكثر حين يريدون حرباً أو قصراً — فتطرد العملةُ الرديئة الجيدة، ويرتفع التضخّم، وتهتزّ الثقة. ولهذا دعا الأثرياء إلى **«إبعاد المال عن السياسة»** بمصارف مركزية مستقلّة لا يأمرها المنتخَبون بطبع المال، مستشهدين بسقوط روما.',
      'Shells, salt, iron, gold, then paper, then numbers on your phone: what gives a currency its currency is **trust**. And from the start people needed to protect it from their own rulers’ greed — rulers who shaved the gold from coins to strike more when they wanted a war or a palace, so that bad money drove out good, prices rose and trust shook. That is why the wealthy campaigned to **“depoliticise money”** with independent central banks that elected politicians cannot instruct to print, citing the fall of Rome.'
    ) },
    { type: 'p', text: L(
      'لكن هل هذا ممكن أصلاً؟ في المعسكر كانت العملة هي المال كلّه، ولا إنتاج فيه؛ أمّا خارجه فمعظم المال **يخلقه المصرفيون من العدم**، ويرتبط بالدَّين العام وبالضرائب التي تُجبى لسداده. فإن أبعدتَ المال عن السياسة، وجب أن تُبعد عنها كمّ تُنفق الدولة ومن تفرض عليه الضرائب وماذا يُسمح للمصرفيين وكيف يُعامَلون إن أفلسوا — وهذه هي السياسة بعينها. **المصرف المركزي المستقلّ لا يصير محايداً كالصليب الأحمر؛ يصير سياسياً بلا رقابة البرلمان**، وأقرب إلى نفوذ القلّة والمصرفيين.',
      'But is it even possible? In the camp the currency was all the money there was, and nothing was produced; outside it, most money is **created by bankers out of thin air**, and is bound up with public debt and the taxes raised to service it. Depoliticise money and you must also take out of politics how much the state spends, whom it taxes, what bankers may get away with and what happens when they fail — which is the very definition of politics. **An independent central bank does not become as neutral as the Red Cross; it becomes political without Parliament watching**, and closer to the power of the few and the bankers.'
    ) },

    { type: 'h', text: L('محاولةٌ لإبعاد المال عن السياسة: «بيتكوين»', 'An attempt to depoliticise money: Bitcoin') },
    { type: 'p', text: L(
      'بعد انهيار ٢٠٠٨ وانعدام الثقة بالمصرفيين حلم كثيرون بعملةٍ كسجائر المعسكر: لا دولة لها ولا مصرف. والعقبة أن كلّ رقمٍ رقميّ يمكن نسخه. وفي **الأوّل من نوفمبر ٢٠٠٨** أرسل شخصٌ أو فريقٌ مجهول باسم **ساتوشي ناكاموتو** رسالةً فيها الحلّ: سجلٌّ لا تديره سلطةٌ مركزية، يراقب فيه المستخدمون كلّهم المعاملات دون أن يعرفوا أصحابها. وُلدت «بيتكوين». ثم جاءت السرقات: «حُماةٌ» يخزّنون عملات الناس مقابل رسوم، اختفى بعضهم بملايين. وهذا يذكّر بأن المال سياسيّ — وأنصار بيتكوين لا ينكرون ذلك، فهم يحبّونها لأنها ضدّ السلطة.',
      'After the 2008 crash, with trust in bankers gone, many dreamed of a currency like the camp’s cigarettes: no state, no bank. The obstacle is that anything digital can be copied. On **1 November 2008** someone — a person or a team — calling themselves **Satoshi Nakamoto** sent an email with the solution: a ledger no central authority runs, in which all users watch all transactions without knowing whose they are. Bitcoin was born. Then came the thefts: “safekeepers” storing people’s coins for a fee, some of whom vanished with millions. Which is a reminder that money is political — and Bitcoin’s supporters don’t deny it; they love it because it is anti-authority.'
    ) },
    { type: 'p', text: L(
      'لكن أخطر عيوبها عنده ليس السرقة: إنها **كمّيتها الثابتة**. فكلّما زادت المنتجات صارت كلّ «بيتكوين» أندر فهبطت الأسعار — انكماشٌ يُسرّع الانهيار. وحين يقع الانهيار لا يمكن ضخّ مالٍ جديد لإنقاذ الاقتصاد. وليس هذا تخميناً: هذا ما حدث في أزمة **١٩٢٩** حين ربطت الحكومات كمّية النقد بما تملك من ذهب — **معيار الذهب** — ولم يأتِ الفرج إلا حين فكّت بريطانيا هذا الرباط سنة ١٩٣١ وحكومة روزفلت سنة ١٩٣٣.',
      'But its worst flaw, to him, is not theft: it is **its fixed quantity**. As the economy produces more, each bitcoin grows scarcer and prices fall — deflation that makes a crash more likely. And when the crash comes, no new money can be pumped in to save the economy. This is not speculation: it is what happened around **1929**, when governments tied the quantity of currency to their gold — **the Gold Standard** — and relief came only when Britain broke the link in 1931 and Roosevelt’s government in 1933.'
    ) },
    { type: 'callout', variant: 'note', title: L('من خارج الكتاب: ما بعد معيار الذهب', 'From outside the book: after the Gold Standard'), text: L(
      'لم تنتهِ القصّة في ١٩٣٣. في **بريتون وودز** بالولايات المتحدة، صيف ١٩٤٤، اتّفق الحلفاء على نظامٍ جديد: عملاتهم مربوطةٌ بالدولار، والدولار وحده قابلٌ للتحويل إلى ذهب. ثم في **١٥ أغسطس ١٩٧١** أوقف الرئيس **ريتشارد نيكسون** تحويل الدولار إلى ذهب، فصار مال العالم كلّه منذ ذلك اليوم مالاً لا يسنده إلا قرار الدول وثقة الناس — المال «السياسي» الذي يتحدّث عنه هذا الفصل، والذي جاءت «بيتكوين» تحتجّ عليه. ولفاروفاكيس كتابٌ كاملٌ عن تلك الحقبة: «المينوتور العالمي» (٢٠١١).',
      'The story didn’t end in 1933. At **Bretton Woods** in the United States, in the summer of 1944, the Allies agreed a new system: their currencies pegged to the dollar, and the dollar alone convertible into gold. Then on **15 August 1971** President **Richard Nixon** suspended the dollar’s convertibility into gold, and from that day all the world’s money has been backed by nothing but states’ decisions and people’s trust — the “political” money this chapter is about, and which Bitcoin came to protest against. Varoufakis wrote a whole book about that era: The Global Minotaur (2011).'
    ) },
    { type: 'imggrid', images: [
      { src: img('bretton-woods-1944.webp'), alt: L('قاعةٌ مزدحمة بالمندوبين حول طاولاتٍ طويلة', 'A hall crowded with delegates around long tables'),
        caption: L('الجلسة العامّة لمؤتمر بريتون وودز، يوليو ١٩٤٤.', 'The plenary session of the Bretton Woods conference, July 1944.') },
      { src: img('nixon.webp'), alt: L('صورةٌ رسمية لريتشارد نيكسون', 'An official portrait of Richard Nixon'),
        caption: L('ريتشارد نيكسون، الذي فكّ الدولار عن الذهب سنة ١٩٧١.', 'Richard Nixon, who cut the dollar loose from gold in 1971.') },
    ] },

    { type: 'h', text: L('خلاصة: ديمقراطيةٌ للمال', 'In conclusion: democratise money') },
    { type: 'p', text: L(
      'إدارة كمّية النقد هي أملنا الوحيد للعبور بين **«سيلا»** الفقاعات والدَّين، و**«كاريبديس»** الانكماش والركود — الوحشين اللذين مرّ أوديسيوس بينهما في الأوديسة. ولأن أيّ تدخّلٍ سيؤثّر في الأغنياء والفقراء بطرقٍ مختلفة، فلن يكون محايداً أبداً. وما دام المال سياسياً لا محالة، فلا سبيل إلى تمدينه إلا **إضفاء طابعٍ ديمقراطيّ عليه**: صوتٌ واحد لكلّ شخص. ولا يكون ذلك قبل أن نُضفيه على دولنا — وهو أمرٌ عسير، لكنه ليس مستحيلاً.',
      'Managing the money supply is our only hope of passing between the **Scylla** of bubbles and debt and the **Charybdis** of deflation and stagnation — the two monsters Odysseus sailed between in the Odyssey. And since any intervention affects the rich and the poor differently, it can never be neutral. So, money being inescapably political, the only way to civilise it is to **democratise it**: one person, one vote. Which means democratising our states first — a tall order, but perhaps not impossible.'
    ) },
    { type: 'image', src: img('ulysses-sirens-waterhouse.webp'), wide: true,
      alt: L('سفينةٌ إغريقية يحيط بها طيورٌ بوجوه نساء، وبحّارٌ مقيّدٌ إلى الصاري', 'A Greek ship circled by birds with women’s faces, a sailor tied to the mast'),
      caption: L('«أوليسيس والحوريّات» — جون ويليام ووترهاوس، ١٨٩١. في النشيد الثاني عشر من الأوديسة تمرّ سفينة أوديسيوس بالحوريّات، ثم بين سيلا وكاريبديس.',
                 '“Ulysses and the Sirens” — John William Waterhouse, 1891. In Book Twelve of the Odyssey, Odysseus’s ship passes the Sirens, then sails between Scylla and Charybdis.') },
    { type: 'p', text: L(
      'وحين أنهى الفصل سأل أباه، الذي أمضى سنواتٍ سجيناً سياسياً في جزيرتَي ماكرونيسوس وإيكاريا أثناء الحرب الأهلية اليونانية: هل صارت السجائر عملةً هناك أيضاً؟ قال الأب: **لا. كنّا نتقاسم ما يصلنا.** لم يكن يدخّن، لكنه طلب من عمّته أن ترسل له سجائر، ووزّعها على المدخّنين دون أن ينتظر شيئاً. «هنالك درسٌ في مكانٍ ما هنا»، يكتب فاروفاكيس، «لكنني سأترك لكِ مهمّة استخلاصه».',
      'When he finished the chapter he asked his father, who had spent years as a political prisoner on the islands of Makronisos and Ikaria during the Greek Civil War: did cigarettes become currency there too? His father said: **No. We shared whatever we received.** He didn’t smoke, but he asked his aunt to send cigarettes, and handed them to the smokers expecting nothing back. “There is a lesson somewhere here,” Varoufakis writes, “but I shall leave it to you to tease out.”'
    ) },
  ],
}

/* ===================== Chapter 8 ===================== */
export const stupidViruses = {
  slug: 'stupid-viruses',
  icon: '🌳',
  title: L('٨ · فيروساتٌ غبيّة؟', '8 · Stupid Viruses?'),
  lead: L(
    'في «ماتريكس» يقول العميل سميث إن البشر فيروس: لا يتوازنون مع بيئتهم بل يستهلكونها حتى يفنوها. ويخشى فاروفاكيس أنه محقّ — ما دام مجتمع السوق لا يرى في الغابة إلا ما يُباع منها.',
    'In The Matrix, Agent Smith says humans are a virus: they don’t find a balance with their environment, they consume it until it is gone. Varoufakis fears he is right — so long as market society sees in a forest only what can be sold of it.'
  ),
  blocks: [
    { type: 'p', text: L(
      'يستجوب العميل سميث — الآلة في هيئة إنسان — قائد المقاومة مورفيوس، ويشرح له لماذا يقرف من البشر: كلّ ثديٍّ على الكوكب يتوازن مع بيئته إلا أنتم؛ تتكاثرون حتى تستنزفوا كلّ موردٍ ثم تنتقلون إلى غيره، **كالفيروس**. ويرى فاروفاكيس أن سميث متساهل معنا: قضينا على ثلثي غابات الكوكب، وأفرغنا الأنهار، ونفثنا الكربون حتى حمّضنا المحيطات وأذبنا الجليد. نحن رواد فضاء يسمّمون هواءهم. لكن مجرّد أننا نتخيّل سميث — كما تخيّل مارلو فاوست وشيلي فرانكنشتاين — قد يدلّ على أننا نوعٌ له ضمير، قادرٌ على نقد نفسه.',
      'Agent Smith — a machine in human form — interrogates the resistance leader Morpheus and explains why humans disgust him: every mammal on the planet finds an equilibrium with its environment except you; you multiply until you exhaust every resource, then move on, **like a virus**. Varoufakis thinks Smith is going easy on us: we have destroyed two-thirds of the planet’s forests, drained rivers, pumped out carbon until the oceans acidify and the ice melts. We are astronauts poisoning our own oxygen. But the very fact that we imagine Smith — as Marlowe imagined Faustus and Shelley Frankenstein — may show we are a species with a conscience, capable of criticising itself.'
    ) },

    { type: 'h', text: L('القيمة التبادلية في مواجهة كوكب الأرض', 'Exchange value against Planet Earth') },
    { type: 'p', text: L(
      'صيفٌ في إيجينا، وطائراتٌ لإطفاء الحرائق تعبر نحو جبال بارنون، ودخانٌ أسود يحجب الشمس. القلوب تنقبض — لكن **«الاقتصاد» ينتعش**. فأشجار الصنوبر المحترقة لم تكن لها قيمةٌ تبادلية وهي واقفة، مهما عظمت قيمتها الاستعمالية لمن يتنزّه في ظلّها؛ أمّا وقود الطائرات وديزل الشاحنات وإعادة بناء البيوت وخطوط الكهرباء فكلّها قيمةٌ تبادلية تُضاف إلى الناتج. وقبل مجتمع السوق كانت الكوارث البيئية حوادث معزولة. أمّا السكّان الأصليون في أستراليا فبلغوا توازناً مع بيئتهم، وبعد قرنٍ من وصول المستعمرين البريطانيين وتسييجهم الأرض **دُمّرت ثلاثة أخماس الغابات**، والحاجز المرجانيّ العظيم يحتضر.',
      'Summer on Aegina; fire-fighting planes cross towards the Parnon mountains and black smoke blots out the sun. Hearts sink — but **“the economy” perks up**. The burning pines had no exchange value standing, whatever their experiential value to someone walking in their shade; the planes’ kerosene, the trucks’ diesel, the rebuilt houses and power lines are all exchange value added to output. Before market society, environmental catastrophes were isolated events. Aboriginal Australians had reached a balance with their land; within a century of British colonists arriving and enclosing it, **three-fifths of the forests were gone**, and the Great Barrier Reef is dying.'
    ) },

    { type: 'h', text: L('«الأغبياء» بمعناها الأصلي', 'Idiots: the original meaning') },
    { type: 'p', text: L(
      'نهرٌ فيه سلمونٌ مرقّط، ومئة صيّاد. لو اتّفقوا أن يصطاد كلٌّ منهم ساعةً في اليوم لاقتسموا مئتي سمكة إلى الأبد. لكن في مجتمع السوق يتنافسون، وكلٌّ منهم سيصطاد ساعةً أخرى ما دامت تجلب سمكتين على الأقلّ — أكثر ممّا يكسبه في المصنع. فيتضاءل السمك حتى يضطرّوا إلى الصيد طوال النهار ليجمعوا ما كانت تجلبه ساعة. **غباءٌ منظَّم.** والكلمة يونانية: كان **«الإديوتيس»** في أثينا القديمة من لا يفكّر إلا في شأنه الخاص، ثم صارت في الإنجليزية تعني الأحمق. وبالمعنيين، يقول، جعلتنا مجتمعات السوق أغبياء.',
      'A river with trout in it, and a hundred fishermen. If they agreed to fish an hour a day each, they would share two hundred trout for ever. But in a market society they compete, and each will fish another hour so long as it brings at least two fish — more than he would earn at the factory. The trout dwindle until they must fish all day to catch what an hour once brought. **Organised stupidity.** The word is Greek: in ancient Athens an **idiotis** was someone who minded only his own business; English later made it mean a fool. In both senses, he says, market societies have made idiots of us.'
    ) },
    { type: 'figure', id: 'tdTroutRiver' },

    { type: 'h', text: L('هل تلتقي مصلحة الفرد ومصلحة الكوكب؟', 'Can private and planetary interests be wedded?') },
    { type: 'p', text: L(
      'نعم: السكّان الأصليون فعلوها، وفي أوروبا الإقطاعية — على قسوتها — تُركت للطبيعة مساحاتها في الأراضي المشاعة قبل تسليعها. وأحد الحلول أن يُفرض الاتّفاق قانوناً: ساعةٌ واحدة لكلّ صيّاد. وفي **الإكوادور** عُدّل الدستور ليعترف بحقّ الغابة المطيرة في الحماية لذاتها، بصرف النظر عن قيمتها التبادلية — سابقةٌ في تاريخ الدساتير. لكن السؤال الأكبر: كيف نحمّل المجتمع مسؤوليةً جماعية عن موارد يملكها قلّةٌ يتحكّمون في الحكومات؟ يقول العامل الذي لا يملك أرضاً: بالملكية الجماعية. ويقول المالك: الحكومات فاسدة، والتعاونيات عاجزة — وكما قال أوسكار وايلد، «مشكلة الاشتراكية أنها تستهلك أمسياتٍ كثيرة».',
      'Yes: the Aboriginal peoples managed it, and feudal Europe — for all its cruelty — left nature room on its commons before they were commodified. One remedy is to impose the agreement by law: one hour per fisherman. **Ecuador** amended its constitution to recognise the rainforest’s right to protection for its own sake, whatever its exchange value — a first in constitutional history. But the larger question: how do you make a society collectively responsible for resources owned by a few who sway its governments? The landless worker says: collective ownership. The owner says: governments are corrupt, cooperatives useless — as Oscar Wilde put it, “the trouble with socialism is that it takes too many evenings”.'
    ) },

    { type: 'h', text: L('«مزيدٌ من الأسواق، رجاءً!»', '“More markets, please!”') },
    { type: 'p', text: L(
      'وحلّ المالك: المشكلة أن الغابة والنهر والهواء ملكٌ للجميع، أي لا أحد — فلنعطها لمن يقدر أن يربح منها، فيحميها. سيبيع تذاكر للصيد ويحصّل رسوماً على التلوّث وعلى النزهة. أليس هذا هو الإقطاع؟ «كلا»، يجيب المدافعون، «فمن يربح أكثر سيشتري أكثر». وقد طُبّق بعضه: **أسواق الانبعاثات**، حيث تُمنح الشركات حصصاً من التلوّث تبيعها وتشتريها. والمفارقة أن هذا الحلّ الذي يُقترح لأن الحكومة لا يُوثق بها **لا يعمل إلا بالحكومة**: هي من تحدّد الحصص وتراقب الانبعاثات وتعاقب المخالف. المشكلة ليست كراهيتهم للدولة، بل كراهيتهم لتدخّلٍ يمسّ ملكيّتهم.',
      'The owner’s answer: the trouble is that forest, river and air belong to everyone, which is to say no one — so give them to someone who can profit from them, and he will protect them. He will sell fishing tickets and charge for pollution and for picnics. Isn’t that feudalism? “No,” the defenders reply, “whoever can profit most will buy them.” Some of it has been tried: **emissions markets**, where firms are given pollution quotas to buy and sell. The irony is that a solution proposed because government can’t be trusted **works only through government**: it sets the quotas, monitors the emissions, punishes the cheats. Their problem is not with the state but with interventions that touch their property.'
    ) },

    { type: 'h', text: L('الحلّ العمليّ الوحيد: ديمقراطيةٌ أصيلة', 'The only practical solution: authentic democracy') },
    { type: 'p', text: L(
      'هكذا يربط الكتاب خيوطه: ديمقراطيةٌ للتكنولوجيا في الفصل السادس، وللمال في السابع، ولموارد الكوكب هنا. وسيتّسم عصر ابنته بصراعٍ بين شعارين: **«سلِّعوا كلّ شيء!»** و**«أضفوا طابعاً ديمقراطياً على كلّ شيء!»**. في السوق وفي الديمقراطية نصوّت؛ لكن في الديمقراطية لكلٍّ منّا صوتٌ واحد — ما سمّاه اليونان «الإيسيغوريا»، المساواة في الكلام — وفي السوق عدد أصواتك بعدد نقودك. فلو خُصخص الغلاف الجوّي، هل يحقّ لكبار المساهمين، الذين لن يغرق بيتٌ لهم أبداً، أن يقرّروا مصير بيوت بنغلاديش وجزر المالديف؟ الديمقراطية، على عيوبها، هي أملنا الوحيد في ألّا نتصرّف كفيروساتٍ غبيّة — **أن نُثبت أن العميل سميث مخطئ.**',
      'So the book ties its threads together: democracy for technology in chapter six, for money in chapter seven, and for the planet’s resources here. His daughter’s era, he writes, will be defined by a clash between two slogans: **“Commodify everything!”** and **“Democratise everything!”**. We vote in markets and in democracies; but in a democracy each of us has one vote — what the Greeks called isegoria, equal weight for every voice — while in a market your votes are as many as your money. If the atmosphere were privatised, should majority shareholders whose homes will never flood decide the fate of homes in Bangladesh and the Maldives? Democracy, for all its flaws, is our only hope of not behaving like stupid viruses — **of proving Agent Smith wrong.**'
    ) },
  ],
}

/* ===================== Epilogue ===================== */
export const epilogue = {
  slug: 'epilogue',
  icon: '🔍',
  title: L('خاتمة', 'Epilogue'),
  lead: L(
    'آلةٌ تمنحك الحياة الأمثل بمقاييسك — بلا عودة. لماذا نرفضها؟ وما علاقة ذلك بالاقتصاد؟ ثم دعوةٌ أخيرة: ألّا نترك الاقتصاد للاقتصاديين.',
    'A machine that gives you the best possible life by your own lights — with no way back. Why do we refuse it, and what has that to do with the economy? Then a last plea: don’t leave the economy to the economists.'
  ),
  blocks: [
    { type: 'p', text: L(
      'يخشى الأب أن تكون ابنته تتساءل طوال الكتاب: كيف ظنّ أبي أنني أبالي؟ فيطلب منها انتباهاً أخيراً لتجربةٍ فكرية: صديقهم كوستاس، العالِم المجنون، بنى حاسوباً اسمه **HALPEVAM** يقرأ موجات الدماغ ويصنع لكلٍّ منّا حياةً افتراضية هي الأفضل بمقاييسه هو، دون أن يغيّر رغباته. ارسم باباً على الجدار بقلمٍ سحريّ واعبُر — كما يعبر هاري بوتر إلى رصيف «تسعة وثلاثة أرباع» — وسيعتني بجسدك آليّون. الشرط الوحيد: **لا عودة.**',
      'The father worries his daughter has spent the whole book wondering how Dad mistook her for someone who cares. So he begs a last moment for a thought experiment: their friend Kostas, a mad scientist, has built a computer called **HALPEVAM** that reads brainwaves and builds each of us the best possible virtual life by our own standards, without ever changing our desires. Draw a door on a wall with a magic pen and step through — as Harry Potter does to Platform Nine and Three-Quarters — and androids will tend your body. One condition: **no way back.**'
    ) },
    { type: 'figure', id: 'tdHalpevam' },

    { type: 'h', text: L('ما بعد الإشباع', 'Beyond satisfaction') },
    { type: 'p', text: L(
      'من يرفض العبور يرفض أن يكون إشباع الرغبات كلّ ما يهمّ. ويستشهد بجون ستيوارت مِل (١٨٦٣): **أن تكون إنساناً غير راضٍ خيرٌ من أن تكون خنزيراً راضياً، وأن تكون سقراط غير راضٍ خيرٌ من أن تكون أحمق راضياً.** فالسعادة ليست كالتنقيب عن الذهب: للذهب اختبارٌ كيميائيّ، أمّا السعادة الحقيقية فـ**«يودايمونيا»** — ازدهارٌ وصيرورة تتغيّر فيها رغباتنا نفسها، بالصراع مع عالمٍ يرفض أن يمنحنا كلّ شيء، وبالصراع في داخلنا: أريد هذا، لكن هل ينبغي أن أريده؟ ولهذا HALPEVAM، مهما خلصت نيّته، سجنٌ في رغباتٍ متجمّدة. **ومجتمع السوق يحاول ما يحاوله HALPEVAM: إشباع رغباتك.** وهو يفشل فيه — لكن الأسوأ أن هدفه نفسه ما كان ينبغي أن يتحقّق.',
      'Whoever refuses to step through rejects the idea that satisfying preferences is all that matters. He quotes John Stuart Mill (1863): **it is better to be a human being dissatisfied than a pig satisfied; better to be Socrates dissatisfied than a fool satisfied.** Happiness is not like digging for gold: gold has a chemical test, but real happiness is **eudaimonia** — flourishing, a becoming in which our desires themselves change, through conflict with a world that refuses us everything and conflict within: I want this, but should I want it? So HALPEVAM, however well meant, is a prison of frozen preferences. **And market society attempts what HALPEVAM attempts: to satisfy your preferences.** It fails at it — but worse, its goal is one that should never be met.'
    ) },

    { type: 'h', text: L('الحرّية والمول', 'Freedom and the mall') },
    { type: 'p', text: L(
      'يستعير من هنري ديفيد ثورو صورة السعادة فراشةً: كلّما طاردتها هربت، وإن انشغلت بغيرها حطّت على كتفك. وأشدّ ما يخيفه أن يكون ألعوبةً بأيدي قوىً لا يراها — ولهذا نحبّ أفلاماً مثل «ماتريكس» و«في فور فانديتا». ومجتمعات السوق لا تصنع آلاتٍ وثروةً وديوناً فحسب، بل **تصنع فينا الرغبات** التي تُديمها. والمثال الأوضح **المول**: عمارته وموسيقاه وتصميمه كلّها لتخدير العقل ودفعنا إلى الخروج محمّلين بما لم نحتجه. ويضيف أداتين أخريين للتلقين: الإعلام، و— أقواها — **علم الاقتصاد نفسه**.',
      'He borrows Henry David Thoreau’s image of happiness as a butterfly: chase it and it eludes you; turn to other things and it settles on your shoulder. What frightens him most is being the plaything of forces he cannot see — which is why we love films like The Matrix and V for Vendetta. Market societies manufacture not only machines, wealth and debt but **the desires in us** that keep them going. The clearest example is **the mall**: its architecture, music and design all meant to numb the mind and send us out laden with things we never needed. He adds two more tools of indoctrination: the media, and — the most potent — **economics itself**.'
    ) },

    { type: 'h', text: L('الأيديولوجيا: لاهوتٌ بالمعادلات', 'Ideology: theology with equations') },
    { type: 'p', text: L(
      'في الفصل الأوّل سأل: كيف حكمت القلّة الأكثرية دون أن تثور؟ بأيديولوجيا. وكان الدين يقدّمها لقرون. فلمّا تراجع مع صعود العلم، احتاجت الطبقة الحاكمة سرديّةً جديدة، فاستعارت رياضيّات الفيزيائيين لتُثبت بالمعادلات أن مجتمع السوق هو النظام الطبيعيّ، كأنما صنعته **«يدٌ خفيّة»** — بعبارة أشهر آبائه، **آدم سميث**. وهكذا صار علم الاقتصاد دينها العلمانيّ.',
      'In the first chapter he asked how the few ruled the many without revolt. With an ideology — which religion supplied for centuries. When religion retreated before science, the ruling class needed a new story, and borrowed physicists’ mathematics to prove with equations that market society is the natural order, as if made by an **“invisible hand”** — in the words of its most famous founding father, **Adam Smith**. So economics became its secular religion.'
    ) },
    { type: 'imggrid', images: [
      { src: img('wealth-of-nations-ar.webp'), alt: L('غلاف الطبعة العربية من «ثروة الأمم»', 'Cover of the Arabic edition of The Wealth of Nations'),
        caption: L('**«ثروة الأمم»** لآدم سميث بالعربية.', '**The Wealth of Nations** by Adam Smith, in Arabic.') },
      { src: img('wealth-of-nations-en.webp'), alt: L('غلاف «ثروة الأمم»', 'Cover of The Wealth of Nations'),
        caption: L('صدر ١٧٧٦، وفيه العبارة الشهيرة عن «اليد الخفية».', 'Published in 1776; it contains the famous phrase about the “invisible hand”.') },
    ] },
    { type: 'p', text: L(
      'لماذا صار اقتصادياً؟ **لأنه رفض أن يترك الاقتصاد للخبراء.** وكلّما فهم نماذجهم أدرك أن ألمعها لا يُحلّ رياضياً إلا بعد أن تُنزع منه حقيقة العمل والمال والدَّين التي يرويها الكتاب. ويشبّه الخبراء بعرّافي قبيلة **الأزاندي** التي درسها الأنثروبولوجي إي. إي. إيفانز-بريتشارد في الثلاثينيات: كلّما أخطأت نبوءتهم فسّروا الخطأ بمفاهيم غيبيّة أخرى. «البطالة الطبيعية»، و«تحرير الأسواق»، و«الخصخصة»، ثم «مرونة سوق العمل»… وهكذا دواليك. الاقتصاد ليس علماً كالفيزياء، لأن لا مختبر يعيد التاريخ: لا نعرف ماذا كان سيحدث لو طبعت الدولة سنة ١٩٢٩ مالاً للفقراء بدل التقشّف. والاقتصاديون، على أحسن حال، **«فلاسفةٌ دنيويون»**.',
      'Why did he become an economist? **Because he refused to leave the economy to the experts.** The better he understood their models, the clearer it became that the most brilliant could only be solved mathematically once the reality of labour, money and debt that this book describes had been stripped out. He likens the experts to the oracles of the **Azande**, studied by the anthropologist E. E. Evans-Pritchard in the 1930s: whenever a prophecy failed, they explained the failure with further mystical notions. “Natural unemployment”, “deregulation”, “privatisation”, then “labour market flexibility”… and so on. Economics is not a science like physics, because no laboratory can rerun history: we cannot know what would have happened had the state printed money for the poor in 1929 instead of choosing austerity. Economists are, at best, **“worldly philosophers”**.'
    ) },

    { type: 'h', text: L('قفزةٌ أرخميدية', 'An Archimedean leap') },
    { type: 'p', text: L(
      '«أعطني مكاناً أقف فيه، ورافعةً طويلة بما يكفي، فأحرّك الأرض»، قال أرخميدس. كلّ نظام هيمنة يلفّنا بسرديّاته حتى لا نرى ما وراءها؛ وأن نخطو خطوةً أو اثنتين خارجه يكشف لنا كم هو ناقصٌ ومضحك. ويذكّر ابنته بأن اسمها **كسينيا** من اليونانية «كسينوس»، الغريب، ومعناه **الإحسان إلى الغرباء** — وأن خير طريقةٍ لترى بلدك أن تنظر إليه بعينَي غريبٍ أو لاجئ. ويختم بالحرّية التي تأتي من فهم الاقتصاد، ومن القدرة على الجواب عن سؤالٍ بتريليون دولار: **«من يفعل ماذا بمن، هنا وأبعد من هنا؟»**',
      '“Give me somewhere to stand and a lever long enough, and I shall move the Earth,” said Archimedes. Every system of domination wraps us in its stories until we cannot see past them; a step or two outside shows how imperfect, how ludicrous, they are. He reminds his daughter that her name, **Xenia**, comes from the Greek xenos, stranger, and means **kindness to strangers** — and that the best way to see your own country is through the eyes of an outsider, a refugee. He ends with the freedom that comes from understanding the economy, and from being able to answer the trillion-dollar question: **“Who does what to whom, around here and further afield?”**'
    ) },
    { type: 'p', text: L(
      'وبما أن الكتاب عاد إلى حيث بدأ — إلى سؤال لماذا يملك بعضهم الكثير وغيرهم القليل — يختمه بأبياتٍ من **ت. س. إليوت** عن رحلةٍ تنتهي في نقطة انطلاقها، فنعرف المكان كأنّنا نراه لأوّل مرّة.',
      'And since the book has come full circle — back to why some have so much and others so little — he closes on lines from **T. S. Eliot** about an exploration that ends where it began, so that we know the place as if for the first time.'
    ) },
  ],
}
