// @flow

import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

@ToString
@AsIterator
export default class Tap<T> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => void
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => void) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (!next.done) {
      this.fn(next.value)
    }

    return next
  }
}
