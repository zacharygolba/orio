// @flow

import { AsIterator, ToString } from 'ouro-traits'

import * as result from '../result'

@ToString
@AsIterator
export default class RepeatProducer<T> implements Iterator<T> {
  /*:: @@iterator: () => Iterator<T> */
  value: T

  constructor(value: T) {
    this.value = value
  }

  next(): IteratorResult<T, void> {
    return result.next(this.value)
  }
}
