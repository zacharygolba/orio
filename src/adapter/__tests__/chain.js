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

describe('#sizeHint()', () => {
  test('with an exact size', () => {
    expect(subj.sizeHint()).toEqual(6)
  })

  test('with an unbound producer', () => {
    subj.producerA = iter.repeat().producer

    expect(subj.sizeHint()).toEqual(Infinity)
  })

  test('chained with an unbound producer', () => {
    subj.producerB = iter.repeat().producer

    expect(subj.sizeHint()).toEqual(Infinity)
  })

  test('with two unbound producers', () => {
    subj.producerA = iter.repeat().producer
    subj.producerB = iter.repeat().producer

    expect(subj.sizeHint()).toEqual(Infinity)
  })
})
