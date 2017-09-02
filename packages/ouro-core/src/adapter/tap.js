// @flow

import { AsIterator, ToString } from 'ouro-traits'

@ToString
@AsIterator
export default class Tap<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => void
  producer: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => void) {
    this.fn = fn
    this.producer = producer
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (!next.done) {
      this.fn(next.value)
    }

    return next
  }
}
