// @flow

import { range } from '../index'

import zip from './zip'

export default async function* take<T>(
  amount: number,
  source: AsyncIterable<T>,
): AsyncIterator<T> {
  const iter = zip(source, range(0, amount))

  for await (const [, value] of iter) {
    yield value
  }
}
