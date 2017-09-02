// @flow

import { ProducerBase } from '../producer'

export default class TapAdapter<T> extends ProducerBase<T> {
  fn: T => void
  producer: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => void) {
    super()
    this.fn = fn
    this.producer = producer
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (!next.done) {
      this.fn(next.value)
    }

    return next
  }
}
