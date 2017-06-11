/* @flow */

import Base from './base'
import { DONE, SKIP, apply, done } from './adapter'

export default class From<T> extends Base<T> {
  iterator: Iterator<T>
  source: Iterable<T>

  constructor(source: Iterable<T>) {
    super()
    this.iterator = source[Symbol.iterator]()
    this.source = source
  }

  inspect(): string {
    return `Iter(${String(this.source)})`
  }

  next(): IteratorResult<T, void> {
    const adapters = this.adapters
    const iterator = this.iterator
    let value = SKIP

    while (value === SKIP) {
      const result = iterator.next()

      if (result.done) {
        return result
      }

      value = apply(adapters, result.value)

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
