// @flow

import SkipWhile from '../skip-while'
import * as iter from '../../'

let subj

beforeEach(() => {
  const { producer } = iter.of(1, 2, 3, 4, 5, 6)
  subj = new SkipWhile(producer, value => value <= 3)
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
  expect(subj.sizeHint()).toEqual(6)
})
