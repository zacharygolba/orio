// @flow

import { AsIterator, ToString } from 'ouro-traits'

import {
  Chain,
  Enumerate,
  Filter,
  FilterMap,
  FlatMap,
  Map,
  Skip,
  SkipWhile,
  Take,
  TakeWhile,
  Tap,
  Unique,
  Zip,
} from './adapter'
import { identity, reduce } from './utils'
import type { Drop, FromIterator } from './types'

@ToString
@AsIterator
export default class Iter<T> implements Drop, Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  producer: Drop & Iterator<T>

  constructor(producer: Drop & Iterator<T>) {
    this.producer = producer
  }

  chain<U>(producer: Iterable<U> | U): Iter<T | U> {
    const adapter = new Chain(this.producer, producer)
    return new Iter(adapter)
  }

  collect(Target?: Class<FromIterator<T>> = Array): FromIterator<T> {
    if (Target === Array) {
      return this.reduce((acc, next) => {
        acc.push(next)
        return acc
      }, [])
    }

    if (typeof Target.from === 'function') {
      return Target.from(this)
    }

    return new Target(this)
  }

  count(): number {
    return this.reduce(acc => acc + 1, 0)
  }

  drop(): void {
    this.producer.drop()
  }

  enumerate(): Iter<[number, T]> {
    const adapter = new Enumerate(this.producer)
    return new Iter(adapter)
  }

  every(fn: T => boolean): boolean {
    return this.find(item => !fn(item)) === undefined
  }

  filterMap<U>(fn: T => ?U): Iter<U> {
    const adapter = new FilterMap(this.producer, fn)
    return new Iter(adapter)
  }

  filter(fn: T => boolean): Iter<T> {
    const adapter = new Filter(this.producer, fn)
    return new Iter(adapter)
  }

  find(fn: T => boolean): ?T {
    return this.filter(fn).first()
  }

  first(): ?T {
    return this.take(1).reduce((_, next) => next)
  }

  flatMap<U>(fn: T => Iterable<U> | U): Iter<U> {
    const adapter = new FlatMap(this.producer, fn)
    return new Iter(adapter)
  }

  flatten(): Iter<*> {
    return this.flatMap(identity)
  }

  forEach(fn: T => void): void {
    this.reduce((_, item) => fn(item))
  }

  join(sep?: string = ','): string {
    return this.reduce((prev, next) => {
      if (prev.length > 0) {
        return prev + sep + String(next)
      }

      return String(next)
    }, '')
  }

  last(): ?T {
    return this.reduce((_, next) => next)
  }

  map<U>(fn: T => U): Iter<U> {
    const adapter = new Map(this.producer, fn)
    return new Iter(adapter)
  }

  next(): IteratorResult<T, void> {
    const next = this.producer.next()

    if (next.done) {
      this.drop()
    }

    return next
  }

  nth(idx: number): ?T {
    const [lastIdx, value] =
      this.enumerate()
        .take(idx + 1)
        .last() || []

    if (idx === lastIdx) {
      return value
    }

    return undefined
  }

  product(): number {
    const lhs = +this.next().value || 0
    const rhs = +this.next().value || 0

    return this.reduce((acc, item) => acc * +item, lhs * rhs)
  }

  reduce<U>(fn: (U, T) => U, acc: U): U {
    return reduce(fn, acc, this)
  }

  skip(amount: number): Iter<T> {
    const adapter = new Skip(this.producer, amount)
    return new Iter(adapter)
  }

  skipWhile(fn: T => boolean): Iter<T> {
    const adapter = new SkipWhile(this.producer, fn)
    return new Iter(adapter)
  }

  some(fn: T => boolean): boolean {
    return this.find(fn) !== undefined
  }

  sum(): number {
    return this.reduce((acc, item) => acc + +item, 0)
  }

  take(amount: number): Iter<T> {
    const adapter = new Take(this.producer, amount)
    return new Iter(adapter)
  }

  takeWhile(fn: T => boolean): Iter<T> {
    const adapter = new TakeWhile(this.producer, fn)
    return new Iter(adapter)
  }

  tap(fn: T => void): Iter<T> {
    const adapter = new Tap(this.producer, fn)
    return new Iter(adapter)
  }

  unique(fn?: T => * = identity): Iter<T> {
    const adapter = new Unique(this.producer, fn)
    return new Iter(adapter)
  }

  zip(producer?: Iterable<*> = this.producer): Iter<[T, *]> {
    const adapter = new Zip(this.producer, producer)
    return new Iter(adapter)
  }
}