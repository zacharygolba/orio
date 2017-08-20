// @flow

import * as bounds from '../bounds'
import type { Producer } from '../producer'

export default class TapAdapter<T> implements Producer<T> {
  fn: (T) => void
  producer: Producer<T>
  /*:: @@iterator: () => Iterator<T> */

  constructor(producer: Producer<T>, fn: (T) => void) {
    this.fn = fn
    this.producer = producer
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (!next.done) {
      this.fn(next.value)
    }

    return next
  }

  sizeHint(): number {
    return bounds.sizeOf(this.producer)
  }
}
