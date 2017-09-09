// @flow

import { Writable } from 'stream'

import * as stream from '../'
import Sink from '../../sink/sink'

test('#collect()', async () => {
  expect(await stream.from('test').collect()).toMatchSnapshot()
  expect(await stream.from('test').collect(Set)).toMatchSnapshot()
  expect(
    await stream
      .from('test')
      .enumerate()
      .collect(Map),
  ).toMatchSnapshot()
})

test('#count()', async () => {
  expect(await stream.from([1, 2, 3, 4]).count()).toBe(4)
})

test('#drop()', () => {
  expect(stream.empty().drop()).toBeUndefined()
})

test('#every()', async () => {
  {
    const fn = jest.fn(num => num < 10)

    expect(await stream.from([1, 2, 3, 4, 5]).every(fn)).toBe(true)
    expect(fn).toHaveBeenCalledTimes(5)
  }

  {
    const fn = jest.fn(num => num > 10)

    expect(await stream.from([1, 2, 3, 4, 5]).every(fn)).toBe(false)
    expect(fn).toHaveBeenCalledTimes(1)
  }
})

test('#find()', async () => {
  const fn = jest.fn(char => char === 'c')

  expect(await stream.from(['a', 'b', 'c', 'd']).find(fn)).toBe('c')
  expect(fn).toHaveBeenCalledTimes(3)
})

test('#first()', async () => {
  expect(await stream.from(['a', 'b', 'c']).first()).toBe('a')
})

test('#forEach()', async () => {
  {
    const source = [1, 2, 3]
    const subj = stream.from(source)
    const fn = jest.fn()

    await subj.forEach(fn)
    source.forEach(value => expect(fn).toHaveBeenCalledWith(value))
    expect(fn).toHaveBeenCalledTimes(source.length)
  }

  {
    const subj = stream.from([1, 2, 3, 4])
    const fn = jest.fn()

    await subj.filter(num => num % 2 === 0).forEach(fn)
    expect(fn).toHaveBeenCalledWith(2)
    expect(fn).toHaveBeenCalledWith(4)
    expect(fn).toHaveBeenCalledTimes(2)
  }
})

test('#join()', async () => {
  expect(await stream.from([1, 2, 3]).join()).toBe('1,2,3')
  expect(await stream.from([1, 2, 3]).join(' * ')).toBe('1 * 2 * 3')
})

test('#last()', async () => {
  expect(await stream.from(['a', 'b', 'c']).last()).toBe('c')
})

describe('#next()', () => {
  let subj

  beforeEach(() => {
    subj = stream.from('test')
    jest.spyOn(subj.producer, 'drop')
  })

  test('success', async () => {
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(await subj.next()).toMatchSnapshot()
    expect(subj.producer.drop).toHaveBeenCalledTimes(1)
  })

  test('failure', async () => {
    await subj
      .map(() => {
        throw new Error('error')
      })
      .next()
      .catch(e => {
        expect(e).toBeInstanceOf(Error)
        expect(subj.producer.drop).toHaveBeenCalled()
      })
  })
})

test('#nth()', async () => {
  expect(await stream.from(['a', 'b', 'c']).nth(0)).toBe('a')
  expect(await stream.from(['a', 'b', 'c']).nth(1)).toBe('b')
  expect(await stream.from(['a', 'b', 'c']).nth(2)).toBe('c')
  expect(await stream.from(['a', 'b', 'c']).nth(-1)).toBeUndefined()
  expect(await stream.from(['a', 'b', 'c']).nth(4)).toBeUndefined()
})

test('#pipe()', () => {
  const dest = new Writable({
    write: jest.fn(),
    writev: jest.fn(),
  })

  expect(stream.empty().pipe(dest)).toBeInstanceOf(Sink)
})

test('#product()', async () => {
  expect(await stream.empty().product()).toBe(0)
  expect(await stream.from([2, 3, 4]).product()).toBe(2 * 3 * 4)
  expect(Number.isNaN(await stream.from(['a', 'b', 'c']).product())).toBe(true)
})

test('#reduce()', async () => {
  const set = await stream
    .from([1, 2, 3])
    .reduce((acc, next) => acc.add(next), new Set())

  expect(set.size).toBe(3)
  expect(set.has(1)).toBe(true)
  expect(set.has(2)).toBe(true)
  expect(set.has(3)).toBe(true)
})

test('#some()', async () => {
  {
    const fn = jest.fn(num => num > 2)

    expect(await stream.from([1, 2, 3, 4, 5]).some(fn)).toBe(true)
    expect(fn).toHaveBeenCalledTimes(3)
  }

  {
    const fn = jest.fn(num => num > 10)

    expect(await stream.from([1, 2, 3, 4, 5]).some(fn)).toBe(false)
    expect(fn).toHaveBeenCalledTimes(5)
  }
})

test('#sum()', async () => {
  expect(await stream.empty().sum()).toBe(0)
  expect(await stream.from([1, 2, 3, 4]).sum()).toBe(1 + 2 + 3 + 4)
  expect(Number.isNaN(await stream.from(['a', 'b', 'c']).sum())).toBe(true)
})

test('#toString()', () => {
  expect(stream.empty().toString()).toBe('[object Stream]')
})
