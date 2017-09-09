// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'
import type { Producer } from 'ouro-types'

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
