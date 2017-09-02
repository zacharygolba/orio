// @flow

import * as result from 'ouro-result'
import { AsIterator, ToString } from 'ouro-traits'

@ToString
@AsIterator
export default class Repeat<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  value: T

  constructor(value: T) {
    this.value = value
  }

  next(): IteratorResult<T, void> {
    return result.next(this.value)
  }
}
