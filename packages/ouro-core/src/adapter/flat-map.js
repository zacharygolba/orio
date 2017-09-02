// @flow

import * as result from '../result'
import { createProducer, ProducerBase } from '../producer'

export default class FlatMapAdapter<T, U> extends ProducerBase<U> {
  child: ?Iterator<U>
  fn: T => Iterable<U> | U
  parent: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => Iterable<U> | U) {
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
}
