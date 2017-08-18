import {
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
} from '../adapters'

export function impl(Target) {
  return class extends Target {
    [Symbol.iterator]() {
      return this
    }

    chain(target) {
      return new Chain(this, target)
    }

    collect() {
      return this.reduce((acc, next) => {
        acc.push(next)
        return acc
      }, [])
    }

    count() {
      const size = this.sizeHint()
      return Number.isFinite(size) ? this.reduce(acc => acc + 1, 0) : Infinity
    }

    enumerate() {
      return new Enumerate(this)
    }

    every(fn) {
      return this.map(fn).find(value => !value) === undefined
    }

    filterMap(fn) {
      return new FilterMap(this, fn)
    }

    filter(fn) {
      return new Filter(this, fn)
    }
    find(fn) {
      return this.filter(fn).first()
    }

    first() {
      return this.take(1).reduce((_, next) => next, undefined)
    }

    flatMap(fn) {
      return new FlatMap(this, fn)
    }

    forEach(fn) {
      const size = this.sizeHint()

      for (let i = 0; i < size; i++) {
        const result = this.next()

        if (result.done) {
          break
        }

        fn(result.value)
      }
    }

    join(sep = ',') {
      return this.reduce((prev, next) => prev ? (prev + sep + next) : (prev + next), '')
    }

    last() {
      return this.reduce((_, next) => next, undefined)
    }

    map(fn) {
      return new Map(this, fn)
    }

    nth(idx) {
      const [lastIdx, value] = this.enumerate().take(idx + 1).last()

      if (idx === lastIdx) {
        return value
      }

      // If the last index is not equal to the input index, the input index was
      // out of bounds.
      return undefined
    }

    product() {
      const iter = this.map(Number)
      const { value = NaN } = iter.next()

      return iter.reduce((acc, next) => acc * next, value)
    }

    reduce(fn, init) {
      const size = this.sizeHint()
      let acc = init

      for (let i = 0; i < size; i++) {
        const result = this.next()

        if (result.done) {
          break
        }

        acc = fn(acc, result.value)
      }

      return acc
    }

    skip(amount) {
      return new Skip(this, amount)
    }

    skipWhile(fn) {
      return new SkipWhile(this, fn)
    }

    some(fn) {
      return this.map(fn).find(Boolean) !== undefined
    }

    sum() {
      return this.map(Number).reduce((acc, next) => acc + next, 0)
    }

    take(amount) {
      return new Take(this, amount)
    }

    takeWhile(fn) {
      return new TakeWhile(this, fn)
    }

    tap(fn) {
      return new Tap(this, fn)
    }

    zip(source) {
      return new Zip(this, source)
    }
  }
}
