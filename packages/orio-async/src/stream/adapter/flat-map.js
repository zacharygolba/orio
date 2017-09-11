// @flow

import { AsAsyncIterator, ToString } from 'orio-traits'
import type {
  AsyncProducer,
  AsyncIteratorResult,
  AsyncSource,
} from 'orio-types'

import { createProducer } from '../producer'

async function exec<T, U>(
  adapter: FlatMap<T, U>,
): AsyncIteratorResult<U, void> {
  {
    const { child } = adapter

    if (child != null) {
      const next = await child.next()

      if (!next.done) {
        return next
      }

      child.drop()
    }
  }

  const next = await adapter.parent.next()

  if (next.done) {
    return next
  }

  // eslint-disable-next-line no-param-reassign
  adapter.child = createProducer(adapter.fn(next.value))
  return exec(adapter)
}

@ToString
@AsAsyncIterator
export default class FlatMap<T, U> implements AsyncProducer<U> {
  /*:: @@asyncIterator: () => $AsyncIterator<U, void, void> */
  child: ?AsyncProducer<U>
  fn: T => AsyncSource<U>
  parent: AsyncProducer<T>

  constructor(producer: AsyncProducer<T>, fn: T => AsyncSource<U>) {
    this.fn = fn
    this.parent = producer
  }

  drop(): void {
    this.parent.drop()
  }

  next(): AsyncIteratorResult<U, void> {
    return exec(this)
  }
}
