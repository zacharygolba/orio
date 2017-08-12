// @flow

import type { Filter } from '../adapters'

export default function find<T>(fn: Filter<T>, source: Iterator<T>): T | void {
  for (const value of source) {
    if (fn(value)) {
      return value
    }
  }

  return undefined
}
