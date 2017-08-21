// @flow

import * as result from '../result'

import type { Producer } from './'

export default class RepeatProducer<T> implements Producer<T> {
  value: T
  /*:: @@iterator: () => Iterator<T> */

  constructor(value: T) {
    this.value = value
  }

  // $FlowIgnore
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    return result.next(this.value)
  }

  sizeHint(): number {
    return Infinity
  }
}
