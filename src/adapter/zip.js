// @flow

import * as bounds from '../bounds'
import * as result from '../result'
import { createProducer } from '../producer'
import type { Producer } from '../producer'
import type { IntoIterator } from '../types'

export default class ZipAdapter<T, U> implements Producer<[T, U]> {
  producerA: Producer<T>
  producerB: Producer<U>
  size: ?number
  /*:: @@iterator: () => Iterator<[T, U]> */

  constructor(producerA: Producer<T>, producerB: IntoIterator<U>) {
    this.producerA = producerA
    this.producerB = createProducer(producerB)

    if (producerA === producerB) {
      const size = bounds.sizeOf(producerA)
      this.size = Number.isFinite(size) ? Math.floor(size / 2) : Infinity
    }
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<[T, U]> {
    return this
  }

  next(): IteratorResult<[T, U], void> {
    const nextA = this.producerA.next()
    const nextB = this.producerB.next()

    if (nextA.done || nextB.done) {
      return result.done()
    }

    return result.next([nextA.value, nextB.value])
  }

  sizeHint(): number {
    return this.size || Math.min(bounds.sizeOf(this.producerA), bounds.sizeOf(this.producerB))
  }
}
