// @flow

export interface FromIterator<T> {
  constructor(source: Iterable<T>): void,
  static from(source: Iterable<T>): FromIterator<T>,
}
