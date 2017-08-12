// @flow

import enumerate from './enumerate'
import filter from './filter'

const skipFilter = amount => ([index]) => Promise.resolve(index >= amount)

export default async function* skip<T>(
  amount: number,
  source: AsyncIterable<T>,
): AsyncIterator<T> {
  const iter = filter(skipFilter(amount), enumerate(source))

  for await (const [, value] of iter) {
    yield value
  }
}
