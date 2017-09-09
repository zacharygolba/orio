// @flow

import Stream from '../stream'
import * as stream from '../'

test('.empty()', () => {
  expect(stream.empty()).toBeInstanceOf(Stream)
})

test('.from()', () => {
  expect(stream.from(Promise.resolve())).toBeInstanceOf(Stream)
})
