// @flow

import { ProducerBase } from '../producer'
import type { Producer } from '../producer'

export default class FilterAdapter<T> extends ProducerBase<T> {
  fn: T => boolean
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => boolean) {
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

  sizeHint(): number {
    return this.producer.sizeHint()
  }
}
