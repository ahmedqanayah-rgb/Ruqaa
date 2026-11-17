/*
 * The game's pictures (public/images/game/). One world, painted five times:
 *
 *   boards  one board per book — a painted map, 3 wide by 4 tall, with one
 *           winding road across it (the valley of sleep, the city of
 *           distraction, the island market). A game's road runs through the
 *           boards of the books in play, and the screen slides from one to the
 *           next. The squares are NOT in the pictures: the page draws them over
 *           each road (see lib/game/board.js and components/game/Board.jsx). A
 *           board is also the band across the top of a round's card, cut from
 *           where the turn is being played — one download, not two.
 *   board   the first map, which held all three books on one board; it stays
 *           as the game's poster on a phone (GameCover).
 *   cover   the game's door on a wide screen (Home's card, the game's first
 *           screen): the same world painted as a banner, the night sky on the
 *           left left empty for the words. Mirrored in Arabic (`.game-cover`).
 *
 * All were painted with Nano Banana Pro from a sketch of the road; the script
 * and its lessons are scripts/generate-game-board.mjs, and the full-size
 * masters stay outside the repo in ../game-art-wip/masters/.
 *
 * NONE CONTAINS A WORD, a letter or a number — which is what lets the cover be
 * mirrored and a board be cut into bands without cutting a word in half.
 *
 * The paths are written out literally because scripts/check-image-refs.mjs
 * finds a shipped file by its NAME in the source.
 */
export const GAME_ART = {
  board: './images/game/board.webp',
  cover: './images/game/cover.webp',
  boards: {
    'why-we-sleep': './images/game/board-sleep.webp',
    'stolen-focus': './images/game/board-focus.webp',
    'talking-to-my-daughter': './images/game/board-market.webp',
  },
}
