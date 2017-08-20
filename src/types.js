// @flow

export interface FromIterator<T> {
  static from(iterator: Iterator<T>): FromIterator<T>,
}

export type IntoIterator<T> = T | Iterable<T>
