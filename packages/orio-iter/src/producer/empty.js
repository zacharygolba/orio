// @flow

import * as result from 'orio-result'
import { AsIterator, ToString } from 'orio-traits'
import type { Producer } from 'orio-types'

@ToString
@AsIterator
export default class Empty implements Producer<*> {
  /*:: @@iterator: () => Iterator<*> */
  value: void

  drop(): void {
    this.value = undefined
  }

  next(): IteratorResult<*, void> {
    return result.done(this.value)
  }
}
