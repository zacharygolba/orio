// @flow

import Enumerate from '../enumerate'
import * as orio from '../../'

let subj

beforeEach(() => {
  const { producer } = orio.of(1, 2, 3)
  subj = new Enumerate(producer)

  jest.spyOn(subj.producer, 'drop')
})

afterEach(() => {
  jest.resetAllMocks()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.producer.drop).toHaveBeenCalled()
})

test('#next()', () => {
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
})
