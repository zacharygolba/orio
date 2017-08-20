// @flow

export interface Producer<T> extends Iterator<T> {
  sizeHint(): number,
}

export interface IndexedCollection<T> extends Iterable<T> {
  [key: number]: T,
  length: number,
}
