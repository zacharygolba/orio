// @flow

import { range } from '../index'

import zip from './zip'

export default function* enumerate<T>(source: Iterable<T>): Iterator<[number, T]> {
  for (const value of zip(source, range())) {
    yield value
  }
}
