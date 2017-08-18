// @flow

import FlatMap from '../flat-map'
import intoIter from '../../utils/into-iter'

let iter

beforeEach(() => {
  iter = new FlatMap(intoIter([1, 2, 3]), value => [value])
})

test('#next()', () => {
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
  expect(iter.next()).toMatchSnapshot()
})

test('#sizeHint()', () => {
  expect(iter.sizeHint()).toEqual(Infinity)
})
