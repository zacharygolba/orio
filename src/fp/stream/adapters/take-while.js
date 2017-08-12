// @flow

import filter from './filter'
import type { Filter } from './filter'

export default async function* takeWhile<T>(
  fn: Filter<T>,
  source: AsyncIterable<T>,
): AsyncIterator<T> {
  const iter = filter(fn, source)

  for await (const value of iter) {
    yield value
  }
}
