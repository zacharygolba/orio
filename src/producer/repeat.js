// @flow

import * as result from '../result'

import ProducerBase from './base'

export default class RepeatProducer<T> extends ProducerBase<T> {
  value: T

  constructor(value: T) {
    super()
    this.value = value
  }

  next(): IteratorResult<T, void> {
    return result.next(this.value)
  }

  sizeHint(): number {
    return Infinity
  }
}
