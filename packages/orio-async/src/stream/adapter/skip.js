// @flow

import { AsAsyncIterator, ToString } from 'orio-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'orio-types'

async function exec<T>(adapter: Skip<T>): AsyncIteratorResult<T, void> {
  const next = await adapter.producer.next()

  if (adapter.calls >= adapter.amount) {
    return next
  }

  // eslint-disable-next-line no-param-reassign
  adapter.calls += 1
  return exec(adapter)
}

@ToString
@AsAsyncIterator
export default class Skip<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  amount: number
  producer: AsyncProducer<T>
  calls: number

  constructor(producer: AsyncProducer<T>, amount: number) {
    this.amount = amount
    this.calls = 0
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): AsyncIteratorResult<T, void> {
    return exec(this)
  }
}
