// @flow

const iter = require('iter.js')

module.exports = function primes(amount /*: number */) /*: number */ {
  return iter
    .range()
    .filter(num => !iter.range(num - 1, 2).some(div => num % div === 0))
    .take(amount)
    .collect()
}
