// @flow

import { ProducerBase } from '../producer'

export default class SkipAdapter<T> extends ProducerBase<T> {
  amount: number
  producer: Iterator<T>
  state: number

  constructor(producer: Iterator<T>, amount: number) {
    super()
    this.amount = amount
    this.producer = producer
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (this.state < this.amount) {
      this.state += 1
      return this.next()
    }

    return next
  }
}
