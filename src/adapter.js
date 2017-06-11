/* @flow */

import { DONE, SKIP } from './constants'
import type { Inspect, Iter, Mapper } from './types'

type Consumer<T> = Inspect<T>
                 | Mapper<T, false>

export const apply = <T>(adapters: Array<Function>, item: T): Symbol | T => {
  const length = adapters.length
  let value = item

  for (let i = 0; i < length; i++) {
    value = adapters[i](value)

    if (value === DONE || value === SKIP) {
      break
    }
  }

  return value
}

export const consume = <T>(source: Iter<T>, fn: Consumer<T>): void => {
  let result = source.next()

  while (result.done === false) {
    if (fn(result.value) === false) {
      break
    }

    result = source.next()
  }
}

export const done = <T>(): IteratorResult<T, void> => ({
  done: true,
  value: undefined,
})

