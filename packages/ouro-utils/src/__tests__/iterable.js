// @flow

import { isIterableObject, intoIterator } from '../iterable'

test('.isIterableObject()', () => {
  expect(isIterableObject(new Map())).toBe(true)
  expect(isIterableObject(new Set())).toBe(true)

  expect(isIterableObject({})).toBe(false)
})

test('.intoIterator()', () => {
  expect(intoIterator(new Map())).toMatchSnapshot()
  expect(intoIterator(new Set())).toMatchSnapshot()
})
