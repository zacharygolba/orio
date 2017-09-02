// @flow

import { AsIterator, ToString } from 'ouro-traits'

import type { Drop } from '../types'

function exec<T>(adapter: Filter<T>): IteratorResult<T, void> {
  const next = adapter.producer.next()

  if (next.done || adapter.fn(next.value)) {
    return next
  }

  return exec(adapter)
}

@ToString
@AsIterator
export default class Filter<T> implements Drop, Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => boolean
  producer: Drop & Iterator<T>

  constructor(producer: Drop & Iterator<T>, fn: T => boolean) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): IteratorResult<T, void> {
    return exec(this)
  }
}
