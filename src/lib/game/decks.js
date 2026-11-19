/*
 * Putting the decks together, and checking them.
 *
 * Pure, and used from two places that find the files differently: the game's
 * page (pages/Game.jsx, through `import.meta.glob`) and the simulator
 * (scripts/sim-game.mjs, through the file system).
 *
 * A book is in the game if its folder has a `game.js`; its myth-or-fact deck
 * becomes its «خرافة أم حقيقة؟» questions. `books` keeps the registry's order,
 * which is also the order of the board's three zones.
 *
 * The club's members' own questions (data/game/members.js) join their book's
 * decks, each marked with its writer (`by`), which only the deal reads
 * (engine.js → `writersHere`). `writers` is each writer's names.
 */
import { matchesName } from './match.js'

const KINDS = ['mcq', 'num', 'who', 'graph', 'bluff', 'tf', 'pic', 'face']
// What a member may write: every kind the deal takes from a book's deck — not
// the picture rounds, which are drawn on their own.
const MEMBER_KINDS = KINDS.filter((k) => k !== 'pic')

export function assembleDecks({ order, games, myths, luck, dares, members = {} }) {
  const books = []
  const byBook = {}
  const byId = {}
  for (const id of order) {
    const mod = games[id]
    const deck = mod?.gameDeck
    if (!deck?.mcq?.length) continue
    const entry = {
      icon: mod.gameIcon || '📖',
      mcq: [...deck.mcq],
      num: [...(deck.num || [])],
      who: [...(deck.who || [])],
      graph: [...(deck.graph || [])],
      bluff: [...(deck.bluff || [])],
      // Pictures carry their book: a "which book?" question needs to know it.
      pic: (deck.pic || []).map((item) => ({ ...item, book: id })),
      face: [...(deck.face || [])],
      // The myth deck has no ids of its own; its order in the file is stable
      // enough to be one. Its hints live in the game's deck, by statement.
      tf: (myths[id]?.mythOrFact || []).map((item, i) => ({ ...item, id: `${id}:tf:${i}`, hint: deck.tfHints?.[item.statement?.en] })),
      tfHints: deck.tfHints || {},
    }
    books.push(id)
    byBook[id] = entry
  }
  const writers = {}
  const strays = []
  for (const [by, member] of Object.entries(members)) {
    writers[by] = member.names || []
    for (const { book, kind, ...item } of member.questions || []) {
      if (!byBook[book] || !MEMBER_KINDS.includes(kind)) { strays.push(`${by}: ${item.id || 'a question'} is for "${book}"/"${kind}", which the game does not deal`); continue }
      byBook[book][kind].push({ ...item, by })
    }
  }
  for (const id of books) for (const kind of KINDS) for (const item of byBook[id][kind]) byId[item.id] = item
  for (const card of luck) byId[card.id] = card
  for (const dare of dares) byId[dare.id] = dare
  return { books, byBook, byId, luck, dares, writers, strays }
}

/* Every way a deck can be wrong that would only show up mid-game, on a call. */
export function lintDecks(decks) {
  const problems = []
  const seen = new Set()
  const both = (x) => !!x && typeof x.ar === 'string' && typeof x.en === 'string' && x.ar.trim() && x.en.trim()
  const check = (ok, msg) => { if (!ok) problems.push(msg) }
  const id = (item, where) => {
    check(typeof item.id === 'string' && item.id, `${where}: an item has no id`)
    check(!seen.has(item.id), `${where}: duplicate id ${item.id}`)
    seen.add(item.id)
  }
  for (const book of decks.books) {
    const D = decks.byBook[book]
    for (const item of D.mcq) {
      id(item, book)
      check(both(item.q) && both(item.why), `${item.id}: question/why must be bilingual`)
      check(Array.isArray(item.opts) && item.opts.length === 4 && item.opts.every(both), `${item.id}: needs exactly 4 bilingual options`)
    }
    for (const item of D.num) {
      id(item, book)
      check(both(item.q) && both(item.why), `${item.id}: question/why must be bilingual`)
      check(Number.isFinite(item.a), `${item.id}: needs a numeric answer`)
    }
    check(D.who.length === 0 || D.who.length >= 4, `${book}: «من هو؟» needs at least four people (has ${D.who.length})`)
    for (const item of D.who) {
      id(item, book)
      check(both(item.name) && both(item.why), `${item.id}: name/why must be bilingual`)
      check(Array.isArray(item.clues) && item.clues.length === 3 && item.clues.every(both), `${item.id}: needs exactly 3 bilingual clues`)
    }
    for (const item of D.graph) {
      id(item, book)
      check(both(item.q) && both(item.why), `${item.id}: question/why must be bilingual`)
      check(Array.isArray(item.opts) && item.opts.length === 4, `${item.id}: needs exactly 4 options`)
      check(item.opts.every((o) => both(o) || !!o.chart), `${item.id}: an option is neither text nor a chart`)
      check(!!item.chart || item.opts.every((o) => o.chart), `${item.id}: needs a chart`)
    }
    for (const item of D.bluff) {
      id(item, book)
      check(both(item.q) && both(item.why) && both(item.truth), `${item.id}: question/truth/why must be bilingual`)
      check(item.q.ar.includes('____') && item.q.en.includes('____'), `${item.id}: the question needs a ____ blank in both languages`)
      check(Array.isArray(item.decoys) && item.decoys.length >= 2 && item.decoys.every(both), `${item.id}: needs at least 2 bilingual decoys`)
    }
    for (const item of D.tf) {
      if (item.by) id(item, book) // a member's statement brings an id of its own
      check(both(item.statement) && typeof item.isMyth === 'boolean', `${item.id}: malformed myth-or-fact item`)
      // Every question has a hint to buy — a myth-or-fact statement's is written for it.
      check(both(item.hint), item.by ? `${item.id}: no hint` : `${item.id}: no hint (tfHints in ${book}/game.js, keyed by "${item.statement?.en?.slice(0, 40)}…")`)
      if (item.by) check(both(item.explain), `${item.id}: explain must be bilingual`)
    }
    for (const key of Object.keys(D.tfHints)) {
      check(D.tf.some((item) => item.statement?.en === key), `${book}: a myth-or-fact hint matches no statement: "${key.slice(0, 50)}…"`)
    }
    for (const item of D.pic) {
      id(item, book)
      check(item.kind === 'name' || item.kind === 'book', `${item.id}: kind must be 'name' or 'book'`)
      check(typeof item.img === 'string' && item.img.startsWith('./images/'), `${item.id}: needs an ./images/ picture`)
      check(Array.isArray(item.hints) && item.hints.length >= 1 && item.hints.length <= 3 && item.hints.every(both), `${item.id}: needs 1–3 bilingual hints`)
      check(both(item.why), `${item.id}: why must be bilingual`)
      if (item.q) check(both(item.q), `${item.id}: q must be bilingual`)
      if (item.kind === 'name') {
        check(both(item.name), `${item.id}: name must be bilingual`)
        check(Array.isArray(item.opts) && item.opts.length === 4 && item.opts.every(both), `${item.id}: needs exactly 4 bilingual options`)
        const aliases = [item.name?.ar, item.name?.en, ...(item.aliases || [])]
        // The checker must accept the answer in both languages…
        check(matchesName(item.name.ar, aliases) && matchesName(item.name.en, aliases), `${item.id}: the checker rejects its own name`)
        // …and must never accept a wrong option as right.
        for (const opt of (item.opts || []).slice(1)) {
          check(!matchesName(opt.ar, aliases) && !matchesName(opt.en, aliases), `${item.id}: the wrong option "${opt.en}" would be marked right`)
        }
      }
    }
  }
  /* «من هذا؟»: every face needs three others of the same sex to stand beside
     it, and no person may be in two books' decks (the same face twice). */
  const faces = decks.books.flatMap((book) => decks.byBook[book].face.map((item) => ({ ...item, book })))
  for (const item of faces) {
    id(item, item.book)
    check(typeof item.img === 'string' && item.img.startsWith('./images/'), `${item.id}: needs an ./images/ picture`)
    check(both(item.name) && both(item.tag) && both(item.about), `${item.id}: name/tag/about must be bilingual`)
    check(faces.filter((x) => x.img === item.img).length === 1, `${item.id}: the same picture is in more than one face`)
    check(faces.filter((x) => x.id !== item.id && !!x.f === !!item.f).length >= 3, `${item.id}: fewer than three other ${item.f ? 'women' : 'men'} to offer beside them`)
  }

  const EFFECTS = ['move', 'others', 'all', 'again', 'skip', 'steal', 'swap', 'loan']
  for (const card of decks.luck) {
    id(card, 'luck')
    check(both(card.text), `${card.id}: text must be bilingual`)
    check(EFFECTS.includes(card.effect?.kind), `${card.id}: unknown effect ${card.effect?.kind}`)
    check(!card.book || decks.books.includes(card.book), `${card.id}: unknown book ${card.book}`)
  }
  for (const dare of decks.dares) {
    id(dare, 'dares')
    check(both(dare.text), `${dare.id}: text must be bilingual`)
    check(!dare.book || decks.books.includes(dare.book), `${dare.id}: unknown book ${dare.book}`)
  }
  /* The members' own questions: each must land in a book's deck, and each
     writer must have a name to be recognised by at the table. */
  for (const stray of decks.strays || []) problems.push(stray)
  for (const [by, names] of Object.entries(decks.writers || {})) {
    check(Array.isArray(names) && names.some((n) => typeof n === 'string' && n.trim()), `${by}: a writer needs a name to be recognised by`)
  }
  return problems
}
