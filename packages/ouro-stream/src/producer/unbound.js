// @flow

import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult, Producer } from 'ouro-types'

@ToString
@AsAsyncIterator
export default class Unbound<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  source: AsyncProducer<T> | Producer<T> | Iterator<T>

  constructor(source: AsyncProducer<T> | Producer<T> | Iterator<T>) {
    this.source = source
  }

  drop(): void {
    if (typeof this.source.drop === 'function') {
      this.source.drop()
    }
  }

  async next(): AsyncIteratorResult<T, void> {
    return this.source.next()
  }
}
