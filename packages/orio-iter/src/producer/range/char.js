// @flow

import * as result from 'orio-result'
import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

import NumberRange from './number'

export const MIN_CHAR: string = String.fromCodePoint(0)
export const MAX_CHAR: string = String.fromCodePoint(0x10ffff)

@ToString
@AsIterator
export default class CharRange implements Producer<string> {
  /*:: @@iterator: () => Iterator<string> */
  source: NumberRange

  constructor(start?: string = MIN_CHAR, end?: string = MAX_CHAR) {
    this.source = new NumberRange(start.codePointAt(0), end.codePointAt(0))
  }

  drop(): void {
    this.source.drop()
  }

  next(): IteratorResult<string, void> {
    const next = this.source.next()

    if (next.done) {
      return next
    }

    return result.next(String.fromCodePoint(next.value))
  }
}
