// @flow

import { PassThrough, Readable } from 'stream'

import * as result from 'ouro-result'
import { ToString } from 'ouro-traits'
import { setImmediate } from 'ouro-utils'
import type { AsyncIteratorResult, ReadableSource } from 'ouro-types'

type Callback = () => void

@ToString
export default class ReadableWrapper<T> implements ReadableSource<T> {
  pipe: ReadablePipe

  constructor(source: Readable) {
    this.pipe = new ReadablePipe()
    source.pipe(this.pipe).once('error', () => this.cancel())
  }

  cancel(): void {
    // $FlowFixMe
    this.pipe.destroy()
  }

  read(): AsyncIteratorResult<T, void> {
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

async function poll<T>(source: ReadablePipe): AsyncIteratorResult<T, void> {
  const value: any = source.read()

  if (value != null) {
    return result.next(value)
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
