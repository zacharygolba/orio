// @flow

import type { Readable } from 'stream'

import * as result from 'ouro-result'
import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'ouro-types'

// import * as status from '../status'

@ToString
@AsAsyncIterator
export default class Reader<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  value: void
  source: Readable

  constructor(source: Readable) {
    this.source = source
  }

  drop(): void {
    this.value = undefined
  }

  async next(): AsyncIteratorResult<*, void> {
    return result.done(this.value)
  }
}
