// @flow

import { ProducerBase } from '../producer'

export default class FilterAdapter<T> extends ProducerBase<T> {
  fn: T => boolean
  producer: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => boolean) {
    super()
    this.fn = fn
    this.producer = producer
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (next.done || this.fn(next.value)) {
      return next
    }

    return this.next()
  }
}
