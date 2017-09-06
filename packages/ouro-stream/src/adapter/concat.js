// @flow

import * as result from 'ouro-result'
import { AsAsyncIterator, ToString } from 'ouro-traits'
import type {
  AsyncProducer,
  AsyncIteratorResult,
  AsyncSource,
} from 'ouro-types'

import { createProducer } from '../producer'

async function shift<T, U>(
  adapter: Concat<T, U>,
): AsyncIteratorResult<T | U, void> {
  if (adapter.queue.length === 0) {
    return result.done()
  }

  const next = await adapter.queue.shift()

  if (!next.done) {
    return result.next(next.value)
  }

  return shift(adapter)
}

async function exec<T, U>(
  adapter: Concat<T, U>,
): AsyncIteratorResult<T | U, void> {
  {
    const next = await shift(adapter)

    if (!next.done) {
      return next
    }
  }

  const promises = [
    adapter.producerA.next().then(next => [0, next]),
    adapter.producerB.next().then(next => [1, next]),
  ]

  const [index, next] = await Promise.race(promises)

  if (index === 0) {
    adapter.queue.push(promises[1].then(([, nextB]) => nextB))
  } else {
    adapter.queue.push(promises[0].then(([, nextA]) => nextA))
  }

  if (next.done) {
    return shift(adapter)
  }

  return result.next(next.value)
}

@ToString
@AsAsyncIterator
export default class Concat<T, U> implements AsyncProducer<T | U> {
  /*:: @@asyncIterator: () => $AsyncIterator<T | U, void, void> */
  producerA: AsyncProducer<T>
  producerB: AsyncProducer<U>
  queue: Array<AsyncIteratorResult<T, void> | AsyncIteratorResult<U, void>>

  constructor(producerA: AsyncProducer<T>, producerB: AsyncSource<U>) {
    this.producerA = producerA
    this.producerB = createProducer(producerB)
    this.queue = []
  }

  drop(): void {
    this.queue = []
    this.producerA.drop()
    this.producerB.drop()
  }

  next(): AsyncIteratorResult<T | U, void> {
    return exec(this)
  }
}
