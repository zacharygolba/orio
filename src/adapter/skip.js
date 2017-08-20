// @flow

import * as bounds from '../bounds'
import type { Producer } from '../producer'

export default class SkipAdapter<T> implements Producer<T> {
  amount: number
  producer: Producer<T>
  state: number
  /*:: @@iterator: () => Iterator<T> */

  constructor(producer: Producer<T>, amount: number) {
    this.amount = amount
    this.producer = producer
    this.state = 0
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    let next = this.producer.next()

    if (this.state < this.amount) {
      while (!next.done && this.state < this.amount) {
        next = this.producer.next()
        this.state++
      }
    }

    return next
  }

  sizeHint(): number {
    return Math.max(bounds.sizeOf(this.producer) - this.amount, 0)
  }
}
