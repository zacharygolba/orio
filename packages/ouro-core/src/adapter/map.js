// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'
import type { Producer } from 'ouro-types'

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
