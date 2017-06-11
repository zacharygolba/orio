/* @flow */

import * as iter from '../src'

test('#collect()', () => {
  const result = iter
    .range(1, 5)
    .collect()

  expect(result).toMatchSnapshot()
})

test('#enumerate()', () => {
  const result = iter
    .repeat('test')
    .take(5)
    .enumerate()
    .collect()

  expect(result).toMatchSnapshot()
})

test('#filter()', () => {
  const result = iter
    .range(1, 10)
    .filter(num => num % 2 === 0)
    .collect()

  expect(result).toMatchSnapshot()
})

test('#forEach', () => {
  const value = 'test'
  const result = iter
    .repeat(value)
    .take(5)
    .forEach(expect(value).toBe)

  expect(result).toBeUndefined()
})

test('#map()', () => {
  const result = iter
    .range(1, 10)
    .map(num => num ** 2)
    .collect()

  expect(result).toMatchSnapshot()
})

test('#next()', () => {
  const value = 'test'
  const subject = iter.repeat(value)

  expect(subject.next()).toMatchSnapshot()
  expect(subject.next()).toMatchSnapshot()
  expect(subject.next()).toMatchSnapshot()
})

test('#product()', () => {
  const a = iter
    .range(1, 5)
    .product()

  const b = iter
    .repeat('test')
    .take(5)
    .product()

  expect(a).toBe(2 * 3 * 4 * 5)
  expect(Number.isNaN(b)).toBe(true)
})

test('#sum()', () => {
  const a = iter
    .range(1, 5)
    .sum()

  const b = iter
    .repeat('test')
    .take(5)
    .sum()

  expect(a).toBe(1 + 2 + 3 + 4 + 5)
  expect(Number.isNaN(b)).toBe(true)
})


test('#join()', () => {
  const a = iter
    .repeat('test')
    .take(5)
    .join(' ')

  const b = iter
    .repeat('test')
    .take(5)
    .join()

  expect(a).toMatchSnapshot()
  expect(b).toMatchSnapshot()
})

test('#zip()', () => {
  const result = iter
    .range(0, 5)
    .zip(iter.range(5, 10))
    .collect()

  expect(result).toMatchSnapshot()
})

test('.from()', () => {
  const arr = [1, 2, 3]
  const str = 'test'
  const set = new Set(arr)
  const map = new Map(iter
    .repeat(str)
    .enumerate()
    .take(5)
    .collect())

  iter
    .from(arr)
    .zip(iter.range(0, 2).map(String))
    .forEach(([value, key]) => {
      expect(arr).toHaveProperty(key, value)
    })

  iter
    .from(str)
    .enumerate()
    .forEach(([idx, char]) => {
      expect(str.charAt(idx)).toBe(char)
    })

  iter
    .from(set)
    .map(set.has.bind(set))
    .forEach(expect(true).toBe)

  iter
    .from(map)
    .forEach(([key, value]) => {
      expect(map.get(key)).toBe(value)
    })
})

test('.range()', () => {
  expect(iter.range(1).collect()).toMatchSnapshot()
  expect(iter.range(1, 5).collect()).toMatchSnapshot()
  expect(iter.range(1, Infinity).take(10).collect()).toMatchSnapshot()
})

test('.repeat()', () => {
  expect(iter.repeat().take(5).collect()).toMatchSnapshot()
  expect(iter.repeat('test').take(5).collect()).toMatchSnapshot()
})
