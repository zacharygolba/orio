// @flow

import * as result from '../result'
import { createProducer, ProducerBase } from '../producer'
import type { Producer } from '../producer'

export default class ZipAdapter<T, U> extends ProducerBase<[T, U]> {
  producerA: Producer<T>
  producerB: Producer<U>
  size: ?number

  constructor(producerA: Producer<T>, producerB: Iterable<U>) {
    super()

    this.producerA = producerA
    this.producerB = createProducer(producerB)

    if (producerA === producerB) {
      const size = producerA.sizeHint()
      this.size = Number.isFinite(size) ? Math.floor(size / 2) : Infinity
    }
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
    if (this.size != null) {
      return this.size
    }

    return Math.min(this.producerA.sizeHint(), this.producerB.sizeHint())
  }
}
