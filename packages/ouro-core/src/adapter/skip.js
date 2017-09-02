// @flow

import { AsIterator, ToString } from 'ouro-traits'

import type { Drop } from '../types'

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
export default class Skip<T> implements Drop, Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  amount: number
  producer: Drop & Iterator<T>
  calls: number

  constructor(producer: Drop & Iterator<T>, amount: number) {
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
