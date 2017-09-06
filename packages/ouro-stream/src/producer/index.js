// @flow

import { intoIterator } from 'ouro-utils'
import type { AsyncProducer, AsyncSource } from 'ouro-types'

import Chars from './chars'
import Empty from './empty'
import Indexed from './indexed'
import Once from './once'
import Task from './task'
import Unbound from './unbound'

export { default as Chars } from './chars'
export { default as Empty } from './empty'
export { default as Indexed } from './indexed'
export { default as Once } from './once'
export { default as Task } from './task'
export { default as Unbound } from './unbound'

export function createProducer<+T>(source: AsyncSource<T>): AsyncProducer<T> {
  if (source == null) {
    return new Empty()
  }

  if (source instanceof Promise) {
    return new Task(source)
  }

  if (Array.isArray(source)) {
    return new Indexed(source)
  }

  if (typeof source === 'string') {
    return new Chars(source)
  }

  {
    const iterator = intoIterator(source)

    if (iterator != null) {
      return new Unbound(iterator)
    }
  }

  return new Once((source: any))
}
