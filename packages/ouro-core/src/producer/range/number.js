// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

import type { Producer } from '../../types'

@ToString
@AsIterator
export default class Numbers implements Producer<number> {
  /*:: @@iterator: () => Iterator<number> */
  done: boolean
  end: number
  start: number
  state: number
  step: number

  constructor(s?: number = 0, e?: number = Infinity) {
    const start = +s
    const end = +e

    if (Number.isNaN(start) || Number.isNaN(end)) {
      this.drop()
    } else if (start > end) {
      this.end = end
      this.start = Number.isFinite(start) ? start : Number.MAX_SAFE_INTEGER
      this.step = -1
      this.state = this.start
    } else {
      this.end = Number.isFinite(end) ? end : Number.MAX_SAFE_INTEGER
      this.start = start
      this.step = 1
      this.state = this.start
    }
  }

  drop(): void {
    this.done = true
    this.end = 0
    this.start = 0
    this.state = 0
    this.step = 0
  }

  next(): IteratorResult<number, void> {
    if (this.done) {
      return result.done()
    }

    const value = this.state

    if (value === this.end) {
      this.done = true
    } else {
      this.state += this.step
    }

    return result.next(value)
  }
}
