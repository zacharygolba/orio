/* @flow */

import { DONE, SKIP } from './constants'
import type { Iter, Result } from './types'

type Consumer<T> = (value: T) => void | false

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

export const done = <T>(): Result<T> => ({
  done: true,
  value: undefined,
})

export const pending = <T>(value: T): Result<T> => ({
  done: false,
  value,
})
