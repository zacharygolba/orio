const { EOL } = require('os')

const iter = require('iter.js')

const { LENGTH, PATTERN } = require('./consts')

module.exports = function generate(length = LENGTH, pattern = PATTERN) {
  return iter
    // create an inifinitely repeating iterator of all valid chars [0-9A-Za-z]
    .cycle(
      iter.from()
        .chain(iter.chars('0', '9'))
        .chain(iter.chars('A', 'Z'))
        .chain(iter.chars('a', 'z'))
        .collect()
    )
    // filter chars that don't match the input pattern (default: [0-9A-Za-z])
    .filter(char => pattern.test(char))
    // filter by a random boolean for increased randomness
    .filter(() => Math.floor(Math.random() * 7) === 3)
    // take n number of values from this iterator (default: 48)
    .take(length)
    // collect into a string
    .join('')
}
