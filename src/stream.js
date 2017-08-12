import * as stream from './fp/stream'

class Stream {
  constructor(source) {
    this.source = source
  }

  [Symbol.iterator]() {
    return this
  }

  chain(target) {
    this.source = stream.chain(target)(this.source)
    return this
  }

  count() {
    return stream.count(this)
  }

  enumerate() {
    this.source = stream.enumerate(this.source)
    return this
  }

  every(fn) {
    return stream.every(fn)(this)
  }

  filter(fn) {
    this.source = stream.filter(fn)(this.source)
    return this
  }

  filterMap(fn) {
    this.source = stream.filterMap(fn)(this.source)
    return this
  }

  find(fn) {
    return stream.find(fn)(this)
  }

  first() {
    return stream.first(this)
  }

  flatMap(fn) {
    this.source = stream.flatMap(fn)(this.source)
    return this
  }

  forEach(fn) {
    return stream.forEach(fn)(this)
  }

  join(sep) {
    return stream.join(sep)(this)
  }

  last() {
    return stream.last(this)
  }

  map(fn) {
    this.source = stream.map(fn)(this.source)
    return this
  }

  next() {
    return this.source.next()
  }

  nth(index) {
    return stream.nth(index)(this)
  }

  product() {
    return stream.product(this)
  }

  reduce(fn, init) {
    return stream.reduce(fn, init, this)
  }

  skip(amount) {
    this.source = stream.skip(amount)(this.source)
    return this
  }

  skipWhile(fn) {
    this.source = stream.skipWhile(fn)(this.source)
    return this
  }

  some(fn) {
    return stream.some(fn)(this)
  }

  sum() {
    return stream.sum(this)
  }

  take(amount) {
    this.source = stream.take(amount)(this.source)
    return this
  }

  takeWhile(fn) {
    this.source = stream.takeWhile(fn)(this.source)
    return this
  }

  tap(fn) {
    this.source = stream.tap(fn)(this.source)
    return this
  }

  zip(target) {
    this.source = stream.zip(target)(this.source)
    return this
  }
}

export function from(source) {
  return new Stream(stream.from(source))
}

export function fromEvent(source, event) {
  return new Stream(stream.fromEvent(source, event))
}

export function fromReadable(source) {
  return new Stream(stream.fromReadable(source))
}

export function range(start, end) {
  return new Stream(stream.range(start, end))
}

export function repeat(value) {
  return new Stream(stream.repeat(value))
}
