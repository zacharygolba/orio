// @flow

import Enumerate from '../enumerate'
import intoIter from '../../utils/into-iter'

let iter

beforeEach(() => {
  iter = new Enumerate(intoIter([1, 2, 3]))
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
