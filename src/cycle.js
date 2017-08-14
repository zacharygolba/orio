// @flow

import { impl } from './iter'
import { IndexedIterator } from './iterator'
import type { IndexedCollection } from './types'

export default impl(class Cycle<T> {
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
