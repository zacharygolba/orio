/* @flow */

import { DONE, SKIP } from './constants'
import Base from './base'
import { apply } from './adapter'
import type { Result } from './types'

export default class Repeat<T> extends Base<T> {
  item: T

  constructor(value: T) {
    super()
    this.item = value
  }

  inspect(): string {
    return `Repeat(${String(this.item)})`
  }

  next(): Result<T> {
    const adapters = this.adapters
    const item = this.item
    let value = SKIP

    while (value === SKIP) {
      value = apply(adapters, item)

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
