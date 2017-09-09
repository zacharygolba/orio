// @flow

import * as result from 'ouro-result'
import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'ouro-types'

@ToString
@AsAsyncIterator
export default class Indexed<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  index: number
  source: $ReadOnlyArray<T>

  constructor(source: $ReadOnlyArray<T>) {
    this.index = 0
    this.source = source
  }

  drop(): void {
    this.index = 0
    this.source = []
  }

  async next(): AsyncIteratorResult<T, void> {
    const { index, source } = this

    if (index >= source.length) {
      return result.done()
    }

    this.index += 1
    return result.next(source[index])
  }
}
