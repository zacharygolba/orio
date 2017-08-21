// @flow

import * as result from '../../result'
import type { Producer } from '../'

export interface IndexedCollection<T> extends Iterable<T> {
  [key: number]: T,
  length: number,
}

export default class IndexedProducer<T> implements Producer<T> {
  source: IndexedCollection<T>
  size: number
  state: number
  /*:: @@iterator: () => Iterator<T> */

  constructor(source: IndexedCollection<T>) {
    this.source = source
    this.size = source.length
    this.state = 0
  }

  // $FlowIgnore
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.size) {
      return result.done()
    }

    const value = this.source[this.state]

    this.state += 1
    return result.next(value)
  }

  sizeHint(): number {
    return this.size
  }
}
