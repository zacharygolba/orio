// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import type { Drop } from '../types'

@ToString
@AsIterator
export default class TakeWhile<T> implements Drop, Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => boolean
  producer: Drop & Iterator<T>

  constructor(producer: Drop & Iterator<T>, fn: T => boolean) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (next.done || !this.fn(next.value)) {
      return result.done()
    }

    return next
  }
}
