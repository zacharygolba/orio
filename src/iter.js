/* @flow */

import * as adapter from './adapter'
import * as utils from './utils'
import type { Adapter } from './adapter'

export default class Iter<T> implements Iterator<T> {
  adapters: Array<Adapter>
  source: Iterator<T>
  state: number

  constructor(source: Iterator<T>, adapters: Array<Adapter> = []) {
    Object.defineProperties(this, {
      adapters: {
        value: adapters,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      source: {
        value: source,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      state: {
        value: 0,
        writable: true,
        enumerable: false,
        configurable: false,
      },
    })
  }

  // $FlowIgnore
  [Symbol.iterator]() {
    return this
  }

  next(): IteratorResult<T> {
    let { done, value } = this.source.next()

    /* eslint-disable no-restricted-syntax, no-labels, default-case */

    loop: for (let i = 0; i < this.adapters.length; i += 1) {
      const item = this.adapters[i]

      if (!item) {
        break
      }

      switch (item.type) {
        case 'ENUMERATE':
          value = [this.state, value]
          break

        case 'FILTER': {
          const shouldKeep = item.action(value)

          if (!shouldKeep && !done) {
            return this.next()
          }

          if (!shouldKeep && done) {
            value = undefined
            break loop
          }

          break
        }

        case 'MAP':
          value = item.action(value)
          break

        case 'TAKE':
          done = this.state + 1 > item.amount
          break

        case 'ZIP': {
          const zipResult = item.target.next()

          done = done && zipResult.done
          value = [value, zipResult.value]
          break
        }
      }
    }

    this.state += 1

    return {
      done,
      value,
    }
  }

  enumerate(): Iter<[number, T]> {
    const adapters = this.adapters.concat([
      adapter.enumerate(),
    ])

    return new Iter(this.source, adapters)
  }

  map<U>(fn: (value: T) => U): Iter<U> {
    const adapters = this.adapters.concat([
      adapter.map(fn),
    ])

    return new Iter(this.source, adapters)
  }

  filter(fn: (value: T) => boolean): Iter<T> {
    const adapters = this.adapters.concat([
      adapter.filter(fn),
    ])

    return new Iter(this.source, adapters)
  }

  take(amount: number): Iter<T> {
    const adapters = this.adapters.concat([
      adapter.take(amount),
    ])

    return new Iter(this.source, adapters)
  }

  zip<U>(source: Iterable<U>): Iter<[T, U]> {
    const adapters = this.adapters.concat([
      adapter.zip(source[Symbol.iterator]()),
    ])

    return new Iter(this.source, adapters)
  }

  sum(): number {
    return this.reduce((prev, next) =>
      typeof next === 'number' ? prev + next : prev
    , 0)
  }

  product(): number {
    return this.reduce((prev, next) => {
      if (typeof prev === 'undefined') { return next }
      return prev * next
    })
  }

  reduce<U>(fn: (prev: U, next?: T) => U, init: U): U {
    let next = this.next()
    let result = init

    do {
      if (next.value) { result = fn(result, next.value) }
      next = this.next()
    } while (!next.done)

    return result
  }

  forEach(fn: (value: T) => any): void {
    let next = this.next()

    do {
      if (next.value) { fn(next.value) }
      next = this.next()
    } while (!next.done)
  }

  collect(): Array<T> {
    return Array.from(this)
  }

  static from<U>(source: Iterable<U>): Iter<U> {
    return new Iter(source[Symbol.iterator]())
  }

  static range(from: number, to?: number): Iter<number> {
    return new Iter(utils.range(from, to))
  }

  static repeat<U>(value: U): Iter<U> {
    return new Iter(utils.repeat(value))
  }
}

