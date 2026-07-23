/*
 * "A week with the book" — seven days of small attention experiments drawn from
 * the book's own arguments.
 *
 * Every `to` must be a real section slug in this book. Day 7 deliberately sends
 * the reader back to the Focus Lab, so the week has a measured before/after.
 */
const L = (ar, en) => ({ ar, en })

export const challenge = {
  slug: 'challenge',
  kind: 'challenge',
  icon: '🗓️',
  title: L('أسبوعٌ مع الكتاب', 'A week with the book'),
  lead: L(
    'حجّة الكتاب أن الحلّ الفرديّ لا يكفي — وهذا صحيح. لكنّه يكشف لك ما هو ممكن، وهذا وحده يستحقّ سبعة أيام.',
    'The book argues that individual fixes aren’t enough — and that’s true. But they show you what’s possible, and that alone is worth seven days.'
  ),
  intro: L(
    'ابدأ بمختبر التركيز اليوم لتحصل على قياسٍ قبليّ، ثم جرّب يوماً كلّ يوم، وأعد المختبر في اليوم السابع.',
    'Start with the Focus Lab today for a “before” reading, try one day at a time, then run the Lab again on day seven.'
  ),
  days: [
    { n: 1, to: 'focus-lab',
      title: L('قِس قبل أن تبدأ', 'Measure before you begin'),
      task: L('شغّل مختبر التركيز وسجّل نتيجتك الإجمالية اليوم — هذا رقمك «قبل».',
              'Run the Focus Lab and note your overall score today — that’s your “before.”'),
      why: L('بلا قياسٍ قبليّ ستنسب أيّ تحسّنٍ إلى الحماس. الرقم يمنحك مرجعاً تعود إليه في اليوم السابع.',
             'Without a “before,” you’ll credit any improvement to enthusiasm. A number gives you something to come back to on day seven.') },

    { n: 2, to: 'big-tech',
      title: L('الهاتف في غرفةٍ أخرى', 'Phone in another room'),
      task: L('ساعةٌ واحدة من عملك اليوم والهاتف خارج الغرفة — لا مقلوباً على الطاولة، بل خارجها.',
              'One hour of today’s work with the phone out of the room — not face-down on the desk, out of the room.'),
      why: L('مجرّد وجود الهاتف في مجال بصرك يستهلك جزءاً من سعتك الذهنية وأنت لا تلمسه.',
             'Merely having the phone in sight consumes part of your mental capacity even when you never touch it.') },

    { n: 3, to: 'speed-flow',
      title: L('مهمّةٌ واحدة فقط', 'One task only'),
      task: L('اختر مهمّةً واحدة وابقَ معها تسعين دقيقة: لا تبويبات أخرى، ولا بريد، ولا «نظرةٌ سريعة».',
              'Pick one task and stay with it for ninety minutes: no other tabs, no email, no “quick look.”'),
      why: L('كلّ مقاطعةٍ تكلّفك نحو ٢٣ دقيقة للعودة إلى عمقك. مَن يُقاطَع دائماً يعيش في «طريق العودة» إلى تركيزٍ لا يصله.',
             'Every interruption costs about 23 minutes to get back to depth. The constantly interrupted live permanently “on the way back” to a focus they never reach.') },

    { n: 4, to: 'reading-mindwandering',
      title: L('ثلاثون دقيقةً على ورق', 'Thirty minutes on paper'),
      task: L('اقرأ نصف ساعةٍ من كتابٍ ورقيّ دون أن تلمس أيّ شاشة.',
              'Read for half an hour from a paper book without touching a screen.'),
      why: L('القراءة المتواصلة تدرّب عضلةً مختلفةً عن التصفّح: الصبر على فكرةٍ طويلةٍ حتى تكتمل.',
             'Sustained reading trains a different muscle from scrolling: the patience to stay with a long idea until it completes.') },

    { n: 5, to: 'reading-mindwandering',
      title: L('امشِ بلا سمّاعات', 'Walk with no headphones'),
      task: L('امشِ عشرين دقيقةً بلا موسيقى ولا بودكاست ولا هاتف. دع ذهنك يشرد.',
              'Walk for twenty minutes with no music, no podcast, no phone. Let your mind wander.'),
      why: L('الشرود ليس تعطّلاً — إنه شبكة الوضع الافتراضي وهي تنسج المعنى والخطط. نحن نملأ كلّ فراغٍ بالصوت ثم نشكو غياب الأفكار.',
             'Wandering isn’t idling — it’s the Default Mode Network weaving meaning and plans. We fill every gap with audio, then wonder where our ideas went.') },

    { n: 6, to: 'big-tech',
      title: L('نظّف الإشعارات', 'Cull your notifications'),
      task: L('أطفئ كلّ إشعارٍ لا يأتي من إنسانٍ يعرفك بالاسم. اجلس عشر دقائق وافعلها الآن.',
              'Turn off every notification that doesn’t come from a human who knows your name. Sit for ten minutes and do it now.'),
      why: L('الإشعار ليس رسالةً بل دعوةٌ مصمَّمة لسحبك. إطفاؤه لا يغيّر عادتك فحسب، بل يغيّر بيئتك — وهذا ما يوصي به الكتاب.',
             'A notification isn’t a message, it’s an engineered pull. Switching it off doesn’t just change your habit — it changes your environment, which is what the book actually recommends.') },

    { n: 7, to: 'focus-lab',
      title: L('قِس مرّةً أخرى', 'Measure again'),
      task: L('أعد مختبر التركيز وقارن بيوم الأوّل — ثم قرّر أيّ يومٍ من الستّة يستحقّ أن يبقى.',
              'Run the Focus Lab again and compare with day one — then decide which of the six days deserves to stay.'),
      why: L('النتيجة تتأثّر بالتعب والمِران، فلا تعاملها كحكمٍ قاطع. المهمّ ما لاحظتَه في نفسك خلال الأسبوع، لا الرقم وحده.',
             'The score is affected by tiredness and practice, so don’t treat it as a verdict. What matters is what you noticed in yourself this week, not the number alone.') },
  ],
  closing: L(
    'ثم تذكّر خلاصة الكتاب: ما فعلتَه هذا الأسبوع يكشف الممكن، لكنّه لا يصمد وحده في بيئةٍ لم تتغيّر. الخطوة التالية جماعية — وهذه بالضبط وظيفة نادٍ للقراءة.',
    'Then remember the book’s conclusion: what you did this week reveals what’s possible, but it won’t hold alone in an unchanged environment. The next step is collective — which is exactly what a reading club is for.'
  ),
}
