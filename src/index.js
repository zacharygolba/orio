// @flow

import * as pkg from '../package.json'
import Iter from './iter'
import {
  createProducer,
  CharProducer,
  CycleProducer,
  NumberProducer,
  RepeatProducer,
} from './producer'
import type { IndexedCollection } from './producer'

export type { default as Iter, FromIterator } from './iter'

export const VERSION: string = pkg.version

export function chars(start?: string, end?: string): Iter<string> {
  const producer = new CharProducer(start, end)
  return new Iter(producer)
}

export function cycle<T>(source: IndexedCollection<T>): Iter<T> {
  const producer = new CycleProducer(source)
  return new Iter(producer)
}

export function from<T>(source?: Iterable<T> | T = []): Iter<T> {
  const producer = createProducer(source)
  return new Iter(producer)
}

export function repeat<T>(value: T): Iter<T> {
  const producer = new RepeatProducer(value)
  return new Iter(producer)
}

export function range(start?: number, end?: number): Iter<number> {
  const producer = new NumberProducer(start, end)
  return new Iter(producer)
}
