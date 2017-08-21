// @flow

import Zip from '../zip'
import * as iter from '../../'

let subj

beforeEach(() => {
  const producerA = iter.repeat('test').producer
  const producerB = iter.from([1, 2, 3]).producer
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
    const producerA = iter.from([1, 2, 3]).producer
    const producerB = iter.repeat('test').producer
    subj = new Zip(producerA, producerB)

    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })

  test('with a self reference to bound lhs', () => {
    const { producer } = iter.from([1, 2, 3, 4])
    subj = new Zip(producer, producer)

    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
    expect(subj.next()).toMatchSnapshot()
  })
})

describe('#sizeHint()', () => {
  test('with an unbound lhs and a bound rhs', () => {
    expect(subj.sizeHint()).toEqual(3)
  })

  test('with a bound lhs and an unbound rhs', () => {
    const producerA = iter.from([1, 2, 3]).producer
    const producerB = iter.repeat('test').producer
    subj = new Zip(producerA, producerB)

    expect(subj.sizeHint()).toEqual(3)
  })

  test('with two unbound producers', () => {
    const producerA = iter.repeat('test').producer
    const producerB = iter.repeat('test').producer
    subj = new Zip(producerA, producerB)

    expect(subj.sizeHint()).toEqual(Infinity)
  })

  test('with a self reference to bound lhs', () => {
    {
      const { producer } = iter.from([1, 2, 3])
      subj = new Zip(producer, producer)
    }

    expect(subj.sizeHint()).toBe(1)

    {
      const { producer } = iter.from([1, 2, 3, 4])
      subj = new Zip(producer, producer)
    }

    expect(subj.sizeHint()).toBe(2)
  })

  test('with a self reference to an unbound lhs', () => {
    const { producer } = iter.repeat('test')
    subj = new Zip(producer, producer)

    expect(subj.sizeHint()).toBe(Infinity)
  })
})
