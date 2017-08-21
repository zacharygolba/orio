// eslint-disable-next-line import/no-extraneous-dependencies
const iter = require('iter.js')

exports.MAX_FACTORIAL = iter
  .range()
  .map(n => [n, iter.range(n, 1).product()])
  .takeWhile(([, f]) => f < Infinity)
  .map(([n]) => n)
  .last()
