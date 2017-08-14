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
} from './adapters'

export function impl(Target) {
  return class extends Target {
    [Symbol.iterator]() {
      return this
    }

    chain(target) {
      return new Chain(this, target)
    }

    collect() {
      const length = this.sizeHint()
      const items = new Array(length)
      let i = 0

      for (; i < length; i++) {
        const result = this.next()

        if (result.done) {
          break
        }

        items[i] = result.value
      }

      items.length = i
      return items
    }

    count() {
      return this.reduce(acc => acc + 1, 0)
    }

    enumerate() {
      return new Enumerate(this)
    }

    every(fn) {
      return this.map(fn).find(value => !value) || true
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
      const length = this.sizeHint()

      for (let i = 0; i < length; i++) {
        const { done, value } = this.next()

        if (done) {
          break
        }

        fn(value)
      }
    }

    join(sep) {
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
      const { value = NaN } = this.next()
      return this.reduce((prev, next) => prev + next, value)
    }

    reduce(fn, init) {
      const length = this.sizeHint()
      let acc = init

      for (let i = 0; i < length; i++) {
        const { done, value } = this.next()

        if (done) {
          break
        }

        acc = fn(acc, value)
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
      return this.map(fn).find(Boolean) || false
    }

    sum() {
      return this.reduce((acc, next) => acc + next, 0)
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
