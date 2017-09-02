// @flow

import { AsIterator, ToString } from 'ouro-traits'

import * as result from '../result'
import { createProducer } from '../producer'

@ToString
@AsIterator
export default class ZipAdapter<T, U> implements Iterator<[T, U]> {
  /*:: @@iterator: () => Iterator<[T, U]> */
  producerA: Iterator<T>
  producerB: Iterator<U>

  constructor(producerA: Iterator<T>, producerB: Iterable<U>) {
    this.producerA = producerA
    this.producerB = createProducer(producerB)
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
