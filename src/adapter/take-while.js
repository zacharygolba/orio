// @flow

import * as result from '../result'
import { ProducerBase } from '../producer'
import type { Producer } from '../producer'

export default class TakeWhileAdapter<T> extends ProducerBase<T> {
  fn: T => boolean
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => boolean) {
    super()
    this.fn = fn
    this.producer = producer
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
