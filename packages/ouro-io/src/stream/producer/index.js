// @flow

import { intoAsyncIterator, intoIterator } from 'ouro-utils'
import type { AsyncProducer, AsyncSource } from 'ouro-types'

import * as nodeStream from '../../shims/node'
import * as webStream from '../../shims/web'
import Stream from '../stream'

import Chars from './chars'
import Empty from './empty'
import Indexed from './indexed'
import Once from './once'
import Reader from './reader'
import Task from './task'
import Unbound from './unbound'

export { Chars, Empty, Indexed, Once, Reader, Task, Unbound }

export function createProducer<T>(source: AsyncSource<T>): AsyncProducer<T> {
  if (source == null) {
    return new Empty()
  }

  if (source instanceof Promise) {
    return new Task(source)
  }

  if (source instanceof Stream) {
    return source.producer
  }

  if (webStream.isReadable(source)) {
    return new Reader(webStream.getReader(source))
  }

  if (nodeStream.isReadable(source)) {
    return new Reader(nodeStream.wrapReadable(source))
  }

  {
    const iterator = intoAsyncIterator(source)

    if (iterator != null) {
      return new Unbound(iterator)
    }
  }

  if (Array.isArray(source)) {
    return new Indexed(source)
  }

  if (typeof source === 'string') {
    return new Chars(source)
  }

  {
    const iterator = intoIterator(source)

    if (iterator != null) {
      return new Unbound(iterator)
    }
  }

  return new Once((source: any))
}
