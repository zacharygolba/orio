// @flow

import TakeWhile from '../take-while'
import intoIter from '../../utils/into-iter'

let iter

beforeEach(() => {
  iter = new TakeWhile(intoIter([1, 2, 3, 4, 5, 6]), value => value <= 3)
})

test('#next()', () => {
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
})

test('#sizeHint()', () => {
  expect(iter.sizeHint()).toEqual(6)
})
