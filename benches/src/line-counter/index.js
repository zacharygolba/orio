// @flow

import * as path from 'path'

import { Suite } from 'benchmark'
import * as lines from 'line-counter'

import * as lazy from './lazy'
// import lodash from './lodash'

const FILTER = /.+/
const PATTERN = /\.js$/
const SRC = path.join(__dirname, '..', 'src')

new Suite('Line Counter')
  .add('iter.js', () => {
    lines.count({
      directory: SRC,
      pattern: PATTERN,
      filter: FILTER,
    })
  })
  .add('lazy.js', () => {
    lazy.count({
      directory: SRC,
      pattern: PATTERN,
      filter: FILTER,
    })
  })
  // .add('lodash', lodash)
  .on('cycle', ({ target }) => {
    console.log(String(target))
  })
  .on('complete', function _() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
