// @flow

import map from './map'
import type { Map } from './map'

export default function* flatMap<T, U>(fn: Map<T, ?U>, source: Iterable<T>): Iterator<U> {
  for (const value of map(fn, source)) {
    if (value !== null && value !== undefined) {
      yield value
    }
  }
}
