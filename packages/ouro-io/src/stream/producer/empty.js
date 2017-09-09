// @flow

import * as result from 'ouro-result'
import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'ouro-types'

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
