// @flow

import filter from './filter'
import type { Filter } from './filter'

export default function* takeWhile<T>(fn: Filter<T>, source: Iterable<T>): Iterator<T> {
  for (const value of filter(fn, source)) {
    yield value
  }
}
