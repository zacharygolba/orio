// @flow

import { Writable } from 'stream'
import { promisify } from 'util'

import { ToString } from 'ouro-traits'
import type { WritableDest } from 'ouro-types'

@ToString
export default class WritableWrapper<T> implements WritableDest<T> {
  dest: Writable
  writeChunk: T => Promise<void>

  constructor(dest: Writable) {
    this.dest = dest
    this.writeChunk = promisify(dest.write).bind(dest)
  }

  abort(): void {
    this.dest.end()
  }

  async write(chunk: T): Promise<void> {
    if (chunk instanceof Uint8Array) {
      await this.writeChunk(Buffer.from(chunk))
    } else {
      await this.writeChunk(chunk)
    }
  }
}
