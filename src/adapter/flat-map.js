// @flow

import * as result from '../result'
import { createProducer } from '../producer'
import type { Producer } from '../producer'
import type { IntoIterator } from '../types'

export default class FlatMapAdapter<T, U> implements Producer<U> {
  child: ?Producer<U>
  fn: (T) => IntoIterator<U>
  parent: Producer<T>
  size: number
  /*:: @@iterator: () => Iterator<U> */

  constructor(producer: Producer<T>, fn: (T) => IntoIterator<U>) {
    this.fn = fn
    this.parent = producer
    this.size = this.parent.sizeHint()
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<U> {
    return this
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
      this.size += child.sizeHint() - 1

      next = child.next()
    }

    return next
  }

  sizeHint(): number {
    return this.size
  }
}
