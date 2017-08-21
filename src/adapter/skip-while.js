// @flow

import { ProducerBase } from '../producer'
import type { Producer } from '../producer'

import Filter from './filter'

export default class SkipWhileAdapter<T> extends ProducerBase<T> {
  producer: Producer<T>

  constructor(producer: Producer<T>, fn: T => boolean) {
    super()

    let willSkip = true

    this.producer = new Filter(producer, value => {
      if (willSkip) {
        willSkip = fn(value)
        return !willSkip
      }

      return true
    })
  }

  next(): IteratorResult<T, void> {
    return this.producer.next()
  }

  sizeHint(): number {
    return this.producer.sizeHint()
  }
}
