const L = (ar, en) => ({ ar, en })
const port = (f) => `./images/characters/${f}`

/* ===================== About the Author ===================== */
export const author = {
  slug: 'author',
  icon: '✍️',
  title: L('عن المؤلّف', 'About the Author'),
  lead: L(
    'جوهان هاري — صحفيٌّ وكاتبٌ بريطاني، صاحب كتبٍ رائجة عن الإدمان والاكتئاب والانتباه، ومؤلّف «التركيز المسروق».',
    'Johann Hari — British journalist and author of bestselling books on addiction, depression and attention, and the author of “Stolen Focus.”'
  ),
  blocks: [
    { type: 'image', src: port('johann-hari.jpg'), wide: true,
      alt: L('جوهان هاري', 'Johann Hari'),
      caption: L('الصحفي والكاتب جوهان هاري (Johann Hari).', 'Journalist and author Johann Hari.') },

    { type: 'p', text: L(
      '**جوهان هاري (Johann Hari)** كاتبٌ وصحفيٌّ بريطاني وُلد عام **١٩٧٩** لأمٍّ اسكتلندية وأبٍ سويسري، ونشأ بين لندن وسويسرا. درس **العلوم الاجتماعية والسياسية** في **كلّية كينغز بجامعة كامبريدج (King’s College, Cambridge)**. اشتهر بأسلوبٍ سرديّ يمزج القصص الإنسانية بمقابلاتٍ مع كبار الباحثين، وبكتبٍ تحوّلت إلى الأكثر مبيعاً وحاضراتِ **TED** شاهدها عشرات الملايين.',
      '**Johann Hari** is a British writer and journalist born in **1979** to a Scottish mother and Swiss father, raised between London and Switzerland. He studied **Social and Political Sciences** at **King’s College, Cambridge**. He is known for a narrative style that braids human stories with interviews of leading researchers, and for bestselling books and **TED talks** watched by tens of millions.'
    ) },

    { type: 'h', text: L('مسيرته الصحفية', 'His journalism career') },
    { type: 'p', text: L(
      'بدأ كاتبَ عمودٍ في صحيفة **«الإندبندنت» (The Independent)** ومنابر أخرى، وكتب في السياسة وحقوق الإنسان. نال **جائزة أورويل (Orwell Prize)** للصحافة عام **٢٠٠٨**.',
      'He began as a columnist at **The Independent** and other outlets, writing on politics and human rights. He won the **Orwell Prize** for journalism in **2008**.'
    ) },

    { type: 'h', text: L('جدل عام ٢٠١١', 'The 2011 controversy') },
    { type: 'callout', variant: 'warn', title: L('ما الذي حدث؟', 'What happened?'), text: L(
      'في عام **٢٠١١** واجه هاري اتهاماتٍ جدّية تتعلّق بنزاهة عمله الصحفي: تبيّن أنه كان يقدّم في بعض مقابلاته اقتباساتٍ سبق أن قالها الأشخاص لجهاتٍ أخرى أو كتبوها في مؤلّفاتهم، وكأنها قيلت له مباشرةً في اللقاء. كما اعترف بأنه عدّل صفحاتٍ على **ويكيبيديا (Wikipedia)** باسمٍ مستعار للنيل من منتقديه وتحسين صورته.',
      'In **2011**, Hari faced serious accusations about the integrity of his journalism: it emerged that in some interviews he presented quotations his subjects had given to other outlets — or written in their own books — as if they had been said directly to him. He also admitted editing **Wikipedia** pages under a pseudonym to disparage his critics and burnish his own image.'
    ) },
    { type: 'p', text: L(
      'اعتذر هاري علناً، وأعاد **جائزة أورويل**، وابتعد عن الصحافة اليومية لفترة، ثم خضع لتدريبٍ مهنيّ قبل أن يعود بالكتابة عبر الكتب الاستقصائية الطويلة. يُذكر هذا هنا بشفافية؛ فالكتاب نفسه يُقرأ بعينٍ ناقدة كأيّ عملٍ آخر.',
      'Hari apologised publicly, returned the **Orwell Prize**, stepped back from daily journalism for a time, and undertook professional retraining before returning through long-form investigative books. It is noted here for transparency; the book itself should be read critically, like any other.'
    ) },

    { type: 'h', text: L('كتبه', 'His books') },
    { type: 'ul', items: [
      L('**«مطاردة الصرخة» (Chasing the Scream)** (٢٠١٥) عن «الحرب على المخدّرات» وجذور الإدمان — ومنه محاضرة TED الشهيرة «كلّ ما تظنّ أنك تعرفه عن الإدمان خطأ».',
        '**“Chasing the Scream”** (2015) on the war on drugs and the roots of addiction — the source of his famous TED talk, “Everything you think you know about addiction is wrong.”'),
      L('**«اتصالات مفقودة» (Lost Connections)** (٢٠١٨) يجادل بأن للاكتئاب والقلق أسباباً اجتماعية لا كيميائية فحسب.',
        '**“Lost Connections”** (2018), arguing that depression and anxiety have social causes, not only chemical ones.'),
      L('**«التركيز المسروق» (Stolen Focus)** (٢٠٢٢) — موضوع هذا الموقع: لماذا انهار انتباهنا، وكيف نستعيده.',
        '**“Stolen Focus”** (2022) — the subject of this site: why our attention collapsed, and how to reclaim it.'),
    ] },

    { type: 'h', text: L('كيف وُلد هذا الكتاب', 'How this book was born') },
    { type: 'p', text: L(
      'حين شعر هاري أن قدرته على التركيز تتفتّت، قرّر أن يقضي **ثلاثة أشهر** بلا هاتفٍ ذكيّ ولا إنترنت في بلدة **بروفينستاون (Provincetown)** بولاية ماساتشوستس. لكنه خرج بخلاصةٍ مفاجئة: العلاج الفرديّ وحده لا يكفي، فالمشكلة أعمق من إرادة الفرد. من هناك انطلق ليقابل أكثر من **٢٥٠** خبيراً حول العالم، فكان هذا الكتاب.',
      'When Hari felt his own ability to focus fragmenting, he spent **three months** with no smartphone and no internet in **Provincetown, Massachusetts**. But he came away with a surprising conclusion: individual fixes alone are not enough — the problem runs deeper than personal willpower. From there he set out to interview more than **250** experts around the world, and this book was the result.'
    ) },

    { type: 'callout', variant: 'note', title: L('ملاحظة نقدية (للتوازن)', 'A critical note (for balance)'), text: L(
      'يُنتقد أسلوب هاري أحياناً بأنه يبسّط الأبحاث المعقّدة أو يبالغ في بعض استنتاجاتها لصالح السرد. هذا لا يلغي قيمة الأسئلة التي يطرحها، لكنه يذكّرنا بقراءة الأرقام والدراسات بعينٍ فاحصة — وهو ما نحاول فعله في قسمَي «الدراسات» و«النقاش».',
      'Hari’s style is sometimes criticised for simplifying complex research or overstating some of its conclusions for the sake of the narrative. That does not negate the value of the questions he raises, but it is a reminder to read the numbers and studies critically — which is what we try to do in the “Studies” and “Discussion” sections.'
    ) },
  ],
}
