/* @flow */

import { DONE, SKIP } from './constants'
import Base from './base'
import { apply } from './adapter'
import type { Result } from './types'

export default class Range extends Base<number> {
  start: number
  end: number

  constructor(start: number, end?: number = start) {
    super()
    this.cursor = Math.floor(start | 0)
    this.start = this.cursor
    this.end = end === Infinity ? end : Math.floor(end | 0)
    this.size = Math.abs(this.start - this.end) + 1
  }

  inspect(): string {
    return `Range(${this.start}, ${this.end})`
  }

  next(): Result<number> {
    const adapters = this.adapters
    const end = this.end
    let cursor = this.cursor
    let value = SKIP

    while (value === SKIP) {
      if (cursor > end) {
        return {
          done: true,
          value: undefined,
        }
      }

      value = apply(adapters, cursor++)

      if (value === DONE) {
        return {
          done: true,
          value: undefined,
        }
      }
    }

    this.cursor = cursor

    // $FlowFixMe
    return {
      done: false,
      value,
    }
  }
}

