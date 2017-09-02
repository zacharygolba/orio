// @flow

import * as pkg from '../package.json'

import Ouro from './ouro'
import {
  createProducer,
  CharProducer,
  CycleProducer,
  IndexedProducer,
  NumberProducer,
  RepeatProducer,
} from './producer'
import type { IndexedCollection } from './producer'

export type { default as Ouro, FromIterator } from './ouro'

export const VERSION: string = pkg.version

export function chars(start?: string, end?: string): Ouro<string> {
  const producer = new CharProducer(start, end)
  return new Ouro(producer)
}

export function cycle<T>(source: IndexedCollection<T>): Ouro<T> {
  const producer = new CycleProducer(source)
  return new Ouro(producer)
}

export function from<T>(source?: Iterable<T> | T = []): Ouro<T> {
  const producer = createProducer(source)
  return new Ouro(producer)
}

export function of<T>(...items: Array<T>): Ouro<T> {
  const producer = new IndexedProducer(items)
  return new Ouro(producer)
}

export function repeat<T>(value: T): Ouro<T> {
  const producer = new RepeatProducer(value)
  return new Ouro(producer)
}

export function range(start?: number, end?: number): Ouro<number> {
  const producer = new NumberProducer(start, end)
  return new Ouro(producer)
}
