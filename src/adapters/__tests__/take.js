// @flow

import Take from '../take'
import repeat from '../../repeat'

let iter

beforeEach(() => {
  iter = new Take(repeat('test'), 3)
})

test('#next()', () => {
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
})

test('#sizeHint()', () => {
  expect(iter.sizeHint()).toEqual(3)
})
