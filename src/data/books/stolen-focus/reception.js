/*
 * "The book under scrutiny" — critical reception of Stolen Focus, plus the
 * club's own verdict.
 *
 * This section touches the author's professional record, so every statement is
 * limited to what is publicly documented and admitted, is paired with what he
 * did in response, and links its sources. Keep it that way: the aim is a club
 * that reads critically, not a character attack.
 */
const L = (ar, en) => ({ ar, en })

/* The club's own opinion — edit freely, this is the club's voice, not a fact. */
export const verdict = {
  rating: 3.5,
  text: L(
    'أفضل ما في الكتاب أنه ينقل السؤال من «ما خطبي؟» إلى «ما خطب البيئة من حولي؟» — وهذه نقلةٌ تستحقّ القراءة وحدها. وأضعف ما فيه أن الأدلّة لا تصمد دائماً بقوّة العبارة: قصصٌ آسرة ومقابلاتٌ كثيرة، لكن بعض الدراسات المستشهد بها أخفّ ممّا يوحي به السياق.',
    'The best thing about this book is that it moves the question from “what’s wrong with me?” to “what’s wrong with the environment around me?” — that shift alone is worth the read. Its weakness is that the evidence doesn’t always carry the weight of the prose: gripping stories and many interviews, but some of the studies cited are lighter than the context implies.'
  ),
  readIf: L(
    'تشعر أن تركيزك يتفتّت وتريد إطاراً يفسّر السبب دون أن يلومك عليه.',
    'You feel your focus fragmenting and want a frame that explains why without blaming you for it.'
  ),
  caveat: L(
    'فصول فرط الحركة وتشتّت الانتباه (ADHD) تحديداً — ولمن يهمّه الأمر شخصياً، راجع «الكتاب في الميزان» أولاً.',
    'The ADHD chapters in particular — if that touches you personally, read “The book under scrutiny” first.'
  ),
  reception: 'reception',
}

export const reception = {
  slug: 'reception',
  icon: '⚖️',
  title: L('الكتاب في الميزان', 'The book under scrutiny'),
  lead: L(
    'كتابٌ عن الانتباه يستحقّ أن نعطيه انتباهاً ناقداً. ما الذي أخذه النقّاد على «تركيزنا المسلوب»؟ وما الذي ردّ به المؤلّف؟',
    'A book about attention deserves our critical attention. What did critics hold against “Stolen Focus,” and how did the author respond?'
  ),
  blocks: [
    { type: 'p', text: L(
      'لقي الكتاب رواجاً واسعاً وثناءً كثيراً — ولقي في الوقت نفسه نقداً جادّاً من علماء نفسٍ وصحفيّين. النقد يدور حول ثلاثة محاور: **قوّة الأدلّة**، و**فصول فرط الحركة وتشتّت الانتباه**، و**سجلّ المؤلّف المهنيّ**. ونعرضها هنا كما وردت، مع ما فعله هاري في المقابل.',
      'The book was widely read and widely praised — and at the same time drew serious criticism from psychologists and journalists. It clusters around three things: **the strength of the evidence**, **the ADHD chapters**, and **the author’s professional record**. Here they are as stated, together with what Hari did in response.'
    ) },

    { type: 'debate',
      topic: L('قوّة الأدلّة', 'The strength of the evidence'),
      claim: L(
        'يستند الكتاب إلى أكثر من **٢٥٠ مقابلة** مع خبراء، ويعرض اثني عشر سبباً خارجياً لانهيار التركيز.',
        'The book rests on more than **250 interviews** with experts and lays out twelve external causes for the collapse of focus.'
      ),
      critique: L(
        'يرى عالم النفس **ستيوارت ريتشي (Stuart Ritchie)** أن الكتاب «ثقيلٌ بالحكايات الشخصية وخفيفٌ بشدّة في الأدلّة الصلبة»، وأن بعض الدراسات المستشهد بها — خصوصاً حول تزايد التشتّت وإدمان الهواتف — تبدو هشّةً عند الفحص، وأن الاستنتاجات أكبر ممّا تحتمله البيانات.',
        'The psychologist **Stuart Ritchie** argues the book is “heavy on personal anecdotage but painfully light on hard evidence,” that several of the studies cited — particularly on rising distraction and phone addiction — look flimsy on inspection, and that the conclusions run ahead of the data.'
      ),
      critic: L('ستيوارت ريتشي، مجلّة أنهيرد، ٢٠٢٢', 'Stuart Ritchie, UnHerd, 2022'),
    },

    { type: 'debate',
      topic: L('فصول فرط الحركة وتشتّت الانتباه (ADHD)', 'The ADHD chapters'),
      claim: L(
        'يتشكّك الكتاب في تصاعد تشخيص فرط الحركة وتشتّت الانتباه، ويقترح أن كثيراً منه استجابةٌ لبيئةٍ مريضة لا لخللٍ في الدماغ.',
        'The book is sceptical of the rising rate of ADHD diagnosis, suggesting much of it is a response to a sick environment rather than a disorder in the brain.'
      ),
      critique: L(
        'يأخذ عليه النقّاد أنه لا يوازن ذلك بالكمّ الكبير من الأبحاث المحكَّمة التي تعامل الاضطراب بوصفه اضطراباً عصبياً نمائياً حقيقياً، وأنه يمرّ سريعاً على أدلّةٍ تشير إلى أن العلاج الدوائي المناسب يُحسّن حياة المصابين — بل ويرتبط بانخفاض الوفيات لديهم. وهذه نقطةٌ حسّاسة عملياً: قد يقرأها مصابٌ فيتوقّف عن علاجه.',
        'Critics fault it for not weighing that against the substantial peer-reviewed literature treating ADHD as a genuine neurodevelopmental condition, and for moving quickly past evidence that appropriate medication improves patients’ lives — and is associated with lower all-cause mortality among them. This one has practical stakes: someone with ADHD could read it and stop their treatment.'
      ),
    },

    { type: 'debate',
      topic: L('سجلّ المؤلّف المهنيّ', 'The author’s professional record'),
      claim: L(
        'يوهان هاري صحفيٌّ استقصائيّ معروف، والكتاب مبنيٌّ بالكامل على مقابلاتٍ أجراها بنفسه.',
        'Johann Hari is a well-known investigative journalist, and the book is built entirely on interviews he conducted himself.'
      ),
      critique: L(
        'في عام ٢٠١١، وأثناء عمله في صحيفة **الإندبندنت**، اعترف هاري بـ«تجميل الاقتباسات/الانتحال» في مقابلاتٍ نشرها — إذ أدرج عباراتٍ سبق أن كتبها من حاوَرَهم في مواضع أخرى وكأنها قيلت له — وباستخدام اسمٍ مستعار للهجوم على منتقديه على الإنترنت. أعاد **جائزة أورويل**، وأخذ إجازةً غير مدفوعة أربعة أشهر، والتحق بدورةٍ في الصحافة.',
        'In 2011, while at **The Independent**, Hari admitted to “embellishment of quotations/plagiarism” in published interviews — inserting lines his subjects had written elsewhere as though they had been said to him — and to using a pseudonym to attack his critics online. He returned the **Orwell Prize**, took four months’ unpaid leave, and enrolled in a journalism course.'
      ),
      response: L(
        'ولهذا فعل هاري في «تركيزنا المسلوب» ما لا يفعله كتّابٌ كثيرون: نشر **التسجيلات الصوتية الكاملة لمقابلاته** على موقعه ليتحقّق منها أيّ قارئ، وشرح كيف وازن بين آراء مَن حاورهم. خطوةٌ تستحقّ التقدير — وإن قال بعض النقّاد إن الاستماع إلى التسجيلات نفسها يكشف مواضع فَهِم فيها كلام محاوَريه على غير وجهه.',
        'Which is why, with “Stolen Focus,” Hari did something few authors do: he published **the full audio recordings of his interviews** on his website so any reader can check them, and set out how he weighed his interviewees’ views. That deserves credit — though some critics say listening to those very recordings reveals places where he construed what his subjects said too freely.'
      ),
      critic: L('بي بي سي وواشنطن بوست، ٢٠١١؛ أنهيرد، ٢٠٢٢', 'BBC and Washington Post, 2011; UnHerd, 2022'),
    },

    { type: 'callout', variant: 'key', title: L('كيف نقرأه إذن؟', 'So how should we read it?'), text: L(
      'الفكرة المركزية للكتاب — أن الانتباه تشكّله البيئة لا الإرادة وحدها — ليست موضع خلافٍ جوهريّ؛ كثيرٌ من الباحثين يوافقون عليها. الخلاف على **مقدار ما تحتمله الأدلّة** في كلّ سببٍ من الاثني عشر. أفضل طريقةٍ لقراءته: خذ الإطار، وتعامل مع كلّ دراسةٍ مفردة بوصفها بداية بحثٍ لا نهايته. ولعلّ أطرف ما في الأمر أن هذا بالضبط ما يطالبنا به الكتاب: انتباهٌ عميقٌ بطيء، لا تصديقٌ سريع.',
      'The book’s central idea — that attention is shaped by environment, not willpower alone — is not seriously contested; many researchers agree with it. The argument is about **how much weight the evidence bears** for each of the twelve causes. The best way to read it: take the frame, and treat each individual study as the start of an inquiry rather than the end of one. There is a certain irony there — that is precisely what the book asks of us: slow, deep attention rather than quick belief.'
    ) },

    { type: 'sources', title: L('اقرأ بنفسك', 'Read it yourself'), items: [
      { label: L('نقد ستيوارت ريتشي للكتاب', 'Stuart Ritchie’s critique of the book'),
        publisher: L('أنهيرد، ٢٠٢٢', 'UnHerd, 2022'), url: 'https://unherd.com/2022/01/johann-haris-stolen-ideas/' },
      { label: L('«قليلون جداً ينتبهون إلى مشكلات كتاب هاري الجديد»', '“Too few of us are paying attention to the problems with Johann Hari’s new book”'),
        publisher: L('الآيريش تايمز، ٢٠٢٢', 'The Irish Times, 2022'),
        url: 'https://www.irishtimes.com/culture/too-few-of-us-are-paying-attention-to-the-problems-with-johann-hari-s-new-book-1.4775651' },
      { label: L('هاري يُعيد جائزة أورويل', 'Hari returns the Orwell Prize'),
        publisher: L('بي بي سي، ٢٠١١', 'BBC News, 2011'), url: 'https://www.bbc.co.uk/news/uk-14924182' },
    ] },
  ],
}
