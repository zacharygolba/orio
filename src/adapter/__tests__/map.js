// @flow

import Map from '../map'
import * as iter from '../../'

let subj

beforeEach(() => {
  const { producer } = iter.from([1, 2, 3])
  subj = new Map(producer, value => value * 2)
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
})

test('#sizeHint()', () => {
  expect(subj.sizeHint()).toEqual(3)
})
