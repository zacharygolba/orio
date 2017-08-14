// @flow

import type {
  Chain,
  Enumerate,
  FilterMap,
  Filter,
  FlatMap,
  Map,
  SkipWhile,
  Skip,
  TakeWhile,
  Take,
  Tap,
  Zip,
} from './adapters'

export interface IndexedCollection<T> {
  [key: number]: T;
  length: number;
}

export interface Iter<T> extends Iterator<T> {
  chain<U>(source: Iterable<U>): Chain<T, U>;
  collect(): Array<T>;
  count(): number;
  enumerate(): Enumerate<T>;
  every(fn: (T) => boolean): boolean;
  filter(fn: (T) => boolean): Filter<T>;
  filterMap<U>(fn: (T) => ?U): Map<T, U>;
  find(fn: (T) => boolean): T | void;
  first(): T | void;
  flatMap<U>(fn: (T) => U | Iterable<U>): FlatMap<U>;
  forEach(fn: (T) => void): void;
  join(sep?: string): string;
  last(): T | void;
  map<U>(fn: (T) => U): Map<T, U>;
  next(): IteratorResult<T, void>;
  nth(index: number): T | void;
  product(): number;
  reduce(fn: (T, T) => T, init?: void): T;
  reduce<U>(fn: (U, T) => U, init: U): U;
  sizeHint(): number;
  skip(amount: number): Skip<T>;
  skipWhile(fn: (T) => boolean): SkipWhile<T>;
  some(fn: (T) => boolean): boolean;
  sum(): number;
  take(amount: number): Take<T>;
  takeWhile(fn: (T) => boolean): TakeWhile<T>;
  tap(fn: (T) => void): Tap<T>;
  zip<U>(source: Iterable<U>): Zip<T, U>;
}
