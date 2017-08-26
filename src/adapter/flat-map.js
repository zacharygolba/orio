// @flow

import * as result from '../result'
import { createProducer, ProducerBase } from '../producer'
import type { Producer } from '../producer'

export default class FlatMapAdapter<T, U> extends ProducerBase<U> {
  child: ?Producer<U>
  fn: T => Iterable<U> | U
  parent: Producer<T>

  constructor(producer: Producer<T>, fn: T => Iterable<U> | U) {
    super()
    this.fn = fn
    this.parent = producer
  }

  next(): IteratorResult<U, void> {
    let next = this.child ? this.child.next() : result.done()

    while (next.done) {
      const nextChild = this.parent.next()

      if (nextChild.done) {
        return next
      }

      const child = createProducer(this.fn(nextChild.value))
      this.child = child
      next = child.next()
    }

    return next
  }

  sizeHint(): number {
    return Infinity
  }
}
