import { GAME_ART } from '../data/gameArt.js'

/*
 * The game's cover photograph, as the background of whatever it is put in — the
 * game's card on Home and the top of the game's setup screen. The container
 * supplies the box (`position: relative; overflow: hidden`) and a veil over it;
 * the styling is `.game-cover` in components.css.
 *
 * TWO PICTURES, ONE DOOR. `poster` lets a phone swap the wide strip for the
 * tall poster (pieces above, bare wood below for the words). A picture is
 * composed for the shape it is shown in — see scripts/generate-game-art.mjs for
 * what happened when one picture was asked to be both.
 *
 * Decorative: the words beside it say what it is. And if the file is ever
 * missing the <img> removes itself, leaving the container's own dark ground —
 * the degrade-don't-break rule the club's banner uses.
 */
export default function GameCover({ poster = false }) {
  return (
    <picture className="game-cover" aria-hidden>
      {poster && <source media="(max-width: 620px)" srcSet={GAME_ART.coverTall} />}
      <img src={GAME_ART.cover} alt="" loading="lazy" decoding="async"
        onError={(e) => { e.currentTarget.style.display = 'none' }} />
    </picture>
  )
}
