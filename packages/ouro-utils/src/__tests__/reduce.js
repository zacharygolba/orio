// @flow

import reduce from '../reduce'

let source

beforeEach(() => {
  source = new Set([1, 2, 3]).values()
})

test('with an initial value', () => {
  expect(reduce((a, b) => a + b, 0, source)).toBe(6)
})

test('without an initial value', () => {
  expect(reduce((a = 0, b) => a + b, undefined, source)).toBe(6)
})
