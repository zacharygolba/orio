// @flow

import * as bounds from '../bounds'
import * as result from '../result'
import type { Producer } from '../producer'

export default class EnumerateAdapter<T> implements Producer<[number, T]> {
  producer: Producer<T>
  state: number
  /*:: @@iterator: () => Iterator<[number, T]> */

  constructor(producer: Producer<T>) {
    this.producer = producer
    this.state = 0
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<[number, T]> {
    return this
  }

  next(): IteratorResult<[number, T], void> {
    const next = this.producer.next()
    return next.done ? next : result.next([this.state++, next.value])
  }

  sizeHint(): number {
    return bounds.sizeOf(this.producer)
  }
}
