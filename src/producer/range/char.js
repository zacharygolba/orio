// @flow

import * as result from '../../result'
import type { Producer } from '../types'

import NumberProducer from './number'

export default class CharProducer implements Producer<*> {
  source: NumberProducer
  /*:: @@iterator: () => Iterator<string> */

  constructor(start: string, end: string) {
    this.source = new NumberProducer(start.charCodeAt(0), end.charCodeAt(0))
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

    return result.next(String.fromCharCode(next.value))
  }

  sizeHint(): number {
    return this.source.sizeHint()
  }
}
