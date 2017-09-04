// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import type { Producer } from '../types'

@ToString
@AsIterator
export default class Enumerate<T> implements Producer<[number, T]> {
  /*:: @@iterator: () => Iterator<[number, T]> */
  producer: Producer<T>
  state: number

  constructor(producer: Producer<T>) {
    this.producer = producer
    this.state = 0
  }

  drop(): void {
    this.producer.drop()
  }

  next(): IteratorResult<[number, T], void> {
    const next = this.producer.next()

    if (next.done) {
      return next
    }

    const { state } = this
    this.state += 1

    return result.next([state, next.value])
  }
}
