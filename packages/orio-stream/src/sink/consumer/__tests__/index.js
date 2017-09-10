// @flow

import { Writable } from 'stream'

import { createConsumer, Writer } from '../'

describe('#createConsumer()', () => {
  test('WritableStream => Writer', () => {
    const dest = new WritableStream(
      {},
      {
        highWaterMark: 0,
        size: () => 0,
      },
    )

    expect(createConsumer(dest)).toBeInstanceOf(Writer)
  })

  test('Writable => Writer', () => {
    const dest = new Writable({
      write: jest.fn(),
      writev: jest.fn(),
    })

    expect(createConsumer(dest)).toBeInstanceOf(Writer)
  })

  test('Writable => Error', () => {
    expect(createConsumer).toThrow()
  })
})
