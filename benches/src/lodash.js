// @flow

const _ = require('lodash')
const { MAX_FACTORIAL } = require('math-examples')

// const MAX_FACTORIAL /*: number */ = _
//   .range(1, Infinity)
//   .map(n => [n, _.range(n, 0).reduce((a, b) => a * b)])
//   .takeWhile(([, f]) => f < Infinity)
//   .map(([n]) => n)
//   .last()

function factorial(n /*: number */) /*: number */ {
  const start = n === 0 ? 1 : Math.abs(n)
  return start > MAX_FACTORIAL ? Infinity : _
    .chain(_.range(start, 1))
    .reduce((x, y) => x * y)
    .value()
}

function fizzBuzz() /*: Array<string> */ {
  return _
    .chain(_.range(1, 101))
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

function primes(amount /*: number */) /*: number */ {
  // return _
  //   .range(0, Infinity)
  //   .filter(num => !Lazy.range(num - 1, 1).some(div => num % div === 0))
  //   .take(amount)
  //   .toArray()
}

exports.MAX_FACTORIAL = MAX_FACTORIAL
exports.factorial = factorial
exports.fizzBuzz = fizzBuzz
exports.primes = primes
