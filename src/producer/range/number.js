// @flow

import * as result from '../../result'
import ProducerBase from '../base'

export default class NumberProducer extends ProducerBase<number> {
  done: boolean
  end: number
  size: number
  start: number
  state: number
  step: number

  constructor(s?: number = 0, e?: number = Infinity) {
    super()

    const start = Number(s)
    const end = Number(e)

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
