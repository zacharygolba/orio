// @flow

import Iter from './iter'
import {
  createProducer,
  CharProducer,
  CycleProducer,
  NumberProducer,
  RepeatProducer,
} from './producer'
import type { IndexedCollection } from './producer'

export type { default as Iter } from './iter'
export type { FromIterator } from './types'

export function cycle<T>(source: IndexedCollection<T>): Iter<T> {
  const producer = new CycleProducer(source)
  return new Iter(producer)
}

export function from(source: any): Iter<*> {
  const producer = createProducer(source)
  return new Iter(producer)
}

export function repeat<T>(value: T): Iter<T> {
  const producer = new RepeatProducer(value)
  return new Iter(producer)
}

type Item = number | string

export function range(start?: Item = 0, end?: Item = Infinity): Iter<Item> {
  if (typeof start === 'string' && typeof end === 'string') {
    const producer = new CharProducer(start, end)
    return new Iter(producer)
  }

  const producer = new NumberProducer(Number(start), Number(end))
  return new Iter(producer)
}
