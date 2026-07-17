const L = (ar, en) => ({ ar, en })

/* ===================== Stress & Vigilance (Cause 8) ===================== */
export const stressVigilance = {
  slug: 'stress-vigilance',
  icon: '⚠️',
  title: L('التوتّر واليقظة الدائمة', 'Stress & Vigilance'),
  lead: L(
    'التوتّر المزمن يضع الدماغ في حالة يقظةٍ قتالية، فيمسح المحيط بحثاً عن التهديد بدل التركيز على مهمّة واحدة.',
    'Chronic stress puts the brain into a combat-vigilance state, scanning the surroundings for threat instead of focusing on one task.'
  ),
  blocks: [
    { type: 'h', text: L('السبب الثامن: حين يتحوّل الانتباه إلى رادار', 'Cause eight: when attention becomes a radar') },
    { type: 'p', text: L(
      'تخيّل أنك تقرأ هذه السطور فدخل دبٌّ الغرفة. لن «تختار» التوقّف عن القراءة — سيقرّر دماغك ذلك عنك في جزءٍ من الثانية، لأن أعمق أنظمته مبنيّةٌ على قاعدة: **النجاة قبل التركيز**. حين نشعر بالتهديد يتحوّل الانتباه من التركيز العميق إلى **اليقظة (vigilance)**: مسحٌ سريع ومتواصل للبيئة بحثاً عن الخطر. هذا إنقاذٌ حقيقيّ حين يكون الخطر دبّاً؛ أمّا حين يكون الخطر بريداً من مديرك في منتصف الليل، وفاتورةً معلّقة، وأخباراً مقلقة كلّ ساعة — فإن الرادار لا يُطفأ أبداً، ويعيش صاحبه عاجزاً عن الاستقرار على أيّ شيء.',
      'Imagine you are reading these lines and a bear walks into the room. You will not “choose” to stop reading — your brain will decide for you in a fraction of a second, because its deepest systems run on one rule: **survival before focus**. When we feel threatened, attention shifts from deep focus to **vigilance**: a rapid, continuous scan of the environment for danger. That is a genuine rescue when the danger is a bear; but when the danger is a midnight email from your boss, an unpaid bill, and alarming news every hour — the radar never switches off, and its owner lives unable to settle on anything.'
    ) },
    { type: 'callout', variant: 'note', title: L('طفولةٌ قاسية وانتباهٌ مبعثر', 'Harsh childhood, scattered attention'), text: L(
      'تربط الطبيبة **نادين بيرك هاريس (Nadine Burke Harris)** بين الشدائد المبكّرة في الطفولة (Adverse Childhood Experiences) وصعوبات الانتباه لاحقاً — وكلّما زاد عدد الشدائد التي مرّ بها الطفل، تضاعف احتمال معاناته لاحقاً بجرعةٍ تتصاعد. تروي قصّة صبيٍّ (سمّاه هاري «روبرت») شُخِّص بفرط الحركة ووُصف له منبّه، بينما كان السبب الحقيقي صدمةً وتوتّراً جعلا دماغه في حالة إنذارٍ دائم. علاج البيئة قد يسبق علاج العَرَض.',
      'Physician **Nadine Burke Harris** links early Adverse Childhood Experiences to later attention difficulties — and the more adversities a child endures, the higher the later risk climbs, in a dose-response pattern. She tells of a boy (Hari calls him “Robert”) diagnosed with ADHD and given a stimulant, when the real cause was trauma and stress that kept his brain in a permanent alarm state. Treating the environment may need to come before treating the symptom.'
    ) },
    { type: 'p', text: L(
      'أضِف إلى ذلك عبء الندرة: بيّن **سِنديل مولايناثان (Sendhil Mullainathan)** وزملاؤه أن القلق المالي يستهلك «عرض النطاق الذهني (mental bandwidth)». في دراستهم الشهيرة على مزارعي قصب السكّر في الهند، خضع المزارعون أنفسهم لاختباراتٍ معرفية قبل الحصاد (حين يكونون معدمين) وبعده (حين يقبضون ثمن المحصول): كان أداء الشخص نفسه قبل الحصاد أدنى بما يعادل **نحو ١٣ نقطة ذكاء**. لم يتغيّر الدماغ — تغيّر حجم الهمّ الذي يشغله. الفقر ليس فشلاً في الانتباه؛ بل ضريبةٌ مفروضة عليه.',
      'Add the burden of scarcity: **Sendhil Mullainathan** and colleagues showed that money worries consume “mental bandwidth.” In their famous study of sugarcane farmers in India, the same farmers took cognitive tests before the harvest (when they were broke) and after it (when they were paid): the very same person scored the equivalent of **about 13 IQ points lower** pre-harvest. The brain had not changed — the size of the worry occupying it had. Poverty is not a failure of attention; it is a tax levied on it.'
    ) },
    { type: 'p', text: L(
      'وهذا ما يجعل نصيحة «تمهّل واسترخِ» نوعاً من التفاؤل القاسي بدورها: لا يستطيع الإنسان أن «يقرّر» الهدوء بينما ظروفه المادّية — عملٌ هشّ، وساعاتٌ بلا حدود، وبريدٌ يطارده إلى سريره — تصرخ في جهازه العصبيّ أن الخطر قائم. خفض اليقظة يحتاج تغييرَ ما يستثيرها.',
      'This is what makes “slow down and relax” a form of cruel optimism in its own right: a person cannot “decide” to be calm while their material conditions — precarious work, boundaryless hours, email chasing them into bed — keep shouting at their nervous system that the danger is real. Lowering vigilance requires changing what triggers it.'
    ) },

    { type: 'h', text: L('أماكن عكست الاتجاه', 'Places that reversed the trend') },
    { type: 'p', text: L(
      'الخبر الجيّد أن الإنهاك قابلٌ للعكس حين تتغيّر الأنظمة — والقصص هنا من أمتع فصول الكتاب. قرأ رجل الأعمال النيوزيلندي **أندرو بارنز (Andrew Barnes)** أن موظّف المكتب البريطانيّ لا يُنتج فعلياً سوى أقلّ من ثلاث ساعاتٍ يومياً، ففكّر بمنطق الصفقة: عرض على موظّفي شركته **بيربتشوال غارديان (Perpetual Guardian)** — نحو ٢٤٠ موظّفاً — أجر خمسة أيّامٍ مقابل أربعة أيّام عمل، بشرط ألّا تنخفض الإنتاجية. لم تنخفض؛ بل تحسّن التركيز والرضا وتراجع التوتّر، وتعاون الموظّفون على قتل الاجتماعات الفارغة والمقاطعات — لأن الوقت صار ثميناً عند الجميع.',
      'The good news is that exhaustion is reversible when systems change — and the stories here are among the book’s most enjoyable. New Zealand businessman **Andrew Barnes** read that the average British office worker is truly productive for less than three hours a day, and thought like a dealmaker: he offered the roughly 240 staff of his firm **Perpetual Guardian** five days’ pay for four days’ work, on condition productivity did not fall. It did not; focus and satisfaction rose, stress fell, and employees teamed up to kill empty meetings and interruptions — because time had become precious to everyone.'
    ) },
    { type: 'p', text: L(
      'وليست حالةً معزولة: في اليابان عام **٢٠١٩** أعلنت **مايكروسوفت (Microsoft)** ارتفاع الإنتاجية **٤٠٪** بعد تجربة أسبوع الأيّام الأربعة. وفي عشرينيات القرن الماضي، حين خفّض **كيلوغ (Kellogg)** يوم العمل إلى ست ساعات، هبطت حوادث العمل **٤١٪**. وفي فرنسا أقرّ القانون منذ ٢٠١٧ **«حقّ قطع الاتصال»**: لا يُحاسَب الموظّف على تجاهل بريد العمل خارج الدوام. الرسالة واحدة: الراحة ليست خصماً من الإنتاج — إنها وقوده.',
      'Nor is it an isolated case: in Japan in **2019**, **Microsoft** reported productivity rose **40%** after trialling a four-day week. Back in the 1920s, when **Kellogg** cut the working day to six hours, workplace accidents fell **41%**. And since 2017 French law has recognised a **“right to disconnect”**: an employee cannot be penalised for ignoring work email outside hours. The message is one and the same: rest is not deducted from productivity — it is its fuel.'
    ) },
    { type: 'figure', id: 'sfFourDayWeek' },
    { type: 'callout', variant: 'key', title: L('الخيط الجامع', 'The connecting thread'), text: L(
      'لاحظ البنية المتكرّرة: دماغٌ خائف لا يركّز، ودماغٌ منهَك لا يركّز — وكلاهما لا يُعالَج بالوعظ، بل بتغيير شروط الحياة التي تصنع الخوف والإنهاك. هذا هو الجسر من «نصائح للأفراد» إلى «مطالب للمجتمع» الذي يعبره الكتاب في خاتمته.',
      'Notice the recurring structure: a frightened brain cannot focus, and an exhausted brain cannot focus — and neither is cured by preaching, only by changing the conditions of life that produce the fear and the exhaustion. This is the bridge from “tips for individuals” to “demands for society” that the book crosses in its conclusion.'
    ) },
  ],
}

/* ===================== Diet & Pollution (Causes 9–10) ===================== */
export const dietPollution = {
  slug: 'diet-pollution',
  icon: '🍔',
  title: L('الغذاء والتلوّث', 'Diet & Pollution'),
  lead: L(
    'ما ندخله إلى أجسادنا وما يحيط بها من كيمياء يصل إلى الدماغ مباشرةً — ويؤثّر في قدرته على الانتباه.',
    'What we put into our bodies, and the chemistry surrounding them, reaches the brain directly — and shapes its capacity to attend.'
  ),
  blocks: [
    { type: 'h', text: L('السبب التاسع: تدهور غذائنا', 'Cause nine: our deteriorating diets') },
    { type: 'p', text: L(
      'الدماغ عضوٌ يلتهم نحو خُمس طاقة الجسد، وجودة وقوده تحدّد جودة عمله. يلخّص الكتاب — استناداً إلى خبراء التغذية الذين قابلهم هاري — ثلاث طرقٍ يخرّب بها الغذاء الحديث انتباهنا: أوّلها **أفعوانية سكّر الدم**: طعامٌ مليء بالسكّريات والنشويات المكرّرة يرفع الطاقة صعوداً حادّاً ثم يُسقطها فجأة، فيقضي المرء يومه متأرجحاً بين اندفاعٍ عصبيّ و«انهيار» ضبابيّ في منتصف النهار — وليست أيٌّ من الحالتين صالحةً للتركيز.',
      'The brain is an organ that devours about a fifth of the body’s energy, and the quality of its fuel sets the quality of its work. Drawing on the nutrition experts Hari interviewed, the book identifies three ways modern food sabotages attention. First, the **blood-sugar rollercoaster**: food heavy with sugar and refined carbohydrates sends energy up in a sharp spike and then drops it suddenly, so a person spends the day swinging between jittery propulsion and a foggy mid-day “crash” — and neither state is fit for focus.'
    ) },
    { type: 'figure', id: 'sfBloodSugar' },
    { type: 'p', text: L(
      'ثانيها **غياب لبنات البناء**: تطوّرت أدمغتنا على أغذيةٍ غنيّة بالعناصر التي تحتاجها لتُصنِّع نواقلها العصبية — كأحماض أوميغا-٣ الدهنية والفيتامينات والمعادن الدقيقة — بينما الطعام فائق التصنيع «سعراتٌ شبعانة وعناصر جائعة». وثالثها الأكثر إثارة للقلق: **مضافاتٌ تؤثّر في السلوك مباشرة**. في تجربة ساوثهامبتون الشهيرة (٢٠٠٧)، أعطى باحثون أطفالاً عاديين — لا مشخّصين بأيّ اضطراب — مشروباتٍ تحوي ملوّناتٍ صناعية شائعة ومادّةً حافظة، فارتفعت درجات فرط النشاط لديهم ارتفاعاً قابلاً للقياس. كانت النتيجة من القوّة بحيث ألزم الاتحاد الأوروبي المنتجات الحاوية على تلك الملوّنات بملصق تحذير — بينما بقيت تُباع في أماكن أخرى بلا تحذير.',
      'Second, **missing building blocks**: our brains evolved on foods rich in what they need to manufacture neurotransmitters — omega-3 fatty acids, vitamins, trace minerals — while ultra-processed food delivers “full calories and starving nutrients.” Third, and most unsettling: **additives that act on behaviour directly**. In the famous Southampton study (2007), researchers gave ordinary children — diagnosed with nothing — drinks containing common artificial food dyes and a preservative, and their hyperactivity scores rose measurably. The result was strong enough that the European Union now requires a warning label on products containing those dyes — which are still sold elsewhere with no warning at all.'
    ) },
    { type: 'callout', variant: 'fact', title: L('طعامٌ هُندس ليأسرك', 'Food engineered to hook you'), text: L(
      'يكشف الصحفي الاستقصائي **مايكل موس (Michael Moss)** كيف تهندس شركات الأغذية منتجاتها — بمزيجٍ دقيق من الملح والسكّر والدهون يُسمّى «نقطة النعيم (bliss point)» — لتكون مقاوِمةً لضبط النفس، تماماً كما تُصمَّم التطبيقات. البيئة الغذائية، كالبيئة الرقمية، ليست محايدة: في الحالتين صناعةٌ كاملة تربح من هزيمة إرادتك ثم تبيعك خطاب «المسؤولية الشخصية».',
      'Investigative journalist **Michael Moss** reveals how food companies engineer their products — with a precise blend of salt, sugar and fat called the **“bliss point”** — to be resistant to self-control, exactly as apps are designed. The food environment, like the digital one, is not neutral: in both cases an entire industry profits from defeating your willpower and then sells you the rhetoric of “personal responsibility.”'
    ) },

    { type: 'h', text: L('السبب العاشر: تصاعد التلوّث', 'Cause ten: rising pollution') },
    { type: 'p', text: L(
      'وما يحيط بأجسادنا لا يقلّ أثراً عمّا يدخلها. تحذّر عالِمة الغدد الصمّاء **باربرا دومينيكس (Barbara Demeneix)** من أن كثيراً من الكيماويات المنتشرة في البلاستيك ومستحضرات التجميل والمبيدات — **مسبّبات اضطراب الغدد الصمّاء (endocrine disruptors)** — تتداخل مع هرمونات الغدّة الدرقية التي يعتمد عليها نموّ الدماغ في أدقّ مراحله، خاصّةً لدى الأجنّة والأطفال. وتذهب إلى حدٍّ صادم: لم يعد ممكناً اليوم أن يولد طفلٌ لم يتعرّض دماغه لأيٍّ من هذه الموادّ — فالسؤال لم يعد «هل تعرّضنا؟» بل «كم؟».',
      'And what surrounds our bodies matters as much as what enters them. Endocrinologist **Barbara Demeneix** warns that many chemicals pervasive in plastics, cosmetics and pesticides — **endocrine disruptors** — interfere with the thyroid hormones that brain development depends on at its most delicate stages, especially in fetuses and children. She goes to a shocking length: it is no longer possible today for a child to be born whose brain was exposed to none of these substances — the question is no longer “were we exposed?” but “how much?”.'
    ) },
    { type: 'p', text: L(
      'وللتاريخ هنا درسٌ يحبّه الكتاب: **الرصاص (lead)**. عرفت البشرية منذ قرابة قرنٍ أن الرصاص سمٌّ عصبيّ يدمّر انتباه الأطفال وذكاءهم، لكنّ صناعة الوقود والطلاء قاومت عقوداً. الذين انتصروا في النهاية لم يكونوا الخبراء وحدهم، بل تحالفٌ من الأمّهات والأطبّاء والناشطين فرض حظر الرصاص في البنزين والطلاء — وبعد الحظر هبطت مستوياته في دماء الأطفال هبوطاً هائلاً وارتفع متوسّط ذكائهم. يستشهد هاري بهذه القصّة لأنها **بروفةٌ ناجحة لتمرّد الانتباه**: ملوِّثٌ يسرق أدمغة الأطفال، وصناعةٌ تنكر، وجمهورٌ منظّم يفوز.',
      'History offers a lesson the book loves here: **lead**. Humanity has known for about a century that lead is a neurotoxin that wrecks children’s attention and intelligence, yet the fuel and paint industries resisted for decades. Those who finally won were not the experts alone but a coalition of mothers, doctors and activists who forced lead out of petrol and paint — and after the bans, children’s blood-lead levels plummeted and average IQ rose. Hari cites this story because it is **a successful rehearsal of the attention rebellion**: a pollutant stealing children’s brains, an industry in denial, and an organised public that wins.'
    ) },
    { type: 'callout', variant: 'note', title: L('ليست نصيحةً طبّية', 'Not medical advice'), text: L(
      'هذا القسم يعرض ما يطرحه الكتاب من روابط بين الغذاء والتلوّث والانتباه، وبعضها لا يزال محلّ بحث. الغرض توعويّ لا علاجيّ؛ ولأيّ قلقٍ صحّي راجع مختصّاً.',
      'This section presents the links the book raises between diet, pollution and attention, some of which are still under research. The purpose is awareness, not treatment; for any health concern, consult a professional.'
    ) },
  ],
}

/* ===================== The ADHD Question (Cause 11) ===================== */
export const adhd = {
  slug: 'adhd',
  icon: '🧩',
  title: L('فرط الحركة وتشتّت الانتباه', 'The ADHD Question'),
  lead: L(
    'تصاعد تشخيص فرط الحركة وتشتّت الانتباه (ADHD) بشدّة — والسؤال الذي يطرحه الكتاب: هل نعالج الطفل أم البيئة؟ نقاشٌ متوازن، لا حكم.',
    'ADHD diagnosis has surged sharply — and the question the book raises: do we treat the child or the environment? A balanced discussion, not a verdict.'
  ),
  blocks: [
    { type: 'p', text: L(
      'ارتفعت أعداد المشخّصين بفرط الحركة بشكلٍ لافت؛ ففي بعض ولايات جنوب الولايات المتحدة يُشخَّص نحو **٣٠٪ من الفتيان** بـADHD قبل بلوغهم الثامنة عشرة، ويتزايد تشخيص البالغين بسرعة حتى تجاوز **٣ ملايين** بالغٍ ممّن يتناولون منبّهاتٍ موصوفة. أمام أرقامٍ كهذه لا يملك المرء إلا أن يسأل: هل كنّا نُغفل معاناةً حقيقية طوال الوقت، أم أن شيئاً في طريقة التشخيص — أو في البيئة نفسها — قد تغيّر؟ جواب الكتاب: الاحتمالان صحيحان معاً، وهذا ما يجعل النقاش صعباً ومهمّاً.',
      'The number of people diagnosed with ADHD has risen strikingly; in some US Southern states about **30% of boys** are diagnosed with ADHD before they turn eighteen, and adult diagnosis is climbing fast, with over **3 million** adults now taking prescribed stimulants. Faced with numbers like these, one has to ask: were we overlooking real suffering all along, or has something changed in how we diagnose — or in the environment itself? The book’s answer: both are true at once, and that is what makes the debate hard and important.'
    ) },
    { type: 'figure', id: 'sfAdhdRise' },
    { type: 'p', text: L(
      'يعرض هاري وجهات نظرٍ متقابلة بعناية. يرى **جويل نيغ (Joel Nigg)** — من أبرز باحثي فرط الحركة — أن ADHD حقيقيّ وأن للوراثة دوراً مؤكّداً، لكنّ الجينات وحدها لا تروي القصّة: التفاعل بين **البيولوجيا والبيئة** جوهريّ، فالجينات قد «تُلقّم البندقية» لكن البيئة هي التي تضغط الزناد. ويعدّد عوامل البيئة التي تُظهر الأعراض أو تفاقمها: قلّة النوم، وسوء الغذاء، وقلّة الحركة، والتوتّر الأسريّ، والتعرّض للكيماويات — وهي نفسها أسباب الكتاب الأخرى مطبّقةً على الأطفال. أمّا **سامي التميمي (Sami Timimi)** فيذهب أبعد: ينتقد تأطير الحالة كمرضٍ بيولوجيّ بحت، ويروي حالاتٍ خفتت أعراضها كثيراً حين تغيّرت ظروف حياة الطفل — محذّراً من أننا قد نُلصق تشخيصاً بأطفالٍ يتفاعلون بشكلٍ طبيعيّ مع بيئةٍ غير طبيعية.',
      'Hari carefully presents opposing views. **Joel Nigg** — among the leading ADHD researchers — holds that ADHD is real and that genetics undeniably plays a part, but genes alone do not tell the story: the interaction between **biology and environment** is central; genes may “load the gun,” but environment pulls the trigger. He lists the environmental factors that surface or worsen the symptoms: too little sleep, poor diet, too little exercise, family stress, chemical exposure — the book’s other causes, applied to children. **Sami Timimi** goes further: he criticises framing the condition as a purely biological disease, and describes cases whose symptoms faded substantially when the circumstances of a child’s life changed — warning that we may be labelling children who are reacting normally to an abnormal environment.'
    ) },
    { type: 'p', text: L(
      'وماذا عن الدواء؟ يعرض الكتاب الصورة بطرفيها: المنبّهات **تحسّن التركيز فعلاً على المدى القصير** — وهي تفعل ذلك لدى معظم البشر أصلاً، مشخّصين وغير مشخّصين، ولهذا لا يصلح «تحسّن الطفل على الدواء» دليلاً على التشخيص. السؤال الأصعب هو المدى الطويل: أكبر الدراسات التتبّعية وجدت أن التفوّق المبكر للعلاج الدوائيّ تضاءل بعد سنواتٍ قليلة حتى لم يعد يميّزه شيءٌ واضح — بينما بقيت أسئلة الآثار الجانبية والنموّ مفتوحةً بين الباحثين. لا يستنتج هاري من ذلك أن الدواء «خطأ»، بل أن الاكتفاء به وحده — دون النظر في نوم الطفل وغذائه ولعبه وتوتّر بيته ومدرسته — هو تفاؤلٌ قاسٍ بجرعة أطفال.',
      'And the medication? The book shows both sides: stimulants **genuinely improve focus in the short term** — and they do so for most human beings, diagnosed or not, which is why “the child improved on the drug” is no proof of the diagnosis. The harder question is the long term: the largest follow-up studies found that medication’s early advantage shrank within a few years until nothing clearly distinguished it — while questions about side effects and growth remain open among researchers. Hari does not conclude that medication is “wrong,” but that relying on it alone — without looking at a child’s sleep, food, play, and the stress of home and school — is cruel optimism at a paediatric dose.'
    ) },
    { type: 'callout', variant: 'warn', title: L('من الإفراط في التشخيص', 'On over-diagnosis'), text: L(
      'وثّق الصحفي **آلان شوارتز (Alan Schwarz)** في «أمّة ADHD» كيف دفعت عواملُ تجارية وتعليمية نحو الإفراط في التشخيص والوصف. في المقابل، تؤكّد **ساندرا كويج (Sandra Kooij)** أن فرط الحركة لدى البالغين حقيقيّ وغالباً ما يُهمَل. الحقيقة ليست في طرفٍ واحد — والغرض هنا فهم النقاش لا إصدار حكم.',
      'Journalist **Alan Schwarz**, in “ADHD Nation,” documented how commercial and educational pressures pushed toward over-diagnosis and over-prescription. On the other side, **Sandra Kooij** stresses that adult ADHD is real and often neglected. The truth lies on neither single side — the aim here is to understand the debate, not to deliver a verdict.'
    ) },
    { type: 'callout', variant: 'note', title: L('تنبيه مهمّ', 'An important note'), text: L(
      'المحتوى تعليميّ مرجعيّ وليس نصيحةً طبّية، ولا يتضمّن أيّ حكمٍ على من يتناولون الدواء أو يصفونه. قرارات العلاج تخصّ الفرد وطبيبه.',
      'This content is educational reference material, not medical advice, and carries no judgment of those who take or prescribe medication. Treatment decisions belong to the individual and their doctor.'
    ) },
  ],
}

/* ===================== Confined Childhood (Cause 12) ===================== */
export const childhood = {
  slug: 'childhood',
  icon: '🧒',
  title: L('طفولة محاصرة', 'Confined Childhood'),
  lead: L(
    'اختفى اللعب الحرّ الطليق من طفولة اليوم — وهو تحديداً المدرسة الأولى التي يتعلّم فيها الدماغ الانتباه وضبط النفس.',
    'Free, unsupervised play has vanished from today’s childhood — and it is precisely the first school where the brain learns attention and self-control.'
  ),
  blocks: [
    { type: 'h', text: L('حبسٌ جسديّ: اختفاء الشارع', 'Physical confinement: the vanishing street') },
    { type: 'p', text: L(
      'تغيّرت الطفولة جذرياً في جيلٍ واحد. بحلول عام **٢٠٠٣** كان **١٠٪ فقط** من أطفال الولايات المتحدة يلعبون بحرّيةٍ في الخارج بانتظام، وصارت الطفولة تحدث خلف الأبواب المغلقة أو على الشاشات، تحت إشرافٍ دائم. وتُظهر توثيقاتٌ شهيرة لعائلةٍ واحدة عبر أربعة أجيال (خارج نصّ الكتاب) انكماشَ «مساحة التجوال» المسموحة للطفل من أميالٍ إلى أمتار: الجدّ الأكبر كان يمشي في الثامنة أميالاً ليصطاد؛ وحفيده لا يتجاوز اليوم نهاية الشارع. المفارقة أن هذا الانكماش لم يواكب ارتفاعاً في الخطر — فالإحصاءات في معظم البلدان الغنيّة تُظهر أن الشوارع لم تكن يوماً أكثر أماناً — بل ارتفاعاً في **الخوف** الذي تضخّمه دورة أخبارٍ تتغذّى على أندر الحوادث وأفظعها.',
      'Childhood changed radically in a single generation. By **2003**, only **10%** of US children played freely outdoors on a regular basis, and childhood now happens behind closed doors or on screens, under constant supervision. A famous record of one family across four generations (from outside the book’s text) shows the “roaming radius” a child is allowed shrinking from miles to metres: the great-grandfather walked miles at eight to go fishing; his descendant today may not pass the end of the street. The irony is that this shrinkage tracked no rise in danger — statistics across most wealthy countries show streets have never been safer — but a rise in **fear**, inflated by a news cycle that feeds on the rarest and most horrifying incidents.'
    ) },
    { type: 'figure', id: 'sfRoamingRadius' },

    { type: 'h', text: L('حبسٌ نفسيّ: طفولة مجدوَلة ومُختبَرة', 'Psychological confinement: a scheduled, tested childhood'), },
    { type: 'p', text: L(
      'وما بقي من وقت الطفولة صودر بطريقةٍ أخرى: مدارس تضيّق مناهجها حول الاختبارات المعيارية فتقتطع من الفسحة والفنون والحركة، وواجباتٌ تتضخّم عاماً بعد عام، وجداول «أنشطةٍ إثرائية» تديرها ساعات الكبار لا فضول الصغار. النتيجة طفلٌ لا يُترك له شيءٌ يقرّره بنفسه: متى يلعب، وماذا يلعب، ومع من — وكلّها قراراتٌ كانت هي التمرين اليوميّ على إدارة الانتباه. يلاحظ **بيتر غراي (Peter Gray)** أن انهيار اللعب الحرّ خلال العقود الأخيرة سار جنباً إلى جنب مع صعود القلق والاكتئاب لدى الأطفال — ويرى العلاقة أبعد من مصادفة.',
      'And what remained of childhood’s time was seized another way: schools narrowing their curricula around standardised tests at the expense of recess, art and movement; homework swelling year over year; schedules of “enrichment activities” run by adult clocks rather than children’s curiosity. The result is a child left nothing to decide alone: when to play, what to play, with whom — precisely the decisions that were the daily workout of attention management. **Peter Gray** observes that the collapse of free play over recent decades has run side by side with the rise of childhood anxiety and depression — and he sees more than coincidence in it.'
    ) },
    { type: 'callout', variant: 'key', title: L('اللعب ليس ترفاً', 'Play is not a luxury'), text: L(
      'يرى عالِم النفس **بيتر غراي (Peter Gray)** وعالِمة الرئيسيّات **إيزابيل بنكه (Isabel Behncke)** أن اللعب الحرّ هو الطريقة التي يتعلّم بها الصغار — بشراً وحيوانات — التركيز والتفاوض وضبط الاندفاع وتقدير المخاطر وابتكار القواعد، وأن يريدوا شيئاً من داخلهم ثم يثابروا عليه. هذه هي عضلات الانتباه كلّها. حتى صغار الحيوانات التي تُحرم من اللعب تنشأ مضطربة اجتماعياً — تصفه بنكه بأنه «هدفٌ بيولوجيّ محبَط». حرمان الأطفال من اللعب حرمانٌ من التدريب الأساسيّ على الانتباه.',
      'Psychologist **Peter Gray** and primatologist **Isabel Behncke** hold that free play is how the young — humans and animals alike — learn focus, negotiation, impulse control, risk-judgment and inventing their own rules; how they learn to want something from within and persist at it. Those are all the muscles of attention. Even young animals deprived of play grow up socially disordered — Behncke calls it a “frustrated biological objective.” Depriving children of play is depriving them of the basic training in attention.'
    ) },

    { type: 'h', text: L('مَن يعيد الحرّية؟', 'Who is giving the freedom back?') },
    { type: 'p', text: L(
      'قادت **لينور سكينازي (Lenore Skenazy)** حركة **«أطفال الحرّية» (Free-Range Kids)** بعد أن تركت ابنها ذا التسع سنوات يعود وحده بمترو نيويورك — فوُصِفت بـ«أسوأ أمّ في أمريكا». حجّتها أن مبالغتنا في الخوف تسلب الأطفال الاستقلال الذي يبني انتباههم وثقتهم. ولم تكتفِ بالجدل: عبر مشاريعها في المدارس صار الواجب المنزليّ أحياناً «افعل شيئاً جديداً بمفردك» — اذهب إلى المتجر وحدك، اطبخ صحناً، تسلّق شجرة. تروي المدارس المشارِكة أثراً يشبه السحر: أطفالٌ قلقون يتفتّحون خلال أسابيع، وأهالٍ يفاجَؤون بكم كان صغارهم قادرين طوال الوقت. وفي أوسلو، دفعت السياسية **إنغا مارته توركيلدسن (Inga Marte Thorkildsen)** نحو سياساتٍ تعيد للأطفال فضاءهم في المدينة نفسها.',
      '**Lenore Skenazy** led the **Free-Range Kids** movement after letting her nine-year-old ride the New York subway home alone — and was branded “America’s Worst Mom.” Her argument is that our exaggerated fear robs children of the independence that builds their attention and confidence. And she went beyond arguing: through her school projects, homework sometimes became “do something new on your own” — walk to the shop alone, cook a dish, climb a tree. Participating schools describe a near-magical effect: anxious children blossoming within weeks, and parents astonished at how capable their kids had been all along. In Oslo, politician **Inga Marte Thorkildsen** pushed for policies that give children back their space in the city itself.'
    ) },
    { type: 'p', text: L(
      'وليس هذا حنيناً إلى «أيّام زمان» — إنه علم أعصاب: الانتباه وضبط النفس لا يُحقنان بالمحاضرات، بل يُبنيان بالممارسة الحرّة في نشاطٍ يختاره الطفل ويقوده. الجيل الذي نصفه بأنه «لا يستطيع التركيز» هو أوّل جيلٍ حُرم بشكلٍ شبه كامل من الظروف التي يتعلّم فيها البشر التركيز.',
      'Nor is this nostalgia for “the old days” — it is neuroscience: attention and self-control cannot be injected by lectures; they are built by free practice in an activity the child chooses and leads. The generation we describe as “unable to focus” is the first generation almost completely deprived of the conditions in which human beings learn to focus.'
    ) },
  ],
}

/* ===================== Attention Rebellion (Conclusion) ===================== */
export const rebellion = {
  slug: 'rebellion',
  icon: '✊',
  title: L('تمرّد الانتباه', 'Attention Rebellion'),
  lead: L(
    'إن كانت المشكلة جماعية، فالحلّ جماعيّ. يختم هاري بسلّمٍ من الحلول: يبدأ فردياً ويصعد إلى تغييرٍ في النظام نفسه.',
    'If the problem is collective, so is the solution. Hari closes with a ladder of solutions: starting individual, rising to change in the system itself.'
  ),
  blocks: [
    { type: 'h', text: L('الدرجة الأولى: ما يمكنك فعله الآن', 'Rung one: what you can do now') },
    { type: 'ul', items: [
      L('استعِد نومك — فهو شرطُ الانتباه الأوّل.', 'Reclaim your sleep — the first precondition of attention.'),
      L('استخدم **الالتزام المسبَق**: أبعِد الهاتف فيزيائياً وقت العمل العميق.', 'Use **pre-commitment**: physically remove the phone during deep work.'),
      L('احمِ حالات التدفّق: مهمّةٌ واحدة، هدفٌ واضح، بلا إشعارات.', 'Protect flow states: one task, a clear goal, no notifications.'),
      L('اترك مساحةً لشرود الذهن: مشيٌ يوميّ بلا شاشة، وطوابير بلا هاتف.', 'Leave room for mind-wandering: a daily screen-free walk, queues without the phone.'),
      L('استعِد القراءة الطويلة عادةً يومية — ولو ربع ساعةٍ محميّة في البداية.', 'Rebuild long reading as a daily habit — even a protected quarter-hour at first.'),
      L('وللأطفال في حياتك: وقتُ لعبٍ حرّ حقيقيّ، خارج البيت إن أمكن، بلا إدارةٍ من الكبار.', 'And for the children in your life: real free play, outdoors if possible, unmanaged by adults.'),
    ] },
    { type: 'callout', variant: 'fact', title: L('لكنّ هذا لا يكفي وحده', 'But this alone is not enough'), text: L(
      'يصرّ هاري على أن النصائح الفردية «بدايةٌ مهمّة لكنها ليست كافية». تماماً كما لم تُحلّ أزمة التلوّث بأن يلتقط كلّ فردٍ قمامته، لن تُحلّ أزمة الانتباه فرداً فرداً. نحتاج إلى **حركة**.',
      'Hari insists that individual advice is “an important start, but not enough.” Just as the pollution crisis was not solved by each person picking up their own litter, the attention crisis will not be solved one individual at a time. We need a **movement**.'
    ) },

    { type: 'h', text: L('الدرجة الثانية: تغيير النظام', 'Rung two: changing the system') },
    { type: 'ul', items: [
      L('حظر نموذج **رأسمالية المراقبة** القائم على استنزاف الانتباه، وتغيير حوافز التصميم.', 'Ban the **surveillance-capitalism** model built on draining attention, and change the design incentives.'),
      L('**حقّ قطع الاتصال (right to disconnect)** بعد ساعات العمل، كما في فرنسا.', 'A **right to disconnect** after working hours, as in France.'),
      L('**أسبوع عملٍ أقصر** لتقليل الإنهاك، بأدلّةٍ من نيوزيلندا واليابان.', 'A **shorter work week** to cut exhaustion, on the evidence from New Zealand and Japan.'),
      L('إعادة **اللعب الحرّ** والفضاء الآمن لطفولة الأطفال.', 'Restoring **free play** and safe space to children’s childhood.'),
    ] },
    { type: 'p', text: L(
      'أحلامٌ كبيرة؟ يجيب هاري بسابقتين حقّقتا «المستحيل». الأولى قصّة **الرصاص**: صناعةٌ جبّارة أنكرت عقوداً أن وقودها يسمّم أدمغة الأطفال، حتى هزمها تحالفُ أمّهاتٍ وعلماء وناشطين — فاختفى الرصاص من البنزين وارتفع ذكاء جيلٍ كامل. والثانية قصّة **طبقة الأوزون**: حين اكتشف العلماء أن غازات الأيروسولات تثقب درع الكوكب، لم يكتفِ الناس بالقلق — قاطعوا المنتجات وضغطوا على الحكومات حتى وُقّع بروتوكول مونتريال، والثقب اليوم يلتئم. في الحالتين بدت الصناعة أقوى من أن تُهزم، وبدا الأفراد أضعف من أن يغيّروا شيئاً — وفي الحالتين كان العكس هو الصحيح.',
      'Big dreams? Hari answers with two precedents that achieved the “impossible.” First, **lead**: a mighty industry denied for decades that its fuel was poisoning children’s brains, until a coalition of mothers, scientists and activists defeated it — lead vanished from petrol and a whole generation’s IQ rose. Second, the **ozone layer**: when scientists discovered aerosol gases were tearing a hole in the planet’s shield, people did not stop at worrying — they boycotted the products and pressed governments until the Montreal Protocol was signed, and today the hole is healing. In both cases the industry looked too strong to beat and individuals looked too weak to matter — and in both cases the opposite proved true.'
    ) },
    { type: 'quote', text: L(
      '«لوقتٍ طويل اعتبرنا انتباهنا أمراً مفروغاً منه، كأنه صبّارٌ ينمو في أشدّ المناخات جفافاً. الآن نعرف أنه أشبه بزهرة أوركيد: نبتةٌ تحتاج عنايةً كبيرة وإلا ذبلت».',
      '“For a long time we took our attention for granted, as if it was a cactus that would grow in even the most desiccated climate. Now we know it’s more like an orchid, a plant that requires great care or it will wither.”'
    ) },
    { type: 'callout', variant: 'key', title: L('أهداف هاري الثلاثة الكبرى', 'Hari’s three big, bold goals'), text: L(
      'يقترح هاري بدء الحركة بثلاثة أهداف: **حظر رأسمالية المراقبة** (من يُخترَق ويُدمَن عمداً لا يستطيع التركيز)، و**أسبوع عمل من أربعة أيّام** (المنهَك مزمناً لا يستطيع الانتباه)، و**إعادة بناء الطفولة حول اللعب الحرّ** (الطفل المحبوس في بيته لن ينمّي انتباهاً سليماً).',
      'Hari proposes starting the movement with three goals: **ban surveillance capitalism** (people deliberately hacked and hooked can’t focus), **a four-day work week** (the chronically exhausted can’t pay attention), and **rebuilding childhood around free play** (children imprisoned at home won’t develop healthy attention).'
    ) },
    { type: 'callout', variant: 'note', title: L('مجموعاتٌ تقاوم بالفعل', 'Groups already fighting'), text: L(
      'يُلحق هاري بكتابه قائمةً بمنظّماتٍ وحركاتٍ تعمل على استعادة الانتباه — من حملات تصميمٍ أخلاقيّ للتقنية، إلى حركات حقّ اللعب وأسبوع العمل الأقصر. التمرّد بدأ بالفعل؛ والانضمام إليه خيارٌ متاح.',
      'Hari appends to his book a list of organisations and movements working to reclaim attention — from ethical-technology design campaigns to the right-to-play and shorter-work-week movements. The rebellion has already begun; joining it is a choice available now.'
    ) },
    { type: 'p', text: L(
      'ويعود الكتاب في سطوره الأخيرة إلى حيث بدأ: آدم، الشابّ الذي وقف في غريسلاند محدّقاً في شاشةٍ بدل الغرفة أمامه. أمنية هاري ليست أن «يتحسّن» آدم بمفرده، بل أن ينشأ جيله في عالمٍ نظرَ إلى اختطاف الانتباه كما ننظر نحن اليوم إلى البنزين المرصَّص: شيءٌ سُمح به طويلاً، ثم نظّم الناس أنفسهم — وأنهوه.',
      'In its final lines the book returns to where it began: Adam, the young man who stood in Graceland staring at a screen instead of the room in front of him. Hari’s wish is not that Adam “get better” on his own, but that his generation grow up in a world that came to see the hijacking of attention the way we now see leaded petrol: something long permitted — until people organised, and ended it.'
    ) },
  ],
}
