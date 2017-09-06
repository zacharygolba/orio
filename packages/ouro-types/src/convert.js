// @flow

export interface FromIterator<T> {
  constructor(source: Iterator<T>): FromIterator<T>,
  static from(source: Iterator<T>): FromIterator<T>,
}

export type AsyncSource<T> = Promise<Source<T>> | Source<T>
export type Source<T> = $ReadOnlyArray<T> | Iterable<T> | ?T
