// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

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
export default class FilterMap<T, U> implements Iterator<U> {
  /*:: @@iterator: () => Iterator<U> */
  fn: T => ?U
  producer: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => ?U) {
    this.fn = fn
    this.producer = producer
  }

  next(): IteratorResult<U, void> {
    return exec(this)
  }
}
