// @flow

import Concat from '../concat'
import { createProducer } from '../../producer'

const defer = (value, wait = 0) =>
  new Promise(resolve => setTimeout(() => resolve(value), wait))

let subj

beforeEach(() => {
  const producerA = createProducer(defer([1, 2], 200))
  const producerB = createProducer(defer([3, 4], 100))
  subj = new Concat(producerA, producerB)

  jest.spyOn(subj.producerA, 'drop')
  jest.spyOn(subj.producerB, 'drop')
})

afterEach(() => {
  jest.resetAllMocks()
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
