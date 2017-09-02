// @flow

import { ProducerBase } from '../producer'

export default class SkipAdapter<T> extends ProducerBase<T> {
  amount: number
  producer: Iterator<T>
  calls: number

  constructor(producer: Iterator<T>, amount: number) {
    super()
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
