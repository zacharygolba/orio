// @flow

import { impl } from '../iter'

export default impl(class Take<T> {
  size: number
  source: Iterator<T>
  state: number

  constructor(source: Iterator<T>, size: number) {
    this.source = source
    this.size = size
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.size) {
      return {
        done: true,
        value: undefined,
      }
    }

    const result = this.source.next()

    this.state++
    return result
  }

  sizeHint(): number {
    return this.size
  }
})
