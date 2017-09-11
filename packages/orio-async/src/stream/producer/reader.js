// @flow

import { AsAsyncIterator, ToString } from 'orio-traits'
import type {
  AsyncProducer,
  AsyncIteratorResult,
  ReadableSource,
} from 'orio-types'

@ToString
@AsAsyncIterator
export default class Reader implements AsyncProducer<*> {
  /*:: @@asyncIterator: () => $AsyncIterator<*, void, void> */
  source: ReadableSource<*>

  constructor(source: ReadableSource<*>) {
    this.source = source
  }

  drop(): void {
    this.source.cancel()
  }

  next(): AsyncIteratorResult<*, void> {
    return this.source.read()
  }
}
