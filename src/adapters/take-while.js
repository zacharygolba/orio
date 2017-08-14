// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

export default impl(class TakeWhile<T> {
  fn: (T) => boolean
  source: Iterator<T>

  constructor(source: Iterator<T>, fn: (T) => boolean) {
    this.fn = fn
    this.source = source
  }

  next(): IteratorResult<T, void> {
    const result = this.source.next()

    if (result.done || !this.fn(result.value)) {
      return {
        done: true,
        value: undefined,
      }
    }

    return result
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
