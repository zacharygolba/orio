// @flow

import { impl } from './iter'

export default impl(class Repeat<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  next(): IteratorResult<T, void> {
    return {
      done: false,
      value: this.value,
    }
  }

  sizeHint(): number {
    return Infinity
  }
})
