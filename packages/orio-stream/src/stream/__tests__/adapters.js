// @flow

import { identity } from 'orio-utils'

import {
  Chain,
  Concat,
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
import * as stream from '../'

jest.mock('orio-utils')
jest.mock('../adapter')

afterEach(() => {
  jest.resetAllMocks()
})

test('#chain()', () => {
  const source = Promise.resolve()
  const subj = stream.empty()

  subj.chain(source)
  expect(Chain).toHaveBeenLastCalledWith(subj.producer, source)
})

test('#concat()', () => {
  const source = Promise.resolve()
  const subj = stream.empty()

  subj.concat(source)
  expect(Concat).toHaveBeenLastCalledWith(subj.producer, source)
})

test('#cycle()', () => {
  const subj = stream.empty()

  subj.cycle()
  expect(Cycle).toHaveBeenLastCalledWith(subj.producer)
})

test('#enumerate()', () => {
  const subj = stream.empty()

  subj.enumerate()
  expect(Enumerate).toHaveBeenLastCalledWith(subj.producer)
})

test('#filter()', () => {
  const subj = stream.empty()
  const fn = jest.fn()

  subj.filter(fn)
  expect(Filter).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#filterMap()', () => {
  const subj = stream.empty()
  const fn = jest.fn()

  subj.filterMap(fn)
  expect(FilterMap).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#flatMap()', () => {
  const subj = stream.empty()
  const fn = jest.fn()

  subj.flatMap(fn)
  expect(FlatMap).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#flatten()', () => {
  const subj = stream.empty()

  subj.flatten()
  expect(FlatMap).toHaveBeenLastCalledWith(subj.producer, identity)
})

test('#map()', () => {
  const subj = stream.empty()
  const fn = jest.fn()

  subj.map(fn)
  expect(Map).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#skip()', () => {
  const subj = stream.empty()

  subj.skip(3)
  expect(Skip).toHaveBeenLastCalledWith(subj.producer, 3)
})

test('#skipWhile()', () => {
  const subj = stream.empty()
  const fn = jest.fn()

  subj.skipWhile(fn)
  expect(SkipWhile).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#take()', () => {
  const subj = stream.empty()

  subj.take(5)
  expect(Take).toHaveBeenLastCalledWith(subj.producer, 5)
})

test('#takeWhile()', () => {
  const subj = stream.empty()
  const fn = jest.fn()

  subj.takeWhile(fn)
  expect(TakeWhile).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#tap()', () => {
  const subj = stream.empty()
  const fn = jest.fn()

  subj.tap(fn)
  expect(Tap).toHaveBeenLastCalledWith(subj.producer, fn)
})

test('#unique()', () => {
  {
    const subj = stream.empty()
    const fn = jest.fn()

    subj.unique(fn)
    expect(Unique).toHaveBeenLastCalledWith(subj.producer, fn)
  }

  {
    const subj = stream.empty()

    subj.unique()
    expect(Unique).toHaveBeenLastCalledWith(subj.producer, identity)
  }
})

test('#zip()', () => {
  {
    const source = stream.empty()
    const subj = stream.empty()

    subj.zip(source)
    expect(Zip).toHaveBeenLastCalledWith(subj.producer, source)
  }

  {
    const subj = stream.empty()

    subj.zip()
    expect(Zip).toHaveBeenLastCalledWith(subj.producer, subj.producer)
  }
})
