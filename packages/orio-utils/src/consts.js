// @flow

// $FlowFixMe
let { asyncIterator } = Symbol

if (asyncIterator == null) {
  asyncIterator = Symbol('asyncIterator')
}

export const ASYNC_ITERATOR: Symbol = asyncIterator
