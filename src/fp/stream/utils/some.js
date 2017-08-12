// @flow

import { map } from '../adapters'
import type { Filter } from '../adapters'

export default async function some<T>(fn: Filter<T>, source: AsyncIterator<T>): Promise<boolean> {
  for await (const value of map(fn, source)) {
    if (value) {
      return true
    }
  }

  return false
}
