// @flow

import type { Producer } from './types'

export default class RepeatProducer<T> implements Producer<T> {
  value: T
  /*:: @@iterator: () => Iterator<T> */

  constructor(value: T) {
    this.value = value
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    return {
      done: false,
      value: this.value,
    }
  }

  sizeHint(): number {
    return Infinity
  }
}
