// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

export default impl(class Filter<T> {
  fn: (T) => boolean
  source: Iterator<T>

  constructor(source: Iterator<T>, fn: (T) => boolean) {
    this.fn = fn
    this.source = source
  }

  // $FlowFixMe
  next(): IteratorResult<T, void> {
    for (;;) {
      const result = this.source.next()

      if (result.done || this.fn(result.value)) {
        return result
      }
    }
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
