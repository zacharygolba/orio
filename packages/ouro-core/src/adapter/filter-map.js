// @flow

import * as result from '../result'
import { ProducerBase } from '../producer'

export default class FilterMapAdapter<T, U> extends ProducerBase<U> {
  fn: T => ?U
  producer: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => ?U) {
    super()
    this.fn = fn
    this.producer = producer
  }

  next(): IteratorResult<U, void> {
    const next = this.producer.next()

    if (next.done) {
      return next
    }

    const value = this.fn(next.value)

    if (value == null) {
      return this.next()
    }

    return result.next(value)
  }
}
