// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
const ouro = require('ouro-core')

const { LENGTH, PATTERN } = require('./consts')

module.exports = function generate(length = LENGTH, pattern = PATTERN) {
  return (
    ouro
      // create an inifinitely repeating iterator of all valid chars [0-9A-Za-z]
      .cycle(
        ouro
          .of()
          .chain(ouro.chars('0', '9'))
          .chain(ouro.chars('A', 'Z'))
          .chain(ouro.chars('a', 'z'))
          .collect(),
      )
      // filter chars that don't match the input pattern (default: [0-9A-Za-z])
      .filter(char => pattern.test(char))
      // filter by a random boolean for increased randomness
      .filter(() => Math.floor(Math.random() * 7) === 3)
      // take n number of values from this iterator (default: 48)
      .take(length)
      // collect into a string
      .join('')
  )
}
