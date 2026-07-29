/*
 * A deep dive into flow — sourced from Csikszentmihalyi's own book *Flow: The
 * Psychology of Optimal Experience* (1990), NOT from Stolen Focus.
 *
 * Why it lives inside the Stolen Focus tab: Hari's cause #2 is "the crippling of
 * flow", and he spends about three pages on it. The `speed-flow` section already
 * carries that summary. This section is the club going to the source — so it
 * must (a) say plainly that it is another book, and (b) not repeat what
 * `speed-flow` already covers (the wartime-chess origin, the three engineering
 * conditions, the fragility of flow). Everything here is material Hari left out.
 *
 * Written as a narrative in acts rather than a list of findings, at the user's
 * request, and deliberately light on direct quotation.
 *
 * Sourcing bar is the one set in reception.js: every number traceable. Where a
 * figure could not be verified to a primary source it is stated qualitatively
 * instead — see the note on the 1989 study below.
 */
const L = (ar, en) => ({ ar, en })

export const flowState = {
  slug: 'flow-state',
  icon: '🌊',
  title: L('حالة التدفّق — من الكتاب الأصل', 'The Flow State — from the source'),
  lead: L(
    'يخصّص هاري بضع صفحاتٍ للتدفّق. وصاحب الفكرة كتب فيها كتاباً كاملاً. هذا القسم رحلةٌ في ذلك الكتاب: كيف صُيد أعمق شعورٍ إنسانيّ بجهاز نداء، ولماذا نتدفّق في العمل ونشتهي الإجازة، وما الذي يُطفَأ في الدماغ حين تذوب في عملك — ولماذا تُقلق هذه المعرفة أكثر ممّا تُطمئن.',
    'Hari gives flow a few pages. The man whose idea it was wrote a whole book about it. This section is a journey through that book: how the deepest human feeling was caught with a pager, why we find flow at work and still crave the weekend, what switches off in the brain when you dissolve into your work — and why all of this is more unsettling than reassuring.'
  ),
  blocks: [
    { type: 'callout', variant: 'note', title: L('من أين هذا القسم؟', 'Where this section comes from'), text: L(
      'كلّ ما يلي من كتاب **«التدفّق: سيكولوجيا الخبرة المثلى»** لـ**ميهاي تشيكسنتميهايي** (١٩٩٠) وأبحاثه المنشورة — لا من «تركيزنا المسلوب». أضفناه لأن التدفّق هو السبب الثاني عند هاري، وهو السبب الوحيد الذي كتب صاحبه فيه كتاباً كاملاً يستحقّ أن يُقرأ وحده. ما تعرفه من قسم «السرعة والتشتّت والتدفّق» لن يتكرّر هنا.',
      'Everything below comes from ***Flow: The Psychology of Optimal Experience*** by **Mihaly Csikszentmihalyi** (1990) and his published research — not from Stolen Focus. We added it because flow is Hari’s second cause, and the only one whose originator wrote an entire book worth reading on its own. Nothing from the “Speed, Switching & Flow” section is repeated here.'
    ) },

    /* ---------------- Act 1: the method ---------------- */
    { type: 'h', text: L('١ · كيف تصطاد شعوراً؟', '1 · How do you hunt a feeling?') },
    { type: 'p', text: L(
      'المشكلة التي واجهت تشيكسنتميهايي في السبعينيات كانت منهجيةً لا فلسفية. الناس سيّئون في تذكّر شعورهم. اسأل أحدهم مساء الأحد: كيف كان أسبوعك؟ فيجيبك عن آخر ساعتين، أو عن الحكاية التي اعتاد أن يرويها عن نفسه. الذاكرة تحرّر الماضي قبل أن تسلّمه لك.',
      'The problem facing Csikszentmihalyi in the 1970s was methodological, not philosophical. People are bad at remembering how they felt. Ask someone on a Sunday evening how their week was and they will answer about the last two hours, or about the story they are used to telling about themselves. Memory edits the past before it hands it over.'
    ) },
    { type: 'p', text: L(
      'فابتكر حيلةً بسيطة: أعطِ الناس جهاز نداءٍ يرنّ في أوقاتٍ عشوائية، وفي كلّ رنّةٍ يسجّلون فوراً — ماذا تفعل الآن؟ وكيف تشعر الآن؟ لا استرجاع، ولا تلخيص، ولا سرد. لحظةٌ واحدة مقتنصة قبل أن تعبث بها الذاكرة. سمّاها **«منهج أخذ العيّنات من الخبرة» (Experience Sampling Method)**، وجمع بها عشرات آلاف اللحظات من آلاف البشر عبر عقود.',
      'So he invented a simple trick: give people a pager that beeps at random moments, and at each beep they record immediately — what are you doing right now? How do you feel right now? No recall, no summary, no narrative. A single moment seized before memory can get at it. He called it the **Experience Sampling Method**, and with it collected tens of thousands of moments from thousands of people across decades.'
    ) },
    { type: 'callout', variant: 'key', title: L('لماذا يهمّ هذا التفصيل المنهجيّ؟', 'Why this methodological detail matters'), text: L(
      'لأن كلّ ما يأتي بعده يقف عليه. حين تقرأ لاحقاً أننا نتدفّق في العمل أكثر منه في الإجازة، فالنتيجة ليست رأياً ولا استبياناً يسأل الناس عن ذكرياتهم — إنها ملايين اللحظات المرصودة وهي تحدث. وهذا بالضبط ما يفرّق بين هذه النتيجة وبين كثيرٍ من أرقام كتب المساعدة الذاتية.',
      'Because everything that follows rests on it. When you read below that we find more flow at work than at leisure, that is not an opinion or a survey asking people about their memories — it is moments logged as they happened. Which is exactly what separates this finding from a great many self-help statistics.'
    ) },

    /* ---------------- Act 2: the paradox ---------------- */
    { type: 'h', text: L('٢ · المفارقة التي لم يتوقّعها أحد', '2 · The paradox nobody expected') },
    { type: 'p', text: L(
      'في دراسةٍ مع **جوديث لوفيفر** (١٩٨٩) تتبّعا ٧٨ عاملاً بالغاً أسبوعاً كاملاً بأجهزة النداء. والسؤال: متى يعيش الناس أفضل لحظاتهم — في العمل أم خارجه؟ الجواب البديهيّ معروف. والنتيجة جاءت معكوسة: **الغالبية العظمى من لحظات التدفّق سُجّلت أثناء العمل**، لا في وقت الفراغ.',
      'In a study with **Judith LeFevre** (1989) they tracked 78 adult workers for a full week with pagers. The question: when do people live their best moments — on the job or off it? The intuitive answer is obvious. The result came back inverted: **the great majority of flow moments were logged at work**, not in leisure time.'
    ) },
    { type: 'p', text: L(
      'ثم جاء الجزء الذي جعلها «مفارقة». فحين سُئل الناس في اللحظة نفسها عن **دافعهم** — هل تودّ أن تكون في مكانٍ آخر الآن؟ — كان الجواب في العمل: نعم، حتى وهم في تدفّق. وفي الفراغ: لا، حتى وهم في ملل. أي أننا نهرب من الحالة التي تعطينا أفضل لحظاتنا، ونتشبّث بالحالة التي لا تعطينا شيئاً.',
      'Then came the part that made it a “paradox.” When people were asked in the same moment about their **motivation** — would you rather be doing something else? — at work the answer was yes, even while in flow. In leisure it was no, even while bored. We flee the state that gives us our best moments, and cling to the one that gives us little.'
    ) },
    { type: 'p', text: L(
      'وفي ملخّص الورقة تفصيلٌ أدقّ يستحقّ التوقّف: حين قارن الباحثان مقاييس جودة الخبرة كلّها — التركيز، والإبداع، والرضا، والنشاط، وسواها — وجدا أنها **تتبع التدفّق** لا المكان. أي أن سؤال «هل أنت في تدفّق؟» يتنبّأ بشعورك أفضل من سؤال «هل أنت في العمل أم في بيتك؟». باستثناء اثنين فقط: **الاسترخاء، والدافع**. هذان وحدهما يتبعان مكانك.',
      'The paper’s abstract holds a sharper detail worth pausing on. When the two researchers compared every measure of experience quality — concentration, creativity, satisfaction, activity and the rest — they found these track **flow**, not location. Asking “are you in flow?” predicts how you feel better than asking “are you at work or at home?”. With exactly two exceptions: **relaxation and motivation**. Those two follow where you are.'
    ) },
    { type: 'p', text: L(
      'فكّر في ما يعنيه هذا. الدافع — البوصلة التي تقرّر بها كيف تقضي يومك — هو واحدٌ من شيئين اثنين لا يشيران إلى أفضل لحظاتك. نحن نُوجَّه بمؤشّرٍ معطوب.',
      'Consider what that means. Motivation — the compass by which you decide how to spend your day — is one of only two things that do not point at your best moments. We are being steered by a broken instrument.'
    ) },
    { type: 'figure', id: 'sfFlowParadox' },
    { type: 'callout', variant: 'fact', title: L('لماذا نفعل ذلك بأنفسنا؟', 'Why do we do this to ourselves?'), text: L(
      'تفسير تشيكسنتميهايي أن العمل يحمل عادةً بنية التدفّق جاهزة: هدفٌ محدّد، وقواعد، وتغذيةٌ راجعة، وزملاء يقيسون أداءك. أمّا الفراغ فيصلك **بلا بنية إطلاقاً** — ويصعب أن تبني بنيتك بنفسك وأنت متعب. فنختار الأسهل: التلفاز، والتمرير. ونسمّي ذلك راحة. الفراغ غير المنظّم هو المهارة التي لم يعلّمنا أحدٌ إيّاها.',
      'Csikszentmihalyi’s explanation: work usually arrives with the architecture of flow pre-installed — a defined goal, rules, feedback, colleagues measuring your performance. Leisure arrives with **no structure at all** — and building your own structure while tired is hard. So we take the easy option: the television, the scroll. And we call it rest. Unstructured free time is the skill nobody taught us.'
    ) },

    /* ---------------- Act 3: anatomy ---------------- */
    { type: 'h', text: L('٣ · تشريح الحالة', '3 · The anatomy of the state') },
    { type: 'p', text: L(
      'حين حلّل آلاف الأوصاف — من راقصات باليه وجرّاحين ومتسلّقي صخور ولاعبي شطرنج وعمّال خطوط تجميع — وجد الوصف نفسه يتكرّر بالكلمات نفسها تقريباً، عبر الثقافات والأعمار والمهن. تسعة عناصر. والمفتاح العمليّ أن تعرف أيّها تصنعه أنت، وأيّها يأتيك.',
      'When he analysed thousands of descriptions — from ballet dancers, surgeons, rock climbers, chess players, assembly-line workers — the same account came back in almost the same words, across cultures, ages and occupations. Nine components. The practical key is knowing which ones you make and which ones arrive on their own.'
    ) },
    { type: 'figure', id: 'sfFlowNine' },
    { type: 'p', text: L(
      'انتبه إلى ما يعنيه هذا التقسيم: **لا يمكنك أن تدخل التدفّق بقرار**. لا يجدي أن تجلس وتقول «سأتدفّق الآن» — كما لا يجدي أن تقول «سأنام الآن» فتنام. كلّ ما تملكه هو ترتيب الشروط الثلاثة، ثمّ الانصراف عن مراقبة نفسك. والمفارقة الصغيرة هنا أنّ مراقبتك لنفسك بحثاً عن التدفّق هي بالضبط ما يمنعه.',
      'Notice what that split implies: **you cannot decide your way into flow**. Sitting down and saying “I will now flow” works about as well as saying “I will now fall asleep.” All you control is arranging the three conditions and then stopping watching yourself. The small irony: monitoring yourself for signs of flow is precisely what prevents it.'
    ) },

    /* ---------------- Act 4: biology ---------------- */
    { type: 'h', text: L('٤ · ما الذي يُطفَأ في الدماغ؟', '4 · What switches off in the brain?') },
    { type: 'p', text: L(
      'أغرب عنصرٍ في القائمة هو **اختفاء الوعي بالذات**. أن يصمت الصوت الذي يسألك: كيف أبدو؟ هل أُحسن؟ ماذا سيقولون؟ فهل لهذا الصمت أثرٌ يُقاس؟',
      'The strangest item on the list is **the disappearance of self-consciousness**: the silencing of the voice that asks how you look, whether you are doing well, what they will say. Does that silence leave a measurable trace?'
    ) },
    { type: 'p', text: L(
      'اقترح عالم الأعصاب **آرني ديتريش** عام ٢٠٠٣ فرضيةً سمّاها **«خمول الجبهة العابر» (Transient Hypofrontality)**. جوهرها اقتصاديّ لا سحريّ: للدماغ ميزانية أيضاً. وحين يلتهم نشاطٌ ما موارد المناطق الحسّية والحركية إلى أقصاها، فلا بدّ أن يُقتطع من مكانٍ آخر — والمرشّح الأول هو قشرة الجبهة، مقرّ التخطيط والمراقبة الذاتية والإحساس بالزمن. أي أن الحالة العجيبة التي تصفها بأنها «ذوبان» قد تكون ببساطة: منطقةٌ خفت ضوؤها لأن الطاقة ذهبت إلى غيرها.',
      'In 2003 the neuroscientist **Arne Dietrich** proposed a hypothesis he called **transient hypofrontality**. Its core is economic, not mystical: the brain has a budget too. When an activity consumes the resources of the sensory and motor regions to their limit, something has to give — and the first candidate is the prefrontal cortex, seat of planning, self-monitoring and the sense of time. The strange state you describe as “dissolving” may simply be a region dimming because the energy went elsewhere.'
    ) },
    { type: 'p', text: L(
      'ثم جاء القياس. في ٢٠٠٨ أدخل **تشارلز ليمب وألن براون** ستّة عازفي جاز محترفين إلى ماسح رنينٍ مغناطيسيّ بلوحة مفاتيحَ بلاستيكية غير مغناطيسية، وطلبا منهم أن يعزفوا مقطوعةً محفوظة، ثم أن يرتجلوا. والفارق بين الحالتين كان نمطاً **مفصولاً** لافتاً: هبوطٌ واسع في القشرة الجبهية الجانبية الظهرية والحجاجية الجانبية، مع ارتفاعٍ مركّزٍ في القشرة الجبهية الإنسية.',
      'Then came the measurement. In 2008 **Charles Limb and Allen Braun** put six professional jazz pianists into an fMRI scanner with a non-magnetic plastic keyboard and asked them to play a memorised piece, then to improvise. The difference between the two was a striking **dissociated** pattern: broad deactivation across the dorsolateral prefrontal and lateral orbital cortex, alongside focal activation of the medial prefrontal cortex.'
    ) },
    { type: 'figure', id: 'sfFlowBrain' },
    { type: 'callout', variant: 'warn', title: L('حدود ما نعرفه — ورقمٌ لن تجده هنا', 'The limits of this — and a claim you will not find here'), text: L(
      'ديتريش صاحب **فرضية**، لا قانون؛ ودراسة ليمب وبراون على **ستّة أشخاص** وعن **الارتجال** تحديداً لا عن التدفّق بعنوانه العريض. الاتجاه متّسق ومغرٍ، والدليل أضيق ممّا يُروَّج له. وستقرأ في كثيرٍ من المقالات أن التدفّق «خليطٌ كيميائيّ» من الدوبامين والإندورفين والأناندامايد — تجاهلنا هذا عمداً: إنه تبسيطٌ شائع لا يقف خلفه دليلٌ يقارَب دليل ما ذُكر أعلاه.',
      'Dietrich offers a **hypothesis**, not a law; and Limb & Braun studied **six people**, and studied **improvisation** specifically rather than flow at large. The direction is consistent and tempting; the evidence is narrower than the retelling. You will also read in many articles that flow is a “neurochemical cocktail” of dopamine, endorphins and anandamide — we left that out deliberately: it is a popular simplification with nothing like the evidence behind the results above.'
    ) },

    /* ---------------- Act 5: two people ---------------- */
    { type: 'h', text: L('٥ · ريكو وسيرافينا', '5 · Rico and Serafina') },
    { type: 'p', text: L(
      'أكثر ما يُساء فهمه في الكتاب أن التدفّق مرتبطٌ بعملٍ «ممتع». وأقوى ردٍّ على ذلك رجلٌ اسمه **ريكو ميديلين**، يقف على خطّ تجميع. مهمّته على كلّ وحدةٍ تمرّ أمامه تستغرق ٤٣ ثانية، ويكرّرها نحو ست مئة مرّةٍ في اليوم. خمس سنوات. وهو يستمتع.',
      'The most misunderstood idea in the book is that flow requires “interesting” work. The strongest reply to that is a man named **Rico Medellin**, who stands at an assembly line. His task on each unit that passes takes forty-three seconds, and he repeats it about six hundred times a day. For five years. And he enjoys it.'
    ) },
    { type: 'p', text: L(
      'لأنه حوّلها إلى لعبة: يقيس نفسه، يطارد رقمه القياسيّ، يجرّب تعديلاً صغيراً في حركة يده. صنع بنفسه ما لم توفّره له الوظيفة: هدفاً، وقياساً، وتحدّياً يرتفع. لم تتغيّر الوحدة ولا الثواني الثلاث والأربعون — تغيّرت البنية التي وضعها فوقها.',
      'Because he turned it into a game: he times himself, chases his own record, tries a small adjustment in the movement of his hand. He built for himself what the job did not supply: a goal, a measure, and a challenge that rises. The unit did not change, nor the forty-three seconds — what changed is the structure he laid over them.'
    ) },
    { type: 'p', text: L(
      'وعلى الطرف الآخر تماماً **سيرافينا فينون**، مزارعةٌ في السادسة والسبعين في قريةٍ ألبية نائية شمال إيطاليا. تستيقظ الخامسة فجراً لتحلب أبقارها، ثم تطبخ، ثم تندف الصوف أو تعتني ببستانها، ثم تجلس مع أحفاد أحفادها أو تعزف الأكورديون. وحين سُئلت عمّا تفضّل أن تفعله لو ملكت الحرية والمال، عدّدت ما تفعله أصلاً. **لا تفرّق أساساً بين العمل والفراغ** — وهي بذلك تعيش خارج المفارقة التي نعيش داخلها.',
      'At the opposite extreme is **Serafina Vinon**, a seventy-six-year-old farmer in a remote alpine village in northern Italy. She rises at five to milk her cows, then cooks, then cards wool or tends her orchard, then sits with her great-grandchildren or plays the accordion. Asked what she would rather do if she had freedom and money, she listed what she already does. **She draws no line between work and leisure at all** — and so lives outside the paradox the rest of us live inside.'
    ) },

    /* ---------------- Act 6: the ratchet ---------------- */
    { type: 'h', text: L('٦ · لماذا لا تتدفّق مرّتين في المكان نفسه', '6 · Why you cannot flow twice in the same place') },
    { type: 'p', text: L(
      'هنا الفكرة التي تغيب عن كلّ تلخيصٍ سريع للتدفّق — وعن «تركيزنا المسلوب» أيضاً. التدفّق ليس مكاناً تصل إليه فتستقرّ فيه؛ إنه **حالةٌ تدمّر شروطها بنفسها**. لأنك حين تتدفّق تتحسّن، وحين تتحسّن يصير التحدّي الذي كان يناسبك بالأمس أقلّ من مهارتك اليوم — فيسقط بك إلى الملل.',
      'Here is the idea missing from every quick summary of flow — and from Stolen Focus as well. Flow is not a place you reach and settle into; it is **a state that destroys its own conditions**. Because while you are in flow you improve, and once you improve, the challenge that fitted you yesterday sits below your skill today — and drops you into boredom.'
    ) },
    { type: 'figure', id: 'sfFlowRatchet' },
    { type: 'p', text: L(
      'ولهذا يصف تشيكسنتميهايي التدفّق بأنه محرّك نموّ لا وصفة راحة: الملل والقلق ليسا أعطالاً في الطريق، بل **إشارتا توجيه**. الملل يقول: ارفع التحدّي. والقلق يقول: ارفع مهارتك أو اخفض التحدّي مؤقّتاً. من يقرأ الإشارتين يصعد سلّماً؛ ومن يتجاهلهما يتوقّف.',
      'This is why Csikszentmihalyi describes flow as an engine of growth rather than a recipe for comfort: boredom and anxiety are not faults along the way, they are **navigation signals**. Boredom says: raise the challenge. Anxiety says: raise your skill, or lower the challenge for now. Read both and you climb a staircase; ignore them and you stall.'
    ) },

    /* ---------------- Act 7: the dark side ---------------- */
    { type: 'h', text: L('٧ · الوجه المظلم — ولماذا يخصّنا نحن', '7 · The dark side — and why it is ours') },
    { type: 'p', text: L(
      'أخطر ما في نظرية التدفّق أن صاحبها قاله بنفسه ولا يكاد أحدٌ ينقله: **التدفّق محايدٌ أخلاقياً**. إنه وصفٌ لبنية تجربةٍ لا حكمٌ على قيمتها. الجرّاح يتدفّق وهو ينقذ حياة. والمقامر يتدفّق أمام الآلة. واللصّ يتدفّق وهو يفتح قفلاً. البنية واحدة: هدفٌ واضح، تغذيةٌ راجعة فورية، تحدٍّ عند حافّة المهارة.',
      'The most dangerous thing about flow theory is something its author said himself and almost nobody repeats: **flow is morally neutral**. It describes the structure of an experience, not the worth of it. The surgeon is in flow saving a life. The gambler is in flow at the machine. The burglar is in flow picking a lock. The structure is identical: a clear goal, immediate feedback, a challenge at the edge of skill.'
    ) },
    { type: 'p', text: L(
      'وهنا يلتقي كتاب تشيكسنتميهايي بكتاب هاري التقاءً لم يُبرزه هاري نفسه. اقرأ شروط التدفّق الثلاثة مرّةً أخرى، ثم فكّر في تطبيقٍ صُمّم لاحتجازك: هدفٌ واضح (مرّر)، تغذيةٌ راجعة فورية (إعجابٌ، رقمٌ يرتفع)، تحدٍّ معايَر لحظياً بخوارزميةٍ تعرف مستواك أدقّ ممّا تعرفه أنت. **هذه هندسة التدفّق بحذافيرها.**',
      'And here Csikszentmihalyi’s book meets Hari’s in a way Hari never quite draws out. Read the three conditions again, then think about an app designed to hold you: a clear goal (swipe), immediate feedback (a like, a number ticking up), and a challenge calibrated moment by moment by an algorithm that knows your level better than you do. **That is the architecture of flow, exactly.**'
    ) },
    { type: 'callout', variant: 'key', title: L('الفرق الوحيد — وهو كلّ شيء', 'The one difference — and it is everything'), text: L(
      'التدفّق الحقيقيّ يرفعك: تخرج منه أقدر ممّا دخلت، فيضطرّك ذلك إلى رفع التحدّي، فتنمو. أمّا تدفّق الآلة فمصمّمٌ ليبقيك **عند المستوى نفسه إلى الأبد** — لأن نموّك يعني خروجك. هو يقلّد شكل الحالة ويحذف منها المحرّك. ولهذا تنهض من ساعتين على الهاتف بإحساس المستنزَف لا المنجِز: عشت البنية بلا الصعود. هذا استنتاج النادي من قراءة الكتابين معاً، لا نصّ في أحدهما.',
      'Real flow lifts you: you come out of it more capable than you went in, which forces you to raise the challenge, so you grow. Engineered flow is built to hold you **at the same level forever** — because your growth means your departure. It imitates the shape of the state and deletes the engine. Which is why you get up from two hours on the phone feeling drained rather than accomplished: you had the structure without the climb. This is the club’s own reading of the two books together, not a passage in either.'
    ) },
    { type: 'p', text: L(
      'ويضيف تشيكسنتميهايي تحذيراً ثانياً: التدفّق نفسه قد يصير إدماناً. من يجد نظامه الوحيد في نشاطٍ واحد قد يصبح أسيره، ويعجز عن الاستمتاع بغيره، وينهار حين يُنتزع منه. الحالة التي تنظّم وعيك يمكن أيضاً أن تحبسه.',
      'Csikszentmihalyi adds a second warning: flow itself can become an addiction. Someone who finds their only order in a single activity can become its captive, unable to enjoy anything else, and collapse when it is taken away. The state that orders your consciousness can also imprison it.'
    ) },

    /* ---------------- Act 8: what to take ---------------- */
    { type: 'h', text: L('٨ · ماذا نأخذ من هذا كلّه؟', '8 · What to take from all this') },
    { type: 'ol', items: [
      L('**لا تنتظر «المزاج».** رتّب الشروط الثلاثة — هدفٌ واحد، طريقةٌ ترى بها تقدّمك فوراً، صعوبةٌ فوق مستواك بقليل — ثم ابدأ رديئاً. التدفّق يأتي بعد الدخول لا قبله.',
        '**Do not wait for the “mood.”** Arrange the three conditions — one goal, a way to see your progress immediately, a difficulty just above your level — then begin badly. Flow arrives after you enter, not before.'),
      L('**عامل المللَ كإشارة.** إن سئمت عملاً كنت تحبّه، فالغالب أنك أتقنته ولم ترفع سقفه. المشكلة في التحدّي لا في اهتمامك.',
        '**Treat boredom as a signal.** If work you used to love has gone flat, you have most likely mastered it without raising the ceiling. The problem is the challenge, not your interest.'),
      L('**خطّط لفراغك كما تخطّط لعملك.** المفارقة تقول إن العمل يأتي ببنيةٍ جاهزة والفراغ لا. ساعةٌ من هوايةٍ تتطلّب مهارة تساوي أضعاف ساعةٍ من التمرير — لا لأنها «مفيدة»، بل لأنها الوحيدة التي ستشعر فيها بشيء.',
        '**Plan your free time the way you plan your work.** The paradox says work comes pre-structured and leisure does not. An hour of a hobby that demands skill is worth several hours of scrolling — not because it is “productive,” but because it is the only one you will feel anything during.'),
      L('**اسأل عن الصعود لا عن الانغماس.** الانغماس وحده ليس دليل خير؛ الآلة تتقنه. السؤال الصحيح: هل أخرج من هذا أقدر ممّا دخلت؟',
        '**Ask about the climb, not the absorption.** Absorption alone proves nothing — machines are good at it. The right question: do I come out of this more capable than I went in?'),
    ] },
    { type: 'callout', variant: 'quote', title: L('وأخيراً، لماذا هذا القسم مقلق؟', 'Finally — why this section is unsettling'), text: L(
      'لأن الخلاصة ليست «اعثر على شغفك». الخلاصة أن أعمق حالات الرضا البشريّ لها **بنيةٌ معروفة وقابلة للتصنيع** — وأن صناعةً كاملة تصنعها اليوم بإتقانٍ يفوق إتقاننا، وتبيعها لنا منزوعة النموّ. عرفنا الوصفة قبل أن نتعلّم حمايتها.',
      'Because the conclusion is not “find your passion.” The conclusion is that the deepest state of human satisfaction has a **known, manufacturable structure** — and that an entire industry now manufactures it better than we do, and sells it back to us with the growth stripped out. We learned the recipe before we learned to defend it.'
    ) },

    { type: 'sources', title: L('اقرأ بنفسك', 'Read it yourself'), items: [
      { label: L('«التدفّق: سيكولوجيا الخبرة المثلى» — الكتاب الأصل', '“Flow: The Psychology of Optimal Experience” — the source book'),
        publisher: L('ميهاي تشيكسنتميهايي، ١٩٩٠', 'Mihaly Csikszentmihalyi, 1990'),
        url: 'https://www.goodreads.com/book/show/66354.Flow' },
      { label: L('«الخبرة المثلى في العمل والفراغ» — دراسة مفارقة العمل', '“Optimal Experience in Work and Leisure” — the paradox-of-work study'),
        publisher: L('مجلّة علم نفس الشخصية والاجتماع، ١٩٨٩', 'J. Personality and Social Psychology, 1989'),
        url: 'https://www.researchgate.net/publication/20432305_Optimal_Experience_in_Work_and_Leisure' },
      { label: L('دراسة ارتجال الجاز داخل الماسح — النصّ الكامل', 'The jazz-improvisation fMRI study — full text'),
        publisher: L('بلوس ون، ٢٠٠٨', 'PLOS ONE, 2008'),
        url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0001679' },
      { label: L('فرضية «خمول الجبهة العابر»', 'The transient hypofrontality hypothesis'),
        publisher: L('آرني ديتريش، ٢٠٠٣', 'Arne Dietrich, 2003'),
        url: 'https://pages.ucsd.edu/~jpineda/COGS175/readings/Dietrich.pdf' },
    ] },
  ],
}
