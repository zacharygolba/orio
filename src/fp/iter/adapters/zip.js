// @flow

import noop from '../../../utils/noop'

import map from './map'

export default function* zip<T, U>(target: Iterable<U>, source: Iterable<T>): Iterator<[T, U]> {
  const iter = map(noop, target)

  for (const value of source) {
    const next = iter.next()

    if (next.done) {
      break
    }

    yield [value, next.value]
  }
}

