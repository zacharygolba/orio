// eslint-disable-next-line import/no-extraneous-dependencies
const iter = require('iter.js')

module.exports = function fizzBuzz() {
  return iter
    .range(1, 100)
    .map(n => {
      if (n % 15 === 0) {
        return 'FizzBuzz'
      } else if (n % 5 === 0) {
        return 'Buzz'
      } else if (n % 3 === 0) {
        return 'Fizz'
      }
      return n.toString()
    })
    .collect()
}
