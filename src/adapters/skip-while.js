// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

import Filter from './filter'

export default impl(class SkipWhile<T> {
  source: Iterator<T>

  constructor(source: Iterator<T>, fn: (T) => boolean) {
    let willSkip = true

    this.source = new Filter(source, value => {
      if (willSkip) {
        willSkip = fn(value)
        return !willSkip
      }

      return true
    })
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
