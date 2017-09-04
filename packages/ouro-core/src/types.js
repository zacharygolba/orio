// @flow

export interface Drop {
  drop(): void,
}

export interface FromIterator<T> {
  constructor(source: Iterator<T>): FromIterator<T>,
  static from(source: Iterator<T>): FromIterator<T>,
}

export interface Producer<T> extends Drop, Iterator<T> {}
export type Source<T> = Array<T> | (Iterable<T> & Object) | ?T
