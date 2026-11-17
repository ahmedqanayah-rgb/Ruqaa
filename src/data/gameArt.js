/*
 * The game's pictures (public/images/game/). Two paintings, one world:
 *
 *   board   the board itself — a painted map, 3 wide by 4 tall, with one
 *           winding road from the Valley of Sleep to the Island Market. The
 *           squares are NOT in the picture: the page draws them over the road
 *           (see lib/game/board.js and components/game/Board.jsx). It doubles
 *           as the game's poster on a phone, and its regions are the bands
 *           across the round cards (`zoneBand` below) — so a phone that opens
 *           the game downloads one picture, not twelve.
 *   cover   the game's door on a wide screen (Home's card, the game's first
 *           screen): the same world painted as a banner, the night sky on the
 *           left left empty for the words. Mirrored in Arabic (`.game-cover`).
 *
 * Both were painted with Nano Banana Pro from a sketch of the road; the script
 * and its lessons are scripts/generate-game-board.mjs, and the full-size
 * masters stay outside the repo in ../game-art-wip/masters/.
 *
 * NEITHER CONTAINS A WORD, a letter or a number — which is what lets the cover
 * be mirrored and the board be cut into bands without cutting a word in half.
 *
 * The paths are written out literally because scripts/check-image-refs.mjs
 * finds a shipped file by its NAME in the source.
 */
export const GAME_ART = {
  board: './images/game/board.webp',
  cover: './images/game/cover.webp',
}

/* Where each zone of the board sits in the picture, as a CSS
   `background-position` y (0% top … 100% bottom): the valley at the foot, the
   city in the middle, the market and the sea at the top. */
export const zoneBand = ['82%', '46%', '17%']
