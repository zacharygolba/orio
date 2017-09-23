// @flow

import * as result from 'orio-result'
import { AsAsyncIterator, ToString } from 'orio-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'orio-types'

@ToString
@AsAsyncIterator
export default class Map<T, U> implements AsyncProducer<U> {
  /*:: @@asyncIterator: () => $AsyncIterator<U, void, void> */
  fn: T => Promise<U> | U
  producer: AsyncProducer<T>

  constructor(producer: AsyncProducer<T>, fn: T => Promise<U> | U) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  async next(): AsyncIteratorResult<U, void> {
    const next = await this.producer.next()

    if (next.done) {
      return next
    }

    return result.next(await this.fn(next.value))
  }
}
