// @flow

import { AsIterator, ToString } from 'ouro-traits'

import * as result from '../result'

@ToString
@AsIterator
export default class EnumerateAdapter<T> implements Iterator<[number, T]> {
  /*:: @@iterator: () => Iterator<[number, T]> */
  producer: Iterator<T>
  state: number

  constructor(producer: Iterator<T>) {
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
