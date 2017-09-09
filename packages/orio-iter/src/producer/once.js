// @flow

import * as result from 'orio-result'
import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

@ToString
@AsIterator
export default class Once<T> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  done: boolean
  value: T

  constructor(value: T) {
    this.done = false
    this.value = value
  }

  drop(): void {
    this.done = true
  }

  next(): IteratorResult<T, void> {
    if (this.done) {
      return result.done()
    }

    this.done = true
    return result.next(this.value)
  }
}
