// @flow

import { PassThrough, Readable } from 'stream'

import * as result from 'orio-result'
import { ToString } from 'orio-traits'
import { timers } from 'orio-utils'
import type { AsyncIteratorResult, ReadableSource } from 'orio-types'

type Callback = () => void

@ToString
export default class ReadableWrapper<T> implements ReadableSource<T> {
  pipe: ReadablePipe
  source: Readable

  constructor(source: Readable) {
    const handleError = () => this.cancel()
    const pipe = new ReadablePipe()

    this.pipe = pipe
    this.source = source

    source
      .once('error', handleError)
      .pipe(pipe)
      .once('error', handleError)
  }

  cancel(): void {
    const { pipe, source } = this

    pipe.removeAllListeners()
    source.unpipe(pipe)

    if (typeof pipe.destroy === 'function') {
      pipe.destroy()
    }

    if (typeof source.destroy === 'function') {
      source.destroy()
    }
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

    this.once('error', e => {
      this.error = e
    })
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

async function poll<T>(pipe: ReadablePipe): AsyncIteratorResult<T, void> {
  const value: any = pipe.read()

  if (pipe.error) {
    throw pipe.error
  }

  if (value != null) {
    return result.next(value)
  }

  if (pipe.done) {
    return result.done()
  }

  await timers.immediate()
  return poll(pipe)
}
