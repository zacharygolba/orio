// @flow

import { map } from '../adapters'

import reduce from './reduce'

export default function sum<T>(source: AsyncIterator<T>): Promise<number> {
  return reduce((prev, next) => prev + next, 0, map(Number, source))
}
