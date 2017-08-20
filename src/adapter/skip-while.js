// @flow

import * as bounds from '../bounds'
import type { Producer } from '../producer'

import Filter from './filter'

export default class SkipWhileAdapter<T> implements Producer<T> {
  producer: Producer<T>
  /*:: @@iterator: () => Iterator<T> */

  constructor(producer: Producer<T>, fn: (T) => boolean) {
    let willSkip = true

    this.producer = new Filter(producer, value => {
      if (willSkip) {
        willSkip = fn(value)
        return !willSkip
      }

      return true
    })
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    return this.producer.next()
  }

  sizeHint(): number {
    return bounds.sizeOf(this.producer)
  }
}
