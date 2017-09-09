// @flow

export interface FromIterator<T> {
  constructor(source: Iterable<T>): FromIterator<T>,
  static from(source: Iterable<T>): FromIterator<T>,
}
