// @flow

import type { AsyncIterator } from 'ouro-types'

import { ASYNC_ITERATOR } from './consts'

type Target = { [key: any]: mixed }
type IterFn<+T> = () => Iterator<T>
type AsyncIterFn<+T> = () => AsyncIterator<T>

function extractAsyncIteratorFn<T: Target>(target: T): ?AsyncIterFn<*> {
  const value = target[ASYNC_ITERATOR]

  if (typeof value === 'function') {
    return value
  }

  return undefined
}

function extractIteratorFn<T: Target>(target: T): ?IterFn<*> {
  const value = target[Symbol.iterator]

  if (typeof value === 'function') {
    return value
  }

  return undefined
}

export function isAsyncIterableObject(target: mixed): boolean %checks {
  return (
    target != null &&
    typeof target === 'object' &&
    typeof extractAsyncIteratorFn(target) === 'function'
  )
}

export function isIterableObject(target: mixed): boolean %checks {
  return (
    target != null &&
    typeof target === 'object' &&
    typeof extractIteratorFn(target) === 'function'
  )
}

export function intoAsyncIterator(target: mixed): ?AsyncIterator<*> {
  if (target != null && typeof target === 'object') {
    const asyncIterFn = extractAsyncIteratorFn(target)

    if (typeof asyncIterFn === 'function') {
      return asyncIterFn.call(target)
    }
  }

  return undefined
}

export function intoIterator(target: mixed): ?Iterator<*> {
  if (target != null && typeof target === 'object') {
    const iterFn = extractIteratorFn(target)

    if (typeof iterFn === 'function') {
      return iterFn.call(target)
    }
  }

  return undefined
}
