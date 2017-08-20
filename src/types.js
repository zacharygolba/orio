// @flow

export interface FromIterator<T> {
  static from(iterator: Iterator<T>): FromIterator<T>,
}
