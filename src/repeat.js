/* @flow */

import Base from './base'
import { DONE, SKIP, apply, done } from './adapter'

export default class Repeat<T> extends Base<T> {
  item: T

  constructor(value: T) {
    super()
    this.item = value
  }

  inspect(): string {
    return `Repeat(${String(this.item)})`
  }

  next(): IteratorResult<number, void> {
    const adapters = this.adapters
    const item = this.item
    let value = SKIP

    while (value === SKIP) {
      value = apply(adapters, item)

      if (value === DONE) {
        return done()
      }
    }

    return {
      done: false,
      value,
    }
  }
}
