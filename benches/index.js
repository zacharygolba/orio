/* @flow */

import { println } from './utils'

import './micro'

process.once('beforeExit', () => {
  println()
})
