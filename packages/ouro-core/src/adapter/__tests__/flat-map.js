// @flow

import FlatMap from '../flat-map'
import * as ouro from '../../'

let subj

beforeEach(() => {
  const { producer } = ouro.of(1, 2, 3)
  subj = new FlatMap(producer, item => ouro.repeat(item).take(2))
})

test('#@@iterator()', () => {
  for (const item of subj) {
    expect(item).toMatchSnapshot()
  }
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
