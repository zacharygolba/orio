// @flow

import Tap from '../tap'
import * as ouro from '../../'

const fn = jest.fn()
let subj

beforeEach(() => {
  const { producer } = ouro.of(1, 2, 3)

  subj = new Tap(producer, fn)
  // $FlowIgnore
  subj.producer.drop = jest.fn()
})

afterEach(() => {
  fn.mockReset()
  subj.producer.drop.mockReset()
})

test('#@@iterator()', () => {
  for (const item of subj) {
    expect(item).toMatchSnapshot()
  }
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
