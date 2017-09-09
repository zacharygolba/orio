// @flow

import type { AsyncSource } from 'ouro-types'

import Stream from './stream'
import { createProducer, Empty } from './producer'

export type { Stream }

export function empty(): Stream<any> {
  const producer = new Empty()
  return new Stream(producer)
}

export function from<T>(source?: AsyncSource<T>): Stream<T> {
  const producer = createProducer(source)
  return new Stream(producer)
}
