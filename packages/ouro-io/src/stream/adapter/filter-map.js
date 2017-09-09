// @flow

import * as result from 'ouro-result'
import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'ouro-types'

async function exec<T, U>(
  adapter: FilterMap<T, U>,
): AsyncIteratorResult<U, void> {
  const next = await adapter.producer.next()

  if (next.done) {
    return next
  }

  const value = await adapter.fn(next.value)

  if (value != null) {
    return result.next(value)
  }

  return exec(adapter)
}

@ToString
@AsAsyncIterator
export default class FilterMap<T, U> implements AsyncProducer<U> {
  /*:: @@asyncIterator: () => $AsyncIterator<U, void, void> */
  fn: T => Promise<?U> | ?U
  producer: AsyncProducer<T>

  constructor(producer: AsyncProducer<T>, fn: T => Promise<?U> | ?U) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): AsyncIteratorResult<U, void> {
    return exec(this)
  }
}
