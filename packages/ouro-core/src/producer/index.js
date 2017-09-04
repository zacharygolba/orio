// @flow

import { intoIterator } from 'ouro-utils'

import type { Producer, Source } from '../types'

import Chars from './chars'
import Empty from './empty'
import Indexed from './indexed'
import Once from './once'
import Unbound from './unbound'

export * from './range'
export { default as Chars } from './chars'
export { default as Empty } from './empty'
export { default as Indexed } from './indexed'
export { default as Once } from './once'
export { default as Repeat } from './repeat'
export { default as Unbound } from './unbound'

export function createProducer<+T>(source: Source<T>): Producer<T> {
  if (source == null) {
    return new Empty()
  }

  if (Array.isArray(source)) {
    return new Indexed(source)
  }

  {
    const iterator = intoIterator(source)

    if (iterator != null) {
      return new Unbound(iterator)
    }
  }

  if (typeof source === 'string') {
    return new Chars(source)
  }

  return new Once((source: any))
}
