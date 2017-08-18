// @flow

import Map from '../map'
import intoIter from '../../utils/into-iter'

let iter

beforeEach(() => {
  iter = new Map(intoIter([1, 2, 3]), value => value * 2)
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
