// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import type { Producer } from '../types'

@ToString
@AsIterator
export default class TakeWhile<T> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => boolean
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => boolean) {
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
