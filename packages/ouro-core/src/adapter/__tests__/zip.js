// @flow

import Zip from '../zip'
import * as ouro from '../../'

let subj

beforeEach(() => {
  const producerA = ouro.repeat('test').producer
  const producerB = ouro.of(1, 2, 3).producer
  subj = new Zip(producerA, producerB)
})

test('#@@iterator()', () => {
  for (const item of subj) {
    expect(item).toMatchSnapshot()
  }
})

describe('#next()', () => {
  test('with an unbound lhs and a bound rhs', () => {
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })

  test('with a bound lhs and an unbound rhs', () => {
    const producerA = ouro.of(1, 2, 3).producer
    const producerB = ouro.repeat('test').producer
    subj = new Zip(producerA, producerB)

    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })

  test('with a self reference to bound lhs', () => {
    const { producer } = ouro.of(1, 2, 3, 4)
    subj = new Zip(producer, producer)

    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })
})
