// @flow

import { AsIterator, ToString } from 'ouro-traits'

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
    const next = this.producer.next()

    if (next.done || this.fn(next.value)) {
      return next
    }

    return this.next()
  }
}
