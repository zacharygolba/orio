// @flow

import * as result from '../result'

import ProducerBase from './base'
import type { IndexedCollection } from './'

export default class CycleProducer<T> extends ProducerBase<T> {
  source: IndexedCollection<T>
  state: number

  constructor(source: IndexedCollection<T>) {
    super()
    this.source = source
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.source.length) {
      this.state = 0
    }

    const state = this.state
    this.state += 1

    return result.next(this.source[state])
  }
}
