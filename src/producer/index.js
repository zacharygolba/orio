// @flow

import Iter from '../iter'
// import type { IntoIterator } from '../types'

import { CharProducer, NumberProducer } from './range'
import { MapProducer, SetProducer } from './collection'
import CycleProducer from './cycle'
import IndexedProducer from './indexed'
import RepeatProducer from './repeat'
import UnboundProducer from './unbound'
import type { Producer } from './types'

export type { IndexedCollection, Producer } from './types'
export { MapProducer, SetProducer } from './collection'
export { default as CycleProducer } from './cycle'
export { default as IndexedProducer } from './indexed'
export { CharProducer, NumberProducer } from './range'
export { default as RepeatProducer } from './repeat'
export { default as UnboundProducer } from './unbound'

/*:: declare function createProducer<T>(any): Producer<T> */
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
