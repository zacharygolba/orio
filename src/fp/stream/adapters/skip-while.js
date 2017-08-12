// @flow

import type { Filter } from './filter'

export default async function* skipWhile<T>(
  fn: Filter<T>,
  source: AsyncIterable<T>,
): AsyncIterator<T> {
  let shouldSkip = true

  for await (const value of source) {
    if (shouldSkip) {
      // eslint-disable-next-line no-await-in-loop
      shouldSkip = Boolean(await fn(value))
    } else {
      yield value
    }
  }
}
