// @flow

import { take } from '../adapters'

import reduce from './reduce'

export default function first<T>(source: AsyncIterator<T>): Promise<T | void> {
  return reduce((_, value): T | void => value, undefined, take(1, source))
}
