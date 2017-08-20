// @flow

const iter = require('iter.js')

const MAX_FACTORIAL /*: number */ = iter
  .range()
  .map(n => [n, iter.range(n, 1).product()])
  .takeWhile(([, f]) => f < Infinity)
  .map(([n]) => n)
  .last()

function factorial(n /*: number */) /*: number */ {
  const start = n === 0 ? 1 : Math.abs(n)
  return start > MAX_FACTORIAL ? Infinity : iter.range(start, 1).product()
}

exports.MAX_FACTORIAL = MAX_FACTORIAL
exports.factorial = factorial
