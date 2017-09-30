// @flow

import { Readable } from 'stream'

import * as result from 'orio-result'
import { ToString } from 'orio-traits'
import type { AsyncIteratorResult, ReadableSource } from 'orio-types'

@ToString
export default class ReadableWrapper<T> implements ReadableSource<T> {
  done: boolean
  error: ?Error
  source: Readable
  handleEnd: () => void
  handleError: Error => void

  constructor(source: Readable) {
    this.done = false
    this.error = null
    this.source = source
    this.handleEnd = () => this.cancel()
    this.handleError = e => {
      this.error = e
      this.cancel()
    }

    source.once('end', this.handleEnd).once('error', this.handleError)
  }

  cancel(): void {
    this.done = true

    this.source.removeListener('end', this.handleEnd)
    this.source.removeListener('error', this.handleError)

    // $FlowIgnore
    this.source.destroy()
  }

  read(): AsyncIteratorResult<T, void> {
    if (this.done && this.error != null) {
      return Promise.reject(this.error)
    } else if (this.done) {
      return Promise.resolve({
        done: true,
        value: undefined,
      })
    } else if (this.source.readable === false) {
      this.cancel()
      return this.read()
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

      handleData = value => {
        cleanup()
        resolve(result.next(value))
      }

      handleEnd = () => {
        this.cancel()
        resolve(result.done())
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
}
