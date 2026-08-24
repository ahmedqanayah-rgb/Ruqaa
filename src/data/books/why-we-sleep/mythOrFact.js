/* ============================================================================
   «خرافة أم حقيقة؟» — the game data for Why We Sleep.
   ----------------------------------------------------------------------------
   This file REPLACES two sections that used to be separate: «المغالطات الشائعة»
   (13 claim/reply cards) and «الحقائق الصادمة والغريبة» (four bulleted lists).
   Both told the reader the answer in the same breath as the claim. Mixed into
   one deck and asked as a question, the same content makes you commit first —
   which is the only way a myth you already believe gets dislodged.

   TWO RULES FOR ADDING ITEMS, and the game stops working if either is broken:

   1. **Every statement is a flat third-person assertion.** The old myths were
      first-person and in «guillemets» («أستطيع تعويض نومي…») while the facts
      were third-person statistics — so the punctuation alone gave the answer
      away before the reader had read the sentence. Never restore the quotes.
   2. **Neither half may be guessable by length or tone.** Don't make the myths
      the short ones and the facts the ones with numbers in them.

   `explain` is the reveal, so it carries the *reason*, not a restatement.
   ========================================================================== */

const L = (ar, en) => ({ ar, en })
const myth = (statement, explain) => ({ statement, isMyth: true, explain })
const fact = (statement, explain) => ({ statement, isMyth: false, explain })

export const mythOrFact = [
  /* ---------------------------- the myths ---------------------------- */
  myth(
    L('النوم الفائت يمكن تعويضه بالكامل في عطلة نهاية الأسبوع.',
      'Lost sleep can be fully repaid over the weekend.'),
    L('النوم **ليس بنكاً**: لا تدّخره ولا تسترجع كامل ما فاتك من نومٍ عميق. بعض الضرر **لا يُعوَّض**.',
      'Sleep is **not a bank**. You cannot save it up, and you never recover all the deep sleep you missed. Some of the damage is **permanent**.')
  ),
  myth(
    L('نسبةٌ معتبرة من الناس يكفيهم أربع أو خمس ساعاتٍ من النوم.',
      'A meaningful share of people genuinely need only four or five hours.'),
    L('طفرة **DEC2** نادرةٌ جداً (أقلّ من ١٪)، ومعظم من يظنّون أنفسهم منها **مخطئون**: أداؤهم متدهور، لكنهم فقدوا القدرة على الحكم عليه.',
      'The **DEC2** mutation is vanishingly rare (under 1%), and most people who believe they have it are **wrong** — their performance is degraded, and they have lost the ability to judge it.')
  ),
  myth(
    L('القبائل التي تعيش كما عاش القدماء تنام أقلّ من سبع ساعات، فالثماني ساعات أسطورةٌ حديثة.',
      'Pre-industrial tribes sleep under seven hours, so the eight-hour figure is a modern invention.'),
    L('تلك القبائل تمنح نفسها **فرصة نومٍ من ٧ إلى ٨٫٥ ساعات**؛ ومتوسّط أعمارها ٥٨ سنة، وسبب وفاتها الأوّل العدوى — أي ضعفٌ مناعيّ.',
      'Those groups give themselves a **7 to 8.5-hour sleep opportunity**. Their average life expectancy is 58, and their leading cause of death is infection — i.e. weakened immunity.')
  ),
  myth(
    L('كأسٌ من الكحول قبل النوم يحسّن النوم.',
      'A drink before bed improves sleep.'),
    L('الكحول **مهدّئ لا مُنوّم**: يجزّئ نومك بصحواتٍ لا تشعر بها و**يكبت نوم حركة العين السريعة** — فتستيقظ أقلّ انتعاشاً.',
      'Alcohol is a **sedative, not a sleep aid**. It fragments the night with awakenings you never notice and **suppresses REM**, so you wake less restored.')
  ),
  myth(
    L('الأقراص المنوّمة تنتج نوماً طبيعياً.',
      'Sleeping pills produce natural sleep.'),
    L('الأقراص تمنح **تخديراً لا نوماً**، ومستخدموها أكثر عرضةً للوفاة بنحو **٤٫٦ مرّة**. البديل الأفضل هو **العلاج السلوكي المعرفي للأرق (CBT-I)**.',
      'Pills deliver **sedation, not sleep**, and their users die at roughly **4.6 times** the rate. The better option is **cognitive behavioural therapy for insomnia (CBT-I)**.')
  ),
  myth(
    L('من لا يشعر بأثر القهوة مساءً فنومه غير متأثّرٍ بها.',
      'If evening coffee does not keep you awake, it is not affecting your sleep.'),
    L('حتى لو نمت، الكافيين (عمر النصف نحو ٥–٦ ساعات) **يقلّل عمق نومك** ويحرمك جزءاً من النوم العميق — والشعور ليس مقياساً.',
      'Even if you fall asleep, caffeine (half-life around 5–6 hours) **reduces the depth** of it and costs you part of your deep sleep. How you feel is not the measure.')
  ),
  myth(
    L('النوم حالة سكونٍ يتوقّف فيها نشاط الدماغ.',
      'Sleep is a state of rest in which the brain shuts down.'),
    L('النوم حالةٌ **نشطة ومنظّمة**: موجاتٌ متزامنة تنقل الذاكرة وتنظّف الدماغ في النوم العميق، ودماغٌ شديد النشاط في نوم حركة العين السريعة.',
      'Sleep is an **active, orchestrated** state: synchronised waves ferry memory and flush the brain during deep sleep, and the brain is intensely busy during REM.')
  ),
  myth(
    L('السير أثناء النوم هو تمثيلٌ للأحلام.',
      'Sleepwalking is a person acting out a dream.'),
    L('السير النومي يحدث في **النوم العميق (NREM)**، حيث لا أحلامَ سرديّة. تمثيل الأحلام اضطرابٌ مختلف تماماً (**RBD**) ويحدث في REM.',
      'Sleepwalking happens in **deep NREM sleep**, where there is no narrative dreaming. Acting out dreams is an entirely different disorder (**RBD**) and occurs in REM.')
  ),
  myth(
    L('السهر ليلةً كاملة للمذاكرة أفضل من النوم.',
      'Pulling an all-nighter to study beats sleeping.'),
    L('السهر **يخذلك مرّتين**: قبله عجزٌ يبلغ **٤٠٪** في قدرة الدماغ على الترميز، وبعده لا تثبيتَ لما حفظت. والمحروم أقلّ إبداعاً وأكثر خطأً.',
      'It fails you **twice**: beforehand, a **40%** deficit in the brain’s ability to encode; afterwards, no consolidation of what you did learn. The sleep-deprived are also less creative and more error-prone.')
  ),
  myth(
    L('قلّة النوم علامة قوّةٍ وتفانٍ في العمل.',
      'Running on little sleep is a sign of strength and commitment.'),
    L('قلّة النوم **عاملُ خطرٍ** لا بطولة — على الصحّة والأداء والحكم الأخلاقي. استعِد نومك **بلا خجلٍ ولا وصمة كسل**.',
      'Short sleep is a **risk factor**, not a badge — for health, performance and moral judgement alike. Reclaim it **without embarrassment**.')
  ),
  myth(
    L('المواعيد المدرسية الباكرة تعلّم المراهقين الانضباط.',
      'Early school start times teach teenagers discipline.'),
    L('سهر المراهق **إزاحةٌ عصبية حقيقية** تبلغ نحو ثلاث ساعات، لا كسل. المواعيد الباكرة تضرّ تحصيله وسلامته وصحّته النفسية.',
      'A teenager’s late body clock is a real **neurological shift** of about three hours, not laziness. Early starts damage their grades, their safety and their mental health.')
  ),
  myth(
    L('القيلولة النهارية علامة كسل.',
      'A daytime nap is a sign of laziness.'),
    L('القيلولة القصيرة **تجدّد القدرة على التعلّم وترفع الأداء**؛ قيلولةٌ من ٢٦ دقيقة رفعت أداء طيّاري ناسا **٣٤٪**.',
      'A short nap **restores the capacity to learn and lifts performance** — a 26-minute nap raised NASA pilots’ performance by **34%**.')
  ),
  myth(
    L('كبار السنّ يحتاجون نوماً أقلّ بطبيعتهم.',
      'Older people naturally need less sleep.'),
    L('كبار السنّ **لا يحتاجون أقلّ، بل يعجزون عن الحصول عليه**؛ وتدهور نومهم مرتبطٌ بالذاكرة وألزهايمر — وكثيرٌ منه قابلٌ للتدخّل.',
      'They do **not need less — they are less able to get it**. That decline is tied to memory and Alzheimer’s, and much of it is treatable.')
  ),

  /* ---------------------------- the facts ---------------------------- */
  fact(
    L('بعد ١٩ إلى ٢٤ ساعة بلا نوم يصبح أداؤك مكافئاً لتجاوز الحدّ القانوني للسُّكْر.',
      'After 19 to 24 hours awake, your performance matches being over the legal drink-drive limit.'),
    L('ولا يلزم حرمانٌ كامل: أسبوعٌ من نومٍ منقوص يوصلك إلى الأثر نفسه تدريجياً وأنت تظنّ نفسك بخير.',
      'And it takes no all-nighter: a week of short nights gets you there gradually, while you believe you are fine.')
  ),
  fact(
    L('القيادة تحت النعاس تقتل أكثر من الكحول والمخدّرات معاً.',
      'Drowsy driving kills more people than alcohol and drugs combined.'),
    L('السبب **النُّويمات الدقيقة (Microsleeps)**: انقطاعٌ للوعي ثانيةً أو اثنتين، يكفي أن تعبر فيه سيّارةٌ مسرعة عرضَ الطريق.',
      'The mechanism is **microsleeps** — a one or two-second lapse of consciousness, long enough for a fast car to cross a whole lane.')
  ),
  fact(
    L('هناك مرضٌ وراثيّ يوقف النوم كلّياً فيموت المصاب خلال نحو عشرة أشهر.',
      'A hereditary disease exists that stops sleep entirely, killing the patient within about ten months.'),
    L('**الأرق العائلي القاتل (Fatal Familial Insomnia)** — ولا علاجَ له. إنه أوضح دليلٍ على أن النوم ليس رفاهية.',
      '**Fatal Familial Insomnia** — and there is no cure. It is the plainest evidence that sleep is not optional.')
  ),
  fact(
    L('خسارة ساعةٍ واحدة عند تغيير الساعة صيفاً ترفع معدّل النوبات القلبية.',
      'Losing a single hour to the spring clock change raises the heart-attack rate.'),
    L('وربحُها في الخريف يخفضها — تجربةٌ طبيعية على مئات الملايين، بساعةٍ واحدة من النوم.',
      'And gaining it back in autumn lowers it — a natural experiment on hundreds of millions of people, over one hour of sleep.')
  ),
  fact(
    L('كارثتا تشيرنوبل وإكسون فالديز يعود جذرهما إلى قلّة نومٍ عند العاملين في ساعات الفجر.',
      'Both Chernobyl and the Exxon Valdez trace back to sleep-deprived workers in the small hours.'),
    L('القرارات البشرية في أدنى نقطة من الساعة البيولوجية هي الحلقة الأضعف في كلّ نظامٍ يعمل ليلاً.',
      'Human decisions at the lowest point of the body clock are the weakest link in every system that runs at night.')
  ),
  fact(
    L('ليلةٌ واحدة من نوم أربع ساعات تُسقط الخلايا القاتلة الطبيعية في جسدك نحو ٧٠٪.',
      'A single four-hour night drops your natural killer cells by around 70%.'),
    L('ليلةٌ واحدة. وهي الخلايا التي تقتل الخلايا السرطانية — ولهذا صنّفت منظمة الصحّة العالمية العمل الليلي المتناوب مادّةً مسرطنة محتملة.',
      'One night. These are the cells that kill cancerous ones — which is why the WHO classes shift work as a probable carcinogen.')
  ),
  fact(
    L('أسبوعٌ من نوم خمس ساعات يكفي ليصبح شابٌّ سليم في نطاق «ما قبل السكري».',
      'One week of five-hour nights is enough to push a healthy young man into the pre-diabetic range.'),
    L('وقلّة النوم **تُشيخ خصوبة الرجل عشر سنوات**. الأثر يظهر في أسبوع، لا في عمر.',
      'Short sleep also **ages a man’s fertility by a decade**. The effect shows up in a week, not a lifetime.')
  ),
  fact(
    L('قلّة النوم تخفض هرمون الشبع وترفع هرمون الجوع، فتأكل أكثر وتشتهي الأسوأ.',
      'Short sleep lowers the satiety hormone and raises the hunger one, so you eat more and crave worse.'),
    L('ليبتين ينزل وغريلين يصعد، والشهية تتّجه تحديداً إلى السكّريات والنشويات. أمّا جملة ووكر الشهيرة **«كلّما قصُر نومك، قصُرت حياتك»** فهي أبسط ممّا تُظهره الأدبيّات: العلاقة منحنىً على شكل U، والنوم الطويل يرتبط هو الآخر بوفياتٍ أعلى — راجع التدقيق في «النوم والصحّة».',
      'Leptin down, ghrelin up — and the craving points specifically at sugars and starches. Walker’s famous line, **“the shorter your sleep, the shorter your life,”** is simpler than the literature: the relationship is U-shaped, and long sleep is associated with higher mortality too. See the fact-check in «النوم والصحّة».')
  ),
  fact(
    L('الدلافين والبطّ تنام بنصف دماغٍ في كلّ مرّة.',
      'Dolphins and ducks sleep with one half of the brain at a time.'),
    L('وأنت تفعل شيئاً شبيهاً: ليلتك الأولى في مكانٍ جديد ينام فيها نصف دماغك أخفّ من الآخر، حرصاً.',
      'And you do something similar: on your first night somewhere new, one hemisphere sleeps more lightly than the other, on guard.')
  ),
  fact(
    L('من يكفيهم ستّ ساعاتٍ حقّاً بسبب طفرةٍ جينية أندر من أن يُضربوا بالبرق.',
      'People who genuinely thrive on six hours through a genetic mutation are rarer than lightning-strike victims.'),
    L('وهذا هو مصدر الوهم: الطفرة حقيقية، لكنّ احتمال أن تكون أنت صاحبَها أقلّ من احتمال أن تُصاب بصاعقة.',
      'That is the source of the illusion: the mutation is real, but your odds of having it are lower than your odds of being struck.')
  ),
  fact(
    L('صار بالإمكان استنتاج محتوى الحلم من مسح الدماغ.',
      'The content of a dream can now be read off a brain scan.'),
    L('وليس هذا كلّ شيء: **«النوم على المشكلة» يضاعف احتمال حلّها ثلاث مرّات** — الحلم عملٌ لا عرضٌ جانبي.',
      'And more: **sleeping on a problem triples the odds of solving it**. Dreaming is work, not a by-product.')
  ),
  fact(
    L('ما يُروى عن «الاختطاف الفضائي» يفسّره شلل النوم، ويصيب واحداً من كلّ أربعة أصحاء.',
      'Alien-abduction accounts are explained by sleep paralysis, which affects one in four healthy people.'),
    L('استيقاظٌ للوعي قبل أن يرتخي كبتُ العضلات في REM: تستيقظ عاجزاً عن الحركة، مع هلوسةٍ حيّة وخوفٍ شديد.',
      'Consciousness returns before REM’s muscle paralysis lifts: you wake unable to move, with vivid hallucination and intense fear.')
  ),
  fact(
    L('الأطباء المقيمون في نوبات ٣٠ ساعة يخطئون التشخيص بنسبة ٤٦٠٪ أكثر.',
      'Residents on 30-hour shifts make 460% more diagnostic errors.'),
    L('والنظام الذي فرض تلك النوبات وضعه **ويليام أوسلر** ومعاصروه، وأحد مؤسّسيه كان مدمن كوكايين يعمل بلا نومٍ فعلاً.',
      'And the system that imposed those shifts came from Osler’s era — one of its founders was a cocaine addict who genuinely did work without sleep.')
  ),
  fact(
    L('تأخير موعد بداية الدراسة رفع درجات اختبار SAT ٢١٢ نقطة في إحدى المقاطعات.',
      'Delaying the school start time raised SAT scores by 212 points in one district.'),
    L('إيدينا في مينيسوتا. وفي تيتون بوايومنغ خفض التأخير حوادث سيّارات المراهقين **٧٠٪** — بتغييرٍ واحدٍ في الجدول.',
      'Edina, Minnesota. And in Teton County, Wyoming, the same change cut teen car crashes by **70%** — from one line in a timetable.')
  ),
  fact(
    L('تكلفة قلّة النوم على الاقتصاد الأمريكي تتجاوز ٤١١ مليار دولار سنوياً.',
      'Sleep loss costs the US economy more than $411 billion a year.'),
    L('أكثر من **٢٪** من الناتج المحلّي الإجمالي — أي أن قلّة النوم بندٌ في الاقتصاد الوطني، لا مسألةٌ شخصية.',
      'More than **2%** of GDP — sleep loss is a line item in the national economy, not a private matter.')
  ),
]
