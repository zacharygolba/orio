// @flow

import Lazy from 'lazy.js'
import { chain } from 'lodash'
import { Suite } from 'benchmark'

import * as iter from '..'

const CODES = [...iter.range(32, 126)]
const LENGTH = 48
const PATTERN = /[0-9A-Za-z]/

new Suite('Password Generator')
  .add('iter.js', () =>
    iter
      // .cycle(CODES)
      .from(CODES)
      .map(String.fromCodePoint)
      .filter(char => PATTERN.test(char))
      .filter(() => Math.floor(Math.random() * 7) === 3)
      // .take(LENGTH)
      .join('')
  )
  .add('lazy.js', () =>
    Lazy(CODES)
      .map(String.fromCodePoint)
      .filter(char => PATTERN.test(char))
      .filter(() => Math.floor(Math.random() * 7) === 3)
      .take(LENGTH)
      .join('')
  )
  .add('lodash', () =>
    chain(CODES)
      .map(String.fromCodePoint)
      .filter(char => PATTERN.test(char))
      .filter(() => Math.floor(Math.random() * 7) === 3)
      .take(LENGTH)
      .join('')
      .value()
  )
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
