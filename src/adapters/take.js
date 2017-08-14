// @flow

import { impl } from '../iter'

export default impl(class Take<T> {
  index: number
  length: number
  source: Iterator<T>

  constructor(source: Iterator<T>, length: number) {
    this.index = 0
    this.length = length
    this.source = source
  }

  next(): IteratorResult<T, void> {
    if (this.index >= this.length) {
      return {
        done: true,
        value: undefined,
      }
    }

    const result = this.source.next()

    this.index++
    return result
  }

  sizeHint() {
    return this.length
  }
})
