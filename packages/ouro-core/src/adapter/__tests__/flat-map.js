// @flow

import FlatMap from '../flat-map'
import * as ouro from '../../'

let subj

const flatMap = producer => {
  const adapter = new FlatMap(producer, item => ouro.repeat(item).take(2))

  // $FlowIgnore
  adapter.parent.drop = jest.fn()
  return adapter
}

beforeEach(() => {
  const { producer } = ouro.of(1, 2, 3)
  subj = flatMap(producer)
})

afterEach(() => {
  subj.parent.drop.mockReset()
})

test('#@@iterator()', () => {
  for (const item of subj) {
    expect(item).toMatchSnapshot()
  }
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
