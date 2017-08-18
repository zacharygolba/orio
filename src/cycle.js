// @flow

import { impl } from './iter'
import { IndexedIterator } from './iterator'
import type { IndexedCollection } from './iterator'
import type { Iter } from './iter'

export default function cycle<T: any>(source: IndexedCollection<T>): Iter<T> {
  return new Cycle(source)
}

const Cycle = impl(class CycleIterator<T> {
  original: IndexedCollection<T>
  source: Iterator<T>

  constructor(source: IndexedCollection<T>) {
    this.original = source
    this.reset()
  }

  next(): IteratorResult<T, void> {
    let result = this.source.next()

    if (result.done) {
      this.reset()
      result = this.source.next()
    }

    return result
  }

  reset(): void {
    this.source = new IndexedIterator(this.original)
  }

  sizeHint(): number {
    return Infinity
  }
})
