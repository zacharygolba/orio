// @flow

import { AsAsyncIterator, ToString } from 'ouro-traits'
import type { AsyncConsumer, WritableDest } from 'ouro-types'

@ToString
@AsAsyncIterator
export default class Writer<T> implements AsyncConsumer<T> {
  dest: WritableDest<T>

  constructor(dest: WritableDest<*>) {
    this.dest = dest
  }

  drop(): void {
    this.dest.abort()
  }

  write(chunk: T): Promise<void> {
    return this.dest.write(chunk)
  }
}
