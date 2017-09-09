// @flow

import type { AsyncDest } from 'ouro-types'

import Sink from './sink'
import { createConsumer } from './consumer'

export type { Sink }

export function from(dest: AsyncDest): Sink<*> {
  const consumer = createConsumer(dest)
  return new Sink(consumer)
}
