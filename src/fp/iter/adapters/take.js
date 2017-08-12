// @flow

import { range } from '../index'

import zip from './zip'

export default function* take<T>(amount: number, source: Iterable<T>): Iterator<T> {
  for (const [, value] of zip(source, range(0, amount))) {
    yield value
  }
}
