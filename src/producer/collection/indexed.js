// @flow

import * as result from '../../result'
import ProducerBase from '../base'

export interface IndexedCollection<T> extends Iterable<T> {
  [key: number]: T,
  length: number,
}

export default class IndexedProducer<T> extends ProducerBase<T> {
  source: IndexedCollection<T>
  size: number
  state: number

  constructor(source: IndexedCollection<T>) {
    super()
    this.source = source
    this.size = source.length
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.size) {
      return result.done()
    }

    const value = this.source[this.state]

    this.state += 1
    return result.next(value)
  }

  sizeHint(): number {
    return this.size
  }
}
