// @flow

import { impl } from './iter'
import sizeOf from './utils/size-of'

const CharRange = impl(class {
  source: Iterator<number>

  constructor(from: string, to: string) {
    this.source = new NumberRange(from.charCodeAt(0), to.charCodeAt(0))
  }

  next(): IteratorResult<string, void> {
    const result = this.source.next()

    if (result.done) {
      return {
        done: true,
        value: undefined,
      }
    }

    return {
      done: false,
      value: String.fromCharCode(result.value),
    }
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})

const NumberRange = impl(class {
  source: Iterator<number>

  constructor(start?: number = 0, end?: number = Infinity) {
    if (start > end) {
      this.source = new DescNumberRange(start, end)
    } else {
      this.source = new AscNumberRange(start, end)
    }
  }

  next(): IteratorResult<number, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})

const AscNumberRange = impl(class {
  end: number
  start: number
  state: number

  constructor(start: number, end: number) {
    this.end = end
    this.start = Number.isFinite(start) ? start : 0
    this.state = this.start
  }

  next(): IteratorResult<number, *> {
    if (this.state > this.end) {
      return {
        done: true,
        value: undefined,
      }
    }

    return {
      done: false,
      value: this.state++,
    }
  }

  sizeHint(): number {
    return Math.abs(this.end - this.start)
  }
})

const DescNumberRange = impl(class {
  end: number
  start: number
  state: number

  constructor(start: number, end: number) {
    this.end = end
    this.start = Number.isFinite(start) ? start : Number.MAX_SAFE_INTEGER
    this.state = this.start
  }

  next(): IteratorResult<number, void> {
    if (this.state < this.end) {
      return {
        done: true,
        value: undefined,
      }
    }

    return {
      done: false,
      value: this.state--,
    }
  }

  sizeHint(): number {
    return Math.abs(this.start - this.end)
  }
})

export default impl(class Range<T: number | string> {
  source: Iterator<T>

  constructor(start: T, end: T) {
    if (typeof start === 'string' && typeof end === 'string') {
      this.source = new CharRange(start, end)
    } else if (typeof start === 'number' && typeof end === 'number') {
      this.source = new NumberRange(start, end)
    }
  }

  next(): IteratorResult<T, void> {
    return this.source.next()
  }

  sizeHint(): number {
    return sizeOf(this.source)
  }
})
