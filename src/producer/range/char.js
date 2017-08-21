// @flow

import * as result from '../../result'
import ProducerBase from '../base'

import NumberProducer from './number'

export const MIN_CHAR: string = String.fromCodePoint(0)
export const MAX_CHAR: string = String.fromCodePoint(0x10ffff)

export default class CharProducer extends ProducerBase<string> {
  source: NumberProducer
  size: number

  constructor(start?: string = MIN_CHAR, end?: string = MAX_CHAR) {
    super()
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

  sizeHint(): number {
    return this.size
  }
}
