// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import type { Drop } from '../types'

@ToString
@AsIterator
export default class Map<T, U> implements Drop, Iterator<U> {
  /*:: @@iterator: () => Iterator<U> */
  fn: T => U
  producer: Drop & Iterator<T>

  constructor(producer: Drop & Iterator<T>, fn: T => U) {
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
