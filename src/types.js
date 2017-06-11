/* @flow */

export type Filter<T> = (input: T) => boolean
export type Inspect<T> = (input: T) => void
export type Mapper<T, U> = (input: T) => U
export type Noop = () => void

export type Nil = null
                | void

export type Reducer<T, U> = (prev: U, next: T) => U
                          | (prev: void, next: T) => U

export interface Iter<T> {
  chain<U>(source: Iterable<U>): Iter<T | U>,
  collect(): Array<T>,
  count(): number,
  cycle(): Iter<T>,
  enumerate(): Iter<[number, T]>,
  every(fn: Filter<T>): boolean,
  filter(fn: Filter<T>): Iter<T>,
  filterMap(): Iter<T>,
  find(fn: Filter<T>): void | T,
  first(): void | T,
  flatMap(): Iter<T>,
  forEach(fn: Inspect<T>): void,
  fuse<U>(source: Iterable<U>): Iter<T | U>,
  join(seperator?: string): string,
  last(): void | T,
  map<U>(fn: Mapper<T, U>): Iter<U>,
  max(): void | T,
  maxBy(): void | T,
  maxByKey(): void | T,
  min(): void | T,
  minBy(): void | T,
  minByKey(): void | T,
  next(): IteratorResult<T, void>,
  nth(): void | T,
  partition(): Iter<T>,
  product(): number,
  reduce<U>(fn: Reducer<T, U>, init?: U): U,
  scan(): Iter<T>,
  skip(amount: number): Iter<T>,
  skipWhile(fn: Filter<T>): Iter<T>,
  some(fn: Filter<T>): boolean,
  sum(): number,
  take(amount: number): Iter<T>,
  takeWhile(fn: Filter<T>): Iter<T>,
  tap(fn: Inspect<T>): Iter<T>,
  zip<U>(source: Iterable<U>): Iter<[T, U]>,
}
