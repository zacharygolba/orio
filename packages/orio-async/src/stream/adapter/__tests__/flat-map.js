// @flow

import FlatMap from '../flat-map'
import { createProducer } from '../../producer'

let subj

const flatMap = producer => {
  const adapter = new FlatMap(producer, item => Promise.resolve([item, item]))

  jest.spyOn(adapter.parent, 'drop')
  return adapter
}

beforeEach(() => {
  const producer = createProducer(Promise.resolve([1, 2, 3]))
  subj = flatMap(producer)
})

afterEach(() => {
  jest.resetAllMocks()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.parent.drop).toHaveBeenCalled()
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
