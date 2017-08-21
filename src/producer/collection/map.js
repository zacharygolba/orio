// @flow

import ProducerBase from '../base'

export default class MapProducer<K, V> extends ProducerBase<*> {
  size: number
  source: Iterator<[K, V]>

  constructor(source: Map<K, V>) {
    super()
    this.size = source.size
    this.source = source.entries()
  }

  next(): IteratorResult<[K, V], void> {
    return this.source.next()
  }

  sizeHint(): number {
    return this.size
  }
}
