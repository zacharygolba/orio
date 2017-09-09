/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */

const { Suite } = require('benchmark')
const { MAX_FACTORIAL, factorial } = require('factorial')
const fizzBuzz = require('fizz-buzz')
const primes = require('calculate-primes')

/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

const lazy = require('./lazy')
const lodash = require('./lodash')

/* eslint-disable no-console */

function onCycle({ target }) {
  console.log(String(target))
}

function onComplete() {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`)
}

/* eslint-enable no-console */

new Suite('Factorial')
  .add('orio', () => factorial(MAX_FACTORIAL))
  .add('lazy.js', () => lazy.factorial(MAX_FACTORIAL))
  .add('lodash', () => lodash.factorial(MAX_FACTORIAL))
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()

new Suite('FizzBuzz')
  .add('orio', fizzBuzz)
  .add('lazy.js', lazy.fizzBuzz)
  .add('lodash', lodash.fizzBuzz)
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()

new Suite('Primes')
  .add('orio', () => primes(100))
  .add('lazy.js', () => lazy.primes(100))
  // .add('lodash', lodash)
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
