const L = (ar, en) => ({ ar, en })
const port = (f) => `./images/characters/${f}`

/* ===================== Characters ===================== */
export const characters = {
  slug: 'characters',
  icon: '👥',
  title: L('شخصيات الكتاب', 'Characters'),
  lead: L(
    'قابل هاري أكثر من ٢٥٠ خبيراً حول العالم. هؤلاء أبرز الأصوات التي تبني حجّة الكتاب — وبعض من يخالفونها.',
    'Hari interviewed more than 250 experts around the world. These are the leading voices building the book’s argument — and some who dispute it.'
  ),
  blocks: [
    { type: 'peoplegroups', groups: [
    { title: L('السرعة والتبديل والتدفّق', 'Speed, switching & flow'), people: [
      { img: port('gloria-mark.jpg'), name: L('غلوريا مارك', 'Gloria Mark'), tag: L('عالِمة المقاطعة والانتباه', 'Scientist of interruption'),
        story: L('أستاذة المعلوماتية بجامعة كاليفورنيا (إرفاين)؛ رصدت كم يبقى موظّف المكتب مركّزاً فعلاً، فوجدت أن المقاطعات تمزّق يوم العمل.',
                 'Professor of informatics at UC Irvine; she measured how long an office worker actually stays focused, finding that interruptions shred the working day.') },
      { img: port('earl-miller.jpg'), name: L('إيرل ميلر', 'Earl Miller'), tag: L('عالِم أعصاب — MIT', 'Neuroscientist — MIT'),
        story: L('أثبت أن الدماغ لا يركّز على أمرين معرفيين معاً؛ فما نسمّيه «تعدّد المهامّ» هو تبديلٌ سريع بكلفةٍ خفيّة على الأداء.',
                 'Showed the brain cannot focus on two cognitive tasks at once; what we call “multitasking” is rapid switching with a hidden cost to performance.') },
      { img: port('sune-lehmann.jpg'), name: L('سونه ليمان', 'Sune Lehmann'), tag: L('عالِم بيانات الشبكات', 'Network-data scientist'),
        story: L('قاس كيف يتقلّص «الانتباه الجماعي»: تبقى الموضوعات الرائجة في الصدارة مدداً أقصر عاماً بعد عام.',
                 'Measured how “collective attention” is shrinking: trending topics stay on top for shorter and shorter spans each year.') },
      { img: port('mihaly-csikszentmihalyi.jpg'), name: L('ميهاي تشيكسنتميهايي', 'Mihaly Csikszentmihalyi'), tag: L('صاحب نظرية «التدفّق»', 'Father of “flow”'),
        story: L('عالِم النفس الذي وصف حالة **التدفّق (Flow)**: الانغماس الكامل في نشاطٍ ذي معنى حتى يختفي الزمن — أعمق صور الانتباه.',
                 'The psychologist who described **flow**: total immersion in a meaningful activity until time disappears — the deepest form of attention.') },
      { img: port('adam-gazzaley.jpg'), name: L('آدم غزالي', 'Adam Gazzaley'), tag: L('عالِم أعصاب — «العقل المشتَّت»', 'Neuroscientist — “The Distracted Mind”'),
        story: L('درس كيف يتعامل الدماغ مع التشتيت وتعدّد المهامّ، وشارك في تأليف «العقل المشتَّت».',
                 'Studied how the brain copes with distraction and multitasking, and co-authored “The Distracted Mind.”') },
    ] },

    { title: L('القراءة وشرود الذهن', 'Reading & mind-wandering'), people: [
      { img: port('anne-mangen.jpg'), name: L('آن مانغن', 'Anne Mangen'), tag: L('باحثة القراءة على الورق والشاشة', 'Reading on paper vs. screen'),
        story: L('بيّنت «دونية الشاشة»: نفهم النصّ ونتذكّره على الورق أفضل ممّا على الشاشة.',
                 'Demonstrated “screen inferiority”: we comprehend and remember text better on paper than on screen.') },
      { img: port('nicholas-carr.jpg'), name: L('نيكولاس كار', 'Nicholas Carr'), tag: L('مؤلّف «السطحيّون»', 'Author of “The Shallows”'),
        story: L('جادل بأن الإنترنت يعيد تشكيل أدمغتنا لتُتقن القفز السريع وتفقد القدرة على العمق.',
                 'Argued the internet is reshaping our brains to master fast hopping while losing the capacity for depth.') },
      { img: port('raymond-mar.jpg'), name: L('رايموند مار', 'Raymond Mar'), tag: L('باحث الرواية والتعاطف', 'Fiction & empathy researcher'),
        story: L('وجد أن قرّاء الروايات أفضل في فهم مشاعر الآخرين ونيّاتهم — القصّة تدرّبنا على العيش داخل عقلٍ آخر.',
                 'Found that fiction readers are better at understanding others’ feelings and intentions — story trains us to inhabit another mind.') },
      { img: port('gilbert-killingsworth.jpg'), name: L('غيلبرت وكيلينغزوورث', 'Gilbert & Killingsworth'), tag: L('دراسة الذهن الشارد والسعادة', 'The wandering-mind & happiness study'),
        story: L('أجرى **دانييل غيلبرت** و**ماثيو كيلينغزوورث** دراسةً واسعة عبر التطبيقات خلصت إلى أن الذهن الشارد قد يكون أقلّ سعادةً لحظياً — نتيجةٌ يناقشها هاري بعينٍ ناقدة.',
                 '**Daniel Gilbert** and **Matthew Killingsworth** ran a large smartphone study concluding a wandering mind can be less happy in the moment — a finding Hari examines critically.') },
      { img: port('tore-nielsen.jpg'), name: L('توري نيلسن', 'Tore Nielsen'), tag: L('باحث الأحلام والنوم', 'Dream & sleep researcher'),
        story: L('باحثٌ في الأحلام والنوم؛ يذكّر بأن ما يجري في أدمغتنا حين «لا نفعل شيئاً» أبعد ما يكون عن العطالة.',
                 'A researcher of dreams and sleep; a reminder that what happens in our brains when we “do nothing” is far from idle.') },
    ] },

    { title: L('التقنية ونموذج الأعمال', 'Technology & the business model'), people: [
      { img: port('aza-raskin.jpg'), name: L('أزا راسكِن', 'Aza Raskin'), tag: L('مخترع «التمرير اللانهائي»', 'Inventor of infinite scroll'),
        story: L('صمّم خاصّية التمرير التي لا تنتهي — ويقول اليوم إنه نادم على ما تسرقه من وقت البشر.',
                 'Designed the never-ending scroll — and says today he regrets the human time it steals.') },
      { img: port('tristan-harris.jpg'), name: L('تريستان هاريس', 'Tristan Harris'), tag: L('أخصائيّ أخلاقيات التصميم', 'Design ethicist'),
        story: L('مصمّمٌ سابق في غوغل، كشف كيف تُهندَس التطبيقات لأسر الانتباه، وقاد حملة «الوقت المُحسَن الاستخدام».',
                 'A former Google designer who exposed how apps are engineered to capture attention, and led the “Time Well Spent” campaign.') },
      { img: port('shoshana-zuboff.jpg'), name: L('شوشانا زوبوف', 'Shoshana Zuboff'), tag: L('صاحبة «رأسمالية المراقبة»', 'Surveillance Capitalism'),
        story: L('صاغت مفهوم أن بياناتك تُجمع لتوقّع سلوكك ثم يُباع التنبّؤ — المنتج هو أنت.',
                 'Coined the idea that your data is harvested to predict your behaviour, then the prediction is sold — the product is you.') },
      { img: port('james-williams.jpg'), name: L('جيمس ويليامز', 'James Williams'), tag: L('فيلسوف الانتباه', 'Philosopher of attention'),
        story: L('مصمّمٌ سابق في غوغل صار فيلسوفاً في أكسفورد؛ يجادل بأن فقدان الانتباه يهدّد قدرتنا على فعل أيّ شيءٍ نريده.',
                 'A former Google designer turned Oxford philosopher; argues that losing attention threatens our ability to do anything we want.') },
      { img: port('molly-crockett.jpg'), name: L('مولي كروكِت', 'Molly Crockett'), tag: L('باحثة السخط الأخلاقي', 'Moral-outrage researcher'),
        story: L('أظهرت أن التعبير عن الغضب الأخلاقي يُكافأ إلكترونياً، فتضخّمه الخوارزميات ويزيد استقطابنا.',
                 'Showed that expressing moral outrage is rewarded online, so algorithms amplify it and deepen our polarisation.') },
      { img: port('jaron-lanier.jpg'), name: L('جارون لانير', 'Jaron Lanier'), tag: L('رائد الواقع الافتراضي وناقد التقنية', 'VR pioneer & tech critic'),
        story: L('من روّاد الواقع الافتراضي، وصار من أشدّ نقّاد اقتصاد وسائل التواصل القائم على الإدمان والتلاعب.',
                 'A virtual-reality pioneer turned one of the fiercest critics of the addiction-and-manipulation economy of social media.') },
      { img: port('bf-skinner.jpg'), name: L('ب. ف. سكِنر', 'B. F. Skinner'), tag: L('عالِم الاشتراط الإجرائي', 'Operant conditioning'),
        story: L('عالِم النفس الذي أظهر قوّة **المكافأة المتغيّرة** في تشكيل السلوك — المبدأ نفسه الذي تستثمره تطبيقات اليوم لإبقائك ممرِّراً.',
                 'The psychologist who showed the power of the **variable reward** in shaping behaviour — the very principle today’s apps exploit to keep you scrolling.') },
      { img: port('nir-eyal.jpg'), name: L('نير إيال', 'Nir Eyal'), tag: L('الصوت المعارض', 'The dissenting voice'),
        story: L('مؤلّف «Hooked»؛ يجادل بأن الأفراد يستطيعون استعادة السيطرة، وأن تحميل الشركات وحدها المسؤولية مبالغة — رأيٌ يعرضه هاري ويردّ عليه.',
                 'Author of “Hooked”; argues individuals can regain control and that blaming companies alone is overstated — a view Hari presents and rebuts.') },
    ] },

    { title: L('الإرادة والدافعية', 'Willpower & motivation'), people: [
      { img: port('roy-baumeister.jpg'), name: L('روي باوميستر', 'Roy Baumeister'), tag: L('باحث ضبط النفس', 'Self-control researcher'),
        story: L('اشتهر بفكرة أن الإرادة موردٌ محدود يُستنزف — فكرةٌ أثارت نقاشاً وإعادة اختبارٍ واسعين، لكنها تذكّر بأن ضبط النفس ليس بلا حدود.',
                 'Known for the idea that willpower is a limited resource that gets depleted — a claim that sparked wide debate and re-testing, but a reminder that self-control is not limitless.') },
      { img: port('ed-deci.jpg'), name: L('إد ديسي', 'Ed Deci'), tag: L('باحث الدافع الداخلي', 'Intrinsic-motivation researcher'),
        story: L('من روّاد أبحاث الدافعية الداخلية: ننتبه ونثابر أكثر حين يكون النشاط ذا معنىً لنا لا مفروضاً من الخارج.',
                 'A pioneer of intrinsic-motivation research: we attend and persist more when an activity is meaningful to us, not externally imposed.') },
    ] },

    { title: L('التوتّر والغذاء والتلوّث', 'Stress, diet & pollution'), people: [
      { img: port('nadine-burke-harris.jpg'), name: L('نادين بيرك هاريس', 'Nadine Burke Harris'), tag: L('طبيبة شدائد الطفولة', 'Childhood-adversity physician'),
        story: L('ربطت بين الشدائد المبكّرة واليقظة المفرطة وصعوبات الانتباه — أحياناً يُشخَّص الأثر خطأً كفرط حركة.',
                 'Linked early adversity to hypervigilance and attention difficulties — sometimes misdiagnosed as ADHD.') },
      { img: port('sendhil-mullainathan.jpg'), name: L('سِنديل مولايناثان', 'Sendhil Mullainathan'), tag: L('باحث اقتصاد الندرة', 'Scholar of scarcity'),
        story: L('أظهر أن القلق المالي يستهلك «عرض النطاق الذهني»، فيقلّ التركيز — الفقر ضريبةٌ على الانتباه لا فشلٌ فيه.',
                 'Showed money worries consume “mental bandwidth,” cutting focus — poverty is a tax on attention, not a failure of it.') },
      { img: port('michael-moss.jpg'), name: L('مايكل موس', 'Michael Moss'), tag: L('صحفيّ صناعة الغذاء', 'Food-industry journalist'),
        story: L('كشف كيف تُهندَس الأطعمة بمزيجٍ من الملح والسكّر والدهون لتقاوم ضبط النفس — كما تُصمَّم التطبيقات.',
                 'Revealed how foods are engineered with salt, sugar and fat to resist self-control — just as apps are designed.') },
      { img: port('barbara-demeneix.jpg'), name: L('باربرا دومينيكس', 'Barbara Demeneix'), tag: L('عالِمة الغدد الصمّاء والتلوّث', 'Endocrinologist on pollution'),
        story: L('تحذّر من أثر الكيماويات المسبّبة لاضطراب الغدد الصمّاء على نموّ الدماغ والانتباه، خاصّةً لدى الأطفال.',
                 'Warns that endocrine-disrupting chemicals affect brain development and attention, especially in children.') },
    ] },

    { title: L('نقاش فرط الحركة (ADHD)', 'The ADHD debate'), people: [
      { img: port('joel-nigg.jpg'), name: L('جويل نيغ', 'Joel Nigg'), tag: L('باحث ADHD', 'ADHD researcher'),
        story: L('يرى ADHD حقيقياً، لكنه يشدّد على تفاعل البيولوجيا مع البيئة — بيئةٌ سامّة للانتباه قد تُظهر الأعراض أو تفاقمها.',
                 'Holds ADHD is real, but stresses the interaction of biology and environment — an attention-toxic environment can surface or worsen symptoms.') },
      { img: port('sami-timimi.jpg'), name: L('سامي التميمي', 'Sami Timimi'), tag: L('ناقد التأطير البيولوجي', 'Critic of the biological framing'),
        story: L('يحذّر من اختزال ADHD في مرضٍ بيولوجيّ بحت؛ قد نُشخّص أطفالاً يتفاعلون بشكلٍ طبيعيّ مع بيئةٍ غير طبيعية.',
                 'Warns against reducing ADHD to a purely biological disease; we may be labelling children reacting normally to an abnormal environment.') },
      { img: port('alan-schwarz.jpg'), name: L('آلان شوارتز', 'Alan Schwarz'), tag: L('مؤلّف «أمّة ADHD»', 'Author of “ADHD Nation”'),
        story: L('صحفيٌّ وثّق كيف دفعت عوامل تجارية وتعليمية نحو الإفراط في التشخيص ووصف المنبّهات.',
                 'A journalist who documented how commercial and educational pressures drove over-diagnosis and over-prescription of stimulants.') },
      { img: port('sandra-kooij.jpg'), name: L('ساندرا كويج', 'Sandra Kooij'), tag: L('باحثة فرط الحركة لدى البالغين', 'Adult-ADHD researcher'),
        story: L('تؤكّد أن فرط الحركة لدى البالغين حقيقيّ وغالباً ما يُهمَل — الجانب الآخر من النقاش.',
                 'Stresses that adult ADHD is real and often neglected — the other side of the debate.') },
    ] },

    { title: L('الطفولة واللعب', 'Childhood & play'), people: [
      { img: port('lenore-skenazy.jpg'), name: L('لينور سكينازي', 'Lenore Skenazy'), tag: L('حركة «أطفال الحرّية»', 'Free-Range Kids'),
        story: L('تركت ابنها ذا التسع سنوات يعود وحده بمترو نيويورك فوُصِفت بـ«أسوأ أمّ في أمريكا»؛ تجادل بأن المبالغة في الخوف تسلب الأطفال استقلالهم.',
                 'Let her nine-year-old ride the New York subway home alone and was branded “America’s Worst Mom”; argues exaggerated fear robs children of independence.') },
      { img: port('peter-gray.jpg'), name: L('بيتر غراي', 'Peter Gray'), tag: L('باحث اللعب الحرّ', 'Free-play researcher'),
        story: L('عالِم نفسٍ يجادل بأن اللعب الحرّ هو مدرسة الطفل الأولى في التركيز وضبط النفس وابتكار القواعد.',
                 'A psychologist who argues free play is a child’s first school in focus, self-control and inventing rules.') },
      { img: port('isabel-behncke.jpg'), name: L('إيزابيل بنكه', 'Isabel Behncke'), tag: L('عالِمة سلوك الرئيسيّات', 'Primatologist of play'),
        story: L('تدرس اللعب لدى البشر والحيوانات، وترى في الحرمان منه «هدفاً بيولوجياً محبَطاً».',
                 'Studies play in humans and animals, seeing its deprivation as a “frustrated biological objective.”') },
      { img: port('inga-marte-thorkildsen.jpg'), name: L('إنغا مارته توركيلدسن', 'Inga Marte Thorkildsen'), tag: L('سياسية نرويجية', 'Norwegian politician'),
        story: L('دفعت في أوسلو نحو سياساتٍ تعيد للأطفال فضاءهم وحرّيتهم في اللعب.',
                 'In Oslo, pushed for policies that give children back their space and freedom to play.') },
    ] },

    { title: L('أصواتٌ ناقدة وموسِّعة للنقاش', 'Critical and broadening voices'), people: [
      { img: port('andrew-przybylski.jpg'), name: L('أندرو برزيبيلسكي', 'Andrew Przybylski'), tag: L('متشكّك في أدلّة الشاشات', 'Screens-evidence skeptic'),
        story: L('باحثٌ يدعو إلى الحذر: كثيرٌ من الادّعاءات عن ضرر الشاشات أضعف دليلاً ممّا يُقال، ويجب قياسها بدقّة.',
                 'A researcher urging caution: many claims about screen harm rest on weaker evidence than stated, and must be measured rigorously.') },
      { img: port('amy-orben.jpg'), name: L('إيمي أوربن', 'Amy Orben'), tag: L('باحثة الشاشات والمراهقين', 'Screens & adolescents researcher'),
        story: L('تحلّل البيانات الضخمة عن الشاشات ورفاه المراهقين، محذّرةً من المبالغة في الاستنتاجات في كلا الاتجاهين.',
                 'Analyses large datasets on screens and adolescent well-being, warning against overstated conclusions in either direction.') },
      { img: port('jason-hickel.jpg'), name: L('جيسون هيكل', 'Jason Hickel'), tag: L('ناقد اقتصاد النموّ', 'Critic of growth economics'),
        story: L('يوسّع النقاش نحو نموذج النموّ اللانهائي الذي يغذّي ثقافة السرعة والاستهلاك التي تلتهم انتباهنا.',
                 'Broadens the debate toward the infinite-growth model that feeds the culture of speed and consumption devouring our attention.') },
    ] },

    { title: L('حكايةٌ في القلب', 'A story at the heart'), people: [
      { img: port('elvis-presley.jpg'), name: L('إلفيس بريسلي', 'Elvis Presley'), tag: L('مفتاح القصّة الافتتاحية', 'Key to the opening story'),
        story: L('هوس ابن عمّ هاري بإلفيس هو ما فتح الكتاب: وعدٌ بزيارة غريسلاند تحوّل إلى مشهدٍ رمزيّ حين وجدا الزوّار يحدّقون في الآيباد بدل الغرف حولهم.',
                 'Hari’s godson’s obsession with Elvis opens the book: a promise to visit Graceland became a symbolic scene when they found visitors staring at iPads instead of the rooms around them.') },
    ] },
    ] },
  ],
}

/* ===================== Shocking Facts ===================== */
export const shocking = {
  slug: 'shocking',
  icon: '😱',
  title: L('حقائق صادمة', 'Shocking Facts'),
  lead: L(
    'أرقامٌ من الكتاب تلخّص حجم أزمة الانتباه — كلّها موثّقة في نصّ هاري.',
    'Numbers from the book that capture the scale of the attention crisis — all documented in Hari’s text.'
  ),
  blocks: [
    { type: 'callout', variant: 'fact', title: L('١٩ ثانية', '19 seconds'), text: L(
      'حين رُصد طلّابٌ ببرنامج تتبّع، كان الزمن الوسيط الذي يركّزون فيه على شيءٍ واحد **١٩ ثانية فقط**، ويبدّلون المهمّة مرّةً كلّ **٦٥ ثانية**.',
      'When students were tracked with software, the median time they focused on one thing was **just 19 seconds**, switching task once every **65 seconds**.'
    ) },
    { type: 'callout', variant: 'warn', title: L('٢٣ دقيقة', '23 minutes'), text: L(
      'بعد كلّ مقاطعةٍ وأنت مركّز، تحتاج في المتوسّط إلى **٢٣ دقيقة** لتعود إلى الحالة نفسها (دراسة مايكل بوزنر).',
      'After each interruption while focusing, it takes on average **23 minutes** to return to the same state (Michael Posner’s study).'
    ) },
    { type: 'callout', variant: 'fact', title: L('٢٬٦١٧ لمسة', '2,617 touches'), text: L(
      'يلمس الأمريكيّ المتوسّط هاتفه **٢٬٦١٧ مرّة** كلّ ٢٤ ساعة، ويقضي عليه نحو **٣ ساعات و١٥ دقيقة** يومياً.',
      'The average American touches their phone **2,617 times** every 24 hours, spending about **3 hours and 15 minutes** a day on it.'
    ) },
    { type: 'callout', variant: 'warn', title: L('−١٠ نقاط ذكاء', '−10 IQ points'), text: L(
      'في تجربةٍ أُجريت لصالح شركة HP، أدّى العمل وسط مقاطعات البريد والمكالمات إلى هبوط الأداء الذهنيّ بما يعادل **١٠ نقاط ذكاء** — ضِعف الأثر المقيس لتدخين الحشيش.',
      'In a study commissioned by HP, working amid email and call interruptions dropped cognitive performance by the equivalent of **10 IQ points** — twice the measured effect of smoking cannabis.'
    ) },
    { type: 'callout', variant: 'fact', title: L('١٧٤ صحيفة', '174 newspapers'), text: L(
      'كان الإنسان العاديّ يستهلك عام ١٩٨٦ ما يعادل **٤٠ صحيفة** من المعلومات يومياً؛ وبحلول ٢٠٠٧ صار الرقم **١٧٤ صحيفة** في اليوم.',
      'In 1986 an ordinary person consumed the equivalent of **40 newspapers** of information a day; by 2007 it was **174 newspapers** a day.'
    ) },
    { type: 'callout', variant: 'warn', title: L('مستيقظٌ ١٩ ساعة = ثمل', 'Awake 19 hours = drunk'), text: L(
      'البقاء مستيقظاً نحو **١٩ ساعة** متواصلة يجعل أداءك المعرفيّ مكافئاً لأداء من تجاوز حدّ السُّكر القانوني للقيادة.',
      'Staying awake for about **19 straight hours** leaves your cognitive performance equivalent to someone over the legal limit for drunk driving.'
    ) },
    { type: 'callout', variant: 'warn', title: L('−١٣ نقطة قبل الحصاد', '−13 points pre-harvest'), text: L(
      'مزارعو قصب السكّر أنفسهم سجّلوا قبل الحصاد (وهم معدمون) أداءً أدنى بما يعادل **نحو ١٣ نقطة ذكاء** منه بعد قبض ثمن المحصول — الفقر ضريبةٌ على الانتباه.',
      'The same sugarcane farmers scored the equivalent of **about 13 IQ points lower** before the harvest (while broke) than after being paid — poverty is a tax on attention.'
    ) },
    { type: 'callout', variant: 'fact', title: L('١٧ دقيقة', '17 minutes'), text: L(
      'هبط متوسّط ما يقرؤه الأمريكيّ من الكتب إلى نحو **١٧ دقيقة في اليوم** فقط.',
      'The average American now reads books for only about **17 minutes a day**.'
    ) },
    { type: 'callout', variant: 'warn', title: L('من ١٧٫٥ إلى ١١٫٩ ساعة', 'From 17.5 to 11.9 hours'), text: L(
      'بقاء الموضوع الرائج ضمن أكثر ٥٠ موضوعاً تداولاً هبط من **١٧٫٥ ساعة** (٢٠١٣) إلى **١١٫٩ ساعة** (٢٠١٦) — نتشتّت أسرع، جماعةً.',
      'A trending topic’s stay in the top-50 fell from **17.5 hours** (2013) to **11.9 hours** (2016) — collectively, we are distracted faster.'
    ) },
    { type: 'callout', variant: 'warn', title: L('٣٠٪ من الفتيان', '30% of boys'), text: L(
      'في بعض ولايات جنوب الولايات المتحدة، يُشخَّص نحو **٣٠٪ من الفتيان** بفرط الحركة قبل بلوغهم الثامنة عشرة.',
      'In some US Southern states, about **30% of boys** are diagnosed with ADHD before they turn eighteen.'
    ) },
    { type: 'callout', variant: 'warn', title: L('١٠٪ فقط', 'Only 10%'), text: L(
      'بحلول عام ٢٠٠٣، كان **١٠٪ فقط** من أطفال الولايات المتحدة يلعبون بحرّيةٍ في الخارج بانتظام.',
      'By 2003, only **10%** of US children played freely outdoors on a regular basis.'
    ) },
    { type: 'callout', variant: 'key', title: L('+٤٠٪ إنتاجية', '+40% productivity'), text: L(
      'حين تحوّلت مايكروسوفت في اليابان (٢٠١٩) إلى أسبوع عملٍ من أربعة أيّام، ارتفعت الإنتاجية **٤٠٪** — الإنهاك قابلٌ للعكس.',
      'When Microsoft Japan (2019) moved to a four-day week, productivity rose **40%** — exhaustion is reversible.'
    ) },
  ],
}

/* ===================== Myths ===================== */
export const myths = {
  slug: 'myths',
  icon: '🔍',
  title: L('مغالطات شائعة', 'Common Myths'),
  lead: L(
    'ستّ مقولاتٍ رائجة عن الانتباه — يفكّكها الكتاب واحدةً واحدة.',
    'Six popular claims about attention — the book takes them apart one by one.'
  ),
  blocks: [
    { type: 'myth',
      claim: L('«صار انتباه الإنسان أقصر من انتباه سمكة الزينة».', '“Human attention is now shorter than a goldfish’s.”'),
      reply: L('إشاعةٌ حضرية لا أساس علميّ لها؛ لا يوجد قياسٌ موثوق لـ«مدى انتباه» السمكة أصلاً. لكنّ المبالغة تصرف الانتباه عن الحقيقة الأهمّ: انتباهنا يُهاجَم من الخارج، لا أنه انكمش بيولوجياً.',
               'An urban legend with no scientific basis; there is no reliable measure of a goldfish’s “attention span” to begin with. But the exaggeration distracts from the real point: our attention is being attacked from outside, not biologically shrunken.') },
    { type: 'myth',
      claim: L('«أنا أُتقن تعدّد المهامّ».', '“I’m good at multitasking.”'),
      reply: L('ما من دماغٍ يركّز على مهمّتين معرفيتين معاً؛ أنت تبدّل بسرعة، وكلّ تبديلةٍ تترك «بقايا انتباه» تبطئك وتزيد أخطاءك. من يظنّون أنفسهم الأفضل في تعدّد المهامّ هم غالباً الأسوأ أداءً فيها.',
               'No brain focuses on two cognitive tasks at once; you switch rapidly, and each switch leaves an “attention residue” that slows you and multiplies errors. Those who think they are best at multitasking are often the worst performers at it.') },
    { type: 'myth',
      claim: L('«لو كانت لديك إرادة كافية لركّزت».', '“If you had enough willpower, you’d focus.”'),
      reply: L('هذا جوهر «التفاؤل القاسي»: تحميل الفرد وحده عبء مشكلةٍ صمّمتها آلةٌ ضخمة لهزيمة إرادته. النصائح الفردية تساعد، لكنّ لومَ الإرادة وحدها يعفي مصمّمي التشتيت من المسؤولية.',
               'This is the essence of “cruel optimism”: loading onto the individual a problem a vast machine was built to defeat. Individual advice helps, but blaming willpower alone lets the designers of distraction off the hook.') },
    { type: 'myth',
      claim: L('«التقنية محايدة؛ المهمّ كيف تستخدمها».', '“Technology is neutral; it’s all in how you use it.”'),
      reply: L('التطبيقات ليست محايدة؛ صُمّمت بعناية — بمكافآتٍ متغيّرة وتمريرٍ لا ينتهي — لأسر انتباهك أطول وقت. حين يُبنى نموذج الربح على استنزاف انتباهك، فالحياد وهم.',
               'Apps are not neutral; they are carefully designed — with variable rewards and endless scroll — to hold your attention as long as possible. When the profit model is built on draining your attention, neutrality is an illusion.') },
    { type: 'myth',
      claim: L('«فرط الحركة سببه جيناتٌ بحتة».', '“ADHD is purely genetic.”'),
      reply: L('البيولوجيا جزءٌ من الصورة، لكنّ البيئة تتفاعل معها بقوّة: التوتّر والصدمة وقلّة النوم وسوء الغذاء كلّها تؤثّر في الانتباه. يعرض الكتاب النقاش من جانبيه دون إنكار معاناة أحد.',
               'Biology is part of the picture, but environment interacts powerfully with it: stress, trauma, poor sleep and diet all affect attention. The book presents both sides of the debate without denying anyone’s suffering.') },
    { type: 'myth',
      claim: L('«الأطفال أكثر أماناً في البيت مع الشاشات».', '“Children are safer indoors with screens.”'),
      reply: L('المبالغة في الخوف من الخارج تسلب الأطفال اللعب الحرّ الذي يبني تركيزهم وضبط نفسهم. الأمان الحقيقيّ ليس في حبسهم أمام الشاشات، بل في منحهم استقلالاً مسؤولاً.',
               'Exaggerated fear of the outdoors robs children of the free play that builds their focus and self-control. Real safety is not confining them to screens, but giving them responsible independence.') },
  ],
}

/* ===================== Club Discussion ===================== */
export const discussion = {
  slug: 'discussion',
  icon: '💬',
  title: L('نقاش النادي', 'Club Discussion'),
  lead: L(
    'أسئلةٌ للنقاش الجماعي — ومقارنةٌ مع كتابنا السابق «لماذا ننام».',
    'Questions for group discussion — and a comparison with our previous book, “Why We Sleep.”'
  ),
  blocks: [
    { type: 'h', text: L('أسئلة للنقاش', 'Questions for discussion') },
    { type: 'ol', items: [
      L('أيٌّ من الأسباب الاثني عشر تشعر أنه الأكثر تأثيراً في حياتك أنت؟ ولماذا؟',
        'Which of the twelve causes do you feel affects your own life the most, and why?'),
      L('هل تقنعك حجّة هاري بأن المشكلة جماعية لا فردية؟ أم أن المسؤولية الفردية أكبر ممّا يقول؟',
        'Are you convinced by Hari’s argument that the problem is collective, not individual? Or is personal responsibility greater than he allows?'),
      L('جرّب «الالتزام المسبَق» أسبوعاً (إبعاد الهاتف وقت العمل العميق). ما الذي تغيّر؟',
        'Try “pre-commitment” for a week (removing the phone during deep work). What changed?'),
      L('ما موقفك من نقاش فرط الحركة؟ كيف نوازن بين أخذ المعاناة على محمل الجدّ والحذر من الإفراط في التشخيص؟',
        'Where do you stand on the ADHD debate? How do we balance taking suffering seriously with guarding against over-diagnosis?'),
      L('لو اخترنا «تمرّداً» جماعياً واحداً نبدأ به (حقّ قطع الاتصال، أسبوع أقصر، حرّية اللعب…)، فأيّها؟',
        'If we chose one collective “rebellion” to begin with (right to disconnect, a shorter week, freedom to play…), which would it be?'),
    ] },
    { type: 'callout', variant: 'key', title: L('كتابان، حجّةٌ واحدة', 'Two books, one argument'), text: L(
      'يلتقي «التركيز المسروق» مع «لماذا ننام» في فكرةٍ جوهرية: مشكلاتنا الصحّية والذهنية الكبرى ليست فشلاً فردياً بل نتاج أنظمةٍ وبيئاتٍ يمكن تغييرها. النوم والانتباه كلاهما ضحيّةٌ لثقافة السرعة والإنهاك — وكلاهما يُستعاد بقرارٍ فرديّ وإصلاحٍ جماعيّ معاً.',
      'Stolen Focus meets Why We Sleep in one core idea: our biggest health and mental problems are not individual failings but the product of systems and environments we can change. Sleep and attention are both casualties of a culture of speed and exhaustion — and both are reclaimed by individual choice and collective reform together.'
    ) },
    { type: 'linkcards', title: L('جسور بين الكتابين', 'Bridges between the books'), links: [
      { to: '/book/why-we-sleep/discussion', icon: '🌙', label: L('نقاش «لماذا ننام»', '“Why We Sleep” discussion') },
      { to: '/book/stolen-focus/focus-lab', icon: '🧪', label: L('جرّب مختبر التركيز', 'Try the Focus Lab') },
      { to: '/book/stolen-focus/focus-assessment', icon: '📝', label: L('قيّم عادات تركيزك', 'Assess your focus habits') },
    ] },
  ],
}
