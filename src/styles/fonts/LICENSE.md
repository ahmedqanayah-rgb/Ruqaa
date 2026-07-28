# Font licences

The `.woff2` files in this directory are **not** our work. They are redistributed here
under the **SIL Open Font License 1.1**, which permits bundling and redistribution
(including as part of a larger work, and commercially) provided the fonts are not sold on
their own and this notice travels with them.

| Font | Copyright | Licence |
|---|---|---|
| **IBM Plex Sans Arabic** | Copyright © 2017 IBM Corp. | [OFL-1.1](https://github.com/IBM/plex/blob/master/LICENSE.txt) |
| **Inter** | Copyright © 2016 The Inter Project Authors | [OFL-1.1](https://github.com/rsms/inter/blob/master/LICENSE.txt) |

Full licence text: <https://openfontlicense.org/>

The files are subsets cut by Google Fonts and fetched by `scripts/fetch-fonts.mjs` — see
that script for which subsets and why. Subsetting is explicitly allowed by the OFL; the
Reserved Font Names ("IBM Plex", "Inter") are unchanged, so the `font-family` values in
`fonts.css` must stay as they are.
