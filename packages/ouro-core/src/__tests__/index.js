// @flow

import { Chars, Cycle, Numbers } from '../producer'
import Ouro from '../ouro'
import * as ouro from '../'

test('.chars()', () => {
  expect(ouro.chars()).toBeInstanceOf(Ouro)
  expect(ouro.chars('a')).toBeInstanceOf(Ouro)
  expect(ouro.chars('a', 'z')).toBeInstanceOf(Ouro)

  {
    const iter = ouro.chars('a', 'z')

    expect(iter.producer).toBeInstanceOf(Chars)
  }
})

test('.cycle()', () => {
  const iter = ouro.cycle([1, 2, 3])

  expect(iter).toBeInstanceOf(Ouro)
  expect(iter.producer).toBeInstanceOf(Cycle)
})

test('.from()', () => {
  expect(ouro.from()).toBeInstanceOf(Ouro)
  expect(ouro.from([1, 2, 3])).toBeInstanceOf(Ouro)
})

test('.of()', () => {
  expect(ouro.of()).toBeInstanceOf(Ouro)

  {
    const iter = ouro.of(1, 2, 3)

    expect(iter).toBeInstanceOf(Ouro)
    expect(iter.producer).toMatchSnapshot()
  }
})

test('.range()', () => {
  expect(ouro.range()).toBeInstanceOf(Ouro)
  expect(ouro.range(1)).toBeInstanceOf(Ouro)
  expect(ouro.range(1, 2)).toBeInstanceOf(Ouro)

  {
    const iter = ouro.range(1, 2)

    expect(iter.producer).toBeInstanceOf(Numbers)
  }
})

test('.repeat()', () => {
  expect(ouro.repeat()).toBeInstanceOf(Ouro)
})
