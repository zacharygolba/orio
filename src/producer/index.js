// @flow

import Iter from '../iter'

import { CharProducer, NumberProducer } from './range'
import { IndexedProducer, MapProducer, SetProducer } from './collection'
import CycleProducer from './cycle'
import RepeatProducer from './repeat'
import UnboundProducer from './unbound'

export * from './range'
export * from './collection'
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

  if (
    source instanceof CharProducer
    || source instanceof NumberProducer
    || source instanceof MapProducer
    || source instanceof SetProducer
    || source instanceof CycleProducer
    || source instanceof IndexedProducer
    || source instanceof RepeatProducer
    || source instanceof UnboundProducer
  ) {
    return source
  }

  if (source instanceof Iter) {
    return source.producer
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
