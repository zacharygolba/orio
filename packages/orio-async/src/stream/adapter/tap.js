// @flow

import { AsAsyncIterator, ToString } from 'orio-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'orio-types'

@ToString
@AsAsyncIterator
export default class Tap<T> implements AsyncProducer<T> {
  /*:: @@iterator: () => $AsyncIterator<T, void, void> */
  fn: T => Promise<void> | void
  producer: AsyncProducer<T>

  constructor(producer: AsyncProducer<T>, fn: T => Promise<void> | void) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  async next(): AsyncIteratorResult<T, void> {
    const next = await this.producer.next()

    if (!next.done) {
      await this.fn(next.value)
    }

    return next
  }
}
