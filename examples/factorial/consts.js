// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
const ouro = require('ouro-core')

exports.MAX_FACTORIAL = ouro
  .range()
  .map(n => [n, ouro.range(n, 1).product()])
  .takeWhile(([, f]) => f < Infinity)
  .map(([n]) => n)
  .last()
