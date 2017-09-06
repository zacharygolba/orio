// @flow

import type { AsyncSource } from 'ouro-types'

import * as pkg from '../package.json'

import Stream from './stream'
import { createProducer } from './producer'

export const VERSION: string = pkg.version

export function from<T>(source?: AsyncSource<T>): Stream<T> {
  const producer = createProducer(source)
  return new Stream(producer)
}
