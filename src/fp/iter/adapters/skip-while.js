// @flow

import type { Filter } from './filter'

export default function* skipWhile<T>(fn: Filter<T>, source: Iterable<T>): Iterator<T> {
  let shouldSkip = true

  for (const value of source) {
    if (shouldSkip) {
      shouldSkip = Boolean(fn(value))
    } else {
      yield value
    }
  }
}

