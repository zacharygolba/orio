// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

export default impl(class Enumerate<T> {
  index: number
  source: Iterator<T>

  constructor(source: Iterator<T>) {
    this.index = 0
    this.source = source
  }

  next(): IteratorResult<[number, T], void> {
    const result = this.source.next()

    if (result.done) {
      return result
    }

    return {
      done: false,
      value: [this.index++, result.value],
    }
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
