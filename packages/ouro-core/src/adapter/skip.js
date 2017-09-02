// @flow

import { AsIterator, ToString } from 'ouro-traits'

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
export default class Skip<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  amount: number
  producer: Iterator<T>
  calls: number

  constructor(producer: Iterator<T>, amount: number) {
    this.amount = amount
    this.calls = 0
    this.producer = producer
  }

  next(): IteratorResult<T, void> {
    return exec(this)
  }
}
