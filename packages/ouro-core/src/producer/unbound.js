// @flow

import { AsIterator, ToString } from 'ouro-traits'

@ToString
@AsIterator
export default class UnboundProducer<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  source: Iterator<T>

  constructor(source: Iterable<T>) {
    // $FlowIgnore
    this.source = source[Symbol.iterator]()
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }
}
