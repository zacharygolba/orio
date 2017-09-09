// @flow

import Cycle from '../cycle'
import * as ouro from '../../'

let subj

const cycle = producer => {
  const adapter = new Cycle(producer)

  jest.spyOn(adapter.producer, 'drop')
  return adapter
}

beforeEach(() => {
  const { producer } = ouro.of(1, 2, 3)
  subj = cycle(producer)
})

afterEach(() => {
  jest.resetAllMocks()
})

test('#drop()', () => {
  subj.drop()

  expect(subj).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.producer.drop).toHaveBeenCalled()
})

test('#next()', () => {
  // First cycle...
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()

  // Second cycle...
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()

  // Third cycle...
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
})
