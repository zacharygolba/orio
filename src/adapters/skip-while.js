// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

import Filter from './filter'

const createFilter = fn => {
  let willSkip = true

  return value => {
    if (!willSkip) {
      willSkip = !fn(value)
      return false
    }

    return true
  }
}

export default impl(class SkipWhile<T> {
  source: Filter<T>

  constructor(source: Iterator<T>, fn: (T) => boolean) {
    this.source = new Filter(source, createFilter(fn))
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
