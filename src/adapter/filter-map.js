// @flow

import * as result from '../result'
import type { Producer } from '../producer'

export default class FilterMapAdapter<T, U> implements Producer<U> {
  fn: (T) => ?U
  producer: Producer<T>
  /*:: @@iterator: () => Iterator<U> */

  constructor(producer: Producer<T>, fn: (T) => ?U) {
    this.fn = fn
    this.producer = producer
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<U> {
    return this
  }

  next(): IteratorResult<U, void> {
    let value

    while (value == null) {
      const next = this.producer.next()

      if (next.done) {
        return next
      }

      value = this.fn(next.value)
    }

    return result.next(value)
  }

  sizeHint(): number {
    return this.producer.sizeHint()
  }
}
