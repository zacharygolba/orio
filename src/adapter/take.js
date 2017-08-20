// @flow

import * as result from '../result'
import type { Producer } from '../producer'

export default class TakeAdapter<T> implements Producer<T> {
  size: number
  producer: Producer<T>
  state: number
  /*:: @@iterator: () => Iterator<T> */

  constructor(producer: Producer<T>, size: number) {
    this.producer = producer
    this.size = size
    this.state = 0
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.size) {
      return result.done()
    }

    const next = this.producer.next()

    this.state++
    return next
  }

  sizeHint(): number {
    return this.size
  }
}
