// @flow

import * as result from 'ouro-result'
import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncProducer, AsyncIteratorResult } from 'ouro-types'

@ToString
@AsAsyncIterator
export default class Cycle<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  done: boolean
  index: number
  items: Array<T>
  producer: AsyncProducer<T>
  useProducer: boolean

  constructor(producer: AsyncProducer<T>) {
    this.done = false
    this.index = 0
    this.items = []
    this.producer = producer
    this.useProducer = true
  }

  drop(): void {
    this.done = true
    this.index = 0
    this.items = []
    this.producer.drop()
  }

  async next(): AsyncIteratorResult<T, void> {
    if (this.done) {
      return result.done()
    }

    if (this.useProducer) {
      const next = await this.producer.next()

      if (next.done) {
        this.useProducer = false
        this.producer.drop()
      } else {
        this.items.push(next.value)
        return next
      }
    }

    if (this.index >= this.items.length) {
      this.index = 0
    }

    const value = this.items[this.index]

    this.index += 1
    return result.next(value)
  }
}
