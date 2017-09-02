// @flow

import { AsIterator, ToString } from 'ouro-traits'

function exec<T>(adapter: FilterAdapter<T>): IteratorResult<T, void> {
  const next = adapter.producer.next()

  if (next.done || adapter.fn(next.value)) {
    return next
  }

  return exec(adapter)
}

@ToString
@AsIterator
export default class FilterAdapter<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => boolean
  producer: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => boolean) {
    this.fn = fn
    this.producer = producer
  }

  next(): IteratorResult<T, void> {
    return exec(this)
  }
}
