// @flow

import * as result from '../result'
import { createProducer } from '../producer'
import type { Producer } from '../producer'

export default class ChainAdapter<T, U> implements Producer<T | U> {
  producerA: Producer<T>
  producerB: Producer<U>
  /*:: @@iterator: () => Iterator<T | U> */

  constructor(producerA: Producer<T>, producerB: Iterable<U> | U) {
    this.producerA = producerA
    this.producerB = createProducer(producerB)
  }

  // $FlowIgnore
  [Symbol.iterator](): Iterator<T | U> {
    return this
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
