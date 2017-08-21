// eslint-disable-next-line import/no-extraneous-dependencies
const iter = require('iter.js')

const consts = require('./consts')

Object.assign(exports, consts)

exports.factorial = function factorial(n) {
  const start = n === 0 ? 1 : Math.abs(n)
  return start > consts.MAX_FACTORIAL
    ? Infinity
    : iter.range(start, 1).product()
}
