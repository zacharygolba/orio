// @flow

import Zip from '../zip'
import * as ouro from '../../'

let subj

const zip = (a, b) => {
  const adapter = new Zip(a, b)

  // $FlowIgnore
  adapter.producerA.drop = jest.fn()
  // $FlowIgnore
  adapter.producerB.drop = jest.fn()

  return adapter
}

beforeEach(() => {
  const producerA = ouro.repeat('test').producer
  const producerB = ouro.of(1, 2, 3).producer
  subj = zip(producerA, producerB)
})

afterEach(() => {
  subj.producerA.drop.mockReset()
  subj.producerB.drop.mockReset()
})

test('#drop()', () => {
  expect(subj.drop()).toBeUndefined()
  expect(subj.producerA.drop).toHaveBeenCalled()
  expect(subj.producerB.drop).toHaveBeenCalled()
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
    subj = zip(producerA, producerB)

    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })

  test('with a self reference to bound lhs', () => {
    const { producer } = ouro.of(1, 2, 3, 4)
    subj = zip(producer, producer)

    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })
})
