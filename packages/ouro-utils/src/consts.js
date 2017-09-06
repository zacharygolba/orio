// @flow

import * as pkg from '../package.json'

// $FlowFixMe
let { asyncIterator } = Symbol

if (asyncIterator == null) {
  asyncIterator = Symbol('asyncIterator')
  Reflect.defineProperty(Symbol, 'asyncIterator', {
    value: asyncIterator,
  })
}

export const ASYNC_ITERATOR: Symbol = asyncIterator
export const VERSION: string = pkg.version
