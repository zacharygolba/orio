// @flow

import type { ReadableSource, WritableDest } from 'orio-types'

let readableBrandCheck = (_: mixed): boolean %checks => false
let writableBrandCheck = (_: mixed): boolean %checks => false

if (typeof ReadableStream !== 'undefined') {
  readableBrandCheck = (value: mixed): boolean %checks =>
    value instanceof ReadableStream
}

if (typeof WritableStream !== 'undefined') {
  writableBrandCheck = (value: mixed): boolean %checks =>
    value instanceof WritableStream
}

export function isReadable(value: mixed): boolean %checks {
  return readableBrandCheck(value)
}

export function isWritable(value: mixed): boolean %checks {
  return writableBrandCheck(value)
}

export function getReader(value: any): ReadableSource<*> {
  return value.getReader()
}

export function getWriter(value: any): WritableDest<*> {
  return value.getWriter()
}
