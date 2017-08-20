// @flow

const { Suite } = require('benchmark')
const iter = require('iter.js')
const Lazy = require('lazy.js')
const tasks = require('simple-tasks')

const lazy = require('./lazy')
// const lodash = require('./lodash')

new Suite('Factorial')
  .add('iter.js', () => tasks.factorial(tasks.MAX_FACTORIAL))
  .add('lazy.js', () => lazy.factorial(lazy.MAX_FACTORIAL))
  // .add('lodash', lodash)
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()

new Suite('FizzBuzz')
  .add('iter.js', () => tasks.fizzBuzz().collect())
  .add('lazy.js', () => lazy.fizzBuzz().toArray())
  // .add('lodash', lodash)
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()

new Suite('Map Filter Reduce')
  .add('iter.js', () => {
    iter
      .range(1, 1000)
      .filter(num => num % 2)
      .reduce((acc, num) => acc + num, 0)
  })
  .add('lazy.js', () => {
    Lazy
      .range(1, 1000)
      .filter(num => num % 2)
      .reduce((acc, num) => acc + num, 0)
  })
  // .add('lodash', lodash)
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
