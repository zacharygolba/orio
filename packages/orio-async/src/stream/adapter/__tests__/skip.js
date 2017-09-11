// @flow

import Skip from '../skip'
import { createProducer } from '../../producer'

let subj

beforeEach(() => {
  const producer = createProducer(Promise.resolve([1, 2, 3, 4, 5, 6]))
  subj = new Skip(producer, 3)

  jest.spyOn(subj.producer, 'drop')
})

afterEach(() => {
  jest.resetAllMocks()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.producer.drop).toHaveBeenCalled()
})

test('#next()', async () => {
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
})
