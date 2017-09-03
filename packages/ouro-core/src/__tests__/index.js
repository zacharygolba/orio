// @flow

import { CharRange, Cycle, NumberRange } from '../producer'
import Iter from '../iter'
import * as ouro from '../'

test('.chars()', () => {
  expect(ouro.chars()).toBeInstanceOf(Iter)
  expect(ouro.chars('a')).toBeInstanceOf(Iter)
  expect(ouro.chars('a', 'z')).toBeInstanceOf(Iter)

  {
    const iter = ouro.chars('a', 'z')

    expect(iter.producer).toBeInstanceOf(CharRange)
  }
})

test('.cycle()', () => {
  const iter = ouro.cycle([1, 2, 3])

  expect(iter).toBeInstanceOf(Iter)
  expect(iter.producer).toBeInstanceOf(Cycle)
})

test('.from()', () => {
  expect(ouro.from()).toBeInstanceOf(Iter)
  expect(ouro.from([1, 2, 3])).toBeInstanceOf(Iter)
})

test('.of()', () => {
  expect(ouro.of()).toBeInstanceOf(Iter)

  {
    const iter = ouro.of(1, 2, 3)

    expect(iter).toBeInstanceOf(Iter)
    expect(iter.producer).toMatchSnapshot()
  }
})

test('.range()', () => {
  expect(ouro.range()).toBeInstanceOf(Iter)
  expect(ouro.range(1)).toBeInstanceOf(Iter)
  expect(ouro.range(1, 2)).toBeInstanceOf(Iter)

  {
    const iter = ouro.range(1, 2)

    expect(iter.producer).toBeInstanceOf(NumberRange)
  }
})

test('.repeat()', () => {
  expect(ouro.repeat()).toBeInstanceOf(Iter)
})
