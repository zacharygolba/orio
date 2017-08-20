// @flow

const iter = require('iter.js')

const divisibleBy = x => y => x % y === 0

module.exports = function primes(amount /*: number */) /*: number */ {
  return iter
    .range(0, Infinity)
    .filter(num => !iter.range(num - 1, 2).some(div => num % div === 0))
    .take(amount)
    .collect()
}
