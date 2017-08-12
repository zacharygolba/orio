// @flow

import reduce from './reduce'

export default function count<T>(source: Iterator<T>): number {
  return reduce(total => total + 1, 0, source)
}
