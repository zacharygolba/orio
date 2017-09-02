// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

@ToString
@AsIterator
export default class MapAdapter<T, U> implements Iterator<U> {
  /*:: @@iterator: () => Iterator<U> */
  fn: T => U
  producer: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => U) {
    this.fn = fn
    this.producer = producer
  }

  next(): IteratorResult<U, void> {
    const next = this.producer.next()

    if (next.done) {
      return next
    }

    return result.next(this.fn(next.value))
  }
}
