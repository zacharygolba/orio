// @flow

const assert = require('assert')

const { Suite } = require('benchmark')
const iter = require('iter.js')
const Lazy = require('lazy.js')
const math = require('math-examples')

const lazy = require('./lazy')
const lodash = require('./lodash')

assert.equal(math.MAX_FACTORIAL, lazy.MAX_FACTORIAL)
assert.equal(math.MAX_FACTORIAL, lodash.MAX_FACTORIAL)

new Suite('Factorial')
  .add('iter.js', () => math.factorial(math.MAX_FACTORIAL))
  .add('lazy.js', () => lazy.factorial(lazy.MAX_FACTORIAL))
  .add('lodash', () => lodash.factorial(lodash.MAX_FACTORIAL))
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()

new Suite('FizzBuzz')
  .add('iter.js', math.fizzBuzz)
  .add('lazy.js', lazy.fizzBuzz)
  .add('lodash', lodash.fizzBuzz)
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()

new Suite('Primes')
  .add('iter.js', () => math.primes(100))
  .add('lazy.js', () => lazy.primes(100))
  // .add('lodash', lodash)
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
