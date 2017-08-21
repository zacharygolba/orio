/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */

const Lazy = require('lazy.js')
const { MAX_FACTORIAL } = require('factorial')

/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

function factorial(n) {
  const start = n === 0 ? 1 : Math.abs(n)
  return start > MAX_FACTORIAL
    ? Infinity
    : Lazy.range(start, 1).reduce((x, y) => x * y)
}

function fizzBuzz() {
  return Lazy.range(1, 101)
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
    .toArray()
}

function isComposite(n) {
  const abs = Math.abs(n)

  if (abs === 0 || abs === 1 || abs === 2) {
    return false
  }

  return Lazy.range(abs - 1, 2).some(div => abs % div === 0)
}

function primes(size) {
  return Lazy.range(0, Infinity)
    .filter(n => !isComposite(n))
    .take(size)
    .toArray()
}

exports.factorial = factorial
exports.fizzBuzz = fizzBuzz
exports.primes = primes
