const { Suite } = require('benchmark')
const { MAX_FACTORIAL, factorial } = require('factorial')
const fizzBuzz = require('fizz-buzz')
const primes = require('calculate-primes')

const lazy = require('./lazy')
const lodash = require('./lodash')

function onCycle({ target }) {
  console.log(String(target))
}

function onComplete() {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`)
}

new Suite('Factorial')
  .add('iter.js', () => factorial(MAX_FACTORIAL))
  .add('lazy.js', () => lazy.factorial(MAX_FACTORIAL))
  .add('lodash', () => lodash.factorial(MAX_FACTORIAL))
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()

new Suite('FizzBuzz')
  .add('iter.js', fizzBuzz)
  .add('lazy.js', lazy.fizzBuzz)
  .add('lodash', lodash.fizzBuzz)
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()

new Suite('Primes')
  .add('iter.js', () => primes(100))
  .add('lazy.js', () => lazy.primes(100))
  // .add('lodash', lodash)
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
