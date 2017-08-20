// @flow

import type { Producer } from '../types'

export default class SetProducer<T> implements Producer<T> {
  size: number
  source: Iterator<T>
  /*:: @@iterator: () => Iterator<T> */

  constructor(source: Set<T>) {
    this.size = source.size
    this.source = source.values()
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return this.size
  }
}
