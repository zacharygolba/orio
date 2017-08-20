// @flow

import * as bounds from '../bounds'
import * as result from '../result'
import { createProducer } from '../producer'
import type { Producer } from '../producer'
import type { IntoIterator } from '../types'

export default class ChainAdapter<T, U> implements Producer<T | U> {
  producerA: Producer<T>
  producerB: Producer<U>
  /*:: @@iterator: () => Iterator<T | U> */

  constructor(producerA: Producer<T>, producerB: IntoIterator<U>) {
    this.producerA = producerA
    this.producerB = createProducer(producerB)
  }

  // $FlowFixMe
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
    return bounds.sizeOf(this.producerA) + bounds.sizeOf(this.producerB)
  }
}
