// @flow

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
  Unique,
  Zip,
} from '../adapter'
import { identity } from '../utils'
import * as ouro from '../'

jest.mock('../adapter')
jest.mock('../utils')

afterEach(() => {
  jest.resetAllMocks()
})

test('#chain()', () => {
  const source = [4, 5, 6]
  const subj = ouro.of(1, 2, 3)

  subj.chain(source)
  expect(Chain).toHaveBeenLastCalledWith(subj.producer, source)
})

test('#enumerate()', () => {
  const subj = ouro.range()

  subj.enumerate()
  expect(Enumerate).toHaveBeenLastCalledWith(subj.producer)
})

test('#filter()', () => {
  const subj = ouro.range()
  const fn = jest.fn()

  subj.filter(fn)
  expect(Filter).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#filterMap()', () => {
  const subj = ouro.range()
  const fn = jest.fn()

  subj.filterMap(fn)
  expect(FilterMap).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#flatMap()', () => {
  const subj = ouro.range()
  const fn = jest.fn()

  subj.flatMap(fn)
  expect(FlatMap).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#flatten()', () => {
  const subj = ouro.range()

  subj.flatten()
  expect(FlatMap).toHaveBeenLastCalledWith(subj.producer, expect.any(Function))
})

test('#map()', () => {
  const subj = ouro.range()
  const fn = jest.fn()

  subj.map(fn)
  expect(Map).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#skip()', () => {
  const subj = ouro.range()

  subj.skip(3)
  expect(Skip).toHaveBeenLastCalledWith(subj.producer, 3)
})

test('#skipWhile()', () => {
  const subj = ouro.range()
  const fn = jest.fn()

  subj.skipWhile(fn)
  expect(SkipWhile).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#take()', () => {
  const subj = ouro.range()

  subj.take(5)
  expect(Take).toHaveBeenLastCalledWith(subj.producer, 5)
})

test('#takeWhile()', () => {
  const subj = ouro.range()
  const fn = jest.fn()

  subj.takeWhile(fn)
  expect(TakeWhile).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#tap()', () => {
  const subj = ouro.range()
  const fn = jest.fn()

  subj.tap(fn)
  expect(Tap).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#unique()', () => {
  {
    const subj = ouro.range()
    const fn = jest.fn()

    subj.unique(fn)
    expect(Unique).toHaveBeenLastCalledWith(subj.producer, fn)
  }

  {
    const subj = ouro.range()

    subj.unique()
    expect(Unique).toHaveBeenLastCalledWith(subj.producer, identity)
  }
})

test('#zip()', () => {
  {
    const source = ouro.range(Infinity, 0)
    const subj = ouro.range()

    subj.zip(source)
    expect(Zip).toHaveBeenLastCalledWith(subj.producer, source)
  }

  {
    const subj = ouro.range()

    subj.zip()
    expect(Zip).toHaveBeenLastCalledWith(subj.producer, subj.producer)
  }
})
