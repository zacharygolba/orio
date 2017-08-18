// @flow

import intoIter from '../../utils/into-iter'
import range from '../../range'

test('#@@iterator()', () => {
  const source = [1, 2, 3]

  for (const value of intoIter(source)) {
    expect(source.includes(value)).toBe(true)
  }
})

test('#collect()', () => {
  const source = 'test'

  expect(intoIter(source).collect()).toEqual([...source])
})

test('#count()', () => {
  expect(range(1, 10).count()).toBe(10)
  expect(range(1).count()).toBe(Infinity)
})

test('#every()', () => {
  {
    const fn = jest.fn(num => num < 10)

    expect(range(1, 5).every(fn)).toBe(true)
    expect(fn).toHaveBeenCalledTimes(5)
  }

  {
    const fn = jest.fn(num => num > 10)

    expect(range(1, 5).every(fn)).toBe(false)
    expect(fn).toHaveBeenCalledTimes(1)
  }
})

test('#find()', () => {
  const fn = jest.fn(char => char === 'c')

  expect(range('a', 'z').find(fn)).toBe('c')
  expect(fn).toHaveBeenCalledTimes(3)
})

test('#first()', () => {
  expect(range('a', 'z').first()).toBe('a')
})

test('#forEach()', () => {
  const source = [1, 2, 3]
  const iter = intoIter(source)
  const fn = jest.fn()

  iter.forEach(fn)
  source.forEach(value => expect(fn).toHaveBeenCalledWith(value))
  expect(fn).toHaveBeenCalledTimes(source.length)
})

test('#join()', () => {
  expect(range(1, 3).join()).toBe('1,2,3')
  expect(range(1, 3).join(' * ')).toBe('1 * 2 * 3')
})

test('#last()', () => {
  expect(range('a', 'z').last()).toBe('z')
})

test('#nth()', () => {
  expect(range('a', 'z').nth(0)).toBe('a')
  expect(range('a', 'z').nth(1)).toBe('b')
  expect(range('a', 'z').nth(2)).toBe('c')
  expect(range('a', 'z').nth(27)).toBeUndefined()
})

test('#product()', () => {
  expect(range(2, 4).product()).toBe(2 * 3 * 4)
  expect(Number.isNaN(intoIter([]).product())).toBe(true)
  expect(Number.isNaN(range('a', 'z').product())).toBe(true)
})

test('#reduce()', () => {
  const set = range(1, 3).reduce((acc, next) => acc.add(next), new Set())

  expect(set.size).toBe(3)
  expect(set.has(1)).toBe(true)
  expect(set.has(2)).toBe(true)
  expect(set.has(3)).toBe(true)
})

test('#some()', () => {
  {
    const fn = jest.fn(num => num > 2)

    expect(range(1, 5).some(fn)).toBe(true)
    expect(fn).toHaveBeenCalledTimes(3)
  }

  {
    const fn = jest.fn(num => num > 10)

    expect(range(1, 5).some(fn)).toBe(false)
    expect(fn).toHaveBeenCalledTimes(5)
  }
})

test('#sum()', () => {
  expect(intoIter([]).sum()).toBe(0)
  expect(range(1, 4).sum()).toBe(1 + 2 + 3 + 4)
  expect(Number.isNaN(range('a', 'z').sum())).toBe(true)
})
