const iter = require('iter.js')

exports.generate = ({ pattern, length }) => iter
  // start with a range of ascii char codes
  .range(32, 126)
  // convert the char code to a string
  .map(String.fromCharCode)
  // infinitely repeat this sequence
  .cycle()
  // filter chars that don't match the input pattern (default: [0-9A-Za-z])
  .filter(char => pattern.test(char))
  // filter by a random boolean for increased randomness
  .filter(() => Math.floor(Math.random() * 7) === 3)
  // take n number of values from this iterator (default: 48)
  .take(length)
  // collapse values of the iterator into a string
  .join('')
