// @flow

import type { Filter } from '../adapters'

export default async function find<T>(fn: Filter<T>, source: AsyncIterator<T>): Promise<T | void> {
  for await (const value of source) {
    if (await fn(value)) {
      return value
    }
  }

  return undefined
}
