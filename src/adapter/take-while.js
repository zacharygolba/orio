// @flow

import * as result from '../result'
import type { Producer } from '../producer'

export default class TakeWhileAdapter<T> implements Producer<T> {
  fn: (T) => boolean
  producer: Producer<T>
  /*:: @@iterator: () => Iterator<T> */

  constructor(producer: Producer<T>, fn: (T) => boolean) {
    this.fn = fn
    this.producer = producer
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (next.done || !this.fn(next.value)) {
      return result.done()
    }

    return next
  }

  sizeHint(): number {
    return this.producer.sizeHint()
  }
}
