// @flow

import { impl } from '../iter'
import intoIter from '../utils/into-iter'
import sizeOf from '../utils/size-of'

function* flatMap(source, fn) {
  for (const item of source) {
    for (const value of intoIter(fn(item))) {
      yield value
    }
  }
}

export default impl(class FlatMap<T, U> {
  fn: (T) => Iterable<U>
  source: Iterator<T>

  constructor(source: Iterator<T>, fn: (T) => Iterable<U>) {
    this.fn = fn
    this.source = flatMap(source, fn)
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
    return Infinity
  }
})
