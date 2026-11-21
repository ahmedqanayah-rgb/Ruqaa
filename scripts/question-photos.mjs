/*
 * THE PHOTOS THE QUESTIONS ASK FOR (2026-11-19, the club: "i want to add fotos
 * for as much questions as possible … write me a list of all the fotos u need
 * and ill add them to the folder"). The club finds them and drops them into
 * `Ruqaa/question-photos/` under these names (any of .jpg .jpeg .png .webp);
 * a photo can serve several questions on one subject.
 *
 * Every photo is chosen so that it SHOWS THE QUESTION, NEVER THE ANSWER — `avoid`
 * says what must not be in it. And no portrait that a picture round or «من هو؟»
 * asks about is reused next to a question that names that person: «من هو؟»
 * shows its picture from the start, so it would give the round away.
 *
 * `REUSE`: questions that take a picture the site already has, safely.
 */
const L = (ar, en) => ({ ar, en })

export const PHOTOS = {
  /* ------------------------------- لماذا ننام ------------------------------- */
  'ws-spider-web': { ...L('عنكبوت في شبكته (صورة قريبة)', 'spider in its web close-up'), q: ['ws-spiders'], avoid: 'قهوة' },
  'ws-dolphin': { ...L('دلفين يسبح', 'dolphin swimming'), q: ['ws-dolphin'] },
  'ws-ducks': { ...L('بطّ نائم على الماء أو على الضفّة', 'ducks sleeping'), q: ['why-we-sleep:tf:21'] },
  'ws-aetna-office': { ...L('مكتب شركة كبير أو مبنى شركة تأمين', 'corporate office building'), q: ['ws-aetna', 'ws-b-aetna'], avoid: 'أحد نائم، أو مال' },
  'ws-ufo': { ...L('صحن طائر أو رسم قديم لزوّار من الفضاء', 'vintage UFO flying saucer illustration'), q: ['ws-aliens'] },
  'ws-nightmare-fuseli': { ...L('لوحة «الكابوس» لهنري فوزيلي (١٧٨١)', 'Henry Fuseli The Nightmare painting'), q: ['why-we-sleep:tf:24'] },
  'ws-periodic-table': { ...L('الجدول الدوري للعناصر (ويفضّل جدول مندلييف المكتوب بخطّ يده)', 'Mendeleev handwritten periodic table'), q: ['ws-made-in-sleep', 'ws-b-mendeleev'], avoid: 'صورة مندلييف نفسه، أو أحد نائم' },
  'ws-clock-change': { ...L('ساعة حائط أو منبّه تُدار عقاربه إلى الأمام', 'turning clock forward daylight saving'), q: ['ws-clocks', 'why-we-sleep:tf:16'], avoid: 'قلب أو مستشفى' },
  'ws-pills': { ...L('حبوب أو كبسولات في علبة أو على طاولة', 'pills capsules bottle'), q: ['ws-melatonin', 'why-we-sleep:tf:4', 'majd-4', 'majd-24'] },
  'ws-teen-night': { ...L('مراهق مستيقظ في سريره ليلاً', 'teenager awake in bed at night'), q: ['ws-teens', 'majd-26', 'majd-27'] },
  'ws-teen-morning': { ...L('مراهق نصف نائم يُوقَظ صباحاً أو على مائدة الفطور', 'sleepy teenager morning alarm'), q: ['ws-b-teens'], avoid: 'ساعة تشير إلى الرابعة أو الخامسة' },
  'ws-school-morning': { ...L('حافلة مدرسية أو طلاب ذاهبون إلى المدرسة في عتمة الصباح', 'school bus dark early morning'), q: ['why-we-sleep:tf:10'] },
  'ws-exam': { ...L('طلاب في قاعة امتحان', 'students taking an exam'), q: ['ws-n-sat', 'why-we-sleep:tf:26', 'majd-73'], avoid: 'أرقام أو علامات ظاهرة' },
  'ws-classroom': { ...L('صفّ مدرسي (درس صحّة أو أحياء)', 'school classroom health lesson'), q: ['ws-n-school'] },
  'ws-dna': { ...L('رسم لشريط الحمض النووي DNA', 'DNA double helix'), q: ['ws-short-sleepers'], avoid: 'برق' },
  'ws-lightning': { ...L('برق في السماء', 'lightning strike'), q: ['why-we-sleep:tf:22'] },
  'ws-alarm-4am': { ...L('منبّه بجانب السرير في عتمة الفجر', 'alarm clock dark early morning bedside'), q: ['why-we-sleep:tf:1', 'majd-10', 'majd-13'] },
  'ws-sleeper': { ...L('شخص نائم بهدوء في سريره', 'person sleeping peacefully in bed'), q: ['ws-atonia', 'majd-9'] },
  'ws-sleepwalker': { ...L('رسم قديم لسائر في نومه، ذراعاه ممدودتان', 'vintage sleepwalker illustration'), q: ['why-we-sleep:tf:7'] },
  'ws-dreamer': { ...L('وجه نائم عن قرب، عيناه مغمضتان', 'close-up sleeping face eyes closed'), q: ['maria-ws-m-psychosis', 'majd-15'] },
  'ws-night-sky': { ...L('سماء ليلية مليئة بالنجوم', 'starry night sky'), q: ['ws-unborn', 'majd-6'], avoid: 'طفل أو أمّ حامل' },
  'ws-portrait-studio': { ...L('استوديو تصوير: كاميرا وإضاءة ومقعد', 'portrait photo studio camera lights'), q: ['ws-beauty', 'ws-b-beauty'], avoid: 'وجه متعب' },
  'ws-brain-model': { ...L('مجسّم دماغ بشري (نموذج تشريحي)', 'anatomical brain model'), q: ['ws-brain-wash', 'why-we-sleep:tf:6', 'majd-19'], avoid: 'ماء أو أمواج' },
  'ws-brain-scan': { ...L('صور رنين مغناطيسي للدماغ، أو جهاز الرنين', 'brain MRI scan'), q: ['why-we-sleep:tf:23', 'majd-82'] },
  'ws-old-surgery': { ...L('صورة قديمة لغرفة عمليات (أواخر القرن التاسع عشر)', '1890s operating theatre surgery photo'), q: ['ws-halsted'], avoid: 'صورة هالستد نفسه، أو مخدّرات' },
  'ws-tired-doctor': { ...L('طبيب منهك بثياب العمليات في ممرّ مستشفى', 'exhausted doctor hospital corridor'), q: ['why-we-sleep:tf:25'] },
  'ws-chimp': { ...L('شمبانزي (صورة وجه أو جالس على الأرض)', 'chimpanzee portrait'), q: ['maria-ws-m-trees', 'maria-ws-t-primates'], avoid: 'شجرة أو عشّ في شجرة' },
  'ws-old-book': { ...L('كتاب قديم مجلّد بالجلد، أو مكتبة عتيقة', 'antique leather book old library'), q: ['maria-ws-m-shakespeare'], avoid: 'شكسبير أو مسرح' },
  'ws-rat-maze': { ...L('فأر تجارب في متاهة', 'lab rat in a maze'), q: ['maria-ws-m-maze'] },
  'ws-blood-pressure': { ...L('جهاز قياس ضغط الدم', 'blood pressure monitor cuff'), q: ['maria-ws-m-prazosin'] },
  'ws-sleep-in': { ...L('شخص نائم صباح يوم عطلة والشمس تدخل الغرفة', 'sleeping in weekend morning sunlight'), q: ['why-we-sleep:tf:0'] },
  'ws-hunter-gatherers': { ...L('قبيلة من الصيّادين وجامعي الثمار (الهادزا أو السان) حول نار المخيّم', 'Hadza hunter-gatherers camp'), q: ['why-we-sleep:tf:2'] },
  'ws-nightcap': { ...L('كأس على طاولة بجانب السرير', 'glass of whisky on a nightstand'), q: ['why-we-sleep:tf:3', 'majd-21'] },
  'ws-coffee': { ...L('فنجان قهوة في المساء', 'cup of coffee evening'), q: ['why-we-sleep:tf:5', 'maria-ws-t-decaf', 'majd-1', 'majd-2'] },
  'ws-all-nighter': { ...L('طالب نائم فوق كتبه ليلاً', 'student asleep on books at night'), q: ['why-we-sleep:tf:8', 'majd-20'] },
  'ws-office-night': { ...L('موظّف وحده في مكتب مضاء ليلاً', 'businessman working late at night office'), q: ['why-we-sleep:tf:9'] },
  'ws-nap': { ...L('شخص يأخذ قيلولة على أريكة أو أرجوحة', 'person napping on a sofa'), q: ['why-we-sleep:tf:11'] },
  'ws-elderly': { ...L('رجل أو امرأة مسنّة في السرير ليلاً', 'elderly person in bed at night'), q: ['why-we-sleep:tf:12', 'majd-3'] },
  'ws-breathalyzer': { ...L('جهاز فحص الكحول في النفَس', 'breathalyzer test'), q: ['why-we-sleep:tf:13', 'ws-n-drunk', 'stolen-focus:tf:11'] },
  'ws-night-drive': { ...L('سيارة على طريق سريع ليلاً، أو سائق من الداخل في الليل', 'car on highway at night'), q: ['why-we-sleep:tf:14', 'maria-ws-n-microsleep'] },
  'ws-hospital-night': { ...L('سرير مستشفى في غرفة خافتة الضوء', 'hospital bed dim room'), q: ['why-we-sleep:tf:15'] },
  'ws-chernobyl': { ...L('محطّة تشيرنوبل النووية', 'Chernobyl nuclear power plant'), q: ['why-we-sleep:tf:17'] },
  'ws-immune-cells': { ...L('صورة مجهرية لخلايا مناعية', 'immune cells microscope'), q: ['why-we-sleep:tf:18'] },
  'ws-flu-shot': { ...L('لقاح يُعطى في الذراع', 'flu vaccine injection arm'), q: ['maria-ws-t-vaccine'] },
  'ws-glucose': { ...L('جهاز قياس السكّر في الدم', 'blood glucose meter'), q: ['why-we-sleep:tf:19'] },
  'ws-late-snack': { ...L('شخص يفتح الثلّاجة ليلاً أو يأكل وجبة سريعة متأخّراً', 'late night fridge snack'), q: ['why-we-sleep:tf:20'] },
  'ws-dollars': { ...L('أوراق دولار أمريكي', 'US dollar bills'), q: ['why-we-sleep:tf:27'] },
  'ws-pilot': { ...L('طيّار في قمرة القيادة', 'pilot in cockpit'), q: ['ws-n-nap'], avoid: 'أحد نائم أو ساعة' },
  'ws-thermostat': { ...L('منظّم حرارة على جدار غرفة نوم', 'thermostat dial bedroom'), q: ['ws-n-room'], avoid: 'رقم ظاهر على الشاشة' },
  'ws-elephant': { ...L('فيل', 'elephant'), q: ['ws-n-elephant'] },
  'ws-siesta': { ...L('شارع قرية يونانية هادئ عند الظهيرة، أو أحد يأخذ قيلولة في الظلّ', 'Greek village siesta afternoon'), q: ['maria-ws-n-siesta'] },
  'ws-ikaria': { ...L('مسنّون في قرية بجزيرة إيكاريا اليونانية', 'Ikaria island elderly villagers'), q: ['maria-ws-b-ikaria'] },
  'ws-edison-lab': { ...L('مختبر إديسون في مينلو بارك', 'Edison Menlo Park laboratory'), q: ['ws-b-edison'], avoid: 'كرات معدنية' },
  'ws-pocket-watch': { ...L('ساعة جيب قديمة', 'antique pocket watch'), q: ['ws-b-kleitman', 'majd-7'], avoid: 'كهف' },
  'ws-keith-richards': { ...L('كيث ريتشاردز يعزف على الغيتار', 'Keith Richards guitar'), q: ['maria-ws-b-richards'], avoid: 'آلة تسجيل أو شريط' },
  // For the second set of members' questions (2026-11-21):
  'ws-sleep-lab': { ...L('نائمٌ في مختبر نوم وعلى رأسه أقطاب تخطيط الدماغ', 'sleep lab EEG electrodes sleeping'), q: ['majd-11'] },
  'ws-angry-tired': { ...L('شخصٌ متعب منفعل يصرخ أو يتشاجر', 'exhausted angry person shouting'), q: ['majd-16'] },
  'ws-light-switch': { ...L('مفتاح إضاءة على جدار', 'light switch on a wall'), q: ['majd-17'] },
  'ws-piano-practice': { ...L('يدان تتدرّبان على البيانو', 'hands practicing piano'), q: ['majd-23'] },
  'ws-sleeping-pills': { ...L('حبوبٌ منوّمة في شريط على طاولة بجانب السرير', 'sleeping pills blister pack nightstand'), q: ['majd-25'] },
  'ws-foot-duvet': { ...L('قدمٌ حافية خارجة من تحت اللحاف', 'bare foot sticking out from under duvet'), q: ['majd-28'] },
  'ws-hotel-room': { ...L('غرفة فندق وسريرها', 'hotel room bed'), q: ['majd-32'], avoid: 'دلفين أو طائر' },

  /* ------------------------------ بين كتابين ------------------------------ */
  'x-greek-island': { ...L('ميناء جزيرة يونانية: بيوت بيضاء وبحر أزرق', 'Greek island harbour'), q: ['maria-x-m-islands'] },
  'x-odysseus': { ...L('تمثال نصفي قديم لأوديسيوس', 'ancient bust of Odysseus'), q: ['maria-x-m-odysseus'], avoid: 'أوديسيوس مربوطاً إلى الصاري' },
  'x-dickens': { ...L('صورة تشارلز ديكنز', 'Charles Dickens portrait'), q: ['maria-x-m-dickens'] },

  /* ---------------------------- تركيزنا المسلوب ---------------------------- */
  'sf-office': { ...L('مكتب مفتوح مليء بالموظّفين', 'open plan office workers'), q: ['sf-office'] },
  'sf-inbox': { ...L('شاشة بريد إلكتروني مليئة بالرسائل، أو إشعارات كثيرة', 'overflowing email inbox notifications'), q: ['sf-iq', 'stolen-focus:tf:9'] },
  'sf-goldfish': { ...L('سمكة ذهبية في حوض', 'goldfish in a bowl'), q: ['sf-goldfish', 'stolen-focus:tf:0'] },
  'sf-scrolling': { ...L('إصبع يمرّر شاشة هاتف بلا نهاية', 'thumb scrolling phone feed'), q: ['sf-raskin'] },
  'sf-silicon-valley': { ...L('وادي السيليكون أو مقرّ شركة تقنية', 'Silicon Valley tech campus'), q: ['sf-b-raskin'], avoid: 'هاتف يُمرَّر' },
  'sf-pigeon': { ...L('حمامة', 'pigeon'), q: ['sf-pigeon'] },
  'sf-skinner-box': { ...L('صندوق سكنر (قفص تجارب للحيوانات فيه رافعة)', 'Skinner box operant conditioning chamber'), q: ['sf-b-skinner'] },
  'sf-kellogg': { ...L('مصنع كيلوغ القديم، أو علبة رقائق الذرة', 'Kellogg factory cornflakes'), q: ['sf-kellogg'] },
  'sf-subway': { ...L('مترو أنفاق نيويورك', 'New York subway'), q: ['sf-skenazy'] },
  'sf-new-york-street': { ...L('شارع في نيويورك', 'New York street'), q: ['sf-b-skenazy'], avoid: 'مترو، أو طفل وحده' },
  'sf-kids-drink': { ...L('طفل يشرب من كوب عادي', 'child drinking from a cup'), q: ['sf-dyes'], avoid: 'حلوى أو مشروبات ملوّنة' },
  'sf-snack-aisle': { ...L('رفّ وجبات خفيفة معلّبة في سوبرماركت', 'supermarket snack aisle'), q: ['sf-pollan'] },
  'sf-michael-pollan': { ...L('صورة مايكل بولان', 'Michael Pollan portrait'), q: ['sf-b-pollan'] },
  'sf-flow': { ...L('شخص مستغرق تماماً في عمله: متسلّق صخور أو عازف أو رسّام', 'person absorbed in flow rock climber'), q: ['sf-flow'] },
  'sf-paris-office': { ...L('مكاتب حيّ الأعمال في باريس (لا ديفانس)', 'Paris La Defense office buildings'), q: ['sf-disconnect', 'sf-b-france'], avoid: 'حاسوب مغلق أو سلك مفصول' },
  'sf-stopwatch': { ...L('ساعة توقيت', 'stopwatch'), q: ['sf-23-minutes', 'stolen-focus:tf:6'], avoid: 'رقم ظاهر' },
  'sf-multitask': { ...L('شخص يتحدّث بالهاتف ويكتب ويأكل في آن واحد', 'multitasking person phone laptop'), q: ['sf-multitask', 'stolen-focus:tf:1', 'majd-69'] },
  'sf-lecture-sleep': { ...L('طالب جامعي نائم في قاعة محاضرات', 'college student asleep in lecture hall'), q: ['maria-sf-m-prichard', 'majd-91'] },
  'sf-nz-office': { ...L('مكتب شركة في نيوزيلندا، أو موظّفون على مكاتبهم', 'New Zealand office workers'), q: ['maria-sf-m-flags', 'maria-sf-n-guardian'], avoid: 'أعلام' },
  'sf-city-london': { ...L('حيّ المال في لندن «السيتي»', 'City of London financial district'), q: ['maria-sf-b-resignation'], avoid: 'أوراق أو رسائل' },
  'sf-kid-building': { ...L('طفل يبني شيئاً من الخشب بأدوات', 'child building with wood and tools'), q: ['maria-sf-m-letgrow'], avoid: 'عربة' },
  'sf-sirens-vase': { ...L('«مزهرية الحوريات» الإغريقية في المتحف البريطاني: أوديسيوس مربوط إلى الصاري', 'Siren Vase British Museum Odysseus'), q: ['maria-sf-b-precommit'] },
  'sf-willpower': { ...L('شخص يحاول التركيز بشدّة على مكتبه', 'person struggling to concentrate desk'), q: ['stolen-focus:tf:2', 'majd-90'] },
  'sf-phone-apps': { ...L('شاشة هاتف مليئة بأيقونات التطبيقات', 'smartphone home screen app icons'), q: ['stolen-focus:tf:3', 'majd-86'] },
  'sf-classroom-kid': { ...L('طفل في صفّ مدرسي ينظر بعيداً عن السبّورة', 'distracted child in classroom'), q: ['stolen-focus:tf:4', 'stolen-focus:tf:15'] },
  'sf-kid-tablet': { ...L('طفل أمام جهاز لوحي في البيت', 'child using tablet at home'), q: ['stolen-focus:tf:5'] },
  'sf-student-laptop': { ...L('طالب أمام حاسوب محمول مفتوح فيه نوافذ كثيرة', 'student laptop many tabs'), q: ['stolen-focus:tf:7', 'sf-n-seconds', 'majd-72'] },
  'sf-phone-hand': { ...L('يد تمسك هاتفاً', 'hand holding smartphone'), q: ['stolen-focus:tf:8', 'sf-n-touches', 'majd-70'] },
  'sf-newspapers': { ...L('كومة صحف', 'stack of newspapers'), q: ['stolen-focus:tf:10', 'sf-n-newspapers'] },
  'sf-sugarcane': { ...L('مزارعون يحصدون قصب السكّر', 'sugarcane farmers harvest'), q: ['stolen-focus:tf:12', 'sf-n-farmers'] },
  'sf-reading': { ...L('شخص يقرأ كتاباً ورقياً', 'person reading a book'), q: ['stolen-focus:tf:13', 'majd-76', 'majd-79'] },
  'sf-trending': { ...L('شاشة هاتف تعرض «الأكثر تداولاً» على وسائل التواصل', 'trending topics on phone screen'), q: ['stolen-focus:tf:14'] },
  'sf-kids-outdoors': { ...L('أطفال يلعبون في الخارج', 'children playing outdoors'), q: ['stolen-focus:tf:16', 'sf-n-outdoors', 'majd-95'] },
  'sf-tokyo-office': { ...L('مكتب في طوكيو أو مقرّ مايكروسوفت اليابان', 'Tokyo office Microsoft Japan'), q: ['stolen-focus:tf:17', 'sf-n-microsoft'] },
  'sf-kids-bedroom': { ...L('غرفة نوم طفل ليلاً', 'child bedroom at night'), q: ['maria-sf-t-kids', 'maria-sf-n-85'], avoid: 'طفل يقفز أو يصرخ' },
  'sf-angry-phone': { ...L('شخص غاضب يكتب على هاتفه', 'angry person typing on phone'), q: ['maria-sf-n-outrage'] },
  'sf-jef-raskin': { ...L('صورة جف راسكن (الأب)', 'Jef Raskin portrait'), q: ['maria-sf-b-macintosh'], avoid: 'حاسوب أو شعار «آبل»' },
  // For the second set of members' questions (2026-11-21):
  'sf-texting-driver': { ...L('يدٌ تكتب رسالةً على الهاتف خلف مقود سيارة', 'texting while driving'), q: ['majd-74'], avoid: 'زجاجة أو كأس' },
  'sf-mcluhan': { ...L('صورة مارشال ماكلوهان', 'Marshall McLuhan portrait'), q: ['majd-81'] },
  'sf-daydream': { ...L('شخصٌ شارد الذهن يحدّق من النافذة', 'person daydreaming looking out a window'), q: ['majd-83'] },
  'sf-poincare': { ...L('صورة هنري بوانكاريه', 'Henri Poincaré portrait'), q: ['majd-84'], avoid: 'حافلة أو عربة' },
  'sf-magician': { ...L('يدا ساحرٍ تُخفيان عملةً معدنية', 'magician hands coin trick'), q: ['majd-85'] },
  'sf-phone-ads': { ...L('شاشة هاتفٍ عليها إعلانات', 'targeted ads on a smartphone screen'), q: ['majd-88'], avoid: 'ميكروفون' },
  'sf-queue-phones': { ...L('أناسٌ في طابور انتظار ينظر كلٌّ منهم إلى هاتفه', 'people waiting in line looking at their phones'), q: ['majd-89'] },
  'sf-muddy-windscreen': { ...L('زجاج سيارةٍ أمامي ملطّخ بالطين', 'mud splattered car windshield'), q: ['majd-100'] },

  /* ------------------------ الاقتصاد كما أشرحه لابنتي ------------------------ */
  'td-cuneiform': { ...L('لوح طيني مكتوب بالخطّ المسماري', 'cuneiform clay tablet'), q: ['td-first-writing', 'talking-to-my-daughter:tf:9'] },
  'td-first-fleet': { ...L('لوحة قديمة لوصول السفن البريطانية إلى أستراليا', 'First Fleet arrival Australia painting'), q: ['td-australia'] },
  'td-bank': { ...L('قاعة مصرف أو خزنة مصرف', 'bank interior vault'), q: ['talking-to-my-daughter:tf:0', 'majd-51'] },
  'td-bank-of-england': { ...L('مبنى «بنك إنجلترا» في لندن', 'Bank of England building'), q: ['td-n-boe'] },
  'td-central-bank': { ...L('مبنى مصرف مركزي (الاحتياطي الفيدرالي أو المركزي الأوروبي)', 'Federal Reserve building'), q: ['talking-to-my-daughter:tf:2', 'talking-to-my-daughter:tf:13', 'majd-52'] },
  'td-credit-card': { ...L('بطاقة ائتمان', 'credit card close-up'), q: ['td-credit', 'talking-to-my-daughter:tf:10'] },
  'td-contactless': { ...L('دفع بالهاتف أو بالبطاقة عند الصندوق', 'contactless payment'), q: ['maria-td-n-virtual'], avoid: 'ألواح طينية أو حقول قمح' },
  'td-greek-home': { ...L('إناء إغريقي قديم عليه مشهد من حياة البيت', 'ancient Greek vase household scene'), q: ['td-oikonomia', 'talking-to-my-daughter:tf:11'] },
  'td-athens-agora': { ...L('أطلال الأغورا (الساحة العامة) في أثينا', 'ancient Agora of Athens'), q: ['td-idiotis', 'talking-to-my-daughter:tf:16'] },
  'td-pow-camp': { ...L('صورة قديمة لمعسكر أسرى في الحرب العالمية الثانية', 'WWII prisoner of war camp photo'), q: ['td-bombing', 'talking-to-my-daughter:tf:12', 'td-b-money', 'td-n-interest'], avoid: 'سجائر أو تدخين' },
  'td-steam-engine': { ...L('آلة جيمس وات البخارية', 'James Watt steam engine'), q: ['td-pharaoh', 'majd-48'] },
  'td-phone-factory': { ...L('خطّ تجميع هواتف في مصنع', 'smartphone assembly line factory'), q: ['td-iphone'] },
  'td-ecuador-quito': { ...L('مدينة كيتو عاصمة الإكوادور، أو مبنى برلمانها', 'Quito Ecuador city'), q: ['td-ecuador', 'talking-to-my-daughter:tf:15', 'td-b-ecuador'], avoid: 'طبيعة: غابات أو جبال أو أنهار' },
  'td-luddites': { ...L('رسم قديم للّوديين وهم يحطّمون آلات النسيج', 'Luddites smashing looms engraving'), q: ['td-luddites', 'talking-to-my-daughter:tf:4'] },
  'td-greek-armour': { ...L('خوذة ودرع محارب إغريقي قديم', 'ancient Greek hoplite armour helmet'), q: ['td-achilles'] },
  'td-bitcoin': { ...L('عملة بيتكوين', 'bitcoin coin'), q: ['td-bitcoin', 'talking-to-my-daughter:tf:6', 'td-n-cap', 'majd-65'] },
  'td-banknotes': { ...L('أوراق نقدية من بلدان مختلفة', 'banknotes from different countries'), q: ['td-gold', 'talking-to-my-daughter:tf:3', 'talking-to-my-daughter:tf:5', 'majd-39'], avoid: 'ذهب' },
  'td-nixon': { ...L('صورة الرئيس الأمريكي نيكسون', 'Richard Nixon portrait'), q: ['td-n-nixon'], avoid: 'تاريخ مكتوب' },
  'td-fridge-factory': { ...L('صفّ ثلّاجات في مصنع أو معرض', 'refrigerator factory'), q: ['td-maria'] },
  'td-fishing-boat': { ...L('قارب صيد يوناني صغير في ميناء', 'small Greek fishing boat harbour'), q: ['td-kostas', 'td-b-kostas'], avoid: 'مرساة' },
  'td-faust-rembrandt': { ...L('محفورة رامبرانت «فاوست في مكتبه»', 'Rembrandt Faust etching'), q: ['maria-td-m-faust'] },
  'td-marlowe': { ...L('صورة كريستوفر مارلو', 'Christopher Marlowe portrait'), q: ['td-b-faustus'], avoid: 'دم' },
  'td-greek-easter': { ...L('مائدة عيد الفصح اليونانية بالبيض الأحمر', 'Greek Easter table red eggs'), q: ['maria-td-m-easter'], avoid: 'حصّالة أو نقود' },
  'td-engine': { ...L('محرّك آلة أو محرّك سيارة قديم', 'engine machinery'), q: ['maria-td-m-engine'], avoid: 'علبة شحم أو زيت' },
  'td-digital-rain': { ...L('مطر من الرموز الخضراء على شاشة سوداء (على طريقة «المصفوفة»)', 'green digital code rain'), q: ['maria-td-m-matrix'] },
  'td-robots': { ...L('روبوتات صناعية في مصنع', 'industrial robots factory'), q: ['maria-td-m-robots'] },
  'td-unemployment-queue': { ...L('طابور عاطلين عن العمل (صورة من الكساد الكبير)', 'Great Depression unemployment line'), q: ['talking-to-my-daughter:tf:1'] },
  'td-dust-bowl': { ...L('صورة من أمريكا أيام «عناقيد الغضب»: عائلة مهاجرة أو مزارع جافّة', 'Dust Bowl migrant family 1930s'), q: ['maria-td-b-kerosene'], avoid: 'برتقال' },
  'td-easter-island': { ...L('تماثيل «مواي» في جزيرة الفصح', 'Easter Island moai statues'), q: ['talking-to-my-daughter:tf:7'] },
  'td-moneylender': { ...L('لوحة «المرابي وزوجته» لكوينتن ماتسيس (١٥١٤)', 'Quentin Matsys The Moneylender and his Wife'), q: ['talking-to-my-daughter:tf:8'] },
  'td-marshalsea': { ...L('سجن مارشلسي في لندن (رسم قديم)', 'Marshalsea debtors prison'), q: ['talking-to-my-daughter:tf:14'] },
  'td-aegina': { ...L('ميناء جزيرة إيجينا اليونانية', 'Aegina island harbour'), q: ['talking-to-my-daughter:tf:17', 'td-n-days'] },
  'td-greek-parliament': { ...L('مبنى البرلمان اليوناني في أثينا', 'Greek Parliament building Athens'), q: ['td-n-minister', 'majd-57'] },
  'td-blood-donation': { ...L('كيس تبرّع بالدم أو متبرّع يعطي دمه', 'blood donation bag'), q: ['maria-td-t-blood'] },
  'td-frankenstein': { ...L('رسم الطبعة الأولى المصوّرة من «فرانكنشتاين» (١٨٣١)', 'Frankenstein 1831 frontispiece'), q: ['maria-td-t-marx'], avoid: 'صورة ماركس أو ماري شيلي' },
  'td-protest': { ...L('حشد متظاهرين', 'protest crowd'), q: ['maria-td-t-slogans'], avoid: 'لافتات مقروءة' },
  'td-english-estate': { ...L('ريف إنجليزي: حقول وقصر قديم', 'English countryside manor fields'), q: ['td-b-sheep'], avoid: 'خراف' },
  'td-oscar-wilde': { ...L('صورة أوسكار وايلد', 'Oscar Wilde portrait'), q: ['maria-td-b-wilde'] },
  'td-time-travel': { ...L('رسم قديم لآلة الزمن، أو نفق ضوئي', 'vintage time machine illustration'), q: ['maria-td-b-timetravel'], avoid: 'مكتب سفريات أو تذاكر' },
  'td-radford': { ...L('صورة ريتشارد رادفورد، الاقتصادي الذي كتب عن معسكر الأسرى (إن وُجدت)', 'Richard A. Radford economist'), q: ['td-w-radford'] },
  // For the second set of members' questions (2026-11-21):
  'td-fruit-market': { ...L('بسطة خضار وفاكهة في سوقٍ شعبي', 'fruit and vegetable market stall'), q: ['majd-35'], avoid: 'أكياس حبوب أو مخازن' },
  'td-early-farming': { ...L('حقل قمح، أو رسمٌ لمزارعين أوائل يحرثون الأرض', 'wheat field or neolithic farmers illustration'), q: ['majd-36'] },
  'td-ancient-farmers': { ...L('رسمٌ فرعوني لفلّاحين يعملون في الحقل', 'ancient Egyptian tomb painting farmers'), q: ['majd-41'], avoid: 'كهنة أو معابد' },
  'td-rich-poor': { ...L('صورةٌ جوّية لحيٍّ فاخر بجانب حيٍّ فقير', 'aerial photo rich and poor neighbourhoods side by side'), q: ['majd-42'] },
  'td-sunset': { ...L('غروب الشمس فوق البحر', 'sunset over the sea'), q: ['majd-44'] },
  'td-trading-floor': { ...L('قاعة تداول في بورصة', 'stock exchange trading floor'), q: ['majd-53'] },
  'td-victorian-railway': { ...L('قطارٌ بخاري قديم على جسر (القرن التاسع عشر)', 'Victorian steam train viaduct'), q: ['majd-54'] },
  'td-unpaid-bills': { ...L('كومة فواتير ورسائل ديونٍ غير مدفوعة', 'pile of unpaid bills debt letters'), q: ['majd-55'] },
  'td-bond-certificate': { ...L('شهادة سندٍ حكومي قديمة', 'old government bond certificate'), q: ['majd-56'] },
  'td-icarus': { ...L('لوحةٌ لسقوط إيكاروس', 'fall of Icarus painting'), q: ['majd-61'], avoid: 'روبوتات أو آلات' },
  'td-crystal-ball': { ...L('كرةٌ بلّورية لقراءة الطالع', 'fortune teller crystal ball'), q: ['majd-67'] },
}

/* Planned, but not shown: the club found no real portrait of Radford, and the
   picture that stood in for him was of other men — «من هو؟» presents its
   picture as the person (2026-11-20). sf-angry-phone was a stock photo with a
   faint Dreamstime stamp across it (the club, 2026-11-20: "some fotos has stamps
   like getty image"): a stamp is not erased here — the photo is left out until
   there is a clean one the club is free to use. */
export const SKIP = ['td-radford', 'sf-angry-phone']

/* Picture rounds whose picture the club supplied: here the photo IS the
   question, so it must carry no name, caption or brand (scripts/
   import-question-photos.mjs cleans those off). Name → the round it is for. */
export const PICTURE_ROUNDS = {
  'ws-mimosa': 'maria-ws-p-mimosa',
  'sf-ksafe': 'maria-sf-p-ksafe',
  'td-scrooge': 'maria-td-p-scrooge',
}

/* Questions that take a picture the site already has — none of these people or
   pictures is the answer to a picture round or a «من هو؟». */
export const REUSE = {
  'maria-ws-m-guinness': './images/characters/randy-gardner.webp',
  'td-thin-air': './images/characters/miriam.webp',
  'maria-td-n-patmos': './images/characters/andreas.webp',
  'maria-sf-b-williams': './images/characters/james-williams.webp',
  'maria-sf-t-wikipedia': './images/characters/sune-lehmann.webp',
  'maria-td-b-redemption': './images/characters/goethe.webp',
  'maria-td-m-oedipus': './images/characters/sophocles.webp',
  'sf-provincetown': './images/provincetown.jpg',
  'majd-92': './images/characters/nadine-burke-harris.webp',
  'majd-97': './images/characters/james-williams.webp',
  'majd-98': './images/provincetown.jpg',
  'majd-99': './images/characters/joel-nigg.webp',
}
