// @flow

import Tap from '../tap'
import * as orio from '../../'

const fn = jest.fn()
let subj

beforeEach(() => {
  const { producer } = orio.of(1, 2, 3)
  subj = new Tap(producer, fn)

  jest.spyOn(subj.producer, 'drop')
})

afterEach(() => {
  jest.resetAllMocks()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.producer.drop).toHaveBeenCalled()
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
