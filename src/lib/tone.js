/*
 * A BOOK'S COLOUR WORLD, as CSS custom properties for a component's root.
 *
 * Every book carries a `tone` in its own index.js — `{ from, to, spark }`, read
 * off its cover: midnight and a moon for «لماذا ننام», the neon sphere for
 * «تركيزنا المسلوب», the title's red for «الاقتصاد كما أشرحه لابنتي». It rides in
 * the skeleton (data/skeleton.js), so Home and the game can colour a book that
 * has not been loaded.
 *
 * Spread the result into `style` and the CSS reads `--tone`, `--tone-2` and
 * `--tone-spark`; tokens.css gives all three a camel default, so a book with no
 * `tone` simply looks like the club.
 *
 * NOT `--accent`. The figures inside a book use the accent against `--danger`,
 * `--success` and the rest as a tuned set — a red accent in the economics book
 * would make "accent" and "danger" the same colour in a chart where they mean
 * opposite things. A tone colours surfaces a book OWNS (its poster, its header,
 * its game tiles), never the controls inside its pages.
 */
export function toneStyle(book) {
  const tone = book?.tone
  if (!tone) return undefined
  return { '--tone': tone.from, '--tone-2': tone.to, '--tone-spark': tone.spark }
}
