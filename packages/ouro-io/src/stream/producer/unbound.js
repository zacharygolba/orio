// @flow

import * as result from 'ouro-result'
import { AsAsyncIterator, ToString } from 'ouro-traits'
import type {
  AsyncProducer,
  AsyncIterator,
  AsyncIteratorResult,
  Producer,
} from 'ouro-types'

type UnboundSource<T> =
  | AsyncProducer<T>
  | Producer<T>
  | AsyncIterator<T>
  | Iterator<T>

@ToString
@AsAsyncIterator
export default class Unbound<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  done: boolean
  source: UnboundSource<T>

  constructor(source: UnboundSource<T>) {
    this.done = false
    this.source = source
  }

  drop(): void {
    this.done = true

    if (typeof this.source.drop === 'function') {
      this.source.drop()
    }
  }

  async next(): AsyncIteratorResult<T, void> {
    if (this.done) {
      return result.done()
    }

    return this.source.next()
  }
}
