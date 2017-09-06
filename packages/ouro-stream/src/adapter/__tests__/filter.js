// @flow

import Filter from '../filter'
import { createProducer } from '../../producer'

let subj

beforeEach(() => {
  const producer = createProducer(Promise.resolve([1, 2, 3]))

  subj = new Filter(producer, value => value > 1)
  // $FlowIgnore
  subj.producer.drop = jest.fn()
})

afterEach(() => {
  subj.producer.drop.mockReset()
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
