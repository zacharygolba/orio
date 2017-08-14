const iter = require('iter.js')

const CODES = [...iter.range(32, 126)]

exports.generate = ({ pattern, length }) => iter
  .cycle(CODES)
  .map(String.fromCharCode)
  // filter chars that don't match the input pattern (default: [0-9A-Za-z])
  .filter(char => pattern.test(char))
  // filter by a random boolean for increased randomness
  .filter(() => Math.floor(Math.random() * 7) === 3)
  // take n number of values from this iterator (default: 48)
  .take(length)
  // collapse values of the iterator into a string
  .join('')
