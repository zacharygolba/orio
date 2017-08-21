// @flow

import { ProducerBase } from '../producer'
import type { Producer } from '../producer'

export default class SkipAdapter<T> extends ProducerBase<T> {
  amount: number
  producer: Producer<T>
  state: number

  constructor(producer: Producer<T>, amount: number) {
    super()
    this.amount = amount
    this.producer = producer
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    let next = this.producer.next()

    if (this.state < this.amount) {
      while (!next.done && this.state < this.amount) {
        next = this.producer.next()
        this.state += 1
      }
    }

    return next
  }

  sizeHint(): number {
    return Math.max(this.producer.sizeHint() - this.amount, 0)
  }
}
