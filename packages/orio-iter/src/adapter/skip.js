// @flow

import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

function exec<T>(adapter: Skip<T>): IteratorResult<T, void> {
  const next = adapter.producer.next()

  if (adapter.calls >= adapter.amount) {
    return next
  }

  // eslint-disable-next-line no-param-reassign
  adapter.calls += 1
  return exec(adapter)
}

@ToString
@AsIterator
export default class Skip<T> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  amount: number
  producer: Producer<T>
  calls: number

  constructor(producer: Producer<T>, amount: number) {
    this.amount = amount
    this.calls = 0
    this.producer = producer
  }

  drop(): void {
    this.producer.drop()
  }

  next(): IteratorResult<T, void> {
    return exec(this)
  }
}
