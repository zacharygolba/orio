// @flow

import * as result from 'orio-result'
import { AsIterator, ToString } from 'orio-traits'
import type { Producer, Source } from 'orio-types'

import { createProducer } from '../producer'

@ToString
@AsIterator
export default class Chain<T, U> implements Producer<T | U> {
  /*:: @@iterator: () => Iterator<T | U> */
  producerA: Producer<T>
  producerB: Producer<U>

  constructor(producerA: Producer<T>, producerB: Source<U>) {
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
