/* @flow */

import { DONE, SKIP, consume } from './adapter'
import { unimplemented } from './decorators'
import { isSome, negate } from './utils'
import type { Filter, Inspect, Iter, Mapper, Nil, Reducer } from './types'

export default class Base<T> implements Iter<T> {
  adapters: Array<Function>
  cursor: number
  size: number

  constructor() {
    this.adapters = []
    this.cursor = 0
    this.size = NaN
  }

  // $FlowFixMe
  [Symbol.iterator]() {
    return this
  }

  @unimplemented
  chain<U>(source: Iterable<U>): Iter<T | U> {
    return this
  }

  collect(): Array<T> {
    const array = []

    consume(this, item => {
      array.push(item)
    })

    return array
  }

  count(): number {
    let result = 0

    consume(this, () => {
      result++
    })

    return result
  }

  @unimplemented
  cycle(): Iter<T> {
    return this
  }

  @unimplemented
  enumerate(): Iter<[number, T]> {
    return this
  }

  every(fn: Filter<T>): boolean {
    return !this.find(negate(fn))
  }

  filter(fn: Filter<T>): Iter<T> {
    this.adapters.push(value => fn(value) ? value : SKIP)
    return this
  }

  filterMap<U>(fn: Mapper<T, U | Nil>): Iter<U> {
    this.adapters.push(value => {
      const mapped = fn(value)

      return isSome(mapped) ? mapped : SKIP
    })

    return this
  }

  find(fn: Filter<T>): void | T {
    let result

    consume(this, value => {
      if (fn(value)) {
        result = value
        return false
      }

      return undefined
    })

    return result
  }

  first(): void | T {
    return this.nth(0)
  }

  @unimplemented
  flatMap(): Iter<T> {
    return this
  }

  forEach(fn: Inspect<T>): void {
    consume(this, fn)
  }

  fuse(): Iter<T> {
    return this.takeWhile(isSome)
  }

  join(seperator?: string = ','): string {
    return this.map(String).reduce((prev, next) => {
      if (prev) {
        return prev + seperator + next
      }
      return next
    }, '')
  }

  last(): void | T {
    let result

    consume(this, value => {
      result = value
    })

    return result
  }

  map<U>(fn: Mapper<T, U>): Iter<U> {
    this.adapters.push(fn)
    return this
  }

  @unimplemented
  max(): void | T {
    return this
  }

  @unimplemented
  maxBy(): void | T {
    return this
  }

  @unimplemented
  maxByKey(): void | T {
    return this
  }

  @unimplemented
  min(): void | T {
    return this
  }

  @unimplemented
  minBy(): void | T {
    return this
  }

  @unimplemented
  minByKey(): void | T {
    return this
  }

  @unimplemented
  next(): IteratorResult<T, void> {
    return {
      done: false,
      value: undefined,
    }
  }

  nth(index: number): T {
    let cursor = 0
    let result

    consume(this, value => {
      if (cursor === index) {
        result = value
        return false
      }

      cursor++
      return undefined
    })

    return result
  }

  @unimplemented
  partition(): Iter<T> {
    return this
  }

  product(): number {
    let hasResult = false
    let result = NaN

    consume(this, value => {
      if (hasResult === false) {
        hasResult = true
        result = value
        return undefined
      }

      if (typeof value !== 'number') {
        result = NaN
        return false
      }

      result *= value
      return undefined
    })

    return result
  }

  reduce<U>(fn: Reducer<T, U>, init?: U): U {
    let result = init

    consume(this, value => {
      result = fn(result, value)
    })

    return result
  }

  @unimplemented
  scan(): Iter<T> {
    return this
  }

  skip(amount: number): Iter<T> {
    let counter = 0

    this.adapters.push(value => counter++ > amount ? value : SKIP)
    return this
  }

  skipWhile(fn: Filter<T>): Iter<T> {
    this.adapters.push(value => fn(value) ? SKIP : value)
    return this
  }

  some(fn: Filter<T>): boolean {
    return !!this.find(fn)
  }

  sum(): number {
    let result = 0

    consume(this, value => {
      if (typeof value !== 'number') {
        result = NaN
        return false
      }

      result += value
      return undefined
    })

    return result
  }

  take(amount: number): Iter<T> {
    let counter = 0

    this.adapters.push(value => counter++ === amount ? DONE : value)
    return this
  }

  takeWhile(fn: Filter<T>): Iter<T> {
    const shouldStop = negate(fn)

    this.adapters.push(value => {
      if (shouldStop(value)) {
        return DONE
      }

      return value
    })

    return this
  }

  tap(fn: Inspect<T>): Iter<T> {
    return this.map(value => {
      fn(value)
      return value
    })
  }

  zip<U>(source: Iterable<U>): Iter<[T, U]> {
    this.adapters.push(key => {
      const result = source.next()

      if (result.done) {
        return DONE
      }

      return [
        key,
        result.value,
      ]
    })

    return this
  }
}
