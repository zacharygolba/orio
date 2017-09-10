// @flow

// $FlowFixMe
let { asyncIterator } = Symbol

if (asyncIterator == null) {
  asyncIterator = Symbol('asyncIterator')
}

export const ASYNC_ITERATOR: Symbol = asyncIterator
export const HAS_SET_IMMEDIATE: boolean = typeof setImmediate === 'function'
