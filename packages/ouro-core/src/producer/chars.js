// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'
import type { Producer } from 'ouro-types'

@ToString
@AsIterator
export default class Chars implements Producer<*> {
  /*:: @@iterator: () => Iterator<string> */
  cursor: number
  source: string

  constructor(source: string) {
    this.cursor = 0
    this.source = source
  }

  drop(): void {
    this.cursor = 0
    this.source = ''
  }

  next(): IteratorResult<string, void> {
    const { cursor, source } = this

    if (cursor >= source.length) {
      return result.done()
    }

    this.cursor += 1
    return result.next(source.substr(cursor, 1))
  }
}
