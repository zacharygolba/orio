// @flow

import FilterMap from '../filter-map'
import * as ouro from '../../'

let subj

beforeEach(() => {
  const { producer } = ouro.of(1, null, 2, undefined, 3)
  subj = new FilterMap(producer, value => value)
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
})
