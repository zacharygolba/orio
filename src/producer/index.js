// @flow

import { IndexedProducer, MapProducer, SetProducer } from './collection'
import ProducerBase from './base'
import UnboundProducer from './unbound'

export * from './range'
export * from './collection'
export { default as ProducerBase } from './base'
export { default as CycleProducer } from './cycle'
export { default as RepeatProducer } from './repeat'
export { default as UnboundProducer } from './unbound'

export interface Producer<T> extends Iterator<T> {
  sizeHint(): number,
}

export function createProducer<T>(source: any): Producer<T> {
  if (source == null) {
    return new IndexedProducer([])
  }

  if (Array.isArray(source) || typeof source === 'string') {
    return new IndexedProducer(source)
  }

  if (source instanceof ProducerBase) {
    return source
  }

  if (source instanceof Set) {
    return new SetProducer(source)
  }

  if (source instanceof Map) {
    return new MapProducer(source)
  }

  if (typeof source[Symbol.iterator] === 'function') {
    return new UnboundProducer(source)
  }

  return new IndexedProducer([source])
}
