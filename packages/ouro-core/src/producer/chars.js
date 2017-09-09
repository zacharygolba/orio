// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'
import type { Producer } from 'ouro-types'

@ToString
@AsIterator
export default class Chars implements Producer<*> {
  /*:: @@iterator: () => Iterator<string> */
  done: boolean
  source: Iterator<string>

  constructor(source: string) {
    this.done = false
    // $FlowFixMe
    this.source = source[Symbol.iterator]()
  }

  drop(): void {
    this.done = true
  }

  next(): IteratorResult<string, void> {
    if (this.done) {
      return result.done()
    }

    return this.source.next()
  }
}
