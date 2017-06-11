/* @flow */

import { DONE, SKIP } from './constants'
import Base from './base'
import { apply } from './adapter'
import type { Result } from './types'

export default class From<T> extends Base<T> {
  iterator: Iterator<T>
  source: Iterable<T>

  constructor(source: Iterable<T>) {
    super()
    // $FlowFixMe
    this.iterator = source[Symbol.iterator]()
    this.source = source
  }

  inspect(): string {
    return `Iter(${String(this.source)})`
  }

  next(): Result<T> {
    const adapters = this.adapters
    const iterator = this.iterator
    let value = SKIP

    while (value === SKIP) {
      const result = iterator.next()

      if (result.done) {
        return result
      }

      value = apply(adapters, result.value)

      if (value === DONE) {
        return {
          done: true,
          value: undefined,
        }
      }
    }

    // $FlowFixMe
    return {
      done: false,
      value,
    }
  }
}
