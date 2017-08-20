// @flow

export type Collectable<T> =
  | FromIterator<T>
  | Map<*, *>
  | Set<T>

export interface FromIterator<T> {
  constructor(source: Iterator<T>): FromIterator<T>,
  static from(source: Iterator<T>): FromIterator<T>,
}
