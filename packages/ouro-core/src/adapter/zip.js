// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import { createProducer } from '../producer'
import type { Drop } from '../types'

@ToString
@AsIterator
export default class Zip<T, U> implements Drop, Iterator<[T, U]> {
  /*:: @@iterator: () => Iterator<[T, U]> */
  producerA: Drop & Iterator<T>
  producerB: Drop & Iterator<U>

  constructor(producerA: Drop & Iterator<T>, producerB: Iterable<U>) {
    this.producerA = producerA
    this.producerB = createProducer(producerB)
  }

  drop(): void {
    this.producerA.drop()
    this.producerB.drop()
  }

  next(): IteratorResult<[T, U], void> {
    const nextA = this.producerA.next()
    const nextB = this.producerB.next()

    if (nextA.done || nextB.done) {
      return result.done()
    }

    return result.next([nextA.value, nextB.value])
  }
}
