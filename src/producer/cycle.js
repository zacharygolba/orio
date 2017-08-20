// @flow

import type { IndexedCollection, Producer } from './types'

export default class CycleProducer<T> implements Producer<T> {
  source: IndexedCollection<T>
  state: number
  /*:: @@iterator: () => Iterator<T> */

  constructor(source: IndexedCollection<T>) {
    this.source = source
    this.state = 0
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.source.length) {
      this.state = 0
    }

    return {
      done: false,
      value: this.source[this.state++],
    }
  }

  sizeHint(): number {
    return Infinity
  }
}
