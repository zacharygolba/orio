// @flow

import type { AsyncIterator } from './iterator'

export interface Drop { drop(): void }
export interface Producer<+T> extends Drop, Iterable<T>, Iterator<T> {}
export interface AsyncProducer<+T>
  extends AsyncIterable<T>, AsyncIterator<T>, Drop {}
