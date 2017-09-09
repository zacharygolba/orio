// @flow

import { ASYNC_ITERATOR } from 'ouro-utils'
import type { AsyncIterator } from 'ouro-types'

type Target = AsyncIterator<*> | Iterator<*>

export function AsIterator<T: Target>(Klass: Class<T>): Class<T> {
  function iterator(): T {
    return this
  }

  Reflect.defineProperty(iterator, 'name', {
    value: '[Symbol.iterator]',
  })

  Reflect.defineProperty(Klass.prototype, Symbol.iterator, {
    value: iterator,
  })

  return Klass
}

export function AsAsyncIterator<T: Target>(Klass: Class<T>): Class<T> {
  function asyncIterator(): T {
    return this
  }

  Reflect.defineProperty(asyncIterator, 'name', {
    value: '[Symbol.asyncIterator]',
  })

  Reflect.defineProperty(Klass.prototype, ASYNC_ITERATOR, {
    value: asyncIterator,
  })

  return Klass
}
