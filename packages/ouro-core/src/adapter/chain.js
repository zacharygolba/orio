// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import { createProducer } from '../producer'

@ToString
@AsIterator
export default class ChainAdapter<T, U> implements Iterator<T | U> {
  /*:: @@iterator: () => Iterator<T | U> */
  producerA: Iterator<T>
  producerB: Iterator<U>

  constructor(producerA: Iterator<T>, producerB: Iterable<U> | U) {
    this.producerA = producerA
    this.producerB = createProducer(producerB)
  }

  next(): IteratorResult<T | U, void> {
    let next = this.producerA.next()

    if (next.done) {
      next = this.producerB.next()
    }

    return next.done ? next : result.next(next.value)
  }
}
