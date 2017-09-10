// @flow

import Tap from '../tap'
import { createProducer } from '../../producer'

const fn = jest.fn()
let subj

beforeEach(() => {
  const producer = createProducer(Promise.resolve([1, 2, 3]))
  subj = new Tap(producer, fn)

  jest.spyOn(subj.producer, 'drop')
})

afterEach(() => {
  fn.mockReset()
  jest.resetAllMocks()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.producer.drop).toHaveBeenCalled()
})

test('#next()', async () => {
  expect(await subj.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledWith(1)

  expect(await subj.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledWith(2)

  expect(await subj.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledWith(3)

  expect(await subj.next()).toMatchSnapshot()
  expect(fn).toHaveBeenCalledTimes(3)
})
