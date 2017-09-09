// @flow

import { ASYNC_ITERATOR } from '../consts'
import {
  isAsyncIterableObject,
  isIterableObject,
  intoAsyncIterator,
  intoIterator,
} from '../iterable'

class AsyncRepeat<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }
}

Reflect.defineProperty(AsyncRepeat.prototype, ASYNC_ITERATOR, {
  value() {
    return {
      next: async () => ({
        done: false,
        value: this.value,
      }),
    }
  },
})

test('.isAsyncIterableObject()', () => {
  expect(isAsyncIterableObject(new AsyncRepeat('test'))).toBe(true)
  expect(isAsyncIterableObject({})).toBe(false)
})

test('.isIterableObject()', () => {
  expect(isIterableObject(new Map())).toBe(true)
  expect(isIterableObject(new Set())).toBe(true)
  expect(isIterableObject({})).toBe(false)
})

test('.intoAsyncIterator()', async () => {
  const iterator = intoAsyncIterator(new AsyncRepeat('test'))

  if (iterator == null) {
    throw new Error('Failed to constructor async iterator')
  }

  expect(iterator).toMatchSnapshot()
  expect(await iterator.next()).toMatchSnapshot()
})

test('.intoIterator()', () => {
  expect(intoIterator(new Map())).toMatchSnapshot()
  expect(intoIterator(new Set())).toMatchSnapshot()
})
