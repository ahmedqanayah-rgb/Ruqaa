/*
 * QUESTIONS WRITTEN BY THE CLUB'S MEMBERS — dealt with the site's own, from
 * every square of every board (2026-11-19: "use them in addition to ur
 * questions"). When one repeats a question the site already had, only the
 * better of the two is kept, whichever it is.
 *
 * Each writer has the names they may join a room under — either script; the
 * match forgives case, diacritics and a second word (engine.js → `writersHere`)
 * — and their questions, in the decks' own shapes (the rules for writing them
 * are at the top of books/why-we-sleep/game.js) plus their `book` and `kind`:
 *   mcq    { id, book, kind: 'mcq', q, opts: [the right one, three wrong], why }
 *   tf     { id, book, kind: 'tf', statement, isMyth, explain, hint }
 *   num    { id, book, kind: 'num', q, a, unit?, show?, dot?, why }
 *   who    { id, book, kind: 'who', name, clues: [three], why, img? }
 *   bluff  { id, book, kind: 'bluff', q (with a ____), truth, decoys: [2+], why }
 *   graph / face — as in a book's game.js. Not pictures (`pic`) for now.
 * Ids are the writer's, numbered: `maria-1`, `majd-1`, …
 *
 * A writer's own questions are rarely dealt in a room they are playing in, and
 * NOTHING IN THE GAME SAYS SO — no name, no credit on a card, no rule on the
 * rules page. That is on purpose.
 */
export const members = {
  maria: { names: ['Maria', 'ماريا'], questions: [] },
  majd: { names: ['Majd', 'مجد'], questions: [] },
}
