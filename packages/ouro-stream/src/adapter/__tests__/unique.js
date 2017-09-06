// @flow

import Unique from '../unique'
import { createProducer } from '../../producer'

let fn
let subj

beforeEach(() => {
  const producer = createProducer(Promise.resolve([1, 2, 1, 3, 2, 3]))

  fn = jest.fn(item => item)
  subj = new Unique(producer, fn)
  // $FlowIgnore
  subj.producer.drop = jest.fn()
})

afterEach(() => {
  fn.mockClear()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.history.size).toBe(0)
  expect(subj.producer.drop).toHaveBeenCalled()
})

test('#next()', async () => {
  {
    const next = await subj.next()

    expect(next).toMatchSnapshot()
    expect(fn).toHaveBeenLastCalledWith(next.value)
  }

  {
    const next = await subj.next()

    expect(next).toMatchSnapshot()
    expect(fn).toHaveBeenLastCalledWith(next.value)
  }

  {
    const next = await subj.next()

    expect(next).toMatchSnapshot()
    expect(fn).toHaveBeenLastCalledWith(next.value)
  }

  expect(subj.next()).toMatchSnapshot()
})
