// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import { createProducer } from '../producer'

function exec<T, U>(adapter: FlatMapAdapter<T, U>): IteratorResult<U, void> {
  let next = adapter.child ? adapter.child.next() : result.done()

  if (!next.done) {
    return next
  }

  next = adapter.parent.next()

  if (next.done) {
    return next
  }

  // eslint-disable-next-line no-param-reassign
  adapter.child = createProducer(adapter.fn(next.value))
  return exec(adapter)
}

@ToString
@AsIterator
export default class FlatMapAdapter<T, U> implements Iterator<U> {
  /*:: @@iterator: () => Iterator<U> */
  child: ?Iterator<U>
  fn: T => Iterable<U> | U
  parent: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => Iterable<U> | U) {
    this.fn = fn
    this.parent = producer
  }

  next(): IteratorResult<U, void> {
    return exec(this)
  }
}
