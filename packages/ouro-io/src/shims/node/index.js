// @flow

import { Readable, Writable } from 'stream'

import ReadableWrapper from './readable'
import WritableWrapper from './writable'

export function isReadable(value: mixed): boolean %checks {
  return value instanceof Readable
}

export function isWritable(value: mixed): boolean %checks {
  return value instanceof Writable
}

export function wrapReadable(source: any): ReadableWrapper {
  return new ReadableWrapper(source)
}

export function wrapWritable(dest: any): WritableWrapper {
  return new WritableWrapper(dest)
}
