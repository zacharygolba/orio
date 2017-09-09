// @flow

import { AsAsyncIterator, ToString } from 'orio-traits'
import { identity, reduceAsync } from 'orio-utils'
import type {
  AsyncDest,
  AsyncProducer,
  AsyncIteratorResult,
  FromIterator,
  AsyncSource,
} from 'orio-types'

import * as sink from '../sink'
import type { Sink } from '../sink'

import {
  Chain,
  Concat,
  Cycle,
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

@ToString
@AsAsyncIterator
export default class Stream<T> implements AsyncProducer<T> {
  /*:: @@asyncIterator: () => $AsyncIterator<T, void, void> */
  producer: AsyncProducer<T>

  constructor(producer: AsyncProducer<T>) {
    this.producer = producer
  }

  chain<U>(source: AsyncSource<U>): Stream<T | U> {
    const adapter = new Chain(this.producer, source)
    return new Stream(adapter)
  }

  concat<U>(source: AsyncSource<U>): Stream<T | U> {
    const adapter = new Concat(this.producer, source)
    return new Stream(adapter)
  }

  async collect<C: FromIterator<T>>(Target?: Class<C>): Promise<C> {
    const items = await this.reduce((acc, next) => {
      acc.push(next)
      return acc
    }, [])

    if (Target === Array || Target == null) {
      return items
    }

    return new Target(items)
  }

  count(): Promise<number> {
    return this.reduce(acc => acc + 1, 0)
  }

  cycle(): Stream<T> {
    const adapter = new Cycle(this.producer)
    return new Stream(adapter)
  }

  drop(): void {
    this.producer.drop()
  }

  enumerate(): Stream<[number, T]> {
    const adapter = new Enumerate(this.producer)
    return new Stream(adapter)
  }

  async every(fn: T => Promise<boolean> | boolean): Promise<boolean> {
    const item = await this.find(async i => !await fn(i))
    return item === undefined
  }

  filterMap<U>(fn: T => Promise<?U> | ?U): Stream<U> {
    const adapter = new FilterMap(this.producer, fn)
    return new Stream(adapter)
  }

  filter(fn: T => Promise<boolean> | boolean): Stream<T> {
    const adapter = new Filter(this.producer, fn)
    return new Stream(adapter)
  }

  find(fn: T => Promise<boolean> | boolean): Promise<?T> {
    return this.filter(fn).first()
  }

  first(): Promise<?T> {
    return this.take(1).reduce((_, next) => next)
  }

  flatMap<U>(fn: T => AsyncSource<U>): Stream<U> {
    const adapter = new FlatMap(this.producer, fn)
    return new Stream(adapter)
  }

  flatten(): Stream<*> {
    return this.flatMap(identity)
  }

  async forEach(fn: T => Promise<void> | void): Promise<void> {
    await this.reduce((_, item) => fn(item))
  }

  join(sep?: string = ','): Promise<string> {
    return this.reduce((prev, next) => {
      if (prev.length > 0) {
        return prev + sep + String(next)
      }

      return String(next)
    }, '')
  }

  last(): Promise<?T> {
    return this.reduce((_, next) => next)
  }

  map<U>(fn: T => Promise<U> | U): Stream<U> {
    const adapter = new Map(this.producer, fn)
    return new Stream(adapter)
  }

  async next(): AsyncIteratorResult<T, void> {
    const next = await this.producer.next().catch(e => {
      this.drop()
      throw e
    })

    if (next.done) {
      this.drop()
    }

    return next
  }

  async nth(idx: number): Promise<?T> {
    const [lastIdx, value] = await this.enumerate()
      .take(idx + 1)
      .last()
      .then(item => item || [])

    if (idx === lastIdx) {
      return value
    }

    return undefined
  }

  pipe(dest: AsyncDest): Sink<*> {
    return sink.from(dest).push(this)
  }

  async product(): Promise<number> {
    const [lhs, rhs] = await Promise.all([
      this.next().then(({ value }) => +value || 0),
      this.next().then(({ value }) => +value || 0),
    ])

    return this.reduce((acc, item) => acc * +item, lhs * rhs)
  }

  reduce<U>(fn: (U, T) => Promise<U> | U, acc: Promise<U> | U): Promise<U> {
    return reduceAsync(fn, acc, this)
  }

  skip(amount: number): Stream<T> {
    const adapter = new Skip(this.producer, amount)
    return new Stream(adapter)
  }

  skipWhile(fn: T => Promise<boolean> | boolean): Stream<T> {
    const adapter = new SkipWhile(this.producer, fn)
    return new Stream(adapter)
  }

  async some(fn: T => Promise<boolean> | boolean): Promise<boolean> {
    const item = await this.find(fn)
    return item !== undefined
  }

  sum(): Promise<number> {
    return this.reduce((acc, item) => acc + +item, 0)
  }

  take(amount: number): Stream<T> {
    const adapter = new Take(this.producer, amount)
    return new Stream(adapter)
  }

  takeWhile(fn: T => Promise<boolean> | boolean): Stream<T> {
    const adapter = new TakeWhile(this.producer, fn)
    return new Stream(adapter)
  }

  tap(fn: T => Promise<void> | void): Stream<T> {
    const adapter = new Tap(this.producer, fn)
    return new Stream(adapter)
  }

  unique<U>(fn?: T => Promise<U> | Promise<T> | U | T = identity): Stream<T> {
    const adapter = new Unique(this.producer, fn)
    return new Stream(adapter)
  }

  zip(source?: AsyncSource<*> = this.producer): Stream<[T, *]> {
    const adapter = new Zip(this.producer, source)
    return new Stream(adapter)
  }
}
