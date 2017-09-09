// @flow

import type { Source } from 'orio-types'

import Iter from './iter'
import {
  createProducer,
  CharRange,
  Indexed,
  NumberRange,
  Repeat,
} from './producer'

export function chars(start?: string, end?: string): Iter<string> {
  const producer = new CharRange(start, end)
  return new Iter(producer)
}

export function from<T>(source?: Source<T>): Iter<T> {
  const producer = createProducer(source)
  return new Iter(producer)
}

export function of<T>(...items: $ReadOnlyArray<T>): Iter<T> {
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
