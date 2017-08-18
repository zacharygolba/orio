// @flow

import { impl } from './iter'

export interface IndexedCollection<T> {
  [key: number]: T;
  length: number;
}

export interface SizedCollection<T> extends Iterable<T> {
  size: number;
}

export const CollectionIterator = impl(class Collection<T> {
  size: number
  source: Iterator<T>

  constructor(source: SizedCollection<T>) {
    this.size = source.size
    // $FlowFixMe
    this.source = source[Symbol.iterator]()
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return this.size
  }
})

export const IndexedIterator = impl(class Indexed<T> {
  source: IndexedCollection<T>
  size: number
  state: number

  constructor(source: IndexedCollection<T>) {
    this.source = source
    this.size = source.length
    this.state = 0
  }

  next(): IteratorResult<T, void> {
    if (this.state >= this.size) {
      return {
        done: true,
        value: undefined,
      }
    }

    return {
      done: false,
      value: this.source[this.state++],
    }
  }

  sizeHint(): number {
    return this.size
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
