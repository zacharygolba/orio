// @flow

import { ProducerBase } from '../producer'
import type { Producer } from '../producer'

export default class TapAdapter<T> extends ProducerBase<T> {
  fn: T => void
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => void) {
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

  sizeHint(): number {
    return this.producer.sizeHint()
  }
}
