// @flow

import * as result from '../../result'
import type { Producer } from '../types'

import NumberProducer from './number'

export const MIN_CHAR: string = String.fromCodePoint(0)
export const MAX_CHAR: string = String.fromCodePoint(0x10ffff)

export default class CharProducer implements Producer<*> {
  source: NumberProducer
  size: number
  /*:: @@iterator: () => Iterator<string> */

  constructor(start?: string = MIN_CHAR, end?: string = MAX_CHAR) {
    this.source = new NumberProducer(start.codePointAt(0), end.codePointAt(0))
    this.size = this.source.size
  }

  // $FlowFixMe
  [Symbol.iterator](): Iterator<string> {
    return this
  }

  next(): IteratorResult<string, void> {
    const next = this.source.next()

    if (next.done) {
      return next
    }

    return result.next(String.fromCodePoint(next.value))
  }

  sizeHint(): number {
    return this.size
  }
}
