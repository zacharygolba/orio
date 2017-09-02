// @flow

import { AsIterator, ToString } from 'ouro-traits'

import {
  ChainAdapter,
  EnumerateAdapter,
  FilterAdapter,
  FilterMapAdapter,
  FlatMapAdapter,
  MapAdapter,
  SkipAdapter,
  SkipWhileAdapter,
  TakeAdapter,
  TakeWhileAdapter,
  TapAdapter,
  ZipAdapter,
} from './adapter'

export interface FromIterator<T> {
  constructor(source: Iterator<T>): FromIterator<T>,
  static from(source: Iterator<T>): FromIterator<T>,
}

function reduce<T, U>(fn: (U, T) => U, acc: U, producer: Iterator<T>): U {
  const next = producer.next()

  if (next.done) {
    return acc
  }

  return reduce(fn, fn(acc, next.value), producer)
}

@ToString
@AsIterator
export default class Ouro<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  producer: Iterator<T>

  constructor(producer: Iterator<T>) {
    this.producer = producer
  }

  chain<U>(producer: Iterable<U> | U): Ouro<T | U> {
    const adapter = new ChainAdapter(this.producer, producer)
    return new Ouro(adapter)
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

  enumerate(): Ouro<[number, T]> {
    const adapter = new EnumerateAdapter(this.producer)
    return new Ouro(adapter)
  }

  every(fn: T => boolean): boolean {
    return this.find(item => !fn(item)) === undefined
  }

  filterMap<U>(fn: T => ?U): Ouro<U> {
    const adapter = new FilterMapAdapter(this.producer, fn)
    return new Ouro(adapter)
  }

  filter(fn: T => boolean): Ouro<T> {
    const adapter = new FilterAdapter(this.producer, fn)
    return new Ouro(adapter)
  }

  find(fn: T => boolean): ?T {
    return this.filter(fn).first()
  }

  first(): ?T {
    return this.take(1).reduce((_, next) => next)
  }

  flatMap<U>(fn: T => Iterable<U> | U): Ouro<U> {
    const adapter = new FlatMapAdapter(this.producer, fn)
    return new Ouro(adapter)
  }

  flatten(): Ouro<*> {
    return this.flatMap(item => item)
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

  map<U>(fn: T => U): Ouro<U> {
    const adapter = new MapAdapter(this.producer, fn)
    return new Ouro(adapter)
  }

  next(): IteratorResult<T, void> {
    return this.producer.next()
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
    return reduce(fn, acc, this.producer)
  }

  skip(amount: number): Ouro<T> {
    const adapter = new SkipAdapter(this.producer, amount)
    return new Ouro(adapter)
  }

  skipWhile(fn: T => boolean): Ouro<T> {
    const adapter = new SkipWhileAdapter(this.producer, fn)
    return new Ouro(adapter)
  }

  some(fn: T => boolean): boolean {
    return this.find(fn) !== undefined
  }

  sum(): number {
    return this.reduce((acc, item) => acc + +item, 0)
  }

  take(amount: number): Ouro<T> {
    const adapter = new TakeAdapter(this.producer, amount)
    return new Ouro(adapter)
  }

  takeWhile(fn: T => boolean): Ouro<T> {
    const adapter = new TakeWhileAdapter(this.producer, fn)
    return new Ouro(adapter)
  }

  tap(fn: T => void): Ouro<T> {
    const adapter = new TapAdapter(this.producer, fn)
    return new Ouro(adapter)
  }

  zip(producer?: Iterable<*> = this.producer): Ouro<[T, *]> {
    const adapter = new ZipAdapter(this.producer, producer)
    return new Ouro(adapter)
  }
}
