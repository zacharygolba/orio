// @flow

import { CycleProducer } from '../producer'
import Iter from '../iter'
import * as iter from '../'

test('#cycle()', () => {
  const it = iter.cycle([1, 2, 3])

  expect(it).toBeInstanceOf(Iter)
  expect(it.producer).toBeInstanceOf(CycleProducer)
})

test('#from()', () => {
  expect(iter.from([1, 2, 3])).toBeInstanceOf(Iter)
})

test('#range()', () => {
  expect(iter.range()).toBeInstanceOf(Iter)
  expect(iter.range(1)).toBeInstanceOf(Iter)
  expect(iter.range(1, 2)).toBeInstanceOf(Iter)
  expect(iter.range('a', 'b')).toBeInstanceOf(Iter)
})

test('#repeat()', () => {
  expect(iter.repeat()).toBeInstanceOf(Iter)
})
