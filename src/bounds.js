// @flow

import type { Producer } from './producer'

export function sizeOf<T>(value: ?T | Producer<T>): number {
  if (value && typeof value.sizeHint === 'function') {
    return value.sizeHint()
  }

  return Infinity
}
