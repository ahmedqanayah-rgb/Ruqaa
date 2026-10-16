/*
 * EVERY BOOK, IN FULL — for Node scripts and the generators only.
 *
 * ⚠ The app must never import this file, directly or through anything else.
 * It statically imports all three books' content, so one import from a
 * component puts ~1 MB of text back into the entry chunk — exactly what
 * data/books.js exists to prevent (each book now loads only when it is opened).
 * Nothing breaks if it happens; the first page just gets slow again. After any
 * import change, `npm run build` and check that the entry `index-*.js` is not
 * ~450 kB gzipped again.
 *
 * Users: scripts/check-*.mjs, scripts/gen-image-dims.mjs, scripts/hero-preview.mjs,
 * and scripts/gen-book-skeletons.mjs, which derives the two generated files the
 * app does import (data/bookSkeletons.js, data/searchData.js).
 *
 * Add a book here AND it is picked up everywhere: the generator writes its
 * skeleton, data/books.js finds its folder by glob, and the scripts walk it.
 */
import { whyWeSleep } from './books/why-we-sleep/index.js'
import { stolenFocus } from './books/stolen-focus/index.js'
import { talkingToMyDaughter } from './books/talking-to-my-daughter/index.js'

export const books = [whyWeSleep, stolenFocus, talkingToMyDaughter]
