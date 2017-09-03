// @flow

export interface Drop {
  drop(): void,
}

export interface FromIterator<T> {
  constructor(source: Iterator<T>): FromIterator<T>,
  static from(source: Iterator<T>): FromIterator<T>,
}
