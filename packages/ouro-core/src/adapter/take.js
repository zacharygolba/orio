// @flow

import { AsIterator, ToString } from 'ouro-traits'

import * as result from '../result'

@ToString
@AsIterator
export default class TakeAdapter<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  amount: number
  calls: number
  producer: Iterator<T>

  constructor(producer: Iterator<T>, amount: number) {
    this.amount = amount
    this.calls = 0
    this.producer = producer
  }

  next(): IteratorResult<T, void> {
    if (this.calls >= this.amount) {
      return result.done()
    }

    this.calls += 1
    return this.producer.next()
  }
}
