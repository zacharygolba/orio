// @flow

import type { AsyncIterator } from 'ouro-types'

export function reduce<T, U>(fn: (U, T) => U, acc: U, source: Iterator<T>): U {
  const next = source.next()

  if (next.done) {
    return acc
  }

  return reduce(fn, fn(acc, next.value), source)
}

export async function reduceAsync<T, U>(
  fn: (U, T) => Promise<U> | U,
  acc: Promise<U> | U,
  source: AsyncIterator<T>,
): Promise<U> {
  const next = await source.next()

  if (next.done) {
    return acc
  }

  return reduceAsync(fn, fn(await acc, next.value), source)
}
