// @flow

import { AsIterator, ToString } from 'ouro-traits'

import type { Producer } from '../types'

function exec<T>(adapter: Unique<T>): IteratorResult<T, void> {
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
export default class Unique<T> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => *
  history: Set<T>
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => *) {
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
