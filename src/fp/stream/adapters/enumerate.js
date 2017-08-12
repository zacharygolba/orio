// @flow

import { range } from '../index'

import zip from './zip'

export default async function* enumerate<T>(source: AsyncIterable<T>): AsyncIterator<[number, T]> {
  for await (const value of zip(source, range())) {
    yield value
  }
}
