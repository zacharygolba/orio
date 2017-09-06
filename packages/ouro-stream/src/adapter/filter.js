// @flow

import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'ouro-types'

async function exec<T>(adapter: Filter<T>): AsyncIteratorResult<T, void> {
  const next = await adapter.producer.next()

  if (next.done || (await adapter.fn(next.value))) {
    return next
  }

  return exec(adapter)
}

@ToString
@AsAsyncIterator
export default class Filter<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  fn: T => Promise<boolean> | boolean
  producer: AsyncProducer<T>

  constructor(producer: AsyncProducer<T>, fn: T => Promise<boolean> | boolean) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): AsyncIteratorResult<T, void> {
    return exec(this)
  }
}
