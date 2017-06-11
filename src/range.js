/* @flow */

import { DONE, SKIP } from './constants'
import Base from './base'
import { apply, done } from './adapter'

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

  next(): IteratorResult<number, void> {
    const adapters = this.adapters
    const end = this.end
    let cursor = this.cursor
    let value = SKIP

    while (value === SKIP) {
      if (cursor > end) {
        return done()
      }

      value = apply(adapters, cursor++)

      if (value === DONE) {
        return done()
      }
    }

    this.cursor = cursor

    return {
      done: false,
      value,
    }
  }
}

