// @flow

import * as result from 'orio-result'
import { AsAsyncIterator, ToString } from 'orio-traits'
import type {
  AsyncProducer,
  AsyncIteratorResult,
  AsyncSource,
} from 'orio-types'

import { createProducer } from '../producer'

@ToString
@AsAsyncIterator
export default class Zip<T, U> implements AsyncProducer<[T, U]> {
  /*:: @@asyncIterator: () => $AsyncIterator<[T, U], void, void> */
  producerA: AsyncProducer<T>
  producerB: AsyncProducer<U>

  constructor(producerA: AsyncProducer<T>, producerB: AsyncSource<U>) {
    this.producerA = producerA
    this.producerB = createProducer(producerB)
  }

  drop(): void {
    this.producerA.drop()
    this.producerB.drop()
  }

  async next(): AsyncIteratorResult<[T, U], void> {
    const [nextA, nextB] = await Promise.all([
      this.producerA.next(),
      this.producerB.next(),
    ])

    if (nextA.done || nextB.done) {
      return result.done()
    }

    return result.next([nextA.value, nextB.value])
  }
}
