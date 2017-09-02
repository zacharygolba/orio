// @flow

import { AsIterator, ToString } from 'ouro-traits'

import type { Drop } from '../types'

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
export default class Unique<T> implements Drop, Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => *
  history: Set<T>
  producer: Drop & Iterator<T>

  constructor(producer: Drop & Iterator<T>, fn: T => *) {
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
