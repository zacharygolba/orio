// @flow

import type { Readable, Writable } from 'stream'

import type { Drop } from './drop'
import type { AsyncIterator, AsyncIteratorResult, Source } from './iterator'

export type AsyncDest = WritableStream | Writable
export type AsyncSource<T> =
  | Promise<Source<T>>
  | AsyncIterable<T>
  | ReadableStream
  | Readable
  | Source<T>

export interface AsyncConsumer<-T> extends Drop {
  write(chunk: T): Promise<void>,
}

export interface AsyncProducer<+T>
  extends AsyncIterable<T>, AsyncIterator<T>, Drop {}

export interface ReadableSource<+T> {
  cancel(reason?: string): void,
  read(): AsyncIteratorResult<T, void>,
}

export interface WritableDest<-T> {
  abort(reason?: string): void,
  write(chunk: T): Promise<void>,
}
