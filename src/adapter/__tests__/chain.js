// @flow

import Chain from '../chain'
import * as iter from '../../'

let subj

beforeEach(() => {
  const producerA = iter.of(1, 2, 3).producer
  const producerB = iter.of(4, 5, 6).producer
  subj = new Chain(producerA, producerB)
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
