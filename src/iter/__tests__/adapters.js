// @flow

import intoIter from '../../utils/into-iter'
import range from '../../range'
import {
  Chain,
  Enumerate,
  Filter,
  FilterMap,
  FlatMap,
  Map,
  SkipWhile,
  Skip,
  TakeWhile,
  Take,
  Tap,
  Zip,
} from '../../adapters'

jest.mock('../../adapters')

afterEach(jest.resetAllMocks)

test('#chain()', () => {
  const source = [4, 5, 6]
  const iter = intoIter([1, 2, 3])

  iter.chain(source)
  expect(Chain).toHaveBeenLastCalledWith(iter, source)
})

test('#enumerate()', () => {
  const iter = range()

  iter.enumerate()
  expect(Enumerate).toHaveBeenLastCalledWith(iter)
})

test('#filter()', () => {
  const iter = range()
  const fn = jest.fn()

  iter.filter(fn)
  expect(Filter).toHaveBeenLastCalledWith(iter, fn)
})

test('#filterMap()', () => {
  const iter = range()
  const fn = jest.fn()

  iter.filterMap(fn)
  expect(FilterMap).toHaveBeenLastCalledWith(iter, fn)
})

test('#flatMap()', () => {
  const iter = range()
  const fn = jest.fn()

  iter.flatMap(fn)
  expect(FlatMap).toHaveBeenLastCalledWith(iter, fn)
})

test('#map()', () => {
  const iter = range()
  const fn = jest.fn()

  iter.map(fn)
  expect(Map).toHaveBeenLastCalledWith(iter, fn)
})

test('#skip()', () => {
  const iter = range()

  iter.skip(3)
  expect(Skip).toHaveBeenLastCalledWith(iter, 3)
})

test('#skipWhile()', () => {
  const iter = range()
  const fn = jest.fn()

  iter.skipWhile(fn)
  expect(SkipWhile).toHaveBeenLastCalledWith(iter, fn)
})

test('#take()', () => {
  const iter = range()

  iter.take(5)
  expect(Take).toHaveBeenLastCalledWith(iter, 5)
})

test('#takeWhile()', () => {
  const iter = range()
  const fn = jest.fn()

  iter.takeWhile(fn)
  expect(TakeWhile).toHaveBeenLastCalledWith(iter, fn)
})

test('#tap()', () => {
  const iter = range()
  const fn = jest.fn()

  iter.tap(fn)
  expect(Tap).toHaveBeenLastCalledWith(iter, fn)
})

test('#zip()', () => {
  const source = range(Infinity, 0)
  const iter = range()

  iter.zip(source)
  expect(Zip).toHaveBeenLastCalledWith(iter, source)
})
