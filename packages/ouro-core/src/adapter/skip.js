// @flow

import { AsIterator, ToString } from 'ouro-traits'

@ToString
@AsIterator
export default class SkipAdapter<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  amount: number
  producer: Iterator<T>
  calls: number

  constructor(producer: Iterator<T>, amount: number) {
    this.amount = amount
    this.calls = 0
    this.producer = producer
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (this.calls < this.amount) {
      this.calls += 1
      return this.next()
    }

    return next
  }
}
