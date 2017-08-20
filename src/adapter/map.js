// @flow

import * as result from '../result'
import type { Producer } from '../producer'

export default class MapAdapter<T, U> implements Producer<U> {
  fn: (T) => U
  producer: Producer<T>
  /*:: @@iterator: () => Iterator<U> */

  constructor(producer: Producer<T>, fn: (T) => U) {
    this.fn = fn
    this.producer = producer
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<U> {
    return this
  }

  next(): IteratorResult<U, void> {
    const next = this.producer.next()
    return next.done ? next : result.next(this.fn(next.value))
  }

  sizeHint(): number {
    return this.producer.sizeHint()
  }
}
