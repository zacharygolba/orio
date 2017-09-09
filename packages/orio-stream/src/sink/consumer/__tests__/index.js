// @flow

import { Writable } from 'stream'

import { createConsumer, Writer } from '../'

describe('#createConsumer()', () => {
  test('Writable => Writer', () => {
    const dest = new Writable({
      write: jest.fn(),
      writev: jest.fn(),
    })

    expect(createConsumer(dest)).toBeInstanceOf(Writer)
  })
})
