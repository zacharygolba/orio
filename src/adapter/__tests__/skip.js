// @flow

import Skip from '../skip'
import * as iter from '../../'

let subj

beforeEach(() => {
  const { producer } = iter.of(1, 2, 3, 4, 5, 6)
  subj = new Skip(producer, 3)
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

describe('#sizeHint()', () => {
  test('with an exact size', () => {
    expect(subj.sizeHint()).toEqual(3)
  })

  test('with an unbound producer', () => {
    subj.producer = iter.repeat().producer

    expect(subj.sizeHint()).toEqual(Infinity)
  })
})
