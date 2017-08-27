// @flow

import Filter from '../filter'
import * as iter from '../../'

let subj

beforeEach(() => {
  const { producer } = iter.of(1, 2, 3)
  subj = new Filter(producer, value => value > 1)
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
