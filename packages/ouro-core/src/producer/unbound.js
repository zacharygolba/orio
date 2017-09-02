// @flow

import ProducerBase from './base'

export default class UnboundProducer<T> extends ProducerBase<T> {
  source: Iterator<T>

  constructor(source: Iterable<T>) {
    super()
    // $FlowIgnore
    this.source = source[Symbol.iterator]()
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }
}
