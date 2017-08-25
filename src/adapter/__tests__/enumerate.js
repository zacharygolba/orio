// @flow

import Enumerate from '../enumerate'
import * as iter from '../../'

let subj

beforeEach(() => {
  const { producer } = iter.of(1, 2, 3)
  subj = new Enumerate(producer)
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
