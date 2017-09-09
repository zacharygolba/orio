// @flow

import type { AsyncDest, AsyncConsumer } from 'ouro-types'

import * as nodeStream from '../../shims/node'
import * as webStream from '../../shims/web'

import Writer from './writer'

export { Writer }

export function createConsumer(dest: AsyncDest): AsyncConsumer<*> {
  if (webStream.isWritable(dest)) {
    return new Writer(webStream.getWriter(dest))
  }

  if (nodeStream.isWritable(dest)) {
    return new Writer(nodeStream.wrapWritable(dest))
  }

  throw new Error('Unimplemented')
}
