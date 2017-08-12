// @flow

import reduce from './reduce'

export default function last<T>(source: AsyncIterator<T>): Promise<T | void> {
  return reduce((_, value): T | void => value, undefined, source)
}
