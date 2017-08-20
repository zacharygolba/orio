// @flow

import type { Producer } from './types'

export class MapProducer<K, V> implements Producer<*> {
  size: number
  source: Iterator<[K, V]>
  /*:: @@iterator: () => Iterator<[K, V]> */

  constructor(source: Map<K, V>) {
    this.size = source.size
    this.source = source.entries()
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<[K, V]> {
    return this
  }

  next(): IteratorResult<[K, V], void> {
    return this.source.next()
  }

  sizeHint(): number {
    return this.size
  }
}

export class SetProducer<T> implements Producer<T> {
  size: number
  source: Iterator<T>
  /*:: @@iterator: () => Iterator<T> */

  constructor(source: Set<T>) {
    this.size = source.size
    this.source = source.values()
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return this.size
  }
}
