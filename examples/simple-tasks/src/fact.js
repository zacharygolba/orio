const iter = require('iter.js')

module.exports = function fact(num) {
  return iter
    .range(num === 0 ? 1 : Math.abs(num), 1)
    .product()
}
