// @flow

import FlatMap from '../flat-map'
import * as iter from '../../'

let subj

beforeEach(() => {
  const { producer } = iter.from([1, 2, 3])
  subj = new FlatMap(producer, item => iter.repeat(item).take(2))
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

test('#sizeHint()', () => {
  expect(subj.sizeHint()).toEqual(3)

  // eslint-disable-next-line no-empty, no-unused-vars
  for (const _ of subj) {
  }

  expect(subj.sizeHint()).toEqual(6)
})
