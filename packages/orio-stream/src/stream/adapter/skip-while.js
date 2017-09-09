// @flow

import { AsAsyncIterator, ToString } from 'orio-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'orio-types'

async function exec<T>(adapter: SkipWhile<T>): AsyncIteratorResult<T, void> {
  const next = await adapter.producer.next()

  if (next.done || adapter.skipped || !await adapter.fn(next.value)) {
    if (!adapter.skipped) {
      // eslint-disable-next-line no-param-reassign
      adapter.skipped = true
    }

    return next
  }

  return exec(adapter)
}

@ToString
@AsAsyncIterator
export default class SkipWhile<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  fn: T => Promise<boolean> | boolean
  producer: AsyncProducer<T>
  skipped: boolean

  constructor(producer: AsyncProducer<T>, fn: T => Promise<boolean> | boolean) {
    this.fn = fn
    this.producer = producer
    this.skipped = false
  }

  drop(): void {
    this.producer.drop()
  }

  next(): AsyncIteratorResult<T, void> {
    return exec(this)
  }
}
