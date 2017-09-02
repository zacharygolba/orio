// @flow

import * as result from '../result'
import { ProducerBase } from '../producer'

export default class TakeAdapter<T> extends ProducerBase<T> {
  amount: number
  calls: number
  producer: Iterator<T>

  constructor(producer: Iterator<T>, amount: number) {
    super()

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
