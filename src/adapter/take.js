// @flow

import * as result from '../result'
import { ProducerBase } from '../producer'
import type { Producer } from '../producer'

export default class TakeAdapter<T> extends ProducerBase<T> {
  size: number
  producer: Producer<T>
  state: number

  constructor(producer: Producer<T>, size: number) {
    super()

    this.producer = producer
    this.size = size
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.size) {
      return result.done()
    }

    const next = this.producer.next()
    this.state += 1

    return next
  }

  sizeHint(): number {
    return this.size
  }
}
