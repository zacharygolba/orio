// @flow

import type { Producer, Source } from '../types'

import Chars from './chars'
import Indexed from './indexed'
import Unbound from './unbound'

export * from './range'
export { default as Chars } from './chars'
export { default as Indexed } from './indexed'
export { default as Repeat } from './repeat'
export { default as Unbound } from './unbound'

export function createProducer<I>(source: Source<I>): Producer<I> {
  if (source == null) {
    return new Indexed([])
  }

  if (Array.isArray(source)) {
    return new Indexed(source)
  }

  if (typeof source === 'string') {
    return new Chars(source)
  }

  if (typeof source === 'object') {
    const iterator = source[Symbol.iterator]

    if (typeof iterator === 'function') {
      return new Unbound(iterator.call(source))
    }
  }

  return new Indexed([(source: any)])
}
