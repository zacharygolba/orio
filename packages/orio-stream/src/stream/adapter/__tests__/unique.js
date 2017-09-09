// @flow

import Unique from '../unique'
import { createProducer } from '../../producer'

const fn = jest.fn(item => item)

const unique = () => {
  const producer = createProducer(Promise.resolve([1, 2, 1, 3, 2, 3]))
  const adapter = new Unique(producer, fn)

  jest.spyOn(adapter.producer, 'drop')
  return adapter
}

test('#drop()', () => {
  const subj = unique()

  expect(subj.drop()).toBeUndefined()
  expect(subj.history.size).toBe(0)
  expect(subj.producer.drop).toHaveBeenCalled()
})

describe('#next()', () => {
  let subj

  beforeAll(() => {
    subj = unique()
  })

  beforeEach(() => {
    fn.mockClear()
  })

  test('call #1', async () => {
    const result = await subj.next()

    expect(result).toMatchSnapshot()
    expect(fn).toHaveBeenLastCalledWith(result.value)
  })

  test('call #2', async () => {
    const result = await subj.next()

    expect(result).toMatchSnapshot()
    expect(fn).toHaveBeenLastCalledWith(result.value)
  })

  test('call #3', async () => {
    const result = await subj.next()

    expect(result).toMatchSnapshot()
    expect(fn).toHaveBeenLastCalledWith(result.value)
  })

  test('call #4', async () => {
    const { done, value } = await subj.next()

    expect(done).toBe(true)
    expect(value).toBeUndefined()
    expect(fn).toHaveBeenCalledWith(3)
    expect(fn).toHaveBeenCalledWith(2)
  })
})
