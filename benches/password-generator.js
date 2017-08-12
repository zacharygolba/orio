// @flow

// import Lazy from 'lazy.js'
import { chain, range } from 'lodash'
import { Suite } from 'benchmark'

import * as iter from '../src'

const LENGTH = 48
const PATTERN = /[0-9A-Za-z]/

new Suite('Password Generator')
  .add('iter.js', () => {
    iter
      .range(32, 126)
      .map(String.fromCharCode)
      // .cycle()
      .filter(char => PATTERN.test(char))
      .filter(() => Math.floor(Math.random() * 7) === 3)
      .take(LENGTH)
      .join('')
  })
  // .add('lazy.js')
  .add('lodash', () => {
    // eslint-disable-next-line
    chain(range(32, 126))
      .map(String.fromCharCode)
      .filter(char => PATTERN.test(char))
      .filter(() => Math.floor(Math.random() * 7) === 3)
      .take(LENGTH)
      .join('')
      .value
  })
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
