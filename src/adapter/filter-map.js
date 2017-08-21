// @flow

import * as result from '../result'
import { ProducerBase } from '../producer'
import type { Producer } from '../producer'

export default class FilterMapAdapter<T, U> extends ProducerBase<U> {
  fn: T => ?U
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => ?U) {
    super()
    this.fn = fn
    this.producer = producer
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
