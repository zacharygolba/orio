// @flow

import { Writable } from 'stream'

import Sink from '../sink'
import * as sink from '../'

let dest

beforeEach(() => {
  dest = new Writable({
    write: jest.fn(),
    writev: jest.fn(),
  })
})

test('.from()', () => {
  expect(sink.from(dest)).toBeInstanceOf(Sink)
})
