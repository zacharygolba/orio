// @flow

const Lazy = require('lazy.js')

const MAX_FACTORIAL /*: number */ = Lazy
  .range(1, Infinity)
  .map(n => [n, Lazy.range(n, 0).reduce((a, b) => a * b)])
  .takeWhile(([, f]) => f < Infinity)
  .map(([n]) => n)
  .last()

function factorial(n /*: number */) /*: number */ {
  const start = n === 0 ? 1 : Math.abs(n)
  return start > MAX_FACTORIAL ? Infinity : Lazy.range(start, 1).reduce((x, y) => x * y)
}

function fizzBuzz() /*: Lazy */ {
  return Lazy
    .range(1, 101)
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
}

function primes(amount /*: number */) /*: number */ {
  return Lazy
    .range(0, Infinity)
    .filter(num => !Lazy.range(num - 1, 1).some(div => num % div === 0))
    .take(amount)
}

exports.MAX_FACTORIAL = MAX_FACTORIAL
exports.factorial = factorial
exports.fizzBuzz = fizzBuzz
exports.primes = primes
