const L = (ar, en) => ({ ar, en })

/* ===================== Deep Reading & Mind-Wandering (Causes 4–5) ===================== */
export const readingMindwandering = {
  slug: 'reading-mindwandering',
  icon: '📖',
  title: L('القراءة العميقة وشرود الذهن', 'Deep Reading & Mind-Wandering'),
  lead: L(
    'قدرتان صامتتان يفقدهما عصر الشاشات: الغوص الطويل في كتاب، وترك الذهن يشرد بحرّية — وكلتاهما ضرورية للتفكير.',
    'Two quiet capacities the screen age is eroding: the long dive into a book, and letting the mind wander freely — both essential to thought.'
  ),
  blocks: [
    { type: 'h', text: L('السبب الرابع: انهيار القراءة المتواصلة', 'Cause four: the collapse of sustained reading') },
    { type: 'p', text: L(
      'القراءة العميقة تمرينٌ فريد للانتباه: تتبُّع فكرةٍ واحدة عبر صفحاتٍ وساعات. لكنها تتراجع بسرعة: هبط متوسّط ما يقرؤه الأمريكيّ من الكتب إلى نحو **١٧ دقيقة في اليوم**، مقابل أكثر من **ثلاث ساعات** على الهاتف — وأكثر من نصف الأمريكيين لا يُتمّون كتاباً واحداً في السنة العادية. لم «نقرّر» التوقّف عن القراءة؛ بل زاحمها منافسٌ صُمّم ليكون أسهل منها في كلّ لحظة اختيار.',
      'Deep reading is a unique exercise of attention: following a single thread of thought across pages and hours. But it is declining fast: the average American now reads books for about **17 minutes a day**, against more than **three hours** on the phone — and over half of Americans do not finish a single book in a typical year. We never “decided” to stop reading; a competitor moved in, engineered to be the easier choice at every moment of choosing.'
    ) },
    { type: 'p', text: L(
      'أظهرت أبحاث **آن مانغن (Anne Mangen)** أننا نفهم النصّ ونتذكّره على الورق أفضل ممّا على الشاشة — ظاهرةٌ تُسمّى «دونية الشاشة (screen inferiority)». في إحدى تجاربها قرأ مشاركون القصّة نفسها على الورق وعلى قارئٍ إلكتروني، فكان قرّاء الورق أدقّ في استرجاع **تسلسل الأحداث** — كأنّ اليد التي تقلّب الصفحات ترسم للقصّة خريطةً في الذهن. وعلى الشاشة نميل إلى المسح السريع بحثاً عن الكلمات المفتاحية بدل القراءة المتأنّية.',
      'Research by **Anne Mangen** shows we comprehend and remember text better on paper than on screen — a phenomenon called **“screen inferiority.”** In one of her experiments, participants read the same story on paper and on an e-reader; the paper readers were more accurate at recalling the **order of events** — as if the hand turning pages draws a map of the story in the mind. On screens, we tend to scan for keywords instead of reading deliberately.'
    ) },
    { type: 'p', text: L(
      'الأخطر من ذلك ما لخّصه **مارشال ماكلوهان (Marshall McLuhan)** بعبارته الشهيرة: **«الوسيلة هي الرسالة»**. كلّ وسيطٍ يدرّبنا — بصرف النظر عن محتواه — على طريقةٍ في التفكير: الكتاب المطبوع يعلّمك أن الأشياء المهمّة تحتاج بطئاً وتسلسلاً وتركيزاً طويلاً؛ وشريط الأخبار يعلّمك أن العالم ومضاتٌ سريعة منزوعة السياق لا تستحقّ أكثر من ثانية. وحذّر **نيكولاس كار (Nicholas Carr)** في «السطحيّون (The Shallows)» من المرحلة التالية: أن ننقل عادات الشاشة إلى الورق نفسه — فنقرأ الكتب «قفزاً» كما نقرأ الشاشة، ونفقد القدرة على العمق حتى حين نريده.',
      'More dangerous still is what **Marshall McLuhan** captured in his famous phrase: **“the medium is the message.”** Every medium — regardless of its content — trains a way of thinking: the printed book teaches that important things demand slowness, sequence, and long focus; the news feed teaches that the world is a stream of context-free flashes worth no more than a second each. And **Nicholas Carr**, in **“The Shallows,”** warned of the next stage: that we carry screen habits back to paper itself — reading books in “hops” the way we read feeds, losing the capacity for depth even when we want it.'
    ) },
    { type: 'callout', variant: 'fact', title: L('القراءة تبني التعاطف', 'Reading builds empathy'), text: L(
      'وجد **رايموند مار (Raymond Mar)** وزملاؤه أن قرّاء الروايات يسجّلون درجاتٍ أعلى في فهم مشاعر الآخرين ونيّاتهم («نظرية العقل»). القصّة الطويلة تدرّبنا على أن نعيش داخل عقلٍ آخر — أن نرى العالم بعينَي شخصٍ يختلف عنّا صفحةً بعد صفحة. هذه مهارةٌ اجتماعية وديمقراطية في آن: مجتمعٌ يفقد قراءة الروايات يفقد شيئاً من قدرته على تخيّل الآخرين — ولا تصنعها التغريدات القصيرة.',
      'Raymond Mar and colleagues found that readers of fiction score higher at understanding others’ feelings and intentions (“theory of mind”). A long story trains us to live inside another mind — to see the world through the eyes of someone unlike us, page after page. That is a social and a democratic skill at once: a society that stops reading novels loses some of its power to imagine other people — and short tweets do not rebuild it.'
    ) },
    { type: 'p', text: L(
      'ويشهد هاري على قابلية الشفاء: في عزلته بعيداً عن الإنترنت (يرويها قسم «التفاؤل القاسي») عاد يقرأ الروايات ساعاتٍ متواصلة كلّ يوم. كان الأمر عسيراً في الأيّام الأولى — ذهنه «يرتدّ» عن الصفحة كما ترتدّ العضلة الضامرة عن الحمل — ثم عادت القدرة تدريجياً، وعاد معها ذلك الشعور القديم: أن تسكن كتاباً. القراءة العميقة عضلة: تضمر بالإهمال، وتنمو بالتمرين.',
      'Hari himself testifies that the damage is reversible: in his internet-free retreat (told in the “Cruel Optimism” section) he returned to reading novels for hours a day. The first days were hard — his mind “bounced off” the page the way an atrophied muscle fails under load — then the capacity gradually returned, and with it that old feeling of inhabiting a book. Deep reading is a muscle: it withers with neglect and grows with training.'
    ) },
    { type: 'figure', id: 'sfReadingDecline' },
    { type: 'figure', id: 'sfDistractedReading' },

    { type: 'h', text: L('السبب الخامس: كبت شرود الذهن', 'Cause five: the suppression of mind-wandering') },
    { type: 'p', text: L(
      'حين لا نفعل شيئاً «مفيداً» يشرد ذهننا — ونظنّ ذلك وقتاً ضائعاً، فنسارع إلى ملء كلّ فراغٍ بالهاتف: في الطابور، في المصعد، في أوّل ثانية ملل. لكنّ علم الأعصاب يروي قصّةً أخرى: حين وضع **ماركوس رايكل (Marcus Raichle)** أشخاصاً في ماسح الدماغ وطلب منهم «ألّا يفعلوا شيئاً»، توقّع أن يهدأ الدماغ — فاكتشف العكس: شبكةٌ كاملة تضيء بقوّة كلّما «ارتحنا»، سُمّيت لاحقاً **«شبكة الوضع الافتراضي» (Default Mode Network)**. الدماغ الشارد ليس دماغاً متوقّفاً؛ إنه دماغٌ انتقل إلى نمطٍ آخر من العمل.',
      'When we are not doing something “useful,” our mind wanders — and we treat that as wasted time, rushing to fill every gap with the phone: in the queue, in the lift, at the first second of boredom. But neuroscience tells another story: when **Marcus Raichle** put people in a brain scanner and asked them to “do nothing,” he expected the brain to quiet down — and discovered the opposite: an entire network lights up whenever we “rest,” later named the **Default Mode Network**. A wandering brain is not a brain switched off; it is a brain switched into a different mode of work.'
    ) },
    { type: 'p', text: L(
      'ما الذي يجري في ذلك النمط؟ يحدّد باحث شرود الذهن **جوناثان سمولوود (Jonathan Smallwood)** ثلاث وظائف جوهرية:',
      'What happens in that mode? Mind-wandering researcher **Jonathan Smallwood** identifies three core functions:'
    ) },
    { type: 'ul', items: [
      L('**نسج المعنى:** يربط الذهن الشارد ما تعلّمته اليوم بما تعرفه أصلاً، فيحوّل شظايا التجربة إلى فهم.',
        '**Making sense:** the wandering mind stitches what you learned today to what you already know, turning fragments of experience into understanding.'),
      L('**السفر الذهنيّ عبر الزمن:** يستعيد الماضي ويتمرّن على المستقبل — وهنا تُتّخذ القرارات وتُبنى الخطط والهويّة.',
        '**Mental time-travel:** it revisits the past and rehearses the future — this is where decisions ripen, plans form, and identity is built.'),
      L('**الربط الإبداعي:** الأفكار الجديدة تولد من تصادم عناصر بعيدة — ولهذا تأتي أفضل أفكارك في الدشّ أو أثناء المشي، لا أمام الشاشة.',
        '**Creative connection:** new ideas are born when distant elements collide — which is why your best ideas arrive in the shower or on a walk, not in front of a screen.'),
    ] },
    { type: 'callout', variant: 'note', title: L('شرودٌ ليس تشتّتاً', 'Wandering is not distraction'), text: L(
      'ثمّة فرقٌ مهمّ: **شرود الذهن الحرّ** (في نزهةٍ هادئة مثلاً) يغذّي الإبداع؛ أمّا **التشتّت** القسري بإشعارٍ بعد إشعار فيمزّق الانتباه. والسياق يقلب الأثر: في الأمان يصبح الشرود استكشافاً؛ وتحت التوتّر ينقلب اجتراراً قلقاً. أشار بحث **دانييل غيلبرت (Daniel Gilbert)** و**ماثيو كيلينغزوورث (Matthew Killingsworth)** إلى أن الذهن الشارد قد يكون أقلّ سعادةً لحظياً، لكنّ هاري يجادل بأن الحرمان الكامل من الشرود ثمنُه فادح على تفكيرنا العميق.',
      'There is an important difference: **free mind-wandering** (on a quiet walk, say) feeds creativity, whereas forced **distraction**, notification after notification, shreds attention. And context flips the effect: in safety, wandering becomes exploration; under stress, it curdles into anxious rumination. Research by **Daniel Gilbert** and **Matthew Killingsworth** suggested a wandering mind can be less happy in the moment, but Hari argues that total deprivation of wandering carries a steep cost for our deep thinking.'
    ) },
    { type: 'p', text: L(
      'المفارقة أننا فقدنا الحالتين معاً: لم نعد نركّز تركيزاً عميقاً، ولم نعد نشرد شروداً حرّاً — بل علقنا في منزلةٍ وسطى مشوّشة يملؤها التمرير. والعلاج بسيطٌ ومجّاني: استعد فراغاتك. امشِ بلا هاتف، وقف في الطابور بلا شاشة، ودَع الملل يزورك — فخلف دقائق الملل الأولى تنتظر أفكارك الأفضل.',
      'The irony is that we have lost both states at once: we no longer focus deeply, and we no longer wander freely — we are stuck in a blurry middle filled with scrolling. The cure is simple and free: reclaim your gaps. Walk without a phone, queue without a screen, and let boredom visit — just past the first minutes of boredom, your best thoughts are waiting.'
    ) },
  ],
}

/* ===================== Tech That Tracks & Manipulates You (Cause 6) ===================== */
export const bigTech = {
  slug: 'big-tech',
  icon: '📱',
  title: L('تقنيةٌ تتعقّبك وتتلاعب بك', 'Tech That Tracks & Manipulates You'),
  lead: L(
    'تطبيقاتك ليست محايدة. صُمّمت بعناية لتأسر انتباهك أطول وقتٍ ممكن، لأن انتباهك هو تحديداً ما يُباع.',
    'Your apps are not neutral. They are carefully engineered to capture your attention for as long as possible — because your attention is precisely what is being sold.'
  ),
  blocks: [
    { type: 'h', text: L('اعترافات من داخل الآلة', 'Confessions from inside the machine') },
    { type: 'p', text: L(
      'أقوى شهود هاري ليسوا نقّاداً خارجيين، بل مهندسين بنوا الآلة بأيديهم. اخترع **أزا راسكِن (Aza Raskin)** — ابن أحد مصمّمي حاسوب ماكنتوش الأوائل — خاصّية **«التمرير اللانهائي» (infinite scroll)**: الصفحة التي لا تنتهي أبداً ولا تعطيك لحظة توقّفٍ طبيعية تسأل فيها: هل أكتفي؟ يقول اليوم إنه نادم؛ فحين حسب فريقه أثر اختراعه، وجد أنه يسرق من البشرية ما يعادل **مئات آلاف الأعمار البشرية كلّ يوم** من الوقت الإضافي على الشاشات.',
      'Hari’s strongest witnesses are not outside critics but engineers who built the machine with their own hands. **Aza Raskin** — son of one of the original designers of the Macintosh — invented **infinite scroll**: the page that never ends and never offers a natural pause to ask, have I had enough? Today he says he regrets it; when his team calculated the invention’s effect, they found it steals from humanity the equivalent of **hundreds of thousands of human lifetimes every day** in extra screen time.'
    ) },
    { type: 'figure', id: 'sfInfiniteScroll' },
    { type: 'p', text: L(
      'أمّا **تريستان هاريس (Tristan Harris)** فقصّته أبلغ: طفلٌ هوى ألعاب الخفّة، تعلّم مبكّراً أن عقل الإنسان يمكن توجيهه من حيث لا يشعر، ثم درس في «مختبر التقنية المُقنِعة» في ستانفورد — حيث تُدرَّس هندسة العادات فعلياً — والتحق بغوغل. هناك كتب عرضاً داخلياً يحذّر من أن الشركة تُمسك بانتباه مليارَي إنسان وتهزّه كلّ بضع دقائق، فانتشر العرض بين آلاف الموظّفين وصُنع له منصب «أخصائيّ أخلاقيات التصميم». لكنه اكتشف أن شيئاً لا يتغيّر — فالحوافز أقوى من النوايا — فاستقال ليقود حملة تحذيرٍ عالمية. عبارته الشهيرة: إنه **«سباقٌ نحو قاع جذع الدماغ»** — تنافسٌ على استثارة أكثر غرائزنا بدائيةً لأنها الأسرع في جذب النقرات.',
      '**Tristan Harris**’s story says even more: a boy who loved stage magic, he learned early that the human mind can be steered without noticing, then studied at Stanford’s Persuasive Technology Lab — where habit engineering is literally taught — and joined Google. There he wrote an internal deck warning that the company held the attention of two billion people and jolted it every few minutes; it spread to thousands of employees, and a title was created for him: “design ethicist.” But he found nothing changed — the incentives were stronger than the intentions — so he quit to lead a global alarm campaign. His famous phrase: it is a **“race to the bottom of the brain stem”** — a competition to trigger our most primitive instincts, because they are the fastest route to clicks.'
    ) },

    { type: 'h', text: L('كيف تعمل الحيلة', 'How the trick works') },
    { type: 'p', text: L(
      'الحيلة الأساسية مستعارةٌ من عالِم النفس **ب. ف. سكِنر (B. F. Skinner)**: **المكافأة المتغيّرة (variable reward)**. حين تكون المكافأة مضمونةً ومنتظمة يفتر الاهتمام سريعاً؛ أمّا حين تكون **غير متوقّعة** — أحياناً تأتي وأحياناً لا — فإن السلوك يترسّخ بعنادٍ يشبه الإدمان. هكذا صُمّم السحب للتحديث كذراع آلة قمار: قد تجد إعجاباتٍ جديدة، وقد لا تجد — فلا تكفّ عن السحب.',
      'The core trick is borrowed from psychologist **B. F. Skinner**: the **variable reward**. When a reward is guaranteed and regular, interest fades quickly; when it is **unpredictable** — sometimes there, sometimes not — the behaviour locks in with an addiction-like stubbornness. That is why pull-to-refresh is built like a slot-machine lever: there may be new likes, or there may not — so you never stop pulling.'
    ) },
    { type: 'ul', items: [
      L('**السحب للتحديث:** ذراع قمارٍ في جيبك — مكافأةٌ غير مضمونة مع كلّ سحبة.',
        '**Pull-to-refresh:** a slot-machine lever in your pocket — an unguaranteed reward with every pull.'),
      L('**الشارات الحمراء:** لون الإنذار تحديداً، ليصعب على دماغك تجاهل الرقم الصغير.',
        '**Red badges:** the colour of alarm, precisely so your brain cannot ignore the little number.'),
      L('**سلاسل الأيّام (Streaks):** تحوّل الغياب يوماً واحداً إلى «خسارة» تؤلم — فتعود ولو بلا رغبة.',
        '**Streaks:** turning a single day’s absence into a “loss” that stings — so you come back even without wanting to.'),
      L('**التشغيل التلقائي:** الفيديو التالي يبدأ وحده؛ قرار التوقّف صار هو الذي يحتاج مجهوداً، لا قرار الاستمرار.',
        '**Autoplay:** the next video starts by itself; stopping now requires the effort, not continuing.'),
      L('**التمرير اللانهائي:** حذف «نهاية الصفحة» حذف معها اللحظة الطبيعية للانصراف.',
        '**Infinite scroll:** deleting the “end of the page” deleted the natural moment of leaving.'),
    ] },
    { type: 'callout', variant: 'warn', title: L('نموذج العمل هو المشكلة', 'The business model is the problem'), text: L(
      'تسمّي **شوشانا زوبوف (Shoshana Zuboff)** هذا **«رأسمالية المراقبة» (Surveillance Capitalism)**: تُجمع بياناتك لتتنبّأ بسلوكك، ثم يُباع هذا التنبّؤ للمعلنين. المنتج ليس التطبيق؛ **المنتج أنت** — أو بدقّة، انتباهك وقابليّتك للتوجيه. ولهذا لا تنفع مناشدة الشركات بأن «تتحسّن»: ما دام الربح يُقاس بدقائق بقائك محدّقاً، فكلّ تحسينٍ للتصميم سيصبّ في إبقائك أطول.',
      '**Shoshana Zuboff** calls this **“Surveillance Capitalism”**: your data is harvested to predict your behaviour, and that prediction is sold to advertisers. The product is not the app; **the product is you** — or precisely, your attention and your steerability. That is why appealing to companies to “do better” is futile: as long as profit is measured in minutes of your gaze, every design improvement will serve keeping you longer.'
    ) },
    { type: 'figure', id: 'sfSurveillanceFlow' },

    { type: 'h', text: L('حين تُضخّم الآلة الغضب', 'When the machine amplifies anger') },
    { type: 'p', text: L(
      'ولأن الخوارزميات تكافئ ما يُبقيك متفاعلاً، فإنها ترفع المحتوى المثير للغضب — فليس ثمّة ما يُبقي إبهامك متوقّفاً كإحساسٍ بالسخط. تبيّن أبحاث **مولي كروكِت (Molly Crockett)** أن التعبير عن السخط الأخلاقي يُكافأ إلكترونياً (إعجاباتٌ ومشاركات)، فيتعلّم الناس — دون وعي — أن الغضب هو ما «ينجح»، فيتضخّم ويزداد استقطابنا. لسنا أسوأ ممّا كنّا؛ الآلة فقط تُغذّي أكثر ما يشدّنا وتجوّع ما عداه. والأثر يتجاوز مزاجنا إلى سياساتنا: خطابٌ عامّ يُفرَز بحسب «التفاعل» لا الصدق يدفع المجتمعات كلّها نحو التطرّف والضجيج.',
      'Because the algorithms reward whatever keeps you engaged, they amplify content that provokes anger — nothing stops your thumb like a jolt of outrage. Research by **Molly Crockett** shows that expressing moral outrage is rewarded online (likes and shares), so people learn — without noticing — that anger is what “works,” and it swells, deepening our polarisation. We are not worse than we were; the machine simply feeds whatever grips us and starves everything else. And the effect reaches past our moods into our politics: public discourse ranked by “engagement” rather than truth pushes whole societies toward extremity and noise.'
    ) },
    { type: 'figure', id: 'sfOutrageAlgorithm' },
    { type: 'h4', text: L('كان يمكن تصميمها بطريقةٍ أخرى', 'It could be designed differently') },
    { type: 'p', text: L(
      'يشدّد هاريس وراسكِن على أن المشكلة ليست في وجود الهواتف والشبكات، بل في **الحافز** الذي صُمّمت عليه. التطبيق نفسه — لو كان نموذج ربحه اشتراكاً أو خدمةً عامّة بدل الإعلانات — لأمكنه أن يجمع إشعاراتك في دفعةٍ واحدة يومياً، وأن يتوقّف عند «نهايةٍ» طبيعية، وأن يسألك عمّا تريده أنت من وقتك ثم يساعدك عليه. التقنية ليست قدَراً؛ إنها تتبع من يدفع ثمنها — وهذا تحديداً ما يجعل تغيير النموذج هدفاً سياسياً لا مجرّد نصيحةٍ تقنية.',
      'Harris and Raskin stress that the problem is not the existence of phones and networks but the **incentive** they were designed around. The very same app — if its profit came from subscriptions or public funding instead of ads — could batch your notifications into one daily digest, stop at a natural “end,” ask what you want from your time and then help you get it. Technology is not destiny; it follows whoever pays for it — which is exactly why changing the model is a political goal, not just a tech tip.'
    ) },
    { type: 'callout', variant: 'note', title: L('صوتٌ معارض (للتوازن)', 'A dissenting voice (for balance)'), text: L(
      'ليس الجميع متّفقين. يجادل **نير إيال (Nir Eyal)** — مؤلّف «Hooked» — بأن بوسع الأفراد استعادة السيطرة بعادات وتصميمٍ ذاتي، وأن تحميل الشركات وحدها المسؤولية مبالغة. يعرض هاري هذا الرأي ثم يردّ بأن الاعتماد على ضبط النفس وحده هو جوهر «التفاؤل القاسي» في السبب التالي.',
      'Not everyone agrees. **Nir Eyal** — author of “Hooked” — argues that individuals can regain control through habits and self-design, and that blaming companies alone is overstated. Hari presents this view, then replies that relying on self-control alone is the essence of the “cruel optimism” of the next cause.'
    ) },
  ],
}

/* ===================== Cruel Optimism (Cause 7) ===================== */
export const cruelOptimism = {
  slug: 'cruel-optimism',
  icon: '🎈',
  title: L('التفاؤل القاسي', 'Cruel Optimism'),
  lead: L(
    'أن نقول لفردٍ يغرق: «تعلّم السباحة» — بينما تُلقى عليه أمواجٌ صُنِعت لإغراقه. النصائح الفردية بدايةٌ مهمّة لكنها لا تكفي.',
    'Telling a drowning person to “learn to swim” — while waves engineered to sink them keep crashing down. Individual advice is an important start, but not enough.'
  ),
  blocks: [
    { type: 'p', text: L(
      '**«التفاؤل القاسي» (Cruel Optimism)** مصطلحٌ يستعيره هاري من الباحثة **لورين برلانت (Lauren Berlant)**، ويعمل هكذا: خُذ مشكلةً ضخمة ذات جذورٍ عميقة، ثم قدّم لضحاياها حلّاً فردياً مبهجاً وبسيطاً. يبدو الأمر لطيفاً ومتفائلاً — وهنا قسوته بالضبط: حين يفشل الحلّ الصغير أمام المشكلة الكبيرة (وسيفشل غالباً)، لا يستنتج الشخص أن الحلّ لم يكن على قدر المشكلة، بل يستنتج أن **العيب فيه هو**. «أطفئ هاتفك»، «تأمّل»، «نظّم وقتك» — نصائح صحيحة، لكنها تلقي كامل العبء على كتفٍ واحد وتتجاهل الآلة الضخمة المصمَّمة لهزيمة إرادتك.',
      '**“Cruel optimism”** is a term Hari borrows from scholar **Lauren Berlant**, and it works like this: take a huge problem with deep roots, then offer its victims a cheerful, simple, individual solution. It sounds kind and upbeat — and that is exactly where the cruelty lies: when the small fix fails against the big problem (as it usually will), the person does not conclude the fix was too small for the problem; they conclude **the defect is in them**. “Switch off your phone,” “meditate,” “manage your time” — sound advice, but it drops the entire burden on one shoulder and ignores the vast machine designed to defeat your willpower.'
    ) },
    { type: 'p', text: L(
      'جرّب هاري الحلّ الفرديّ في أقصى صوره: قضى **ثلاثة أشهر** في بلدة بروفينستاون الساحلية بلا هاتفٍ ذكيّ ولا إنترنت إطلاقاً. وكانت النتائج مبهرة: عاد يقرأ الروايات ساعات، وكتب أكثر ممّا كتب في سنوات، وتباطأ إحساسه بالزمن، وشعر — بعبارته — بأنه أصغر بعشر سنوات. لكن ما إن عاد إلى العالم القديم حتى زحفت العادات القديمة عائدةً خلال أشهر. الدرس المزدوج: التغيير الفرديّ **يكشف ما هو ممكن** — وأن أدمغتنا لم «تنكسر» — لكنه لا يصمد وحده في بيئةٍ لم تتغيّر.',
      'Hari tested the individual solution in its most extreme form: he spent **three months** in the seaside town of Provincetown with no smartphone and no internet at all. The results were dazzling: he read novels for hours again, wrote more than he had in years, felt time itself slow down, and — in his words — felt ten years younger. But the moment he returned to the old world, the old habits crept back within months. The double lesson: individual change **reveals what is possible** — and that our brains are not “broken” — but it cannot hold on its own in an environment that has not changed.'
    ) },
    { type: 'image', src: './images/provincetown.jpg', wide: true,
      alt: L('بروفينستاون', 'Provincetown'),
      caption: L('بروفينستاون بولاية ماساتشوستس — حيث قضى هاري ثلاثة أشهر بلا إنترنت.',
                 'Provincetown, Massachusetts — where Hari spent three months without internet.') },
    { type: 'p', text: L(
      'ولهذا يسخر فيلسوف الانتباه **جيمس ويليامز (James Williams)** من ثقافة «الديتوكس الرقمي»: الانقطاع عن الشاشات عطلة نهاية أسبوعٍ ثم العودة إلى الآلة نفسها **«ليس حلّاً، للسبب نفسه الذي يجعل ارتداء قناع غازٍ يومين في الأسبوع ليس حلّاً لتلوّث الهواء»**. قد يحميك القناع لحظةً، لكنه يترك المصنع يدخّن — ويوهم الجميع بأن مسؤولية الهواء النقيّ فردية.',
      'That is why the philosopher of attention **James Williams** mocks the culture of the “digital detox”: unplugging for a weekend and then returning to the same machine **“is not the answer, for the same reason that wearing a gas mask for two days a week outside isn’t the answer to pollution.”** The mask may shield you for a moment, but it leaves the factory smoking — and convinces everyone that clean air is a personal responsibility.'
    ) },
    { type: 'callout', variant: 'key', title: L('فكرة الالتزام المسبَق', 'The idea of pre-commitment'), text: L(
      'مع ذلك، ليست النصائح الفردية بلا قيمة — وأنجعها **الالتزام المسبَق (pre-commitment)**: أن تقيّد خياراتك المستقبلية سلفاً حين تكون إرادتك قويّة. مثالٌ يذكره الكتاب: صندوقٌ مؤقّت (kSafe) تضع فيه هاتفك ولا يُفتح إلا بعد ساعة. الفكرة قديمة قِدم أوديسيوس الذي ربط نفسه بالصاري قبل مرور حوريّات الإغراء: لا تعتمد على «قوّة الإرادة» في لحظة الضعف، بل هندِس البيئة لصالحك قبل أن تأتي اللحظة.',
      'Individual tools are not worthless, though — and the most effective is **pre-commitment**: binding your future choices in advance, while your willpower is strong. An example from the book: a timed lockbox (kSafe) you put your phone inside until an hour has passed. The idea is as old as Odysseus tying himself to the mast before sailing past the Sirens: do not rely on “willpower” in the moment of weakness; engineer the environment in your favour before the moment arrives.'
    ) },
    { type: 'p', text: L(
      'ثم يرفع ويليامز السؤال إلى مستواه الحقيقي: الانتباه ليس رفاهيةً شخصية؛ إنه **الوسيلة التي نفعل بها كلّ شيءٍ آخر**. إن لم نستطع توجيه انتباهنا إلى ما يهمّنا، فلن نستطيع حلّ مشكلاتنا الفردية ولا الجماعية — من صحّتنا إلى مناخنا إلى ديمقراطيّتنا. ولهذا يصف تحرير الانتباه البشريّ بأنه قد يكون **النضال الأخلاقي والسياسي المميِّز لعصرنا**. وهذه هي الجملة التي تنقل الكتاب من النصيحة إلى الحركة — كما سيتّضح في «تمرّد الانتباه».',
      'Then Williams raises the question to its true level: attention is not a personal luxury; it is **the means by which we do everything else**. If we cannot direct our attention to what matters, we cannot solve our problems, individual or collective — from our health to our climate to our democracy. That is why he calls the liberation of human attention possibly **the defining moral and political struggle of our time**. And that is the sentence that moves the book from advice to movement — as “Attention Rebellion” will show.'
    ) },
  ],
}
