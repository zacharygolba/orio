// @flow

import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

function exec<T>(adapter: SkipWhile<T>): IteratorResult<T, void> {
  const next = adapter.producer.next()

  if (next.done || adapter.skipped || !adapter.fn(next.value)) {
    if (!adapter.skipped) {
      // eslint-disable-next-line no-param-reassign
      adapter.skipped = true
    }

    return next
  }

  return exec(adapter)
}

@ToString
@AsIterator
export default class SkipWhile<T> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => boolean
  producer: Producer<T>
  skipped: boolean

  constructor(producer: Producer<T>, fn: T => boolean) {
    this.fn = fn
    this.producer = producer
    this.skipped = false
  }

  drop(): void {
    this.producer.drop()
  }

  next(): IteratorResult<T, void> {
    return exec(this)
  }
}
