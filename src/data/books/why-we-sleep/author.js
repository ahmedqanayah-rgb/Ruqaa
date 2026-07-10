const L = (ar, en) => ({ ar, en })
const port = (f) => `./images/characters/${f}`

/* ===================== About the Author ===================== */
export const author = {
  slug: 'author',
  icon: '✍️',
  title: L('عن المؤلّف', 'About the Author'),
  lead: L(
    'ماثيو ووكر — عالِم الأعصاب وأستاذ علم النفس، ومؤسّس «مركز علوم النوم البشري»، ومؤلّف «لماذا ننام».',
    'Matthew Walker — neuroscientist and professor of psychology, founder of the Center for Human Sleep Science, and author of “Why We Sleep.”'
  ),
  blocks: [
    { type: 'image', src: port('matthew-walker.jpg'), wide: true,
      alt: L('ماثيو ووكر', 'Matthew Walker'),
      caption: L('البروفيسور ماثيو ووكر (Matthew Walker, PhD) — «دبلوماسي النوم».', 'Professor Matthew Walker, PhD — “the Sleep Diplomat.”') },

    { type: 'p', text: L(
      '**ماثيو ووكر (Matthew Walker)** عالِمُ أعصابٍ وعالِمُ نفسٍ بريطاني، من أبرز الأصوات العلمية في العالم في مجال النوم. اشتهر بكتابه **«لماذا ننام» (Why We Sleep)** وبأسلوبه في تبسيط العلم للجمهور العام حتى لُقّب بـ«دبلوماسي النوم (The Sleep Diplomat)».',
      '**Matthew Walker** is a British neuroscientist and psychologist, and one of the world’s most prominent scientific voices on sleep. He is best known for his book **“Why We Sleep”** and for making the science accessible to a general audience — earning him the nickname **“the Sleep Diplomat.”**'
    ) },

    { type: 'h', text: L('النشأة والتعليم', 'Background and education') },
    { type: 'ul', items: [
      L('وُلد في مدينة **ليفربول (Liverpool)** بإنجلترا عام **١٩٧٢/١٩٧٣**.',
        'Born in **Liverpool**, England, in **1972/1973**.'),
      L('نال شهادة البكالوريوس في **علم الأعصاب** من **جامعة نوتنغهام (University of Nottingham)** عام **١٩٩٦**.',
        'Earned a BSc in **neuroscience** from the **University of Nottingham** in **1996**.'),
      L('حصل على الدكتوراه في **فيزيولوجيا الأعصاب** من **جامعة نيوكاسل (Newcastle University)** عام **١٩٩٩**.',
        'Received a PhD in **neurophysiology** from **Newcastle University** in **1999**.'),
    ] },

    { type: 'h', text: L('المسيرة الأكاديمية', 'Academic career') },
    { type: 'ul', items: [
      L('عام **٢٠٠٤** صار أستاذاً مساعداً في **الطبّ النفسي** بكلّية طبّ **هارفارد (Harvard Medical School)**.',
        'In **2004** he became an assistant professor of **psychiatry** at **Harvard Medical School**.'),
      L('انتقل عام **٢٠٠٧** إلى **جامعة كاليفورنيا في بيركلي (UC Berkeley)** أستاذاً لعلم الأعصاب وعلم النفس، وأسّس **«مركز علوم النوم البشري» (Center for Human Sleep Science)** وتولّى إدارته.',
        'In **2007** he moved to the **University of California, Berkeley** as a professor of neuroscience and psychology, and founded and directed the **Center for Human Sleep Science**.'),
      L('في **١ يناير ٢٠٢٦** التحق بـ**جامعة تكساس في دالاس (UT Dallas)** مديراً مؤسِّساً لـ**«مختبرات ابتكار النوم» (Sleep Innovation Laboratories)** وأستاذاً لعلم الأعصاب والهندسة الحيوية.',
        'On **1 January 2026** he joined **UT Dallas** as the inaugural director of the **Sleep Innovation Laboratories** and a professor of neuroscience and bioengineering.'),
    ] },

    { type: 'h', text: L('أبحاثه', 'His research') },
    { type: 'p', text: L(
      'تتناول أبحاث ووكر أثرَ النوم في **صحّة الإنسان والمرض**، وتغطّي طيفاً واسعاً: **ألزهايمر (Alzheimer’s)** وباركنسون (Parkinson’s)، والسرطان، والاكتئاب والقلق، والأرق، وأمراض القلب والأوعية، والسمنة والسكري. نال تمويلاتٍ بحثية من **مؤسسة العلوم الوطنية (NSF)** و**المعاهد الوطنية للصحة (NIH)**، وهو **زميل كافلي (Kavli Fellow)** في الأكاديمية الوطنية للعلوم.',
      'Walker’s research examines the impact of sleep on **human health and disease**, spanning a wide range: **Alzheimer’s** and Parkinson’s disease, cancer, depression and anxiety, insomnia, cardiovascular disease, obesity and diabetes. He has received research funding from the **National Science Foundation (NSF)** and the **National Institutes of Health (NIH)**, and is a **Kavli Fellow** of the National Academy of Sciences.'
    ) },

    { type: 'h', text: L('كتاب «لماذا ننام»', 'The book “Why We Sleep”') },
    { type: 'p', text: L(
      'صدر كتابه الأوّل **«لماذا ننام: إطلاق قوّة النوم والأحلام» (Why We Sleep: Unlocking the Power of Sleep and Dreams)** عام **٢٠١٧**، وصار من أكثر الكتب مبيعاً في الولايات المتحدة والعالم. يجمع الكتاب آلاف الدراسات في حجّةٍ واحدة: أن النوم ضرورةٌ بيولوجية لا تُفاوَض، وأن حرمانه يرتبط بأمراضٍ خطيرة كثيرة.',
      'His first book, **“Why We Sleep: Unlocking the Power of Sleep and Dreams,”** was published in **2017** and became a bestseller in the US and internationally. It gathers thousands of studies into a single argument: that sleep is a non-negotiable biological necessity, and that its loss is linked to many serious diseases.'
    ) },

    { type: 'h', text: L('النشاط العامّ والإعلام', 'Public engagement and media') },
    { type: 'ul', items: [
      L('محاضرة **TED** الشهيرة **«النوم قوّتك الخارقة» (Sleep is your superpower)** (٢٠١٩)، وشاهدها عشرات الملايين.',
        'His famous **TED talk “Sleep is your superpower”** (2019), watched by tens of millions.'),
      L('يقدّم **«بودكاست مات ووكر» (The Matt Walker Podcast)** — حلقاتٌ قصيرة عن النوم والدماغ والجسد.',
        'He hosts **The Matt Walker Podcast** — short episodes on sleep, the brain and the body.'),
      L('عمل **عالِمَ نومٍ لدى غوغل (Google)** (عبر مشروع Baseline التابع لـVerily) في تطوير مذكّرات النوم.',
        'He served as a **sleep scientist at Google** (via Verily’s Project Baseline), helping develop sleep diaries.'),
      L('ظهر في برامج ومنصّاتٍ واسعة الانتشار (منها بودكاست جو روغان، ٢٠١٨) نشراً للوعي بأهمّية النوم.',
        'He has appeared on widely followed programmes (including the Joe Rogan Experience, 2018) to spread awareness of sleep’s importance.'),
    ] },

    { type: 'callout', variant: 'note', title: L('ملاحظة نقدية (للتوازن)', 'A critical note (for balance)'), text: L(
      'رغم شعبية الكتاب الواسعة، وجّه بعض الباحثين المستقلّين انتقاداتٍ لبعض ما ورد فيه، معتبرين أن أرقاماً وأدلّةً قُدّمت بمبالغةٍ أو انتقائية في مواضع. كما سُحبت ورقةٌ بحثية له من مجلة **Neuron** عام ٢٠٢٠ لتداخلها مع منشورٍ سابق. ذكرُ ذلك لا ينفي القيمة العلمية الكبيرة للكتاب، لكنه يذكّر بأهمّية القراءة النقدية (انظر المحور النقدي في قسم النقاش).',
      'Despite the book’s wide popularity, some independent researchers have criticised parts of it, arguing that certain figures and evidence were, in places, overstated or presented selectively. A research paper of his was also retracted from the journal **Neuron** in 2020 for overlap with a prior publication. Noting this does not negate the book’s substantial scientific value, but it underscores the importance of critical reading (see the critical lens in the Discussion section).'
    ) },
  ],
}
