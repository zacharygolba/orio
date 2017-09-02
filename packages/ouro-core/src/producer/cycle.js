// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import type { IndexedCollection } from './'

@ToString
@AsIterator
export default class CycleProducer<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  source: IndexedCollection<T>
  state: number

  constructor(source: IndexedCollection<T>) {
    this.source = source
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.source.length) {
      this.state = 0
    }

    const { state } = this
    this.state += 1

    return result.next(this.source[state])
  }
}
