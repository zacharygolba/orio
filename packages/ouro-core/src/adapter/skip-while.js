// @flow

import { AsIterator, ToString } from 'ouro-traits'

function exec<T>(adapter: SkipWhileAdapter<T>): IteratorResult<T, void> {
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
export default class SkipWhileAdapter<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  fn: T => boolean
  producer: Iterator<T>
  skipped: boolean

  constructor(producer: Iterator<T>, fn: T => boolean) {
    this.fn = fn
    this.producer = producer
    this.skipped = false
  }

  next(): IteratorResult<T, void> {
    return exec(this)
  }
}
