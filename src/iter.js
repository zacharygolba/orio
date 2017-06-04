/* @flow */

import * as seq from './seq'

export default class Iter<T: any> {
  source: Iterator<T>

  constructor(source: Iterable<T>) {
    Object.defineProperty(this, 'source', {
      // $FlowIgnore
      value: source[Symbol.iterator](),
      writable: false,
      enumerable: false,
      configurable: false,
    })
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  enumerate(): Iter<[number, T]> {
    return new Iter(seq.enumerate(this.source))
  }

  map<U: any>(fn: (value: T) => U): Iter<U> {
    return new Iter(seq.map(this.source, fn))
  }

  filter(fn: (value: T) => boolean): Iter<T> {
    return new Iter(seq.filter(this.source, fn))
  }

  take(amount: number): Iter<T> {
    return new Iter(seq.take(this.source, amount))
  }

  // $FlowIgnore
  zip<U>(source: Iterable<U>): Iter<[T, U]> {
    return new Iter(seq.zip(this.source, source))
  }

  sum(): number {
    let result = 0

    for (const value of this.source) {
      if (typeof value !== 'number') {
        return NaN
      }

      result += value
    }

    return result
  }

  product(): number {
    let result = 1

    for (const value of this.source) {
      if (typeof value !== 'number') {
        return NaN
      }

      result *= value
    }

    return result
  }

  reduce<U>(fn: (prev: U, next: T) => U, init: U): U {
    let result = init

    for (const value of this.source) {
      result = fn(result, value)
    }

    return result
  }

  forEach(fn: (value: T) => any): void {
    for (const value of this.source) {
      fn(value)
    }
  }

  collect(): Array<T> {
    return Array.from(this.source)
  }

  join(seperator?: string = ','): string {
    return this.map(String).reduce((prev, next) => {
      if (prev) {
        return prev + seperator + next
      }
      return next
    }, '')
  }

  static from<+U>(source: Iterable<U>): Iter<U> {
    return new Iter(source)
  }

  static range(from: number, to?: number): Iter<number> {
    return new Iter(seq.range(from, to))
  }

  static repeat<+U>(value: U): Iter<U> {
    return new Iter(seq.repeat(value))
  }
}

Object.defineProperty(Iter.prototype, Symbol.iterator, {
  value() {
    return this.source
  },
  writable: false,
  enumerable: false,
  configurable: false,
})
