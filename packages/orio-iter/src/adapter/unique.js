// @flow

import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

function exec<T, U>(adapter: Unique<T, U>): IteratorResult<T, void> {
  const next = adapter.producer.next()

  if (next.done) {
    return next
  }

  const key = adapter.fn(next.value)

  if (!adapter.history.has(key)) {
    adapter.history.add(key)
    return next
  }

  return exec(adapter)
}

@ToString
@AsIterator
export default class Unique<T, U> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => U | T
  history: Set<U | T>
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => U | T) {
    this.fn = fn
    this.history = new Set()
    this.producer = producer
  }

  drop(): void {
    this.history.clear()
    this.producer.drop()
  }

  next(): IteratorResult<T, void> {
    return exec(this)
  }
}
