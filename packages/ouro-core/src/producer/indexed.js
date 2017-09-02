// @flow

import * as result from '../result'
import ProducerBase from './base'

export interface IndexedCollection<T> extends Iterable<T> {
  [key: number]: T,
  length: number,
}

export default class IndexedProducer<T> extends ProducerBase<T> {
  index: number
  source: IndexedCollection<T>

  constructor(source: IndexedCollection<T>) {
    super()
    this.index = 0
    this.source = source
  }

  next(): IteratorResult<T, void> {
    const index = this.index
    const source = this.source

    if (index >= source.length) {
      return result.done()
    }

    this.index += 1
    return result.next(source[index])
  }
}
