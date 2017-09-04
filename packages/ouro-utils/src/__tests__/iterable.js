// @flow

import { isIterableObject, intoIterator } from '../iterable'

const customIterator = Object.freeze({
  next: () => ({
    done: true,
    value: undefined,
  }),
})

const customIterable = Object.freeze({
  [Symbol.iterator]: () => customIterator,
})

test('.isIterableObject()', () => {
  expect(isIterableObject(new Map())).toBe(true)
  expect(isIterableObject(new Set())).toBe(true)
  expect(isIterableObject(customIterable)).toBe(true)

  expect(isIterableObject({})).toBe(false)
})

test('.intoIterator()', () => {
  expect(intoIterator(new Map())).toMatchSnapshot()
  expect(intoIterator(new Set())).toMatchSnapshot()
  expect(intoIterator(customIterable)).toBe(customIterator)
})
