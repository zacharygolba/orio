// @flow

import noop from '../../../utils/noop'

import map from './map'

export default async function* zip<T, U>(
  target: AsyncIterable<U>,
  source: AsyncIterable<T>,
): AsyncIterator<[T, U]> {
  const iter = map(noop, target)

  for await (const value of source) {
    const next = await iter.next()

    if (next.done) {
      break
    }

    yield [value, next.value]
  }
}
