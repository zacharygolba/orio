// @flow

import { enumerate, take } from '../adapters'

import last from './last'

const DEFAULT = [-1, undefined]

export default function nth<T>(idx: number, source: Iterator<T>): T | void {
  const [lastIdx, value] = last(take(idx + 1, enumerate(source))) || DEFAULT

  if (idx === lastIdx) {
    return value
  }

  // If the last index is not equal to the input index, the input index was
  // out of bounds.
  return undefined
}
