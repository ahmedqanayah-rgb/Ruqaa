import { GAME_ART } from '../data/gameArt.js'

/*
 * The game's painted cover, as the background of whatever it is put in — the
 * game's card on Home and the top of the game's first screen. The container
 * supplies the box (`position: relative; overflow: hidden`) and a veil over it;
 * the styling is `.game-cover` in components.css.
 *
 * ONE WORLD, TWO FRAMES. On a wide screen it is the banner (`cover`); with
 * `poster`, a phone gets the board itself instead, which is already a tall
 * picture — and the same file the game is about to download anyway.
 *
 * Decorative: the words beside it say what it is. And if the file is ever
 * missing the <img> removes itself, leaving the container's own dark ground —
 * the degrade-don't-break rule the club's banner uses.
 */
export default function GameCover({ poster = false }) {
  return (
    <picture className={`game-cover ${poster ? 'has-poster' : ''}`} aria-hidden>
      {poster && <source media="(max-width: 620px)" srcSet={GAME_ART.board} />}
      <img src={GAME_ART.cover} alt="" loading="lazy" decoding="async"
        onError={(e) => { e.currentTarget.style.display = 'none' }} />
    </picture>
  )
}
