// @flow

const iter = require('iter.js')

module.exports = function fibonacci(limit /*: number */) /*: number */ {
  iter
    .range(0, limit)
    .zip(iter.range(1, Infinity))
    .tap(pair => console.log('before', pair))
    .map(([a, b]) => [b, a + b])
    .tap(pair => console.log('after', pair))
    .map(([a, b]) => a + b)
    .forEach(num => {
      console.log(num)
    })
}
