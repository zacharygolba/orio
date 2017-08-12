// @flow

import { map } from '../adapters'

import reduce from './reduce'

export default async function product<T>(source: AsyncIterator<T>): Promise<number> {
  const iter = map(Number, source)
  const { value = NaN } = await iter.next()

  return reduce((prev, next) => prev * next, value, iter)
}
