// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

import Filter from './filter'
import Map from './map'

const isNone = value => value === null || value === undefined
const isSome = value => !isNone(value)

export default impl(class FilterMap<T, U> {
  source: Filter<?U>

  constructor(source: Iterator<T>, fn: (T) => ?U) {
    this.source = new Filter(new Map(source, fn), isSome)
  }

  // $FlowFixMe
  next(): IteratorResult<U, void> {
    this.source.next()
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
