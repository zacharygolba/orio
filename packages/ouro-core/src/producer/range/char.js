// @flow

import { AsIterator, ToString } from 'ouro-traits'

import * as result from '../../result'

import NumberProducer from './number'

export const MIN_CHAR: string = String.fromCodePoint(0)
export const MAX_CHAR: string = String.fromCodePoint(0x10ffff)

@ToString
@AsIterator
export default class CharProducer implements Iterator<string> {
  /*:: @@iterator: () => Iterator<string> */
  source: NumberProducer
  size: number

  constructor(start?: string = MIN_CHAR, end?: string = MAX_CHAR) {
    this.source = new NumberProducer(start.codePointAt(0), end.codePointAt(0))
    this.size = this.source.size
  }

  next(): IteratorResult<string, void> {
    const next = this.source.next()

    if (next.done) {
      return next
    }

    return result.next(String.fromCodePoint(next.value))
  }
}
