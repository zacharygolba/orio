// @flow

import type { ForEach } from '../utils'

export default function* tap<T>(fn: ForEach<T>, source: Iterable<T>): Iterator<T> {
  for (const value of source) {
    fn(value)
    yield value
  }
}
