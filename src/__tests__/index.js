// @flow

import { CharProducer, CycleProducer, NumberProducer } from '../producer'
import Iter from '../iter'
import * as iter from '../'

test('.chars()', () => {
  expect(iter.chars()).toBeInstanceOf(Iter)
  expect(iter.chars('a')).toBeInstanceOf(Iter)
  expect(iter.chars('a', 'z')).toBeInstanceOf(Iter)

  {
    const it = iter.chars('a', 'z')

    expect(it.producer).toBeInstanceOf(CharProducer)
  }
})

test('.cycle()', () => {
  const it = iter.cycle([1, 2, 3])

  expect(it).toBeInstanceOf(Iter)
  expect(it.producer).toBeInstanceOf(CycleProducer)
})

test('.from()', () => {
  expect(iter.from()).toBeInstanceOf(Iter)
  expect(iter.from([1, 2, 3])).toBeInstanceOf(Iter)
})

test('.of()', () => {
  expect(iter.of()).toBeInstanceOf(Iter)

  {
    const it = iter.of(1, 2, 3)

    expect(it).toBeInstanceOf(Iter)
    expect(it.producer).toMatchSnapshot()
  }
})

test('.range()', () => {
  expect(iter.range()).toBeInstanceOf(Iter)
  expect(iter.range(1)).toBeInstanceOf(Iter)
  expect(iter.range(1, 2)).toBeInstanceOf(Iter)

  {
    const it = iter.range(1, 2)

    expect(it.producer).toBeInstanceOf(NumberProducer)
  }
})

test('.repeat()', () => {
  expect(iter.repeat()).toBeInstanceOf(Iter)
})
