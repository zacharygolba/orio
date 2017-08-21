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
    let next = this.producer.next()

    while (!next.done && !this.fn(next.value)) {
      next = this.producer.next()
    }

    return next
  }

  sizeHint(): number {
    return this.producer.sizeHint()
  }
}
