// @flow

import { CharRange, NumberRange } from '../producer'
import Iter from '../iter'
import * as orio from '../'

test('.chars()', () => {
  expect(orio.chars()).toBeInstanceOf(Iter)
  expect(orio.chars('a')).toBeInstanceOf(Iter)
  expect(orio.chars('a', 'z')).toBeInstanceOf(Iter)

  {
    const iter = orio.chars('a', 'z')

    expect(iter.producer).toBeInstanceOf(CharRange)
  }
})

test('.from()', () => {
  expect(orio.from()).toBeInstanceOf(Iter)
  expect(orio.from([1, 2, 3])).toBeInstanceOf(Iter)
})

test('.of()', () => {
  expect(orio.of()).toBeInstanceOf(Iter)

  {
    const iter = orio.of(1, 2, 3)

    expect(iter).toBeInstanceOf(Iter)
    expect(iter.producer).toMatchSnapshot()
  }
})

test('.range()', () => {
  expect(orio.range()).toBeInstanceOf(Iter)
  expect(orio.range(1)).toBeInstanceOf(Iter)
  expect(orio.range(1, 2)).toBeInstanceOf(Iter)

  {
    const iter = orio.range(1, 2)

    expect(iter.producer).toBeInstanceOf(NumberRange)
  }
})

test('.repeat()', () => {
  expect(orio.repeat()).toBeInstanceOf(Iter)
})
