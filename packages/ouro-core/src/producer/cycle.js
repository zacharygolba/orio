// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import type { Drop, IndexedCollection } from '../types'

@ToString
@AsIterator
export default class Cycle<T> implements Drop, Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  done: boolean
  source: IndexedCollection<T>
  state: number

  constructor(source: IndexedCollection<T>) {
    this.done = false
    this.source = source
    this.state = 0
  }

  drop(): void {
    this.done = true
    this.source = []
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    if (this.done) {
      return result.done()
    }

    if (this.state >= this.source.length) {
      this.state = 0
    }

    const { state } = this
    this.state += 1

    return result.next(this.source[state])
  }
}
