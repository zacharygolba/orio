// @flow

import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

@ToString
@AsIterator
export default class Unbound<T> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  source: Producer<T> | Iterator<T>

  constructor(source: Producer<T> | Iterator<T>) {
    this.source = source
  }

  drop(): void {
    if (typeof this.source.drop === 'function') {
      this.source.drop()
    }
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }
}
