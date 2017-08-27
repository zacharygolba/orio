// @flow

import Take from '../take'
import * as iter from '../../'

let subj

beforeEach(() => {
  const { producer } = iter.repeat('test')
  subj = new Take(producer, 3)
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
