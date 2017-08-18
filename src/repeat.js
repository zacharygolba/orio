// @flow

import { impl } from './iter'
import type { Iter } from './iter'

export default function repeat<T: any>(value: T): Iter<T> {
  return new Repeat(value)
}

const Repeat = impl(class RepeatIterator<T> {
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
