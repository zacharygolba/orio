// @flow

import * as result from '../../result'
import type { Producer } from '../'

export default class NumberProducer implements Producer<*> {
  done: boolean
  end: number
  size: number
  start: number
  state: number
  step: number
  /*:: @@iterator: () => Iterator<number> */

  constructor(start?: number = 0, end?: number = Infinity) {
    this.size = Math.abs(start - end) + 1

    if (Number.isNaN(start) || Number.isNaN(end) || this.size === 0) {
      this.done = true
      this.end = 0
      this.start = 0
      this.step = 0
    } else if (start > end) {
      this.end = end
      this.start = Number.isFinite(start) ? start : Number.MAX_SAFE_INTEGER
      this.step = -1
    } else {
      this.end = Number.isFinite(end) ? end : Number.MAX_SAFE_INTEGER
      this.start = start
      this.step = 1
    }

    this.state = this.start
  }

  // $FlowIgnore
  [Symbol.iterator](): Iterator<number> {
    return this
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

  sizeHint(): number {
    return this.size
  }
}
