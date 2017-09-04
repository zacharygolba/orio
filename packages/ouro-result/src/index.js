// @flow

import * as pkg from '../package.json'

export const VERSION: string = pkg.version

export function done<+T>(value?: T): IteratorResult<*, T> {
  return {
    done: true,
    value,
  }
}

export function next<+T>(value: T): IteratorResult<T, *> {
  return {
    done: false,
    value,
  }
}
