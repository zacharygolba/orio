// @flow

import Cycle from '../cycle'
import { createProducer } from '../../producer'

let subj

beforeEach(() => {
  const producer = createProducer(Promise.resolve([1, 2, 3]))

  subj = new Cycle(producer)
  // $FlowIgnore
  subj.producer.drop = jest.fn()
})

afterEach(() => {
  subj.producer.drop.mockReset()
})

test('#drop()', () => {
  subj.drop()

  expect(subj).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.producer.drop).toHaveBeenCalled()
})

test('#next()', async () => {
  // First cycle...
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()

  // Second cycle...
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()

  // Third cycle...
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
  expect(await subj.next()).toMatchSnapshot()
})
