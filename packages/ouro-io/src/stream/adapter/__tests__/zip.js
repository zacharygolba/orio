// @flow

import Zip from '../zip'
import { createProducer } from '../../producer'

let subj

const zip = (a, b) => {
  const adapter = new Zip(a, b)

  jest.spyOn(adapter.producerA, 'drop')
  jest.spyOn(adapter.producerB, 'drop')

  return adapter
}

beforeEach(() => {
  const producerA = createProducer(Promise.resolve(['test', 'test', 'test']))
  const producerB = Promise.resolve([1, 2, 3])
  subj = zip(producerA, producerB)
})

afterEach(() => {
  jest.resetAllMocks()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.producerA.drop).toHaveBeenCalled()
  expect(subj.producerB.drop).toHaveBeenCalled()
})

describe('#next()', () => {
  test('with an lhs == rhs', async () => {
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
  })

  test('with a bound lhs > rhs', async () => {
    const producerA = createProducer(Promise.resolve([1, 2, 3]))
    const producerB = Promise.resolve(['test'])
    subj = zip(producerA, producerB)

    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
  })

  test('with a self reference to lhs', async () => {
    const producer = createProducer(Promise.resolve([1, 2, 3, 4]))
    subj = zip(producer, producer)

    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
  })
})
