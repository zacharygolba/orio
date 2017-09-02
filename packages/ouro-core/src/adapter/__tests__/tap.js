// @flow

import Tap from '../tap'
import * as ouro from '../../'

const fn = jest.fn()
let subj

beforeEach(() => {
  const { producer } = ouro.of(1, 2, 3)
  subj = new Tap(producer, fn)
})

afterEach(fn.mockReset)

test('#@@iterator()', () => {
  for (const item of subj) {
    expect(item).toMatchSnapshot()
  }
})

test('#next()', () => {
  expect(subj.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledWith(1)

  expect(subj.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledWith(2)

  expect(subj.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledWith(3)

  expect(subj.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledTimes(3)
})
