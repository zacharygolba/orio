// @flow

import { map } from '../adapters'

import reduce from './reduce'

export default function product<T>(source: Iterator<T>): number {
  const iter = map(Number, source)
  const { value = NaN } = iter.next()

  return reduce((prev, next) => prev * next, value, iter)
}
