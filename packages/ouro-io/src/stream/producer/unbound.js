// @flow

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
  source: UnboundSource<T>

  constructor(source: UnboundSource<T>) {
    this.source = source
  }

  drop(): void {
    if (typeof this.source.drop === 'function') {
      this.source.drop()
    }
  }

  async next(): AsyncIteratorResult<T, void> {
    return this.source.next()
  }
}
