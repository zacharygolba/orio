// @flow

import Filter from '../filter'
import intoIter from '../../utils/into-iter'

let iter

beforeEach(() => {
  iter = new Filter(intoIter([1, 2, 3]), value => value > 1)
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
