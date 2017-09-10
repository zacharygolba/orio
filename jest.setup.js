// @flow

/* eslint-disable import/extensions, import/no-unresolved */

import {
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  TransformStream,
  ReadableStream,
  WritableStream,
} from 'web-streams-polyfill'

/* eslint-enable import/extensions, import/no-unresolved */

Object.defineProperties(global, {
  ByteLengthQueuingStrategy: {
    value: ByteLengthQueuingStrategy,
  },
  CountQueuingStrategy: {
    value: CountQueuingStrategy,
  },
  TransformStream: {
    value: TransformStream,
  },
  ReadableStream: {
    value: ReadableStream,
  },
  WritableStream: {
    value: WritableStream,
  },
})
