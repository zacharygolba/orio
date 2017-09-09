// @flow

import { PassThrough, Readable } from 'stream'

import * as result from 'ouro-result'
import { setImmediate } from 'ouro-utils'
import type { AsyncIteratorResult, ReadableSource } from 'ouro-types'

type Callback = () => void
type Result = AsyncIteratorResult<Uint8Array, void>

export default class ReadableWrapper implements ReadableSource<Uint8Array> {
  pipe: ReadablePipe

  constructor(source: Readable) {
    this.pipe = new ReadablePipe()
    source.pipe(this.pipe).once('error', () => this.cancel())
  }

  cancel(): void {
    // $FlowFixMe
    this.pipe.destroy()
  }

  read(): Result {
    return poll(this.pipe)
  }
}

class ReadablePipe extends PassThrough {
  error: ?Error
  done: boolean

  constructor() {
    super({})
    this.pause()
    this.done = false
    this.error = undefined
  }

  end(
    chunk?: Buffer | string | Callback,
    encoding?: string | Callback,
    callback?: Callback,
  ): void {
    super.end(chunk, encoding, callback)
    this.done = true
  }
}

async function poll(source: ReadablePipe): Result {
  const value = source.read()

  if (value instanceof Buffer) {
    return result.next(new Uint8Array(value))
  }

  if (source.error) {
    throw source.error
  }

  if (source.done) {
    return result.done()
  }

  await setImmediate()
  return poll(source)
}
