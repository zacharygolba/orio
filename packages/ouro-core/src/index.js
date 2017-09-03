// @flow

import * as pkg from '../package.json'

import Iter from './iter'
import {
  createProducer,
  CharRange,
  Cycle,
  Indexed,
  NumberRange,
  Repeat,
} from './producer'

export const VERSION: string = pkg.version

export function chars(start?: string, end?: string): Iter<string> {
  const producer = new CharRange(start, end)
  return new Iter(producer)
}

export function cycle<T>(source: Array<T>): Iter<T> {
  const producer = new Cycle(source)
  return new Iter(producer)
}

export function from<T>(source?: Iterable<T> | T = []): Iter<T> {
  const producer = createProducer(source)
  return new Iter(producer)
}

export function of<T>(...items: Array<T>): Iter<T> {
  const producer = new Indexed(items)
  return new Iter(producer)
}

export function repeat<T>(value: T): Iter<T> {
  const producer = new Repeat(value)
  return new Iter(producer)
}

export function range(start?: number, end?: number): Iter<number> {
  const producer = new NumberRange(start, end)
  return new Iter(producer)
}
