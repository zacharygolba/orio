// @flow

import IndexedProducer from './indexed'
import UnboundProducer from './unbound'

export * from './range'
export { default as CycleProducer } from './cycle'
export { default as IndexedProducer } from './indexed'
export { default as RepeatProducer } from './repeat'
export { default as UnboundProducer } from './unbound'
export type { IndexedCollection } from './indexed'

export function createProducer<T>(source: any): Iterator<T> {
  if (source == null) {
    return new IndexedProducer([])
  }

  if (Array.isArray(source) || typeof source === 'string') {
    return new IndexedProducer(source)
  }

  if (source instanceof Set) {
    return source.values()
  }

  if (source instanceof Map) {
    return source.entries()
  }

  if (typeof source[Symbol.iterator] === 'function') {
    return new UnboundProducer(source)
  }

  return new IndexedProducer([source])
}
