// @flow

import type { Producer } from './'

import * as result from '../result'

export default class ProducerBase<T> implements Producer<T> {
  // eslint-disable-next-line prettier/prettier
  /*:: @@iterator: () => Iterator<T>; */

  // $FlowFixMe
  [Symbol.iterator]() {
    return this
  }

  next(): IteratorResult<T, void> {
    return result.done()
  }

  sizeHint(): number {
    return 0
  }
}
