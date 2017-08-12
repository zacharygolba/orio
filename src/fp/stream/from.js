// @flow

import { Readable } from 'stream'
import type { EventEmitter } from 'events'

import noop from '../../utils/noop'

import { map } from './adapters'

const once = (source, event) => new Promise(resolve => {
  source.once(event, resolve)
})

export function from<T>(source: T): AsyncIterator<T> {
  return map(noop, source)
}

export async function* fromEvent(source: EventEmitter, event: string): AsyncIterator<*> {
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    yield await once(source, event)
  }
}

export async function* fromReadable(source: Readable): AsyncIterator<Buffer | string> {
  let done = false
  const end = () => { done = true }

  source.once('end', end)
  source.once('error', end)
  source.once('close', end)

  while (!done) {
    // eslint-disable-next-line no-await-in-loop
    yield await once(source, 'data')
    console.log(done)
  }
}
