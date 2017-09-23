// @flow

import { identity } from 'orio-utils'

import {
  Chain,
  Cycle,
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
import * as orio from '../'

jest.mock('orio-utils')
jest.mock('../adapter')

afterEach(() => {
  jest.resetAllMocks()
})

test('#chain()', () => {
  const source = [4, 5, 6]
  const subj = orio.of(1, 2, 3)

  subj.chain(source)
  expect(Chain).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    source,
  )
})

test('#cycle()', () => {
  const subj = orio.of(1, 2, 3)

  subj.cycle()
  expect(Cycle).toHaveBeenLastCalledWith(expect.objectContaining(subj.producer))
})

test('#enumerate()', () => {
  const subj = orio.range()

  subj.enumerate()
  expect(Enumerate).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
  )
})

test('#filter()', () => {
  const subj = orio.range()
  const fn = jest.fn()

  subj.filter(fn)
  expect(Filter).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    fn,
  )
})

test('#filterMap()', () => {
  const subj = orio.range()
  const fn = jest.fn()

  subj.filterMap(fn)
  expect(FilterMap).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    fn,
  )
})

test('#flatMap()', () => {
  const subj = orio.range()
  const fn = jest.fn()

  subj.flatMap(fn)
  expect(FlatMap).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    fn,
  )
})

test('#flatten()', () => {
  const subj = orio.range()

  subj.flatten()
  expect(FlatMap).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    identity,
  )
})

test('#map()', () => {
  const subj = orio.range()
  const fn = jest.fn()

  subj.map(fn)
  expect(Map).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    fn,
  )
})

test('#skip()', () => {
  const subj = orio.range()

  subj.skip(3)
  expect(Skip).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    3,
  )
})

test('#skipWhile()', () => {
  const subj = orio.range()
  const fn = jest.fn()

  subj.skipWhile(fn)
  expect(SkipWhile).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    fn,
  )
})

test('#take()', () => {
  const subj = orio.range()

  subj.take(5)
  expect(Take).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    5,
  )
})

test('#takeWhile()', () => {
  const subj = orio.range()
  const fn = jest.fn()

  subj.takeWhile(fn)
  expect(TakeWhile).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    fn,
  )
})

test('#tap()', () => {
  const subj = orio.range()
  const fn = jest.fn()

  subj.tap(fn)
  expect(Tap).toHaveBeenLastCalledWith(
    expect.objectContaining(subj.producer),
    fn,
  )
})

test('#unique()', () => {
  {
    const subj = orio.range()
    const fn = jest.fn()

    subj.unique(fn)
    expect(Unique).toHaveBeenLastCalledWith(
      expect.objectContaining(subj.producer),
      fn,
    )
  }

  {
    const subj = orio.range()

    subj.unique()
    expect(Unique).toHaveBeenLastCalledWith(
      expect.objectContaining(subj.producer),
      identity,
    )
  }
})

test('#zip()', () => {
  {
    const source = orio.range(Infinity, 0)
    const subj = orio.range()

    subj.zip(source)
    expect(Zip).toHaveBeenLastCalledWith(
      expect.objectContaining(subj.producer),
      expect.objectContaining(source),
    )
  }

  {
    const subj = orio.range()

    subj.zip()
    expect(Zip).toHaveBeenLastCalledWith(
      expect.objectContaining(subj.producer),
      expect.objectContaining(subj.producer),
    )
  }
})
