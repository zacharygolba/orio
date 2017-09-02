// @flow

import Indexed from './indexed'
import Unbound from './unbound'

export * from './range'
export { default as Cycle } from './cycle'
export { default as Indexed } from './indexed'
export { default as Repeat } from './repeat'
export { default as Unbound } from './unbound'
export type { IndexedCollection } from './indexed'

export function createProducer<T>(source: any): Iterator<T> {
  if (source == null) {
    return new Indexed([])
  }

  if (Array.isArray(source) || typeof source === 'string') {
    return new Indexed(source)
  }

  if (source instanceof Set) {
    return source.values()
  }

  if (source instanceof Map) {
    return source.entries()
  }

  if (typeof source[Symbol.iterator] === 'function') {
    return new Unbound(source)
  }

  return new Indexed([source])
}
