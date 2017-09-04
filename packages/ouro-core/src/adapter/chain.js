// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import { createProducer } from '../producer'
import type { Producer, Source } from '../types'

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
