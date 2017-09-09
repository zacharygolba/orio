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

  async write(chunk: T): Promise<void> {
    await this.dest.write(chunk)
  }
}
