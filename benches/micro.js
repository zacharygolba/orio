/* @flow */

import { Suite } from 'benchmark'
import Lazy from 'lazy.js'
import { chain } from 'lodash'

import * as iter from '..'

const SOURCE = []

for (let i = 0; i < 250; i += 1) {
  SOURCE.push(i)
}

new Suite('Micro')
  .add('iter.js', () =>
    iter
      .from(SOURCE)
      .filter(num => num % 2 === 0)
      .map(String)
      .collect()
  )
  .add('lazy.js', () =>
    Lazy(SOURCE)
      .filter(num => num % 2 === 0)
      .map(String)
      .toArray()
  )
  .add('lodash', () =>
    chain(SOURCE)
      .filter(num => num % 2 === 0)
      .map(String)
      .value()
  )
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
