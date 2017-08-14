// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

export default impl(class Tap<T> {
  fn: (T) => void
  source: Iterator<T>

  constructor(source: Iterator<T>, fn: (T) => void) {
    this.fn = fn
    this.source = source
  }

  next(): IteratorResult<T, void> {
    const result = this.source.next()

    if (!result.done) {
      this.fn(result.value)
    }

    return result
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
