import * as iter from './fp/iter'

class Iter {
  constructor(source) {
    this.source = source
  }

  [Symbol.iterator]() {
    return this
  }

  chain(target) {
    this.source = iter.chain(target)(this.source)
    return this
  }

  count() {
    return iter.count(this)
  }

  cycle() {
    this.source = iter.cycle(this.source)
    return this
  }

  enumerate() {
    this.source = iter.enumerate(this.source)
    return this
  }

  every(fn) {
    return iter.every(fn)(this)
  }

  filter(fn) {
    this.source = iter.filter(fn)(this.source)
    return this
  }

  filterMap(fn) {
    this.source = iter.filterMap(fn)(this.source)
    return this
  }

  find(fn) {
    return iter.find(fn)(this)
  }

  first() {
    return iter.first(this)
  }

  flatMap(fn) {
    this.source = iter.flatMap(fn)(this.source)
    return this
  }

  forEach(fn) {
    return iter.forEach(fn)(this)
  }

  join(sep) {
    return iter.join(sep)(this)
  }

  last() {
    return iter.last(this)
  }

  map(fn) {
    this.source = iter.map(fn)(this.source)
    return this
  }

  next() {
    return this.source.next()
  }

  nth(index) {
    return iter.nth(index)(this)
  }

  product() {
    return iter.product(this)
  }

  reduce(fn, init) {
    return iter.reduce(fn, init, this)
  }

  skip(amount) {
    this.source = iter.skip(amount)(this.source)
    return this
  }

  skipWhile(fn) {
    this.source = iter.skipWhile(fn)(this.source)
    return this
  }

  some(fn) {
    return iter.some(fn)(this)
  }

  sum() {
    return iter.sum(this)
  }

  take(amount) {
    this.source = iter.take(amount)(this.source)
    return this
  }

  takeWhile(fn) {
    this.source = iter.takeWhile(fn)(this.source)
    return this
  }

  tap(fn) {
    this.source = iter.tap(fn)(this.source)
    return this
  }

  zip(target) {
    this.source = iter.zip(target)(this.source)
    return this
  }
}

export function from(source) {
  return new Iter(iter.from(source))
}

export function range(start, end) {
  return new Iter(iter.range(start, end))
}

export function repeat(value) {
  return new Iter(iter.repeat(value))
}
