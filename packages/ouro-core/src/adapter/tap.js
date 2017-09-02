// @flow

import { AsIterator, ToString } from 'ouro-traits'

import type { Drop } from '../types'

@ToString
@AsIterator
export default class Tap<T> implements Drop, Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => void
  producer: Drop & Iterator<T>

  constructor(producer: Drop & Iterator<T>, fn: T => void) {
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
