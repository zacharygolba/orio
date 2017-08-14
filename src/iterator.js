// @flow

import { impl } from './iter'
import type { IndexedCollection } from './types'

export const IndexedIterator = impl(class Indexed<T> {
  index: number
  length: number
  source: IndexedCollection<T>

  constructor(source: IndexedCollection<T>) {
    this.index = 0
    this.source = source
    this.length = source.length
  }

  next(): IteratorResult<T, void> {
    if (this.index >= this.length) {
      return {
        done: true,
        value: undefined,
      }
    }

    return {
      done: false,
      value: this.source[this.index++],
    }
  }

  sizeHint() {
    return this.length
  }
})

export const UnboundedIterator = impl(class Unbounded<T> {
  source: Iterator<T>

  constructor(source: Iterable<T>) {
    // $FlowFixMe
    this.source = source[Symbol.iterator]()
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return Infinity
  }
})
