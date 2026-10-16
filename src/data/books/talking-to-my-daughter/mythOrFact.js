/* ============================================================================
   «خرافة أم حقيقة؟» — the game data for «الاقتصاد كما أشرحه لابنتي».
   ----------------------------------------------------------------------------
   The two rules from the Why We Sleep deck hold here too, and the game stops
   working if either breaks: every statement is a flat third-person assertion,
   and neither half may be guessable by length or tone. Several myths below are
   things most people believe — that banks lend out savers' money, that cutting
   wages creates jobs — which is the point: the book argues against them.

   Two items carry the club's own fact-checks (reception.js) into the game, the
   way the 23-minute entry does for Stolen Focus: the reader commits to the
   book's claim before being corrected. The FACT half also feeds the rotator on
   the book's landing page, so a fact here must be one the book can stand
   behind in its own voice.
   ========================================================================== */
const L = (ar, en) => ({ ar, en })
const myth = (statement, explain, source) => ({ statement, isMyth: true, explain, source })
const fact = (statement, explain, source) => ({ statement, isMyth: false, explain, source })

export const mythOrFact = [
  /* ---------------------------- myths ---------------------------- */
  myth(
    L('تُقرض المصارف أموال المودعين، ولا تستطيع أن تُقرض أكثر ممّا أُودع لديها.',
      'Banks lend out depositors’ money, and cannot lend more than has been deposited with them.'),
    L('يُقرض المصرف بأن **يكتب رقماً** في حساب المقترض: القرض يخلق الوديعة لا العكس. ويقول بنك إنكلترا نفسه (٢٠١٤) إن معظم المال المتداول ودائعُ خلقتها المصارف حين أقرضت.',
      'A bank lends by **typing a number** into the borrower’s account: the loan creates the deposit, not the other way round. The Bank of England itself (2014) says most money in circulation is deposits banks created by lending.'),
    { label: L('بنك إنكلترا: خلق المال في الاقتصاد الحديث', 'Bank of England: Money creation in the modern economy'),
      href: 'https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy' }
  ),
  myth(
    L('خفضُ الأجور كلّها يُعيد العاطلين إلى العمل.',
      'Cutting all wages puts the unemployed back to work.'),
    L('ما يصحّ على شركةٍ واحدة لا يصحّ على الاقتصاد كلّه: حين تنخفض الأجور جميعاً ينخفض ما يُشترى به، فيتوقّع أرباب العمل زبائن أقلّ ولا يوظّفون. هذه «مغالطة التركيب» عند كينز، وهي قلب الفصل الخامس.',
      'What is true for one firm is not true for the whole economy: when every wage falls, so does the money that buys things, so employers expect fewer customers and don’t hire. This is Keynes’s “fallacy of composition”, and the heart of chapter five.')
  ),
  myth(
    L('خفضُ سعر الفائدة يدفع أصحاب المشاريع دائماً إلى الاقتراض والاستثمار.',
      'Lowering interest rates always pushes entrepreneurs to borrow and invest.'),
    L('في الركود قد يُقرأ الخفض **يأساً**: إن خفض المصرف المركزي الفائدة إلى هذا الحدّ فالأوضاع سيّئة — فيُحجم أصحاب المشاريع. التوقّعات تحقّق نفسها، كنبوءة أوديب.',
      'In a slump a cut can read as **desperation**: if the central bank is cutting this hard, things must be bad — so entrepreneurs hold back. Expectations fulfil themselves, like Oedipus’s prophecy.')
  ),
  myth(
    L('تساوي ورقةُ النقد ما كلّفت طباعتها.',
      'A banknote is worth what it cost to print.'),
    L('ورقة الألف دراخما كانت تُطبع بعشرين. قيمة العملة لا تأتي من كلفتها بل من **ندرتها** والثقة بها — كما رأى رادفورد في معسكر الأسرى حين زادت السجائر أو قلّت.',
      'A thousand-drachma note cost twenty to print. A currency’s value comes not from its cost but from **its scarcity** and the trust in it — as Radford saw in the camp when cigarettes grew plentiful or scarce.')
  ),
  myth(
    L('عارض اللوديون الآلات لأنهم كرهوا التكنولوجيا.',
      'The Luddites opposed machines because they hated technology.'),
    L('حطّموا الأنوال، لكن خلافهم — بحسب الكتاب وكثيرٍ من المؤرّخين — كان مع **من يملك الآلات**: قلّةٌ قليلة تأخذ ثمارها ويُرمى العمّال إلى الجوع.',
      'They smashed the looms, but their quarrel — the book says, as do many historians — was with **who owned the machines**: a tiny few taking the gains while workers were thrown into hunger.')
  ),
  myth(
    L('معظم عملات العالم اليوم مسنودةٌ بما تملكه الدول من ذهب.',
      'Most of the world’s currencies today are backed by the gold their states hold.'),
    L('انتهى ذلك سنة ١٩٧١ حين أوقف نيكسون تحويل الدولار إلى ذهب. مال اليوم لا يسنده إلا قرار الدول وثقة الناس — المال «السياسي» الذي يتحدّث عنه الفصل السابع.',
      'That ended in 1971, when Nixon suspended the dollar’s convertibility into gold. Today’s money is backed by nothing but states’ decisions and people’s trust — the “political” money of chapter seven.')
  ),
  myth(
    L('سيبلغ عدد وحدات «بيتكوين» حدّه الأقصى، ٢١ مليوناً، نحو عام ٢٠٣٢.',
      'Bitcoin will reach its maximum supply of 21 million around 2032.'),
    L('هكذا يقول الكتاب، لكن مكافأة التعدين تنقص إلى النصف كلّ أربع سنين تقريباً: يصدر ٩٩٪ نحو ٢٠٣٥، وآخر وحدةٍ نحو **٢١٤٠**. الحدّ صحيح، والتاريخ لا — انظر تحقّق النادي في الفصل السابع.',
      'So the book says, but the mining reward halves roughly every four years: 99% will be issued by about 2035 and the last fraction around **2140**. The cap is right; the date is not — see the club’s check in chapter seven.'),
    { label: L('ويكي بيتكوين: العرض المضبوط', 'Bitcoin Wiki: Controlled supply'), href: 'https://en.bitcoin.it/wiki/Controlled_supply' }
  ),
  myth(
    L('هجر سكّان جزيرة الفصح جزيرتهم بعد أن قطعوا أشجارها كلّها فجاعوا.',
      'Easter Islanders abandoned their island after cutting down every tree and starving.'),
    L('الغابة اختفت، لكن الرابانوي لم يهجروا جزيرتهم قطّ — كانوا هناك سنة ١٧٢٢ وأحفادهم هناك اليوم — وأبحاث ٢٠٢٤ ترجّح سكّاناً قليلين مستقرّين لا ذروةً ثم انهياراً. انظر تحقّق النادي في الفصل الثامن.',
      'The forest went, but the Rapanui never abandoned their island — they were there in 1722 and their descendants are there today — and 2024 research points to a small, stable population rather than a boom and bust. See the club’s check in chapter eight.'),
    { label: L('سميثسونيان: جزيرة الفصح لم تنهَر بسبب الاستنزاف', 'Smithsonian: Easter Island did not collapse from overuse'),
      href: 'https://www.smithsonianmag.com/smart-news/easter-island-did-not-collapse-from-overuse-of-resources-after-all-study-suggests-180984591/' }
  ),
  myth(
    L('الإسلام هو الدين الوحيد الذي حرّم أخذ الفائدة على القروض.',
      'Islam is the only religion that has forbidden charging interest on loans.'),
    L('حرّمته الكنيسة أيضاً قروناً وسمّته **الربا (usury)**، ولهذا طالب جمهور مارلو بعقاب فاوست. ولم يُرفع التحريم في أوروبا إلا في القرن السادس عشر.',
      'The Church forbade it for centuries too, and called it **usury** — which is why Marlowe’s audience demanded Faustus be punished. Europe lifted the ban only in the sixteenth century.')
  ),

  /* ---------------------------- facts ---------------------------- */
  fact(
    L('كانت أقدم كتابةٍ في بلاد ما بين النهرين سجلّاتٍ لمقادير القمح في المخازن.',
      'The earliest writing in Mesopotamia was records of grain in storehouses.'),
    L('كُتب أوّل ما كُتب ليُثبت كلّ مزارعٍ ما أودعه في المخزن المشترك. الكتابة بنت الفائض — ولهذا لم تخترعها مجتمعاتٌ لم تحتج إلى الزراعة.',
      'The first writing existed so each farmer could prove what he had left in the common granary. Writing is a child of the surplus — which is why societies that never needed farming never invented it.')
  ),
  fact(
    L('كلمة «الائتمان» (credit) مشتقّةٌ من فعلٍ لاتينيّ معناه «أن تؤمن».',
      'The word “credit” comes from a Latin verb meaning “to believe”.'),
    L('credere. فالدَّين والنقد قائمان على الثقة بأن الوعد سيُفى — منذ صَدَفات السيد نابوك إلى أرقام حسابك اليوم.',
      'Credere. Debt and money rest on faith that a promise will be kept — from Mr Nabuk’s shells to the numbers in your account today.')
  ),
  fact(
    L('تعني كلمة «اقتصاد» في أصلها اليوناني قوانين إدارة البيت.',
      'In its Greek origin, the word “economy” means the laws of running a household.'),
    L('«أويكونوميا»: البيت (oikos) والقواعد (nomoi). ولأن معظم الإنتاج خرج من البيت، يقترح الكتاب أن «أغورانوميا» — قوانين السوق — اسمٌ أصدق لما نعيشه.',
      'Oikonomia: household (oikos) plus rules (nomoi). Since most production left the household long ago, the book suggests “agoranomy” — the laws of the marketplace — is a truer name for what we live in.')
  ),
  fact(
    L('صارت السجائر عملةً في معسكرٍ لأسرى الحرب العالمية الثانية.',
      'Cigarettes became the currency of a Second World War prisoner-of-war camp.'),
    L('دوّن ذلك ريتشارد رادفورد، الاقتصاديّ الأسير، في مقالةٍ شهيرة سنة ١٩٤٥: تدوم، وتُحمل، وتُقسَّم، ويرغب فيها الجميع — حتى غير المدخّنين.',
      'Richard Radford, an economist and prisoner, recorded it in a famous 1945 article: they keep, they carry, they divide, and everyone wants them — even non-smokers.')
  ),
  fact(
    L('يرفع المُقرضون أسعار الفائدة حين يتوقّعون ارتفاع التضخّم.',
      'Lenders raise interest rates when they expect inflation to rise.'),
    L('لأن المال الذي سيُردّ إليهم سيشتري أقلّ. في المعسكر: من يُقرض ١٠ سجائر بفائدة ٢٠٪ ويتوقّع أن تفقد ١٠٪ من قيمتها يطلب ٣٠٪.',
      'Because the money they get back will buy less. In the camp: someone lending 10 cigarettes at 20% who expects them to lose 10% of their value asks 30%.')
  ),
  fact(
    L('كان المدينون المعسرون يُسجنون في بريطانيا في العصر الفيكتوري المبكّر.',
      'Insolvent debtors were imprisoned in early Victorian Britain.'),
    L('في سجون المدينين، حتى يسدّدوا مع الفائدة. ونجت مجتمعات السوق من أزماتها حين غيّرت القانون — ومنه «المسؤولية المحدودة» التي تحمي بيت صاحب الشركة.',
      'In debtors’ prisons, until they paid in full with interest. Market societies survived their crises when they changed the law — including limited liability, which protects a company owner’s home.')
  ),
  fact(
    L('عدّلت الإكوادور دستورها لتعترف بحقوقٍ للطبيعة نفسها.',
      'Ecuador amended its constitution to recognise rights belonging to nature itself.'),
    L('سنة ٢٠٠٨: الغابة المطيرة محميّةٌ لذاتها، بصرف النظر عن قيمتها التبادلية — ويعدّها الكتاب سابقةً في تاريخ الدساتير.',
      'In 2008: the rainforest protected for its own sake, whatever its exchange value — which the book calls a first in constitutional history.')
  ),
  fact(
    L('كانت «الإديوتيس» في أثينا القديمة تعني من لا يفكّر إلا في شأنه الخاص.',
      'In ancient Athens, an “idiotis” was someone who minded only his own business.'),
    L('ثم صارت الكلمة في الإنجليزية تعني الأحمق. وبالمعنيين، يقول الكتاب، جعلتنا مجتمعات السوق أغبياء — كصيّادي النهر الذين أفنوا سمكه.',
      'English later made the word mean a fool. In both senses, the book says, market societies have made idiots of us — like the fishermen who emptied their river.')
  ),
  fact(
    L('كتب فاروفاكيس هذا الكتاب باليونانية في تسعة أيام.',
      'Varoufakis wrote this book in Greek in nine days.'),
    L('سنة ٢٠١٣، في بيت العائلة بجزيرة إيجينا، بلا خطّةٍ مسبقة — وهو كتابه الوحيد بلا حواشٍ ولا مراجع. ولم يصدر بالإنجليزية إلا سنة ٢٠١٧.',
      'In 2013, at the family house on Aegina, with no plan — his only book with no footnotes or references. It did not appear in English until 2017.')
  ),
]
