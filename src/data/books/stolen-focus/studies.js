// Aggregates the curated Stolen Focus studies (60) for the interactive quiz,
// in the book's thematic order. Split across three part-files by cause group.
import part1 from './studies/part1.js'
import part2 from './studies/part2.js'
import part3 from './studies/part3.js'

export const studies = [...part1, ...part2, ...part3]

// Curated ranking by how surprising / important / strange each finding is
// (most first). Studies not listed keep the book's order after these.
export const interestOrder = [
  'sf4', 'sf61', 'sf1', 'sf30', 'sf24', 'sf16', 'sf17', 'sf3', 'sf28', 'sf35', 'sf19',
  'sf40', 'sf44', 'sf9', 'sf8', 'sf18', 'sf26', 'sf23', 'sf5', 'sf2', 'sf43',
  'sf6', 'sf21', 'sf7', 'sf27', 'sf31', 'sf11', 'sf42', 'sf54', 'sf29', 'sf52',
  'sf34', 'sf39', 'sf14', 'sf25', 'sf51', 'sf46', 'sf33', 'sf41', 'sf12', 'sf10',
]
