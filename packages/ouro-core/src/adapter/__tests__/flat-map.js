// @flow

import FlatMap from '../flat-map'
import * as ouro from '../../'

let subj

const flatMap = producer => {
  const adapter = new FlatMap(producer, item => ouro.repeat(item).take(2))

  jest.spyOn(adapter.parent, 'drop')
  return adapter
}

beforeEach(() => {
  const { producer } = ouro.of(1, 2, 3)
  subj = flatMap(producer)
})

afterEach(() => {
  jest.resetAllMocks()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.parent.drop).toHaveBeenCalled()
})

test('#next()', () => {
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
  expect(subj.next()).toMatchSnapshot()
})
