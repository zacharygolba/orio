// @flow

import reduce from './reduce'

export default function last<T>(source: Iterator<T>): T | void {
  return reduce((_, value) => value, undefined, source)
}
