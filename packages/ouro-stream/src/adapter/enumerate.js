// @flow

import * as result from 'ouro-result'
import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'ouro-types'

@ToString
@AsAsyncIterator
export default class Enumerate<T> implements AsyncProducer<[number, T]> {
  /*:: @@asyncIterator: () => $AsyncIterator<[number, T], void, void> */
  producer: AsyncProducer<T>
  state: number

  constructor(producer: AsyncProducer<T>) {
    this.producer = producer
    this.state = 0
  }

  drop(): void {
    this.producer.drop()
  }

  async next(): AsyncIteratorResult<[number, T], void> {
    const next = await this.producer.next()

    if (next.done) {
      return next
    }

    const { state } = this
    this.state += 1

    return result.next([state, next.value])
  }
}
