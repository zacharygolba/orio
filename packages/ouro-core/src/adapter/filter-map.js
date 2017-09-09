// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'
import type { Producer } from 'ouro-types'

function exec<T, U>(adapter: FilterMap<T, U>): IteratorResult<U, void> {
  const next = adapter.producer.next()

  if (next.done) {
    return next
  }

  const value = adapter.fn(next.value)

  if (value != null) {
    return result.next(value)
  }

  return exec(adapter)
}

@ToString
@AsIterator
export default class FilterMap<T, U> implements Producer<U> {
  /*:: @@iterator: () => Iterator<U> */
  fn: T => ?U
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => ?U) {
    this.fn = fn
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): IteratorResult<U, void> {
    return exec(this)
  }
}
