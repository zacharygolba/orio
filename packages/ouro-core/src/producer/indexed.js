// @flow

import { AsIterator, ToString } from 'ouro-traits'

import * as result from '../result'

export interface IndexedCollection<T> extends Iterable<T> {
  [key: number]: T,
  length: number,
}

@ToString
@AsIterator
export default class IndexedProducer<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  index: number
  source: IndexedCollection<T>

  constructor(source: IndexedCollection<T>) {
    this.index = 0
    this.source = source
  }

  next(): IteratorResult<T, void> {
    const index = this.index
    const source = this.source

    if (index >= source.length) {
      return result.done()
    }

    this.index += 1
    return result.next(source[index])
  }
}
