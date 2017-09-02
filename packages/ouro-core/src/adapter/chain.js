// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import { createProducer } from '../producer'
import type { Drop } from '../types'

@ToString
@AsIterator
export default class Chain<T, U> implements Drop, Iterator<T | U> {
  /*:: @@iterator: () => Iterator<T | U> */
  producerA: Drop & Iterator<T>
  producerB: Drop & Iterator<U>

  constructor(producerA: Drop & Iterator<T>, producerB: Iterable<U> | U) {
    this.producerA = producerA
    this.producerB = createProducer(producerB)
  }

  drop(): void {
    this.producerA.drop()
    this.producerB.drop()
  }

  next(): IteratorResult<T | U, void> {
    let next = this.producerA.next()

    if (next.done) {
      next = this.producerB.next()
    }

    return next.done ? next : result.next(next.value)
  }
}
