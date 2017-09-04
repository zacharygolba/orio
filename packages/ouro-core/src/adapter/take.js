// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import type { Producer } from '../types'

@ToString
@AsIterator
export default class Take<T> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  amount: number
  calls: number
  producer: Producer<T>

  constructor(producer: Producer<T>, amount: number) {
    this.amount = amount
    this.calls = 0
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): IteratorResult<T, void> {
    if (this.calls >= this.amount) {
      return result.done()
    }

    this.calls += 1
    return this.producer.next()
  }
}
