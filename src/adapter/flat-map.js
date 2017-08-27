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

    if (next.done) {
      next = this.parent.next()

      if (next.done) {
        return next
      }

      this.child = createProducer(this.fn(next.value))
      return this.next()
    }

    return next
  }

  sizeHint(): number {
    return Infinity
  }
}
