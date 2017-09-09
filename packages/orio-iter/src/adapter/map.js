// @flow

import * as result from 'orio-result'
import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

@ToString
@AsIterator
export default class Map<T, U> implements Producer<U> {
  /*:: @@iterator: () => Iterator<U> */
  fn: T => U
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => U) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): IteratorResult<U, void> {
    const next = this.producer.next()

    if (next.done) {
      return next
    }

    return result.next(this.fn(next.value))
  }
}
