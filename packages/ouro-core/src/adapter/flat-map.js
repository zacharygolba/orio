// @flow

import { AsIterator, ToString } from 'ouro-traits'

import { createProducer } from '../producer'
import type { Producer, Source } from '../types'

function exec<T, U>(adapter: FlatMap<T, U>): IteratorResult<U, void> {
  {
    const { child } = adapter

    if (child != null) {
      const next = child.next()

      if (!next.done) {
        return next
      }

      child.drop()
    }
  }

  const next = adapter.parent.next()

  if (next.done) {
    return next
  }

  // eslint-disable-next-line no-param-reassign
  adapter.child = createProducer(adapter.fn(next.value))
  return exec(adapter)
}

@ToString
@AsIterator
export default class FlatMap<T, U> implements Producer<U> {
  /*:: @@iterator: () => Iterator<U> */
  child: ?Producer<U>
  fn: T => Source<U>
  parent: Producer<T>

  constructor(producer: Producer<T>, fn: T => Source<U>) {
    this.fn = fn
    this.parent = producer
  }

  drop(): void {
    this.parent.drop()
  }

  next(): IteratorResult<U, void> {
    return exec(this)
  }
}
