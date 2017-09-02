// @flow

import type { Drop } from '../types'

import Indexed from './indexed'
import Unbound from './unbound'

export * from './range'
export { default as Cycle } from './cycle'
export { default as Indexed } from './indexed'
export { default as Repeat } from './repeat'
export { default as Unbound } from './unbound'

export function createProducer<T>(source: any): Drop & Iterator<T> {
  if (source == null) {
    return new Indexed([])
  }

  if (Array.isArray(source)) {
    return new Indexed(source)
  }

  if (typeof source === 'string') {
    return new Indexed(source)
  }

  if (typeof source[Symbol.iterator] === 'function') {
    return new Unbound(source[Symbol.iterator]())
  }

  return new Indexed([source])
}
