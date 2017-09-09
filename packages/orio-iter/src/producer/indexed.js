// @flow

import * as result from 'orio-result'
import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

@ToString
@AsIterator
export default class Indexed<T> implements Producer<T> {
  /*:: @@iterator: () => Iterator<T> */
  index: number
  source: $ReadOnlyArray<T>

  constructor(source: $ReadOnlyArray<T>) {
    this.index = 0
    this.source = source
  }

  drop(): void {
    this.index = 0
    this.source = []
  }

  next(): IteratorResult<T, void> {
    const { index, source } = this

    if (index >= source.length) {
      return result.done()
    }

    this.index += 1
    return result.next(source[index])
  }
}
