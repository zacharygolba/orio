// @flow

import * as result from 'ouro-result'
import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'ouro-types'

@ToString
@AsAsyncIterator
export default class Once<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  done: boolean
  value: T

  constructor(value: T) {
    this.done = false
    this.value = value
  }

  drop(): void {
    this.done = true
  }

  async next(): AsyncIteratorResult<T, void> {
    if (this.done) {
      return result.done()
    }

    this.done = true
    return result.next(this.value)
  }
}
