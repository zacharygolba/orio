// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

export default impl(class Chain<T, U> {
  sourceA: Iterator<T>
  sourceB: Iterator<U>

  constructor(sourceA: Iterator<T>, sourceB: Iterator<U>) {
    this.sourceA = sourceA
    this.sourceB = sourceB
  }

  next(): IteratorResult<T | U, void> {
    {
      const result = this.sourceA.next()

      if (!result.done) {
        return {
          done: false,
          value: result.value,
        }
      }
    }

    const result = this.sourceB.next()

    if (!result.done) {
      return {
        done: false,
        value: result.value,
      }
    }

    return {
      done: true,
      value: undefined,
    }
  }

  sizeHint(): number {
    return sizeOf(this.sourceA) + sizeOf(this.sourceB)
  }
})
