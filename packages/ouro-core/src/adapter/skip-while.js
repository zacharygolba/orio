// @flow

import { AsIterator, ToString } from 'ouro-traits'

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
    const next = this.producer.next()

    if (next.done || this.skipped) {
      return next
    }

    this.skipped = !this.fn(next.value)
    return this.skipped ? next : this.next()
  }
}
