// @flow

import * as result from '../result'
import { ProducerBase } from '../producer'

export default class EnumerateAdapter<T> extends ProducerBase<[number, T]> {
  producer: Iterator<T>
  state: number

  constructor(producer: Iterator<T>) {
    super()
    this.producer = producer
    this.state = 0
  }

  next(): IteratorResult<[number, T], void> {
    const next = this.producer.next()

    if (next.done) {
      return next
    }

    const state = this.state
    this.state += 1

    return result.next([state, next.value])
  }
}
