const _ = require('lodash')

// eslint-disable-next-line import/no-extraneous-dependencies
const { MAX_FACTORIAL } = require('factorial')

function factorial(n) {
  const start = n === 0 ? 1 : Math.abs(n)
  return start > MAX_FACTORIAL
    ? Infinity
    : _.chain(_.range(start, 1)).reduce((x, y) => x * y).value()
}

function fizzBuzz() {
  return _.chain(_.range(1, 101))
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
    .value()
}

exports.factorial = factorial
exports.fizzBuzz = fizzBuzz
