/*
 * "The book under scrutiny" — critical reception of Why We Sleep, plus the
 * club's own verdict.
 *
 * Every criticism here is sourced and paired with the author's reply where one
 * exists; the point is to read the book critically, not to dismiss it. If you
 * edit these, keep the claim → critique → response shape and keep the links.
 */
const L = (ar, en) => ({ ar, en })

/* The club's own opinion — edit freely, this is the club's voice, not a fact. */
export const verdict = {
  rating: 4,
  text: L(
    'كتابٌ غيّر نظرتنا إلى ثلث أعمارنا، ويستحقّ كلّ ساعةٍ نقضيها معه. لكن اقرأه كصوتِ مُدافعٍ شغوفٍ عن قضية، لا كمرجعٍ نهائي: حجّته العامّة متينة ومدعومة، وبعضُ أرقامه المفردة مبالَغٌ فيها — وقد وثّق النقّاد ذلك بالتفصيل.',
    'A book that changed how we see a third of our lives, and it earns every hour you give it. But read it as a passionate advocate for a cause rather than a final reference: its broad argument is solid and well supported, while some of its individual numbers are overstated — and critics have documented that in detail.'
  ),
  readIf: L(
    'تريد أن تفهم لماذا يعمل النوم كدواءٍ وقائيّ، وتحبّ العلم حين يُروى بحرارة وقصص.',
    'You want to understand why sleep works like preventive medicine, and you like science told warmly, through stories.'
  ),
  caveat: L(
    'الأرقام المفردة — خاصّةً ما يتعلّق بالسرطان وطول العمر. خذ الاتّجاه العامّ، لا الرقم الدقيق.',
    'The individual statistics — especially those about cancer and lifespan. Take the direction of travel, not the precise figure.'
  ),
  reception: 'reception',
}

export const reception = {
  slug: 'reception',
  icon: '⚖️',
  title: L('الكتاب في الميزان', 'The book under scrutiny'),
  lead: L(
    'نقرأ الكتاب، ثم نقرأ ما قيل ضدّه. هذا القسم ليس هدماً للكتاب بل إكمالٌ له — وأفضل جلساتنا تبدأ من هنا.',
    'We read the book, then we read what was said against it. This section isn’t a demolition — it completes the book, and our best sessions start here.'
  ),
  blocks: [
    { type: 'p', text: L(
      'صدر «لماذا ننام» عام ٢٠١٧ فصار من أكثر كتب العلم مبيعاً وتأثيراً في العقد. وفي نوفمبر ٢٠١٩ نشر الباحث **أليكسي غوزي (Alexey Guzey)** مقالةً مطوّلة قال فيها إنه أمضى نحو ١٣٠ ساعة في تدقيق **الفصل الأول وحده** — عشر صفحات، أقلّ من ٤٪ من الكتاب — ووجد فيه سلسلةً من الأخطاء. ما يلي أبرز ما أثاره، وما ردّ به المؤلّف.',
      '“Why We Sleep” appeared in 2017 and became one of the decade’s best-selling and most influential science books. In November 2019 the researcher **Alexey Guzey** published a long essay saying he had spent some 130 hours fact-checking **the first chapter alone** — ten pages, under 4% of the book — and found a series of errors in it. Here are the main points he raised, and how the author replied.'
    ) },

    { type: 'debate',
      topic: L('«وباءُ فقدان النوم» ومنظّمة الصحّة العالمية', 'The “sleep-loss epidemic” and the WHO'),
      claim: L(
        'يذكر الكتاب أن **منظّمة الصحّة العالمية (WHO)** أعلنت «وباء فقدان نوم» في الدول الصناعية.',
        'The book states that the **World Health Organization** has declared a “sleep loss epidemic” throughout industrialised nations.'
      ),
      critique: L(
        'لم يعثر غوزي على أيّ أثرٍ لإعلانٍ كهذا من المنظّمة، والمصدر المُحال إليه في الكتاب لا يذكر المنظّمة ولا الوباء.',
        'Guzey found no record of any such declaration by the WHO, and the source the book cites mentions neither the organisation nor an epidemic.'
      ),
      critic: L('أليكسي غوزي، ٢٠١٩', 'Alexey Guzey, 2019'),
    },

    { type: 'debate',
      topic: L('النوم والسرطان', 'Sleep and cancer'),
      claim: L(
        'من أشهر جُمل الكتاب: النومُ أقلّ من ست أو سبع ساعاتٍ بانتظام «يهدم مناعتك، ويضاعف خطر إصابتك بالسرطان».',
        'One of the book’s most-quoted lines: routinely sleeping less than six or seven hours “demolishes your immune system, more than doubling your risk of cancer.”'
      ),
      critique: L(
        'مراجعةٌ منهجية نُشرت عام ٢٠١٨ وشملت أكثر من مليونٍ ونصف مشارك لم تجد ارتباطاً بين مدّة النوم — قصيرةً كانت أم طويلة — وبين خطر السرطان إجمالاً.',
        'A 2018 systematic review covering more than 1.5 million participants found no association between sleep duration — short or long — and overall cancer risk.'
      ),
      critic: L('أليكسي غوزي، نقلاً عن أدبيّات لاحقة', 'Alexey Guzey, citing later literature'),
    },

    { type: 'debate',
      topic: L('«كلّما قلّ نومُك قصُر عمرك»', '“The shorter your sleep, the shorter your life span”'),
      claim: L(
        'يقدّم الكتاب العلاقة خطّيةً وبسيطة: نومٌ أقلّ ⟵ عمرٌ أقصر.',
        'The book presents the relationship as simple and linear: less sleep ⟶ a shorter life.'
      ),
      critique: L(
        'التحليلات البَعدية (Meta-analyses) تُظهر منحنىً على شكل حرف **U**: النوم القصير *والطويل* كلاهما يرتبط بوفياتٍ أعلى، وأدنى نسبةٍ تقع عند سبع ساعاتٍ تقريباً. الصورة أعقد من خطٍّ مستقيم.',
        'Meta-analyses show a **U-shaped** curve: both short *and* long sleep are associated with higher mortality, with the lowest rate at roughly seven hours. The picture is more complicated than a straight line.'
      ),
      critic: L('أليكسي غوزي، ٢٠١٩', 'Alexey Guzey, 2019'),
    },

    { type: 'debate',
      topic: L('العمود المحذوف من الرسم البياني', 'The column removed from the graph'),
      claim: L(
        'يعرض الكتاب رسماً بيانياً مقتبساً من دراسة **ميليفسكي وزملائه (Milewski et al., 2014)** عن إصابات الرياضيين الصغار، ليدعم أن قلّة النوم تعني إصاباتٍ أكثر.',
        'The book reproduces a graph adapted from **Milewski et al. (2014)** on injuries in young athletes, supporting the idea that less sleep means more injuries.'
      ),
      critique: L(
        'في الرسم الأصلي عمودٌ لِمَن ينامون **خمس ساعات** يُظهر إصاباتٍ *أقلّ* ممّن ينامون ستّاً — وهو ما يناقض الاتّجاه المعروض. هذا العمود غائبٌ عن النسخة المقتبسة في الكتاب. هذه أوضح النقاط وأصعبها على التبرير.',
        'The original chart has a bar for people sleeping **five hours** showing *fewer* injuries than six — cutting against the trend being illustrated. That bar is absent from the book’s adapted version. This is the most concrete of the criticisms and the hardest to explain away.'
      ),
      critic: L('أليكسي غوزي، ٢٠١٩', 'Alexey Guzey, 2019'),
    },

    { type: 'h', text: L('وماذا قال المؤلّف؟', 'And what did the author say?') },
    { type: 'p', text: L(
      'نشر **ماثيو ووكر** في ديسمبر ٢٠١٩ تدوينةً بعنوان «إجاباتٌ عن أسئلة القرّاء»، تناول فيها عدداً من النقاط وذكر أن أخطاءً صُحّحت في طبعاتٍ لاحقة، وقال في مقابلاتٍ إن تصحيح الأخطاء جزءٌ من السلوك العلمي السليم. ويرى غوزي أن التدوينة لم تُجب مباشرةً عن اعتراضاته المحدّدة. أمّا مراجعة جامعة **بيركلي** الداخلية فوصفت ما وُجد بأنه «طفيف».',
      '**Matthew Walker** published a post in December 2019 titled “responses to questions from readers,” addressing a number of points and noting that errors had been corrected in later printings; in interviews he has said that correcting errors is part of sound scholarly conduct. Guzey maintains the post did not directly answer his specific objections. An internal review at **Berkeley** characterised what was found as “minor.”'
    ) },

    { type: 'callout', variant: 'key', title: L('كيف نقرأه إذن؟', 'So how should we read it?'), text: L(
      'لا شيء ممّا سبق يُلغي الفكرة الكبرى للكتاب: النوم ركنٌ أساسيّ للصحّة الجسدية والنفسية، وهذا مدعومٌ بأدبيّاتٍ واسعة لا خلاف عليها. الخلاف على **قوّة العبارة ودقّة الرقم**، لا على الاتّجاه. اقرأ الكتاب لتفهم *لماذا* يهمّ النوم، وتعامل مع أرقامه المفردة — خاصّةً المذهلة منها — بوصفها دعوةً للتحقّق لا خلاصةً نهائية. وهذه، بالمناسبة، مهارةٌ يستحقّ أيّ كتابٍ علميّ شعبيّ أن نقرأه بها.',
      'None of this cancels the book’s big idea: sleep is a pillar of physical and mental health, and that is supported by a broad, uncontested literature. The dispute is about **how strongly a claim is worded and how precise a number is**, not about the direction. Read the book to understand *why* sleep matters, and treat its individual figures — especially the startling ones — as an invitation to check rather than a final word. That, incidentally, is a skill worth bringing to any popular science book.'
    ) },

    { type: 'sources', title: L('اقرأ بنفسك', 'Read it yourself'), items: [
      { label: L('النقد الأصلي: «كتاب لماذا ننام مليءٌ بالأخطاء العلمية والوقائعية»', 'The original critique: “Why We Sleep Is Riddled with Scientific and Factual Errors”'),
        publisher: L('أليكسي غوزي', 'Alexey Guzey'), url: 'https://guzey.com/books/why-we-sleep/' },
      { label: L('مناقشة النقد عند إحصائيّ متخصّص', 'A statistician’s discussion of the critique'),
        publisher: L('أندرو غيلمان، جامعة كولومبيا', 'Andrew Gelman, Columbia University'),
        url: 'https://statmodeling.stat.columbia.edu/2019/11/18/is-matthew-walkers-why-we-sleep-riddled-with-scientific-and-factual-errors/' },
      { label: L('ردّ ماثيو ووكر على أسئلة القرّاء', 'Matthew Walker’s responses to questions from readers'),
        publisher: L('ماثيو ووكر', 'Matthew Walker'),
        url: 'https://sleepdiplomat.wordpress.com/2019/12/19/why-we-sleep-responses-to-questions-from-readers/' },
    ] },
  ],
}
