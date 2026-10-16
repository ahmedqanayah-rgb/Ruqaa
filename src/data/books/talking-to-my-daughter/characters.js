/*
 * «الشخصيات» — everyone the book leans on, in four groups.
 *
 * Varoufakis interviewed nobody; his cast is the people of his own life, the
 * thinkers he borrows from, and the writers and myths he teaches with. So the
 * first group is the book's own characters — Captain Kostas, Miriam, Maria —
 * and they get monograms, not photos: some are invented, the rest are private
 * people. Several real people have no portrait yet (Rousseau, Radford,
 * Titmuss, Polanyi, Marlowe…); PeopleGrid renders a monogram for a missing
 * `img`, so adding one later is a file plus one line here.
 */
const L = (ar, en) => ({ ar, en })
const port = (f) => `./images/characters/${f.replace(/\.\w+$/, '')}.webp`

export const characters = {
  icon: '👥',
  title: L('شخصيات الكتاب', 'Characters'),
  lead: L(
    'لم يقابل فاروفاكيس خبراء؛ شخصياته أهل حياته، والمفكّرون الذين يستعير منهم، والأدباء والأساطير التي يعلّم بها. هؤلاء هم.',
    'Varoufakis interviewed no experts; his cast is the people of his own life, the thinkers he borrows from, and the writers and myths he teaches with. Here they are.'
  ),
  blocks: [
    { type: 'peoplegroups', groups: [
      { title: L('أهل الكتاب', 'The book’s own people'), people: [
        { name: L('كسينيا', 'Xenia'), tag: L('الابنة التي كُتب لها الكتاب', 'The daughter the book is written to'),
          story: L('ابنة المؤلّف، تعيش في سيدني. سؤالها «لماذا كلّ هذه اللامساواة؟» هو أوّل الكتاب، واسمها — «الإحسان إلى الغرباء» — آخره.', 'The author’s daughter, living in Sydney. Her question “why so much inequality?” opens the book, and her name — “kindness to strangers” — closes it.') },
        { name: L('السيد نابوك', 'Mr Nabuk'), tag: L('مزارعٌ في بلاد ما بين النهرين', 'A Mesopotamian farmer'),
          story: L('أودع قمحه في المخزن المشترك وقبض صَدَفةً منقوشة: أوّل كتابة، وأوّل دَين، وأوّل نقد. يعود في الفصل الرابع ليُثبت أن مال المصرف المركزي ليس جديداً.', 'He left his grain in the common granary and was handed an engraved shell: the first writing, the first debt, the first money. He returns in chapter four to show that central-bank money is nothing new.') },
        { name: L('القبطان كوستاس', 'Captain Kostas'), tag: L('صيّادٌ في إيجينا', 'A fisherman on Aegina'),
          story: L('علقت مرساته فطلب من كسينيا أن تغطس لأجلها. لو عرض عليها خمسة يوروهات لربّما لم تقفز: درس القيمتين.', 'His anchor snagged and he asked Xenia to dive for it. Had he offered her five euros she might not have jumped: the lesson of the two values.') },
        { name: L('باريس', 'Paris'), tag: L('الصبيّ المضحك', 'The funny boy'),
          story: L('ابن أصدقائهم، أضحك الجميع في المطعم. ادفع له عن كلّ ضحكة يجفّ ظُرفه.', 'Their friends’ son, who had the whole taverna laughing. Pay him per laugh and the humour dries up.') },
        { name: L('مريم', 'Miriam'), tag: L('صانعة درّاجات', 'A bicycle-maker'),
          story: L('طلبت نصف مليون جنيه لآلةٍ تصنع إطارات الكربون، فكتبه المصرفيّ في حسابها من العدم. إمّا أن تصير مريمُ المستقبلِ ناجحة، وإمّا يقع الانهيار.', 'She asked for half a million pounds for a carbon-frame machine, and the banker typed it into her account from thin air. Either tomorrow’s Miriam succeeds, or the crash comes.') },
        { name: L('ماريا', 'Maria'), tag: L('صانعة ثلّاجات', 'A fridge-maker'),
          story: L('تفكّر في توظيف فاسيلي، ثم تقرأ أن النقابات قبلت خفض الأجور فتقرّر ألّا توظّف أحداً. صيّاد روسو في ثوب صاحبة مصنع.', 'She is thinking of hiring Wasily, then reads that the unions have accepted a wage cut, and decides to hire no one. Rousseau’s hunter as a factory owner.') },
        { name: L('فاسيلي', 'Wasily'), tag: L('اقتصاديٌّ عاطل', 'An unemployed economist'),
          story: L('نال الدكتوراه سنة ١٩٨٩ ولم يجد عملاً: «أسوأ ما يحدث أن تقرّر بيع روحك للشيطان فتكتشف أن الشيطان لا يشتري».', 'He got his doctorate in 1989 and found no job: the worst is to decide to sell your soul to the devil, only to find the devil isn’t buying.') },
        { name: L('أندرياس', 'Andreas'), tag: L('صاحب بيتٍ في باتموس', 'A house-owner on Patmos'),
          story: L('لا يستطيع بيع بيته الصيفي، فيعرض عليه صديقه عشرة يوروهات. الفرق بين ألّا تبيع وألّا تنال سعرك هو أساس حجّة «منكري البطالة».', 'He can’t sell his summer house, so his friend offers him ten euros. The gap between not selling and not getting your price is the root of the unemployment deniers’ case.') },
        { name: L('والد المؤلّف', 'The author’s father'), tag: L('سجينٌ سياسيّ في الحرب الأهلية اليونانية', 'A political prisoner in the Greek Civil War'),
          story: L('في معسكرات ماكرونيسوس وإيكاريا لم تصر السجائر عملة: «كنّا نتقاسم ما يصلنا». يختم الفصل السابع.', 'In the camps on Makronisos and Ikaria cigarettes never became currency: “we shared whatever we received.” He closes chapter seven.') },
      ] },

      { title: L('الاقتصاديّون والمفكّرون', 'Economists and thinkers'), people: [
        { img: port('adam-smith.jpg'), name: L('آدم سميث', 'Adam Smith'), tag: L('صاحب «ثروة الأمم»', 'Author of The Wealth of Nations'),
          story: L('الأب المؤسّس لعلم الاقتصاد. عبارته «اليد الخفية» صارت، عند فاروفاكيس، شعار دينٍ علمانيّ يقدّم مجتمع السوق نظاماً طبيعياً.', 'The founding father of economics. His “invisible hand” became, for Varoufakis, the motto of a secular religion presenting market society as the natural order.') },
        { img: port('karl-marx.jpg'), name: L('كارل ماركس', 'Karl Marx'), tag: L('«الشبح» الحاضر في كلّ فكرة', 'The “spectre” behind every thought'),
          story: L('يقول المؤلّف إن ماركس يسكن كلّ أفكاره. منه وصف الآلات بأنها «القوّة التي علينا أن ننحني لها»، والميل إلى الأزمة الذي يمنعها من الاستيلاء الكامل.', 'The author says Marx haunts all his thinking. From him come the machines as “the force we must bow to”, and the tendency to crisis that stops them taking over entirely.') },
        { img: port('john-maynard-keynes.jpg'), name: L('جون ماينارد كينز', 'John Maynard Keynes'), tag: L('«مغالطة التركيب»', 'The “fallacy of composition”'),
          story: L('ما يصحّ على شركةٍ لا يصحّ على الاقتصاد كلّه. ويستشهد الكتاب بمقالته عن «أحفادنا» (١٩٣٠): سيُرى حبّ المال على حقيقته يوماً.', 'What holds for one firm does not hold for the whole economy. The book quotes his 1930 essay on “our grandchildren”: one day the love of money will be seen for what it is.') },
        { name: L('كارل بولاني', 'Karl Polanyi'), tag: L('صاحب «التحوّل الكبير»', 'Author of The Great Transformation'),
          story: L('منه يستعير الكتاب فكرة تحوّل المجتمعات ذات الأسواق إلى مجتمعات سوق، حين صارت الأرض والعمل والأدوات بضائع.', 'The book borrows from him the turn from societies with markets to market societies, when land, labour and tools became commodities.') },
        { name: L('ريتشارد تيتموس', 'Richard Titmuss'), tag: L('باحث «علاقة الهبة»', 'Author of The Gift Relationship'),
          story: L('قارن التبرّع بالدم مجاناً ببيعه، وخلص إلى أن الدفع قد يُنقص العطاء. انظر تحقّق النادي في الفصل الثاني.', 'He compared blood given freely with blood sold, and concluded that payment can reduce giving. See the club’s check in chapter two.') },
        { name: L('ريتشارد رادفورد', 'Richard Radford'), tag: L('الاقتصاديّ الأسير', 'The economist in the camp'),
          story: L('ضابطٌ بريطاني أُسر سنة ١٩٤١، ودوّن كيف صارت السجائر عملةً في معسكر الأسرى. الفصل السابع كلّه قائمٌ على شهادته.', 'A British officer captured in 1941 who recorded how cigarettes became currency in the camp. All of chapter seven rests on his account.') },
        { name: L('جان جاك روسو', 'Jean-Jacques Rousseau'), tag: L('فيلسوف «صيد الأيل»', 'Philosopher of the stag hunt'),
          story: L('حكايته عن صيّادين لا يُصاد الأيل إلا إن وثق كلٌّ منهم بالآخرين هي مفتاح الفصل الخامس: التفاؤل والتشاؤم يحقّقان نفسيهما.', 'His tale of hunters who catch the stag only if each trusts the rest is the key to chapter five: optimism and pessimism fulfil themselves.') },
        { img: port('jared-diamond.jpg'), name: L('جارد دايموند', 'Jared Diamond'), tag: L('صاحب «أسلحة، جراثيم، وفولاذ»', 'Author of Guns, Germs and Steel'),
          story: L('على كتابه يقوم الفصل الأوّل كلّه: الجغرافيا، لا الجينات، هي التي قرّرت من سيستعمر من.', 'The whole first chapter rests on his book: geography, not genes, decided who would colonise whom.') },
        { name: L('ساتوشي ناكاموتو', 'Satoshi Nakamoto'), tag: L('الاسم المستعار وراء «بيتكوين»', 'The pseudonym behind Bitcoin'),
          story: L('شخصٌ أو فريق لم تُعرف هويّته حتى اليوم، أرسل في الأوّل من نوفمبر ٢٠٠٨ الخوارزمية التي قامت عليها أوّل عملةٍ رقمية بلا سلطةٍ مركزية.', 'A person or team still unidentified, who on 1 November 2008 sent the algorithm behind the first digital currency without a central authority.') },
        { name: L('إي. إي. إيفانز-بريتشارد', 'E. E. Evans-Pritchard'), tag: L('أنثروبولوجيّ', 'Anthropologist'),
          story: L('درس عرّافي قبيلة الأزاندي، الذين يفسّرون فشل نبوءاتهم بمفاهيم غيبيّة أخرى. يرى المؤلّف فيهم صورة الاقتصاديين.', 'He studied the oracles of the Azande, who explain failed prophecies with further mystical notions. The author sees economists in them.') },
        { name: L('جون ستيوارت مِل', 'John Stuart Mill'), tag: L('فيلسوفٌ واقتصاديّ', 'Philosopher and economist'),
          story: L('«خيرٌ أن تكون سقراط غير راضٍ من أن تكون أحمق راضياً» — حجّة الخاتمة على آلة HALPEVAM.', '“Better to be Socrates dissatisfied than a fool satisfied” — the epilogue’s argument against the HALPEVAM machine.') },
      ] },

      { title: L('الأدب والأسطورة', 'Literature and myth'), people: [
        { img: port('sophocles.jpg'), name: L('سوفوكليس', 'Sophocles'), tag: L('صاحب «أوديب ملكاً»', 'Author of Oedipus Rex'),
          story: L('نبوءةٌ تحقّق نفسها لأن من سمعها حاول الهرب منها: هكذا يشرح الكتاب سوقَي العمل والمال.', 'A prophecy that fulfils itself because those who hear it try to escape it: the book’s way of explaining the labour and money markets.') },
        { name: L('كريستوفر مارلو', 'Christopher Marlowe'), tag: L('صاحب «الدكتور فاوست»', 'Author of Doctor Faustus'),
          story: L('كتب في القرن السادس عشر عن عالِمٍ باع روحه بعقدٍ موقّعٍ بالدم، فسيق إلى الجحيم — حين كانت الفائدة لا تزال خطيئة.', 'In the sixteenth century he wrote of a scholar who sold his soul by a contract signed in blood and was dragged to hell — when interest was still a sin.') },
        { img: port('goethe.jpg'), name: L('يوهان فولفغانغ فون غوته', 'Johann Wolfgang von Goethe'), tag: L('صاحب «فاوست»', 'Author of Faust'),
          story: L('في نسخته من القرن التاسع عشر يُنقذ فاوست — فقد صار الدَّين مع الفائدة مقبولاً. وله أيضاً «الساحر المتدرّب» عن مخلوقٍ يفلت من صانعه.', 'In his nineteenth-century version Faust is saved — debt with interest had become acceptable. He also wrote The Sorcerer’s Apprentice, about a creation that escapes its maker.') },
        { img: port('mary-shelley.jpg'), name: L('ماري شيلي', 'Mary Shelley'), tag: L('صاحبة «فرانكنشتاين»', 'Author of Frankenstein'),
          story: L('كتبت في ليلةٍ عاصفة عن مخلوقٍ ينقلب على صانعه — رمزاً، عند فاروفاكيس، لتكنولوجيا تستعبد من صنعها.', 'On a stormy night she wrote of a creature that turns on its maker — for Varoufakis, a figure for technology that enslaves its creators.') },
        { name: L('تشارلز ديكنز', 'Charles Dickens'), tag: L('صاحب «ترنيمة عيد الميلاد»', 'Author of A Christmas Carol'),
          story: L('بخيله سكروج يكدّس الفوائد ولا يُنفق، فيكون النقيض الذي يُظهر لماذا يحتاج مجتمع السوق إلى فاوست لا إلى سكروج.', 'His miser Scrooge hoards interest and spends nothing — the opposite that shows why a market society needs Faust, not Scrooge.') },
        { name: L('جون شتاينبك', 'John Steinbeck'), tag: L('صاحب «عناقيد الغضب»', 'Author of The Grapes of Wrath'),
          story: L('بطاطا تُرمى في النهر وبرتقالٌ يُرشّ بالكيروسين والملايين جياع: صورة الكساد حين تتعطّل إعادة التدوير.', 'Potatoes dumped in the river and oranges sprayed with kerosene while millions starve: the image of a slump when recycling breaks down.') },
        { name: L('أوسكار وايلد', 'Oscar Wilde'), tag: L('كاتبٌ ساخر', 'A satirist'),
          story: L('المتهكّم «يعرف ثمن كلّ شيء ولا يعرف قيمة أيّ شيء» — وعنده أيضاً أن الاشتراكية «تستهلك أمسياتٍ كثيرة».', 'The cynic “knows the price of everything and the value of nothing” — and socialism, he said, “takes too many evenings”.') },
        { name: L('هوميروس', 'Homer'), tag: L('شاعر الإلياذة والأوديسة', 'Poet of the Iliad and the Odyssey'),
          story: L('أخيل المُضرب عن القتال، وأوديسيوس بين سيلا وكاريبديس: عالمٌ لم يكن كلّ شيءٍ فيه للبيع.', 'Achilles on strike, Odysseus between Scylla and Charybdis: a world in which not everything was for sale.') },
      ] },

      { title: L('من التاريخ', 'From history'), people: [
        { name: L('جيمس واط', 'James Watt'), tag: L('مخترع المحرّك البخاري', 'Inventor of the steam engine'),
          story: L('محرّكه هو «الحرارة» التي أنضجت الثورة الصناعية — لكنه انتشر بسبب أصحاب مشاريع مدينين يتنافسون، لا بسبب عبقريّته وحدها.', 'His engine was the “heat” that made the Industrial Revolution rise — but it spread because indebted entrepreneurs were competing, not because of its genius alone.') },
        { name: L('اللوديون', 'The Luddites'), tag: L('عمّالٌ إنجليز حطّموا الأنوال', 'English workers who smashed looms'),
          story: L('من أكثر من أُسيء فهمهم: لم يعادوا الآلات، بل أن يملكها قلّة.', 'Among history’s most misunderstood: their quarrel was not with machines, but with how few owned them.') },
        { name: L('فرانكلين روزفلت', 'Franklin D. Roosevelt'), tag: L('الرئيس الأمريكي، ١٩٣٣–١٩٤٥', 'US President, 1933–1945'),
          story: L('فكّت حكومته سنة ١٩٣٣ كمّية النقد عن الذهب، فجاء بعض الفرج بعد ١٩٢٩ — مثال الكتاب على أن المال «غير السياسي» يخنق الاقتصاد.', 'In 1933 his government cut the quantity of money loose from gold, and some relief came after 1929 — the book’s example of how “apolitical” money chokes an economy.') },
      ] },
    ] },
  ],
}
