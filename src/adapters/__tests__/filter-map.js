// @flow

import FilterMap from '../filter-map'
import intoIter from '../../utils/into-iter'

let iter

beforeEach(() => {
  iter = new FilterMap(intoIter([1, null, 2, undefined, 3]), value => value)
})

test('#next()', () => {
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
})

test('#sizeHint()', () => {
  expect(iter.sizeHint()).toEqual(5)
})
