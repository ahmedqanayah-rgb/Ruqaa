/* ============================================================================
   «عن المترجم» — عماد شيحة, translator of the Arabic edition the club reads.
   ----------------------------------------------------------------------------
   NOT data/translator.js. That module is one biography for one man — الحارث
   النبهان, who translated the club's first two books for Dar Al-Tanweer. This
   book is a different translator and a different publisher (Dar Al Saqi,
   Beirut, 2020), and writing him into that file would have meant turning a
   biography into a template to save nothing. He lives with his book.

   SOURCING. Arabic Wikipedia carries the detail (birth, the dates of arrest and
   release, the novels, the translations, his death) with its own references;
   The Daily Star's report of his release in August 2004 and Amnesty
   International's statement of August 2002 corroborate the imprisonment
   independently; his publisher's page corroborates the translations. All four
   are linked at the foot.

   The arrest year differs between sources (1974 in some, 1975 in Wikipedia,
   Amnesty and The Daily Star), so the page says "the mid-1970s" and "nearly
   thirty years", which every source supports.

   SAME RULE AS THE OTHER TRANSLATOR'S PAGE, for the same reason: the prison
   years are in, written plainly — what happened and what it produced — with no
   account of why he was held and no politics. The sources do give reasons and
   describe what was done to him. It is left out on purpose; this is a reading
   club's page about a translator, not a verdict on a state.

   The portrait is a still from a television interview, supplied by the club and
   cropped to head-and-shoulders (prep-economy-images.mjs).
   ========================================================================== */
const L = (ar, en) => ({ ar, en })
const port = (f) => `./images/characters/${f.replace(/\.\w+$/, '')}.webp`

export const translator = {
  blocks: [
    { type: 'image', src: port('imad-shiha.jpg'), wide: true,
      alt: L('عماد شيحة', 'Imad Shiha'),
      caption: L('الروائيّ والمترجم عماد شيحة (Imad Shiha)، من لقاءٍ تلفزيونيّ.', 'The novelist and translator Imad Shiha, from a television interview.') },

    { type: 'callout', variant: 'note', title: L('لماذا هذا القسم؟', 'Why this section?'), text: L(
      'الكتاب الذي نقرؤه في النادي ليس الأصل اليونانيّ ولا الترجمة الإنجليزية، بل **الطبعة العربية**. وكلّ جملةٍ نناقشها مرّت بيد مترجم، واختار لها كلماتها — حتى «مجتمع السوق» و«الانقلاب الكبير» و«التسييجات» التي يستعملها هذا الموقع. فمن العدل أن نعرف من هو.',
      'The book the club reads is neither the Greek original nor the English translation but **the Arabic edition**. Every sentence we discuss passed through a translator’s hands, and he chose its words — down to «market society», «the Great Reversal» and «the enclosures» that this site uses. It is only fair to know who he was.'
    ) },

    { type: 'p', text: L(
      '**عماد شيحة** (١٩٥٤–٢٠٢٢) روائيٌّ ومترجمٌ سوريّ، وُلد في **دمشق** في ٩ مارس ١٩٥٤. ترجم عن الإنجليزية كتباً في الاقتصاد والسياسة والفلسفة والتاريخ، وكتب الرواية — وأكثر ما في سيرته جرى خلف جدران السجن.',
      '**Imad Shiha** (1954–2022) was a Syrian novelist and translator, born in **Damascus** on 9 March 1954. He translated books on economics, politics, philosophy and history from English, and he wrote novels — and most of his life took place behind prison walls.'
    ) },

    { type: 'h', text: L('ثلاثون عاماً', 'Thirty years') },
    { type: 'p', text: L(
      'اعتُقل في **منتصف السبعينيات** وهو طالبٌ في سنته الأخيرة بكلّية العلوم في جامعة دمشق، يدرس الكيمياء، وحُكم عليه بالسجن المؤبّد. وأمضى **قرابة ثلاثين عاماً** متنقّلاً بين السجون، حتى أُفرج عنه في **أغسطس ٢٠٠٤** — وكان يُوصف يومها بأنه **أقدم سجينٍ سياسيّ في سوريا**.',
      'He was arrested in **the mid-1970s**, a final-year chemistry student at Damascus University’s Faculty of Science, and sentenced to life. He spent **nearly thirty years** moved from one prison to another, until his release in **August 2004** — when he was described as **Syria’s longest-serving political prisoner**.'
    ) },
    { type: 'p', text: L(
      'وفي السجن تعلّم ما سيعيش منه: درس **الإنجليزية** سنتين في جامعة دمشق وهو محتجز، إلى أن نُقل إلى سجنٍ آخر فانقطع. وكتب هناك روايات، نشر ثلاثاً منها بعد خروجه: **«موت مشتهى»** (٢٠٠٥)، و**«غبار الطلع»** (٢٠٠٦)، و**«بقايا من زمن بابل»** (٢٠٠٨). وكما في سيرة الحارث النبهان، مترجم كتابَي النادي السابقين، بدأ الطريق إلى ترجمةٍ نقرؤها اليوم بلغةٍ تعلّمها رجلٌ خلف القضبان.',
      'And in prison he learned what he would live by: he studied **English** at Damascus University for two years while held, until a transfer to another prison cut it off. He wrote novels there, and published three after his release: **«Mawt Mushtaha»** (2005), **«Ghubar al-Tal’»** (2006) and **«Baqaya min Zaman Babil»** (2008). As with Al-Harith Al-Nabhan, translator of the club’s two earlier books, the road to a translation we read today began with a language a man learned behind bars.'
    ) },

    { type: 'h', text: L('مترجماً', 'As a translator') },
    { type: 'p', text: L(
      'بعد الإفراج صارت الترجمة عمله، ونقل إلى العربية في أقلّ من عشرين عاماً كتباً كثيرة، منها:',
      'After his release translation became his work, and in under twenty years he brought many books into Arabic, among them:'
    ) },
    { type: 'ul', items: [
      L('**«أين يكمن الخطأ؟»** لبرنارد لويس (٢٠٠٧).', '**What Went Wrong?** by Bernard Lewis (2007).'),
      L('**«اللوبي الإسرائيلي والسياسة الخارجية الأمريكية»** لجون ميرشايمر وستيفن والت (٢٠٠٧).', '**The Israel Lobby and U.S. Foreign Policy** by John Mearsheimer and Stephen Walt (2007).'),
      L('**«تاريخ الشكّ»** لجنيفر مايكل هيكت (٢٠١٤).', '**Doubt: A History** by Jennifer Michael Hecht (2014).'),
      L('**«الاقتصاد كما أشرحه لابنتي»** ليانيس فاروفاكيس (٢٠٢٠) — كتاب النادي.', '**Talking to My Daughter About the Economy** by Yanis Varoufakis (2020) — the club’s book.'),
      L('**«الغباء البشري»** لكارلو تشيبولا (٢٠٢٠).', '**The Basic Laws of Human Stupidity** by Carlo Cipolla (2020).'),
      L('**«العالم للبيع»** لخافيير بلاس وجاك فارتشي (٢٠٢١).', '**The World for Sale** by Javier Blas and Jack Farchy (2021).'),
      L('**«فلسفة الفوضى»** لسلافوي جيجيك (٢٠٢٢).', 'A book by Slavoj Žižek published in Arabic as «Falsafat al-Fawda» (2022).'),
    ] },
    { type: 'h', text: L('الطبعة التي نقرؤها', 'The edition we read') },
    { type: 'p', text: L(
      'صدرت **«الاقتصاد كما أشرحه لابنتي»** بترجمة عماد شيحة عن **دار الساقي** في بيروت عام **٢٠٢٠**، ورقياً وإلكترونياً معاً. وبعد عامٍ سافر إلى فرنسا للعلاج، وتوفّي في **باريس** في ٢٩ سبتمبر **٢٠٢٢** عن ثمانيةٍ وستين عاماً. أي أن النادي يقرأ واحدةً من آخر ما نقله إلى العربية.',
      '**Talking to My Daughter About the Economy** in Imad Shiha’s translation was published by **Dar Al Saqi** in Beirut in **2020**, in print and as an e-book. A year later he travelled to France for treatment, and he died in **Paris** on 29 September **2022**, aged sixty-eight. The club, in other words, is reading one of the last things he brought into Arabic.'
    ) },

    { type: 'callout', variant: 'note', title: L('ما الذي يعنيه هذا لنا؟', 'What does this mean for us?'), text: L(
      'الكتاب كُتب باليونانية، ونقرؤه بالعربية، والموقع يقارنه بالإنجليزية — ثلاث لغات، وفي كلّ عبورٍ اختيار. حين تبدو عبارةٌ غريبة، فالسؤال مشروعٌ مرّتين: مرّةً عن المؤلّف، ومرّةً عن الطريق الذي سلكته الجملة إلينا. والمقارنة جزءٌ من المتعة، لا طعنٌ في أحد.',
      'The book was written in Greek, we read it in Arabic, and this site compares it with the English — three languages, and a choice at every crossing. When a phrase reads oddly, the question is fair twice over: once about the author, and once about the road the sentence travelled to reach us. Comparing them is part of the pleasure, not an accusation against anyone.'
    ) },

    { type: 'sources', title: L('المصادر', 'Sources'), items: [
      { label: L('عماد شيحة — ويكيبيديا العربية', 'Imad Shiha — Arabic Wikipedia'),
        publisher: L('ويكيبيديا', 'Wikipedia'),
        url: 'https://ar.wikipedia.org/wiki/%D8%B9%D9%85%D8%A7%D8%AF_%D8%B4%D9%8A%D8%AD%D8%A9' },
      { label: L('خبر الإفراج عنه بعد قرابة ثلاثين عاماً، أغسطس ٢٠٠٤', 'Report of his release after almost thirty years, August 2004'),
        publisher: L('ذا ديلي ستار', 'The Daily Star'),
        url: 'https://archive.thedailystar.net/2004/08/05/d40805130988.htm' },
      { label: L('«سوريا: الإفراج عن سجينٍ سياسيّ…» — بيانٌ صحفيّ يذكره بين المحتجزين منذ ١٩٧٥', '“Syria: release of a political prisoner…” — a statement listing him among those held since 1975'),
        publisher: L('منظّمة العفو الدولية، أغسطس ٢٠٠٢', 'Amnesty International, August 2002'),
        url: 'https://www.amnesty.org/ar/wp-content/uploads/sites/9/2021/06/mde240382002ar.pdf' },
      { label: L('صفحة المترجم لدى ناشره', 'The translator’s page at his publisher'),
        publisher: L('المركز العربي للأبحاث ودراسة السياسات', 'Arab Center for Research and Policy Studies'),
        url: 'https://bookstore.dohainstitute.org/m-1086.aspx' },
    ] },
  ],
}
