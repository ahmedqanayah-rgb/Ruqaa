/* ============================================================================
   «خرافة أم حقيقة؟» — the game data for Stolen Focus.
   ----------------------------------------------------------------------------
   Replaces the old «مغالطات شائعة» (6 claim/reply cards) and «حقائق صادمة»
   (12 callouts). See the header of the Why We Sleep file for the two rules that
   keep the deck unguessable — flat third-person statements, and neither half
   distinguishable by tone or length.

   ONE ITEM CARRIES A JOB THE DELETED «الكتاب في الميزان» SECTION USED TO DO.
   The 23-minute figure is the book's most quoted number and it is **wrong twice
   over**: the book credits Michael Posner when it is Gloria Mark's, and it was
   never published in a peer-reviewed paper. It is a myth item here, with Mark's
   actual paper linked, which is a better home for it than a criticism page —
   the reader meets the claim, commits to it, and is corrected. **Don't turn it
   back into a fact anywhere on the site.**
   ========================================================================== */

const L = (ar, en) => ({ ar, en })
const myth = (statement, explain, source) => ({ statement, isMyth: true, explain, source })
const fact = (statement, explain, source) => ({ statement, isMyth: false, explain, source })

export const mythOrFact = [
  /* ---------------------------- the myths ---------------------------- */
  myth(
    L('صار انتباه الإنسان أقصر من انتباه سمكة الزينة.',
      'Human attention is now shorter than a goldfish’s.'),
    L('إشاعةٌ حضرية لا أساس علميّ لها؛ لا يوجد قياسٌ موثوق لـ«مدى انتباه» السمكة أصلاً. والمبالغة تصرف الانتباه عن الحقيقة الأهمّ: انتباهنا **يُهاجَم من الخارج**، لا أنه انكمش بيولوجياً.',
      'An urban legend with no scientific basis — there is no reliable measure of a goldfish’s “attention span” to begin with. And the exaggeration distracts from the point that matters: our attention is **under attack from outside**, not biologically shrunken.')
  ),
  myth(
    L('بعض الناس يُتقنون تعدّد المهامّ المعرفية فعلاً.',
      'Some people are genuinely good at cognitive multitasking.'),
    L('ما من دماغٍ يركّز على مهمّتين معرفيتين معاً؛ أنت تبدّل بسرعة، وكلّ تبديلةٍ تترك **«بقايا انتباه»** تبطئك وتزيد أخطاءك. ومن يظنّون أنفسهم الأفضل في تعدّد المهامّ هم **غالباً الأسوأ أداءً** فيها.',
      'No brain attends to two cognitive tasks at once; you switch fast, and each switch leaves an **“attention residue”** that slows you and multiplies errors. Those who rate themselves best at multitasking usually **perform worst** at it.')
  ),
  myth(
    L('من لديه إرادةٌ كافية يستطيع أن يركّز.',
      'Anyone with enough willpower can focus.'),
    L('هذا جوهر **«التفاؤل القاسي»**: تحميل الفرد وحده عبء مشكلةٍ صمّمتها آلةٌ ضخمة لهزيمة إرادته. النصائح الفردية تساعد، لكنّ لومَ الإرادة وحدها يعفي مصمّمي التشتيت من المسؤولية.',
      'This is the core of **“cruel optimism”**: loading onto the individual a problem engineered by an industry built to defeat their willpower. Individual habits help, but blaming willpower alone lets the designers of distraction off the hook.')
  ),
  myth(
    L('التقنية محايدة، والمهمّ هو كيف تستخدمها.',
      'Technology is neutral — what matters is how you use it.'),
    L('التطبيقات ليست محايدة؛ صُمّمت بعناية — بمكافآتٍ متغيّرة وتمريرٍ لا ينتهي — لأسر انتباهك أطول وقتٍ ممكن. وحين يُبنى نموذج الربح على استنزاف انتباهك، فالحياد وهم.',
      'Apps are not neutral. They are carefully built — variable rewards, infinite scroll — to hold your attention as long as possible. When the business model runs on draining your attention, neutrality is an illusion.')
  ),
  myth(
    L('فرط الحركة وتشتّت الانتباه سببه جيناتٌ بحتة.',
      'ADHD is purely genetic.'),
    L('البيولوجيا جزءٌ من الصورة، لكنّ البيئة تتفاعل معها بقوّة: التوتّر والصدمة وقلّة النوم وسوء الغذاء كلّها تؤثّر في الانتباه. **ومع ذلك** — الاضطراب حقيقيّ، والعلاج المناسب يحسّن حياة المصابين؛ راجع «فرط الحركة وتشتّت الانتباه» قبل أن تبني قراراً على هذا.',
      'Biology is part of the picture, but environment interacts with it strongly: stress, trauma, poor sleep and poor diet all shape attention. **Even so** — the condition is real and appropriate treatment improves patients’ lives. Read the ADHD section before acting on this.')
  ),
  myth(
    L('الأطفال أكثر أماناً في البيت أمام الشاشات.',
      'Children are safer at home in front of screens.'),
    L('المبالغة في الخوف من الخارج تسلب الأطفال **اللعب الحرّ** الذي يبني تركيزهم وضبطهم لأنفسهم. الأمان الحقيقيّ ليس في حبسهم أمام الشاشات، بل في منحهم استقلالاً مسؤولاً.',
      'Outsized fear of the outdoors costs children the **free play** that builds their focus and self-control. Real safety is not confinement in front of a screen; it is supervised independence.')
  ),
  myth(
    L('ثبت علمياً أن استعادة التركيز بعد كلّ مقاطعة تستغرق ٢٣ دقيقة، وهو رقم مايكل بوزنر.',
      'It is established science that regaining focus after an interruption takes 23 minutes — Michael Posner’s figure.'),
    L('**أشهر أرقام الكتاب، وهو خطأ مزدوج.** الرقم ليس لبوزنر بل لـ**غلوريا مارك**، و**لم يُنشر في بحثٍ محكَّم قطّ** — إنما ورد في مقابلاتٍ صحافية. ورقتها المحكَّمة نفسها لا تقيس ذلك، بل وجدت أن العمل المُقاطَع يُنجَز **أسرع** لكن بتوتّرٍ وضغطٍ أعلى. تقديراتٌ أخرى تضع الرقم بين ١١ و١٦ دقيقة.',
      '**The book’s most quoted number, and it is wrong twice.** The figure is not Posner’s but **Gloria Mark’s**, and it was **never published in a peer-reviewed paper** — only in press interviews. Her actual paper measures something else, finding interrupted work is completed **faster** but at a cost in stress and effort. Other estimates put it between 11 and 16 minutes.'),
    { label: L('«كلفة العمل المُقاطَع» — ورقة غلوريا مارك نفسها (CHI 2008)',
               '“The Cost of Interrupted Work” — Gloria Mark’s own paper (CHI 2008)'),
      href: 'https://ics.uci.edu/~gmark/chi08-mark.pdf' }
  ),

  /* ---------------------------- the facts ---------------------------- */
  fact(
    L('الزمن الوسيط الذي يركّز فيه طالبٌ جامعيّ على شيءٍ واحد ١٩ ثانية فقط.',
      'The median time a college student spends focused on one thing is 19 seconds.'),
    L('رُصد ذلك ببرنامج تتبّعٍ على أجهزتهم: **١٩ ثانية**، وتبديل المهمّة مرّةً كلّ **٦٥ ثانية**.',
      'Measured with tracking software on their own machines: **19 seconds**, and a task switch every **65 seconds**.')
  ),
  fact(
    L('يلمس الأمريكيّ المتوسّط هاتفه أكثر من ٢٦٠٠ مرّة كلّ أربعٍ وعشرين ساعة.',
      'The average American touches their phone more than 2,600 times every 24 hours.'),
    L('**٢٬٦١٧ لمسة**، ونحو **٣ ساعات و١٥ دقيقة** من الاستخدام يومياً. اللمسة ليست قراراً — إنها عادةٌ حرّكها تصميم.',
      '**2,617 touches**, and about **3 hours 15 minutes** of use a day. A touch is not a decision — it is a habit that design installed.')
  ),
  fact(
    L('العمل وسط مقاطعات البريد والمكالمات يهبط بالأداء الذهني بما يعادل عشر نقاط ذكاء.',
      'Working amid email and phone interruptions drops cognitive performance by the equivalent of ten IQ points.'),
    L('في تجربةٍ أُجريت لصالح شركة **HP** — وهو **ضِعف** الأثر المقيس لتدخين الحشيش.',
      'From a study run for **HP** — and that is **double** the measured effect of smoking cannabis.')
  ),
  fact(
    L('ما يستهلكه الإنسان العاديّ من المعلومات يومياً ارتفع من ٤٠ صحيفة إلى ١٧٤ صحيفة في نحو عشرين سنة.',
      'The information an average person consumes daily rose from 40 newspapers’ worth to 174 in about twenty years.'),
    L('**٤٠ صحيفة** عام ١٩٨٦، و**١٧٤ صحيفة** بحلول ٢٠٠٧. الانتباه لم يتغيّر — الكمّ المطلوب منه تغيّر أربع مرّات.',
      '**40** in 1986, **174** by 2007. Attention did not change; the volume demanded of it more than quadrupled.')
  ),
  fact(
    L('البقاء مستيقظاً نحو تسع عشرة ساعة يجعل أداءك المعرفيّ مكافئاً لمن تجاوز حدّ السُّكر القانوني.',
      'Staying awake about nineteen hours leaves your cognition equivalent to someone over the legal drink-drive limit.'),
    L('وملايين يبدؤون أعمالهم الدقيقة كلّ يومٍ بعقولٍ «ثملة» بالإرهاق — ثم يلومون إرادتهم.',
      'And millions begin demanding work every day with minds “drunk” on exhaustion — then blame their willpower.')
  ),
  fact(
    L('مزارعو قصب السكّر أنفسهم سجّلوا قبل الحصاد أداءً أدنى بنحو ثلاث عشرة نقطة ذكاء منه بعد قبض ثمن المحصول.',
      'The very same sugarcane farmers scored about thirteen IQ points lower before harvest than after being paid.'),
    L('المزارع نفسه، قبل قبض المال وبعده — **الفقر ضريبةٌ على الانتباه**، لا فشلٌ فيه.',
      'The same farmer, before and after the money arrives — **poverty is a tax on attention**, not a failure of it.')
  ),
  fact(
    L('هبط متوسّط ما يقرؤه الأمريكيّ من الكتب إلى نحو سبع عشرة دقيقة في اليوم.',
      'The average American’s book reading has fallen to about seventeen minutes a day.'),
    L('**١٧ دقيقة** — مقابل ساعاتٍ على الشاشات. والقراءة العميقة مهارةٌ تضمر إن لم تُمارَس.',
      '**17 minutes** — against hours of screens. Deep reading is a skill that atrophies unused.')
  ),
  fact(
    L('مدّة بقاء الموضوع الرائج في قائمة الأكثر تداولاً هبطت من ١٧٫٥ ساعة إلى ١١٫٩ ساعة في ثلاث سنوات.',
      'How long a trending topic stays in the top 50 fell from 17.5 hours to 11.9 in three years.'),
    L('من **١٧٫٥ ساعة** (٢٠١٣) إلى **١١٫٩ ساعة** (٢٠١٦). نتشتّت أسرع — **جماعةً**، لا فرادى.',
      'From **17.5 hours** (2013) to **11.9** (2016). We are getting distracted faster — **collectively**, not individually.')
  ),
  fact(
    L('في بعض ولايات جنوب الولايات المتحدة يُشخَّص نحو ٣٠٪ من الفتيان بفرط الحركة قبل الثامنة عشرة.',
      'In some southern US states, about 30% of boys are diagnosed with ADHD before turning eighteen.'),
    L('الرقم يتفاوت تفاوتاً حادّاً بين ولايةٍ وأخرى — وهو ما يدفع النقاش عن أثر البيئة والمعايير في التشخيص، لا عن حقيقة الاضطراب.',
      'The rate varies sharply between states — which is what drives the debate about environment and diagnostic thresholds, not about whether the condition is real.')
  ),
  fact(
    L('بحلول عام ٢٠٠٣ كان ١٠٪ فقط من أطفال الولايات المتحدة يلعبون بحرّيةٍ في الخارج بانتظام.',
      'By 2003, only 10% of US children still played freely outdoors on a regular basis.'),
    L('جيلٌ واحدٌ فقط، وانتقلت الطفولة خلف الأبواب المغلقة وإلى الشاشات — وهو أوّل ما يذكره الكتاب عن انتباه الأطفال.',
      'A single generation, and childhood moved behind closed doors and onto screens — the book’s opening move on children’s attention.')
  ),
  fact(
    L('تحوّل مايكروسوفت في اليابان إلى أسبوع عملٍ من أربعة أيّام رفع الإنتاجية ٤٠٪.',
      'Microsoft Japan’s move to a four-day week raised productivity by 40%.'),
    L('عام ٢٠١٩ — ودلالته أن **الإنهاك قابلٌ للعكس**: الانتباه يعود إذا أُعطي الشرط الذي يحتاجه.',
      '2019 — and the point is that **exhaustion is reversible**: attention returns when given the conditions it needs.')
  ),
]
