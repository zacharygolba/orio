// @flow

import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'ouro-types'

async function exec<T, U>(adapter: Unique<T, U>): AsyncIteratorResult<T, void> {
  const next = await adapter.producer.next()

  if (next.done) {
    return next
  }

  const key = await adapter.fn(next.value)

  if (!adapter.history.has(key)) {
    adapter.history.add(key)
    return next
  }

  return exec(adapter)
}

@ToString
@AsAsyncIterator
export default class Unique<T, U> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  fn: T => Promise<U> | Promise<T> | U | T
  history: Set<U | T>
  producer: AsyncProducer<T>

  constructor(
    producer: AsyncProducer<T>,
    fn: T => Promise<U> | Promise<T> | U | T,
  ) {
    this.fn = fn
    this.history = new Set()
    this.producer = producer
  }

  drop(): void {
    this.history.clear()
    this.producer.drop()
  }

  next(): AsyncIteratorResult<T, void> {
    return exec(this)
  }
}
