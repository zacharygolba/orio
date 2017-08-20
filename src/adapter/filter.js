// @flow

import type { Producer } from '../producer'

export default class FilterAdapter<T> implements Producer<T> {
  fn: (T) => boolean
  producer: Producer<T>
  /*:: @@iterator: () => Iterator<T> */

  constructor(producer: Producer<T>, fn: (T) => boolean) {
    this.fn = fn
    this.producer = producer
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    let next = this.producer.next()

    while (!next.done && !this.fn(next.value)) {
      next = this.producer.next()
    }

    return next
  }

  sizeHint(): number {
    return this.producer.sizeHint()
  }
}
