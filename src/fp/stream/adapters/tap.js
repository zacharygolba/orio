// @flow

import type { ForEach } from '../utils'

export default async function* tap<T>(
  fn: ForEach<T>,
  source: AsyncIterable<T>,
): AsyncIterator<T> {
  for await (const value of source) {
    await fn(value)
    yield value
  }
}
