// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

export default impl(class FlatMap<T, U> {
  fn: (T) => Iterable<U>
  source: Iterator<T>

  constructor(source: Iterator<T>, fn: (T) => Iterable<U>) {
    this.fn = fn
    this.source = source
  }

  next(): IteratorResult<U, void> {
    const result = this.source.next()

    if (result.done) {
      return result
    }

    // $FlowFixMe
    return {
      done: false,
      value: this.fn(result.value),
    }
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
