// @flow

import * as result from '../result'
import { createProducer, ProducerBase } from '../producer'
import type { Producer } from '../producer'

export default class ChainAdapter<T, U> extends ProducerBase<T | U> {
  producerA: Producer<T>
  producerB: Producer<U>

  constructor(producerA: Producer<T>, producerB: Iterable<U> | U) {
    super()
    this.producerA = producerA
    this.producerB = createProducer(producerB)
  }

  next(): IteratorResult<T | U, void> {
    let next = this.producerA.next()

    if (next.done) {
      next = this.producerB.next()
    }

    return next.done ? next : result.next(next.value)
  }

  sizeHint(): number {
    return this.producerA.sizeHint() + this.producerB.sizeHint()
  }
}
