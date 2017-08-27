// @flow

import { ProducerBase } from '../producer'

export default class SkipWhileAdapter<T> extends ProducerBase<T> {
  fn: T => boolean
  producer: Iterator<T>
  skipped: boolean

  constructor(producer: Iterator<T>, fn: T => boolean) {
    super()
    this.fn = fn
    this.producer = producer
    this.skipped = false
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (next.done || this.skipped) {
      return next
    }

    this.skipped = !this.fn(next.value)
    return this.skipped ? next : this.next()
  }
}
