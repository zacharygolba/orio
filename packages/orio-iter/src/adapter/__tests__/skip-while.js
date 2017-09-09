// @flow

import SkipWhile from '../skip-while'
import * as orio from '../../'

let subj

beforeEach(() => {
  const { producer } = orio.of(1, 2, 3, 4, 5, 6)
  subj = new SkipWhile(producer, value => value <= 3)

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
