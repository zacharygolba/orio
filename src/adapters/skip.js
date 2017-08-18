// @flow

import { impl } from '../iter'
import sizeOf from '../utils/size-of'

export default impl(class Skip<T> {
  amount: number
  source: Iterator<T>
  state: number

  constructor(source: Iterator<T>, amount: number) {
    this.amount = amount
    this.source = source
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    let result = this.source.next()

    if (this.state < this.amount) {
      while (!result.done && this.state < this.amount) {
        result = this.source.next()
        this.state++
      }
    }

    return result
  }

  sizeHint(): number {
    return Math.max(sizeOf(this.source) - this.amount, 0)
  }
})
