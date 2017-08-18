// @flow

import Tap from '../tap'
import intoIter from '../../utils/into-iter'

const fn = jest.fn()
let iter

afterEach(fn.mockReset)
beforeEach(() => {
  iter = new Tap(intoIter([1, 2, 3]), fn)
})

test('#next()', () => {
  expect(iter.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledWith(1)

  expect(iter.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledWith(2)

  expect(iter.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledWith(3)

  expect(iter.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledTimes(3)
})

test('#sizeHint()', () => {
  expect(iter.sizeHint()).toEqual(3)
})
