// @flow

import SkipWhile from '../skip-while'
import * as ouro from '../../'

let subj

beforeEach(() => {
  const { producer } = ouro.of(1, 2, 3, 4, 5, 6)

  subj = new SkipWhile(producer, value => value <= 3)
  // $FlowIgnore
  subj.producer.drop = jest.fn()
})

afterEach(() => {
  subj.producer.drop.mockReset()
})

test('#@@iterator()', () => {
  for (const item of subj) {
    expect(item).toMatchSnapshot()
  }
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
