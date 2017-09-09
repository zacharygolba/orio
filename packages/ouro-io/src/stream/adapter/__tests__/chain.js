// @flow

import Chain from '../chain'
import { createProducer } from '../../producer'

let subj

beforeEach(() => {
  const producerA = createProducer(Promise.resolve([1, 2, 3]))
  const producerB = Promise.resolve([4, 5, 6])

  subj = new Chain(producerA, producerB)
  // $FlowIgnore
  subj.producerA.drop = jest.fn()
  // $FlowIgnore
  subj.producerB.drop = jest.fn()
})

afterEach(() => {
  subj.producerA.drop.mockReset()
  subj.producerB.drop.mockReset()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.producerA.drop).toHaveBeenCalled()
  expect(subj.producerB.drop).toHaveBeenCalled()
})

test('#next()', async () => {
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
})
