// @flow

import { Readable } from 'stream'

import * as result from 'orio-result'
import { ToString } from 'orio-traits'
import type { AsyncIteratorResult, ReadableSource } from 'orio-types'

function merge(a: Uint8Array, b: Uint8Array): Uint8Array {
  const buf = new Uint8Array(a.length + b.length)

  buf.set(a)
  buf.set(b, a.length)
  return buf
}

@ToString
export default class ReadableWrapper implements ReadableSource<Uint8Array> {
  data: Uint8Array
  done: boolean
  error: ?Error
  source: Readable
  handleData: Uint8Array => void
  handleEnd: () => void
  handleError: Error => void

  constructor(source: Readable) {
    this.data = new Uint8Array(0)
    this.done = false
    this.error = null
    this.source = source
    this.handleEnd = () => this.cancel()

    this.handleData = data => {
      this.data = merge(this.data, data)
    }

    this.handleError = e => {
      this.error = e
      this.cancel()
    }

    source
      .on('data', this.handleData)
      .once('end', this.handleEnd)
      .once('error', this.handleError)
  }

  cancel(): void {
    this.done = true

    this.source.removeListener('data', this.handleData)
    this.source.removeListener('end', this.handleEnd)
    this.source.removeListener('error', this.handleError)

    // $FlowIgnore
    this.source.destroy()
  }

  async read(): AsyncIteratorResult<Uint8Array, void> {
    if (this.done && this.error != null) {
      throw this.error
    }

    if (this.done) {
      return result.done()
    }

    if (this.source.readable === false) {
      this.cancel()
      return this.read()
    }

    if (this.data.length > 0) {
      return result.next(this.take())
    }

    return new Promise((resolve, reject) => {
      let handleData = null
      let handleEnd = null
      let handleError = null

      const cleanup = () => {
        // $FlowIgnore
        this.source.removeListener('data', handleData)
        // $FlowIgnore
        this.source.removeListener('end', handleEnd)
        // $FlowIgnore
        this.source.removeListener('error', handleError)
      }

      handleData = () => {
        cleanup()
        setImmediate(() => {
          const chunk = this.take()
          resolve(result.next(chunk))
        })
      }

      handleEnd = () => {
        cleanup()
        setImmediate(() => {
          const chunk = this.take()
          resolve(chunk.length ? result.next(chunk) : result.done())
        })
      }

      handleError = e => {
        cleanup()
        reject(e)
      }

      this.source
        .once('data', handleData)
        .once('error', handleError)
        .once('end', handleEnd)
    })
  }

  take(bytes?: number = this.data.length): Uint8Array {
    const chunk = this.data.slice(0, bytes)

    this.data = this.data.slice(bytes)
    return chunk
  }
}
