// @flow

import type { Producer } from './types'

export default class UnboundProducer<T> implements Producer<T> {
  source: Iterator<T>
  /*:: @@iterator: () => Iterator<T> */

  constructor(source: Iterable<T>) {
    // $FlowFixMe
    this.source = source[Symbol.iterator]()
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return Infinity
  }
}
