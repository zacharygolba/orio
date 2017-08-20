// @flow

import type { IndexedCollection, Producer } from './types'

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

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.size) {
      return {
        done: true,
        value: undefined,
      }
    }

    return {
      done: false,
      value: this.source[this.state++],
    }
  }

  sizeHint(): number {
    return this.size
  }
}
