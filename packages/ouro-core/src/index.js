// @flow

import * as pkg from '../package.json'

import Ouro from './ouro'
import {
  createProducer,
  Chars,
  Cycle,
  Indexed,
  Numbers,
  Repeat,
} from './producer'
import type { IndexedCollection } from './types'

export const VERSION: string = pkg.version

export function chars(start?: string, end?: string): Ouro<string> {
  const producer = new Chars(start, end)
  return new Ouro(producer)
}

export function cycle<T>(source: IndexedCollection<T>): Ouro<T> {
  const producer = new Cycle(source)
  return new Ouro(producer)
}

export function from<T>(source?: Iterable<T> | T = []): Ouro<T> {
  const producer = createProducer(source)
  return new Ouro(producer)
}

export function of<T>(...items: Array<T>): Ouro<T> {
  const producer = new Indexed(items)
  return new Ouro(producer)
}

export function repeat<T>(value: T): Ouro<T> {
  const producer = new Repeat(value)
  return new Ouro(producer)
}

export function range(start?: number, end?: number): Ouro<number> {
  const producer = new Numbers(start, end)
  return new Ouro(producer)
}
