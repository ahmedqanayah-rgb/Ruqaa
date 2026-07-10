// Aggregates all 122 studies from the book, in the book's own order, for the
// interactive Studies quiz. Split into four part-files by the book's four parts.
import part1 from './studies/part1.js'
import part2 from './studies/part2.js'
import part3 from './studies/part3.js'
import part4 from './studies/part4.js'

export const studies = [...part1, ...part2, ...part3, ...part4]

// Curated ranking by how surprising / important each study is (most first).
// Studies not listed keep the book's order after these.
export const interestOrder = [
  's68', 's48', 's55', 's60', 's90', 's91', 's73', 's102', 's84', 's5',
  's51', 's47', 's62', 's61', 's52', 's58', 's57', 's41', 's115', 's116',
  's112', 's113', 's109', 's86', 's78', 's77', 's1', 's2', 's6', 's31',
  's69', 's67', 's66', 's96', 's114', 's87', 's110', 's100', 's28', 's25',
  's18', 's89', 's63', 's64', 's8', 's46', 's121', 's106', 's92', 's75',
]
