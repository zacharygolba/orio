// @flow

import type { Filter } from '../adapters'

export default function some<T>(fn: Filter<T>, source: Iterator<T>): boolean {
  for (const value of source) {
    if (fn(value)) {
      return true
    }
  }

  return false
}
