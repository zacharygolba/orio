// @flow

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
import * as ops from './ops'
import type { FromIterator } from './types'
import type { Producer } from './producer'

export default class Iter<T> implements Producer<T> {
  producer: Producer<T>
  /*:: @@iterator: () => Iterator<T> */

  constructor(producer: Producer<T>) {
    this.producer = producer
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<T> {
    return this
  }

  chain<U>(producer: Iterable<U>): Iter<T | U> {
    const adapter = new ChainAdapter(this.producer, producer)
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
    const size = this.sizeHint()
    return Number.isFinite(size) ? this.reduce(acc => acc + 1, 0) : Infinity
  }

  enumerate(): Iter<[number, T]> {
    const adapter = new EnumerateAdapter(this.producer)
    return new Iter(adapter)
  }

  every(fn: (T) => boolean): boolean {
    return this.find(item => !fn(item)) === undefined
  }

  filterMap<U>(fn: (T) => ?U): Iter<U> {
    const adapter = new FilterMapAdapter(this.producer, fn)
    return new Iter(adapter)
  }

  filter(fn: (T) => boolean): Iter<T> {
    const adapter = new FilterAdapter(this.producer, fn)
    return new Iter(adapter)
  }

  find(fn: (T) => boolean): ?T {
    return this.filter(fn).first()
  }

  first(): ?T {
    return this.take(1).reduce((_, next) => next, undefined)
  }

  // $FlowFixMe
  flatMap<U>(fn: (T) => Iterable<U>): Iter<U> {
    const adapter = new FlatMapAdapter(this.producer, fn)
    return new Iter(adapter)
  }

  flatten(): Iter<*> {
    return this.flatMap(item => item)
  }

  forEach(fn: (T) => void): void {
    for (let i = 0; i < this.sizeHint(); i++) {
      const result = this.next()

      if (result.done) {
        break
      }

      fn(result.value)
    }
  }

  join(sep?: string = ','): string {
    return this
      .map(String)
      .reduce(
        (prev, next) => prev.length ? (prev + sep + next) : (prev + next),
        '',
      )
  }

  last(): ?T {
    return this.reduce((_, next) => next, undefined)
  }

  map<U>(fn: (T) => U): Iter<U> {
    const adapter = new MapAdapter(this.producer, fn)
    return new Iter(adapter)
  }

  next(): IteratorResult<T, void> {
    return this.producer.next()
  }

  nth(idx: number): ?T {
    const [lastIdx, value] = this.enumerate().take(idx + 1).last() || []

    if (idx === lastIdx) {
      return value
    }

    // If the last index is not equal to the input index, the input index was
    // out of bounds.
    return undefined
  }

  product(): number {
    return this.sizeHint() === 0 ? 0 : this.reduce(ops.mul, 1)
  }

  reduce<U>(fn: (U, T) => U, init: U): U {
    let acc = init

    for (let i = 0; i < this.sizeHint(); i++) {
      const result = this.next()

      if (result.done) {
        break
      }

      acc = fn(acc, result.value)
    }

    return acc
  }

  sizeHint(): number {
    return this.producer.sizeHint()
  }

  skip(amount: number): Iter<T> {
    const adapter = new SkipAdapter(this.producer, amount)
    return new Iter(adapter)
  }

  skipWhile(fn: (T) => boolean): Iter<T> {
    const adapter = new SkipWhileAdapter(this.producer, fn)
    return new Iter(adapter)
  }

  some(fn: (T) => boolean): boolean {
    return this.find(fn) !== undefined
  }

  sum(): number {
    return this.reduce(ops.add, 0)
  }

  take(amount: number): Iter<T> {
    const adapter = new TakeAdapter(this.producer, amount)
    return new Iter(adapter)
  }

  takeWhile(fn: (T) => boolean): Iter<T> {
    const adapter = new TakeWhileAdapter(this.producer, fn)
    return new Iter(adapter)
  }

  tap(fn: (T) => void): Iter<T> {
    const adapter = new TapAdapter(this.producer, fn)
    return new Iter(adapter)
  }

  zip(producer?: Iterable<*>): Iter<[T, *]> {
    const adapter = new ZipAdapter(this.producer, producer || this.producer)
    return new Iter(adapter)
  }
}
