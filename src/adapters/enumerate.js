// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

export default impl(class Enumerate<T> {
  source: Iterator<T>
  state: number

  constructor(source: Iterator<T>) {
    this.source = source
    this.state = 0
  }

  next(): IteratorResult<[number, T], void> {
    const result = this.source.next()

    if (result.done) {
      return result
    }

    return {
      done: false,
      value: [this.state++, result.value],
    }
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
