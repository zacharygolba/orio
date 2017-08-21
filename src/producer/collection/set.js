// @flow

import ProducerBase from '../base'

export default class SetProducer<T> extends ProducerBase<T> {
  size: number
  source: Iterator<T>

  constructor(source: Set<T>) {
    super()
    this.size = source.size
    this.source = source.values()
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return this.size
  }
}
