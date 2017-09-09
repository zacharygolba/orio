// @flow

import { Writable } from 'stream'

import type { WritableDest } from 'ouro-types'

type Chunk = Uint8Array | number

export default class WritableWrapper implements WritableDest<Chunk> {
  dest: Writable

  constructor(dest: Writable) {
    this.dest = dest
  }

  abort(): void {
    this.dest.end()
  }

  write(chunk: Chunk): Promise<void> {
    return new Promise(resolve => {
      if (chunk instanceof Uint8Array) {
        this.dest.write(Buffer.from(chunk), resolve)
      } else if (typeof chunk === 'number') {
        this.dest.write(Buffer.allocUnsafe(1).fill(chunk), resolve)
      } else {
        throw new Error('Unimplemented')
      }
    })
  }
}
