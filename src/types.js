// @flow

import type Iter from './iter'
import type {
  CharProducer,
  NumberProducer,
  MapProducer,
  SetProducer,
  CycleProducer,
  IndexedProducer,
  RepeatProducer,
  UnboundProducer,
} from './producer'

export interface FromIterator<T> {
  static from(iterator: Iterator<T>): FromIterator<T>,
}

export type IntoIterator<T> =
  | T
  | Iterable<T>
