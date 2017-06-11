/* @flow */

import { Suite } from 'benchmark'
import Lazy from 'lazy.js'
import { chain } from 'lodash'

import * as iter from '../src'

import { handleStart, handleComplete } from './utils'

const SOURCE = []

for (let i = 0; i < 250; i += 1) {
  SOURCE.push(i)
}

new Suite('Map')
  .add('iter', () =>
    iter.from(SOURCE)
      .filter(num => num % 2 === 0)
      .map(String)
      .collect()
  )
  .add('lodash', () =>
    chain(SOURCE)
      .filter(num => num % 2 === 0)
      .map(String)
      .value()
  )
  .add('Lazy', () =>
    Lazy(SOURCE)
      .filter(num => num % 2 === 0)
      .map(String)
      .toArray()
  )
  .on('start', handleStart)
  .on('complete', handleComplete)
  .run({
    async: true,
  })

