import Cycle from './cycle'
import { IndexedIterator, UnboundedIterator } from './iterator'
import Range from './range'
import Repeat from './repeat'

export const cycle = source => new Cycle(source)
export const range = (start = 0, end = Infinity) => new Range(start, end)
export const repeat = value => new Repeat(value)

export const from = source => {
  if (Array.isArray(source) || typeof source === 'string') {
    return new IndexedIterator(source)
  }

  if (source && typeof source[Symbol.iterator] === 'function') {
    return new UnboundedIterator(source)
  }

  if (source === null || source === undefined) {
    return new IndexedIterator(new Array(0))
  }

  return new IndexedIterator(new Array(1).fill(source))
}

