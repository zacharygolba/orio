// @flow

import { AsIterator, ToString } from 'ouro-traits'
import type { Drop } from '../types'

@ToString
@AsIterator
export default class Unbound<T> implements Drop, Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  source: (Drop & Iterator<T>) | Iterator<T>

  constructor(source: Iterator<T>) {
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
