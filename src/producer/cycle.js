// @flow

import * as result from '../result'

import type { IndexedCollection, Producer } from './'

export default class CycleProducer<T> implements Producer<T> {
  source: IndexedCollection<T>
  state: number
  /*:: @@iterator: () => Iterator<T> */

  constructor(source: IndexedCollection<T>) {
    this.source = source
    this.state = 0
  }

  // $FlowIgnore
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.source.length) {
      this.state = 0
    }

    return result.next(this.source[this.state++])
  }

  sizeHint(): number {
    return Infinity
  }
}
