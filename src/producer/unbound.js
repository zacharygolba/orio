// @flow

import type { Producer } from './'

export default class UnboundProducer<T> implements Producer<T> {
  source: Iterator<T>
  /*:: @@iterator: () => Iterator<T> */

  constructor(source: Iterable<T>) {
    // $FlowIgnore
    this.source = source[Symbol.iterator]()
  }

  // $FlowIgnore
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
