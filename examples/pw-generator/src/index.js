// @flow

const iter = require('iter.js')

/*::
type Options = {
  length: number,
  pattern: RegExp,
}
*/

const CHARS /*: Array<string> */ = iter
  .range(0, 9)
  .map(String)
  .chain(iter.range('A', 'Z'))
  .chain(iter.range('a', 'z'))
  .collect()

module.exports = function main({ pattern, length } /*: Options */) /*: Iter<string> */ {
  return iter
    // create an inifinitely repeating iterator of the `CODES` array
    .cycle(CHARS)
    // filter chars that don't match the input pattern (default: [0-9A-Za-z])
    .filter(char => pattern.test(char))
    // filter by a random boolean for increased randomness
    .filter(() => Math.floor(Math.random() * 7) === 3)
    // take n number of values from this iterator (default: 48)
    .take(length)
    .join('')
}
