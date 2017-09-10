// @flow

import * as result from 'orio-result'
import { AsAsyncIterator, ToString } from 'orio-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'orio-types'

@ToString
@AsAsyncIterator
export default class Empty implements AsyncProducer<*> {
  /*:: @@asyncIterator: () => $AsyncIterator<*, void, void> */
  value: void

  drop(): void {
    this.value = undefined
  }

  async next(): AsyncIteratorResult<*, void> {
    return result.done(this.value)
  }
}
