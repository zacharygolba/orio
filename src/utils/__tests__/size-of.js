// @flow

import intoIter from '../into-iter'
import sizeOf from '../size-of'

test('with a #sizeHint() method', () => {
  expect(sizeOf(intoIter('test'))).toBe(4)
})

test('without a #sizeHint() method', () => {
  expect(sizeOf('test')).toBe(Infinity)
})
