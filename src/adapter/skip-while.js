// @flow

import { ProducerBase } from '../producer'

import Filter from './filter'

export default class SkipWhileAdapter<T> extends ProducerBase<T> {
  producer: Iterator<T>

  constructor(producer: Iterator<T>, fn: T => boolean) {
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
}
