// @flow

import map from './map'
import type { Map } from './map'

export default async function* flatMap<T, U>(
  fn: Map<T, ?U>,
  source: AsyncIterable<T>,
): AsyncIterator<U> {
  for await (let value of map(fn, source)) {
    value = await value
    if (value !== null && value !== undefined) {
      yield value
    }
  }
}
