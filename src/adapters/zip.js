// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

export default impl(class Zip<T, U> {
  sourceA: Iterator<T>
  sourceB: Iterator<U>

  constructor(sourceA: Iterator<T>, sourceB: Iterator<U>) {
    this.sourceA = sourceA
    this.sourceB = sourceB
  }

  next(): IteratorResult<[T, U], void> {
    const resultA = this.sourceA.next()
    const resultB = this.sourceB.next()

    if (resultA.done || resultB.done) {
      return {
        done: true,
        value: undefined,
      }
    }

    return {
      done: false,
      value: [resultA.value, resultB.value],
    }
  }

  sizeHint(): number {
    return Math.min(sizeOf(this.sourceA), sizeOf(this.sourceB))
  }
})
